#!/usr/bin/env python3
"""Update faculty-roster.json with old-site-exact data + avatar paths.

- avatar: /images/faculty/<person-slug>.jpg (downloaded from old site)
- experience: derived from old site numbers, 'N yrs' / '1 yr+' format
- designation/qualification: old-site text, lightly normalized
  (name-casing, degree abbreviations, 'Mathamatics' typo fix)
- people, count and display order stay exactly as they are now
  (HOD first — old site order is a WP listing quirk)
"""
import json
import re

ROSTER = '/home/z/my-project/content/faculty/faculty-roster.json'
EXTRACT = '/tmp/faculty_extract.json'

# person slug per (department, current-roster name)
SLUGS = {
    ('computer-science-technology', 'Shohini Das'): 'shohini-das',
    ('computer-science-technology', 'Ritam Bauri'): 'ritam-bauri',
    ('computer-science-technology', 'Ankita Roy'): 'ankita-roy',
    ('computer-science-technology', 'Sunetra Chattaraj'): 'sunetra-chattaraj',
    ('computer-science-technology', 'Shreyasi Mandal'): 'shreyasi-mandal',
    ('computer-science-technology', 'Saheli Shyam'): '',
    ('computer-science-technology', 'Chaitali Ghosh'): '',
    ('diploma-in-mechanical-engineering', 'Lalchand Sarkar'): 'lalchand-sarkar',
    ('diploma-in-mechanical-engineering', 'Pallab Naskar'): 'pallab-naskar',
    ('diploma-in-mechanical-engineering', 'Arun Kumar Dey'): 'arun-kumar-dey',
    ('diploma-in-mechanical-engineering', 'Abhinandan Mitra'): 'abhinandan-mitra',
    ('diploma-in-mechanical-engineering', 'Pallabi Maji'): 'pallabi-maji',
    ('diploma-in-mechanical-engineering', 'Arindam Dutta'): 'arindam-dutta',
    ('diploma-in-mechanical-engineering', 'Arunangshu Chakraborty'): 'arunangshu-chakraborty',
    ('diploma-in-mechanical-engineering', 'Anubhab Karmakar'): '',
    ('diploma-in-mechanical-engineering', 'Sagnik Chatterjee'): 'sagnik-chatterjee',
    ('diploma-in-mechanical-engineering', 'Tanushree Dey'): 'tanushree-dey',
    ('diploma-in-electronics-telecommunications-engineering', 'Arnab Mukhopadhyay'): 'arnab-mukhopadhyay',
    ('diploma-in-electronics-telecommunications-engineering', 'Uttam Kumar Nandi'): 'uttam-kumar-nandi',
    ('diploma-in-electronics-telecommunications-engineering', 'Aditi Bardhan'): 'aditi-bardhan',
    ('diploma-in-electronics-telecommunications-engineering', 'Arpita Ghosh'): 'arpita-ghosh',
    ('diploma-in-electrical-engineering', 'Sudeshna Mukherjee'): 'sudeshna-mukherjee',
    ('diploma-in-electrical-engineering', 'Rajib Sukul'): 'rajib-sukul',
    ('diploma-in-electrical-engineering', 'Rahul Ghosh'): 'rahul-ghosh',
    ('diploma-in-electrical-engineering', 'Malancha Ghosh'): 'malancha-ghosh',
    ('diploma-in-electrical-engineering', 'Souvik Pramanik'): 'souvik-pramanik',
    ('diploma-in-electrical-engineering', 'Prabhat Kumar Ghosh'): 'prabhat-kumar-ghosh',
    ('diploma-in-electrical-engineering', 'Shatarupa Mullick Dey'): 'shatarupa-mullick-dey',
    ('diploma-in-electrical-engineering', 'Sabyasachi Mukherjee'): 'sabyasachi-mukherjee',
    ('diploma-in-electrical-engineering', 'Chandra Sarkar'): 'chandra-sarkar',
    ('diploma-in-electrical-engineering', 'Priyam Dey'): 'priyam-dey',
    ('diploma-in-civil-engineering', 'Partha De'): 'partha-de',
    ('diploma-in-civil-engineering', 'Shyaama Choran Mukherjee'): 'shyaama-choran-mukherjee',
    ('diploma-in-civil-engineering', 'Sanchita Bhattacharjee'): 'sanchita-bhattacharjee',
    ('diploma-in-civil-engineering', 'Raktima Chakraborty'): 'raktima-chakraborty',
    ('diploma-in-automobile-engineering', 'Krishanu Sarkar'): 'krishanu-sarkar',
    ('diploma-in-automobile-engineering', 'Sourav Chakraborty'): 'sourav-chakraborty',
    ('diploma-in-automobile-engineering', 'Mrinmoy Ghosh'): 'mrinmoy-ghosh',
    ('diploma-in-automobile-engineering', 'Subir Mukhopadhyay'): 'subir-mukhopadhyay',
    ('diploma-in-automobile-engineering', 'Arindam Joardar'): 'arindam-joardar',
}

