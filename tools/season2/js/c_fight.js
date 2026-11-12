
// ----- 퀘스트 숫자 (처치 · 퀘스트 물건) -----
const KQ2={k_rat:['s2rat',5,'Q11_02','서리쥐'],k_crow:['s2crow',5,'Q11_02','얼음까마귀'],k_wolf:['s2wolf',6,'Q11_04','설원 늑대'],k_gob:['s2gob',8,'Q12_04','얼음 고블린'],
 k_shroom:['s2shroom',5,'Q13_02','서리버섯'],k_spider:['s2spider',7,'Q13_03','빙정거미'],k_sol:['s2sol',8,'Q14_01','빙정 병사'],k_leo:['s2leo',6,'Q15_02','마계 설표'],k_mk:['s2mk',8,'Q15_03','빙월 기사'],k_sham:['s2sham',4,'Q15_03','서리 주술사']};
const IQ2={wood11:['wd',4,'마른 장작'],oil12:['oil',5,'등대 기름'],msh13:['ms',6,'서리버섯'],key14:[null,3,'감옥 열쇠'],gear14:[null,5,'수정 톱니']};
const cnt2=k=>{const f=f2();if(KQ2[k])return (f.kc&&f.kc[k])|0;const d=IQ2[k];if(!d)return 0;if(!d[0])return (f.it&&f.it[k])|0;let n=0;for(let i=0;i<d[1];i++)if(f[d[0]+i])n++;return n;};
const need2=k=>KQ2[k]?KQ2[k][1]:IQ2[k]?IQ2[k][1]:1;
function itemAdd2(k,n){const f=f2();f.it=f.it||{};const v=Math.min(need2(k),((f.it[k])|0)+n);if(v===(f.it[k]|0))return;f.it[k]=v;toast('+'+IQ2[k][2]+' ('+v+'/'+need2(k)+')','g');qCheck();save();}

// ----- 처치 보상 · 숫자 세기 -----
const _onKillS2=onKill27;onKill27=function(m){_onKillS2(m);const id=m.m&&m.m.id;if(!id||!MOB[id]||m.dec2)return;if(!(ID2.includes(id)||m.b2||id==='s2shadow'))return;
 const dr=(k,n)=>{addMat(k,n);pop(m.x,m.y-70+Math.random()*10,'+'+MAT[k].n+(n>1?' '+n:''),MAT[k].c);},R=Math.random,f=f2();
 for(const k in KQ2){const [mid,n,qid,nm]=KQ2[k];if(mid!==id||!qOn2(qid))continue;f.kc=f.kc||{};if((f.kc[k]|0)>=n)continue;f.kc[k]=(f.kc[k]|0)+1;if(f.kc[k]>=n)toast(nm+' '+n+'마리를 모두 쓰러뜨렸어요!','g');}
 if((id==='s2sol'||id==='s2arch')&&qOn2('Q14_03')){f.kn14=(f.kn14|0)+1;if(R()<.4||f.kn14%3===0)itemAdd2('key14',1);}
 if((id==='s2golem'||id==='s2orb')&&qOn2('Q14_04')){f.kn14b=(f.kn14b|0)+1;if(R()<.5||f.kn14b%2===0)itemAdd2('gear14',1);}
 if(!m.w2&&ID2.includes(id)){const lv=m.m.lv;if(R()<.16)dr(lv<=51?'s2wood':lv===52?'s2ore':lv===53?'s2herb':'s2ore',1);if(lv>=54&&R()<.07)dr('s2aur',1);}
 if(id==='s2shadow'){dr('s2aur',2);if(R()<.3)dr('s2core',1);S2.hidT=300;toast('빙월의 그림자를 쓰러뜨렸어요 (5분 뒤 다시 나타나요)','g');}
 if(m.b2){const b=BOSS2[m.b2];S2.bs=null;S2.tg.length=0;S2.sk=null;
  if(m.mem){S2.memCd=600;P.gold+=3000;dr('s2aur',2);if(R()<.5)dr('s2core',1);toast('봉인의 기억: 세르카를 다시 이겼어요! 3000골드 · 오로라 결정 2','g');for(const d of mobs)if(d.dec2)d.hp=0,d.st='dead';}
  else if(!f[b.flag]){f[b.flag]=1;for(const k in b.drop)dr(k,b.drop[k]);toast(b.win,'g');if(b.after)setTimeout(()=>sayAs(b.after[0],b.after.slice(1),()=>{qCheck();save();}),400);}
  sync2();}
 qCheck();save();};

