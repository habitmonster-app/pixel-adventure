// ----- 지도 표시 -----
{const L=[['D161',3262,30,'남부 검문소 · 마렌·엘리아·리아','남부 검문소',0],['D161',3288,20,'정화잎 습지 Lv56','정화잎 습지',1],['D161',3322,40,'흑수늪','흑수늪',1],['D161',3354,40,'늪지기의 웅덩이 (보스)','늪지기',1],
  ['D171',3382,30,'약초꾼 쉼터 · 하린','약초꾼 쉼터',0],['D171',3428,30,'거대 버섯 군락 Lv57','버섯 군락',1],['D171',3452,13,'늪철 광맥','늪철 광맥',1],['D171',3476,44,'포자여왕의 둥지 (보스)','포자여왕',1],
  ['D181',3500,30,'무너진 신전 계단 · 야영지','성소 야영지',0],['D181',3532,30,'중앙 대전 Lv58','중앙 대전',1],['D181',3524,8,'북서 수정맥','수정맥',1],['D181',3577,30,'수호자 제단 (보스)','수호자',1],
  ['D191',3610,30,'왕실 인장문 앞 야영지 · 우르반','연구소 야영지',0],['D191',3638,30,'배양실 Lv59','배양실',1],['D191',3666,30,'흑수정 정제실','정제실',1],['D191',3694,30,'융합실 (보스)','융합실',1],
  ['D201',3720,30,'마지막 남부 야영지','남부 야영지',0],['D201',3760,32,'역병 제단 · 세 번째 마계문 Lv60','역병 제단',1]].map(([r,x,y,n,s,h])=>({n,s,x:x-MAP.cx,y:y-MAP.cy,hunt:h,f3:s,r5:r}));
 POI.push(...L);if(POI31!==POI)POI31.push(...L);}
const _areaNameS3=areaName;areaName=function(){if(!in3())return _areaNameS3();const r=R3x(RGN.cur),tx=hero.x/TS,ty=hero.y/TS;const a=(r.areas||[]).find(a=>tx>=a[1]&&tx<=a[3]+1&&ty>=a[2]&&ty<=a[4]+1);
 return (a?a[0]:RGNM5[RGN.cur])+(inSafe3(hero.x,hero.y)?' · 안전':inFog3(hero.x,hero.y)?' · 독안개':'');};
const _doAttackS3=doAttack;doAttack=function(){if(G3.end)return;_doAttackS3();};
const _castSkillS3=castSkill;castSkill=function(id,s){if(G3.end)return false;return _castSkillS3(id,s);};
function buildLights3(){if(typeof buildLights5==='function')buildLights5();if(!in3()||typeof LIGHTS5==='undefined')return;const r=R3x(RGN.cur);
 for(const b of safes3().slice(1))LIGHTS5.push({x:(b[0]+.5)*TS,y:(b[1]-.3)*TS,r:3.4*TS,c:'150,240,120',k:'c',o:b[0]%7});
 if(RGN.cur==='D201'&&g3().seal20&&r.altar)LIGHTS5.push({x:(r.altar[0]+.5)*TS,y:(r.altar[1]-1)*TS,r:6*TS,c:'255,230,150',k:'t',o:1});}

