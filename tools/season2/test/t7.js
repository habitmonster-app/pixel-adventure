// 끝난 저장: 알림판·퀘스트 창·지도·게시판·제작 창 화면, 작은 폰 화면
const fs=require('fs');const save=fs.readFileSync('save_s2end.json','utf8');const W=+process.env.W||900,H=+process.env.H||420,T=process.env.T||'';
require('./h.js')(async(pg)=>{
 await pg.waitForTimeout(2000);
 await pg.evaluate(()=>{tele2&&0;const r=R2('D151');hero.x=tx5(r.arena[0]);hero.y=ty5(r.arena[1]+3);rgGo('D151',{now:1,start:1});});await pg.waitForTimeout(3000);
 console.log('qtrack', await pg.evaluate(()=>$('qtrack').textContent));
 await pg.screenshot({path:'shots7/'+T+'a_field.png'});
 const tryOpen=async(nm,fn)=>{const r=await pg.evaluate(fn);await pg.waitForTimeout(700);await pg.screenshot({path:'shots7/'+T+nm+'.png'});await pg.evaluate(()=>{try{closeAll();}catch(e){}});await pg.waitForTimeout(300);return r;};
 console.log('quest', await tryOpen('b_quest',()=>{QTAB='main';openQuest();return $('questB').textContent.slice(0,160);}));
 console.log('map', await tryOpen('c_worldmap',()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='지도');b&&b.click();return !!b;}));
 console.log('board', await tryOpen('d_board',()=>{openBoard();return 1;}));
 console.log('craft', await tryOpen('e_craft',()=>{openCraft('frost');return document.body.innerText.includes('빙월')?'빙월 보임':'?';}));
 console.log('dex', await tryOpen('f_dex',()=>{(typeof openDex==='function'?openDex():0);return 1;}));
},{save,w:W,h:H});
