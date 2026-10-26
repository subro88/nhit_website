#!/bin/bash
# Test: hide the achievements marquee via CMS API → verify gone → revert
set -e
JAR=/home/z/my-project/scripts/.cookies.txt
BASE=http://localhost:3000

rm -f "$JAR"
LOGIN=$(curl -s -c "$JAR" -X POST "$BASE/api/admin/login" \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"NHIT@Admin2026"}')
echo "login: $(echo $LOGIN | head -c 80)"

DATA=$(curl -s -b "$JAR" "$BASE/api/admin/homepage")
python3 - << EOF
import json, io
d = json.loads('''$DATA''')['homepage']
print("achievements.visible before:", d['achievements'].get('visible', True))
d['achievements']['visible'] = False
io.open('/home/z/my-project/scripts/.payload-hide.json','w').write(json.dumps({'homepage': d}))
d['achievements']['visible'] = True
io.open('/home/z/my-project/scripts/.payload-show.json','w').write(json.dumps({'homepage': d}))
EOF

curl -s -b "$JAR" -X PUT "$BASE/api/admin/homepage" -H 'Content-Type: application/json' \
  -d @/home/z/my-project/scripts/.payload-hide.json > /dev/null
sleep 1
if curl -s "$BASE/" | rg -q "edu-achv__track"; then echo "HIDE TEST: FAIL (marquee still visible)"; else echo "HIDE TEST: PASS (marquee gone)"; fi

curl -s -b "$JAR" -X PUT "$BASE/api/admin/homepage" -H 'Content-Type: application/json' \
  -d @/home/z/my-project/scripts/.payload-show.json > /dev/null
sleep 1
if curl -s "$BASE/" | rg -q "edu-achv__track"; then echo "REVERT TEST: PASS (marquee back)"; else echo "REVERT TEST: FAIL"; fi

rm -f /home/z/my-project/scripts/.payload-hide.json /home/z/my-project/scripts/.payload-show.json "$JAR"