# old-site exact designation/qualification/experience per person-slug
OLD = {
    'shohini-das': ('Lecturer', 'B.Tech (CSD)', '1 yr'),
    'ritam-bauri': ('Sr. Lecturer', 'Masters of Engineering (CSE)', '2 yrs'),
    'ankita-roy': ('Lecturer', 'MCA', '2 yrs'),
    'sunetra-chattaraj': ('Lecturer', 'MCA', '2 yrs'),
    'shreyasi-mandal': ('Lecturer', 'B.Tech (IT)', '1 yr+'),
    'saheli-shyam': ('Lecturer', 'MCA', '1 yr'),
    'chaitali-ghosh': ('Lecturer', 'B.Tech (CSE)', '1 yr'),
    'lalchand-sarkar': ('Lecturer', 'B.Tech (ME)', '1 yr'),
    'pallab-naskar': ('HOD', 'B.Tech Mechanical', '13 yrs'),
    'arun-kumar-dey': ('Lab Assistant', 'ITI Machinist & B.Com', '14 yrs'),
    'abhinandan-mitra': ('Lecturer', 'B.Tech Mechanical', '3 yrs'),
    'pallabi-maji': ('Lecturer', 'B.Tech Mechanical', '3 yrs'),
    'arindam-dutta': ('Lecturer', 'M.Sc Chemistry', '18 yrs'),
    'arunangshu-chakraborty': ('Lecturer', 'B.Tech (ME)', '2 yrs'),
    'anubhab-karmakar': ('Lecturer', 'B.Tech Mechanical', '0 yr'),
    'sagnik-chatterjee': ('Sr. Lecturer', 'M.Com', '14 yrs'),
    'tanushree-dey': ('Sr. Lecturer', 'B.Tech Mechanical', '8 yrs'),
    'arnab-mukhopadhyay': ('HOD', 'M.Tech ECE', '13 yrs'),
    'uttam-kumar-nandi': ('Lecturer', 'M.Tech VLSI', '14 yrs'),
    'aditi-bardhan': ('Lecturer', 'M.Tech ECE', '13 yrs'),
    'arpita-ghosh': ('Lecturer', 'AMIE ECE', '8 yrs'),
    'sudeshna-mukherjee': ('HOD', 'M.Tech Electrical', '9 yrs'),
    'rajib-sukul': ('Lecturer', 'M.Tech Electrical', '8 yrs'),
    'rahul-ghosh': ('Lecturer', 'M.Tech Power Electronics', '7 yrs'),
    'malancha-ghosh': ('Lecturer', 'M.Tech Electrical', '1 yr'),
    'souvik-pramanik': ('Lecturer', 'B.Tech Electrical', '1 yr'),
    'prabhat-kumar-ghosh': ('Lecturer', 'M.Sc Physics', '12 yrs'),
    'shatarupa-mullick-dey': ('Lecturer', 'B.Tech ECE', '1 yr'),
    'sabyasachi-mukherjee': ('Asst. Lecturer', 'B.Tech (EE)', '1 yr+'),
    'chandra-sarkar': ('Lecturer', 'M.Tech (IT), B.Tech (EE)', '1 yr+'),
    'priyam-dey': ('Lecturer', 'B.Tech (EE)', '1 yr+'),
    'partha-de': ('HOD', 'B.Tech Civil', '12 yrs'),
    'shyaama-choran-mukherjee': ('Lecturer', 'B.Tech Civil', '10 yrs'),
    'sanchita-bhattacharjee': ('Lecturer', 'MA English & MBA', '7 yrs'),
    'raktima-chakraborty': ('Lecturer', 'MA English', '1 yr'),
    'krishanu-sarkar': ('Lecturer', 'B.Tech Automobile', '1 yr'),
    'sourav-chakraborty': ('Lecturer', 'B.Tech Mechanical', '5 yrs'),
    'mrinmoy-ghosh': ('Lecturer', 'M.Sc Mathematics', '10 yrs'),
    'subir-mukhopadhyay': ('Lecturer', 'M.Sc Mathematics', '9 yrs'),
    'arindam-joardar': ('Lecturer', 'B.Tech (ME)', '1 yr+'),
}


def slugify(name: str) -> str:
    s = name.lower().replace('[^a-z0-9\\s-]', '')
    return re.sub(r'[^a-z0-9\s-]', '', s).strip().replace(' ', '-')


# people with no photo on the old site — data by (department, name)
OLD_BY_KEY = {
    ('computer-science-technology', 'Saheli Shyam'): ('Lecturer', 'MCA', '1 yr'),
    ('computer-science-technology', 'Chaitali Ghosh'): ('Lecturer', 'B.Tech (CSE)', '1 yr'),
    ('diploma-in-mechanical-engineering', 'Anubhab Karmakar'): ('Lecturer', 'B.Tech Mechanical', '0 yr'),
}

roster = json.load(open(ROSTER))
updated, missing_slug = 0, []
for f in roster:
    key = (f['department'], f['name'])
    pslug = SLUGS.get(key)
    if pslug is None:
        missing_slug.append(key)
        continue
    old = OLD.get(pslug) if pslug else OLD_BY_KEY.get(key)
    if not old:
        missing_slug.append(key)
        continue
    f['designation'], f['qualification'], f['experience'] = old
    f['avatar'] = f'/images/faculty/{pslug}.jpg' if pslug else ''
    f['slug'] = slugify(f['name'])
    updated += 1

json.dump(roster, open(ROSTER, 'w'), indent=2, ensure_ascii=False)
print(f'updated {updated}/{len(roster)} entries; unmatched: {missing_slug}')