// ----- 보스 (모든 큰 공격은 바닥에 먼저 표시 → 0.9초 넘게 기다렸다가 맞아요) -----
const BOSS2={
 s2horn:{rid:'D111',at:'boss',flag:'boss11',q:'Q11_05',pat:['charge','stomp','fan'],cd:[3.2,4.2],drop:{s2wood:2,s2herb:2,s2aur:1},win:'서리뿔 우두머리를 쓰러뜨렸어요! 서리항으로 가는 길이 열렸어요',
  intro:['서리뿔 우두머리','(거대한 흰 짐승이 얼음 뿔을 낮춰요. 땅이 울려요!)','(뿔을 낮추면 돌진, 앞발을 들면 땅 구르기예요. 바닥 표시를 보고 피해요)']},
 s2brak:{rid:'D121',at:'boss',flag:'boss12',q:'Q12_05',pat:['fan','ring3','line'],cd:[3.2,4.2],drop:{s2ore:3,s2aur:2},win:'빙결 항만장 브라크를 쓰러뜨렸어요! 항구의 얼음이 녹기 시작해요',
  intro:['빙결 항만장 브라크','항구는 빙월의 것이다. 닻이 내려진 이상, 배도 사람도 떠나지 못한다!','(푸른 표시는 바닥을 얼리는 공격이에요. 맞으면 잠깐 느려져요)']},
 s2arbos:{rid:'D131',at:'boss',flag:'boss13',q:'Q13_05',pat:['fan','roots','nova'],cd:[3.2,4.2],drop:{s2wood:4,s2aur:2},win:'서리뿌리 고목 아르보스가 잠들었어요. 숲의 눈보라가 잦아들어요',
  intro:['서리뿌리 고목 아르보스','(얼음에 갇힌 고목이 뿌리 팔을 들어 올려요)','…지켜야… 한다… 봉인을…']},
 s2leorn:{rid:'D141',at:'boss',flag:'boss14',q:'Q14_05',pat:['line','fan','shield','ring3'],cd:[3.0,4.0],drop:{s2ore:4,s2aur:3},win:'빙정 기사장 레오른이 무릎을 꿇었어요! 빙월협곡으로 가는 문이 열렸어요',
  intro:['빙정 기사장 레오른','나는 이 문을 지키라는 명령만 기억한다.','그 명령이 틀렸다면, 검으로 증명해라.'],
  after:['빙정 기사장 레오른','…세르카는 문을 열기 전에 봉인 기록을 찾고 있었다.','그녀는 누군가가 봉인의 힘을 훔치고 있다고 말했다.']},
 serka:{rid:'D151',at:'boss',flag:'seal15',q:'Q15_06',pat:[],cd:[2.6,3.4],drop:{},win:''}};
function clearDec2(){for(let i=mobs.length-1;i>=0;i--)if(mobs[i].dec2)mobs.splice(i,1);}
function bsSpawn2(){if(S2.bs&&S2.bs.e&&mobs.includes(S2.bs.e)&&S2.bs.e.st!=='dead')return;S2.bs=null;S2.sk=null;clearDec2();if(!in2()||!P)return;const f=f2(),r=R2(RGN.cur);
 for(const id in BOSS2){const b=BOSS2[id];if(b.rid!==RGN.cur)continue;const mem=id==='serka'&&S2.memGo;
  if(id==='serka'){if(!mem&&(f.seal15||!f.talk15))continue;}else if(f[b.flag]||!qOn2(b.q))continue;
  const p=r[b.at],x=tx5(p[0]),y=ty5(p[1]),m=MOB[id];const e=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:9,cd:0});e.b2=id;e.mem=mem?1:0;e.d=2;
  if(id==='serka'){if(f.sup15&&!mem){e.hp=1;e.sup=1;}S2.sk={ph:1,brz:[1,1,1],sh:0,open:0,swapT:6,mirT:3,dec:[]};for(let i=mobs.length-1;i>=0;i--)if(!mobs[i].b2&&!mobs[i].npc&&mobs[i].m&&ID2.includes(mobs[i].m.id))mobs.splice(i,1);}
  mobs.push(e);S2.bs={id,e,on:0,cd:2.5,said:0};S2.memGo=0;}}
