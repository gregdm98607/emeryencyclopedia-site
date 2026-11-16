#!/usr/bin/env python3
"""Build src/data/land/t18s-r8e-atlas-sample.json for the settler atlas sample page (W-CCO-206, BID-R-011).

Inputs (all already in this repo or the vault; nothing is drawn by hand):
  - src/data/land/castle-dale-land.json            the published land register (171 patents)
  - public/data/castle-dale-land/land_layers.geojson  BLM CadNSDI section and patent shapes
  - <vault>/C-Suite/CCO/_work/W-CCO-206_T18S_Extract.md  zone and family-link status per register row

Usage: python3 scripts/build-atlas-sample.py <path to W-CCO-206_T18S_Extract.md>
"""
import json, math, re, sys, datetime

TWP = 'T18S R8E'
PLSSID = 'UT260180S0080E0'
ZONES = {
    'castle-dale-townsite': 'Castle Dale townsite sections (secs. 33-34)',
    'castle-dale-fields': 'Castle Dale fields',
    'orangeville-side': 'Orangeville side',
    'other-in-township': 'Elsewhere in the township',
}

extract = open(sys.argv[1], encoding='utf-8').read()
ext = {}
for line in extract.splitlines():
    m = re.match(r'\|\s*(\d+)\s*\|', line)
    if not m:
        continue
    c = [x.strip() for x in line.strip().strip('|').split('|')]
    no, zone, link = int(c[0]), c[6], c[7]
    zones = [z.strip() for z in zone.split(',')]
    status = 'matched' if '(matched)' in link else 'likely' if '(probable)' in link else 'unlinked'
    ext[no] = {'zones': zones, 'link': status, 'sections': c[5]}

reg = json.load(open('src/data/land/castle-dale-land.json', encoding='utf-8'))
rows = []
for r in reg['rows']:
    if TWP not in r['legal']:
        continue
    if r['no'] not in ext:
        sys.exit(f"register row {r['no']} touches {TWP} but is not in the extract")
    e = ext[r['no']]
    rows.append({
        'no': r['no'], 'date': r['date'], 'year': int(r['date'][:4]), 'patentees': r['patentees'],
        'authority': r['authority'], 'acres': r['acres'], 'sections': e['sections'],
        'zone': e['zones'][0], 'zones': e['zones'], 'link': e['link'],
        'accession': r['accession'], 'url': r['url'],
    })
missing = set(ext) - {r['no'] for r in rows}
if missing:
    sys.exit(f'extract rows not found in the register for {TWP}: {sorted(missing)}')

geo = json.load(open('public/data/castle-dale-land/land_layers.geojson', encoding='utf-8'))
secs = [f for f in geo['features'] if f['properties']['kind'] == 'section' and f['properties'].get('plssid') == PLSSID]

def rings(geom):
    if geom['type'] == 'Polygon':
        return geom['coordinates']
    return [ring for poly in geom['coordinates'] for ring in poly]

pts = [p for f in secs for ring in rings(f['geometry']) for p in ring]
minx, maxx = min(p[0] for p in pts), max(p[0] for p in pts)
miny, maxy = min(p[1] for p in pts), max(p[1] for p in pts)
k = math.cos(math.radians((miny + maxy) / 2))
W = 1000.0
scale = W / ((maxx - minx) * k)
H = (maxy - miny) * scale

def path(geom):
    out = []
    for ring in rings(geom):
        seg, last = [], None
        for x, y in ring:
            q = (round((x - minx) * k * scale, 1), round((maxy - y) * scale, 1))
            if q != last:
                seg.append(q); last = q
        if len(seg) >= 3:
            out.append('M' + 'L'.join(f'{a},{b}' for a, b in seg) + 'Z')
    return ''.join(out)

def centroid(geom):
    p = [q for ring in rings(geom) for q in ring]
    x = (min(a for a, _ in p) + max(a for a, _ in p)) / 2
    y = (min(b for _, b in p) + max(b for _, b in p)) / 2
    return [round((x - minx) * k * scale, 1), round((maxy - y) * scale, 1)]

sections = [{'sec': f['properties']['sec'], 'd': path(f['geometry']), 'c': centroid(f['geometry'])}
            for f in sorted(secs, key=lambda f: f['properties']['sec'])]
by_no = {r['no']: r for r in rows}
parcels = []
for f in geo['features']:
    p = f['properties']
    if p['kind'] == 'patent' and p['n'] in by_no:
        parcels.append({'no': p['n'], 'd': path(f['geometry'])})
no_shape = sorted(set(by_no) - {p['no'] for p in parcels})

def count(key):
    out = {}
    for r in rows:
        out[r[key]] = out.get(r[key], 0) + 1
    return out

data = {
    'built': datetime.date.today().isoformat(),
    'registerBuilt': reg['lastBuilt'],
    'township': 'Township 18 South, Range 8 East, Salt Lake Meridian',
    'zones': ZONES,
    'counts': {
        'patents': len(rows), 'registerTotal': reg['counts']['patents'],
        'firstYear': min(r['year'] for r in rows), 'lastYear': max(r['year'] for r in rows),
        'acres': round(sum(r['acres'] for r in rows)),
        'matched': sum(r['link'] == 'matched' for r in rows),
        'likely': sum(r['link'] == 'likely' for r in rows),
        'unlinked': sum(r['link'] == 'unlinked' for r in rows),
        'authority': count('authority'), 'zone': count('zone'),
    },
    'map': {'width': W, 'height': round(H, 1), 'sections': sections, 'parcels': parcels, 'noShape': no_shape},
    'rows': rows,
}
json.dump(data, open('src/data/land/t18s-r8e-atlas-sample.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(json.dumps({k: v for k, v in data['counts'].items()}, indent=1))
print('sections', len(sections), 'parcels', len(parcels), 'rows without a shape', no_shape, 'map', W, round(H, 1))
