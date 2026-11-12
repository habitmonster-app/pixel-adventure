// ----- 지도 표시 -----
{const L=[['D111',2742,30,'북문 야영지 · 카이렌·에일린','북문 야영지',0],['D111',2778,28,'서리길 Lv51','서리길',1],['D111',2812,33,'서리뿔의 길목 (보스)','서리뿔',1],
  ['D121',2842,26,'서리항 입구 야영지 · 노아·세나·브룸','서리항 야영지',0],['D121',2890,24,'서리항 마을 Lv52','서리항 마을',1],['D121',2890,42,'얼어붙은 부두 · 빙판','빙판',1],['D121',2928,46,'닻 내린 얼음터 (보스)','얼음터',1],
  ['D131',2962,30,'은백림 어귀 야영지 · 루미아','은백림 야영지',0],['D131',3020,30,'두 세계의 비석 터 Lv53','비석 터',1],['D131',3058,30,'서리뿌리 빈터 (보스)','서리뿌리',1],
  ['D141',3080,30,'성채 앞마당 · 카이렌·세나·브룸','성채 앞마당',0],['D141',3110,30,'중앙 홀 Lv54','중앙 홀',1],['D141',3138,11,'얼음 감옥','얼음 감옥',0],['D141',3166,30,'기사장의 문 (보스)','기사장',1],
  ['D151',3190,30,'마지막 설원 야영지','설원 야영지',0],['D151',3228,31,'빙월 제단 · 두 번째 마계문 Lv55','빙월 제단',1]].map(([r,x,y,n,s,h])=>({n,s,x:x-MAP.cx,y:y-MAP.cy,hunt:h,f2:s,r5:r}));
 POI.push(...L);if(POI31!==POI)POI31.push(...L);}
const _areaNameS2=areaName;areaName=function(){if(!in2())return _areaNameS2();const r=R2(RGN.cur),tx=hero.x/TS,ty=hero.y/TS;const a=(r.areas||[]).find(a=>tx>=a[1]&&tx<=a[3]+1&&ty>=a[2]&&ty<=a[4]+1);
 return (a?a[0]:RGNM5[RGN.cur])+(inSafe2(hero.x,hero.y)?' · 안전':warm2(hero.x,hero.y)?' · 불 곁':'');};
const _doAttackS2=doAttack;doAttack=function(){if(S2.end)return;_doAttackS2();};
const _castSkillS2=castSkill;castSkill=function(id,s){if(S2.end)return false;return _castSkillS2(id,s);};
let LIGHTS2X=[];
function buildLights2(){if(typeof buildLights5==='function')buildLights5();if(!in2()||typeof LIGHTS5==='undefined')return;
 for(const b of fires2().slice(1))LIGHTS5.push({x:(b[0]+.5)*TS,y:(b[1]+.5)*TS,r:3.4*TS,c:'255,170,90',k:'t',o:Math.random()*6});const r=R2(RGN.cur),f=f2();
 if(RGN.cur==='D121'&&f.light12)LIGHTS5.push({x:(r.light[0]+.5)*TS,y:(r.light[1]-3)*TS,r:6*TS,c:'255,230,150',k:'t',o:1});
 if(RGN.cur==='D141')r.pillars.forEach((p,i)=>f['pl'+i]&&LIGHTS5.push({x:(p[0]+.5)*TS,y:(p[1]-.5)*TS,r:3*TS,c:'120,200,255',k:'c',o:i}));
 if(RGN.cur==='D151'){r.stones.forEach((p,i)=>f['st'+i]&&LIGHTS5.push({x:(p[0]+.5)*TS,y:(p[1]-.5)*TS,r:3*TS,c:'140,210,255',k:'c',o:i}));const k=S2.sk;r.lp.forEach((p,i)=>(!k||!k.brz||k.brz[i])&&LIGHTS5.push({x:(p[0]+.5)*TS,y:(p[1]-.5)*TS,r:3*TS,c:'255,170,90',k:'t',o:i}));}}

