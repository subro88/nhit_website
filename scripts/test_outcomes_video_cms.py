#!/usr/bin/env python3
"""CMS round-trip test for the outcomes background video (Task 16)."""
import json
import urllib.request

BASE = 'http://localhost:3000'
LOGIN = {'username': 'admin', 'password': 'NHIT@Admin2026'}


def post(url, payload):
    req = urllib.request.Request(
        url, data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'}
    )
    return urllib.request.urlopen(req)


def get_json(url, cookie=None):
    req = urllib.request.Request(url)
    if cookie:
        req.add_header('Cookie', cookie)
    return json.load(urllib.request.urlopen(req))


# 1) login -> session cookie
resp = post(f'{BASE}/api/admin/login', LOGIN)
cookie = resp.headers.get('Set-Cookie', '').split(';')[0]
print('login cookie:', cookie[:40], '...')

# 2) fetch current homepage data
cur = get_json(f'{BASE}/api/admin/homepage', cookie)
data = cur['homepage']
original = json.dumps(data['outcomes'], ensure_ascii=False)
print('current videoOn/videoId:', data['outcomes'].get('videoOn'), '/', data['outcomes'].get('videoId'))

# 3) turn video OFF, save
data['outcomes']['videoOn'] = False
req = urllib.request.Request(
    f'{BASE}/api/admin/homepage',
    data=json.dumps({'homepage': data}).encode(),
    headers={'Content-Type': 'application/json', 'Cookie': cookie},
    method='PUT',
)
print('PUT videoOn=false ->', urllib.request.urlopen(req).status)

# 4) verify live page no longer renders the background video
html = urllib.request.urlopen(f'{BASE}/').read().decode()
print('bg present with video OFF:', 'edu-outcomes__bg-media' in html)

# 5) restore original values
data['outcomes'] = json.loads(original)
req = urllib.request.Request(
    f'{BASE}/api/admin/homepage',
    data=json.dumps({'homepage': data}).encode(),
    headers={'Content-Type': 'application/json', 'Cookie': cookie},
    method='PUT',
)
print('PUT revert ->', urllib.request.urlopen(req).status)

html = urllib.request.urlopen(f'{BASE}/').read().decode()
print('bg present after revert:', 'edu-outcomes__bg-media' in html)
print('iframe src in SSR html (should be False, lazy):', 'youtube-nocookie' in html)
