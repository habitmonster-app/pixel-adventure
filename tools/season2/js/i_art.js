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

// ----- 지피티 효과 그림 2차 (gen_fx2.py가 만든 s2fx2_*.png, 한 줄 8칸) -----
// 예고 바닥 표시: 빨강(보통)·파랑(얼음, 불 곁이면 안 맞음) 그림을 실제 판정 크기에 맞춰 그림 (늘이지 않고, 직선은 양 끝·가운데 무늬는 그대로 두고 사이만 이음)
// 터질 때: 부채꼴 얼음·얼음 창·충격파·얼음 고리·얼음 가시·큰 폭발·거울 광선 / 세르카 보호막 · 봉인구 빛기둥
const FXA2={"fan2":{"k":"s2fx2_fan2","CW":204,"CH":193,"ax":102.0,"ay":191,"mw":200,"mh":189},"burst":{"k":"s2fx2_burst","CW":202,"CH":204,"ax":101.0,"ay":102.0,"mw":198,"mh":200},"ring3":{"k":"s2fx2_ring3","CW":203,"CH":204,"ax":101.5,"ay":102.0,"mw":199,"mh":200},"spear":{"k":"s2fx2_spear","CW":68,"CH":204,"ax":34.0,"ay":202,"mw":64,"mh":200},"spike2":{"k":"s2fx2_spike2","CW":177,"CH":204,"ax":88.5,"ay":202,"mw":173,"mh":200},"beam":{"k":"s2fx2_beam","CW":204,"CH":142,"ax":2,"ay":71.0,"mw":200,"mh":138},"shield":{"k":"s2fx2_shield","CW":204,"CH":204,"ax":102.0,"ay":102.0,"mw":200,"mh":200},"blast":{"k":"s2fx2_blast","CW":204,"CH":204,"ax":102.0,"ay":102.0,"mw":200,"mh":200},"wcirc":{"k":"s2fx2_wcirc","CW":204,"CH":196,"ax":102.0,"ay":98.0,"mw":200,"mh":192},"wcircb":{"k":"s2fx2_wcircb","CW":204,"CH":196,"ax":102.0,"ay":98.0,"mw":200,"mh":192},"wline":{"k":"s2fx2_wline","CW":304,"CH":150,"ax":152.0,"ay":75.0,"mw":300,"mh":146},"wlineb":{"k":"s2fx2_wlineb","CW":304,"CH":150,"ax":152.0,"ay":75.0,"mw":300,"mh":146},"pillar":{"k":"s2fx2_pillar","CW":222,"CH":264,"ax":111.0,"ay":262,"mw":218,"mh":260},"wfan17":{"k":"s2fx2_wfan17","CW":254,"CH":173,"ax":126.80597014925372,"ay":166.6865671641791,"R":145.67164179104478,"A":1.7},"wfan17b":{"k":"s2fx2_wfan17b","CW":254,"CH":173,"ax":126.80597014925372,"ay":166.6865671641791,"R":145.67164179104478,"A":1.7},"wfan22":{"k":"s2fx2_wfan22","CW":299,"CH":173,"ax":149.2537313432836,"ay":166.6865671641791,"R":145.67164179104478,"A":2.2},"wfan22b":{"k":"s2fx2_wfan22b","CW":299,"CH":173,"ax":149.2537313432836,"ay":166.6865671641791,"R":145.67164179104478,"A":2.2},"wfan26":{"k":"s2fx2_wfan26","CW":321,"CH":173,"ax":160.71641791044775,"ay":166.6865671641791,"R":145.67164179104478,"A":2.6},"wfan26b":{"k":"s2fx2_wfan26b","CW":321,"CH":173,"ax":160.71641791044775,"ay":166.6865671641791,"R":145.67164179104478,"A":2.6}};const FXL2=[];
for(const n in FXA2){const f=FXA2[n];IMG[f.k]=new Image();IMG[f.k].src='m/'+f.k+'.png';}
const fxOk2=n=>{const f=FXA2[n],im=f&&IMG[f.k];return im&&im.complete&&im.naturalWidth?im:null;};
// 직선 예고 그림 자르는 자리 (원본 칸 304×150 기준): 테두리 x14~292, 가운데 y77, 반높이 29
const WL2={x0:14,x1:292,cy:77,hh:29,lc:64,fill:[64,68],rc:240};
function fxPick2(e){if(e.k==='f')return ['fan2',e.r*1.08/FXA2.fan2.mh];
 if(e.k==='l'){if(e.label==='거울 광선')return ['beam',1,1];return ['spear',e.len/FXA2.spear.mh];}
 if(e.k==='c'){if(e.r>=180)return ['blast',e.r*2.15/FXA2.blast.mw];if((e.c||'').startsWith('190,230'))return ['spike2',e.r*2.4/FXA2.spike2.mw];if(e.r>=120)return ['burst',e.r*2.1/FXA2.burst.mh];if(e.r>=48)return ['ring3',e.r*2.2/FXA2.ring3.mh];return ['burst',e.r*2.3/FXA2.burst.mh];}return null;}