// ----- 매 프레임 -----
function f3sTick(dt){if(!P||RGN.busy)return;capSync3();
 if(G3.fin&&!in3()&&RGN.cur==='D72'&&!S5.busy&&!S5.pend&&!auto){const p=G3.fin;G3.fin=null;setTimeout(()=>p.rid?go5(p):goTo(p),200);}
 if(G3.pend&&in3()&&!S5.busy&&!S5.pend&&!auto){const t=G3.pend;G3.pend=null;setTimeout(()=>go5(t),150);}
 if((G3.fin||G3.pend)&&(Math.hypot(joy.x,joy.y)>.2||key.w||key.a||key.s||key.d)){G3.fin=null;G3.pend=null;}
 if(G3.hidT>0)G3.hidT-=dt;if(G3.memCd>0)G3.memCd-=dt;
 if(hero.st==='dead'&&in3()&&!G3.dead){G3.dead=1;const c=R3x(RGN.cur).camp;G3.ckpt={x:PLAZA.x,y:PLAZA.y};PLAZA.x=tx5(c[0]-1);PLAZA.y=ty5(c[1]+2);S2.tg.length=0;}
 if(G3.dead&&hero.st!=='dead'){G3.dead=0;if(G3.ckpt){PLAZA.x=G3.ckpt.x;PLAZA.y=G3.ckpt.y;G3.ckpt=null;}G3.safeT=2.5;toast('야영지 모닥불 곁에서 다시 일어났어요 · 켠 장치와 구한 사람들은 그대로예요','g');}
 if(!in3())return;
 if(G3.safeT>0)G3.safeT-=dt;
 for(let i=S2.tg.length-1;i>=0;i--){const e=S2.tg[i];e.t-=dt;if(e.t<=0){S2.tg.splice(i,1);const h=tgHit2(e);if(h&&e.psn&&hero.st!=='dead')psnApply84(PSNB3(),3,8);e.on&&e.on();}}
 if(G3.end)return;
 fogTick3(dt);waveTick2(dt);bsTick3(dt);
 const f=g3();
 if(G3.mk&&G3.mk.lit!==G3.mk.st.join('')+G3.mk.ph){G3.mk.lit=G3.mk.st.join('')+G3.mk.ph;sync3();buildLights3();}
 if(qOn3('Q16_03')&&PSN&&!f.psn16){f.psn16=1;toast('독에 걸렸어요! 이제 해독제를 마셔 봐요','g');qCheck();save();}
 const hs=inCamp3(hero.x,hero.y)||G3.safeT>0;
 for(const m of mobs){if(m.st==='dead'||m.b3||m.w2||m.w3||m.dec3||m.gd3)continue;if(hs||inCamp3(m.x,m.y,1)){m.angry=0;m.hold=Math.max(m.hold||0,.2);}}
 const k={D161:'in161',D171:'in171',D181:'in181',D191:'in191',D201:'in201'}[RGN.cur];if(k&&!f[k]){f[k]=1;qCheck();save();}
 if(RGN.cur==='D201'&&qOn3('Q20_05')&&!f.talk20&&!talk&&!f.seal20){const r=R3x('D201');if(Math.hypot(hero.x-tx5(r.arena[0]),hero.y-ty5(r.arena[1]))<7*TS){if(!G3.app){G3.app=1;burst(tx5(r.boss[0]),ty5(r.boss[1])-40,'#9ef07a',30,160,2,60);}morgaTalk3();}}
 if(RGN.cur==='D171'&&f.seal20&&G3.hidT<=0&&!mobs.some(m=>m.m&&m.m.id==='s3zark'&&m.st!=='dead')){const r=R3x('D171'),x=tx5(r.cave[0]),y=ty5(r.cave[1]+3);if(Math.hypot(hero.x-x,hero.y-y)>260){const m=MOB.s3zark;mobs.push(ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:3,cd:0}));G3.hidT=30;}}}
const _v12TickS3=v12Tick;v12Tick=function(dt){_v12TickS3(dt);f3sTick(dt);};
const _rgPopulateS3=rgPopulate;rgPopulate=function(){_rgPopulateS3();if(in3())S2.tg.length=0;G3.bs=null;G3.mk=null;G3.talking=0;G3.app=0;G3.gd={};spawnN3();capSync3();if(!in3()||!P)return;S2.wave=null;G3.safeT=2.5;G3.fogT=5;
 sync3();buildLights3();bsSpawn3();};
const _startGameS3=startGame;startGame=function(){G3.fin=null;G3.pend=null;G3.dead=0;G3.end=0;G3.bs=null;G3.mk=null;G3.talking=0;G3.memGo=0;G3.gd={};_startGameS3();if(!P)return;capSync3();const r=regAt(hero.x);
 if(S3ID.includes(r.id)){if(!s3Open()){hero.x=P.x=tx5(1264);hero.y=P.y=ty5(39);}else{const g=R3x(r.id);if(g.arena&&Math.hypot(hero.x/TS-g.arena[0],hero.y/TS-g.arena[1])<g.arena[2]+3){hero.x=P.x=tx5(g.camp[0]-1);hero.y=P.y=ty5(g.camp[1]+2);}}}
 solidSync5();spSync5();};