// ----- 매 프레임 -----
function f2Tick(dt){if(!P||RGN.busy)return;
 if(S2.fin&&!in2()&&RGN.cur==='D72'&&!S5.busy&&!S5.pend&&!auto){const p=S2.fin;S2.fin=null;setTimeout(()=>p.rid?go5(p):goTo(p),200);}
 if(S2.pend&&in2()&&!S5.busy&&!S5.pend&&!auto){const t=S2.pend;S2.pend=null;setTimeout(()=>go5(t),150);}
 if((S2.fin||S2.pend)&&(Math.hypot(joy.x,joy.y)>.2||key.w||key.a||key.s||key.d)){S2.fin=null;S2.pend=null;}
 if(S2.hidT>0)S2.hidT-=dt;if(S2.memCd>0)S2.memCd-=dt;if(S2.bar>0)S2.bar-=dt;
 if(hero.st==='dead'&&in2()&&!S2.dead){S2.dead=1;const c=R2(RGN.cur).camp;S2.ckpt={x:PLAZA.x,y:PLAZA.y};PLAZA.x=tx5(c[0]-1);PLAZA.y=ty5(c[1]+2);S2.tg.length=0;}
 if(S2.dead&&hero.st!=='dead'){S2.dead=0;if(S2.ckpt){PLAZA.x=S2.ckpt.x;PLAZA.y=S2.ckpt.y;S2.ckpt=null;}S2.safeT=2.5;toast('야영지 모닥불 곁에서 다시 일어났어요 · 켠 화로와 장치, 구한 사람들은 그대로예요','g');}
 if(!in2()){S2.lx=hero.x;S2.ly=hero.y;return;}
 if(S2.safeT>0)S2.safeT-=dt;
 for(let i=S2.tg.length-1;i>=0;i--){const e=S2.tg[i];e.t-=dt;if(e.t<=0){S2.tg.splice(i,1);tgHit2(e);e.on&&e.on();}}
 iceTick2(dt);if(S2.end)return;
 coldTick2(dt);waveTick2(dt);bsTick2(dt);cannonTick2(dt);
 if(S2.sk&&S2.sk.lit!==S2.sk.brz.join('')+S2.sk.ph){S2.sk.lit=S2.sk.brz.join('')+S2.sk.ph;sync2();buildLights2();}
 const f=f2(),hs=inSafe2(hero.x,hero.y)||S2.safeT>0;
 for(const m of mobs){if(m.st==='dead'||m.b2||m.w2||m.dec2)continue;if(hs||inSafe2(m.x,m.y,1)){m.angry=0;m.hold=Math.max(m.hold||0,.2);}}
 const k={D111:'in111',D121:'in121',D131:'in131',D141:'in141',D151:'in151'}[RGN.cur];if(k&&!f[k]){f[k]=1;qCheck();save();}
 if(RGN.cur==='D151'&&qOn2('Q15_05')&&!f.talk15&&!talk&&!f.seal15){const r=R2('D151');if(Math.hypot(hero.x-tx5(r.arena[0]),hero.y-ty5(r.arena[1]))<6*TS){if(!S2.sApp){S2.sApp=1;burst(tx5(r.boss[0]),ty5(r.boss[1])-40,'#c0b0ff',30,160,2,60);}serkaTalk2();}}
 if(RGN.cur==='D131'&&f.seal15&&S2.hidT<=0&&!mobs.some(m=>m.m&&m.m.id==='s2shadow'&&m.st!=='dead')){const r=R2('D131'),x=tx5(r.heart[0]+3),y=ty5(r.heart[1]+3);if(Math.hypot(hero.x-x,hero.y-y)>260){const m=MOB.s2shadow;mobs.push(ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:3,cd:0}));S2.hidT=30;}}}
const _v12TickS2=v12Tick;v12Tick=function(dt){_v12TickS2(dt);f2Tick(dt);};
const _rgPopulateS2=rgPopulate;rgPopulate=function(){_rgPopulateS2();S2.tg.length=0;S2.wave=null;S2.bs=null;S2.sk=null;S2.talking=0;S2.sApp=0;S2.cn=[2,2,2];S2.vx=S2.vy=0;S2.lx=hero.x;S2.ly=hero.y;S2.bar=0;spawnN2();if(!in2()||!P)return;S2.safeT=2.5;S2.coldT=5;
 sync2();buildLights2();bsSpawn2();};
const _startGameS2=startGame;startGame=function(){S2.fin=null;S2.pend=null;S2.dead=0;S2.end=0;S2.wave=null;S2.bs=null;S2.sk=null;S2.talking=0;S2.tg.length=0;S2.memGo=0;_startGameS2();if(!P)return;const r=regAt(hero.x);
 if(S2ID.includes(r.id)){if(!s2Open()){hero.x=P.x=tx5(1264);hero.y=P.y=ty5(39);}else{const g=R2(r.id);if(g.arena&&Math.hypot(hero.x/TS-g.arena[0],hero.y/TS-g.arena[1])<g.arena[2]+3){hero.x=P.x=tx5(g.camp[0]-1);hero.y=P.y=ty5(g.camp[1]+2);}}}
 solidSync5();spSync5();};
