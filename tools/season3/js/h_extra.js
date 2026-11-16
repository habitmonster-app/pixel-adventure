// ===== 2026-11-16 사용자 요청: 리아에게 무료 순간이동 · 귀환석 · 메인/서브 표시 · 도감 11~20장 · 세계 지도 수로 =====

// ----- 1) 16장 첫 퀘스트: 리아에게 무료 순간이동 (왕성 밖에 있을 때만) -----
const riaFree3=()=>{const q=qCur();return !!(P&&q&&q.id==='Q16_01'&&!g3().ria16&&RGN.cur!=='D72'&&!RGN.busy&&!S2.wave&&!(S2.bs&&S2.bs.on)&&hero.st!=='dead');};
{const _d=drawQT;drawQT=function(){_d();const el=$('qtrack');if(!el||!P)return;
 try{const q0=qCur();if(q0&&q0.id==='Q16_01'&&P.q.st==='none'){const w=document.createTreeWalker(el,4);let t;while(t=w.nextNode())if(t.nodeValue.includes('(알림)에게 말 걸기'))t.nodeValue=t.nodeValue.replace('(알림)에게 말 걸기','왕실 기록관 리아에게 말 걸기');}}catch(e){}
 let b=el.querySelector('.tp3');
 if(!riaFree3()){if(b)b.remove();return;}
 if(!b){b=document.createElement('button');b.className='tp45 tp3';b.textContent='⚡ 리아에게 무료 순간이동';
  b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(!riaFree3())return;auto=null;SQAUTO=null;toast('✨ 왕실 기록관 리아에게 순간이동했어요 (무료)','g');tele3(1305,55,'왕실 기록관 리아');});}
 if(el.lastChild!==b)el.appendChild(b);};}

// ----- 2) 야영지 귀환석: 왜 있는지 보이게 돌 모양을 그리고 이름을 바꿈 -----
for(const n of SP5)if(n.g3&&n.k==='ret3')n.lb='귀환석 · 왕성으로 돌아가기';
function retStone3(){if(!in3())return;const n=SP5.find(n=>n.g3&&n.k==='ret3'&&n.r3===RGN.cur);if(!n)return;
 const x0=Math.round(n.x-cam.x),y0=Math.round(n.y-cam.y-4),t=now(),x=0,y=0;if(x0<-40||x0>VW+40||y0<-60||y0>VH+40)return;
 X.save();X.translate(x0,y0);X.scale(1.5,1.5);X.fillStyle='rgba(0,0,0,.28)';X.beginPath();X.ellipse(x,y+2,11,4,0,0,7);X.fill();
 X.fillStyle='#5a6274';X.fillRect(x-7,y-4,14,6);X.fillStyle='#7c8698';X.fillRect(x-5,y-22,10,19);X.fillStyle='#98a2b4';X.fillRect(x-5,y-22,3,19);X.fillStyle='#4a5262';X.fillRect(x+3,y-22,2,19);
 X.fillStyle='#7c8698';X.fillRect(x-3,y-25,6,3);
 const a=.65+.3*Math.sin(t*3);X.fillStyle=`rgba(150,220,255,${a})`;X.fillRect(x-1,y-18,2,8);X.fillRect(x-3,y-15,6,2);
 X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y-14,0,x,y-14,22);g.addColorStop(0,`rgba(120,200,255,${.28*a})`);g.addColorStop(1,'rgba(120,200,255,0)');X.fillStyle=g;X.fillRect(x-22,y-36,44,44);X.restore();}
window.retStone3=retStone3;

// ----- 3) 메인 퀘스트 표시: 대화창 이름 앞 '메인 퀘스트', 머리 위 '메인' -----
let MAINL3=null;
const mainLines3=()=>{if(MAINL3)return MAINL3;MAINL3=new Set();for(const q of QUESTS){if(q.say&&q.say[0])MAINL3.add(q.say[0]);if(q.done&&q.done[0])MAINL3.add(q.done[0]);}return MAINL3;};
{const _s=showLine;showLine=function(){_s();try{if(!talk||!talk.n)return;const L=talk.n.say;if(!L||!L[0]||!mainLines3().has(L[0]))return;
  const nm=$('msg').querySelector('.nm');if(!nm||nm.querySelector('.qtag'))return;const i=document.createElement('i');i.className='qtag';i.textContent='메인 퀘스트';nm.prepend(i);}catch(e){}};}
// 머리 위 표시: 메인 퀘스트를 주거나 보고받는 사람이면 '메인' (서브는 기존대로 '서브')
window.qMainTag3=function(e,mk,sx,sy){if(!mk)return;X.font='800 10px system-ui';X.textAlign='center';X.fillStyle='#000';X.fillText('메인',sx+1,sy-73);X.fillStyle='#ffd34a';X.fillText('메인',sx,sy-74);};