const _tpInfoS3=tpInfo45;tpInfo45=function(){if(G3.end||S2.wave||(G3.bs&&G3.bs.on))return null;return _tpInfoS3();};

// ----- 그리기 -----
function g3Ground(){if(window.retStone3)retStone3();const cx=cam.x,cy=cam.y,t=now(),r=R3x(RGN.cur),f=g3();X.save();
 // 독안개 (엷은 초록 · 천천히 출렁) · 안전지대 둘레 (초록 점선)
 for(const c of fogRects3()){const sx=c[0]*TS-cx,sy=c[1]*TS-cy,w=(c[2]-c[0]+1)*TS,h=(c[3]-c[1]+1)*TS;if(sx>VW||sx+w<0||sy>VH||sy+h<0)continue;X.fillStyle=`rgba(110,200,70,${.09+.03*Math.sin(t*1.6)})`;X.fillRect(sx,sy,w,h);}
 if(G3.mk&&G3.mk.ph===2&&RGN.cur==='D201'){X.fillStyle=`rgba(110,200,70,${.07+.03*Math.sin(t*2)})`;X.fillRect(0,0,VW,VH);}
 safes3().forEach((b,i)=>{const sx=(b[0]+.5)*TS-cx,sy=(b[1]+.5)*TS-cy,R=SAFE3*TS;if(sx<-R||sx>VW+R||sy<-R||sy>VH+R)return;X.strokeStyle=`rgba(160,240,120,${.3+.1*Math.sin(t*3+i)})`;X.lineWidth=1.5;X.setLineDash([6,6]);X.lineDashOffset=-t*10;X.beginPath();X.ellipse(sx,sy,R,R/1.15,0,0,7);X.stroke();X.setLineDash([]);});
 if(r.arena&&G3.bs&&G3.bs.on){const sx=tx5(r.arena[0])-cx,sy=ty5(r.arena[1])-cy,R=(r.arena[2]+2)*TS;X.strokeStyle='rgba(160,240,120,.5)';X.lineWidth=2;X.beginPath();X.ellipse(sx,sy,R,R*.9,0,0,7);X.stroke();}
 if(S2.wave){const W=S2.wave,sx=tx5(W.c[0])-cx,sy=ty5(W.c[1])-cy;X.strokeStyle=`rgba(140,240,220,${.5+.3*Math.sin(t*5)})`;X.lineWidth=2;X.beginPath();X.ellipse(sx,sy,7*TS,5.5*TS,0,0,7);X.stroke();}
 if(RGN.cur==='D201'&&r.arena){const sx=tx5(r.arena[0])-cx,sy=ty5(r.arena[1])-cy;X.strokeStyle=f.seal20?'rgba(255,214,110,.8)':'rgba(160,240,120,.5)';X.lineWidth=2;X.beginPath();X.ellipse(sx,sy,130,76,0,0,7);X.stroke();
  const ax=tx5(r.altar[0])-cx,ay=ty5(r.altar[1])-cy;X.globalCompositeOperation='lighter';r.stones.forEach((p,i)=>{if(!stOn(i))return;X.strokeStyle=`rgba(160,240,120,${.3+.15*Math.sin(t*3+i)})`;X.lineWidth=3;X.setLineDash([10,8]);X.lineDashOffset=-t*30;X.beginPath();X.moveTo(tx5(p[0])-cx,ty5(p[1])-cy);X.lineTo(ax,ay);X.stroke();X.setLineDash([]);});X.globalCompositeOperation='source-over';}
 const B=G3.bs;if(B&&B.id==='morga'&&B.e&&G3.mk){const e=B.e,sx=e.x-cx,sy=e.y-cy;
  if(G3.mk.sh){X.strokeStyle=`rgba(180,140,255,${.7+.2*Math.sin(t*5)})`;X.fillStyle='rgba(120,80,200,.2)';X.lineWidth=3;X.beginPath();X.ellipse(sx,sy-40,48,64,0,0,7);X.fill();X.stroke();}
  if(G3.mk.open>0){X.fillStyle='#ffe08a';X.font='900 13px system-ui';X.textAlign='center';X.fillText('빈틈!',sx,sy-104);}}
 if(B&&B.id==='s3beld'&&B.e&&B.e.guard>0){const e=B.e;X.strokeStyle='rgba(255,224,138,.9)';X.lineWidth=3;X.beginPath();X.arc(e.x-cx,e.y-cy-40,40,0,7);X.stroke();}
 X.restore();tgDraw2();
 // 독 공격 표시 위에 초록 덧칠 (빨강 표시와 구별)
 X.save();for(const e of S2.tg){if(!e.psn)continue;const sx=e.x-cx,sy=e.y-cy,p=1-e.t/e.T;X.translate(sx,sy);X.fillStyle=`rgba(120,230,80,${.18+.12*p})`;X.beginPath();
  if(e.k==='c')X.ellipse(0,0,e.r,e.r*.7,0,0,7);else if(e.k==='f'){X.moveTo(0,0);X.arc(0,0,e.r,e.a-e.arc/2,e.a+e.arc/2);X.closePath();}else{X.rotate(e.a);X.rect(0,-e.w,e.len,e.w*2);}X.fill();X.setTransform(1,0,0,1,0,0);}X.restore();}
