#!/usr/bin/env python3
"""Seed cardLabs lines (the original descriptive text from the hardcoded
/departments page) into departments.json so the refactored listing page
renders exactly the same text, now editable."""
import json

P = '/home/z/my-project/src/data/departments.json'
data = json.load(open(P))

lines = {
    'computer-science-technology': '7 Specialised Labs (Linux, DB, Networking)',
    'diploma-in-mechanical-engineering': 'Heavy Workshop Bays & UTM Testing Lab',
    'diploma-in-electrical-engineering': 'AC/DC Machine Testbeds & Control Systems',
    'diploma-in-civil-engineering': 'Surveying Field Lab & Soil Mechanics',
    'diploma-in-electronics-telecommunications-engineering': 'Microprocessor & Microwave Lab',
    'diploma-in-automobile-engineering': 'Engine Diagnostic & Vehicle Workshop',
}

for slug, line in lines.items():
    if slug in data:
        data[slug]['cardLabs'] = line

json.dump(data, open(P, 'w'), indent=2, ensure_ascii=False)
print('seeded cardLabs for', len(lines), 'departments')
