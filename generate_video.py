#!/usr/bin/env python3
"""Generate videos using Google's Veo 3.1 API."""

import argparse
import os
import subprocess
import sys
import time


def ensure_genai():
    """Install google-genai if not present."""
    try:
        import google.genai  # noqa: F401
    except ImportError:
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "google-genai",
             "--break-system-packages", "-q"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )


def main():
    parser = argparse.ArgumentParser(description="Generate videos with Veo 3.1")
    parser.add_argument("--prompt", required=True, help="Text prompt for video generation")
    parser.add_argument("--output", required=True, help="Output file path (.mp4)")
    parser.add_argument("--api-key", required=True, help="Gemini API key")
    parser.add_argument("--image", default=None,
                        help="Path to starting frame image (for image-to-video)")
    parser.add_argument("--aspect-ratio", default="16:9", choices=["16:9", "9:16"],
                        help="Video aspect ratio")
    parser.add_argument("--duration", type=int, default=8, choices=[4, 6, 8],
                        help="Video duration in seconds")
    parser.add_argument("--resolution", default="720p", choices=["720p", "1080p", "4k"],
                        help="Video resolution")
    parser.add_argument("--model", default="veo-3.1-generate-preview",
                        help="Model name")
    args = parser.parse_args()

    if args.resolution in ("1080p", "4k") and args.duration != 8:
        print("ERROR: 1080p and 4k resolution require --duration 8", file=sys.stderr)
        sys.exit(1)

    ensure_genai()

    from google import genai
    from google.genai import types

    client = genai.Client(api_key=args.api_key)

    config = types.GenerateVideosConfig(
        aspect_ratio=args.aspect_ratio,
        duration_seconds=args.duration,
        resolution=args.resolution,
    )

    image = None
    if args.image:
        with open(args.image, "rb") as f:
            image_bytes = f.read()
        mime = "image/png" if args.image.lower().endswith(".png") else "image/jpeg"
        image = types.Image(image_bytes=image_bytes, mime_type=mime)
        print(f"Using starting frame: {args.image}")

    print(f"Submitting video generation request to {args.model}...")
    print(f"  Prompt: {args.prompt[:100]}{'...' if len(args.prompt) > 100 else ''}")
    print(f"  Aspect ratio: {args.aspect_ratio}, Duration: {args.duration}s, Resolution: {args.resolution}")

    operation = client.models.generate_videos(
        model=args.model,
        prompt=args.prompt,
        image=image,
        config=config,
    )

    print(f"Operation started: {operation.name}")
    print("Polling for completion (this may take 1-6 minutes)...")

    poll_count = 0
    start_time = time.time()
    while not operation.done:
        poll_count += 1
        time.sleep(10)
        operation = client.operations.get(operation)
        elapsed = time.time() - start_time
        print(f"  Poll #{poll_count} ({elapsed:.0f}s elapsed): still generating...")

    elapsed = time.time() - start_time
    print(f"Video generation complete in {elapsed:.0f}s!")

    generated_video = operation.response.generated_videos[0]
    client.files.download(file=generated_video.video)

    output_path = args.output
    if not output_path.lower().endswith(".mp4"):
        output_path += ".mp4"

    generated_video.video.save(output_path)
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Saved: {output_path} ({size_mb:.1f} MB)")
    print("Done.")


if __name__ == "__main__":
    main()
