#!/usr/bin/env python3
"""Download all faculty photos from the old NHIT site (full-size where
possible) into public/images/faculty/<person-slug>.jpg"""
import os
import re
import subprocess
import json

# person-slug -> old-site photo URL (400x400 card version; full-size derived)
PHOTOS = {
    # CSE
    'shohini-das': 'https://nhit.in/wp-content/uploads/2025/10/IMG_20250821_125359893_HDR-e1761386781180-398x400.jpg',
    'ritam-bauri': 'https://nhit.in/wp-content/uploads/2024/11/IMG_1397-e1731145540790-400x400.jpg',
    'ankita-roy': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240062-400x400.jpg',
    'sunetra-chattaraj': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240085-400x400.jpg',
    'shreyasi-mandal': 'https://nhit.in/wp-content/uploads/2025/10/IMG_20250908_125956143_HDR-e1761387993795-400x400.jpg',
    # Mechanical
    'lalchand-sarkar': 'https://nhit.in/wp-content/uploads/2025/10/IMG_20250819_111016539_HDR-e1761387653578-350x400.jpg',
    'pallab-naskar': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240015-400x400.jpg',
    'arun-kumar-dey': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240027-400x400.jpg',
    'abhinandan-mitra': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240021-400x400.jpg',
    'pallabi-maji': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240031-400x400.jpg',
    'arindam-dutta': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240048-400x400.jpg',
    'arunangshu-chakraborty': 'https://nhit.in/wp-content/uploads/2025/10/IMG_20250818_124950240_HDR-e1761387242512-400x400.jpg',
    'sagnik-chatterjee': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240068-400x400.jpg',
    'tanushree-dey': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240019-400x400.jpg',
    # Electronics & Telecommunications
    'arnab-mukhopadhyay': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240052-400x400.jpg',
    'uttam-kumar-nandi': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240060-400x400.jpg',
    'aditi-bardhan': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240054-400x400.jpg',
    'arpita-ghosh': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240056-400x400.jpg',
    # Electrical
    'sabyasachi-mukherjee': 'https://nhit.in/wp-content/uploads/2025/10/IMG_20250904_152647431_HDR-e1761387867389-400x400.jpg',
    'sudeshna-mukherjee': 'https://nhit.in/wp-content/uploads/2024/05/IMG_E1322-e1731140796287-397x400.jpg',
    'rajib-sukul': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240002-400x400.jpg',
    'rahul-ghosh': 'https://nhit.in/wp-content/uploads/2024/05/IMG_E1327-e1731140654140-400x400.jpg',
    'malancha-ghosh': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240005-400x400.jpg',
    'souvik-pramanik': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240013-400x400.jpg',
    'prabhat-kumar-ghosh': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240082-400x400.jpg',
    'shatarupa-mullick-dey': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240064-400x400.jpg',
    'chandra-sarkar': 'https://nhit.in/wp-content/uploads/2025/10/IMG_20250818_134338164_HDR-e1761387417685-400x400.jpg',
    'priyam-dey': 'https://nhit.in/wp-content/uploads/2025/10/IMG_20251014_115435629_HDR-e1761388121763-400x400.jpg',
    # Civil
    'partha-de': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240066-400x400.jpg',
    'shyaama-choran-mukherjee': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240072-400x400.jpg',
    'sanchita-bhattacharjee': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240078-400x400.jpg',
    'raktima-chakraborty': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240080-400x400.jpg',
    # Automobile
    'krishanu-sarkar': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240042-400x400.jpg',
    'sourav-chakraborty': 'https://nhit.in/wp-content/uploads/2024/05/IMG_E1353-e1731136031923-320x400.jpg',
    'mrinmoy-ghosh': 'https://nhit.in/wp-content/uploads/2024/08/nhitfacutyimages0820240037-400x400.jpg',
    'subir-mukhopadhyay': 'https://nhit.in/wp-content/uploads/2024/05/IMG_20240722_135454-400x400.jpg',
    'arindam-joardar': 'https://nhit.in/wp-content/uploads/2025/02/IMG_20250114_105713-400x400.jpg',
}

OUT = '/home/z/my-project/public/images/faculty'
os.makedirs(OUT, exist_ok=True)

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
results = {'ok': [], 'fail': []}

for slug, url in PHOTOS.items():
    dest = os.path.join(OUT, f'{slug}.jpg')
    candidates = [url]
    # try full-size (strip -WxH) first for better quality
    full = re.sub(r'-\d+x\d+(\.jpg)$', r'\1', url)
    if full != url:
        candidates.insert(0, full)
    ok = False
    for u in candidates:
        r = subprocess.run(
            ['curl', '-s', '-L', '--max-time', '40', '-A', UA, '-o', dest, '-w', '%{http_code}', u],
            capture_output=True, text=True)
        code = r.stdout.strip()
        size = os.path.getsize(dest) if os.path.exists(dest) else 0
        if code == '200' and size > 3000:  # valid image, not an error page
            # sanity: JPEG magic
            with open(dest, 'rb') as f:
                magic = f.read(3)
            if magic[:2] == b'\xff\xd8':
                print(f'OK  {slug}.jpg  {size:>7} B  <- {os.path.basename(u)}')
                results['ok'].append(slug)
                ok = True
                break
    if not ok:
        print(f'FAIL {slug}: {url}')
        if os.path.exists(dest):
            os.remove(dest)
        results['fail'].append(slug)

with open('/tmp/photo_dl_results.json', 'w') as f:
    json.dump(results, f)
print(f'\nDownloaded: {len(results["ok"])}, Failed: {len(results["fail"])}')
if results['fail']:
    print('FAILED:', results['fail'])