const _tpInfoS2=tpInfo45;tpInfo45=function(){if(S2.end||S2.wave||(S2.bs&&S2.bs.on))return null;return _tpInfoS2();};

// ----- 그리기 -----
// 예고 바닥 표시 tgDraw2 는 i_art.js (그림 판)
function g2Ground(){const cx=cam.x,cy=cam.y,t=now(),r=R2(RGN.cur),f=f2();X.save();
 // 빙결 지대 (엷은 푸른빛) · 불 곁(따뜻한 고리)
 for(const c of coldRects2()){const sx=c[0]*TS-cx,sy=c[1]*TS-cy,w=(c[2]-c[0]+1)*TS,h=(c[3]-c[1]+1)*TS;if(sx>VW||sx+w<0||sy>VH||sy+h<0)continue;X.fillStyle=`rgba(120,190,255,${.07+.03*Math.sin(t*2)})`;X.fillRect(sx,sy,w,h);}
 if(RGN.cur!=='D151')fires2().forEach((b,i)=>{const sx=(b[0]+.5)*TS-cx,sy=(b[1]+.5)*TS-cy,R=WARM2*TS;if(sx<-R||sx>VW+R||sy<-R||sy>VH+R)return;X.strokeStyle=`rgba(255,180,100,${.28+.1*Math.sin(t*3+i)})`;X.lineWidth=1.5;X.setLineDash([6,6]);X.lineDashOffset=-t*10;X.beginPath();X.ellipse(sx,sy,R,R*.8,0,0,7);X.stroke();X.setLineDash([]);});
 // 보스 자리 고리 · 방어전 결계
 if(r.arena&&S2.bs&&S2.bs.on){const sx=tx5(r.arena[0])-cx,sy=ty5(r.arena[1])-cy,R=(r.arena[2]+2)*TS;X.strokeStyle='rgba(150,210,255,.5)';X.lineWidth=2;X.beginPath();X.ellipse(sx,sy,R,R*.9,0,0,7);X.stroke();}
 if(S2.wave){const W=S2.wave,sx=tx5(W.c[0])-cx,sy=ty5(W.c[1])-cy;X.strokeStyle=`rgba(140,220,255,${.5+.3*Math.sin(t*5)})`;X.lineWidth=2;X.beginPath();X.ellipse(sx,sy,7*TS,5.5*TS,0,0,7);X.stroke();}
 if(S2.bar>0){X.strokeStyle=`rgba(170,230,255,${.6+.3*Math.sin(t*8)})`;X.lineWidth=2.5;X.beginPath();X.ellipse(hero.x-cx,hero.y-cy,26,16,0,0,7);X.stroke();}
 if(RGN.cur==='D151'&&r.arena){const sx=tx5(r.arena[0])-cx,sy=ty5(r.arena[1])-cy;X.strokeStyle=f.seal15?'rgba(255,214,110,.8)':'rgba(120,200,255,.5)';X.lineWidth=2;X.beginPath();X.ellipse(sx,sy,120,70,0,0,7);X.stroke();
  const ax=tx5(r.altar[0])-cx,ay=ty5(r.altar[1])-cy;X.globalCompositeOperation='lighter';r.stones.forEach((p,i)=>{if(!f['st'+i])return;X.strokeStyle=`rgba(140,200,255,${.3+.15*Math.sin(t*3+i)})`;X.lineWidth=3;X.setLineDash([10,8]);X.lineDashOffset=-t*30;X.beginPath();X.moveTo(tx5(p[0])-cx,ty5(p[1])-cy);X.lineTo(ax,ay);X.stroke();X.setLineDash([]);});X.globalCompositeOperation='source-over';}
 // 세르카 2단계: 진짜 세르카 발밑 초승달 · 3단계 보호막
 const B=S2.bs;if(B&&B.id==='serka'&&B.e&&S2.sk){const e=B.e,sx=e.x-cx,sy=e.y-cy;if(S2.sk.ph===2){X.fillStyle=`rgba(255,240,170,${.75+.2*Math.sin(t*6)})`;X.beginPath();X.arc(sx,sy+4,15,0,7);X.arc(sx+7,sy,13,0,7,true);X.fill();}
  if(S2.sk.sh&&!(window.shDraw2&&shDraw2(e,sx,sy))){X.strokeStyle=`rgba(170,230,255,${.7+.2*Math.sin(t*5)})`;X.fillStyle='rgba(150,220,255,.18)';X.lineWidth=3;X.beginPath();X.ellipse(sx,sy-40,46,62,0,0,7);X.fill();X.stroke();}
  if(S2.sk.open>0){X.fillStyle='#ffe08a';X.font='900 13px system-ui';X.textAlign='center';X.fillText('빈틈!',sx,sy-104);}}
 if(B&&B.id==='s2leorn'&&B.e&&B.e.guard>0){const e=B.e;X.strokeStyle='rgba(255,224,138,.9)';X.lineWidth=3;X.beginPath();X.arc(e.x-cx,e.y-cy-40,40,0,7);X.stroke();}
 X.restore();tgDraw2();}