// ----- 4) 도감: 11~20장 몬스터 · 장비 레벨 · 다리 방어구 -----
DEXREG104.push('왕성 북문·서리길','서리항','은백림','빙정성채','빙월협곡','흑수늪','독버섯 숲','침수 정화성소','폐쇄 왕실 연구소','독뿌리 심장부');
DEXCH104.push({hp:2},{def:2},{atk:2},{hp:2},{hp:2,def:2,atk:2},{hp:2},{def:2},{atk:2},{hp:2},{hp:2,def:2,atk:2});
const isS3=(k,m)=>/^s[23]/.test(k)||/^s[23]/.test((m&&m.spr)||'');
const SMOB3=()=>Object.entries(MOB).filter(([k,m])=>isS3(k,m)&&m.spr&&m.lv>=51&&m.lv<=60&&!m.nodex);
// 도감 그림: 몬스터 그림판에서 앞을 보는 첫 칸을 잘라 써요 (그림이 다 불러와지면)
function dexIcon3(k){const m=MOB[k],im=IMG[m.spr],meta=SMETA[m.spr];if(!im||!im.complete||!im.naturalWidth||!meta)return false;
 const fw=meta.g2?meta.W:meta.cre?meta.fw:64,fh=meta.g2?meta.H:meta.cre?meta.fh:64,c=document.createElement('canvas');c.width=fw;c.height=fh;const g=c.getContext('2d');
 if(m.flt&&m.flt!=='none')g.filter=m.flt;g.drawImage(im,0,2*fh,fw,fh,0,0,fw,fh);
 let d;try{d=g.getImageData(0,0,fw,fh).data;}catch(e){return false;}
 let x0=fw,y0=fh,x1=-1,y1=-1;for(let y=0;y<fh;y++)for(let x=0;x<fw;x++)if(d[(y*fw+x)*4+3]>20){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}
 if(x1<0)return false;const o=document.createElement('canvas');o.width=x1-x0+1;o.height=y1-y0+1;o.getContext('2d').drawImage(c,x0,y0,o.width,o.height,0,0,o.width,o.height);
 DEXIMG104[k]=o.toDataURL('image/png').split(',')[1];return true;}
const DEXBLANK3='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
function dexIcons3(){let ch=0;for(const [k] of SMOB3())if(!DEXIMG104[k]||DEXIMG104[k]===DEXBLANK3){if(dexIcon3(k))ch=1;else if(!DEXIMG104[k])DEXIMG104[k]=DEXBLANK3;}return ch;}
{const _l=dexList104;dexList104=function(){dexIcons3();return _l().map(d=>{const m=MOB[d.k];if(isS3(d.k,m)&&m.lv>=51)d.ch=Math.min(20,m.lv-40);return d;});};
 const _o=openDex104;openDex104=function(){dexIcons3();return _o();};
 const _dd=drawDex104;drawDex104=function(){if(dexIcons3()){}return _dd();};
 const _dr=dexDrops104;dexDrops104=function(m){if(m.ch>=16){const L=(DROP3[m.lv]||[]).map(([k,p])=>MAT[k].n+' '+Math.round(p*100)+'%').join(' · ');return m.t?'시즌 3 재료 (보스·정예 보상)':(L||'시즌 3 재료');}
  if(m.ch>=11)return m.t?'시즌 2 재료 · 오로라 결정':'시즌 2 재료';return _dr(m);};}
DEXL104=null;
// 장비 도감: 시즌 2·3 장비 레벨을 맞추고(55·60) 다리 방어구도 보이게
{const _lv=lvOf81;lvOf81=function(b){if(typeof b==='string'){if(b.startsWith('s3_'))return 60;if(b.startsWith('s2_'))return 55;}return _lv(b);};
 if(!GD_SLOTS112.includes('legs'))GD_SLOTS112.splice(GD_SLOTS112.indexOf('armor')+1,0,'legs');
 const t=GD_TABS112.find(t=>t[0]==='armor');if(t&&!t[2].includes('legs'))t[2].push('legs');GDL112=null;}

// ----- 5) 세계 지도: 왕성 남동쪽 수로가 남쪽 늪으로 흘러 내려가는 물길 + 그 옆길 -----
const WMRIV3=[[130,30],[134,58],[138,84],[154,100],[166,126]];
window.WMX3=function(g){const P=WMRIV3;let acc=0;
 for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]);
  for(let s=0;s<L;s+=.5){const k=s/L,x=a[0]+(b[0]-a[0])*k,y=a[1]+(b[1]-a[1])*k,d=acc+s;if(d<7)continue;const w=Math.sin(d*.35)*1.2,dk=d>78;
   g.fillStyle=dk?'#2a4a3a':'#4a8ad8';g.fillRect(Math.round(x+w),Math.round(y),2,1);g.fillStyle=dk?'#3a6a4a':'#8ac0ff';if((d*2|0)%5===0)g.fillRect(Math.round(x+w),Math.round(y),1,1);
   if((d*2|0)%6===0&&d>9&&d<acc+L-0){g.fillStyle='#e8d7a0';g.fillRect(Math.round(x+w+4),Math.round(y),1,1);}}
  acc+=L;}};
