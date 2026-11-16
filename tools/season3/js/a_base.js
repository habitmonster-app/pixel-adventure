/* =====================================================================
   시즌 3 '독뿌리의 세 번째 문' (16~20장 · Lv56~60 · 레벨 한계 60)
   기획: 사용자 기획서 「시즌3_16-20장_완성기획서」(틀) + 빈 곳은 Claude가 정함
   지도: gen_maps3.py (D161 흑수늪 입구 · D171 독버섯 숲 · D181 침수 정화성소 · D191 폐쇄 왕실 연구소 · D201 독뿌리 심장부)
   - 시즌 2 방식(LINK5·SP5·FAC31·자동 퀘스트·S2 예고 바닥 표시)을 그대로 써요.
   - 시즌 3 상태는 P.g3 한 곳에만 저장 (기존 저장은 그대로). 기록은 P.s3, 장 끝 표시는 P.ch16~P.ch20.
   - 이 파일 묶음은 통째로 (function(){ … })() 안에 들어가요 (예전 3장 이름 S3·f3·R3 등과 겹치지 않게).
   - 새 재료 6개: s3leaf 정화잎 · s3cry 정화수정 · s3blk 흑수정 잔재 · s3iron 늪철 · s3spore 독버섯 포자 · s3core 모르가의 역병핵
   - 해독제는 기존 '해독제'(pot_cure) 그대로. 새 화폐·새 강화주문서 없음.
   ===================================================================== */
const S3ID=['D161','D171','D181','D191','D201'];
const in3=()=>!!(RGN.cur&&S3ID.includes(RGN.cur));
const s3Open=()=>!!(P&&P.f2&&P.f2.seal15);
RLOCK.s3=()=>s3Open();
const g3=()=>{P.g3=P.g3||{};return P.g3;};
const G3={pend:null,fin:null,qt:0,msgT:0,dead:0,ckpt:null,safeT:0,fogT:4,bs:null,mk:null,hidT:0,memCd:0,dyn:[],end:0,talking:0,gd:{},app:0,cureU:0};
window.SS3=G3;
const RN3={D161:'흑수늪 입구',D171:'독버섯 숲',D181:'침수 정화성소',D191:'폐쇄 왕실 연구소',D201:'독뿌리 심장부 · 세 번째 마계문'};
Object.assign(RGNM5,RN3);
Object.assign(DARK5,{D161:.08,D171:.14,D181:.18,D191:.22,D201:.26});
const hint3=m=>{if(performance.now()-G3.msgT>2500){G3.msgT=performance.now();toast(m,'w');}};
const R3x=id=>reg5(id);
const qOn3=id=>!!(P&&P.q&&qId()===id&&P.q.st==='go');
const qPast3=id=>{const i=QUESTS.findIndex(q=>q.id===id);return !!(P&&P.q&&i>=0&&P.q.i>i);};
const cnt=(pre,n)=>{const f=g3();let c=0;for(let i=0;i<n;i++)if(f[pre+i])c++;return c;};

// ----- 레벨 한계: 시즌 3가 열리면 55 → 60 (한 번 알림) -----
function capSync3(){if(!P)return;const c=s3Open()?60:55;if(LVCAP!==c)LVCAP=c;if(c===60&&!g3().cap60){g3().cap60=1;setTimeout(()=>toast('시즌 3가 열려 최고 레벨이 60으로 늘었어요!','g'),1500);save();}}

