// ----- 조사·장치·구조 자리 -----
{const add=o=>SP5.push(Object.assign({cd:0,z:'s3',hide:1,g5:1,g3:1,pers:1},o)),at=(x,y)=>({x:tx5(x),y:(y+1)*TS-6});
 const A=R3x('D161'),B=R3x('D171'),C=R3x('D181'),D=R3x('D191'),E=R3x('D201');
 if(A&&A.camp){
  for(const [r,id] of [[A,'D161'],[B,'D171'],[C,'D181'],[D,'D191'],[E,'D201']]){
   add({k:'cam3',si:'cam'+id,r3:id,...at(r.camp[0],r.camp[1]+1),lb:'쉬기',T:.5,on:()=>{restCamp();}});
   add({k:'ret3',si:'ret'+id,r3:id,...at(r.camp[0]+2,r.camp[1]+1),lb:'🏰 왕성으로 귀환',T:.4,on:()=>home3()});
   add({k:'bn3',si:'bn'+id,r3:id,...at(r.bench[0],r.bench[1]+1),lb:id==='D201'?'봉인구 조립대 (정화 작업대)':'정화 작업대',T:.4,on:()=>openCraft('plague')});}
  // 16장
  A.braz.forEach((p,i)=>add({k:'bz',si:'bz'+i,r3:'D161',q:'Q16_06',...at(p[0],p[1]),lb:'정화 화로 켜기',T:1.2,on:()=>light3('bz'+i,'정화 화로',3)}));
  A.scouts.forEach((p,i)=>add({k:'sc',si:'sc'+i,r3:'D161',q:'Q16_05',...at(p[0],p[1]),lb:'독덩굴 끊고 구조하기',T:1.5,pre:()=>guard3('sc'+i,[['s3liz','s3slime'],['s3worm','s3mosq'],['s3liz','s3worm']][i],p,'정찰병'),on:()=>rescue3('sc',i)}));
  // 17장
  B.torches.forEach((p,i)=>add({k:'tc',si:'tc'+i,r3:'D171',q:'Q17_01',...at(p[0],p[1]),lb:'정화 횃불 켜기',T:1.2,on:()=>light3('tc'+i,'정화 횃불',3)}));
  B.gather.forEach((p,i)=>add({k:'gt',si:'gt'+i,r3:'D171',q:'Q17_02',...at(p[0],p[1]),lb:'균사덩굴 끊고 구조하기',T:1.5,pre:()=>guard3('gt'+i,[['s3shroom','s3moth'],['s3turt','s3shroom'],['s3wolf','s3moth']][i],p,'약초꾼'),on:()=>rescue3('gt',i)}));
  B.pods.forEach((p,i)=>add({k:'pd',si:'pd'+i,r3:'D171',q:'Q17_04',...at(p[0],p[1]),lb:'포자주머니 터뜨리기',T:1.0,on:()=>pod3(i)}));
  // 18장
  add({k:'door18',si:'door18',r3:'D181',q:'Q18_01',...at(C.door[0]+1,C.door[1]+1),lb:'무너진 신전 계단 살펴보기',T:1.0,on:()=>door18()});
  C.pils.forEach((p,i)=>add({k:'pil',si:'pil'+i,r3:'D181',q:'Q18_02',...at(p[0],p[1]),lb:'정화 기둥 작동',T:1.0,pre:()=>pilPre3(i),on:()=>pillar3(i)}));
  C.sluices.forEach((p,i)=>add({k:'sl',si:'sl'+i,r3:'D181',q:'Q18_03',...at(p[0],p[1]),lb:'수문 닫기',T:1.3,on:()=>done3('sl'+i,'수문을 닫았어요 ('+(cnt('sl',3)+1)+'/3)')}));
  C.tabs.forEach((p,i)=>add({k:'tb',si:'tb'+i,r3:'D181',q:'Q18_05',...at(p[0],p[1]),lb:'계약 석판 살펴보기',T:1.2,on:()=>tablet3(i)}));
  // 19장
  add({k:'door19',si:'door19',r3:'D191',q:'Q19_01',...at(D.door[0]-1,D.door[1]),lb:'왕실 인장문 열기',T:1.5,pre:()=>{if(!g3().urban19){hint3('먼저 야영지의 우르반과 이야기해요');return 0;}return 1;},on:()=>door19()});
  D.logs.forEach((p,i)=>add({k:'lg',si:'lg'+i,r3:'D191',q:'Q19_02',...at(p[0],p[1]),lb:'연구 기록 읽기',T:1.2,on:()=>log3(i)}));
  D.sw.forEach((p,i)=>add({k:'sw',si:'sw'+i,r3:'D191',q:'Q19_03',...at(p[0],p[1]),lb:'전원 스위치 내리기',T:1.0,on:()=>done3('sw'+i,'배양관 전원을 내렸어요 ('+(cnt('sw',3)+1)+'/3)')}));
  D.cells.forEach((p,i)=>add({k:'ce',si:'ce'+i,r3:'D191',q:'Q19_03',...at(p[0],p[1]+1),lb:'피험자 구조하기',T:1.5,pre:()=>{if(!g3()['sw'+i]){hint3('이 배양관 전원이 아직 켜져 있어요. 위쪽 전원 스위치를 먼저 내려요');return 0;}return guard3('ce'+i,[['s3exp','s3tent'],['s3tent','s3exp'],['s3exp','s3eye']][i],p,'배양관');},on:()=>rescue3('ce',i)}));
  D.vats.forEach((p,i)=>add({k:'vt',si:'vt'+i,r3:'D191',q:'Q19_04',...at(p[0],p[1]),lb:'흑수정 배양기 부수기',T:1.4,on:()=>vat3(i)}));
  D.cores.forEach((p,i)=>add({k:'co',si:'co'+i,r3:'D191',q:'Q19_05',...at(p[0],p[1]),lb:'파손 핵 조사 · 잔재 회수',T:1.6,on:()=>core3(i)}));
  // 20장
  E.stones.forEach((p,i)=>add({k:'st',si:'st'+i,r3:'D201',q:'Q20_02',...at(p[0],p[1]),lb:'정화 봉인석 되살리기',T:1.5,on:()=>stone3(i)}));
  E.stones.forEach((p,i)=>add({k:'rst',si:'rst'+i,r3:'D201',...at(p[0],p[1]),lb:'봉인석 다시 켜기',T:.7,on:()=>{const k=G3.mk;if(!k||!k.sh||k.st[i])return;k.st[i]=1;burst(hero.x,hero.y-30,'#9ef07a',18,110,2,40);
   toast('봉인석을 다시 켰어요 ('+k.st.filter(Boolean).length+'/3)','g');sync3();buildLights3();}}));
  add({k:'al20',si:'al20',r3:'D201',...at(E.altar[0],E.altar[1]+2),lb:'세 번째 봉인구 꽂기',T:1.2,on:()=>seal3()});
  add({k:'alt20',si:'alt20',r3:'D201',...at(E.altar[0],E.altar[1]+2),lb:'역병 제단',T:.3,on:()=>altar3()});}}
