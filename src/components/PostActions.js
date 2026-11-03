import React from "react"

import {
  chunkText,
  collectSpeakableText,
  findActiveSection,
} from "../utils/speech"

const SPEECH_STATUS = { IDLE: "idle", PLAYING: "playing", PAUSED: "paused" }
const COPY_STATUS = { IDLE: "idle", COPIED: "copied", FAILED: "failed" }
const COPY_FEEDBACK_MS = 2000

const COPY_LABELS = {
  [COPY_STATUS.IDLE]: "Copy link",
  [COPY_STATUS.COPIED]: "Link copied",
  [COPY_STATUS.FAILED]: "Copy failed",
}

const SHARE_TARGETS = [
  {
    label: "X",
    buildHref: (url, title) =>
      `https://x.com/intent/post?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
  },
  {
    label: "LinkedIn",
    buildHref: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
  },
  {
    label: "Hacker News",
    buildHref: (url, title) =>
      `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(
        url
      )}&t=${encodeURIComponent(title)}`,
  },
  {
    label: "Email",
    buildHref: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        url
      )}`,
  },
]

const Icon = ({ children }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
)

const ListenIcon = () => (
  <Icon>
    <path d="M4 10v4h4l5 4V6l-5 4z" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    <path d="M19 6a8.5 8.5 0 0 1 0 12" />
  </Icon>
)

const PauseIcon = () => (
  <Icon>
    <path d="M9 5v14" />
    <path d="M15 5v14" />
  </Icon>
)

const PlayIcon = () => (
  <Icon>
    <path d="M7 4l13 8-13 8z" />
  </Icon>
)

const StopIcon = () => (
  <Icon>
    <rect x="6" y="6" width="12" height="12" rx="1" />
  </Icon>
)

const ShareIcon = () => (
  <Icon>
    <path d="M12 15V3" />
    <path d="M8 7l4-4 4 4" />
    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
  </Icon>
)

