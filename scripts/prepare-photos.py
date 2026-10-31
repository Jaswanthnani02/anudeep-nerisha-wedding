"""Make web copies of the photos in photos/ for the Moments section.

Applies the camera's rotation, resizes to a strip image and a full-size image,
and saves without metadata, so GPS location from phone photos is never
published. Prints the `photos` entries to paste into src/config.js.

    python3 scripts/prepare-photos.py            # every photo in photos/
    python3 scripts/prepare-photos.py a.jpg b.jpg  # chosen order
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

SRC = Path('photos')
OUT = Path('public/img/moments')
OUT.mkdir(parents=True, exist_ok=True)

names = sys.argv[1:] or sorted(p.name for p in SRC.iterdir() if p.suffix.lower() in {'.jpg', '.jpeg', '.png', '.heic', '.webp'})
for i, name in enumerate(names, 1):
    im = ImageOps.exif_transpose(Image.open(SRC / name)).convert('RGB')
    landscape = im.width > im.height
    sizes = {}
    for suffix, box in (('', (1100, 1100) if landscape else (800, 1200)), ('-full', (2000, 2000))):
        out = im.copy()
        out.thumbnail(box, Image.LANCZOS)
        out.save(OUT / f'photo-{i}{suffix}.jpg', 'JPEG', quality=82, progressive=True, optimize=True)
        sizes[suffix] = out.size
    w, h = sizes['']
    print(f"  {{ src: 'img/moments/photo-{i}.jpg', full: 'img/moments/photo-{i}-full.jpg', w: {w}, h: {h}, alt: '' }},  // {name}")