// ----- 재료 (6개) -----
const S3MAT=['s3leaf','s3cry','s3blk','s3iron','s3spore','s3core'];
window.S3MAT=S3MAT;
Object.assign(MAT,{s3leaf:{n:'정화잎',c:'#9ef07a'},s3cry:{n:'정화수정',c:'#8af0e0'},s3blk:{n:'흑수정 잔재',c:'#a080d0'},s3iron:{n:'늪철',c:'#7a9a80'},s3spore:{n:'독버섯 포자',c:'#d080f0'},s3core:{n:'모르가의 역병핵',c:'#80e060'}});
Object.assign(LIFE_OF,{s3leaf:'gather',s3cry:'mine',s3iron:'mine'});
{const M=k=>NODEPIX[k]&&NODEPIX[k].m;const D={s3leaf:['herb',{g:'#2a7a3a',G:'#7ad070',f:'#d8ffb0',F:'#9ef07a',k:'#0a2a10',r:'#c8ff9a',y:'#ffffff',p:'#b0f090',w:'#ffffff'}],
  s3cry:['kshard',{k:'#063a34',a:'#2ab0a0',A:'#8af0e0',h:'#ffffff'}],s3iron:['silver',{k:'#0a1810',S:'#7a9a80',s:'#3a5a44',a:'#c8e0c8'}],
  s3blk:['durcore',{k:'#100820',a:'#503080',A:'#a080d0',h:'#e0d0ff'}],s3spore:['kshard',{k:'#2a0a3a',a:'#8a40b0',A:'#d080f0',h:'#ffe0ff'}],s3core:['durcore',{k:'#0a2008',a:'#3a8a2a',A:'#80e060',h:'#e0ffd0'}]};
 for(const k in D){const [t,p]=D[k],m=M(t);if(!m)continue;NODEPIX[k]={p,m};const c=document.createElement('canvas');c.width=c.height=12;const g=c.getContext('2d');
  m.forEach((row,y)=>[...row].forEach((ch,x)=>{if(p[ch]){g.fillStyle=p[ch];g.fillRect(x,y,1,1);}}));NODEIMG[k]=c;}}
const ROLE3={s3leaf:'초록빛 정화잎 · 흑수늪·독버섯 숲에서 채집 · 해독제와 정화 장비 재료',s3cry:'맑은 정화수정 · 침수 정화성소 수정맥에서 채광 · 연구소·심장부에도 조금',
 s3blk:'검은 수정 조각 · 크라그와 연구소 배양기·파손 핵에서 얻어요 · 연구소 몬스터가 가끔 떨어뜨려요',s3iron:'녹슬지 않는 늪철 · 독버섯 숲 광맥·성소 수몰 광맥에서 채광',
 s3spore:'포자여왕 미셀라의 포자 · 미셀라·숲 몬스터·숨은 정예에게서 얻어요',s3core:'모르가를 봉인한 뒤 남은 힘 (역병핵 반지 제작)'};

// ----- 몬스터 (그림: gen_mobs3.py — 기존 LPC 조합을 독빛으로 다시 칠한 임시 그림) -----
(function(){const B={s3m_slime:'mon_rslime',s3m_mosq:'cre_bee',s3m_liz:'lizard',s3m_worm:'cre_vinem',s3m_shroom:'cre_mushm',s3m_turt:'cre_tboar',s3m_moth:'cre_dmoth',s3m_wolf:'mon_swolf',
  s3m_lily:'cre_ghost',s3m_crab:'cre_spider',s3m_ghost:'mon_wraith',s3m_snake:'cre_snake',s3m_exp:'mon_troll',s3m_sol:'mon_wknight',s3m_tent:'cre_big_worm',s3m_eye:'cre_eyeball',
  s3m_hound:'mon_hound9',s3m_knight:'mon_royal10',s3m_sham:'mon_shaman9',s3m_spore:'cre_ghost',s3m_krag:'lizard',s3m_mic:'cre_mushm',s3m_beld:'boss_rgolem',s3m_varg:'boss_vcolos',
  s3m_morga:'mon_versh',s3m_zark:'cre_spider',s3n_maren:'n7inf',s3n_elia:'priest',s3n_harin:'herb',s3n_urban:'n8tech'};
 for(const k in B){IMG[k]=new Image();IMG[k].src='m/'+k+'.png';SMETA[k]=Object.assign({},SMETA[B[k]]||{a:'slash',n:6,c:128});}})();