const _drawNodesS3=drawNodes;drawNodes=function(){_drawNodesS3();if(in3()&&P)g3Ground();};
function g3Over(){const cx=cam.x,cy=cam.y,t=now();
 // 떠다니는 포자·독 거품
 if(fogRects3().length||RGN.cur==='D171'){X.save();const nS=RGN.cur==='D171'?50:30;for(let i=0;i<nS;i++){const x=((i*97.3+t*(6+i%5*2)+Math.sin(t*.7+i)*14)%(VW+20)+VW+20)%(VW+20)-10,y=((i*53.7-t*(8+i%7*3))%(VH+20)+VH+20)%(VH+20)-10;
  X.fillStyle=RGN.cur==='D171'?'rgba(220,170,255,.55)':'rgba(170,240,120,.5)';X.fillRect(x|0,y|0,i%3?1:2,i%3?1:2);}X.restore();}
 for(const n of SP5){if(!n.g3||!NODES.includes(n))continue;const sx=Math.round(n.x-cx),sy=Math.round(n.y-cy);if(sx<-60||sx>VW+60||sy<-30||sy>VH+30||Math.hypot(n.x-hero.x,n.y-hero.y)>300)continue;
  if(n.k==='cam3'||n.k==='ret3'||n.k==='bn3'){if(Math.hypot(n.x-hero.x,n.y-hero.y)>90)continue;}
  const bob=Math.sin(t*4+n.x)*2;X.fillStyle='#ffe08a';X.font='900 12px system-ui';X.textAlign='center';X.fillText('▾',sx,sy-34+bob);signLabel(n.lb.split(' (')[0],sx,sy-46);}
 for(const l of LINK5){if(!l.m3||l.a!==RGN.cur)continue;const x=tx5(l.at[0]),y=ty5(l.at[1]);if(Math.hypot(x-hero.x,y-hero.y)>360)continue;signLabel((l.cond()?'→ ':'🔒 ')+l.n,Math.round(x-cx),Math.round(y-cy-44));}
 if(PSN&&in3()){X.fillStyle=`rgba(110,200,70,${.06+.03*Math.sin(t*3)})`;X.fillRect(0,0,VW,VH);}}
const _drawSfxS3=drawSfx;drawSfx=function(){_drawSfxS3();if(!P)return;if(in3()){g3Over();try{fxDraw2();}catch(e){}}
 else if(RGN.cur==='D72'&&s3Open()){const x=tx5(GATE72S[0]),y=ty5(GATE72S[1]);if(Math.hypot(x-hero.x,y-hero.y)<420)signLabel((g3().ria16||P.ch16?'→ ':'🔒 ')+'왕성 남문 수로길 · 시즌 3 「독뿌리의 세 번째 문」 Lv.56~60',Math.round(x-cam.x),Math.round(y-cam.y-40));}};
