// ----- 모르가 대화 · 봉인 · 결말 -----
const DLG3=['…왔구나. 두 개의 문을 닫은 인간.','인간은 언제나 우리를 침략자라 부르지.','하지만 이 늪에 독을 심은 첫 손은 너희 왕실이었다.','그래도 나를 막겠느냐?'];
function morgaTalk3(){const f=g3();if(f.talk20||talk||G3.talking)return;G3.talking=1;auto=null;setHunt(false);
 sayAs('역병사도 모르가',DLG3,()=>{facMenu({n:'역병사도 모르가'},'모르가: 답해라, 인간.',[
  ['"왕실의 죄도 밝히겠다. 하지만 문은 닫는다."',()=>{closeFac();f.choice20=1;sayAs('역병사도 모르가',['둘 다 감당하겠다고? 인간치고는 욕심이 크군.','그 약속이 거짓인지 내가 직접 확인해 주마.'],()=>{f.talk20=1;G3.talking=0;bsSpawn3();sync3();qCheck();save();});}],
  ['"누가 시작했든 더 많은 희생은 막아야 한다."',()=>{closeFac();f.choice20=2;sayAs('역병사도 모르가',['그 말은 수없이 들었다.','네 힘이 그 말만큼 단단한지 보여라.'],()=>{f.talk20=1;G3.talking=0;bsSpawn3();sync3();qCheck();save();});}]]);});}
const LUM3='마족 문양 해독자 루미아',RIA3='왕실 기록관 리아',NER3='문양 해독자 네리아',KAI3='기사단장 카이렌';
const END3=[['(알림)','(세 번째 봉인구를 역병 제단 가운데에 꽂았어요)'],[LUM3,'봉인문이 연결됐어요! 첫 번째, 두 번째 문과 같은 빛이에요!'],
 [RIA3,'검은 수정의 독기가 밀려나고 있어요. 조금만 더 버텨요!'],[RIA3,'문이 닫히고 있어요!'],
 ['(알림)','(세 번째 마계문이 천천히 닫히고, 검은 뿌리가 회색으로 말라 부서져요)'],[NER3,'독기가 사라져요… 세 번째 문도 끝났어요.'],
 ['역병사도 모르가','세 개를 닫았다고 끝난 줄 아느냐… 네 번째 문은 이미 불타고 있다.'],['(알림)','(모르가는 검은 포자 안개와 함께 사라졌어요)'],
 [NER3,'이번에도 문은 닫혔어요. 하지만 모르가 말이 맞다면 인간 쪽 기록도 끝까지 조사해야 해요.'],
 [KAI3,'왕실의 죄라 해도 덮지는 않겠다. 돌아가서 모든 기록을 확인하자.'],
 ['(알림)','(멀리 동쪽 산맥 너머 하늘이 붉게 물들어요)'],[LUM3,'…불이에요. 네 번째 마계문이 깨어나고 있어요.'],
 ['(알림)','— 20장 \'세 번째 마계문\' 끝 · 시즌 3 「독뿌리의 세 번째 문」 완료 —'],
 ['(다음 시즌 예고)','시즌 4 「붉은 대장간의 네 번째 문」 · 동쪽 화산 산맥']];
function seal3(){const f=g3();if(f.seal20||!f.sup20||G3.end)return;if(!f.core20)return hint3('세 번째 봉인구가 없어요. 야영지 조립대에서 만들어요');G3.end=1;auto=null;setHunt(false);S2.tg.length=0;const e=G3.bs&&G3.bs.e;
 burst(hero.x,hero.y-40,'#9ef07a',40,200,2,70);shake=Math.max(shake,5);
 const step=i=>{if(i>=END3.length){G3.end=0;f.end20=1;if(!f.rw20){f.rw20=1;addMat('s3core',1);addMat('s3cry',3);P.gold+=8000;toast('첫 봉인 보상: 모르가의 역병핵 1 · 정화수정 3 · 8000골드 · 정화 작업대에 역병핵 반지가 열렸어요','g');}
   qCheck();save();refreshSide();afterEnd3();return;}
  if(i===3){f.seal20=1;P.s3={t:Date.now(),lv:P.lv,ch:f.choice20|0};buildLights3();sync3();save();}
  if(i===7){if(e){const k=mobs.indexOf(e);if(k>=0)mobs.splice(k,1);}G3.bs=null;G3.mk=null;sync3();}
  sayAs(END3[i][0],[END3[i][1]],()=>setTimeout(()=>step(i+1),120));};step(0);}
