// 앱(폰 설치판)과 게임을 잇는 연결부: window.APP
// 웹·시험 링크에서는 만들지 않아요 → 게임이 광고·결제 버튼을 숨겨요.
(function(){
 const C=window.Capacitor;if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
 // ----- 설정 (AdMob에 앱을 등록하면 진짜 ID로 바꿔요) -----
 const CFG={
  testing:true,
  rewardedId:'ca-app-pub-3940256099942544/5224354917', // 구글 시험용 보상형 광고
  products:[{id:'noads',type:'non consumable'},{id:'scroll_10',type:'consumable'},{id:'scroll_30',type:'consumable'},{id:'revive_3',type:'consumable'}]
 };
 const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
 const P=()=>C.Plugins||{};
 // ----- 광고 -----
 let adReady=false,adBusy=false,inited=false;
 async function adInit(){if(inited)return;const A=P().AdMob;if(!A)return;inited=true;try{await A.initialize({initializeForTesting:CFG.testing});}catch(e){}}
 async function adLoad(){const A=P().AdMob;if(!A||adReady)return;try{await A.prepareRewardVideoAd({adId:CFG.rewardedId,isTesting:CFG.testing});adReady=true;}catch(e){adReady=false;}}
 async function showRewarded(place){
  if(APP.ads.removed())return {ok:true,noads:true};
  const A=P().AdMob;if(!A)return {ok:false,err:'noplugin'};if(adBusy)return {ok:false,err:'busy'};
  adBusy=true;await adInit();if(!adReady)await adLoad();
  if(!adReady){adBusy=false;return {ok:false,err:'noad'};}
  let got=false;const hs=[];
  try{
   hs.push(await A.addListener('onRewardedVideoAdReward',()=>{got=true;}));
   const done=new Promise(res=>{A.addListener('onRewardedVideoAdDismissed',()=>res()).then(h=>hs.push(h));A.addListener('onRewardedVideoAdFailedToShow',()=>res()).then(h=>hs.push(h));});
   adReady=false;await A.showRewardVideoAd();await Promise.race([done,new Promise(r=>setTimeout(r,120000))]);
  }catch(e){}
  hs.forEach(h=>{try{h.remove();}catch(e){}});adBusy=false;// 다음 광고는 미리 받지 않아요(게임 중 뒤에서 일하지 않게) → 필요할 때 받기
  return {ok:got,place};}
 // ----- 결제 (구글 플레이) -----
 let store=null;const pend={};
 function grant(t){// 결제가 승인된 거래 → 게임에 지급 → 끝내기(한 번만)
  const done=LS.get('app_granted',[]);
  for(const pr of t.products||[]){const id=pr.id,key=(t.transactionId||'')+':'+id;
   if(done.includes(key)){continue;}
   let ok=false;
   if(id==='noads'){LS.set('app_noads',true);ok=true;}
   else{try{ok=!!(window.GAME_GRANT&&window.GAME_GRANT(id));}catch(e){ok=false;}}
   if(!ok)return;// 게임이 아직 못 받으면 끝내지 않음 → 다음에 다시
   done.push(key);LS.set('app_granted',done.slice(-200));
   if(pend[id]){pend[id]({ok:true,id});delete pend[id];}}
  t.finish();}
 function shopInit(){const S=window.CdvPurchase;if(!S||store)return;store=S.store;
  store.register(CFG.products.map(p=>({id:p.id,platform:S.Platform.GOOGLE_PLAY,type:p.type==='consumable'?S.ProductType.CONSUMABLE:S.ProductType.NON_CONSUMABLE})));
  store.when().approved(t=>grant(t)).productUpdated(p=>{if(p.id==='noads'&&p.owned)LS.set('app_noads',true);});
  store.error(e=>{for(const k in pend){pend[k]({ok:false,err:e&&e.message});delete pend[k];}});
  store.initialize([S.Platform.GOOGLE_PLAY]).catch(()=>{});
  store.ready(()=>{try{window.prodLoad86&&window.prodLoad86();}catch(e){}});}
 window.APP={
  version:1,
  ads:{removed:()=>!!LS.get('app_noads',false),showRewarded},
  shop:{
   products:async()=>{shopInit();if(!store)return [];try{await Promise.race([new Promise(r=>store.ready(r)),new Promise(r=>setTimeout(r,6000))]);}catch(e){}
    return (store.products||[]).map(p=>({id:p.id,title:p.title||p.id,price:(p.pricing&&p.pricing.price)||''}));},
   buy:id=>new Promise(res=>{shopInit();const p=store&&store.get(id);const o=p&&p.getOffer&&p.getOffer();
    if(!o){res({ok:false,err:'noproduct'});return;}pend[id]=res;o.order().then(r=>{if(r&&r.isError){delete pend[id];res({ok:false,err:r.message});}});}),
   restore:()=>{shopInit();return store?store.restorePurchases():Promise.resolve();}
  }
  // cloud: 클라우드 저장은 다음 단계에서 넣어요 (없으면 게임이 버튼을 숨겨요)
 };
 document.addEventListener('deviceready',shopInit);
 setTimeout(()=>{shopInit();},1500);// 광고는 처음 '광고 보기'를 누를 때 켜요
})();
