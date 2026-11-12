/* =====================================================================
   시즌 2 '얼어붙은 맹세' (11~15장 · Lv51~55)
   기획: 사용자 기획서 「시즌2_얼어붙은_맹세_전체기획」 (장 제목·지역·퀘스트·NPC·몬스터는 기획서 우선)
   지도: gen_maps.py (D111 왕성 북문·서리길 · D121 서리항 · D131 은백림 · D141 빙정성채 · D151 빙월협곡)
   - 시즌 1 방식(LINK5·SP5·FAC31·자동 퀘스트)을 그대로 써요. 시즌 2 상태는 P.f2 한 곳에만 저장 (기존 저장은 그대로).
   - 새 재료 5개: s2herb 설빙초 · s2ore 빙철광 · s2wood 서리나무 · s2aur 오로라 결정 · s2core 세르카의 빙월핵
   - 퀘스트 물건(마른 장작·등대 기름·서리버섯·감옥 열쇠·수정 톱니)은 가방 재료가 아니라 퀘스트 숫자로만 세요.
   - 새 화폐·새 강화주문서 없음. 장비는 기존 제작·분해·강화·랜덤 옵션 그대로.
   ===================================================================== */
const S2ID=['D111','D121','D131','D141','D151'];
const in2=()=>!!(RGN.cur&&S2ID.includes(RGN.cur));
const s2Open=()=>!!(P&&(P.ch10||(P.f10&&P.f10.seal)));
RLOCK.s2=()=>s2Open();
const f2=()=>{P.f2=P.f2||{};return P.f2;};
const S2={tg:[],pend:null,fin:null,qt:0,msgT:0,dead:0,ckpt:null,safeT:0,coldT:4,slowT:0,lx:0,ly:0,vx:0,vy:0,wave:null,bs:null,hidT:0,memCd:0,dyn:[],end:0,bar:0,cn:[0,0,0],sk:null};
window.S2=S2;
const RN2={D111:'왕성 북문 · 서리길',D121:'서리항',D131:'은백림',D141:'빙정성채',D151:'빙월협곡 · 두 번째 마계문'};
Object.assign(RGNM5,RN2);
Object.assign(DARK5,{D111:0,D121:0,D131:.06,D141:.2,D151:.24});
const hint2=m=>{if(performance.now()-S2.msgT>2500){S2.msgT=performance.now();toast(m,'w');}};
const R2=id=>reg5(id);
const ICE2=new Set(S2ICE);
const onIce2=(x,y)=>{const r=MAP.g[Math.floor(y/TS)];const c=r&&r[Math.floor(x/TS)];return !!(c&&ICE2.has(c[0]));};
const qOn2=id=>!!(P&&P.q&&qId()===id&&P.q.st==='go');
const qPast2=id=>{const i=QUESTS.findIndex(q=>q.id===id);return !!(P&&P.q&&i>=0&&P.q.i>i);};

// ----- 재료 (5개) -----
const F2MAT=['s2herb','s2ore','s2wood','s2aur','s2core'];
const F2ONLY=F2MAT.slice();
Object.assign(MAT,{s2herb:{n:'설빙초',c:'#d8f0ff'},s2ore:{n:'빙철광',c:'#8ab4e0'},s2wood:{n:'서리나무',c:'#b8c8d8'},s2aur:{n:'오로라 결정',c:'#8affd8'},s2core:{n:'세르카의 빙월핵',c:'#c0b0ff'}});
Object.assign(LIFE_OF,{s2herb:'gather',s2ore:'mine',s2wood:'wood',s2aur:'gather'});
{const M=k=>NODEPIX[k]&&NODEPIX[k].m;const D={s2herb:['herb',{g:'#5a8aa0',G:'#a8d8e8',f:'#ffffff',F:'#d8f0ff',k:'#183040',r:'#e8f8ff',y:'#ffffff',p:'#c8e8ff',w:'#ffffff'}],
  s2wood:['wood',{k:'#28303a',b:'#5a6878',B:'#98a8b8',w:'#3a4450',W:'#e8f4ff',g:'#6a7888',G:'#b8c8d8'}],s2ore:['silver',{k:'#101828',S:'#8ab4e0',s:'#3a5a88',a:'#d8f0ff'}],
  s2aur:['kshard',{k:'#06302a',a:'#2ab090',A:'#8affd8',h:'#ffffff'}],s2core:['durcore',{k:'#181040',a:'#6050c0',A:'#c0b0ff',h:'#ffffff'}]};
 for(const k in D){const [t,p]=D[k],m=M(t);if(!m)continue;NODEPIX[k]={p,m};const c=document.createElement('canvas');c.width=c.height=12;const g=c.getContext('2d');
  m.forEach((row,y)=>[...row].forEach((ch,x)=>{if(p[ch]){g.fillStyle=p[ch];g.fillRect(x,y,1,1);}}));NODEIMG[k]=c;}}