// 시즌 3를 끝낸 뒤 알림판·퀘스트 창 문구
const _drawQTS3=drawQT;drawQT=function(){_drawQTS3();if(!P||qCur()||!(P.g3&&P.g3.seal20))return;const el=$('qtrack');if(el)el.innerHTML='<b>📜 시즌 3 「독뿌리의 세 번째 문」 완료</b><span>역병 제단에서 회고전과 결말 다시 보기 · 왕성으로 돌아가 제작과 탐험을 이어갈 수 있어요</span>';};
const _drawQuestS3=drawQuest;drawQuest=function(){_drawQuestS3();if(!P||qCur()||!(P.g3&&P.g3.seal20)||QTAB!=='main')return;const h=[...document.querySelectorAll('#questB .qc h4')].find(h=>/두 번째 마계문|첫 번째 마계문/.test(h.textContent));if(!h)return;const c=h.closest('.qc');
 c.innerHTML='<h4><span class="q9tg">메인</span>20장 \'세 번째 마계문\' 끝</h4><div class="q9bd">시즌 3 「독뿌리의 세 번째 문」 완료 · 세 번째 마계문은 닫힌 그대로예요. 역병 제단에서 모르가 회고전과 결말 다시 보기를 할 수 있어요. 다음 시즌 예고: 「붉은 대장간의 네 번째 문」</div>';};

// ----- 세계 지도 · 길드 게시판 (시즌 3 다섯 곳) -----
BIOME.swamp=[70,96,60];BIOME.shroom=[110,80,130];BIOME.sanct=[80,140,140];BIOME.lab=[96,90,110];BIOME.abyss=[70,110,50];
WORLD.push(
 {id:'R16',ch:16,n:'흑수늪 입구',t:'늪에서 올라온 독안개',lv:[56,56],kind:'swamp',built:1,wm:[166,126],s2:'D161',mood:'왕성 남쪽, 검은 늪물 위로 독안개가 깔린 습지예요. 정찰 초소가 연락이 끊겼어요.',res:['s3leaf'],mobs:['s3slime','s3mosq','s3liz','s3worm'],boss:{n:'맹독 늪지기 크라그',where:'늪지기의 웅덩이 · 16장 마지막 퀘스트'}},
 {id:'R17',ch:17,n:'독버섯 숲',t:'포자에 잠긴 숲',lv:[57,57],kind:'shroom',built:1,wm:[128,148],s2:'D171',mood:'거대한 보라 버섯과 포자구름이 길을 가리는 숲이에요. 약초꾼들이 균사에 붙잡혔어요.',res:['s3leaf','s3iron','s3spore'],mobs:['s3shroom','s3turt','s3moth','s3wolf'],boss:{n:'포자여왕 미셀라',where:'포자여왕의 둥지 · 17장 마지막 퀘스트'}},
 {id:'R18',ch:18,n:'침수 정화성소',t:'가라앉은 정화성소',lv:[58,58],kind:'sanct',built:1,wm:[92,128],s2:'D181',mood:'남부의 물을 정화하던 옛 성소가 독수에 잠겼어요. 정화 기둥이 꺼져 있어요.',res:['s3cry','s3iron'],mobs:['s3lily','s3crab','s3ghost','s3snake'],boss:{n:'부패 수호상 벨드락',where:'수호자 제단 · 18장 마지막 퀘스트'}},
 {id:'R19',ch:19,n:'폐쇄 왕실 연구소',t:'왕실의 검은 실험소',lv:[59,59],kind:'lab',built:1,wm:[58,152],s2:'D191',mood:'왕실 인장이 찍힌 문 너머, 검은 수정과 배양관이 늘어선 비밀 연구소예요.',res:['s3blk','s3cry'],mobs:['s3exp','s3sol','s3tent','s3eye'],boss:{n:'흑수정 융합체 바르곤',where:'융합실 · 19장 마지막 퀘스트'}},
 {id:'R20',ch:20,n:'독뿌리 심장부',t:'세 번째 마계문',lv:[60,60],kind:'abyss',built:1,wm:[24,164],s2:'D201',mood:'검은 뿌리가 얽힌 협곡 끝, 역병 제단 너머로 세 번째 마계문이 숨 쉬어요.',res:['s3cry','s3blk'],mobs:['s3hound','s3knight','s3sham','s3spore'],boss:{n:'역병사도 모르가',where:'역병 제단 · 시즌 3 최종 보스'}});
