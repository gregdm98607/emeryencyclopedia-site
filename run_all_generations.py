#!/usr/bin/env python3
"""Generate all EEC chapter assets using Imagen 4 and Veo 3.1."""

import json
import os
import subprocess
import sys
import time

# Install google-genai if needed
try:
    import google.genai
except ImportError:
    subprocess.check_call(
        [sys.executable, "-m", "pip", "install", "google-genai", "-q"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    import google.genai

from google import genai
from google.genai import types

# Load API key
with open(r'C:\Users\gregm\AppData\Roaming\Claude\claude_desktop_config.json', 'r', encoding='utf-8') as f:
    cfg = json.load(f)
API_KEY = cfg['mcpServers']['nano-banana']['env']['GEMINI_API_KEY']

client = genai.Client(api_key=API_KEY)

OUT_DIR = r'C:\Dev\emeryencyclopedia-site\public\images\chapters'
os.makedirs(OUT_DIR, exist_ok=True)

results = []

def gen_image(filename, prompt, aspect_ratio="16:9"):
    """Generate a single image with Imagen 4."""
    path = os.path.join(OUT_DIR, filename)
    print(f"\n{'='*60}")
    print(f"GENERATING: {filename}")
    print(f"{'='*60}")
    start = time.time()
    try:
        response = client.models.generate_images(
            model="imagen-4.0-generate-001",
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio=aspect_ratio,
            ),
        )
        if not response.generated_images:
            print(f"  ERROR: No images generated (filtered?)")
            results.append((filename, "FAILED", "filtered"))
            return False
        with open(path, "wb") as f:
            f.write(response.generated_images[0].image.image_bytes)
        size_kb = len(response.generated_images[0].image.image_bytes) / 1024
        elapsed = time.time() - start
        print(f"  SUCCESS: {path} ({size_kb:.0f} KB, {elapsed:.1f}s)")
        results.append((filename, "SUCCESS", f"{size_kb:.0f} KB"))
        return True
    except Exception as e:
        elapsed = time.time() - start
        print(f"  ERROR: {e} ({elapsed:.1f}s)")
        results.append((filename, "FAILED", str(e)[:80]))
        return False

def gen_video(filename, prompt, duration=8, aspect_ratio="16:9", resolution="720p"):
    """Generate a video with Veo 3.1."""
    path = os.path.join(OUT_DIR, filename)
    print(f"\n{'='*60}")
    print(f"GENERATING VIDEO: {filename}")
    print(f"{'='*60}")
    start = time.time()
    try:
        config = types.GenerateVideosConfig(
            aspect_ratio=aspect_ratio,
            duration_seconds=duration,
            resolution=resolution,
        )
        operation = client.models.generate_videos(
            model="veo-3.1-generate-preview",
            prompt=prompt,
            config=config,
        )
        print(f"  Operation: {operation.name}")
        poll_count = 0
        while not operation.done:
            poll_count += 1
            time.sleep(10)
            operation = client.operations.get(operation)
            elapsed = time.time() - start
            print(f"  Poll #{poll_count} ({elapsed:.0f}s)...")
        
        generated_video = operation.response.generated_videos[0]
        client.files.download(file=generated_video.video)
        generated_video.video.save(path)
        size_mb = os.path.getsize(path) / (1024 * 1024)
        elapsed = time.time() - start
        print(f"  SUCCESS: {path} ({size_mb:.1f} MB, {elapsed:.1f}s)")
        results.append((filename, "SUCCESS", f"{size_mb:.1f} MB"))
        return True
    except Exception as e:
        elapsed = time.time() - start
        print(f"  ERROR: {e} ({elapsed:.1f}s)")
        results.append((filename, "FAILED", str(e)[:80]))
        return False


# ============================================================
# CHAPTER ASSET DEFINITIONS
# ============================================================

print("Starting EEC Chapter Asset Generation")
print(f"Output directory: {OUT_DIR}")
print(f"Total assets: 11 (10 images + 1 video)")
total_start = time.time()

# Ch01 Geography & Physiography
gen_image(
    "ch01_generated_geography_physiography.png",
    "Aerial panoramic illustration of Emery County, Utah's three major physiographic regions in a single dramatic landscape view. On the left, the high forested Wasatch Plateau with alpine meadows and spruce-fir forests. In the center, the broad agricultural Castle Valley with irrigated fields and small towns. On the right, the deeply eroded sandstone formations of the San Rafael Swell with dramatic anticlines, slot canyons, and red rock mesas. Field-guide illustration style with warm desert palette of sandstone tan, deep canyon brown, sage green, mesa red, and cream sky wash. Dramatic lighting, educational scientific illustration quality, highly detailed topographic rendering.",
    aspect_ratio="16:9"
)

# Ch02 Deep-Time Geology
gen_image(
    "ch02_generated_deep_time_geology.png",
    "Illustrated stratigraphic column showing Emery County Utah's major geological formations from Pennsylvanian period at bottom to Quaternary at top. Color-coded bands by geological period: gray-blue for Pennsylvanian, warm brown for Permian, red-orange for Triassic, tan for Jurassic, yellow-green for Cretaceous, pale for Tertiary, light for Quaternary. Small icons embedded in each layer: trilobite fossils, coal seams in black, uranium symbols in yellow-green, petrified sand dunes texture, dinosaur bones, marine shells. Labels on side showing formation names. Scientific geological illustration style, clean educational diagram with warm desert scholarly color treatment. Sandstone tan background.",
    aspect_ratio="9:16"
)

# Ch03 Hydrology & Springs
gen_image(
    "ch03_generated_hydrology_springs.png",
    "Artistic illustrated map of the San Rafael River system in Emery County, Utah. Three blue water paths descend from the Wasatch Plateau on the west: Huntington Creek, Cottonwood Creek, and Ferron Creek. They flow eastward through Castle Valley (shown as warm tan agricultural land), converge into the San Rafael River, then cut dramatically through the San Rafael Swell (red sandstone anticline), and join the Green River on the east. Blue waterways on warm desert terrain background in sandstone tan, sage green vegetation along streams, mesa red for rock formations. Artistic cartographic style, like a natural history museum exhibit map. Clean labels, educational.",
    aspect_ratio="16:9"
)

# Ch04 Climate & Weather — VIDEO
gen_video(
    "ch04_generated_monsoon_thunderstorm.mp4",
    "A cinematic wide shot of a monsoon thunderstorm building over the San Rafael Swell in Utah's desert canyon country. Towering cumulus clouds grow rapidly into a massive dark cumulonimbus anvil shape against a deep blue sky. A bright lightning bolt flashes, illuminating red sandstone mesas and buttes below. Heavy rain begins falling in curtains onto the desert canyon floor. Dramatic natural lighting, golden hour transitioning to storm darkness. Warm desert tones of sandstone tan and mesa red contrast with dark storm clouds. Sound of distant rolling thunder, wind, and rain hitting sandstone. Documentary nature film style, educational.",
    duration=8,
    aspect_ratio="16:9",
    resolution="720p"
)

# Ch05 Flora Zones
gen_image(
    "ch05_generated_flora_zones.png",
    "Botanical illustration showing the elevation gradient plant communities of Emery County, Utah in a single cross-section view from left (low) to right (high). At bottom left: desert shrubland with sagebrush, shadscale, and greasewood at 4500 ft. Moving upslope: pinyon-juniper woodland at 6000 ft. Then mountain mahogany scrub at 7000 ft. Then quaking aspen grove with white bark at 8000 ft. At top right: spruce-fir forest with Engelmann spruce at 10000 ft. Include elevation markers on the side. Each zone clearly distinct with representative species drawn in detailed field-guide botanical illustration style. Warm background of sandstone tan and sage green, clean educational composition.",
    aspect_ratio="16:9"
)

# Ch06 Fauna
gen_image(
    "ch06_generated_fauna.png",
    "Wildlife field guide illustration showing six representative Emery County, Utah species in their natural habitats, arranged in a single composed scene: a mule deer standing in sagebrush flat, a golden eagle soaring over sandstone cliffs, a desert bighorn sheep perched on a red sandstone ledge, a Colorado pikeminnow swimming in clear river water, a Great Basin rattlesnake coiled on a warm rock, and a pronghorn antelope on open desert flats. Nature field guide illustration style with scientific accuracy. Warm desert palette: sandstone tan, sage green, mesa red, deep sky blue. Each animal clearly detailed and identifiable. Educational natural history illustration quality.",
    aspect_ratio="16:9"
)

# Ch07 Night Skies & Astronomy
gen_image(
    "ch07_generated_night_skies.png",
    "Photorealistic astrophotography image of the Milky Way galaxy arching brilliantly over Goblin Valley State Park hoodoo rock formations in Utah. Bortle Class 1 pristine dark sky with thousands of visible stars down to the horizon. The Milky Way core is bright and detailed with dust lanes visible, casting faint shadows on the sandstone hoodoos below. Faint zodiacal light glows on the western horizon. The mushroom-shaped hoodoo formations are dimly lit by starlight in warm sandstone tones. Deep sky blue and black sky transitions to warm desert amber near the horizon. Professional astrophotography quality, long exposure, sharp stars, stunning composition.",
    aspect_ratio="16:9"
)

# Ch08 Paleo-Indian & Archaic
gen_image(
    "ch08_generated_paleo_indian_archaic.png",
    "Respectful, educational archaeological reconstruction illustration of a Fremont culture scene in Utah, circa 900 CE. A small group of three people near a semi-subterranean pithouse village with visible timber-and-adobe construction. The San Rafael Swell's sandstone formations rise in the background. Period-accurate details include: rabbit-skin blankets, coiled basketry on the ground, a small corn and squash garden nearby, an atlatl leaning against the pithouse wall, and gray corrugated pottery. Warm natural lighting. Archaeological reconstruction illustration style — dignified, educational, culturally respectful. Warm desert scholarly palette of sandstone tan, sage green, and mesa red.",
    aspect_ratio="16:9"
)

# Ch41 Further Reading
gen_image(
    "ch41_generated_further_reading.png",
    "Still-life illustration of Emery County research materials arranged on a wooden scholar's desk. An open antique historical book with yellowed pages, a folded USGS topographic map showing contour lines, a brass magnifying glass, a vintage sepia photograph of Castle Dale Utah main street circa 1920, a pressed botanical plant specimen on paper, and a reddish sandstone rock sample. Warm side lighting from the left casting soft shadows. Scholar's desk composition in the style of Dutch Golden Age still life painting. Warm color palette of sandstone tan, deep brown, sage green, and cream. Scholarly and inviting atmosphere.",
    aspect_ratio="4:3"
)

# Ch42 Glossary
gen_image(
    "ch42_generated_glossary.png",
    "Technical geological diagram illustration showing labeled landform features in a single landscape cutaway cross-section. A warm-toned desert landscape showing clearly labeled geological features: an anticline (upward fold), syncline (downward fold), monocline (step fold), hogback ridge, flat-topped mesa, narrow butte, deep canyon with layered walls, alluvial fan spreading from canyon mouth, talus slope of broken rock at cliff base, and a contact spring emerging where permeable rock meets impermeable layer. Each feature has a clean label line pointing to it. Technical diagram style with warm color treatment in sandstone tan, mesa red, sage green. Educational geological illustration, clean and readable.",
    aspect_ratio="16:9"
)

# Ch43 Systematic Index
gen_image(
    "ch43_generated_systematic_index.png",
    "Clean information design illustration of a network web diagram showing interconnections between encyclopedia topics about Emery County, Utah. Central hub labeled 'Emery County' with radiating clusters: a brown cluster for Geology connecting to Mining; an orange cluster for Mining connecting to Settlement; a blue cluster for Water connecting to Agriculture; a green cluster for Flora connecting to Fauna; a red cluster for Culture connecting to History. Connecting lines between related nodes show cross-references. Each cluster uses a distinct accent color. Clean white background with subtle grid. Modern information design style, like a knowledge graph visualization. Professional, minimal, elegant.",
    aspect_ratio="4:3"
)

# ============================================================
# SUMMARY
# ============================================================
total_elapsed = time.time() - total_start
print(f"\n{'='*60}")
print(f"GENERATION COMPLETE")
print(f"Total time: {total_elapsed:.0f}s ({total_elapsed/60:.1f} min)")
print(f"{'='*60}")
print(f"\nResults:")
for fname, status, detail in results:
    print(f"  [{status}] {fname} — {detail}")

success_count = sum(1 for _, s, _ in results if s == "SUCCESS")
fail_count = sum(1 for _, s, _ in results if s == "FAILED")
print(f"\nTotal: {success_count} succeeded, {fail_count} failed out of {len(results)}")
