// 페이지 안에서 도는 자동 플레이 (흐름 시험용: 체력은 계속 채우고, 재료 지급·보스 체력 깎기는 기록에 남김)
window.DRVLOG=[];window.DRV={god:1,walk:1,t0:0,last:'',stuck:0,done:0};
(function(){const lg=s=>{DRVLOG.push(s);};const D=window.DRV;{const _hd=heroDamage;heroDamage=function(d){D.hits=(D.hits||0)+1;D.maxHit=Math.max(D.maxHit||0,d|0);if(!D.god)return _hd(d);};}
const NPCF={ria11:['k2ria0','얼어붙은'],noah12:['k2noah','무슨 일'],kai15:['k2kai','이야기하기'],ria15:['k2ria','이야기하기'],lum15:['k2lum','이야기하기']};
const KM={k_rat:['s2rat'],k_crow:['s2crow'],k_wolf:['s2wolf'],k_gob:['s2gob'],k_shroom:['s2shroom'],k_spider:['s2spider'],k_sol:['s2sol'],k_leo:['s2leo'],k_mk:['s2mk'],k_sham:['s2sham'],key14:['s2sol','s2arch'],gear14:['s2golem','s2orb']};
const fac=()=>$('facM').style.display==='flex';
const clickFac=txt=>{const bs=[...document.querySelectorAll('#fmB .fm-bt button')];const b=bs.find(b=>b.textContent.includes(txt));if(b){b.click();return 1;}lg('!! 버튼 없음 "'+txt+'" 있는 것: '+bs.map(b=>b.textContent).join(' | '));return 0;};
const tp=(x,y)=>{hero.x=tx5(x);hero.y=ty5(y);auto=null;};
D.step=function(){try{
 if(!P||D.done)return;if(D.god){P.hp=stats().hp||9999;if(hero.st==='dead')lg('!! 죽음');}
 if(talk){nextLine();return;}
 if(RGN.busy)return;
 const q=qCur();if(!q||!(q.ch>=11)){if(fac()){lg('  메뉴: '+$('fmT').textContent);clickFac('계속 탐험');}if(!D.done){D.done=1;lg('== 맞은 횟수 '+D.hits+' 가장 큰 공격 '+D.maxHit);lg('== 퀘스트 끝 i='+P.q.i+' lv='+P.lv+' s2='+JSON.stringify(P.s2)+' ch15='+P.ch15);}return;}
 const key=q.id+':'+P.q.st+':'+q.goal.f2.filter(f2flag).length;if(key!==D.last){D.last=key;D.t0=performance.now();lg(key+' @'+RGN.cur+' lv'+P.lv+' exp'+P.exp+(window.DRVSHOT?' SHOT':''));}
 if(performance.now()-D.t0>90000){lg('!! 멈춤 '+key+' cur='+RGN.cur+' hero='+(hero.x/TS).toFixed(1)+','+(hero.y/TS).toFixed(1)+' fac='+fac()+' wave='+!!S2.wave+' bs='+(S2.bs&&S2.bs.id)+' goal='+goalTxt(q,0));D.t0=performance.now();D.stuck++;if(D.stuck>2){D.done=1;}}
 if(P.q.st!=='go'){if(fac())closeFac();return;}
 const k=q.goal.f2.find(k=>!f2flag(k));if(!k)return;
 if(fac()){if(k==='talk15'){clickFac('진실은');return;}const nf=NPCF[k];if(nf){if(!clickFac(nf[1]))closeFac();return;}closeFac();return;}
 // 보스전 중 화로 다시 켜기
 const lp=NODES.find(n=>n.k==='lp');if(lp){hero.x=lp.x;hero.y=lp.y+10;if(!D.lpT||performance.now()-D.lpT>800){D.lpT=performance.now();lg('  화로 다시 켜기 '+lp.si);lp.on();}return;}
 const t=Q2T[k]&&Q2T[k]();if(!t){lg('!! 목표 없음 '+k);return;}
 if(RGN.cur!==t.rid){if(D.walk){if(!auto&&!S5.pend&&!S2.pend){lg('  걷기 qGo → '+t.rid);qGo();}
   if(!D.wk||D.wk.k!==k)D.wk={k,t:performance.now()};if(performance.now()-D.wk.t>75000){lg('!! 걸어서 못 감 '+RGN.cur+'→'+t.rid+' hero='+(hero.x/TS).toFixed(1)+','+(hero.y/TS).toFixed(1));D.wk=null;hero.x=tx5(t.x);hero.y=ty5(t.y);rgGo(t.rid,{now:1,start:1});}return;}
  hero.x=tx5(t.x);hero.y=ty5(t.y);rgGo(t.rid,{now:1,start:1});return;}
 if(k.startsWith('in'))return;
 if(NPCF[k]){const n=npcs.find(n=>n.k===NPCF[k][0]);if(!n){lg('!! NPC 없음 '+NPCF[k][0]);return;}hero.x=n.x;hero.y=n.y+28;startTalk(n);return;}
 if(k==='core15'){const need={s2herb:3,s2ore:2,s2aur:2};for(const m in need)if(matN(m)<need[m]){addMat(m,need[m]-matN(m));lg('  (재료 지급 '+m+')');}P.gold=Math.max(P.gold,500);const r=frostRec().find(r=>r[0]==='s2seal');if(!r){lg('!! 제작법 s2seal 없음');return;}craft(r[0],r[1],r[2]);return;}
 if(KM[k]){const m=mobs.find(m=>m.st!=='dead'&&m.m&&KM[k].includes(m.m.id)&&!m.dec2);if(m){hero.x=m.x+20;hero.y=m.y;hurt(m,m.hp+1);}else{const o=mobs.find(m=>m.st!=='dead'&&m.m&&!m.b2&&!m.dec2&&!m.npc&&ID2.includes(m.m.id));if(o){hero.x=o.x+20;hero.y=o.y;hurt(o,o.hp+1);}if(!D.nm||D.nm!==k){D.nm=k;lg('  (그 몬스터가 안 보여 다른 몹을 잡아 다시 나오게 해요: '+k+')');}}return;}
 if(/^boss|^sup15/.test(k)){const b=mobs.find(m=>m.st!=='dead'&&m.b2&&!m.sup);if(!b){tp(t.x,t.y);if(!D.nb||performance.now()-D.nb>5000){D.nb=performance.now();lg('  (보스 없음 '+k+' bs='+(S2.bs&&S2.bs.id)+')');}return;}
  hero.x=b.x-70;hero.y=b.y+20;if(!D.bt||D.bt.e!==b){D.bt={e:b,t:performance.now(),ph:0};lg('  보스 '+b.m.n+' hp'+b.hp+' on='+(S2.bs&&S2.bs.on));}
  const sk=S2.sk;if(sk&&sk.ph!==D.bt.ph){D.bt.ph=sk.ph;lg('  세르카 '+sk.ph+'단계 (분신 '+mobs.filter(m=>m.dec2).length+', 보호막 '+sk.sh+')'+(window.DRVSHOT?' SHOT':''));}
  if(performance.now()-D.bt.t>5000){D.bt.t=performance.now();const h0=b.hp;hurt(b,Math.ceil(b.m.hp*.12));if(b.hp===h0&&!(sk&&sk.sh))lg('  (피해가 안 들어가요 hp'+b.hp+')');}
  return;}
 if(k==='talk15'){tp(t.x,t.y);return;}
 let n=SP5.find(n=>n.si===(k==='seal15'||k==='end15'?'al15':k));if(!n&&IQ2[k]){const tt=t;n=SP5.find(s=>s.r2===tt.rid&&Math.floor(s.x/TS)===tt.x&&Math.floor(s.y/TS)===tt.y);}if(!n){lg('!! 상호작용 없음 '+k);return;}
 if(S2.wave){const m=mobs.find(m=>m.st!=='dead'&&m.w2);if(m){hero.x=m.x+20;hero.y=m.y;hurt(m,m.hp+1);}return;}
 const live=mobs.find(m=>m.st!=='dead'&&m.m&&m.angry&&!m.b2&&!m.dec2&&Math.hypot(m.x-hero.x,m.y-hero.y)<120);if(live&&k.startsWith('pr')){hurt(live,live.hp+1);return;}
 hero.x=n.x;hero.y=n.y+10;auto=null;
 if(!spOn2(n)){if(D.no!==k){D.no=k;lg('!! 노드 꺼져 있음 '+k);}return;}
 if(n.pre&&!n.pre()){if(D.no!==k+'p'){D.no=k+'p';lg('!! pre 실패 '+k);}return;}
 n.on();
}catch(e){lg('!! 예외 '+e.message+' '+(e.stack||'').split('\n')[1]);}};
setInterval(D.step,200);})();