const _tgHitFx2=tgHit2;tgHit2=function(e){const r=_tgHitFx2(e);try{const p=fxPick2(e);if(p&&FXL2.length<30)FXL2.push({n:p[0],s:p[1],sy:p[2]||p[1],x:e.x,y:e.y,a:e.a||0,len:e.len,w:e.w,t0:performance.now(),T:p[0]==='spike2'||p[0]==='blast'?700:p[0]==='beam'?600:520});}catch(x){}return r;};
function fxLine2(im,f,fr,len,th){// 직선 예고: 양 끝·가운데 무늬는 그대로, 사이 빈 칸만 늘림
 const s=th/WL2.hh,ox=fr*f.CW,y0=-WL2.cy*s,H=f.CH*s,L=WL2;const d=(sx0,sx1,dx0,dx1)=>{if(dx1-dx0<.5||sx1<=sx0)return;X.drawImage(im,ox+sx0,0,sx1-sx0,f.CH,dx0,y0,dx1-dx0,H);};
 const lw=(L.lc-L.x0)*s,rw=(L.x1-L.rc)*s,cw=(L.rc-L.lc-(L.fill[1]-L.fill[0]))*s;
 if(len<lw+rw+cw){const k=len/((L.x1-L.x0)*s);X.save();X.scale(k,1);d(0,f.CW,-L.x0*s,(f.CW-L.x0)*s);X.restore();return;}
 d(0,L.lc,-L.x0*s,lw);d(L.rc,f.CW,len-rw,len+(f.CW-L.x1)*s);
 const c0=len/2-cw/2;d(L.fill[1],L.rc,c0,c0+cw);d(L.fill[0],L.fill[1],lw,c0+1);d(L.fill[0],L.fill[1],c0+cw-1,len-rw);}
function tgDraw2(){const cx=cam.x,cy=cam.y,t=performance.now();X.save();X.imageSmoothingEnabled=true;
 for(const e of S2.tg){const p=1-e.t/e.T,sx=e.x-cx,sy=e.y-cy;if(sx<-700||sx>VW+700||sy<-700||sy>VH+700)continue;
  const b=e.cold?'b':'',fr=Math.floor(t/(p>.7?55:95))%8,col=e.cold?'120,220,255':'255,60,60';let n,f,im;
  X.save();X.translate(sx,sy);X.globalAlpha=.72+.18*p;
  if(e.k==='c'){n='wcirc'+b;f=FXA2[n];im=fxOk2(n);X.scale(1,.7);
   if(im){const k=e.r/80;X.drawImage(im,fr*f.CW,0,f.CW,f.CH,-f.ax*k,-f.ay*k,f.CW*k,f.CH*k);}
   X.fillStyle=`rgba(${col},.30)`;X.beginPath();X.arc(0,0,e.r*p,0,7);X.fill();}
  else if(e.k==='f'){const A=e.arc;n='wfan'+(A<1.95?'17':A<2.4?'22':'26')+b;f=FXA2[n];im=fxOk2(n);X.rotate(e.a+Math.PI/2);
   if(im){const k=e.r/f.R;X.drawImage(im,fr*f.CW,0,f.CW,f.CH,-f.ax*k,-f.ay*k,f.CW*k,f.CH*k);}
   X.rotate(-Math.PI/2);X.fillStyle=`rgba(${col},.30)`;X.beginPath();X.moveTo(0,0);X.arc(0,0,e.r*p,-e.arc/2,e.arc/2);X.closePath();X.fill();}
  else if(e.k==='l'){n='wline'+b;f=FXA2[n];im=fxOk2(n);X.rotate(e.a);if(im)fxLine2(im,f,fr,e.len,e.w);
   X.fillStyle=`rgba(${col},.28)`;X.fillRect(0,-e.w,e.len*p,e.w*2);}
  if(!im){X.restore();X.save();X.translate(sx,sy);const c=e.c||'255,150,110';X.strokeStyle=`rgba(${c},.9)`;X.lineWidth=1.5;if(e.k==='c'){X.beginPath();X.ellipse(0,0,e.r,e.r*.7,0,0,7);X.stroke();}else if(e.k==='f'){X.beginPath();X.moveTo(0,0);X.arc(0,0,e.r,e.a-e.arc/2,e.a+e.arc/2);X.closePath();X.stroke();}else{X.rotate(e.a);X.strokeRect(0,-e.w,e.len,e.w*2);}}
  X.restore();
  if(e.label){X.font='900 11px system-ui';X.textAlign='center';X.fillStyle='#000';X.fillText(e.label,sx+1,sy+5);X.fillStyle='#fff';X.fillText(e.label,sx,sy+4);}}
 X.restore();}