function bsReset2(B,e){B.on=0;e.angry=0;S2.tg.length=0;e.x=e.hx;e.y=e.hy;const f=f2();
 if(B.id==='serka'){clearDec2();S2.sk={ph:1,brz:[1,1,1],sh:0,open:0,swapT:6,mirT:3,dec:[]};e.hp=f.sup15&&!e.mem?1:e.m.hp;}else e.hp=e.m.hp;e.guard=0;sync2();}
function bsTick2(dt){const B=S2.bs;if(!B||!B.e)return;const e=B.e,b=BOSS2[B.id],r=R2(RGN.cur),A=e.m.atk,f=f2();
 if(e.st==='dead'||!mobs.includes(e)){S2.bs=null;S2.sk=null;clearDec2();sync2();return;}
 const ax=tx5(r.arena[0]),ay=ty5(r.arena[1]),R=(r.arena[2]+2)*TS,inA=Math.hypot(hero.x-ax,hero.y-ay)<R;
 if(hero.st==='dead'){if(B.on)bsReset2(B,e);return;}
 if(e.sup){e.angry=0;e.hold=9;return;}
 if(!B.on){e.angry=0;e.hold=Math.max(e.hold||0,.2);e.cd=9;
  const ready=B.id==='serka'?(e.mem||qOn2('Q15_06')):true;
  if(inA&&!talk&&ready){B.on=1;B.cd=2.2;sync2();if(b.intro&&!B.said&&!e.mem){B.said=1;sayAs(b.intro[0],b.intro.slice(1));}}return;}
 if(!inA&&Math.hypot(hero.x-ax,hero.y-ay)>R+8*TS){bsReset2(B,e);hint2('싸움터를 벗어나 보스가 제자리로 돌아갔어요');return;}
 if(talk){e.hold=Math.max(e.hold||0,.2);return;}
 if(Math.hypot(e.x-ax,e.y-ay)>R){e.x+=(ax-e.x)*.05;e.y+=(ay-e.y)*.05;}
 e.angry=1;if(B.id==='serka')return serkaTick2(dt,B,e,r,A);
 B.cd-=dt;if(B.cd>0)return;const ph=e.hp/e.m.hp<.5?.8:1;B.cd=rnd(b.cd[0],b.cd[1])*ph;
 const x=e.x,y=e.y,a=Math.atan2(hero.y-y,hero.x-x),k=b.pat[Math.random()*b.pat.length|0];e.d=dirTo(e,hero);gaSet2(e,k);e.hold=Math.max(e.hold||0,.9);
 if(k==='fan'){pop(x,y-70,'크게 휘둘러요!','#ffd0a0');tg2({k:'f',x,y,a,r:135,arc:1.7,T:1.0,dmg:Math.round(A*1.25),c:'255,160,120'});}
 if(k==='line'){pop(x,y-70,'돌진!','#ffd0a0');tg2({k:'l',x,y,a,len:440,w:30,T:1.1,dmg:Math.round(A*1.45),c:'255,150,110',on:()=>{const nx=x+Math.cos(a)*200,ny=y+Math.sin(a)*200;if(e.st!=='dead'&&!blocked(e,nx,ny)){e.x=nx;e.y=ny;}}});}
 if(k==='charge'){pop(x,y-70,'뿔을 낮춰요! 옆으로 피해요','#ffd0a0');e.hold=1.6;tg2({k:'l',x,y,a,len:480,w:34,T:1.3,dmg:Math.round(A*1.5),c:'255,150,110',label:'돌진',on:()=>{for(let s=260;s>0;s-=20){const nx=x+Math.cos(a)*s,ny=y+Math.sin(a)*s;if(e.st!=='dead'&&!blocked(e,nx,ny)){e.x=nx;e.y=ny;break;}}}});}
 if(k==='stomp'){pop(x,y-70,'앞발을 들어요! 멀리!','#bfefff');e.hold=1.6;tg2({k:'c',x,y,r:150,T:1.4,dmg:Math.round(A*1.3),cold:1,label:'멀리!',c:'150,220,255'});}
 if(k==='ring3'){pop(x,y-70,'바닥이 얼어요!','#bfefff');for(let i=0;i<3;i++)setTimeout(()=>{if(S2.bs===B&&B.on&&hero.st!=='dead')tg2({k:'c',x:hero.x,y:hero.y,r:50,T:1.0,dmg:Math.round(A*.95),cold:1,c:'150,220,255'});},i*500);}
 if(k==='roots'){pop(x,y-70,'뿌리가 솟아요!','#d0f0d0');for(let i=0;i<6;i++){const q=Math.random()*6.283,d=rnd(30,170);tg2({k:'c',x:hero.x+Math.cos(q)*d,y:hero.y+Math.sin(q)*d*.7,r:42,T:1.1+i*.12,dmg:Math.round(A*.9),c:'190,230,190'});}}
 if(k==='nova'){pop(x,y-70,'서리 폭풍! 멀리 피해요','#bfefff');e.hold=1.8;tg2({k:'c',x,y,r:200,T:1.7,dmg:Math.round(A*1.5),cold:1,label:'멀리!',c:'150,220,255'});}
 if(k==='shield'){pop(x,y-70,'방패를 들어요! 잠깐 공격을 멈춰요','#ffe08a');e.guard=2.2;e.hold=2.2;setTimeout(()=>{if(S2.bs===B&&B.on&&e.st!=='dead'){e.guard=0;pop(e.x,e.y-70,'반격!','#ffd0a0');tg2({k:'f',x:e.x,y:e.y,a:Math.atan2(hero.y-e.y,hero.x-e.x),r:150,arc:2.2,T:.95,dmg:Math.round(A*(e.gHit?1.6:1.1)),c:'255,200,120'});e.gHit=0;}},2200);}}