const MB3=(id,n,lv,hp,atk,sp,ex,spr,o)=>Object.assign({n,lv,hp,atk,sp,ex,g:[Math.round(ex*.17),Math.round(ex*.24)],ag:1,spr,id,flt:'none'},o||{});
Object.assign(MOB,{
 s3slime:MB3('s3slime','독진흙 슬라임',56,3600,1180,34,560,'s3m_slime',{psn:.15}),
 s3mosq:MB3('s3mosq','검은늪 모기',56,3100,1210,60,560,'s3m_mosq',{psn:.15}),
 s3liz:MB3('s3liz','독이빨 도마뱀',56,3500,1230,52,580,'s3m_liz',{leap:1}),
 s3worm:MB3('s3worm','부패 덩굴벌레',56,3300,1200,30,570,'s3m_worm',{range:150,shot:'bolt',ssp:240,psn:.12}),
 s3krag:MB3('s3krag','맹독 늪지기 크라그',56,52000,2250,32,9000,'s3m_krag',{boss:1,sc:1.6,oy:34,g:[1200,1500]}),
 s3shroom:MB3('s3shroom','포자버섯',57,3900,1220,30,590,'s3m_shroom',{psn:.15}),
 s3turt:MB3('s3turt','독등껍질 거북',57,4400,1200,26,600,'s3m_turt'),
 s3moth:MB3('s3moth','포자나방',57,3300,1250,50,590,'s3m_moth',{range:140,shot:'bolt',ssp:240,psn:.12}),
 s3wolf:MB3('s3wolf','균사 늑대',57,3700,1270,58,600,'s3m_wolf',{leap:1}),
 s3mic:MB3('s3mic','포자여왕 미셀라',57,58000,2350,24,10000,'s3m_mic',{boss:1,sc:1.7,oy:40,g:[1300,1600]}),
 s3lily:MB3('s3lily','독수련 정령',58,3600,1290,36,620,'s3m_lily',{range:150,shot:'bolt',ssp:250,psn:.12}),
 s3crab:MB3('s3crab','침수 갑각충',58,4500,1260,32,630,'s3m_crab'),
 s3ghost:MB3('s3ghost','부패 사제 잔영',58,3800,1300,40,620,'s3m_ghost',{range:150,shot:'bolt',ssp:260,psn:.1}),
 s3snake:MB3('s3snake','독수로 뱀',58,3700,1310,58,630,'s3m_snake',{psn:.18}),
 s3beld:MB3('s3beld','부패 수호상 벨드락',58,64000,2450,24,11000,'s3m_beld',{boss:1,sc:1.5,oy:40,g:[1400,1700]}),
 s3exp:MB3('s3exp','독성 실험체',59,4700,1320,36,650,'s3m_exp',{psn:.12}),
 s3sol:MB3('s3sol','흑수정 감염병사',59,4300,1340,38,650,'s3m_sol'),
 s3tent:MB3('s3tent','배양 촉수',59,4000,1330,28,640,'s3m_tent',{psn:.15}),
 s3eye:MB3('s3eye','실험소 감시구',59,3600,1350,40,650,'s3m_eye',{range:160,shot:'bolt',ssp:270}),
 s3varg:MB3('s3varg','흑수정 융합체 바르곤',59,70000,2550,28,12000,'s3m_varg',{boss:1,sc:1.5,oy:42,g:[1500,1800]}),
 s3hound:MB3('s3hound','역병 사냥개',60,4300,1370,60,680,'s3m_hound',{leap:1,psn:.15}),
 s3knight:MB3('s3knight','독뿌리 기사',60,5000,1380,38,690,'s3m_knight'),
 s3sham:MB3('s3sham','부패 주술사',60,4000,1400,34,690,'s3m_sham',{range:150,shot:'bolt',ssp:260,psn:.15}),
 s3spore:MB3('s3spore','역병 포자체',60,3800,1360,40,670,'s3m_spore',{range:150,shot:'bolt',ssp:240,psn:.15}),
 morga:MB3('morga','역병사도 모르가',60,96000,2700,30,0,'s3m_morga',{boss:1,sc:1.55,oy:44,g:[0,0]}),
 s3zark:MB3('s3zark','독뿌리 포식자 자르칸',60,26000,2000,46,4200,'s3m_zark',{elite:1,sc:1.45,oy:30,g:[700,900]})});
const ID3=['s3slime','s3mosq','s3liz','s3worm','s3shroom','s3turt','s3moth','s3wolf','s3lily','s3crab','s3ghost','s3snake','s3exp','s3sol','s3tent','s3eye','s3hound','s3knight','s3sham','s3spore'];
const BID3=['s3krag','s3mic','s3beld','s3varg','morga','s3zark'];
for(const k of ID3.concat(BID3))MOB[k].atk0=MOB[k].atk;

