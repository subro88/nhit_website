#!/usr/bin/env python3
"""
Content enrichment from NHIT social/old-site research:
- homepage.json: new tagline hero, tour video, counters, CTA band copy
  + 5 new CMS sections (achievements, videoStrip, placementBars, socialWall, alumniVoices)
- pages.json: add career-outcomes mission bullet
- departments.json: real recruiting partners in careers descriptions
All new values remain fully editable from the admin panel.
"""
import json, io, sys

BASE = '/home/z/my-project/src/data/'

def load(p):
    with io.open(BASE + p, 'r', encoding='utf-8') as f:
        return json.load(f)

def save(p, d):
    with io.open(BASE + p, 'w', encoding='utf-8') as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
        f.write('\n')

hp = load('homepage.json')

# ── 1. Hero: tagline kicker + two-shift USP + campus tour video ──────────────
s0 = hp['hero']['slides'][0]
s0['kicker'] = 'Best and Top Diploma College in Durgapur'
s0['text'] = ('The first two-shift diploma college in Eastern India — six branches, '
              'two ITI trades and 40+ laboratories, affiliated to WBSCT&VE&SD.')
hp['hero']['tourLabel'] = 'Watch Campus Tour'
hp['hero']['tourVideo'] = 'xcXh2vLC7VU'  # "NHIT DURGAPUR Campus Life and Infra"

# ── 2. Counters: research-backed numbers (all editable in admin) ─────────────
hp['counters']['items'] = [
    {'target': 19,   'prefix': '', 'suffix': '+', 'label': 'Years of Academic Excellence'},
    {'target': 5000, 'prefix': '', 'suffix': '+', 'label': 'Placements'},
    {'target': 60,   'prefix': '', 'suffix': '+', 'label': 'Recruiting Partners'},
    {'target': 6000, 'prefix': '', 'suffix': '+', 'label': 'Alumni Members'},
]

# ── 3. CTA band: session CTA + click-to-call ─────────────────────────────────
hp['ctaBand'] = {
    'visible': True,
    'title': 'Ready To Build Your Career With NHIT?',
    'note': 'Admissions open for Session 2026–27. AICTE-approved diploma seats fill fast — talk to our admission cell today.',
    'btn1Text': 'Apply for 2026–27 Session',
    'btn1Href': '/admissions',
    'btn2Text': 'Call +91 98005 71423',
    'btn2Href': 'tel:+919800571423',
}

# ── 4. NEW: achievements marquee (designer 6 / content 9) ────────────────────
hp['achievements'] = {
    'visible': True,
    'heading': 'Achievements & Milestones',
    'items': [
        {'icon': 'fa-bolt',        'text': 'NSPCL Durgapur × NHIT joint programme — September 2026'},
        {'icon': 'fa-trophy',      'text': 'Students selected @ CMS IT Services as Associate Trainee Engineers — 2025'},
        {'icon': 'fa-building',    'text': 'RDC Concrete (India) campus placement success — 2025'},
        {'icon': 'fa-industry',    'text': 'Cummins India campus drive & selection list'},
        {'icon': 'fa-car',         'text': 'SIGMA Engineered Solutions campus drive at NHIT'},
        {'icon': 'fa-snowflake-o', 'text': 'Daikin India placements — HVAC careers'},
        {'icon': 'fa-check-circle','text': '18 of 19 eligible Automobile students placed — 2023 batch (94.7%)'},
    ],
}

# ── 5. NEW: Life at NHIT video strip (designer 1) ────────────────────────────
hp['videoStrip'] = {
    'visible': True,
    'kicker': 'Life At NHIT',
    'title': 'See The Campus In Motion',
    'sub': 'Real labs, real projects, real campus life — straight from the official NHIT YouTube channel.',
    'videos': [
        {'youtubeId': 'xcXh2vLC7VU', 'title': 'Campus Life & Infrastructure',
         'note': 'Walk the NHIT campus — classrooms, labs and workshops'},
        {'youtubeId': 'Bu83389zeWU', 'title': 'LED Assembly & Manufacturing Lab',
         'note': 'Electrical Engineering students build real LED products'},
        {'youtubeId': '-_KILOcTx2k', 'title': 'Smart Bridge Safety System',
         'note': 'ETCE final-year project — 2026 batch'},
    ],
    'ctaText': 'Watch more on YouTube',
    'ctaHref': 'https://www.youtube.com/@nhit_durgapur',
}

