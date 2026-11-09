// 앱(폰 설치판)과 게임을 잇는 연결부: window.APP
// 웹·시험 링크에서는 만들지 않아요 → 게임이 광고·결제 버튼을 숨겨요.
(function(){
 const C=window.Capacitor;if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
 // ----- 설정 (AdMob에 앱을 등록하면 진짜 ID로 바꿔요) -----
 const IOS=!!(C.getPlatform&&C.getPlatform()==='ios');
 const CFG={
  // 진짜 AdMob 보상형 광고 (2026-11-08 등록: 봉인 기사단 Android / iOS)
  testing:false,
  rewardedId:IOS?'ca-app-pub-6540694097552852/1559237981':'ca-app-pub-6540694097552852/7448044827'
  // 스토어 상품: 없음 (광고로만)
 };
 const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
 const P=()=>C.Plugins||{};

 // ----- 앱이 뒤로 갈 때(홈 화면·다른 앱) 소리 멈추기 -----
 // 게임이 만드는 소리 장치(AudioContext)를 기억해 두었다가 앱이 뒤로 가면 멈추고, 돌아오면 다시 켜요.
 const ACS=[];const AC0=window.AudioContext||window.webkitAudioContext;
 if(AC0){const W=function(...a){const c=new AC0(...a);ACS.push(c);return c;};W.prototype=AC0.prototype;
  try{Object.setPrototypeOf(W,AC0);}catch(e){}window.AudioContext=W;if(window.webkitAudioContext)window.webkitAudioContext=W;}
 let bg=false;const was=new Set();
 function setBg(on){if(on===bg)return;bg=on;
  ACS.forEach(c=>{try{if(on){if(c.state==='running'){was.add(c);c.suspend();}}else if(was.has(c)){was.delete(c);c.resume();}}catch(e){}});
  try{window.GAME_PAUSE&&window.GAME_PAUSE(on);}catch(e){}// 게임이 원하면 이 이름으로 받아서 멈출 수 있어요
  try{window.dispatchEvent(new CustomEvent(on?'apppause':'appresume'));}catch(e){}}
 window.addEventListener('nativepause',()=>setBg(true));window.addEventListener('nativeresume',()=>setBg(false));
 document.addEventListener('visibilitychange',()=>setBg(document.hidden));
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
 // ----- 결제: 없음 (2026-11-09 사용자 결정: 광고로만) -----
 window.APP={
  version:1,
  isBackground:()=>bg,
  ads:{removed:()=>false,showRewarded},
  shop:{products:async()=>[],buy:async()=>({ok:false,err:'noshop'})},// 게임이 상점을 그리려면 이 칸이 있어야 해요(빈 상점)
  // cloud: 클라우드 저장은 다음 단계에서 넣어요 (없으면 게임이 버튼을 숨겨요)
 };
 // 광고는 처음 '광고 보기'를 누를 때 켜요
})();
