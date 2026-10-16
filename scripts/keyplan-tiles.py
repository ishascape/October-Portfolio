# Fetches Terrarium elevation tiles for the key plan bounds into elev.npz (run before keyplan-gen.py).
import math, urllib.request, io, numpy as np
from PIL import Image
Z=12
W,E,N,S=151.145,151.285,-33.846,-33.948
def tile(lon,lat):
    n=2**Z; x=(lon+180)/360*n; y=(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n; return x,y
x0,y0=tile(W,N); x1,y1=tile(E,S)
tx=range(int(x0),int(x1)+1); ty=range(int(y0),int(y1)+1)
rows=[]
for y in ty:
    row=[]
    for x in tx:
        u=f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{Z}/{x}/{y}.png'
        im=np.asarray(Image.open(io.BytesIO(urllib.request.urlopen(u,timeout=30).read())).convert('RGB')).astype(float)
        row.append(im[...,0]*256+im[...,1]+im[...,2]/256-32768)
    rows.append(np.hstack(row))
el=np.vstack(rows)
np.savez('elev.npz', el=el, tx0=tx[0], ty0=ty[0], Z=Z)
print(el.shape, el.min(), el.max())
