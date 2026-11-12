
// ----- 조사·장치 자리 -----
{const add=o=>SP5.push(Object.assign({cd:0,z:'s2',hide:1,g5:1,g2:1,pers:1},o)),at=(x,y)=>({x:tx5(x),y:(y+1)*TS-6});
 const A=R2('D111'),B=R2('D121'),C=R2('D131'),D=R2('D141'),E=R2('D151');
 if(A&&A.camp){
  for(const [r,id] of [[A,'D111'],[B,'D121'],[C,'D131'],[D,'D141'],[E,'D151']]){
   add({k:'cam2',si:'cam'+id,r2:id,...at(r.camp[0],r.camp[1]+1),lb:'쉬기',T:.5,on:()=>{restCamp();}});
   add({k:'ret2',si:'ret'+id,r2:id,...at(r.camp[0]+2,r.camp[1]+1),lb:'🏰 왕성으로 귀환',T:.4,on:()=>{if(S2.bs&&S2.bs.on||S2.wave)return hint2('싸움 중에는 돌아갈 수 없어요');tele2(1264,39,'왕성 중앙 광장');}});
   add({k:'bn2',si:'bn'+id,r2:id,...at(r.bench[0],r.bench[1]+1),lb:id==='D151'?'봉인구 조립대 (빙월 작업대)':'빙월 작업대',T:.4,on:()=>openCraft('frost')});}
  A.wood.forEach((p,i)=>add({k:'wd',si:'wd'+i,r2:'D111',q:'Q11_03',...at(p[0],p[1]),lb:'마른 장작 줍기',T:.8,on:()=>pick2('wd'+i,'wood11')}));
  [0,1].forEach(i=>{const p=A.beacons[i];add({k:'bc11',si:'abc'+i,r2:'D111',q:'Q11_03',...at(p[0],p[1]),lb:'화로 켜기 (마른 장작 2)',T:1.2,
   pre:()=>{const lit=(f2().abc0?1:0)+(f2().abc1?1:0);if(cnt2('wood11')<(lit+1)*2){hint2('마른 장작이 '+((lit+1)*2)+'개 필요해요 (지금 '+cnt2('wood11')+'개) · 서리길 곳곳에 쌓여 있어요');return 0;}return 1;},on:()=>light2('abc'+i,'화로',2)});});
  A.scouts.forEach((p,i)=>add({k:'sc',si:'sc'+i,r2:'D111',q:'Q11_04',...at(p[0],p[1]),lb:'눈더미 살펴보기',T:1.2,on:()=>scout2(i)}));
  B.prisons.forEach((p,i)=>add({k:'pr',si:'pr'+i,r2:'D121',q:'Q12_02',...at(p[0],p[1]),lb:'얼음 감옥 깨기',T:1.4,on:()=>prison2(i)}));
  B.oil.forEach((p,i)=>add({k:'oil',si:'oil'+i,r2:'D121',q:'Q12_03',...at(p[0],p[1]),lb:'등대 기름 줍기',T:.8,on:()=>pick2('oil'+i,'oil12')}));
  B.fires.forEach((p,i)=>add({k:'fr12',si:'bfr'+i,r2:'D121',q:'Q12_03',...at(p[0],p[1]),lb:'봉화 켜기',T:1.2,on:()=>light2('bfr'+i,'봉화',3)}));
  B.wreck.forEach((p,i)=>add({k:'box',si:'box'+i,r2:'D121',q:'Q12_04',...at(p[0],p[1]),lb:'보급 상자 되찾기',T:1.0,on:()=>box2(i)}));
  C.beacons.forEach((p,i)=>add({k:'bc13',si:'cbc'+i,r2:'D131',q:'Q13_01',...at(p[0],p[1]),lb:'길잡이 깃발 세우기',T:1.2,on:()=>flag2(i)}));
  C.shrooms.forEach((p,i)=>add({k:'ms',si:'ms'+i,r2:'D131',q:'Q13_02',...at(p[0],p[1]),lb:'서리버섯 캐기',T:.9,on:()=>pick2('ms'+i,'msh13')}));
  C.deer.forEach((p,i)=>add({k:'dr',si:'dr'+i,r2:'D131',q:'Q13_03',...at(p[0],p[1]),lb:'흰사슴 풀어 주기',T:1.3,on:()=>deer2(i)}));
  C.steles.forEach((p,i)=>add({k:'sl',si:'sl'+i,r2:'D131',q:'Q13_04',...at(p[0],p[1]),lb:'옛 봉인 비석 살펴보기',T:1.2,on:()=>stele2(i)}));
  add({k:'gdev',si:'gdev14',r2:'D141',q:'Q14_01',...at(D.gdev[0],D.gdev[1]+1),lb:'성문 장치 움직이기',T:1.4,pre:()=>{if(cnt2('k_sol')<8){hint2('먼저 중앙 홀의 빙정 병사를 쓰러뜨려요 ('+cnt2('k_sol')+'/8)');return 0;}return 1;},on:()=>gate2()});
  D.devs.forEach((p,i)=>add({k:'cn',si:'cn'+i,r2:'D141',q:'Q14_02',...at(p[0],p[1]),lb:'빙결 대포 부수기',T:1.5,on:()=>cannon2(i)}));
  D.cells.forEach((p,i)=>add({k:'cl',si:'cl'+i,r2:'D141',q:'Q14_03',...at(p[0],p[1]+1),lb:'감옥 문 열기',T:1.0,pre:()=>{if(cnt2('key14')<3){hint2('감옥 열쇠 3개가 필요해요 (지금 '+cnt2('key14')+'개) · 빙정 병사와 서리 궁수가 갖고 있어요');return 0;}return 1;},on:()=>cell2(i)}));
  D.pillars.forEach((p,i)=>add({k:'pl',si:'pl'+i,r2:'D141',q:'Q14_04',...at(p[0],p[1]),lb:'룬 기둥 작동',T:1.0,pre:()=>{if(S2.wave)return 0;if(cnt2('gear14')<5){hint2('수정 톱니 5개가 필요해요 (지금 '+cnt2('gear14')+'개) · 얼음 골렘과 룬 감시구가 갖고 있어요');return 0;}return 1;},on:()=>pillar2(i)}));
  E.stones.forEach((p,i)=>add({k:'st',si:'st'+i,r2:'D151',q:'Q15_02',...at(p[0],p[1]),lb:'서리 봉인석 되살리기',T:1.5,on:()=>stone2(i)}));
  E.lp.forEach((p,i)=>add({k:'lp',si:'lp'+i,r2:'D151',...at(p[0],p[1]),lb:'화로 다시 켜기',T:.7,on:()=>{const k=S2.sk;if(!k||!k.sh||k.brz[i])return;k.brz[i]=1;burst(hero.x,hero.y-30,'#ffb060',18,110,2,40);
   const n=k.brz.filter(Boolean).length;toast('화로를 다시 켰어요 ('+n+'/3)','g');sync2();}}));
  add({k:'al15',si:'al15',r2:'D151',...at(E.altar[0],E.altar[1]+2),lb:'두 번째 봉인구 꽂기',T:1.2,on:()=>seal2()});
  add({k:'alt15',si:'alt15',r2:'D151',...at(E.altar[0],E.altar[1]+2),lb:'빙월 제단',T:.3,on:()=>altar2()});}}
