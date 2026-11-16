// 페이지 안에서 도는 시즌 3 자동 플레이 (흐름 시험용: 체력은 계속 채우고, 보스 체력 깎기는 기록에 남김)
window.DRVLOG=[];window.DRV={god:1,walk:1,t0:0,last:'',stuck:0,done:0};
(function(){const lg=s=>{DRVLOG.push(s);};const D=window.DRV,T=window.SS3T;{const _hd=heroDamage;heroDamage=function(d){D.hits=(D.hits||0)+1;D.maxHit=Math.max(D.maxHit||0,d|0);if(!D.god)return _hd(d);};}
const NPCF={ria16:['k3ria0','무슨 일'],maren16:['k3maren','이야기하기'],harin17:['k3harin','이야기하기'],urban19:['k3urban','이야기하기'],kai20:['k3kai','이야기하기'],ria20:['k3ria','이야기하기'],lum20:['k3lum','이야기하기'],ner20:['k3ner','이야기하기']};
const fac=()=>$('facM').style.display==='flex';
const clickFac=txt=>{const bs=[...document.querySelectorAll('#fmB .fm-bt button')];const b=bs.find(b=>b.textContent.includes(txt));if(b){b.click();return 1;}lg('!! 버튼 없음 "'+txt+'" 있는 것: '+bs.map(b=>b.textContent).join(' | '));return 0;};
const tp=(x,y)=>{hero.x=tx5(x);hero.y=ty5(y);auto=null;};
const kill=m=>{hero.x=m.x+20;hero.y=m.y;hurt(m,m.hp+1);};
D.step=function(){try{
 if(!P||D.done)return;if(D.god){P.hp=stats().hp||9999;if(hero.st==='dead')lg('!! 죽음');}
 if(talk){nextLine();return;}
 if(RGN.busy||gath)return;
 const q=qCur();if(!q||!(q.ch>=16)){if(fac()){lg('  메뉴: '+$('fmT').textContent);clickFac('계속 탐험');}if(!D.done){D.done=1;lg('== 맞은 횟수 '+D.hits+' 가장 큰 공격 '+D.maxHit);lg('== 퀘스트 끝 i='+P.q.i+' lv='+P.lv+' s3='+JSON.stringify(P.s3)+' ch20='+P.ch20);}return;}
 const key=q.id+':'+P.q.st+':'+q.goal.g3.filter(T.f3flag).length;if(key!==D.last){D.last=key;D.t0=performance.now();lg(key+' @'+RGN.cur+' lv'+P.lv+' exp'+P.exp+(window.DRVSHOT?' SHOT':''));}
 if(performance.now()-D.t0>90000){lg('!! 멈춤 '+key+' cur='+RGN.cur+' hero='+(hero.x/TS).toFixed(1)+','+(hero.y/TS).toFixed(1)+' fac='+fac()+' wave='+!!S2.wave+' bs='+(T.G3.bs&&T.G3.bs.id)+' goal='+goalTxt(q,0));D.t0=performance.now();D.stuck++;if(D.stuck>2){D.done=1;}}
 if(P.q.st!=='go'){if(fac())closeFac();return;}
 const k=q.goal.g3.find(k=>!T.f3flag(k));if(!k)return;
 if(fac()){if(k==='talk20'){clickFac('왕실의 죄');return;}if(k==='mat20'&&clickFac('보급 받기'))return;const nf=NPCF[k];if(nf){if(!clickFac(nf[1]))closeFac();return;}closeFac();return;}
 const rs=NODES.find(n=>n.k==='rst');if(rs){hero.x=rs.x;hero.y=rs.y+10;if(!D.lpT||performance.now()-D.lpT>800){D.lpT=performance.now();lg('  봉인석 다시 켜기 '+rs.si);rs.on();}return;}
 const t=T.Q3T[k]&&T.Q3T[k]();if(!t){lg('!! 목표 없음 '+k);return;}
 if(RGN.cur!==t.rid){if(D.walk){if(!auto&&!S5.pend&&!T.G3.pend){lg('  걷기 qGo → '+t.rid);qGo();}
   if(!D.wk||D.wk.k!==k)D.wk={k,t:performance.now()};if(performance.now()-D.wk.t>75000){lg('!! 걸어서 못 감 '+RGN.cur+'→'+t.rid+' hero='+(hero.x/TS).toFixed(1)+','+(hero.y/TS).toFixed(1));D.wk=null;hero.x=tx5(t.x);hero.y=ty5(t.y);rgGo(t.rid,{now:1,start:1});}return;}
  hero.x=tx5(t.x);hero.y=ty5(t.y);rgGo(t.rid,{now:1,start:1});return;}
 if(k.startsWith('in'))return;
 if(NPCF[k]){const n=npcs.find(n=>n.k===NPCF[k][0]);if(!n){lg('!! NPC 없음 '+NPCF[k][0]);return;}hero.x=n.x;hero.y=n.y+28;startTalk(n);return;}
 if(k==='mat20'){const n=npcs.find(n=>n.k==='k3ria');if(n){hero.x=n.x;hero.y=n.y+28;startTalk(n);}return;}
 if(k==='core20'){P.gold=Math.max(P.gold,500);const r=T.plagueRec().find(r=>r[0]==='s3seal');if(!r){lg('!! 제작법 s3seal 없음');return;}craft(r[0],r[1],r[2]);return;}
 if(k==='psn16'){tp(t.x,t.y);if(!D.pT||performance.now()-D.pT>3000){D.pT=performance.now();lg('  독 기다림 fog='+T.inFog3(hero.x,hero.y)+' safe='+T.inSafe3(hero.x,hero.y)+' PSN='+!!PSN);}return;}
 if(k==='cure16'){if(PSN){P.pot.pot_cure=Math.max(1,P.pot.pot_cure|0);drinkEtc('pot_cure');}else tp(t.x,t.y);return;}
 if(T.GQ3[k]){const mat=T.GQ3[k][0];const ns=NODES.filter(n=>n.k===mat&&n.r5===RGN.cur&&!(n.cd>0));if(!ns.length){if(D.nn!==k){D.nn=k;lg('  (채집 자리 없음/쿨 '+k+')');}return;}
  const n=ns.sort((a,b)=>Math.hypot(a.x-hero.x,a.y-hero.y)-Math.hypot(b.x-hero.x,b.y-hero.y))[0];hero.x=n.x;hero.y=n.y+12;auto=null;startGather(n);return;}
 if(T.KQ3[k]){const id=T.KQ3[k][0];const m=mobs.find(m=>m.st!=='dead'&&m.m&&m.m.id===id&&!m.dec3);if(m)kill(m);else{const o=mobs.find(m=>m.st!=='dead'&&m.m&&!m.b3&&!m.dec3&&!m.npc&&T.ID3.includes(m.m.id));if(o)kill(o);else tp(t.x,t.y);if(D.nm!==k){D.nm=k;lg('  (그 몬스터가 안 보여 다른 몹을 잡아 다시 나오게 해요: '+k+')');}}return;}
 if(/^boss|^sup20/.test(k)){const b=mobs.find(m=>m.st!=='dead'&&m.b3&&!m.sup);if(!b){tp(t.x,t.y);if(!D.nb||performance.now()-D.nb>5000){D.nb=performance.now();lg('  (보스 없음 '+k+' bs='+(T.G3.bs&&T.G3.bs.id)+')');}return;}
  hero.x=b.x-70;hero.y=b.y+20;if(!D.bt||D.bt.e!==b){D.bt={e:b,t:performance.now(),ph:0};lg('  보스 '+b.m.n+' hp'+b.hp+' on='+(T.G3.bs&&T.G3.bs.on));}
  const mk=T.G3.mk;if(mk&&mk.ph!==D.bt.ph){D.bt.ph=mk.ph;lg('  모르가 '+mk.ph+'단계 (포자체 '+mobs.filter(m=>m.dec3&&m.st!=='dead').length+', 보호막 '+mk.sh+')'+(window.DRVSHOT?' SHOT':''));}
  if(performance.now()-D.bt.t>4000){D.bt.t=performance.now();const h0=b.hp;hurt(b,Math.ceil(b.m.hp*.12));if(b.hp===h0&&!(mk&&mk.sh))lg('  (피해가 안 들어가요 hp'+b.hp+')');}
  return;}
 if(k==='talk20'){tp(t.x,t.y);return;}
 let n=SP5.find(n=>n.g3&&n.si===(k==='seal20'||k==='end20'?'al20':k));if(!n&&t){const tt=t;n=SP5.find(s=>s.r3===tt.rid&&Math.floor(s.x/TS)===tt.x&&Math.floor(s.y/TS)===tt.y);}if(!n){lg('!! 상호작용 없음 '+k);return;}
 if(S2.wave){const m=mobs.find(m=>m.st!=='dead'&&m.w2);if(m)kill(m);return;}
 const gd=mobs.find(m=>m.st!=='dead'&&m.gd3);if(gd){kill(gd);return;}
 hero.x=n.x;hero.y=n.y+10;auto=null;
 if(!T.spOn3(n)){if(D.no!==k){D.no=k;lg('!! 노드 꺼져 있음 '+k);}return;}
 if(n.pre&&!n.pre()){if(D.no!==k+'p'){D.no=k+'p';lg('  pre 대기 '+k);}return;}
 D.no=null;n.on();
}catch(e){lg('!! 예외 '+e.message+' '+(e.stack||'').split('\n')[1]);}};
setInterval(D.step,200);})();
