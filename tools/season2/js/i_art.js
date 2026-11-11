// ----- 지피티 보스·정예 그림 (gen_boss_art.py가 만든 s2b_*.png) -----
// 줄: 0 위 · 1 왼쪽 · 2 아래 · 3 오른쪽 · 4~ 공격(정면). 한 줄 8칸.
const BART2={"s2horn": {"k": "s2b_horn", "W": 256, "H": 200, "bl": 8, "hw": 150, "na": 1, "hs": 92}, "s2brak": {"k": "s2b_brak", "W": 256, "H": 200, "bl": 8, "hw": 150, "na": 1, "hs": 88}, "s2arbos": {"k": "s2b_arbos", "W": 256, "H": 200, "bl": 8, "hw": 150, "na": 1, "hs": 104}, "s2leorn": {"k": "s2b_leorn", "W": 256, "H": 200, "bl": 8, "hw": 150, "na": 1, "hs": 86}, "serka": {"k": "s2b_serka", "W": 256, "H": 200, "bl": 8, "hw": 150, "na": 3, "hs": 96}, "s2shadow": {"k": "s2b_shadow", "W": 256, "H": 200, "bl": 8, "hw": 150, "na": 0, "hs": 84}};
for(const id in BART2){const b=BART2[id];if(!MOB[id])continue;IMG[b.k]=new Image();IMG[b.k].src='m/'+b.k+'.png';SMETA[b.k]={g2:1,W:b.W,H:b.H,bl:b.bl,hw:b.hw,hs:b.hs,na:b.na,a:'slash',n:8,c:64,nosh:0};MOB[id].spr=b.k;MOB[id].sc=0;MOB[id].oy=b.hs-44;}
// 보스 기술이 나갈 때 공격 그림 한 번 (세르카: 찌르기 · 휘두르기 · 보호막)
function gaSet2(e,k){const m=e&&SMETA[e.k];if(!m||!m.g2||!m.na)return;const r={thrust:0,big:0,sweep:1,wave:1,shield:2}[k]||0;e.ga2={r:Math.min(r,m.na-1),t0:performance.now(),d:(k==='big'||k==='charge'||k==='shield'||k==='nova')?1.3:.9};}
const _drawEntB2=drawEnt;drawEnt=function(e){const meta=e&&e!==hero&&SMETA[e.k];if(!meta||!meta.g2)return _drawEntB2(e);
 const im=IMG[e.k];if(!im||!im.complete||!im.naturalWidth)return;const sx=rp87(e.x-cam.x),sy=rp87(e.y-cam.y),k=meta.hs/meta.hw,W=meta.W,H=meta.H;
 X.fillStyle='rgba(0,0,0,.25)';X.beginPath();X.ellipse(sx,sy-2,meta.hs*.32,meta.hs*.08,0,0,7);X.fill();
 let row=e.d|0,f=0;const now=performance.now();
 if(e.ga2&&e.st!=='dead'){const p=(now-e.ga2.t0)/1000/e.ga2.d;if(p<1){row=4+e.ga2.r;f=Math.min(7,Math.floor(p*8));}else e.ga2=null;}
 if(row<4){if(e.st==='walk'||e.st==='atk')f=((e.f|0)+7)%8;else f=Math.floor(now/260+(e.hx||0))%2?0:0;}
 if(e.st==='dead'&&e.fade!=null)X.globalAlpha=Math.max(0,Math.min(1,e.fade));
 const sm=X.imageSmoothingEnabled;X.imageSmoothingEnabled=true;
 const dr=()=>X.drawImage(im,f*W,row*H,W,H,sx-W*k/2,sy-(H-meta.bl)*k,W*k,H*k);dr();
 if(e.flash>0&&e.st!=='dead'){X.save();X.globalCompositeOperation='lighter';X.globalAlpha=Math.min(1,e.flash/타격감.번쩍)*.9;dr();X.restore();}
 X.imageSmoothingEnabled=sm;X.globalAlpha=1;};
