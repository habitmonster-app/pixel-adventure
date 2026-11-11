
// ----- 세르카 대화 · 봉인 · 결말 -----
const DLG2=['…왔구나. 첫 번째 문을 닫은 인간.','인간의 왕들이 또 봉인의 힘을 훔치고 있다.','이 문은 인간 기사와 우리 마족 기사가 함께 닫았다. 그런데 너희 왕국은 우리 이름을 지우고, 봉인의 힘만 몰래 빼 간다.','나를 막으면 진실도 얼음 속에 묻힐 것이다.'];
function serkaTalk2(){const f=f2();if(f.talk15||talk||S2.talking)return;S2.talking=1;auto=null;setHunt(false);
 sayAs('빙월사도 세르카',DLG2,()=>{facMenu({n:'빙월사도 세르카'},'세르카: 답해라, 인간.',[
  ['"진실은 내가 찾겠다. 그래도 문은 닫아야 한다."',()=>{closeFac();f.choice15=1;sayAs('빙월사도 세르카',['…말뿐인 약속이라면 삼백 년 동안 충분히 들었다.','검으로 증명해라.'],()=>{f.talk15=1;S2.talking=0;bsSpawn2();sync2();qCheck();save();});}],
  ['"누가 훔치든, 문이 열리면 두 세계가 얼어붙는다."',()=>{closeFac();f.choice15=2;sayAs('빙월사도 세르카',['알고 있다. 그래도 잊힌 채 얼어 있는 것보다는 낫다.','막고 싶다면 막아 봐라.'],()=>{f.talk15=1;S2.talking=0;bsSpawn2();sync2();qCheck();save();});}]]);});}
const END2=[['(알림)','(두 번째 봉인구를 빙월 제단 가운데에 꽂았어요)'],['(알림)','(세 개의 서리 봉인석이 차례로 빛나고, 얼어붙은 두 번째 마계문이 천천히 닫혀요)'],
 ['(알림)','(멀리 서리항에서 얼음이 녹는 소리가 들려요. 배와 주민들이 다시 움직이기 시작해요)'],
 ['빙월사도 세르카','두 개의 문이 닫혔다.'],['빙월사도 세르카','하지만 세 번째 문 아래에서는 이미 독뿌리가 자라고 있다.'],['빙월사도 세르카','그 뿌리를 키운 것은 마족만이 아니다.'],
 ['(알림)','(세르카는 얼음 안개와 함께 사라졌어요)'],
 ['왕실 기록관 리아','제단 아래에서 명부가 나왔어요. 서약의 달 기사단… 마족 기사들의 이름이에요. 왕국 기록에서 지워졌던 이름들이에요.'],
 ['왕실 기록관 리아','다시 쓸게요. 이번에는 지워지지 않게요. …잠깐, 기록판을 보세요.'],
 ['(알림)','(리아의 기록판 위에서 남쪽 늪의 문양이 초록색으로 빛나요. 검은 늪과 거대한 독버섯, 땅 아래에서 움직이는 뿌리가 떠올라요)'],
 ['기사단장 카이렌','봉인의 힘을 훔치는 자가 왕국 안에 있다면… 이제 칼끝을 안으로도 돌려야겠군. 오늘은 쉬게.'],
 ['(알림)','— 15장 \'두 번째 마계문\' 끝 · 시즌 2 「얼어붙은 맹세」 완료 —'],
 ['(다음 시즌 예고)','시즌 3 「독뿌리의 세 번째 문」 · 거대한 늪과 독버섯 숲 · 독안개와 해독제, 정화 거점 · 역병사도 모르가']];
function seal2(){const f=f2();if(f.seal15||!f.sup15||S2.end)return;if(!f.core15)return hint2('두 번째 봉인구가 없어요');S2.end=1;auto=null;setHunt(false);S2.tg.length=0;const e=S2.bs&&S2.bs.e;
 burst(hero.x,hero.y-40,'#a0e0ff',40,200,2,70);shake=Math.max(shake,5);
 const step=i=>{if(i>=END2.length){S2.end=0;f.end15=1;if(!f.rw15){f.rw15=1;addMat('s2core',2);addMat('s2aur',3);P.gold+=6000;toast('첫 봉인 보상: 세르카의 빙월핵 2 · 오로라 결정 3 · 6000골드 · 빙월 작업대에 빙월핵 장신구가 열렸어요','g');}
   qCheck();save();refreshSide();afterEnd2();return;}
  if(i===1){f.seal15=1;P.s2={t:Date.now(),lv:P.lv,ch:f.choice15|0};save();}
  if(i===6){if(e){const k=mobs.indexOf(e);if(k>=0)mobs.splice(k,1);}S2.bs=null;S2.sk=null;sync2();}
  sayAs(END2[i][0],[END2[i][1]],()=>setTimeout(()=>step(i+1),120));};step(0);}
