#!/usr/bin/env python3
"""Generate big test images for QA of the admin image compression feature."""
import os
import random
from PIL import Image, ImageDraw, ImageFilter

random.seed(42)
OUT = '/home/z/my-project/public/tmp-qa'
os.makedirs(OUT, exist_ok=True)

# 1) Big phone-camera-like photo: 5000x3400 JPEG quality 97 -> several MB
w, h = 5000, 3400
img = Image.new('RGB', (w, h))
px = img.load()
for y in range(h):
    r = int(30 + 200 * y / h)
    g = int(60 + 120 * y / h)
    b = int(120 + 100 * y / h)
    for x in range(0, w, 4):  # rows are cheap; fill in blocks of 4
        for k in range(4):
            if x + k < w:
                px[x + k, y] = (r, g, b)
d = ImageDraw.Draw(img)
for _ in range(220):
    x0, y0 = random.randint(0, w), random.randint(0, h)
    rad = random.randint(30, 400)
    col = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    d.ellipse([x0, y0, x0 + rad, y0 + rad], fill=col)
d.rectangle([w//2 - 600, h//2 - 300, w//2 + 600, h//2 + 300], outline=(255, 255, 255), width=14)
d.text((w//2 - 320, h//2 - 40), 'NHIT BIG PHOTO TEST', fill=(255, 255, 255))
img = img.filter(ImageFilter.GaussianBlur(1.2))

# Add camera-sensor-like noise so the JPEG lands in the multi-MB range.
try:
    import numpy as np
    arr = np.array(img).astype('int16')
    noise = np.random.randint(-14, 15, arr.shape, dtype='int16')
    arr = np.clip(arr + noise, 0, 255).astype('uint8')
    img = Image.fromarray(arr)
except ImportError:
    d = ImageDraw.Draw(img)
    for _ in range(400000):
        x, y = random.randint(0, w - 1), random.randint(0, h - 1)
        d.point((x, y), fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)))

img.save(f'{OUT}/big-photo.jpg', 'JPEG', quality=97)

# 2) Noisy transparent PNG 2000x1500 (>250KB so it goes through compression)
w2, h2 = 2000, 1500
img2 = Image.new('RGBA', (w2, h2), (0, 0, 0, 0))
d2 = ImageDraw.Draw(img2)
for _ in range(260):
    x0, y0 = random.randint(0, w2), random.randint(0, h2)
    rad = random.randint(40, 300)
    col = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(140, 255))
    d2.ellipse([x0, y0, x0 + rad, y0 + rad], fill=col)
# corner must stay fully transparent (alpha 0) -> verify later
# Add noise so the PNG crosses the 250 KB "already small" threshold.
try:
    arr2 = np.array(img2)
    arr2[:, :, 0] = np.clip(arr2[:, :, 0].astype('int16') + np.random.randint(-10, 11, (h2, w2), dtype='int16'), 0, 255).astype('uint8')
    arr2[:, :, 1] = np.clip(arr2[:, :, 1].astype('int16') + np.random.randint(-10, 11, (h2, w2), dtype='int16'), 0, 255).astype('uint8')
    img2 = Image.fromarray(arr2, 'RGBA')
except ImportError:
    d2 = ImageDraw.Draw(img2)
    for _ in range(300000):
        x, y = random.randint(0, w2 - 1), random.randint(0, h2 - 1)
        d2.point((x, y), fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), 255))
# re-clear the top-left corner sample area so alpha stays 0 there
d3 = ImageDraw.Draw(img2)
d3.rectangle([0, 0, 60, 60], fill=(0, 0, 0, 0))
img2.save(f'{OUT}/alpha-test.png', 'PNG')

for f in sorted(os.listdir(OUT)):
    p = os.path.join(OUT, f)
    print(f, os.path.getsize(p))
