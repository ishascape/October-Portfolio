# Builds src/components/keyplanData.ts. Run from a folder holding suburb-10-nsw.geojson
# (github.com/tonywr71/GeoJson-Data) and elev.npz from keyplan-tiles.py. Needs shapely, numpy, scikit-image.
# Usage: python3 keyplan-gen.py path/to/keyplanData.ts
import json, math, numpy as np, sys
from shapely.geometry import shape, box, Polygon, MultiPolygon, LineString, Point
from shapely.ops import unary_union
from skimage import measure, filters
W,E,N,S=151.06,151.30,-33.825,-34.0
VW=480; VH=round(VW*(N-S)/((E-W)*math.cos(math.radians((N+S)/2))))
def P(lon,lat): return ((lon-W)/(E-W)*VW, (N-lat)/(N-S)*VH)
bb=box(W,S,E,N)
d=json.load(open('suburb-10-nsw.geojson'))
subs=[]; names={}
for f in d['features']:
    g=shape(f['geometry'])
    if f['properties']['nsw_loca_2'] in ('BOTANY BAY','SYDNEY HARBOUR','PORT JACKSON'): continue  # water localities
    if not g.intersects(bb): continue
    g=g.buffer(0).intersection(bb)
    if g.is_empty: continue
    subs.append(g); names[f['properties']['nsw_loca_2']]=g
land=unary_union(subs)
land=land.simplify(0.00025)
def ring(coords, close=True):
    pts=[P(x,y) for x,y in coords]
    s='M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in pts)
    return s+('Z' if close else '')
def polys(g):
    if isinstance(g,Polygon): return [g]
    if hasattr(g,'geoms'): return [p for p in g.geoms if isinstance(p,Polygon)]
    return []
land_d=' '.join(ring(p.exterior.coords)+''.join(' '+ring(i.coords) for i in p.interiors) for p in polys(land) if p.area>2e-6)
# suburb boundaries: union of boundaries, minus the coast
bounds=unary_union([s.boundary for s in subs]).simplify(0.00025)
inner=bounds.difference(land.boundary.buffer(0.0003)).difference(bb.boundary.buffer(0.0001))
def lines(g):
    if isinstance(g,LineString): return [g]
    if hasattr(g,'geoms'): return [l for x in g.geoms for l in lines(x)]
    return []
sub_d=' '.join(ring(l.coords,False) for l in lines(inner) if l.length>0.0008)
# contours
z=np.load('elev.npz'); el=z['el']; tx0=int(z['tx0']); ty0=int(z['ty0']); Z=int(z['Z'])
el=filters.gaussian(np.clip(el,-50,200),sigma=2.2,preserve_range=True)
n=256*2**Z
def pix2ll(r,c):
    lon=(tx0*256+c)/n*360-180
    lat=math.degrees(math.atan(math.sinh(math.pi*(1-2*(ty0*256+r)/n))))
    return lon,lat
cont=[]
landbuf=land.buffer(-0.0004)
for lvl in range(20,141,20):
    for cs in measure.find_contours(el,lvl):
        if len(cs)<12: continue
        ls=LineString([pix2ll(r,c) for r,c in cs]).simplify(0.0003)
        ls=ls.intersection(landbuf).intersection(bb)
        for l in lines(ls):
            if l.length>0.004: cont.append((lvl,ring(l.coords,False)))
con_d={}
for lvl,s in cont: con_d.setdefault(lvl,[]).append(s)
zc=names['ZETLAND'].representative_point()
labels={k:P(*names[k].representative_point().coords[0]) for k in ['SURRY HILLS','NEWTOWN','BONDI','RANDWICK','MASCOT','MARRICKVILLE','BALMAIN','MOSMAN','NORTH SYDNEY','GLEBE','ALEXANDRIA','LEICHHARDT','REDFERN','SYDNEY'] if k in names}
km=VW/((E-W)*111.32*math.cos(math.radians((N+S)/2)))
out=f'''// Generated from NSW suburb boundaries (tonywr71/GeoJson-Data) and Terrarium elevation tiles.
// Bounds {W},{N} to {E},{S}; equirectangular, north up. Regenerate rather than hand-edit.
export const VIEW = {{ w: {VW}, h: {VH} }}
export const PX_PER_KM = {km:.2f}
export const LAND = '{land_d}'
export const SUBURBS = '{sub_d}'
export const CONTOURS: [number, string][] = {json.dumps([[k,' '.join(v)] for k,v in sorted(con_d.items())])}
export const ZETLAND = {{ x: {P(*zc.coords[0])[0]:.1f}, y: {P(*zc.coords[0])[1]:.1f} }}
export const SUBURB_LABELS: [string, number, number][] = {json.dumps([[k.title(),round(x,1),round(y,1)] for k,(x,y) in labels.items()])}
export const PLACES = {json.dumps({k:[round(v,1) for v in P(*ll)] for k,ll in {'harbour':(151.232,-33.846),'botany':(151.165,-33.992),'sea':(151.29,-33.90),'cbd':(151.207,-33.870)}.items()})}
'''
open(sys.argv[1],'w').write(out)
print(VH, km, len(out), {k:len(v) for k,v in con_d.items()}, labels.keys())