function spOn3(n){if(!P||n.r3!==RGN.cur)return false;const f=g3();
 switch(n.k){case 'cam3':case 'ret3':case 'bn3':return true;
  case 'rst':return !!(G3.mk&&G3.mk.sh&&!G3.mk.st[+n.si.slice(3)]);
  case 'al20':return !!f.sup20&&!f.seal20&&!G3.end;
  case 'alt20':return !!f.seal20&&!G3.bs&&!G3.end;
  case 'pil':return qOn3(n.q)&&!f[n.si]&&!S2.wave;
  case 'door19':return (qOn3(n.q)||!!P.ch19)&&!f.door19;}
 if(n.q)return qOn3(n.q)&&!f[n.si];return false;}
const _spOnS3=spOn5;spOn5=function(n){if(n.g3)return spOn3(n);return _spOnS3(n);};
const _startGatherS3=startGather;startGather=function(n){if(!n)return;if(n.g3&&n.pre&&!n.pre())return;_startGatherS3(n);};
function nt3(si,nm){const n=SP5.find(n=>n.g3&&n.si===si);return {rid:n.r3,x:Math.floor(n.x/TS),y:Math.floor(n.y/TS),n:nm};}
const near3=(pre,c,nm)=>()=>{const f=g3();let best=null,bd=1e9;for(let i=0;i<c;i++){if(f[pre+i])continue;const n=SP5.find(n=>n.g3&&n.si===pre+i);if(!n)continue;const d=n.r3===RGN.cur?Math.hypot(n.x-hero.x,n.y-hero.y):1e8+i;if(d<bd){bd=d;best=n;}}
 return best?{rid:best.r3,x:Math.floor(best.x/TS),y:Math.floor(best.y/TS),n:nm}:null;};