const ROLE2={s2herb:'눈 속에서 자라는 약초 · 서리길·서리항·은백림에서 채집',s2ore:'얼음이 밴 쇠 · 서리항·은백림·빙정성채에서 채광',s2wood:'얼어도 부러지지 않는 나무 · 서리길·은백림에서 벌목',
 s2aur:'얼음 속에 갇힌 빛 · 빙정성채·빙월협곡에서 채집 · 정예와 보스가 떨어뜨려요',s2core:'세르카를 봉인한 뒤 남은 힘 (빙월 장신구 제작)'};

// ----- 몬스터 (그림: gen_mobs2.py — 기존 LPC 조합을 얼음빛으로 다시 칠한 임시 그림) -----
(function(){const B={s2m_rat:'mon_mouse',s2m_crow:'cre_bat',s2m_wolf:'mon_swolf',s2m_horn:'cre_tboar',s2m_gob:'mon_gminer',s2m_crab:'cre_spider',s2m_jelly:'cre_ghost',s2m_brak:'mon_warden8',
  s2m_spider:'cre_spider',s2m_shroom:'cre_mushm',s2m_swolf:'mon_hound9',s2m_moth:'cre_dmoth',s2m_arbos:'boss_tree',s2m_sol:'mon_wknight',s2m_arch:'mon_smugA',s2m_golem:'cre_rgolem',s2m_orb:'cre_eyeball',
  s2m_leorn:'n9cmd',s2m_leo:'mon_swolf',s2m_mk:'mon_royal10',s2m_sham:'mon_shaman9',s2m_shard:'cre_cworm',s2m_serka:'mon_versh',s2m_shadow:'mon_royal10',
  s2n_eil:'n7inf',s2n_noah:'kid',s2n_broom:'smith',s2n_sena:'priest',s2n_lum:'n10ner'};
 for(const k in B){IMG[k]=new Image();IMG[k].src='m/'+k+'.png';SMETA[k]=Object.assign({},SMETA[B[k]]||{a:'slash',n:6,c:128});}})();
