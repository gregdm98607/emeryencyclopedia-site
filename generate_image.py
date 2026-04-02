#!/usr/bin/env python3
"""Generate images using Google's Imagen 4 API."""

import argparse
import os
import subprocess
import sys


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
    parser = argparse.ArgumentParser(description="Generate images with Imagen 4")
    parser.add_argument("--prompt", required=True, help="Text prompt for image generation")
    parser.add_argument("--output", required=True, help="Output file path (.png)")
    parser.add_argument("--api-key", required=True, help="Gemini API key")
    parser.add_argument("--count", type=int, default=1, choices=[1, 2, 3, 4],
                        help="Number of images to generate (1-4)")
    parser.add_argument("--aspect-ratio", default="1:1",
                        choices=["1:1", "3:4", "4:3", "9:16", "16:9"],
                        help="Image aspect ratio")
    parser.add_argument("--size", default=None, choices=["1K", "2K"],
                        help="Image size (Standard/Ultra models only)")
    args = parser.parse_args()

    ensure_genai()

    from google import genai
    from google.genai import types

    client = genai.Client(api_key=args.api_key)

    config_kwargs = {
        "number_of_images": args.count,
        "aspect_ratio": args.aspect_ratio,
    }
    if args.size:
        config_kwargs["image_size"] = args.size

    print(f"Generating {args.count} image(s) with Imagen 4...")
    response = client.models.generate_images(
        model="imagen-4.0-generate-001",
        prompt=args.prompt,
        config=types.GenerateImagesConfig(**config_kwargs),
    )

    if not response.generated_images:
        print("ERROR: No images generated. The prompt may have been filtered.", file=sys.stderr)
        sys.exit(1)

    base, ext = os.path.splitext(args.output)
    if not ext:
        ext = ".png"

    for i, generated_image in enumerate(response.generated_images):
        if args.count == 1:
            path = f"{base}{ext}"
        else:
            path = f"{base}_{i + 1}{ext}"

        with open(path, "wb") as f:
            f.write(generated_image.image.image_bytes)

        size_kb = len(generated_image.image.image_bytes) / 1024
        print(f"Saved: {path} ({size_kb:.0f} KB)")

    print("Done.")


if __name__ == "__main__":
    main()