// ----- 세르카 3단계 -----
// 1단계(체력 100~67%): 창 찌르기 · 넓은 휘두르기 · 얼음 파도
// 2단계(66~34%): 빙월 거울 2개(광선) · 분신 2명 · 진짜는 발밑에 초승달
// 3단계(33~0%): 보호막 + 화로 3개 꺼짐 → 화로를 다시 켜면 보호막이 깨지고 기절 · 강한 창 뒤 긴 빈틈
// 체력이 바닥나면 쓰러지지 않고 '제압' → 가운데 제단에서 봉인구 사용
function sAtk2(k,e,A){const x=e.x,y=e.y,a=Math.atan2(hero.y-y,hero.x-x);e.d=dirTo(e,hero);gaSet2(e,k);
 if(k==='thrust'){pop(x,y-74,'창 찌르기!','#d0c8ff');e.hold=Math.max(e.hold||0,1.1);tg2({k:'l',x,y,a,len:420,w:24,T:1.0,dmg:Math.round(A*1.4),c:'190,180,255'});}
 if(k==='sweep'){pop(x,y-74,'창을 넓게 휘둘러요!','#d0c8ff');e.hold=Math.max(e.hold||0,1.1);tg2({k:'f',x,y,a,r:150,arc:2.6,T:1.05,dmg:Math.round(A*1.2),c:'190,180,255'});}
 if(k==='wave'){pop(x,y-74,'얼음 파도!','#bfefff');e.hold=Math.max(e.hold||0,1.2);for(let i=0;i<7;i++){const d=60+i*56;tg2({k:'c',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,r:44,T:.9+i*.14,dmg:Math.round(A*1.0),cold:1,c:'150,220,255'});}}
 if(k==='big'){pop(x,y-74,'강한 얼음창! 크게 비켜요','#ff9a9a');e.hold=1.6;tg2({k:'l',x,y,a,len:560,w:44,T:1.5,dmg:Math.round(A*1.9),c:'255,120,140',label:'강한 창',on:()=>{const k=S2.sk;if(!k||e.st==='dead')return;k.open=3.5;e.hold=3.5;pop(e.x,e.y-80,'빈틈! 지금 공격해요','#ffe08a');}});}}
