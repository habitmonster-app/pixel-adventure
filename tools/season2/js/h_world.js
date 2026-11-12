
// ----- 세계 지도 · 길드 게시판 (시즌 2 다섯 곳) -----
BIOME.snow=[214,226,238];BIOME.icefort=[150,180,214];BIOME.icegate=[96,110,170];
WORLD.push(
 {id:'R11',ch:11,n:'왕성 북문·서리길',t:'북쪽에서 온 얼음 전령',lv:[51,51],kind:'snow',built:1,wm:[112,12],s2:'D111',mood:'평화롭던 왕성 북쪽에 갑자기 눈보라가 몰아쳐요. 꺼진 길목 화로와 실종된 정찰대가 있어요.',res:['s2wood','s2herb'],mobs:['s2rat','s2crow','s2wolf'],boss:{n:'서리뿔 우두머리',where:'서리길 동쪽 길목 · 11장 마지막 퀘스트'}},
 {id:'R12',ch:12,n:'서리항',t:'얼어붙은 항구',lv:[52,52],kind:'snow',built:1,wm:[86,10],s2:'D121',mood:'배와 건물이 얼음에 갇힌 북부 항구예요. 바다가 통째로 얼어 빙판이 됐어요.',res:['s2ore','s2herb','s2wood'],mobs:['s2gob','s2crab','s2jelly'],boss:{n:'빙결 항만장 브라크',where:'닻 내린 얼음터 · 12장 마지막 퀘스트'}},
 {id:'R13',ch:13,n:'은백림',t:'백설 고목숲',lv:[53,53],kind:'snow',built:1,wm:[60,20],s2:'D131',mood:'은빛 나무와 얼어붙은 버섯이 가득한 눈숲이에요. 길이 갑자기 얼어붙어요.',res:['s2wood','s2herb','s2ore'],mobs:['s2spider','s2shroom','s2swolf','s2moth'],boss:{n:'서리뿌리 고목 아르보스',where:'서리뿌리 빈터 · 13장 마지막 퀘스트'}},
 {id:'R14',ch:14,n:'빙정성채',t:'빙정 요새',lv:[54,54],kind:'icefort',built:1,wm:[36,14],s2:'D141',mood:'거대한 얼음 성벽과 봉인 장치가 있는 군사 요새예요. 빙결 대포가 항구를 겨누고 있어요.',res:['s2ore','s2aur'],mobs:['s2sol','s2arch','s2golem','s2orb'],boss:{n:'빙정 기사장 레오른',where:'기사장의 문 · 14장 마지막 퀘스트'}},
 {id:'R15',ch:15,n:'빙월협곡',t:'두 번째 마계문',lv:[55,55],kind:'icegate',built:1,wm:[14,26],s2:'D151',mood:'달빛 아래 거대한 얼음 마계문이 서 있는 협곡이에요.',res:['s2aur'],mobs:['s2leo','s2mk','s2sham','s2shard'],boss:{n:'빙월사도 세르카',where:'빙월 제단 · 시즌 2 최종 보스'}});
function WROAD2(){const L=[];for(let i=0;i<9;i++)L.push([WORLD[i].wm,WORLD[i+1].wm]);const c=WORLD[6].wm;L.push([c,WORLD[10].wm]);for(let i=10;i<WORLD.length-1;i++)L.push([WORLD[i].wm,WORLD[i+1].wm]);return L;}
function s2Ix(x){const t=x/TS;for(let i=10;i<WORLD.length;i++){const r=MAP.regions.find(r=>r.id===WORLD[i].s2);if(r&&t>=r.x0&&t<r.x1)return i;}return 9;}
function s2RegOpen(ch){if(!s2Open())return false;const f=P.f2||{};return ch===11?true:ch===12?!!(f.boss11||P.ch11):ch===13?!!(f.boss12||P.ch12):ch===14?!!(f.boss13||P.ch13):!!(f.boss14||P.ch14);}
const _drawWorldDetS2=drawWorldDet;drawWorldDet=function(here,next,qt){_drawWorldDetS2(here,next,qt);const r=WORLD[WM.sel];if(!r||r.ch<11)return;const D=$('wmDet'),s=rState(r);
 const em=D.querySelector('.wd-h em');if(em)em.textContent=s==='open'?'열림':!s2Open()?'잠김 · 10장(첫 번째 마계문)을 끝내면 열려요':'잠김 · '+(r.ch-1)+'장 보스를 쓰러뜨리면 열려요';
 const no=D.querySelector('.wd-no');if(no)no.textContent=!s2Open()?'첫 번째 마계문을 봉인하면 왕성 북문으로 시즌 2가 시작돼요.':(r.ch-1)+'장 \''+CHN2[r.ch-1]+'\'의 보스를 쓰러뜨리면 길이 열려요.';
 const g=$('wdGo');if(g){g.textContent=r.n+'(으)로 걸어가기';g.onclick=()=>{closeAll();const A=R2(r.s2);go5({rid:r.s2,x:A.entry[0],y:A.entry[1],n:r.n});};}};
const _drawBoardS2=drawBoard;drawBoard=function(){_drawBoardS2();const B=$('pfB');if(!B||!P)return;
 if(!qCur()&&P.f2&&P.f2.seal15){const m=B.querySelector('.bd-main.done');if(m)m.innerHTML='<small>15장 · 두 번째 마계문</small><b>시즌 2 「얼어붙은 맹세」 완료</b><span>두 번째 마계문은 닫힌 그대로예요. 빙월 제단에서 세르카 회고전과 결말 다시 보기를 할 수 있어요. 은백림 깊은 곳에는 숨겨진 정예가 나타나요. 빙월 작업대에 빙월핵 장신구가 열렸어요. 다음 시즌 예고: 시즌 3 「독뿌리의 세 번째 문」</span>';}
 const chs=WORLD.filter(r=>r.ch>=11).map(r=>{const st=chSt135(r);return `<div class="bd-ch b"><i>${r.ch}</i><b>${r.t}</b><span>${r.n} · Lv.${r.lv[0]}~${r.lv[1]}</span><em>${s2RegOpen(r.ch)?st:'잠김'}</em></div>`;}).join('');
 B.insertAdjacentHTML('beforeend',`<h4>시즌 2 · 얼어붙은 맹세</h4><div class="bd-chs">${chs}</div>`);};