function done3(si,msg){const f=g3();if(f[si])return;f[si]=1;burst(hero.x,hero.y-30,'#9ef07a',14,100,2,30);if(msg)toast(msg,'g');buildLights3();sync3();qCheck();save();refreshSide();}
function light3(si,nm,tot){const f=g3();if(f[si])return;f[si]=1;burst(hero.x,hero.y-30,'#9ef07a',18,110,2,40);const pre=si.replace(/\d+$/,'');const n=cnt(pre,tot);
 toast(nm+'에 정화의 불이 붙었어요 ('+n+'/'+tot+') · 둘레는 독안개가 닿지 않는 안전지대예요','g');buildLights3();sync3();qCheck();save();refreshSide();
 if(si.startsWith('bz')&&n>=tot){toast('늪 깊은 곳에서 무언가 움직여요… 늪지기의 웅덩이로!','w');bsSpawn3();}}
const RS3={sc:[['정찰병 토빈','…살았다. 독덩굴이 목까지 감겨 올라왔어요. 마렌 대장님께 전해 주세요.'],['정찰병 세라','고마워요. 늪 안쪽에 커다란 악어가 있어요. 등이 초록빛으로 부풀어 있었어요!'],['정찰병 헥터','(콜록) 독안개 속에서 길을 잃었어요… 화로가 꺼지니 아무것도 안 보였어요.']],
 gt:[['약초꾼 로이','균사가 발목을 붙잡고 놓지 않았어요. 하린 누나한테 가 볼게요!'],['약초꾼 미나','포자가 눈에 들어가서… 고마워요. 이 근처 버섯은 절대 만지지 마세요.'],['약초꾼 바스','허허, 살았구먼. 숲 남쪽 둥지에 거대한 하얀 버섯이 있다네.']],
 ce:[['피험자 (병사)','…여기가 어디죠? 기억이… 누군가 \'실험 번호\'로 저를 불렀어요.'],['피험자 (농부)','늪 마을에서 끌려왔어요. 왕실 문장을 단 사람들이었어요…'],['피험자 (아이)','엄마… 엄마한테 갈래요. (엘리아가 아이를 품에 안아요)']]};
const RSN3={sc:['정찰병',3],gt:['약초꾼',3],ce:['피험자',3]};
function rescue3(pre,i){const f=g3(),si=pre+i;if(f[si])return;const L=RS3[pre][i];burst(hero.x,hero.y-30,'#9ef07a',18,110,2,40);
 sayAs(L[0],[L[1]],()=>{f[si]=1;toast(RSN3[pre][0]+'을(를) 구했어요 ('+cnt(pre,3)+'/3)','g');sync3();qCheck();save();});}
function pod3(i){const f=g3();if(f['pd'+i])return;f['pd'+i]=1;burst(hero.x,hero.y-30,'#e0b0ff',22,130,2,40);shake=Math.max(shake,2);
 const n=cnt('pd',6);toast('포자주머니를 터뜨렸어요 ('+n+'/6)','g');if(i%2===1){pop(hero.x,hero.y-70,'포자버섯이 깨어나요!','#e0b0ff');const p=R3x('D171').pods[i];spawnNear3('s3shroom',p[0],p[1],1,1);}
 sync3();qCheck();save();}
function door18(){const f=g3();if(f.door18)return;sayAs('왕성 정화사제 엘리아',['계단 돌에 정화 문양이 새겨져 있어요. 아직 희미하게 빛나요.','기둥만 다시 켜면 이 성소는 아직 살아날 수 있어요.'],()=>{f.door18=1;toast('성소 입구를 살펴봤어요','g');sync3();qCheck();save();});}
function pilPre3(i){const f=g3();if(S2.wave)return 0;for(let j=0;j<i;j++)if(!f['pil'+j]){hint3('기둥은 순서대로 켜야 해요. '+['중앙','서쪽 수로','동쪽 수로'][j]+' 기둥부터!');return 0;}return 1;}
function pillar3(i){const f=g3(),p=R3x('D181').pils[i];if(f['pil'+i]||S2.wave)return;
 waveStart2('pil'+i,p,[['s3ghost','s3lily'],['s3ghost','s3crab','s3lily']],()=>{f['pil'+i]=1;burst(tx5(p[0]),ty5(p[1])-20,'#8af0e0',24,140,2,50);const n=cnt('pil',3);
  toast('정화 기둥이 깨어났어요 ('+n+'/3)'+(n>=3?' · 수호자의 제단 문이 열렸어요':' · 둘레는 독안개가 닿지 않아요'),'g');buildLights3();sync3();qCheck();save();},'엘리아: 기둥이 깨어나면 독에 물든 것들이 몰려와요! 버텨요!');}