function afterEnd3(){facMenu({n:'세 번째 마계문 · 봉인 완료'},'세 번째 마계문은 닫힌 그대로예요. 어떻게 할까요? (캐릭터·장비·진행은 그대로예요)',[
 ['🏰 왕성으로 귀환',()=>{closeFac();tele3(1264,39,'왕성 중앙 광장');}],['계속 탐험하기',()=>{closeFac();toast('역병 제단에서 봉인의 기억(모르가 회고전)과 결말 다시 보기를 할 수 있어요. 독버섯 숲 북서쪽 균사굴에 무언가 깨어났대요','g');}]]);}
function altar3(){facMenu({n:'역병 제단'},'세 번째 마계문은 닫혀 있어요. 정화 봉인석 셋이 조용히 빛나요.',[
 ...(G3.memCd<=0?[['봉인의 기억 (모르가 회고전)',()=>{closeFac();facMenu({n:'봉인의 기억'},'제단에 남은 기억 속에서 모르가와 네 단계를 다시 겨뤄요. 마계문은 열리지 않아요. (이기면 3500골드 · 정화수정 2 · 가끔 역병핵 · 10분에 한 번)',[
   ['다시 겨루기',()=>{closeFac();G3.memGo=1;bsSpawn3();toast('모르가의 기억이 나타났어요','w');}],['그만두기',()=>closeFac()]]);}]]:[]),
 ['결말 다시 보기',()=>{closeFac();sayAs('(결말 다시 보기)',END3.map(l=>(l[0].startsWith('(')?'':l[0]+': ')+l[1]));}],
 ['🏰 왕성으로 귀환',()=>{closeFac();tele3(1264,39,'왕성 중앙 광장');}],['닫기',()=>closeFac()]]);}

// ----- 사람들 -----
// 왕성(D72): 남동쪽 수로문 앞 리아
npc7('D72','k3ria0','n10ria','왕실 기록관 리아',1305,53,{d:2,cond:()=>s3Open()&&!(P.g3&&P.g3.in201)});
const MAR3='남부 정찰대장 마렌',ELI3='왕성 정화사제 엘리아',HAR3='늪지 약초꾼 하린',URB3='옛 연구원 우르반';
const N3L=[{r:'D161',k:'k3maren',img:'s3n_maren',n:MAR3,kx:'maren'},{r:'D161',k:'k3elia',img:'s3n_elia',n:ELI3,kx:'elia'},{r:'D161',k:'k3ria',img:'n10ria',n:RIA3,kx:'ria'},
 {r:'D171',k:'k3harin',img:'s3n_harin',n:HAR3,kx:'harin'},{r:'D171',k:'k3elia',img:'s3n_elia',n:ELI3,kx:'elia'},{r:'D171',k:'k3maren',img:'s3n_maren',n:MAR3,kx:'maren'},
 {r:'D181',k:'k3elia',img:'s3n_elia',n:ELI3,kx:'elia'},{r:'D181',k:'k3maren',img:'s3n_maren',n:MAR3,kx:'maren'},{r:'D181',k:'k3lum',img:'s2n2_lum',n:LUM3,kx:'lum'},
 {r:'D191',k:'k3urban',img:'s3n_urban',n:URB3,kx:'urban'},{r:'D191',k:'k3elia',img:'s3n_elia',n:ELI3,kx:'elia'},{r:'D191',k:'k3maren',img:'s3n_maren',n:MAR3,kx:'maren'},
 {r:'D201',k:'k3kai',img:'mon_kairen',n:KAI3,kx:'kai'},{r:'D201',k:'k3ria',img:'n10ria',n:RIA3,kx:'ria'},{r:'D201',k:'k3lum',img:'s2n2_lum',n:LUM3,kx:'lum'},{r:'D201',k:'k3ner',img:'n10ner',n:NER3,kx:'ner'}];