// 길: 1~10장 한 줄, 왕성에서 북문(11~15장)으로, 16~20장 한 줄. 왕성→흑수늪은 수로 옆길(WMX3)로 이어 그려요 (사용자 2026-11-16: 실제로 가는 길대로)
WROAD2=function(){const L=[];for(let i=0;i<9;i++)L.push([WORLD[i].wm,WORLD[i+1].wm]);L.push([WORLD[6].wm,WORLD[10].wm]);for(let i=10;i<14;i++)L.push([WORLD[i].wm,WORLD[i+1].wm]);for(let i=15;i<WORLD.length-1;i++)L.push([WORLD[i].wm,WORLD[i+1].wm]);return L;};
function s3RegOpen(ch){if(!s3Open())return false;const f=P.g3||{};return ch===16?true:ch===17?!!(f.boss16||P.ch16):ch===18?!!(f.boss17||P.ch17):ch===19?!!(f.boss18||P.ch18):!!(f.boss19||P.ch19);}
window.s3RegOpen=s3RegOpen;
const _drawWorldDetS3=drawWorldDet;drawWorldDet=function(here,next,qt){_drawWorldDetS3(here,next,qt);const r=WORLD[WM.sel];if(!r||r.ch<16)return;const D=$('wmDet'),s=rState(r);
 const em=D.querySelector('.wd-h em');if(em)em.textContent=s==='open'?'열림':!s3Open()?'잠김 · 15장(두 번째 마계문)을 끝내면 열려요':'잠김 · '+(r.ch-1)+'장 보스를 쓰러뜨리면 열려요';
 const no=D.querySelector('.wd-no');if(no)no.textContent=!s3Open()?'두 번째 마계문을 봉인하면 왕성 남동쪽 수로문으로 시즌 3가 시작돼요.':(r.ch-1)+'장 \''+CHN3[r.ch-1]+'\'의 보스를 쓰러뜨리면 길이 열려요.';
 const g=$('wdGo');if(g){g.textContent=r.n+'(으)로 걸어가기';g.onclick=()=>{closeAll();const A=R3x(r.s2);go5({rid:r.s2,x:A.entry[0],y:A.entry[1],n:r.n});};}};
const _drawBoardS3=drawBoard;drawBoard=function(){_drawBoardS3();const B=$('pfB');if(!B||!P)return;
 if(!qCur()&&P.g3&&P.g3.seal20){const m=B.querySelector('.bd-main.done');if(m)m.innerHTML='<small>20장 · 세 번째 마계문</small><b>시즌 3 「독뿌리의 세 번째 문」 완료</b><span>세 번째 마계문은 닫힌 그대로예요. 역병 제단에서 모르가 회고전과 결말 다시 보기를 할 수 있어요. 독버섯 숲 북서쪽 균사굴에는 숨은 정예가 나타나요. 정화 작업대에 역병핵 반지가 열렸어요. 다음 시즌 예고: 시즌 4 「붉은 대장간의 네 번째 문」</span>';}
 if(!s3Open())return;
 const chs=WORLD.filter(r=>r.ch>=16).map(r=>{const st=chSt135(r);return `<div class="bd-ch b"><i>${r.ch}</i><b>${r.t}</b><span>${r.n} · Lv.${r.lv[0]}~${r.lv[1]}</span><em>${s3RegOpen(r.ch)?st:'잠김'}</em></div>`;}).join('');
 B.insertAdjacentHTML('beforeend',`<h4>시즌 3 · 독뿌리의 세 번째 문</h4><div class="bd-chs">${chs}</div>`);};
