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
 if(row<4){if(meta.npc2){const dx=e.x-(e._px??e.x),dy=e.y-(e._py??e.y);e._px=e.x;e._py=e.y;if(Math.abs(dx)+Math.abs(dy)>.05){e._mv=now;e._d2=Math.abs(dx)>Math.abs(dy)?(dx<0?1:3):(dy<0?0:2);e._wf=(e._wf||0)+Math.hypot(dx,dy);}const mv=meta.dir4&&e._mv&&now-e._mv<150;if(mv){row=e._d2;f=Math.floor(e._wf/9)%8;}else if(!meta.dir4||(e._d2??2)===2){row=2;f=Math.floor(now/180+(e.hx||0)*.01)%8;}else{row=e._d2;f=0;}}else if(e.st==='walk'||e.st==='atk')f=((e.f|0)+7)%8;else f=0;}
 if(e.st==='dead'&&e.fade!=null)X.globalAlpha=Math.max(0,Math.min(1,e.fade));
 const sm=X.imageSmoothingEnabled;X.imageSmoothingEnabled=true;
 const dr=()=>X.drawImage(im,f*W,row*H,W,H,sx-W*k/2,sy-(H-meta.bl)*k,W*k,H*k);dr();
 if(e.flash>0&&e.st!=='dead'){X.save();X.globalCompositeOperation='lighter';X.globalAlpha=Math.min(1,e.flash/타격감.번쩍)*.9;dr();X.restore();}
 X.imageSmoothingEnabled=sm;X.globalAlpha=1;};

// ----- 지피티 효과 그림 (gen_fx_art.py가 만든 s2fx_*.png) -----
// 예고가 끝나 공격이 터질 때 그림을 한 번 재생 (0.5초, 8칸)
const FXA2={"fan": {"k": "s2fx_fan", "CW": 204, "CH": 156, "ax": 102.0, "ay": 154, "mw": 200, "mh": 152}, "line": {"k": "s2fx_line", "CW": 204, "CH": 69, "ax": 2, "ay": 34.5, "mw": 200, "mh": 65}, "nova": {"k": "s2fx_nova", "CW": 204, "CH": 146, "ax": 102.0, "ay": 73.0, "mw": 200, "mh": 142}, "spike": {"k": "s2fx_spike", "CW": 150, "CH": 204, "ax": 75.0, "ay": 202, "mw": 146, "mh": 200}, "ring": {"k": "s2fx_ring", "CW": 192, "CH": 204, "ax": 96.0, "ay": 102.0, "mw": 188, "mh": 200}};const FXL2=[];
for(const n in FXA2){const f=FXA2[n];IMG[f.k]=new Image();IMG[f.k].src='m/'+f.k+'.png';}
function fxPick2(e){if(e.k==='f')return ['fan',e.r*1.15/FXA2.fan.mh];
 if(e.k==='l')return ['line',e.len/FXA2.line.mw,Math.max(40,e.w*2.6)/FXA2.line.mh];
 if(e.k==='c'){if(e.r>=120)return ['nova',e.r*2.1/FXA2.nova.mw];if((e.c||'').startsWith('190,230'))return ['spike',e.r*2.2/FXA2.spike.mw];return ['ring',e.r*2.1/FXA2.ring.mw];}return null;}
const _tgHitFx2=tgHit2;tgHit2=function(e){const r=_tgHitFx2(e);try{const p=fxPick2(e);if(p&&FXL2.length<30)FXL2.push({n:p[0],s:p[1],sy:p[2]||p[1],x:e.x,y:e.y,a:e.a||0,t0:performance.now(),T:p[0]==='spike'?650:500});}catch(x){}return r;};
function fxDraw2(){if(!FXL2.length)return;const now=performance.now();X.save();X.imageSmoothingEnabled=true;
 for(let i=FXL2.length-1;i>=0;i--){const o=FXL2[i],p=(now-o.t0)/o.T;if(p>=1){FXL2.splice(i,1);continue;}const f=FXA2[o.n],im=IMG[f.k];if(!im||!im.complete||!im.naturalWidth)continue;
  const fr=Math.min(7,Math.floor(p*8)),sx=rp87(o.x-cam.x),sy=rp87(o.y-cam.y);X.save();X.translate(sx,sy);X.globalAlpha=p>.8?(1-p)/.2:1;
  if(o.n==='fan')X.rotate(o.a+Math.PI/2);else if(o.n==='line')X.rotate(o.a);else if(o.n==='nova'||o.n==='ring')X.scale(1,.7);
  X.scale(o.s,o.sy);X.drawImage(im,fr*f.CW,0,f.CW,f.CH,-f.ax,-f.ay,f.CW,f.CH);X.restore();}
 X.restore();}
const _drawSfxFx2=drawSfx;drawSfx=function(){_drawSfxFx2();if(P&&in2())fxDraw2();};
// ----- 새 NPC 5명 그림 (정면 8칸 숨쉬기) -----
const NPCART2={k2eil:'s2n2_eil',k2noah:'s2n2_noah',k2broom:'s2n2_broom',k2sena:'s2n2_sena',k2lum:'s2n2_lum'};
for(const k in NPCART2){const s=NPCART2[k];IMG[s]=new Image();IMG[s].src='m/'+s+'.png';SMETA[s]={g2:1,npc2:1,dir4:1,W:256,H:200,bl:8,hw:150,hs:58,na:0,a:null,n:0,c:64};}
