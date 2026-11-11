import json
from PIL import Image
G='/home/user/pixel-adventure/game/m/'
_c={}
def sheet(rid):
    if rid not in _c:_c[rid]=(json.load(open(G+'r_%s.json'%rid))['rect'],Image.open(G+'o_%s.png'%rid).convert('RGBA'))
    return _c[rid]
def crop(rid,name):
    r,im=sheet(rid);x,y,w,h=r[name];return im.crop((x,y,x+w,y+h))