const TB3=[['(석판 왼쪽은 왕국 글자, 오른쪽은 마족 글자예요)','\'이 물은 두 세계가 함께 맑힌다. 남쪽의 문이 다시 숨 쉬지 않도록.\''],
 ['(정화 문양 둘레로 두 종족의 이름이 번갈아 새겨져 있어요)','\'정화의 샘은 누구의 것도 아니다. 독을 심는 자는 두 세계의 적이다.\''],
 ['(마지막 줄이 정으로 깊게 쪼아 지워져 있어요)','\'…그리고 왕실은 샘 아래의 검은…\' (뒷부분은 일부러 지워져 있어요)']];
function tablet3(i){const f=g3();if(f['tb'+i])return;sayAs('(계약 석판)',TB3[i],()=>{f['tb'+i]=1;const n=cnt('tb',3);toast('계약 석판을 살펴봤어요 ('+n+'/3)','g');sync3();
 if(n>=3)sayAs('마족 문양 해독자 루미아',['은백림 비석에서 본 것과 같은 문양이에요.','인간과 마족이 함께 이 성소를 만들었어요. …그런데 마지막 줄이 일부러 지워져 있어요.'],()=>{qCheck();save();});else{qCheck();save();}});}
function door19(){done3('door19','왕실 인장문이 열렸어요! 공기 정화 필터가 다시 돌아가요 (필터 둘레는 안전지대)');shake=Math.max(shake,3);}
const LG3=[['(실험 일지 1)','\'검은 수정을 늪 생물에 넣자 독이 열 배로 강해졌다. 생체 반응 양호.\''],['(실험 일지 2)','\'피험자 공급이 늦다. 남부 마을에서 더 데려올 것. — 책임 연구관 카르벤\''],
 ['(명령서)','\'실험을 계속하라. 결과는 왕실 기록에 남기지 말 것.\' (왕실 인장이 찍혀 있어요)'],['(마지막 일지)','\'수정이 마계 쪽 뿌리와 이어졌다. 멈춰야 한다. 그러나 명령은… 계속하라는 것이다.\'']];
function log3(i){const f=g3();if(f['lg'+i])return;sayAs(LG3[i][0],[LG3[i][1]],()=>{f['lg'+i]=1;toast('연구 기록을 읽었어요 ('+cnt('lg',4)+'/4)','g');sync3();qCheck();save();});}
function vat3(i){const f=g3();if(f['vt'+i])return;f['vt'+i]=1;burst(hero.x,hero.y-30,'#a080d0',22,130,2,40);shake=Math.max(shake,3);
 const n=cnt('vt',4);toast('흑수정 배양기를 부쉈어요 ('+n+'/4)','g');pop(hero.x,hero.y-70,'배양 촉수가 기어 나와요!','#c0a0ff');const p=R3x('D191').vats[i];spawnNear3('s3tent',p[0],p[1],1,1);sync3();qCheck();save();}
function core3(i){const f=g3();if(f['co'+i])return;f['co'+i]=1;addMat('s3blk',1);burst(hero.x,hero.y-30,'#a080d0',20,120,2,40);
 toast('파손 핵에서 흑수정 잔재 1개를 회수했어요 ('+cnt('co',2)+'/2)'+(cnt('co',2)>=2?' · 융합실 문이 열렸어요':''),'g');sync3();qCheck();save();refreshSide();}
function stone3(i){const f=g3(),p=R3x('D201').stones[i];if(f['st'+i])return;f['st'+i]=1;burst(hero.x,hero.y-40,'#9ef07a',30,160,2,60);
 toast('정화 봉인석을 되살렸어요 ('+cnt('st',3)+'/3) · 둘레는 안전지대','g');pop(hero.x,hero.y-80,'역병 사냥개가 달려와요!','#ffd0a0');spawnNear3('s3hound',p[0],p[1],2,1);buildLights3();sync3();qCheck();save();}
