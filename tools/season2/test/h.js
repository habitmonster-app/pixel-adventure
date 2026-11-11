// 공용 시험 도구: node h.js <script.js>
const {chromium}=require('playwright');
module.exports=async function(fn,opt={}){
 const b=await chromium.launch();const pg=await b.newPage({viewport:{width:opt.w||900,height:opt.h||420},locale:'ko-KR'});
 const errs=[];pg.on('pageerror',e=>errs.push('PAGEERR '+e.message+'\n'+(e.stack||'').split('\n').slice(0,4).join('\n')));
 pg.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text().slice(0,300));});
 if(opt.save)await pg.addInitScript(s=>{localStorage.setItem('pxclassic2',s);},opt.save);
 await pg.goto('http://localhost:8765/index.html');await pg.waitForTimeout(2500);
 await pg.evaluate(()=>{if(!DB.slots[0]){SEL.slot=0;SEL.name='시험';}else SEL.slot=0;startGame();});
 await pg.waitForTimeout(800);await pg.evaluate(()=>{document.querySelector('#tut101 .off')?.click();});await pg.waitForTimeout(1500);await pg.evaluate(()=>{try{closeAll();}catch(e){}document.querySelectorAll('.panel,.pan').forEach(p=>{});});
 try{await fn(pg,errs);}catch(e){console.log('TEST THROW',e.message.slice(0,600));}
 console.log('--- errors',errs.length);for(const e of [...new Set(errs)].slice(0,15))console.log(e);
 await b.close();};