const _drawNodesS2=drawNodes;drawNodes=function(){_drawNodesS2();if(in2()&&P)g2Ground();};
function g2Over(){const cx=cam.x,cy=cam.y,t=now();
 // 눈
 if(RGN.cur!=='D141'&&RGN.cur!=='D151'){X.save();X.fillStyle='rgba(255,255,255,.75)';const nS=RGN.cur==='D111'?90:46;for(let i=0;i<nS;i++){const x=((i*97.3+t*(14+i%5*4)+Math.sin(t+i)*12)%(VW+20)+VW+20)%(VW+20)-10,y=((i*53.7+t*(28+i%7*6))%(VH+20)+VH+20)%(VH+20)-10;X.fillRect(x|0,y|0,i%3?1:2,i%3?1:2);}X.restore();}
 // 할 수 있는 일 표시
 for(const n of SP5){if(!n.g2||!NODES.includes(n))continue;const sx=Math.round(n.x-cx),sy=Math.round(n.y-cy);if(sx<-60||sx>VW+60||sy<-30||sy>VH+30||Math.hypot(n.x-hero.x,n.y-hero.y)>300)continue;
  if(n.k==='cam2'||n.k==='ret2'||n.k==='bn2'){if(Math.hypot(n.x-hero.x,n.y-hero.y)>90)continue;}
  const bob=Math.sin(t*4+n.x)*2;X.fillStyle='#ffe08a';X.font='900 12px system-ui';X.textAlign='center';X.fillText('▾',sx,sy-34+bob);signLabel(n.lb.split(' (')[0],sx,sy-46);}
 // 가는 길 표지
 for(const l of LINK5){if(!l.m2||l.a!==RGN.cur)continue;const x=tx5(l.at[0]),y=ty5(l.at[1]);if(Math.hypot(x-hero.x,y-hero.y)>360)continue;signLabel((l.cond()?'→ ':'🔒 ')+l.n,Math.round(x-cx),Math.round(y-cy-44));}
 if(S2.slowT>0){X.fillStyle='rgba(150,220,255,.12)';X.fillRect(0,0,VW,VH);}}
const _drawSfxS2=drawSfx;drawSfx=function(){_drawSfxS2();if(!P)return;if(in2())g2Over();
 else if(RGN.cur==='D72'&&s2Open()){const x=tx5(GATE72[0]),y=ty5(GATE72[1]);if(Math.hypot(x-hero.x,y-hero.y)<420)signLabel((f2().ria11||P.ch11?'→ ':'🔒 ')+'왕성 북문 · 시즌 2 「얼어붙은 맹세」 Lv.51~55',Math.round(x-cam.x),Math.round(y-cam.y-40));}};
/* ===== 시즌 2 끝 ===== */
// 시즌 2를 끝낸 뒤 알림판·퀘스트 창 문구
const _drawQTS2=drawQT;drawQT=function(){_drawQTS2();if(!P||qCur()||!(P.f2&&P.f2.seal15))return;const el=$('qtrack');if(el)el.innerHTML='<b>📜 시즌 2 「얼어붙은 맹세」 완료</b><span>빙월 제단에서 회고전과 결말 다시 보기 · 왕성으로 돌아가 제작과 탐험을 이어갈 수 있어요</span>';};
const _drawQuestS2=drawQuest;drawQuest=function(){_drawQuestS2();if(!P||qCur()||!(P.f2&&P.f2.seal15)||QTAB!=='main')return;const h=[...document.querySelectorAll('#questB .qc h4')].find(h=>h.textContent.includes('첫 번째 마계문'));if(!h)return;const c=h.closest('.qc');c.innerHTML='<h4><span class="q9tg">메인</span>15장 \'두 번째 마계문\' 끝</h4><div class="q9bd">시즌 2 「얼어붙은 맹세」 완료 · 두 번째 마계문은 닫힌 그대로예요. 빙월 제단에서 세르카 회고전과 결말 다시 보기를 할 수 있어요. 다음 시즌 예고: 「독뿌리의 세 번째 문」</div>';};
