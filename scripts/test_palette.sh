#!/bin/bash
# Test: palette switch edit -> live -> revert via admin API
set -e
BASE="http://localhost:3000"
JAR="/tmp/nhit_cookies.txt"

echo "1) Login as super admin..."
curl -s -c "$JAR" -X POST "$BASE/api/admin/login" \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"NHIT@Admin2026"}' | head -c 120
echo

echo "2) Fetch homepage JSON and switch palette to royal-blue..."
python3 - <<'EOF'
import json, urllib.request

jar = open('/tmp/nhit_cookies.txt').read()
cookie = ''
for line in jar.splitlines():
    if 'nhit_admin_session' in line:
        cookie = 'nhit_admin_session=' + line.split('\t')[-1].strip()

req = urllib.request.Request('http://localhost:3000/api/admin/homepage', headers={'Cookie': cookie})
data = json.load(urllib.request.urlopen(req))['homepage']
data['theme'] = {'palette': 'royal-blue'}
out = urllib.request.Request(
    'http://localhost:3000/api/admin/homepage',
    data=json.dumps({'homepage': data}).encode(),
    headers={'Cookie': cookie, 'Content-Type': 'application/json'},
    method='PUT')
print('save:', urllib.request.urlopen(out).read().decode())
EOF

echo "3) Check live page data-theme..."
sleep 1
curl -s "$BASE/" | grep -o 'data-theme="[^"]*"' | head -1

echo "4) Revert to nhit-red..."
python3 - <<'EOF'
import json, urllib.request

jar = open('/tmp/nhit_cookies.txt').read()
cookie = ''
for line in jar.splitlines():
    if 'nhit_admin_session' in line:
        cookie = 'nhit_admin_session=' + line.split('\t')[-1].strip()

req = urllib.request.Request('http://localhost:3000/api/admin/homepage', headers={'Cookie': cookie})
data = json.load(urllib.request.urlopen(req))['homepage']
data['theme'] = {'palette': 'nhit-red'}
out = urllib.request.Request(
    'http://localhost:3000/api/admin/homepage',
    data=json.dumps({'homepage': data}).encode(),
    headers={'Cookie': cookie, 'Content-Type': 'application/json'},
    method='PUT')
print('revert:', urllib.request.urlopen(out).read().decode())
EOF

echo "5) Final check..."
sleep 1
curl -s "$BASE/" | grep -o 'data-theme="[^"]*"' | head -1
echo "DONE"