# ── 6. NEW: branch-wise placement bars + trust strip (designer 2 + 4) ────────
hp['placementBars'] = {
    'visible': True,
    'kicker': 'Placement Record',
    'title': 'Branch-Wise Placement Percentage',
    'sub': 'Eligible students placed through the Training & Placement Cell — 2020–23 batch records.',
    'bars': [
        {'label': 'Automobile Engineering',            'pct': '94.7', 'show': True},
        {'label': 'Mechanical Engineering',            'pct': '92.6', 'show': True},
        {'label': 'ITI Electrician (NCVT)',            'pct': '80.6', 'show': True},
        {'label': 'Electrical Engineering',            'pct': '80.0', 'show': True},
        {'label': 'ITI Fitter (NCVT)',                 'pct': '66.7', 'show': False},
        {'label': 'Electronics & Telecommunications',  'pct': '52.6', 'show': False},
        {'label': 'Civil Engineering',                 'pct': '26.7', 'show': False},
    ],
    'footnote': '* As recorded by the NHIT Training & Placement Cell (2020–23 batches). Branches can be switched on in the admin panel.',
    'trust': [
        {'icon': 'fa-flask',          'text': 'MoU — CSIR-CMERI, Govt. of India'},
        {'icon': 'fa-certificate',    'text': 'Life Member — Institution of Engineers (India)'},
        {'icon': 'fa-graduation-cap', 'text': 'Member — ISTE, New Delhi'},
        {'icon': 'fa-book',           'text': 'Institutional Member — British Council Library'},
        {'icon': 'fa-handshake-o',    'text': 'MoU — National Entrepreneurship Network'},
        {'icon': 'fa-laptop',         'text': 'Industry Tie-up — HCL'},
    ],
}

# ── 7. NEW: social wall (designer 5) ─────────────────────────────────────────
hp['socialWall'] = {
    'visible': True,
    'kicker': 'Join The Community',
    'title': 'NHIT On Social Media',
    'sub': 'Campus updates, placement announcements and student life — follow the official pages.',
    'cards': [
        {'icon': 'fa-facebook', 'name': 'Facebook', 'handle': 'facebook.com/nhit.in',
         'stat': '10K+ Followers', 'url': 'https://www.facebook.com/nhit.in',
         'note': 'Placement news, event albums and reels from campus'},
        {'icon': 'fa-linkedin', 'name': 'LinkedIn', 'handle': 'The New Horizons Institute of Technology',
         'stat': '2,696 Followers', 'url': 'https://in.linkedin.com/school/the-new-horizons-institute-of-technology/',
         'note': 'Alumni careers and industry updates'},
        {'icon': 'fa-youtube-play', 'name': 'YouTube', 'handle': '@nhit_durgapur',
         'stat': '447 Subscribers · 26 Videos', 'url': 'https://www.youtube.com/@nhit_durgapur',
         'note': 'Campus tours, lab demos and alumni podcasts'},
    ],
}

# ── 8. NEW: alumni voices (designer 7 / content 6) ───────────────────────────
hp['alumniVoices'] = {
    'visible': True,
    'kicker': 'Alumni Voices',
    'title': 'Hear It From NHIT Graduates',
    'sub': 'The official alumni podcast follows diploma engineers from NHIT classrooms to industry careers.',
    'voices': [
        {'youtubeId': 'uzoxE63xukI', 'name': 'Alumni Podcast — EP 1',
         'role': 'Diploma Civil Engineer Career Journey',
         'quote': 'From NHIT classrooms to live construction sites — an honest look at the diploma-to-career path.'},
        {'youtubeId': 'KBzRtl5-WfQ', 'name': 'Deepayan Das — EP 2',
         'role': 'CAD & BIM Engineer Career Journey',
         'quote': 'How workshop-first training at NHIT grew into a modern CAD and BIM engineering career.'},
    ],
}

save('homepage.json', hp)

# ── 9. About page: career-outcomes mission bullet (content 3) ────────────────
pg = load('pages.json')
vm = next(s for s in pg['about']['sections'] if s.get('type') == 'visionMission')
bullet = '**Career Outcomes:** 80–85% of eligible students placed or in B.Tech every year.'
if bullet not in vm['missionItems']:
    vm['missionItems'].append(bullet)
save('pages.json', pg)

# ── 10. Departments: real recruiting partners in careers copy (content 5) ────
dp = load('departments.json')
PARTNERS = {
    'computer-science-technology':
        ' Campus recruiting partners include CMS IT Services (2025 drive), backed by the institute\u2019s HCL industry tie-up.',
    'diploma-in-mechanical-engineering':
        ' Campus recruiting partners include Cummins India, SIGMA Engineered Solutions and Daikin — 15 recruiters in recent T&P records (2020–23).',
    'diploma-in-electrical-engineering':
        ' Campus recruiting partners include Daikin India and CMS IT Services — 14 recruiters in recent T&P records (2020–23).',
    'diploma-in-civil-engineering':
        ' Campus recruiting partners include RDC Concrete (India), with every civil recruiter tracked by the T&P Cell (2020–23).',
    'diploma-in-electronics-telecommunications-engineering':
        ' Campus recruiting partners include Daikin India and CMS IT Services — 10 recruiters in recent T&P records (2020–23).',
    'diploma-in-automobile-engineering':
        ' Campus recruiting partners include SIGMA Engineered Solutions and Cummins India — 18 of 19 eligible students placed in 2023 (94.7%).',
}
for slug, line in PARTNERS.items():
    dept = dp.get(slug)
    if not dept:
        print(f'WARN: dept missing: {slug}', file=sys.stderr)
        continue
    desc = dept.get('careers', {}).get('roles', {}).get('desc', '')
    if 'Campus recruiting partners include' not in desc:
        dept['careers']['roles']['desc'] = desc.rstrip() + line
save('departments.json', dp)

print('OK — homepage.json, pages.json, departments.json updated.')