function spawnN3(){for(let i=npcs.length-1;i>=0;i--)if(npcs[i].c3)npcs.splice(i,1);for(let i=NPC.length-1;i>=0;i--)if(NPC[i].c3)NPC.splice(i,1);
 if(!in3()||!P)return;const reg=R3x(RGN.cur);for(const d of N3L){if(d.r!==RGN.cur)continue;if(!IMG[d.img])continue;IMG[d.k]=IMG[d.img];SMETA[d.k]=SMETA[d.img];const p=reg[d.kx];if(!p)continue;const x=tx5(p[0]),y=ty5(p[1]);
  const nd={k:d.k,n:d.n,x,y,d:2,say:['…'],c3:1};NPC.push(nd);const e=ent({...nd,hx:x,hy:y,wt:rnd(1,4)});e.c3=1;npcs.push(e);}}
const rest3=['쉬기 (체력·마나 회복 · 독 풀기 · 저장)',()=>{closeFac();restCamp();}];
const nextTip3=()=>{const q=qCur();if(!q||!(q.ch>=16))return '';return ' (지금 할 일: '+q.n+')';};
const talkBtn3=(n,flag,L,msg)=>[['이야기하기',()=>{closeFac();sayAs(n.n,L,()=>{g3()[flag]=1;if(msg)toast(msg,'g');sync3();qCheck();save();});}]];
const shopCure3=n=>['해독제 사기 (200골드)',()=>{if(P.gold<200){toast('골드가 모자라요','w');return;}P.gold-=200;P.pot=P.pot||{};P.pot.pot_cure=(P.pot.pot_cure|0)+1;toast('해독제를 샀어요 (가진 것 '+P.pot.pot_cure+'개)','g');save();refreshSide();}];
Object.assign(FAC31,{
 k3ria0:n=>{const f=g3();facMenu(n,'왕실 기록관 리아: '+(f.ria16?'남동쪽 수로문으로 나가면 남부 검문소예요. 마렌 대장이 기다려요.':'기사님! 북쪽의 얼음은 녹았는데… 이번엔 남쪽에서 이상한 냄새가 올라와요.'),[
  ...(!f.ria16?[['무슨 일인지 듣기',()=>{closeFac();sayAs(n.n,['북쪽의 얼음이 녹자마자 남쪽에서 썩은 냄새가 올라오고 있어요.','네리아도 이 독은 평범한 마계 독과 다르다고 했어요.','광장 남동쪽 수로문으로 나가 남부 검문소의 마렌을 만나 주세요.'],()=>{f.ria16=1;toast('광장 남동쪽 끝 수로문으로 나갈 수 있어요','g');sync3();qCheck();save();});}]]:[]),
  ['남문 수로길로 가기',()=>{closeFac();const A=R3x('D161');go5({rid:'D161',x:A.entry[0],y:A.entry[1],n:'흑수늪 입구'});}],shopCure3(n),['닫기',()=>closeFac()]]);},
 k3maren:n=>{const f=g3();facMenu(n,'남부 정찰대장 마렌: '+(f.seal20?'늪 냄새가 사라졌다. 정찰대도 다 돌아왔어. 고맙다.':RGN.cur==='D161'?'늪에서는 눈보다 냄새를 믿어. 독 냄새가 강해지면 바로 돌아와.':'정화 장치가 켜진 곳은 안전하다. 무리해서 밖에 오래 있지 마.')+nextTip3(),[
  ...(RGN.cur==='D161'&&!f.maren16?talkBtn3(n,'maren16',['왔군. 흑수늪 초소가 어제부터 연락이 끊겼다.','안쪽에 들어가기 전에 해독제부터 챙겨.']):[]),
  ['다음 할 일 묻기',()=>{closeFac();const q=qCur();sayAs(n.n,[q&&q.ch>=16?'지금은 \''+q.n+'\'이다. 퀘스트 창의 \'목적지로 가기\'를 누르면 길을 알려 주지.':'지금은 급한 일이 없다. 쉬어.']);}],shopCure3(n),rest3]);},
 k3elia:n=>facMenu(n,'왕성 정화사제 엘리아: '+(g3().seal20?'독기가 걷혔어요. 피험자들도 왕성에서 치료받고 있어요.':'독은 몸만 상하게 하지 않아요. 오래 노출되면 마력도 흐려져요.')+nextTip3(),[['치료받기 (체력·마나 회복 · 독 풀기 · 저장)',()=>{closeFac();restCamp();}],shopCure3(n),['정화 작업대 열기',()=>{closeFac();openCraft('plague');}]]),
 k3harin:n=>{const f=g3();facMenu(n,'늪지 약초꾼 하린: '+(f.boss17?'숲이 숨을 쉬어요! 독버섯은 무섭지만 잘 쓰면 약이 되기도 해요.':'보라색 잎은 만지면 안 돼요. 초록빛 정화잎만 따세요.')+nextTip3(),[
  ...(!f.harin17?talkBtn3(n,'harin17',['앞이 안 보이죠? 포자구름 때문이에요.','정화 횃불을 켜면 잠깐 길이 보여요. 횃불 세 개만 켜 주세요!']):[]),
  ['해독제 만들기 (정화 작업대)',()=>{closeFac();openCraft('plague');}],shopCure3(n),rest3]);},
 k3urban:n=>{const f=g3();facMenu(n,'옛 연구원 우르반: '+(f.boss19?'끝났군요… 기록은 내가 왕성까지 지고 가겠소.':'우리가 시작한 실험이 이렇게 될 줄은 몰랐소.')+nextTip3(),[
  ...(!f.urban19?talkBtn3(n,'urban19',['그 문을… 결국 찾았군요.','나는 이곳에서 일했던 연구원이오. 안으로 들어가면 좋은 것은 아무것도 없소.','…그래도 기록은 남겨야 하오. 인장문은 내가 여는 법을 알려 주지.'],'왕실 인장문을 열 수 있어요'):[]),
  ['기록 이야기 듣기',()=>{closeFac();sayAs(n.n,['기록을 없애지 마시오. 누가 명령했는지 세상에 남겨야 하오.']);}],rest3]);},
 k3lum:n=>{const f=g3(),e=RGN.cur==='D201';facMenu(n,'마족 문양 해독자 루미아: '+(f.seal20?'세 번째 문도 닫혔어요. …그런데 동쪽 하늘이 붉어요.':'또 만났네요. 문양은 제가 읽을게요.')+nextTip3(),[
  ...(e&&!f.lum20?talkBtn3(n,'lum20',['제단 둘레에 정화 봉인석 셋이 있어요. 그게 문을 붙잡고 있어요.','켜진 봉인석 곁에서는 독안개가 닿지 않아요.'],'루미아와 이야기했어요'):[]),rest3]);},
 k3kai:n=>{const f=g3();facMenu(n,'기사단장 카이렌: '+(f.seal20?'왕실의 죄라 해도 덮지는 않겠다.':'여기가 마지막 남부 야영지다. 뒤는 우리가 맡는다.')+nextTip3(),[
  ...(!f.kai20?talkBtn3(n,'kai20',['세 번째 문이 바로 앞이다.','이번에도 전면은 우리가 막겠다. 자네는 봉인을 준비해.'],'카이렌과 이야기했어요'):[]),rest3]);},
 k3ria:n=>{const f=g3(),e=RGN.cur==='D201';facMenu(n,'왕실 기록관 리아: '+(f.seal20?'왕실 기록을 처음부터 다시 볼 거예요. 이번엔 숨기지 않게요.':'봉인 기록은 제가 맡을게요.')+nextTip3(),[
  ...(e&&!f.ria20?talkBtn3(n,'ria20',['우르반 씨가 찾은 명령서… 왕실 인장이 진짜였어요.','지금은 문부터 닫아요. 이야기는 돌아가서 해요.'],'리아와 이야기했어요'):[]),
  ...(e?[['봉인구 조립대 열기',()=>{closeFac();openCraft('plague');}]]:[]),rest3]);},
 k3ner:n=>{const f=g3();facMenu(n,'문양 해독자 네리아: '+(f.seal20?'문은 닫혔어요. 이제 인간 쪽 기록을 볼 차례예요.':'마계 쪽 바람이 이 늪으로 몰려요.')+nextTip3(),[
  ...(!f.ner20?talkBtn3(n,'ner20',['모르가는 마계에서도 역병을 연구하던 자예요.','하지만 저 검은 수정은… 인간 쪽에서 넘어온 거예요.'],'네리아와 이야기했어요'):[]),rest3]);}});
