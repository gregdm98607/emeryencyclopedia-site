#!/usr/bin/env python3
"""Generate a single image or video for EEC chapters."""
import json, os, sys, time, subprocess

try:
    import google.genai
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "google-genai", "-q"])

from google import genai
from google.genai import types

with open(r'C:\Users\gregm\AppData\Roaming\Claude\claude_desktop_config.json', 'r', encoding='utf-8') as f:
    cfg = json.load(f)
API_KEY = cfg['mcpServers']['nano-banana']['env']['GEMINI_API_KEY']
client = genai.Client(api_key=API_KEY)
OUT = r'C:\Dev\emeryencyclopedia-site\public\images\chapters'

mode = sys.argv[1]  # "image" or "video"
filename = sys.argv[2]
prompt_file = sys.argv[3]  # file containing prompt text

with open(prompt_file, 'r', encoding='utf-8') as f:
    prompt = f.read().strip()

aspect = sys.argv[4] if len(sys.argv) > 4 else "16:9"
path = os.path.join(OUT, filename)

if mode == "image":
    print(f"Generating image: {filename}")
    response = client.models.generate_images(
        model="imagen-4.0-generate-001",
        prompt=prompt,
        config=types.GenerateImagesConfig(number_of_images=1, aspect_ratio=aspect),
    )
    if not response.generated_images:
        print("FAILED: filtered"); sys.exit(1)
    with open(path, "wb") as f:
        f.write(response.generated_images[0].image.image_bytes)
    kb = len(response.generated_images[0].image.image_bytes) / 1024
    print(f"SUCCESS: {path} ({kb:.0f} KB)")

elif mode == "video":
    duration = int(sys.argv[5]) if len(sys.argv) > 5 else 8
    print(f"Generating video: {filename}")
    config = types.GenerateVideosConfig(aspect_ratio=aspect, duration_seconds=duration, resolution="720p")
    operation = client.models.generate_videos(model="veo-3.1-generate-preview", prompt=prompt, config=config)
    print(f"Operation: {operation.name}")
    start = time.time()
    while not operation.done:
        time.sleep(10)
        operation = client.operations.get(operation)
        print(f"  {time.time()-start:.0f}s elapsed...")
    generated_video = operation.response.generated_videos[0]
    client.files.download(file=generated_video.video)
    generated_video.video.save(path)
    mb = os.path.getsize(path) / (1024*1024)
    print(f"SUCCESS: {path} ({mb:.1f} MB)")