function fxDraw2(){if(!FXL2.length)return;const now=performance.now();X.save();X.imageSmoothingEnabled=true;
 for(let i=FXL2.length-1;i>=0;i--){const o=FXL2[i],p=(now-o.t0)/o.T;if(p>=1){FXL2.splice(i,1);continue;}const f=FXA2[o.n],im=fxOk2(o.n);if(!im)continue;
  let fr=Math.min(7,Math.floor(p*8));if(o.fr)fr=o.fr(p);
  const sx=rp87(o.x-cam.x),sy=rp87(o.y-cam.y);X.save();X.translate(sx,sy+(o.oy||0));X.globalAlpha=p>.85?(1-p)/.15:1;
  if(o.n==='beam'){X.rotate(o.a);const th=Math.max(56,o.w*4),k=th/f.CH,hw=f.CW*.3;X.drawImage(im,fr*f.CW,0,hw,f.CH,-f.ax*k,-f.ay*k,hw*k,f.CH*k);X.drawImage(im,fr*f.CW+hw,0,f.CW-hw,f.CH,(hw-f.ax)*k,-f.ay*k,Math.max(1,o.len-(hw-f.ax)*k),f.CH*k);}
  else{if(o.n==='fan2'||o.n==='spear')X.rotate(o.a+Math.PI/2);else if(o.n==='blast'||o.n==='ring3'||o.n==='burst')X.scale(1,.7);
   X.scale(o.s,o.sy);X.drawImage(im,fr*f.CW,0,f.CW,f.CH,-f.ax,-f.ay,f.CW,f.CH);}
  X.restore();}
 X.restore();}
// 세르카 보호막: 생길 때 0~3칸 → 3·4칸 반복, 깨질 때 5~7칸
// 바닥(g2Ground)에서는 그림이 있으면 그리지 않고, 캐릭터를 다 그린 뒤 세르카 몸 위에 반투명으로 덮어 그림 (세르카가 비쳐 보이게)
function shDraw2(e,sx,sy){return !!fxOk2('shield');}
function shOver2(){const k=S2.sk,B=S2.bs;if(!k||!k.sh||!B||!B.e||B.id!=='serka')return;const f=FXA2.shield,im=fxOk2('shield');if(!im)return;const e=B.e,now=performance.now();if(!k._sh0)k._sh0=now;const q=(now-k._sh0)/1000;
 const fr=q<.4?Math.floor(q/.1):3+(Math.floor(q*5)%2),z=160/f.mh,sx=rp87(e.x-cam.x),sy=rp87(e.y-cam.y)-62;X.save();X.imageSmoothingEnabled=true;X.globalAlpha=.42+.06*Math.sin(now/260);X.drawImage(im,fr*f.CW,0,f.CW,f.CH,sx-f.ax*z,sy-f.ay*z,f.CW*z,f.CH*z);X.restore();}
function shWatch2(){const k=S2.sk,B=S2.bs;if(!k||!B||!B.e)return;if(k.sh){k._shW=1;return;}
 if(k._shW){k._shW=0;k._sh0=0;if(FXL2.length<30)FXL2.push({n:'shield',s:160/FXA2.shield.mh,sy:160/FXA2.shield.mh,x:B.e.x,y:B.e.y,oy:-62,a:0,t0:performance.now(),T:520,fr:p=>5+Math.min(2,Math.floor(p*3))});}}
const _drawSfxFx2=drawSfx;drawSfx=function(){_drawSfxFx2();if(P&&in2()){shWatch2();shOver2();fxDraw2();}};
// 봉인구를 꽂으면 제단에 금빛 빛기둥 (솟는 8칸 뒤 위쪽 3칸 반복)
const _seal2Fx=seal2;seal2=function(){const f=f2(),go=!f.seal15&&f.sup15&&!S2.end&&f.core15;const r=_seal2Fx.apply(this,arguments);
 try{if(go){const R=R2('D151'),x=tx5(R.altar[0]),y=ty5(R.altar[1])+6,z=230/FXA2.pillar.mh;FXL2.push({n:'pillar',s:z,sy:z,x,y,a:0,t0:performance.now(),T:5200,fr:p=>p<.25?Math.floor(p/.25*8):5+Math.floor(performance.now()/110)%3});}}catch(x){}return r;};
// ----- 새 NPC 5명 그림 (정면 8칸 숨쉬기) -----
const NPCART2={k2eil:'s2n2_eil',k2noah:'s2n2_noah',k2broom:'s2n2_broom',k2sena:'s2n2_sena',k2lum:'s2n2_lum'};
for(const k in NPCART2){const s=NPCART2[k];IMG[s]=new Image();IMG[s].src='m/'+s+'.png';SMETA[s]={g2:1,npc2:1,dir4:1,W:256,H:200,bl:8,hw:150,hs:58,na:0,a:null,n:0,c:64};}
