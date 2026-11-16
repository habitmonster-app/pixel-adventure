const fs=require('fs');
require('./h.js')(async(pg,errs)=>{
 await pg.evaluate(()=>{try{closeAll();}catch(e){}});
 const b=await pg.$('#qtrack .tp3');const bb=await b.boundingBox();await pg.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);
 await pg.waitForTimeout(4000);
 console.log(await pg.evaluate(()=>JSON.stringify({r:RGN.cur,x:hero.x|0,y:hero.y|0,tp:!!document.querySelector('#qtrack .tp3'),npc:npcs.filter(n=>Math.hypot(n.x-hero.x,n.y-hero.y)<120).map(n=>n.n)})));
 await pg.screenshot({path:'shots/v_ria.png'});
 // 리아에게 말 걸기
 await pg.evaluate(()=>{const n=npcs.find(n=>/리아/.test(n.n)&&Math.hypot(n.x-hero.x,n.y-hero.y)<200);if(n){hero.x=n.x;hero.y=n.y+20;}});
 await pg.waitForTimeout(300);await pg.keyboard.press('Space').catch(()=>{});await pg.waitForTimeout(800);
 console.log(await pg.evaluate(()=>JSON.stringify({talk:!!talk,msg:$('msg').innerText.slice(0,120)})));
 await pg.screenshot({path:'shots/v_talk.png'});
},{save:fs.readFileSync(process.env.SV||'save_s2done.json','utf8')});