function serkaTick2(dt,B,e,r,A){const k=S2.sk||(S2.sk={ph:1,brz:[1,1,1],sh:0,open:0,swapT:6,mirT:3,dec:[]}),hp=e.hp/e.m.hp;
 if(k.open>0){k.open-=dt;e.hold=Math.max(e.hold||0,.2);if(k.open>0)return;}
 // 단계 넘어가기
 if(k.ph===1&&hp<=.66){k.ph=2;S2.tg.length=0;burst(e.x,e.y-40,'#c0b0ff',30,170,2,50);sayAs('빙월사도 세르카',['빙월이여, 나를 비춰라.','(얼음 거울 두 개가 솟고, 세르카가 셋으로 나뉘어요. 진짜는 발밑에 초승달이 빛나요)']);
  const ps=[[-5,-3],[5,-3]];for(const [dx,dy] of ps){const m=Object.assign({},MOB.serka,{n:'세르카의 분신',atk:Math.round(MOB.serka.atk*.45),boss:0}),x=e.x+dx*TS,y=e.y+dy*TS;
   const d=ent({k:m.spr,m,x,y,hp:999999,hx:x,hy:y,wt:0,cd:2});d.dec2=1;d.angry=1;mobs.push(d);k.dec.push(d);}sync2();return;}
 if(k.ph===2&&hp<=.33){k.ph=3;clearDec2();k.dec=[];S2.tg.length=0;k.sh=1;k.brz=[0,0,0];gaSet2(e,'shield');burst(e.x,e.y-40,'#a0e0ff',36,190,2,60);
  sayAs('빙월사도 세르카',['…얼어붙어라. 불도, 맹세도.','(세르카가 얼음 보호막을 둘렀어요. 제단 둘레 화로 세 개가 꺼졌어요. 화로를 다시 켜면 보호막이 깨져요!)']);sync2();return;}
 if(k.ph===2){k.swapT-=dt;if(k.swapT<=0&&k.dec.length){k.swapT=7;const L=[e,...k.dec.filter(d=>mobs.includes(d))],P0=L.map(m=>[m.x,m.y]);for(let i=P0.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[P0[i],P0[j]]=[P0[j],P0[i]];}
   L.forEach((m,i)=>{burst(m.x,m.y-40,'#c0b0ff',10,90,2,20);m.x=P0[i][0];m.y=P0[i][1];});k.dec.forEach(d=>d._rev=0);pop(e.x,e.y-90,'자리를 바꿨어요!','#d0c8ff');}
  k.mirT-=dt;if(k.mirT<=0){k.mirT=3.0;const m=r.mirrors[(Math.random()*2)|0],mx=tx5(m[0]),my=ty5(m[1])-30,a=Math.atan2(hero.y-my,hero.x-mx);tg2({k:'l',x:mx,y:my,a,len:700,w:22,T:1.15,dmg:Math.round(A*1.1),cold:1,c:'170,220,255',label:'거울 광선'});}}
 if(k.ph===3&&k.sh&&k.brz.every(Boolean)){k.sh=0;k.open=4;e.hold=4;S2.tg.length=0;burst(e.x,e.y-40,'#ffd080',40,200,2,70);shake=Math.max(shake,4);pop(e.x,e.y-90,'보호막이 깨졌어요! 기절!','#ffe08a');return;}
 B.cd-=dt;if(B.cd>0)return;B.cd=rnd(2.2,2.9)*(k.ph===3?.9:1)+(k.sh?1.0:0);
 const L=k.ph===1?['thrust','sweep','wave']:k.ph===2?['thrust','wave']:k.sh?['sweep','wave']:['big','sweep','wave','big'];sAtk2(L[Math.random()*L.length|0],e,A);}
const _hurtS2=hurt;hurt=function(m,dmg){
 if(m&&m.dec2){pop(m.x,m.y-70,'분신이에요! 발밑 초승달을 찾아요','#d0c8ff');m._rev=1;if(hT===m)hT=null;return;}
 if(m&&m.b2==='serka'&&m.st!=='dead'){const k=S2.sk,f=f2();if(m.sup)return;
  if(k&&k.sh){pop(m.x,m.y-70,'보호막! 화로 3개를 다시 켜요','#a0e0ff');return;}
  if(k&&k.open>0)dmg=Math.round(dmg*1.5);
  if(!m.mem&&m.hp-dmg<1){dmg=Math.max(0,m.hp-1);_hurtS2(m,dmg);m.hp=1;if(!f.sup15)sup2(m);return;}}
 if(m&&m.b2==='s2leorn'&&m.guard>0){m.gHit=1;pop(m.x,m.y-70,'방패로 막았어요!','#ffe08a');dmg=Math.round(dmg*.2);}
 return _hurtS2(m,dmg);};
function sup2(e){const f=f2();f.sup15=1;e.sup=1;e.angry=0;e.hold=99;S2.tg.length=0;clearDec2();if(S2.sk)S2.sk.sh=0;if(S2.bs)S2.bs.on=0;burst(e.x,e.y-40,'#c0e8ff',30,160,2,50);sync2();
 sayAs('빙월사도 세르카',['(세르카가 얼음창을 떨어뜨리고 무릎을 꿇었어요)'],()=>sayAs('마족 문양 해독자 루미아',['세르카가 쓰러졌어요! 지금이에요.','봉인구를 제단에 꽂아 문을 닫아요!'],()=>{toast('가운데 제단에서 \'두 번째 봉인구 꽂기\'를 해요','g');qCheck();save();}));}