function afterEnd2(){facMenu({n:'두 번째 마계문 · 봉인 완료'},'두 번째 마계문은 닫힌 그대로예요. 어떻게 할까요?',[
 ['🏰 왕성으로 귀환',()=>{closeFac();tele2(1264,39,'왕성 중앙 광장');}],['계속 탐험하기',()=>{closeFac();toast('제단에서 봉인의 기억(세르카 회고전)과 결말 다시 보기를 할 수 있어요. 은백림 깊은 곳에 무언가 숨어 있대요','g');}]]);}
function altar2(){const f=f2();facMenu({n:'빙월 제단'},'두 번째 마계문은 닫혀 있어요. 서리 봉인석 셋이 조용히 빛나요.',[
 ...(S2.memCd<=0?[['봉인의 기억 (세르카 회고전)',()=>{closeFac();facMenu({n:'봉인의 기억'},'제단에 남은 기억 속에서 세르카와 세 단계를 다시 겨뤄요. 마계문은 열리지 않아요. (이기면 3000골드 · 오로라 결정 2 · 가끔 빙월핵)',[
   ['다시 겨루기',()=>{closeFac();S2.memGo=1;bsSpawn2();toast('세르카의 기억이 나타났어요','w');}],['그만두기',()=>closeFac()]]);}]]:[]),
 ['결말 다시 보기',()=>{closeFac();sayAs('(결말 다시 보기)',END2.map(l=>(l[0].startsWith('(')?'':l[0]+': ')+l[1]));}],
 ['🏰 왕성으로 귀환',()=>{closeFac();tele2(1264,39,'왕성 중앙 광장');}],['닫기',()=>closeFac()]]);}

// ----- 사람들 -----
// 왕성(D72): 리아(얼어붙은 편지) · 네리아(마계 쪽 소식)
npc7('D72','k2ria0','n10ria','왕실 기록관 리아',1262,40,{d:2,cond:()=>s2Open()&&!(P.f2&&P.f2.in151)});
npc7('D72','k2ner0','n10ner','문양 해독자 네리아',1267,40,{d:2,cond:()=>s2Open()});
const N2=[{r:'D111',k:'k2kai',img:'mon_kairen',n:'기사단장 카이렌',kx:'kai'},{r:'D111',k:'k2eil',img:'s2n2_eil',n:'북부 정찰대장 에일린',kx:'eil'},
 {r:'D121',k:'k2noah',img:'s2n2_noah',n:'등대지기 노아',kx:'noah'},{r:'D121',k:'k2sena',img:'s2n2_sena',n:'북부 치료사 세나',kx:'sena'},{r:'D121',k:'k2eil',img:'s2n2_eil',n:'북부 정찰대장 에일린',kx:'eil'},{r:'D121',k:'k2broom',img:'s2n2_broom',n:'북부 대장장이 브룸',kx:'broom'},
 {r:'D131',k:'k2lum',img:'s2n2_lum',n:'마족 문양 해독자 루미아',kx:'lum'},{r:'D131',k:'k2eil',img:'s2n2_eil',n:'북부 정찰대장 에일린',kx:'eil'},{r:'D131',k:'k2sena',img:'s2n2_sena',n:'북부 치료사 세나',kx:'sena'},{r:'D131',k:'k2noah',img:'s2n2_noah',n:'등대지기 노아',kx:'noah'},
 {r:'D141',k:'k2kai',img:'mon_kairen',n:'기사단장 카이렌',kx:'kai'},{r:'D141',k:'k2eil',img:'s2n2_eil',n:'북부 정찰대장 에일린',kx:'eil'},{r:'D141',k:'k2sena',img:'s2n2_sena',n:'북부 치료사 세나',kx:'sena'},{r:'D141',k:'k2broom',img:'s2n2_broom',n:'북부 대장장이 브룸',kx:'broom'},
 {r:'D151',k:'k2kai',img:'mon_kairen',n:'기사단장 카이렌',kx:'kai'},{r:'D151',k:'k2ria',img:'n10ria',n:'왕실 기록관 리아',kx:'ria'},{r:'D151',k:'k2lum',img:'s2n2_lum',n:'마족 문양 해독자 루미아',kx:'lum'},{r:'D151',k:'k2eil',img:'s2n2_eil',n:'북부 정찰대장 에일린',kx:'eil'}];
