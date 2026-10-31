#!/usr/bin/env python3
"""Parse faculty cards from saved old NHIT department pages.

Extracts per card: post id, name, designation, qualification, experience,
and the card photo URL (image that appears before the contact block).
Outputs /tmp/faculty_extract.json
"""
import json
import re

PAGES = {
    'computer-science-technology': '/tmp/cse.html',
    'diploma-in-mechanical-engineering': '/tmp/old_diploma-in-mechanical-engineering.html',
    'diploma-in-electronics-telecommunications-engineering': '/tmp/old_diploma-in-electronics-telecommunications-engineering.html',
    'diploma-in-electrical-engineering': '/tmp/old_diploma-in-electrical-engineering.html',
    'diploma-in-civil-engineering': '/tmp/old_diploma-in-civil-engineering.html',
    'diploma-in-automobile-engineering': '/tmp/old_diploma-in-automobile-engineering.html',
}

BAD = ('logo', 'napkin', 'cropped-', 'NHIT_latest')


def clean(s: str) -> str:
    return re.sub(r'\s+', ' ', s).strip()


result = {}
for slug, path in PAGES.items():
    html = open(path, encoding='utf-8', errors='ignore').read()
    i = html.find('Our Faculties')
    if i < 0:
        result[slug] = {'error': 'no Our Faculties heading'}
        continue
    seg = html[i:i + 120000]
    chunks = re.split(r'jet-listing-grid__item', seg)[1:]
    cards = []
    for chunk in chunks:
        post = re.search(r'data-post-id="(\d+)"', chunk)
        txt = re.sub(r'<script.*?</script>', '', chunk, flags=re.S)
        txt = re.sub(r'<[^>]+>', '|', txt)
        txt = re.sub(r'\|+', '|', txt)
        parts = [clean(p) for p in txt.split('|') if clean(p)]
        # name = first part that looks like a person name (letters, spaces, dots)
        name_i = None
        for idx, p in enumerate(parts):
            if re.fullmatch(r"[A-Za-z .]+", p) and len(p) > 5 and 'grid' not in p and 'slide' not in p and 'elementor' not in p.lower():
                name_i = idx
                break
        if name_i is None:
            continue
        name = parts[name_i]
        rest = parts[name_i + 1:]
        # designation / qualification / experience: next short fields until phone
        fields = []
        for p in rest:
            if re.match(r'^\(0343\)|^91\s|@|email', p, re.I):
                break
            fields.append(p)
        desig = fields[0] if len(fields) > 0 else ''
        qual = fields[1] if len(fields) > 1 else ''
        exp = fields[2] if len(fields) > 2 else ''
        # photo: image urls inside chunk BEFORE the name position
        pre = chunk[:chunk.find(name)] if name in chunk else chunk
        imgs = re.findall(r'https?://nhit\.in/wp-content/uploads/[^"\s\\]+?\.(?:jpg|jpeg|png|webp)', pre)
        imgs = [u for u in imgs if not any(b in u.lower() for b in BAD)]
        # prefer 400x400 size, else first
        photo = ''
        for u in imgs:
            if '-400x400' in u or '-398x400' in u:
                photo = u
                break
        if not photo and imgs:
            photo = imgs[0]
        cards.append({
            'postId': post.group(1) if post else '',
            'name': name,
            'desig': desig,
            'qual': qual,
            'exp': exp,
            'photo': photo,
        })
    result[slug] = cards

with open('/tmp/faculty_extract.json', 'w') as f:
    json.dump(result, f, indent=1, ensure_ascii=False)

for slug, cards in result.items():
    print(f'=== {slug}: {len(cards) if isinstance(cards, list) else cards} faculty')
    if isinstance(cards, list):
        for c in cards:
            print(f"  {c['name']} | {c['desig']} | {c['qual']} | {c['exp']} | {c['photo'] or 'NO PHOTO'}")