function spOn2(n){if(!P||n.r2!==RGN.cur)return false;const f=f2();
 switch(n.k){case 'cam2':case 'ret2':case 'bn2':return true;
  case 'lp':return !!(S2.sk&&S2.sk.sh&&!S2.sk.brz[+n.si.slice(2)]);
  case 'al15':return !!f.sup15&&!f.seal15&&!S2.end;
  case 'alt15':return !!f.seal15&&!S2.bs&&!S2.end;
  case 'gdev':return qOn2(n.q)&&!f.gdev14;
  case 'pl':return qOn2(n.q)&&!f[n.si]&&!S2.wave;}
 if(n.q)return qOn2(n.q)&&!f[n.si];return false;}
const _spOnS2=spOn5;spOn5=function(n){if(n.g2)return spOn2(n);return _spOnS2(n);};
const _startGatherS2=startGather;startGather=function(n){if(!n)return;if(n.g2&&n.pre&&!n.pre())return;_startGatherS2(n);};
function nt2(si,nm){const n=SP5.find(n=>n.si===si);return {rid:n.r2,x:Math.floor(n.x/TS),y:Math.floor(n.y/TS),n:nm};}
const near2=(pre,cnt,nm)=>()=>{const f=f2();let best=null,bd=1e9;for(let i=0;i<cnt;i++){if(f[pre+i])continue;const n=SP5.find(n=>n.si===pre+i);if(!n)continue;const d=n.r2===RGN.cur?Math.hypot(n.x-hero.x,n.y-hero.y):1e8+i;if(d<bd){bd=d;best=n;}}
 return best?{rid:best.r2,x:Math.floor(best.x/TS),y:Math.floor(best.y/TS),n:nm}:null;};