function spawnN2(){for(let i=npcs.length-1;i>=0;i--)if(npcs[i].c2)npcs.splice(i,1);for(let i=NPC.length-1;i>=0;i--)if(NPC[i].c2)NPC.splice(i,1);
 if(!in2()||!P)return;const reg=R2(RGN.cur);for(const d of N2){if(d.r!==RGN.cur)continue;if(!IMG[d.img])continue;IMG[d.k]=IMG[d.img];SMETA[d.k]=SMETA[d.img];const p=reg[d.kx];if(!p)continue;const x=tx5(p[0]),y=ty5(p[1]);
  const nd={k:d.k,n:d.n,x,y,d:2,say:['…'],c2:1};NPC.push(nd);const e=ent({...nd,hx:x,hy:y,wt:rnd(1,4)});e.c2=1;npcs.push(e);}}
const say2=(nm,L,fn)=>sayAs(nm,L,fn);
const rest2=['쉬기 (체력·마나 회복 · 저장)',()=>{closeFac();restCamp();}];
const nextTip2=()=>{const q=qCur();if(!q||!(q.ch>=11))return '';return ' (지금 할 일: '+q.n+')';};
Object.assign(FAC31,{
 k2ria0:n=>{const f=f2();facMenu(n,'왕실 기록관 리아: '+(f.ria11?'광장 북서쪽 뒷길 끝이 북문이에요. 에일린 대장이 서리길에서 기다려요.':'기사님! 마침 잘 오셨어요. 북부에서 편지가 왔는데…'),[
  ...(!f.ria11?[['얼어붙은 편지 보기',()=>{closeFac();say2(n.n,['북부에서 온 편지가 얼어붙어 있어요.','두 번째 마계문이 열린 것 같아요.','편지를 녹여 보니 북부 정찰대장 에일린의 글씨예요. 하룻밤 사이에 서리항과 바다가 얼었고, 정찰대가 돌아오지 않는대요.','광장 북서쪽 뒷길 끝으로 나가면 북문이에요. 카이렌 단장님도 먼저 북문으로 가셨어요.'],()=>{f.ria11=1;toast('광장 북서쪽 뒷길 끝에서 북문으로 나갈 수 있어요','g');sync2();qCheck();save();});}]]:[]),
  ['북문으로 가기',()=>{closeFac();const A=R2('D111');go5({rid:'D111',x:A.entry[0],y:A.entry[1],n:'왕성 북문 · 서리길'});}]]);},
 k2ner0:n=>{const f=f2();const L=f.seal15?['두 번째 문이 닫히자 마계 쪽 바람이 바뀌었어요. 남쪽, 늪 쪽에서 썩은 냄새가 나요.','세 번째 문이 깨어나고 있어요. 이번엔… 마족만의 짓이 아닐지도 몰라요.']:
  f.boss14?['빙월협곡의 마기가 가장 짙어요. 세르카는 사도 중에서도 오래된 쪽이에요.','세르카는 원래 봉인을 지키던 가문이라는 소문이 있어요. 싸우기 전에 그녀 말을 한 번은 들어 봐요.']:
  f.boss12?['북쪽 숲에 마족 문양을 읽는 사람이 있대요. 루미아… 인간 편에 선 마족이에요. 믿어도 돼요.','마계 쪽에서는 \'빙월의 사도가 기록을 찾고 있다\'는 말이 돌아요.']:
  ['마계 쪽 바람이 북쪽으로 몰려요. 두 번째 문이 서리를 뿜고 있어요.','저는 왕성에서 마계 쪽 소식을 모아 전할게요. 무리하지 마요.'];
  facMenu(n,'문양 해독자 네리아: 마계 쪽 소식을 모으고 있어요.',[['마계 쪽 소식 듣기',()=>{closeFac();say2(n.n,L);}],['닫기',()=>closeFac()]]);},
 k2kai:n=>{const f=f2(),e=RGN.cur==='D151';facMenu(n,'기사단장 카이렌: '+(f.seal15?'두 번째 문도 닫혔다. 이번엔 마족 기사들의 이름도 함께 적히겠군.':e?'여기가 마지막 야영지다. 뒤는 우리가 맡는다.':RGN.cur==='D141'?'정면 성문부터 뚫는다. 병사들을 쓰러뜨리고 장치를 움직여라.':'북문 밖이 이렇게 얼어붙다니. 마물들이 눈보라를 타고 내려온다.')+nextTip2(),[
  ...(e&&!f.kai15?[['이야기하기',()=>{closeFac();say2(n.n,['이번에도 뒤는 우리가 맡는다.','문을 닫는 일은 자네에게 맡기겠다.'],()=>{f.kai15=1;toast('카이렌과 이야기했어요','g');sync2();qCheck();save();});}]]:[]),rest2]);},
 k2eil:n=>{const f=f2();facMenu(n,'북부 정찰대장 에일린: '+(f.seal15?'협곡에 바람이 멎었어요. 정찰대도 다 돌아왔어요. 고마워요.':'짧게 말할게요. 길은 내가 찾아요. 싸움은 같이 해요.')+nextTip2(),[['다음 할 일 묻기',()=>{closeFac();const q=qCur();say2(n.n,[q&&q.ch>=11?'지금은 \''+q.n+'\'이에요. 퀘스트 창의 \'목적지로 가기\'를 누르면 내가 길을 알려 줄게요.':'지금은 급한 일이 없어요. 쉬어요.']);}],rest2]);},
 k2noah:n=>{const f=f2();facMenu(n,'등대지기 노아: '+(f.light12?'등대가 켜져서 구조선이 왔어요! 헤헤.':'바다가 얼어서… 아니에요, 괜찮아요! 할 수 있어요!')+nextTip2(),[
  ...(RGN.cur==='D121'&&!f.noah12?[['무슨 일인지 묻기',()=>{closeFac();say2(n.n,['하룻밤 사이에 바다가 전부 얼었어요.','사람들도 얼음 속에 갇혀 있어요!','세나 선생님이 다친 사람들을 돌보고 있어요. 얼음을 깰 사람이 필요해요!'],()=>{f.noah12=1;sync2();qCheck();save();});}]]:[]),rest2]);},
 k2sena:n=>facMenu(n,'북부 치료사 세나: 다친 곳이 있으면 말해요. 천천히 숨 쉬어요.'+nextTip2(),[['치료받기 (체력·마나 회복 · 저장)',()=>{closeFac();restCamp();}]]),
 k2broom:n=>{const f=f2();facMenu(n,'북부 대장장이 브룸: '+(f.smith12||P.ch12?'망치가 돌아왔다! 빙철이면 뭐든 두드려 주지!':'고블린 놈들이 내 망치랑 철광석을 다 가져갔어!'),[
  ...(f.smith12||P.ch12?[['빙철 장비 만들기',()=>{closeFac();openCraft('frost');}]]:[]),rest2]);},
 k2lum:n=>{const f=f2(),e=RGN.cur==='D151';facMenu(n,'마족 문양 해독자 루미아: '+(f.seal15?'두 세계의 이름이 다시 나란히 적혔어요. …고마워요.':'저는 마족이지만, 봉인을 지키는 편이에요. 문양은 제가 읽을게요.')+nextTip2(),[
  ...(e&&!f.lum15?[['이야기하기',()=>{closeFac();say2(n.n,['제단 둘레에 서리 봉인석 셋이 있어요. 그게 문을 붙잡고 있어요.','세르카는… 거짓말을 하는 사도가 아니에요. 그래서 더 무서워요.'],()=>{f.lum15=1;toast('루미아와 이야기했어요','g');sync2();qCheck();save();});}]]:[]),rest2]);},
 k2ria:n=>{const f=f2();facMenu(n,'왕실 기록관 리아: '+(f.seal15?'명부를 다시 쓰고 있어요. 서약의 달 기사단… 이번엔 지워지지 않게요.':'봉인 기록은 제가 맡을게요.')+nextTip2(),[
  ...(!f.ria15?[['이야기하기',()=>{closeFac();say2(n.n,['레오른이 말한 \'봉인의 힘을 훔치는 자\'… 왕실 기록에 이상한 출납이 있었어요.','지금은 문부터 닫아요. 이야기는 돌아가서 해요.'],()=>{f.ria15=1;toast('리아와 이야기했어요','g');sync2();qCheck();save();});}]]:[]),
  ['봉인구 조립대 열기',()=>{closeFac();openCraft('frost');}],rest2]);}});
