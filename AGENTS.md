# Agent instructions

## Article audio

Every featured blog post (`featured: true` in its frontmatter) has a narrated MP3, generated with [Kokoro](https://github.com/hexgrad/kokoro). The Listen button plays this file. Other posts fall back to the browser's speech voice.

Each featured post has two files in `content/assets/audio/`, and both must be committed:

- `<slug>.mp3` is the audio.
- `<slug>.json` holds the text hash, the duration, the voice and the section start times.

**After you write or edit a featured post, or mark a post as featured, run these from the repository root:**

```sh
yarn build
yarn audio:generate
yarn audio:check
```

- `yarn audio:generate` reads the post text from `public/`, so build first. It only renders posts whose text changed, and an interrupted run resumes.
- `yarn audio:generate <slug>` limits the run to one featured post.
- `yarn audio:check` must exit with success, which means every featured post is current.

Requirements are [`uv`](https://docs.astral.sh/uv/) and `ffmpeg`. The first run downloads the Python packages and the model. Audio is not generated on Vercel, so commit the files.

Do not edit the MP3 or JSON files by hand. To change the voice, change `KOKORO_VOICE` in `scripts/article-audio.js` and regenerate, which renders every featured post again.