function done2(si,msg){const f=f2();f[si]=1;burst(hero.x,hero.y-30,'#bfefff',14,100,2,30);if(msg)toast(msg,'g');buildLights2();sync2();qCheck();save();refreshSide();}
function pick2(si,k){if(f2()[si])return;f2()[si]=1;pop(hero.x,hero.y-60,'+'+IQ2[k][2],'#ffe08a');toast(IQ2[k][2]+' ('+cnt2(k)+'/'+need2(k)+')','g');sync2();qCheck();save();}
function light2(si,nm,tot){const f=f2();if(f[si])return;f[si]=1;burst(hero.x,hero.y-30,'#ffb060',18,110,2,40);const pre=si.slice(0,3);let n=0;for(let i=0;i<tot;i++)if(f[pre+i])n++;
 toast(nm+'에 불이 붙었어요 ('+n+'/'+tot+') · 불 곁에서는 얼어붙지 않아요','g');buildLights2();sync2();qCheck();save();refreshSide();}
const SC2=[['정찰병 다른','(눈더미 속에서 정찰병이 웅크리고 있어요) …발자국을 따라왔군요. 다리를 다쳐서 못 움직였어요.'],['정찰병 미르','(나무 그늘 눈더미에 정찰병이 숨어 있어요) 늑대 떼가 길을 막고 있었어요. 고마워요!'],['정찰병 하스','(얼어붙은 목도리가 보여요) …살았다. 에일린 대장님께 꼭 전해 주세요. 동쪽 길목에 커다란 뿔 짐승이 있어요.']];
function scout2(i){const f=f2();if(f['sc'+i])return;sayAs(SC2[i][0],[SC2[i][1]],()=>{f['sc'+i]=1;const n=(f.sc0?1:0)+(f.sc1?1:0)+(f.sc2?1:0);toast('실종 정찰병을 찾았어요 ('+n+'/3)','g');
 if(n>=3&&!f.abc2){f.abc2=1;toast('돌아온 정찰병들이 세 번째 화로에 불을 붙였어요','g');buildLights2();}sync2();qCheck();save();});}
function prison2(i){const f=f2();if(f['pr'+i])return;f['pr'+i]=1;burst(hero.x,hero.y-30,'#bfefff',22,130,2,40);shake=Math.max(shake,2);
 if(i===2){toast('얼음 속에 숨어 있던 얼음 고블린이 튀어나왔어요!','w');spawnNear2('s2gob',R2('D121').prisons[i][0],R2('D121').prisons[i][1],2);}
 else{const nm=['어부 토마','빵집 아이 루루','늙은 선장 오스'][i===3?2:i];sayAs(nm,[['…추워… 고마워요. 세나 선생님께 갈게요.','엄마! …아, 고마워요 기사님!','허허, 얼음 속에서 꿈을 꾼 줄 알았소. 고맙소.'][i===3?2:i]]);
  const n=(f.pr0?1:0)+(f.pr1?1:0)+(f.pr3?1:0);toast('주민을 구했어요 ('+n+'/3)','g');}
 sync2();qCheck();save();}
function box2(i){const f=f2();if(f['box'+i])return;f['box'+i]=1;burst(hero.x,hero.y-30,'#ffe08a',14,100,2,30);addMat('s2ore',1);
 toast('보급 상자를 되찾았어요 ('+((f.box0?1:0)+(f.box1?1:0)+(f.box2?1:0))+'/3) · 빙철광 1','g');sync2();qCheck();save();refreshSide();}
