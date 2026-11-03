# /// script
# requires-python = ">=3.12,<3.13"
# dependencies = [
#   "kokoro==0.9.4",
#   "numpy",
#   "pip",
#   "soundfile",
# ]
# ///
"""Renders the articles in a job file to MP3 and metadata files."""

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
import torch
from kokoro import KPipeline

LANG_CODE = "a"
MODEL_REPO = "hexgrad/Kokoro-82M"
SAMPLE_RATE = 24000
BLOCK_PAUSE_SECONDS = 0.45
MP3_BITRATE = "48k"


def render(pipeline, voice, blocks):
    """Returns the samples and the start time of each section heading."""
    silence = np.zeros(int(SAMPLE_RATE * BLOCK_PAUSE_SECONDS), dtype=np.float32)
    parts = []
    sections = []
    sample_count = 0

    for block in blocks:
        if "sectionId" in block:
            sections.append({
                "id": block["sectionId"],
                "startSeconds": round(sample_count / SAMPLE_RATE, 1),
            })

        for result in pipeline(block["text"], voice=voice):
            if result.audio is not None:
                audio = np.asarray(result.audio, dtype=np.float32)
                parts.append(audio)
                sample_count += len(audio)

        parts.append(silence)
        sample_count += len(silence)

    return np.concatenate(parts), sections


def write_mp3(samples, target):
    with tempfile.NamedTemporaryFile(suffix=".wav") as wav:
        sf.write(wav.name, samples, SAMPLE_RATE)
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", wav.name, "-ac", "1",
             "-b:a", MP3_BITRATE, str(target)],
            check=True,
        )


def main():
    job = json.loads(Path(sys.argv[1]).read_text())
    output_dir = Path(job["outputDir"])
    torch.set_num_threads(job["threads"])
    pipeline = KPipeline(lang_code=LANG_CODE, repo_id=MODEL_REPO)

    for article in job["articles"]:
        blocks = [{"text": article["title"]}, *article["blocks"]]
        samples, sections = render(pipeline, job["voice"], blocks)
        name = article["name"]
        temp_mp3 = output_dir / f".{name}.tmp.mp3"
        write_mp3(samples, temp_mp3)
        os.replace(temp_mp3, output_dir / f"{name}.mp3")

        # Written last, so an interrupted post counts as outdated and reruns.
        meta = {
            "hash": article["hash"],
            "durationSeconds": round(len(samples) / SAMPLE_RATE),
            "voice": job["voice"],
            "sections": sections,
        }
        (output_dir / f"{name}.json").write_text(json.dumps(meta, indent=2) + "\n")
        print(f"{name}: {meta['durationSeconds']}s", flush=True)


if __name__ == "__main__":
    main()