// ----- 장비: 정화 무기 4 · 독뿌리 수호 방어구 5부위 · 장신구 2 (기존 제작·분해·강화·랜덤 옵션 그대로) -----
// 기준: 시즌 2 빙월 장비보다 약 13% 높아요. 능력치는 고정, 품질·랜덤 옵션만 기존 규칙.
const S3TC=['s3',220,.6,.42];
const S3G=[['s3_sword','w_glowsword','정화대검','weapon',{atk:97},['warrior'],{s3iron:4,s3leaf:2},4200,'ch17'],
 ['s3_dagger','w_dagger','독월 단검','weapon',{atk:89,crit:10},['rogue'],{s3iron:3,s3spore:1},4200,'ch17'],
 ['s3_bow','w_bowD','늪사냥 활','weapon',{atk:93},['rogue'],{s3iron:2,s3leaf:4},4200,'ch17'],
 ['s3_staff','w_crystal','정화수정 지팡이','weapon',{atk:96},['mage'],{s3cry:3,s3leaf:2},4200,'ch18'],
 ['s3_helm','hat_helmet_close','독뿌리 수호투구','head',{def:41,hp:190},[],{s3iron:2,s3leaf:2},3600,'ch18'],
 ['s3_armor','torso_armour_plate','독뿌리 수호갑옷','armor',{def:81,hp:590},[],{s3iron:4,s3cry:1},5000,'ch18'],
 ['s3_legs','legs_armour','독뿌리 수호하의','legs',{def:34,hp:170},[],{s3iron:3,s3cry:1},3400,'ch19'],
 ['s3_boots','feet_armour','독뿌리 수호장화','feet',{def:25,hp:125},[],{s3iron:2,s3blk:1},3200,'ch19'],
 ['s3_glove','arms_armour','독뿌리 수호장갑','arm',{def:23,hp:100},[],{s3iron:2,s3leaf:2},3200,'ch19'],
 ['s3_neck','neck_necklace_beaded_large','포자 정화 목걸이','neck',{atk:13,hp:190},[],{s3spore:1,s3cry:2},4000,'ch19'],
 ['s3_ring','facial_earrings_emerald','역병핵 반지','ring',{atk:14,def:18,hp:180},[],{s3core:1,s3cry:2},4000,'end']];
for(const [k,src,n,s,st,cls] of S3G){const b=GEAR[src];if(!b||GEAR[k])continue;GEAR[k]=Object.assign({},b,{n,s,t:5,src,tc:S3TC,cls,d1:1,def:0,atk:0,hp:0},st);if(s==='ring'||s==='neck')GEAR[k].z=[];}
RANGED.s3_bow='arrow';RANGED.s3_staff='magic';CW.warrior.push('s3_sword');CW.rogue.push('s3_dagger','s3_bow');CW.mage.push('s3_staff');
// 세트: 방어구 5부위 + 포자 정화 목걸이 = 6부위 (반지는 세트 밖)
// 2세트: 독 지속시간 -20% · 4세트: 최대 체력 +7% · 방어 +7% · 6세트: 해독 직후 6초 동안 공격 +12%
SET104.push({id:'s3',n:'독뿌리 정화 세트',g:[['s3_helm'],['s3_armor'],['s3_legs'],['s3_boots'],['s3_glove'],['s3_neck']],
 b:[[2,{psn3:20},'독 지속시간 -20%'],[4,{hp:7,def:7},'최대 체력 +7% · 방어 +7%'],[6,{cure3:12},'해독 직후 6초 동안 공격 +12%']]});
// 목걸이 기본 독 저항 15% + 세트 독 저항 · 해독 직후 공격 (기존 능력치 계산 뒤에 더해요)
{const eqB=c=>{const L=[];if(!c||!c.eq)return L;for(const s in c.eq){const k=c.eq[s],r=(typeof INST81!=='undefined'&&INST81[k])||(c.inv&&c.inv[k]);L.push(r&&r.b?r.b:k);}return L;};
 const _so=statsOf;statsOf=function(c){const s=_so.apply(this,arguments);try{if(!s||!c)return s;const sf=setFx104(c);let p=(sf.psn3|0);if(eqB(c).includes('s3_neck'))p+=15;if(p)s.psn=(s.psn||0)+p;
  if(sf.cure3&&c===P&&G3.cureU>now())s.atk=Math.round(s.atk*(1+sf.cure3/100));}catch(e){}return s;};}