function flag2(i){done2('cbc'+i,'길잡이 깃발을 세웠어요 ('+[0,1,2,3].filter(j=>f2()['cbc'+j]||j===i).length+'/4) · 깃발 등불 곁은 얼어붙지 않아요');}
function deer2(i){const f=f2();if(f['dr'+i])return;f['dr'+i]=1;burst(hero.x,hero.y-30,'#ffffff',18,110,2,40);pop(hero.x,hero.y-70,'흰사슴이 숲으로 달아나요','#ffffff');
 toast('흰사슴을 풀어 줬어요 ('+((f.dr0?1:0)+(f.dr1?1:0)+(f.dr2?1:0))+'/3)','g');sync2();qCheck();save();}
const SL2=[['(비석 왼쪽에는 왕국 글자, 오른쪽에는 마족 글자가 나란히 새겨져 있어요)','\'우리 두 기사단은 이 숲에서 함께 맹세한다. 문이 다시 열리지 않도록.\''],
 ['(검 문장과 초승달 문양이 한 원 안에 함께 새겨져 있어요)','\'봉인은 둘이 함께 지킨다. 한쪽이 잊으면 봉인은 약해진다.\''],
 ['(비석 아래쪽, 마족 글자로 된 이름 줄만 정으로 쪼아 지워져 있어요)','\'…새벽 기사단, 그리고 서약의 달 기사단…\' (뒷부분은 지워져 있어요)']];
function stele2(i){const f=f2();if(f['sl'+i])return;sayAs('(옛 봉인 비석)',SL2[i],()=>{f['sl'+i]=1;const n=(f.sl0?1:0)+(f.sl1?1:0)+(f.sl2?1:0);toast('옛 봉인 비석을 살펴봤어요 ('+n+'/3)','g');sync2();
 if(n>=3)sayAs('마족 문양 해독자 루미아',['인간 글자와 마족 글자가 함께 새겨져 있어요.','두 종족이 함께 만든 봉인이에요. …그런데 마족 쪽 이름만 지워졌어요.'],()=>{qCheck();save();});else{qCheck();save();}});}
function gate2(){done2('gdev14','성문 장치가 움직였어요! 동쪽 통로의 얼음 창살이 올라가요');shake=Math.max(shake,3);}
function cannon2(i){done2('cn'+i,'빙결 대포를 부쉈어요 ('+[0,1,2].filter(j=>f2()['cn'+j]||j===i).length+'/3)');shake=Math.max(shake,3);}
const CL2=['포로 기사 한스','서리항 어부 벤','정찰병 로와','북부 상인 미카'];
function cell2(i){const f=f2();if(f['cl'+i])return;f['cl'+i]=1;burst(hero.x,hero.y-30,'#ffe08a',16,100,2,30);sayAs(CL2[i],['…살았다. 세나 선생님이 앞마당에 있대요? 고맙습니다.']);
 toast('포로를 구했어요 ('+((f.cl0?1:0)+(f.cl1?1:0)+(f.cl2?1:0)+(f.cl3?1:0))+'/4)','g');sync2();qCheck();save();}
function pillar2(i){const f=f2(),p=R2('D141').pillars[i];if(f['pl'+i]||S2.wave)return;
 waveStart2('pl'+i,p,[['s2golem','s2orb','s2sol'],['s2golem','s2orb','s2sol','s2arch']],()=>{f['pl'+i]=1;burst(tx5(p[0]),ty5(p[1])-20,'#8ad0ff',24,140,2,50);const n=(f.pl0?1:0)+(f.pl1?1:0)+(f.pl2?1:0);
  toast('룬 기둥이 깨어났어요 ('+n+'/3)'+(n>=3?' · 기사장의 문이 열렸어요':''),'g');buildLights2();sync2();qCheck();save();},'브룸: 기둥이 돌기 시작하면 지키는 놈들이 몰려올 거야! 버텨!');}
function stone2(i){const f=f2(),p=R2('D151').stones[i];if(f['st'+i])return;f['st'+i]=1;burst(hero.x,hero.y-40,'#a0e0ff',30,160,2,60);
 const n=(f.st0?1:0)+(f.st1?1:0)+(f.st2?1:0);toast('서리 봉인석의 문양을 다시 이었어요 ('+n+'/3)','g');pop(hero.x,hero.y-80,'마계 설표가 달려와요!','#ffd0a0');spawnNear2('s2leo',p[0],p[1],2);sync2();qCheck();save();}