// Listens to the article with the browser's speech synthesis. Pause cancels
// and keeps the chunk cursor, because speechSynthesis.pause() is unreliable
// on Android Chrome and with remote voices. Resume restarts the current chunk.
const useArticleSpeech = (contentRef) => {
  const [status, setStatus] = React.useState(SPEECH_STATUS.IDLE)
  const chunksRef = React.useRef(null)
  const cursorRef = React.useRef(0)
  // Bumped on every start, pause and stop. cancel() fires onend or onerror
  // on the old utterance, and a stale token turns those callbacks into no-ops.
  const sessionRef = React.useRef(0)
  // Chrome can garbage collect a pending utterance, and then onend never fires.
  const utteranceRef = React.useRef(null)

  const cancelSpeech = React.useCallback(() => {
    sessionRef.current += 1
    window.speechSynthesis.cancel()
  }, [])

  const speakCurrent = React.useCallback(() => {
    const session = sessionRef.current
    const chunk = chunksRef.current[cursorRef.current]
    const utterance = new window.SpeechSynthesisUtterance(chunk)
    const lang = document.documentElement.lang

    if (lang) {
      utterance.lang = lang
    }

    utterance.onend = () => {
      if (session !== sessionRef.current) {
        return
      }

      cursorRef.current += 1

      if (cursorRef.current >= chunksRef.current.length) {
        cursorRef.current = 0
        setStatus(SPEECH_STATUS.IDLE)
        return
      }

      speakCurrent()
    }

    utterance.onerror = () => {
      if (session !== sessionRef.current) {
        return
      }

      cursorRef.current = 0
      setStatus(SPEECH_STATUS.IDLE)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [])

  const play = React.useCallback(() => {
    if (!chunksRef.current) {
      const blocks = contentRef.current
        ? collectSpeakableText(contentRef.current)
        : []

      chunksRef.current = blocks.flatMap((block) => chunkText(block))
    }

    if (chunksRef.current.length === 0) {
      return
    }

    cancelSpeech()
    setStatus(SPEECH_STATUS.PLAYING)
    speakCurrent()
  }, [contentRef, cancelSpeech, speakCurrent])

  const pause = React.useCallback(() => {
    cancelSpeech()
    setStatus(SPEECH_STATUS.PAUSED)
  }, [cancelSpeech])

  const stop = React.useCallback(() => {
    cancelSpeech()
    cursorRef.current = 0
    setStatus(SPEECH_STATUS.IDLE)
  }, [cancelSpeech])

  React.useEffect(() => {
    // Chrome keeps speaking across reloads, so clear any leftover audio.
    cancelSpeech()
    window.addEventListener("pagehide", cancelSpeech)

    return () => {
      window.removeEventListener("pagehide", cancelSpeech)
      cancelSpeech()
    }
  }, [cancelSpeech])

  return { status, play, pause, stop }
}

// Plays the pre-generated article audio. Status follows the element's events,
// so headphone buttons and lock screen controls stay in sync with the button.
const useArticleAudio = (url, initialDuration) => {
  const [status, setStatus] = React.useState(SPEECH_STATUS.IDLE)
  const [position, setPosition] = React.useState(0)
  const [duration, setDuration] = React.useState(initialDuration)
  const audioRef = React.useRef(null)

  const getAudio = () => {
    if (audioRef.current) {
      return audioRef.current
    }

    const audio = new window.Audio(url)
    const reset = () => {
      audio.currentTime = 0
      setStatus(SPEECH_STATUS.IDLE)
    }

    audio.onloadedmetadata = () => setDuration(audio.duration)
    audio.ontimeupdate = () => setPosition(audio.currentTime)
    audio.onplay = () => setStatus(SPEECH_STATUS.PLAYING)
    audio.onended = reset
    audio.onerror = () => setStatus(SPEECH_STATUS.IDLE)
    // Pause also fires on Stop and at the end, with the position at the start
    // or the element ended. Only a mid-article pause should offer Resume.
    audio.onpause = () => {
      if (audio.currentTime > 0 && !audio.ended) {
        setStatus(SPEECH_STATUS.PAUSED)
      }
    }
    audioRef.current = audio

    return audio
  }

  const play = () => {
    getAudio()
      .play()
      .catch(() => setStatus(SPEECH_STATUS.IDLE))
  }

  const pause = () => getAudio().pause()

  const stop = () => {
    const audio = getAudio()

    audio.pause()
    audio.currentTime = 0
    setPosition(0)
    setStatus(SPEECH_STATUS.IDLE)
  }

  const seek = (seconds) => {
    getAudio().currentTime = seconds
    setPosition(seconds)
  }

  React.useEffect(
    () => () => {
      if (!audioRef.current) {
        return
      }

      audioRef.current.pause()
      audioRef.current.removeAttribute("src")
    },
    []
  )

  return { status, play, pause, stop, position, duration, seek }
}

const formatDuration = (seconds) => `${Math.max(1, Math.round(seconds / 60))} min`

// 83 becomes "1:23".
const formatClock = (seconds) => {
  const whole = Math.floor(seconds)

  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`
}

const AudioProgress = ({ duration, onSeek, position }) => {
  const elapsed = formatClock(position)
  const total = formatClock(duration)

  return (
    <div className="post-audio-progress">
      <input
        type="range"
        aria-label="Audio position"
        aria-valuetext={`${elapsed} of ${total}`}
        min="0"
        max={duration}
        step="1"
        value={position}
        onChange={(event) => onSeek(Number(event.target.value))}
      />
      <span className="post-audio-time">
        {elapsed} / {total}
      </span>
    </div>
  )
}

const AudioListen = ({
  contentRef,
  durationSeconds,
  onSectionChange,
  sections,
  url,
}) => {
  const controls = useArticleAudio(url, durationSeconds)
  const isActive = controls.status !== SPEECH_STATUS.IDLE
  const sectionId = findActiveSection(sections, controls.position)

  // undefined hands the highlight back to the reader's scroll position, while
  // null means the intro is playing and no section should be highlighted.
  React.useEffect(() => {
    onSectionChange(isActive ? sectionId : undefined)
  }, [isActive, sectionId, onSectionChange])

  // Only a seek moves the page. Normal playback leaves the reader's scroll
  // alone, so they can read ahead or go back while listening.
  const seekToPosition = (seconds) => {
    const targetId = findActiveSection(sections, seconds)

    controls.seek(seconds)

    if (targetId === sectionId) {
      return
    }

    const target = targetId
      ? document.getElementById(targetId)
      : contentRef.current

    target?.scrollIntoView({ block: "start" })
  }

  // Keeps one DOM structure in both states, so the pressed button stays the
  // same element and keyboard focus survives the move into the dock. Docked
  // because seeking scrolls the page away from the header.
  return (
    <div className={isActive ? "post-audio-dock" : "post-audio-slot"}>
      <div className="post-audio-dock-inner">
        <ListenControls
          controls={controls}
          duration={durationSeconds ? formatDuration(durationSeconds) : null}
        />
        {isActive && (
          <AudioProgress
            duration={controls.duration}
            onSeek={seekToPosition}
            position={controls.position}
          />
        )}
      </div>
    </div>
  )
}

const SpeechListen = ({ contentRef }) => (
  <ListenControls controls={useArticleSpeech(contentRef)} />
)

const ListenControls = ({ controls, duration }) => {
  const { status, play, pause, stop } = controls

  let primaryAction = play
  let primaryLabel = "Listen to article"
  let PrimaryIcon = ListenIcon

  if (status === SPEECH_STATUS.PLAYING) {
    primaryAction = pause
    primaryLabel = "Pause"
    PrimaryIcon = PauseIcon
  }

  if (status === SPEECH_STATUS.PAUSED) {
    primaryLabel = "Resume"
    PrimaryIcon = PlayIcon
  }

  return (
    <>
      <button
        type="button"
        className="post-action post-action--primary"
        onClick={primaryAction}
      >
        <PrimaryIcon />
        {primaryLabel}
        {duration && status === SPEECH_STATUS.IDLE && (
          <span className="post-action-detail">{duration}</span>
        )}
      </button>
      {status !== SPEECH_STATUS.IDLE && (
        <button
          type="button"
          className="post-action post-action--stop"
          onClick={stop}
        >
          <StopIcon />
          Stop
        </button>
      )}
    </>
  )
}

const ShareMenu = ({ title, url }) => {
  const panelId = React.useId()
  const [isOpen, setIsOpen] = React.useState(false)
  const [copyStatus, setCopyStatus] = React.useState(COPY_STATUS.IDLE)
  const [canNativeShare, setCanNativeShare] = React.useState(false)
  const containerRef = React.useRef(null)
  const buttonRef = React.useRef(null)
  const copyTimerRef = React.useRef(null)

  React.useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function")

    return () => window.clearTimeout(copyTimerRef.current)
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key !== "Escape") {
        return
      }

      setIsOpen(false)
      buttonRef.current.focus()
    }

    const onPointerDown = (event) => {
      if (containerRef.current.contains(event.target)) {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [isOpen])

  const copyLink = async () => {
    let result = COPY_STATUS.COPIED

    try {
      await navigator.clipboard.writeText(url)
    } catch (error) {
      result = COPY_STATUS.FAILED
    }

    window.clearTimeout(copyTimerRef.current)
    setCopyStatus(result)
    copyTimerRef.current = window.setTimeout(
      () => setCopyStatus(COPY_STATUS.IDLE),
      COPY_FEEDBACK_MS
    )
  }

  // A dismissed share sheet rejects with AbortError. Any other failure
  // leaves the other share options in the panel available.
  const nativeShare = async () => {
    try {
      await navigator.share({ title, url })
    } catch (error) {
      return
    }
  }

  return (
    <div className="post-share" ref={containerRef}>
      <button
        type="button"
        ref={buttonRef}
        className="post-action"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <ShareIcon />
        Share
      </button>
      <div id={panelId} className="post-share-panel" hidden={!isOpen}>
        <button type="button" className="post-share-item" onClick={copyLink}>
          {COPY_LABELS[copyStatus]}
        </button>
        {SHARE_TARGETS.map(({ label, buildHref }) => {
          const href = buildHref(url, title)
          const isExternal = href.startsWith("https:")

          return (
            <a
              key={label}
              className="post-share-item"
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {label}
            </a>
          )
        })}
        {canNativeShare && (
          <button
            type="button"
            className="post-share-item"
            onClick={nativeShare}
          >
            More options
          </button>
        )}
      </div>
    </div>
  )
}

const PostActions = ({
  audioDurationSeconds,
  audioSections,
  audioUrl,
  contentRef,
  onAudioSectionChange,
  title,
  url,
}) => {
  // Detected in an effect so the server and first client render match.
  const [canSpeak, setCanSpeak] = React.useState(false)

  React.useEffect(() => {
    setCanSpeak("speechSynthesis" in window)
  }, [])

  return (
    <div className="post-actions">
      {audioUrl && (
        <AudioListen
          contentRef={contentRef}
          durationSeconds={audioDurationSeconds}
          onSectionChange={onAudioSectionChange}
          sections={audioSections}
          url={audioUrl}
        />
      )}
      {!audioUrl && canSpeak && <SpeechListen contentRef={contentRef} />}
      <ShareMenu title={title} url={url} />
    </div>
  )
}

export default PostActions