const MB2=(id,n,lv,hp,atk,sp,ex,spr,o)=>Object.assign({n,lv,hp,atk,sp,ex,g:[Math.round(ex*.17),Math.round(ex*.24)],ag:1,spr,id,flt:'none'},o||{});
Object.assign(MOB,{
 s2rat:MB2('s2rat','서리쥐',51,2000,860,46,400,'s2m_rat'),
 s2crow:MB2('s2crow','얼음까마귀',51,1800,880,60,400,'s2m_crow'),
 s2wolf:MB2('s2wolf','설원 늑대',51,2300,900,56,430,'s2m_wolf',{leap:1}),
 s2horn:MB2('s2horn','서리뿔 우두머리',51,24000,1650,34,4000,'s2m_horn',{boss:1,sc:1.5,oy:34,g:[500,700]}),
 s2gob:MB2('s2gob','얼음 고블린',52,2500,940,42,440,'s2m_gob'),
 s2crab:MB2('s2crab','서리 집게게',52,2900,920,32,450,'s2m_crab'),
 s2jelly:MB2('s2jelly','빙결 해파리',52,2200,960,36,450,'s2m_jelly',{range:150,shot:'bolt',ssp:250}),
 s2brak:MB2('s2brak','빙결 항만장 브라크',52,34000,1900,30,6000,'s2m_brak',{boss:1,sc:1.45,oy:36,g:[900,1200]}),
 s2spider:MB2('s2spider','빙정거미',53,2600,1000,48,470,'s2m_spider'),
 s2shroom:MB2('s2shroom','서리버섯',53,3000,980,30,470,'s2m_shroom'),
 s2swolf:MB2('s2swolf','눈그림자 늑대',53,2700,1020,58,480,'s2m_swolf',{leap:1}),
 s2moth:MB2('s2moth','얼음나방',53,2300,1010,50,470,'s2m_moth',{range:140,shot:'bolt',ssp:240}),
 s2arbos:MB2('s2arbos','서리뿌리 고목 아르보스',53,40000,2050,24,7000,'s2m_arbos',{boss:1,sc:1.7,oy:40,g:[1000,1300]}),
 s2sol:MB2('s2sol','빙정 병사',54,3400,1080,38,500,'s2m_sol'),
 s2arch:MB2('s2arch','서리 궁수',54,2800,1090,36,500,'s2m_arch',{range:170,shot:'arrow',ssp:300}),
 s2golem:MB2('s2golem','얼음 골렘',54,4200,1060,26,520,'s2m_golem'),
 s2orb:MB2('s2orb','룬 감시구',54,2600,1100,40,510,'s2m_orb',{range:160,shot:'bolt',ssp:270}),
 s2leorn:MB2('s2leorn','빙정 기사장 레오른',54,46000,2150,30,8000,'s2m_leorn',{boss:1,sc:1.5,oy:40,g:[1100,1400]}),
 s2leo:MB2('s2leo','마계 설표',55,3200,1130,60,520,'s2m_leo',{leap:1}),
 s2mk:MB2('s2mk','빙월 기사',55,3800,1150,38,540,'s2m_mk'),
 s2sham:MB2('s2sham','서리 주술사',55,3000,1160,34,540,'s2m_sham',{range:150,shot:'bolt',ssp:260}),
 s2shard:MB2('s2shard','얼음 파편체',55,3300,1120,40,520,'s2m_shard'),
 serka:MB2('serka','빙월사도 세르카',55,84000,2500,30,0,'s2m_serka',{boss:1,sc:1.55,oy:44,g:[0,0]}),
 s2shadow:MB2('s2shadow','빙월의 그림자',55,22000,1900,40,3600,'s2m_shadow',{elite:1,sc:1.35,oy:30,g:[600,800]})});
const ID2=['s2rat','s2crow','s2wolf','s2gob','s2crab','s2jelly','s2spider','s2shroom','s2swolf','s2moth','s2sol','s2arch','s2golem','s2orb','s2leo','s2mk','s2sham','s2shard'];
for(const k of ID2.concat(['s2horn','s2brak','s2arbos','s2leorn','serka','s2shadow']))MOB[k].atk0=MOB[k].atk;

// ----- 장비: 빙월 무기 4 · 빙월 방어구 5부위 · 장신구 2 (기존 제작·분해·강화·랜덤 옵션 그대로) -----
// 기준: 시즌 1 마지막 제작 장비(k9_sword 76 등)보다 약 13% 높아요. 일반 등급(90%)은 시즌 1 전설(125%)보다 약해요.
const S2TC=['s2',200,.6,.42];
const S2G=[['s2_sword','w_longsword','빙철 장검','weapon',{atk:86},['warrior'],{s2ore:6,s2wood:3,s2aur:2},3600],
 ['s2_dagger','w_dagger','빙철 단검','weapon',{atk:79,crit:10},['rogue'],{s2ore:5,s2herb:3,s2aur:2},3600],
 ['s2_bow','w_bow','서리나무 장궁','weapon',{atk:82},['rogue'],{s2wood:6,s2herb:3,s2aur:2},3600],
 ['s2_staff','w_diamondR','오로라 지팡이','weapon',{atk:85},['mage'],{s2wood:5,s2aur:4,s2herb:2},3600],
 ['s2_helm','hat_helmet_greathelm','빙월 투구','head',{def:36,hp:170},[],{s2ore:4,s2herb:2,s2aur:1},3200],
 ['s2_armor','torso_armour_plate','빙월 갑옷','armor',{def:72,hp:520},[],{s2ore:8,s2wood:3,s2aur:3},4800],
 ['s2_legs','legs_armour','빙월 다리갑','legs',{def:30,hp:150},[],{s2ore:4,s2wood:2,s2aur:1},3000],
 ['s2_boots','feet_armour','빙월 장화','feet',{def:22,hp:110},[],{s2ore:3,s2herb:3,s2aur:1},2800],
 ['s2_glove','arms_armour','빙월 장갑','arm',{def:20,hp:90},[],{s2ore:3,s2wood:2,s2aur:1},2800],
 ['s2_neck','neck_necklace_chain','빙월핵 목걸이','neck',{atk:12,hp:170},[],{s2aur:4,s2herb:3,s2core:1},3600],
 ['s2_ring','facial_earrings_princess','빙월핵 귀걸이','ring',{atk:12,def:16,hp:160},[],{s2aur:4,s2ore:2,s2core:1},3600]];