// 세 번째 봉인구: 가방 재료가 아니라 이야기 물건 (만들면 P.g3.core20 만 기록)
Object.assign(POT,{s3seal:{n:'세 번째 봉인구',spec:'s3seal',p:0,c:'#9ef07a',craft:1,ico:'🟢'},s3cure3:{n:'해독제 3개',spec:'s3cure3',p:0,c:'#9be04a',craft:1,ico:'🧪'}});
const R3SEAL={s3cry:2,s3blk:2,s3iron:2,s3spore:1},R3SEALG=200;
const PLAGUENOTE='정화잎은 흑수늪·독버섯 숲에서, 늪철은 독버섯 숲 광맥과 성소 남쪽 수로에서, 정화수정은 성소 북서 수정맥에서 얻어요. 흑수정 잔재는 크라그·연구소 배양기·파손 핵과 연구소 몬스터에게서, 독버섯 포자는 미셀라와 숲 몬스터에게서 나와요. 퀘스트에 필요한 재료는 퀘스트 숫자로 따로 세니, 만들기에 써도 이야기가 막히지 않아요. 새 화폐나 새 주문서는 없어요.';
window.PLAGUENOTE=PLAGUENOTE;
const unl3=w=>w==='end'?!!g3().seal20:!!(P[w]);
function plagueRec(){const f=g3(),L=[];
 if(!f.core20&&qPast3('Q20_03'))L.push(['s3seal',R3SEAL,R3SEALG]);
 if(P.ch16||f.boss16)L.push(['s3cure3',{herb:2,s3leaf:1},0]);
 for(const [k,,,s,,cls,need,gold,w] of S3G){if(!GEAR[k]||(cls.length&&!cls.includes(P.cls)))continue;if(!unl3(w))continue;L.push([k,need,gold]);}
 return L;}
window.plagueRec=plagueRec;
const _craftS3=craft;craft=function(k,need,gold){
 if(k==='s3seal'||k==='s3cure3'){const f=g3();if(k==='s3seal'&&f.core20)return;if(!Object.entries(need).every(([m,n])=>matN(m)>=n)||P.gold<gold){toast('재료나 골드가 모자라요','w');return;}
  for(const [m,n] of Object.entries(need))P.mat[m]-=n;P.gold-=gold;
  if(k==='s3cure3'){P.pot=P.pot||{};P.pot.pot_cure=(P.pot.pot_cure|0)+3;log('해독제 3개를 만들었어요!','g');pop(hero.x,hero.y-60,'+해독제 3','#9be04a');lifeXp('alch',20);}
  else{f.core20=1;log('세 번째 봉인구를 만들었어요!','g');pop(hero.x,hero.y-60,'제작 성공!','#9ef07a');burst(hero.x,hero.y-40,'#9ef07a',20,120,2,40);lifeXp('smith',70);}
  qCheck();save();refreshSide();try{drawCraft();}catch(e){}return;}
 _craftS3(k,need,gold);};
const _statTxtS3=statTxt;statTxt=function(k){if(k==='s3seal')return '정화와 독을 함께 견디는 봉인구 · 역병 제단 가운데에 꽂아 세 번째 문을 닫아요 (이야기 물건 · 한 번만 만들어요)';
 if(k==='s3cure3')return '일반 약초 2 + 정화잎 1로 해독제 3개 · 독을 바로 풀고 4초 동안 다시 안 걸려요';if(ROLE3[k])return ROLE3[k];return _statTxtS3(k);};
// 퀘스트에 필요한 재료는 '퀘스트 중에 얻은 개수'로 세요 (가방에서 빼지 않아요 → 만들기에 써도 막히지 않음)
const GQ3={leaf16:['s3leaf',4,'Q16_04','정화잎'],leaf17:['s3leaf',5,'Q17_03','정화잎'],iron17:['s3iron',4,'Q17_05','늪철'],cry18:['s3cry',4,'Q18_04','정화수정']};
const _addMatS3=addMat;addMat=function(k,n){_addMatS3(k,n);try{if(!P||!(n>0))return;const f=g3();for(const q in GQ3){const [m,need,qid]=GQ3[q];if(m!==k||!qOn3(qid))continue;f.gq=f.gq||{};const v=Math.min(need,(f.gq[q]|0)+n);if(v!==(f.gq[q]|0)){f.gq[q]=v;toast(GQ3[q][3]+' '+v+'/'+need,'g');setTimeout(()=>qCheck(),0);}}}catch(e){}};
