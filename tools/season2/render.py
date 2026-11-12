import json,sys
from PIL import Image
G='/home/user/pixel-adventure/game/'
def render(rid,x0=0,w=40,y0=14,h=30,out=None,game=G):
    d=json.load(open(game+'m/r_%s.json'%rid));T=Image.open(game+'m/tiles.png').convert('RGBA');O=Image.open(game+'m/o_%s.png'%rid).convert('RGBA')
    im=Image.new('RGBA',(w*32,h*32),(0,0,0,255))
    for y in range(h):
        for x in range(w):
            for i in d['g'][y0+y][x0+x]:
                im.alpha_composite(T.crop(((i%16)*32,(i//16)*32,(i%16)*32+32,(i//16)*32+32)),(x*32,y*32))
    X0=(d['x0']+x0)*32
    for n,ox,oy in sorted(d['obj'],key=lambda o:o[2]):
        r=d['rect'][n];px=ox-X0;py=oy-r[3]-y0*32
        if px>-r[2] and px<w*32 and py>-r[3] and py<h*32:
            c=O.crop((r[0],r[1],r[0]+r[2],r[1]+r[3]));im.alpha_composite(c,(max(px,0),max(py,0))) if px>=0 and py>=0 else im.paste(c,(px,py),c)
    im.save(out or '/tmp/r_%s.png'%rid)
if __name__=='__main__':
    a=sys.argv;render(a[1],int(a[2]),int(a[3]),int(a[4]),int(a[5]))