// ----- 방어전 (룬 기둥): 나오는 적을 모두 쓰러뜨리면 기둥이 켜져요 -----
function waveStart2(key,c,waves,onWin,line){if(S2.wave)return;S2.wave={key,c,waves,i:-1,L:[],onWin,t:1.2};auto=null;setHunt(false);if(line)log(line,'n');toast('방어전 시작! 몰려오는 적을 모두 쓰러뜨려요','w');sync2();}
function waveTick2(dt){const W=S2.wave;if(!W)return;if(hero.st==='dead'){for(const m of W.L)if(m.st!=='dead'){const i=mobs.indexOf(m);if(i>=0)mobs.splice(i,1);}S2.wave=null;toast('방어전이 처음으로 돌아갔어요. 기둥은 다시 켤 수 있어요','w');sync2();return;}
 W.L=W.L.filter(m=>m.st!=='dead'&&mobs.includes(m));if(W.L.length)return;W.t-=dt;if(W.t>0)return;W.i++;
 if(W.i>=W.waves.length){const fn=W.onWin;S2.wave=null;fn();sync2();return;}
 W.t=1.5;const ids=W.waves[W.i];toast('방어전 '+(W.i+1)+'/'+W.waves.length,'w');
 ids.forEach((id,j)=>{for(let t=0;t<30;t++){const q=(j/ids.length)*6.283+rnd(-.3,.3),d=rnd(4,6)*TS,x=tx5(W.c[0])+Math.cos(q)*d,y=ty5(W.c[1])+Math.sin(q)*d;if(blocked({m:1},x,y))continue;
   const m=Object.assign({},MOB[id],{ex:Math.round(MOB[id].ex*.4)}),e=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:0,cd:0});e.w2=1;e.angry=1;mobs.push(e);W.L.push(e);burst(x,y-20,'#bfefff',10,80,2,20);break;}});}
function spawnNear2(id,cx,cy,n){for(let j=0;j<n;j++)for(let t=0;t<30;t++){const q=(j/n)*6.283+rnd(-.4,.4),d=rnd(3,5)*TS,x=tx5(cx)+Math.cos(q)*d,y=ty5(cy)+Math.sin(q)*d;if(blocked({m:1},x,y))continue;
  const m=MOB[id],e=ent({k:m.spr,m,x,y,hp:m.hp,hx:x,hy:y,wt:1,cd:1});e.angry=1;mobs.push(e);burst(x,y-20,'#bfefff',10,80,2,20);break;}}

// ----- 빙결 대포 (14장): 부수기 전에는 가까이 오면 푸른 원을 먼저 띄우고 쏴요 -----
function cannonTick2(dt){if(RGN.cur!=='D141'||S2.end)return;const r=R2('D141'),f=f2();
 r.devs.forEach((p,i)=>{if(f['cn'+i])return;const x=tx5(p[0]),y=ty5(p[1]);if(Math.hypot(hero.x-x,hero.y-y)>10*TS||hero.st==='dead'){S2.cn[i]=Math.max(S2.cn[i],1.5);return;}
  S2.cn[i]-=dt;if(S2.cn[i]>0)return;S2.cn[i]=rnd(3.0,3.8);pop(x,y-60,'얼음포 발사!','#bfefff');tg2({k:'c',x:hero.x,y:hero.y,r:64,T:1.25,dmg:1000,cold:1,c:'150,220,255',label:'포탄'});});}
// 퀘스트에 필요한 몬스터가 다시 나올 때 조금 더 자주 나오게 (기존 questMob 방식 그대로)
const _questMobS2=questMob;questMob=function(){const q=qCur();if(q&&q.ch>=11&&q.goal&&q.goal.f2&&P.q.st==='go'){for(const k of q.goal.f2){if(KQ2[k]&&cnt2(k)<need2(k))return KQ2[k][0];if(k==='key14'&&cnt2(k)<3)return 's2sol';if(k==='gear14'&&cnt2(k)<5)return 's2golem';}return null;}return _questMobS2();};

// 자동 사냥: 한 번 때려서 분신으로 드러난 상대는 다음 자리바꾸기 전까지 다시 고르지 않음 (분신만 계속 때리며 멈추던 문제)
const _pickT2=pickTarget;pickTarget=function(){const L=mobs.filter(m=>m.dec2&&m._rev),st=L.map(m=>m.st);L.forEach(m=>m.st='dead');try{return _pickT2();}finally{L.forEach((m,i)=>m.st=st[i]);}};