for(const [k,src,n,s,st,cls] of S2G){const b=GEAR[src];if(!b||GEAR[k])continue;GEAR[k]=Object.assign({},b,{n,s,t:5,src,tc:S2TC,cls,d1:1,def:0,atk:0,hp:0},st);if(s==='ring'||s==='neck')GEAR[k].z=[];}
RANGED.s2_bow='arrow';RANGED.s2_staff='magic';CW.warrior.push('s2_sword');CW.rogue.push('s2_dagger','s2_bow');CW.mage.push('s2_staff');
SET104.push({id:'s2',n:'빙월 세트',g:[['s2_sword','s2_dagger','s2_bow','s2_staff'],['s2_helm'],['s2_armor'],['s2_legs'],['s2_boots'],['s2_glove']],
 b:[[2,{hp:6},'최대 체력 +6%'],[4,{def:7},'방어 +7%'],[6,{atk:9,crit:5},'공격 +9% · 치명타 +5%']]});
// 두 번째 봉인구: 가방 재료가 아니라 이야기 물건 (만들면 P.f2.core15 만 기록)
Object.assign(POT,{s2seal:{n:'두 번째 봉인구',spec:'s2seal',p:0,c:'#a0e0ff',craft:1,ico:'🔷'}});
const R2SEAL={s2herb:3,s2ore:2,s2aur:2},R2SEALG=150;
const FROSTNOTE='설빙초·서리나무는 서리길과 은백림에서, 빙철광은 서리항과 빙정성채에서, 오로라 결정은 빙정성채·빙월협곡과 정예·보스에게서 얻어요. 빙철 장비는 서리항 대장장이 브룸의 보급품을 되찾으면 열려요. 세르카의 빙월핵은 두 번째 문을 봉인하면 받고, 빙월핵 장신구에 써요. 새 화폐나 새 주문서는 없어요 — 강화는 지금 쓰는 공용 주문서 그대로예요.';
function frostRec(){const f=f2(),L=[];
 if(!f.core15&&qPast2('Q15_03'))L.push(['s2seal',R2SEAL,R2SEALG]);
 L.push(['pot_sup',{s2herb:3,herb:2},0]);
 if(f.smith12||P.ch12)for(const [k,,,s,,cls,need,gold] of S2G){if(!GEAR[k]||(cls.length&&!cls.includes(P.cls)))continue;if((s==='neck'||s==='ring')&&!f.seal15)continue;L.push([k,need,gold]);}
 return L;}
const _craftS2=craft;craft=function(k,need,gold){
 if(k==='s2seal'){const f=f2();if(f.core15)return;if(!Object.entries(need).every(([m,n])=>matN(m)>=n)||P.gold<gold){toast('재료나 골드가 모자라요','w');return;}
  for(const [m,n] of Object.entries(need))P.mat[m]-=n;P.gold-=gold;f.core15=1;log('두 번째 봉인구를 만들었어요!','g');pop(hero.x,hero.y-60,'제작 성공!','#a0e0ff');burst(hero.x,hero.y-40,'#a0e0ff',20,120,2,40);lifeXp('smith',60);qCheck();save();refreshSide();try{drawCraft();}catch(e){}return;}
 _craftS2(k,need,gold);};
const _statTxtS2=statTxt;statTxt=function(k){if(k==='s2seal')return '얼음의 역류를 견디는 봉인구 · 빙월 제단 가운데에 꽂아 두 번째 문을 닫아요 (이야기 물건 · 한 번만 만들어요)';if(ROLE2[k])return ROLE2[k];return _statTxtS2(k);};
