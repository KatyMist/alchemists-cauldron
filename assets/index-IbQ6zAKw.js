(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={easy:{shelfSize:4,maxCauldronIngredients:4,startTime:180,tolerance:12,lives:5,scorePerBrew:100,timeBonus:15,reactionCount:0},medium:{shelfSize:6,maxCauldronIngredients:4,startTime:150,tolerance:8,lives:3,scorePerBrew:200,timeBonus:10,reactionCount:2},hard:{shelfSize:8,maxCauldronIngredients:5,startTime:150,tolerance:5,lives:3,scorePerBrew:300,timeBonus:5,reactionCount:3}},t=`medium`,n=[`easy`,`medium`,`hard`],r={easy:`Easy`,medium:`Medium`,hard:`Hard`};function i(e){return e===`easy`||e===`medium`||e===`hard`}var a=[{id:`dragon-tears`,name:`Dragon Tears`,icon:`drop`,temperature:25,density:8,magicPower:10},{id:`fairy-dust`,name:`Fairy Dust`,icon:`sparkle`,temperature:12,density:9,magicPower:12},{id:`frost-lotus`,name:`Frost Lotus`,icon:`snowflake`,temperature:-18,density:4,magicPower:14},{id:`mandrake-root`,name:`Mandrake Root`,icon:`root`,temperature:-5,density:20,magicPower:8},{id:`caustic-acid`,name:`Caustic Acid`,icon:`flask`,temperature:10,density:14,magicPower:22},{id:`essence-of-the-void`,name:`Essence of the Void`,icon:`void`,temperature:-20,density:-10,magicPower:40},{id:`phoenix-feather`,name:`Phoenix Feather`,icon:`feather`,temperature:50,density:-10,magicPower:30},{id:`toad-slime`,name:`Toad Slime`,icon:`slime`,temperature:5,density:30,magicPower:0}];function o(e,t){return Math.floor(Math.random()*(t-e+1))+e}function s(e){return e[o(0,e.length-1)]}var c=2,l=15;function u(e){let t={};return e.forEach(e=>{t[e.id]=o(c,l)}),t}function d(e,t){return e[t]??0}function f(e){return Object.values(e).every(e=>e<=0)}function p(e,t){return e.cauldronIngredients.length>=t.maxCauldronIngredients}function m(e,t,n){return e.status===`playing`&&!p(e,n)&&d(e.shelfStock,t)>0}function ee(e,t,n){let r=a.find(e=>e.id===t);return!r||!m(e,t,n)?e:{...e,cauldronIngredients:[...e.cauldronIngredients,r],shelfStock:{...e.shelfStock,[t]:d(e.shelfStock,t)-1}}}function te(e){return e.reduce((e,t)=>({temperature:e.temperature+t.temperature,density:e.density+t.density,magicPower:e.magicPower+t.magicPower}),{temperature:0,density:0,magicPower:0})}function h(e,...t){return t.every(t=>e.some(e=>e.id===t))}function g(e,t){return Math.round(e*(1+t/100))}function _(e){return te(e)}var ne=[{id:`bubbling`,name:`Bubbling`,difficulty:`medium`,description:`Magic Power +50%, −10 s`,isActive:e=>h(e,`fairy-dust`,`caustic-acid`),apply:e=>({...e,magicPower:g(e.magicPower,50)}),onFire:{timePenalty:10}},{id:`volatile-mix`,name:`Volatile Mix`,difficulty:`hard`,description:`−1 life, the cauldron is cleared`,isActive:e=>h(e,`phoenix-feather`,`essence-of-the-void`),apply:e=>e,onFire:{lifePenalty:1,clearCauldron:!0}},{id:`solar-frost`,name:`Solar Frost`,difficulty:`medium`,description:`Temperature = 0, Density +20%`,isActive:e=>h(e,`dragon-tears`,`frost-lotus`),apply:e=>({...e,temperature:0,density:g(e.density,20)})},{id:`rooted-steam`,name:`Rooted Steam`,difficulty:`hard`,description:`Density +25%, Magic Power −10%`,isActive:e=>h(e,`mandrake-root`,`toad-slime`),apply:e=>({...e,density:g(e.density,25),magicPower:g(e.magicPower,-10)})},{id:`ashen-bloom`,name:`Ashen Bloom`,difficulty:`hard`,description:`Temperature +10, Magic Power +25%`,isActive:e=>h(e,`phoenix-feather`,`fairy-dust`),apply:e=>({...e,temperature:e.temperature+10,magicPower:g(e.magicPower,25)})},{id:`annihilation`,name:`Annihilation`,difficulty:`hard`,description:`Temperature = 0, Density ×2`,isActive:e=>e.some(e=>e.temperature>15)&&e.some(e=>e.temperature<-15),apply:e=>({...e,temperature:0,density:e.density*2})},{id:`pressure-spike`,name:`Pressure Spike`,difficulty:`hard`,description:`Density = 70, Magic Power +10%`,isActive:e=>_(e).density>=70,apply:e=>({...e,density:70,magicPower:g(e.magicPower,10)})},{id:`magma-flux`,name:`Magma Flux`,difficulty:`hard`,description:`Magic Power +20%, Density −10%`,isActive:e=>_(e).temperature>=60,apply:e=>({...e,magicPower:g(e.magicPower,20),density:g(e.density,-10)})},{id:`deep-freeze`,name:`Deep Freeze`,difficulty:`medium`,description:`Density +15%, Magic Power −15%`,isActive:e=>_(e).temperature<=-20,apply:e=>({...e,density:g(e.density,15),magicPower:g(e.magicPower,-15)})},{id:`arcane-saturation`,name:`Arcane Saturation`,difficulty:`medium`,description:`Magic Power = 80, Temperature +5`,isActive:e=>_(e).magicPower>=80,apply:e=>({...e,magicPower:80,temperature:e.temperature+5})},{id:`steam-burst`,name:`Steam Burst`,difficulty:`medium`,description:`Temperature +10, −5 s`,isActive:e=>h(e,`dragon-tears`,`caustic-acid`)&&_(e).temperature>=35,apply:e=>({...e,temperature:e.temperature+10}),onFire:{timePenalty:5}},{id:`black-ice`,name:`Black Ice`,difficulty:`medium`,description:`Temperature −10, Magic Power +20%`,isActive:e=>h(e,`frost-lotus`,`essence-of-the-void`)&&_(e).density<=0,apply:e=>({...e,temperature:e.temperature-10,magicPower:g(e.magicPower,20)})},{id:`heavy-spark`,name:`Heavy Spark`,difficulty:`hard`,description:`Density +20%, Magic Power +10%`,isActive:e=>h(e,`fairy-dust`,`toad-slime`)&&_(e).density>=40,apply:e=>({...e,density:g(e.density,20),magicPower:g(e.magicPower,10)})},{id:`burning-root`,name:`Burning Root`,difficulty:`hard`,description:`Temperature +15, Density −10%`,isActive:e=>h(e,`mandrake-root`,`phoenix-feather`)&&_(e).temperature>=40,apply:e=>({...e,temperature:e.temperature+15,density:g(e.density,-10)})},{id:`void-resonance`,name:`Void Resonance`,difficulty:`medium`,description:`Magic Power +30%, Temperature −5`,isActive:e=>h(e,`essence-of-the-void`,`dragon-tears`)&&_(e).magicPower>=50,apply:e=>({...e,magicPower:g(e.magicPower,30),temperature:e.temperature-5})}],re={easy:[],medium:[`bubbling`,`solar-frost`],hard:[`volatile-mix`,`rooted-steam`,`annihilation`]};function ie(e){let t=re[e];return ne.filter(e=>t.includes(e.id))}function ae(e,t){return ie(t).filter(t=>t.isActive(e)).reduce((e,t)=>t.apply(e),te(e))}function oe(e,t,n){return ie(n).filter(n=>!n.isActive(e)&&n.isActive(t))}var se=/^[\p{L}\d _-]{2,15}$/u;function ce(e){return e.trim()}function le(e){return se.test(ce(e))}var v=[`temperature`,`density`,`magicPower`],y={temperature:{key:`temperature`,label:`Temperature`,min:-100,max:100},density:{key:`density`,label:`Density`,min:-80,max:80},magicPower:{key:`magicPower`,label:`Magic Power`,min:0,max:120}};function b(e,t){return{min:e.min-t,max:e.max+t}}function x(e,t){return e>=t.min&&e<=t.max}function ue(e,t,n){return x(e,t)?`match`:x(e,b(t,n))?`tolerance`:`off`}function de(e,t,n){return v.every(r=>x(e[r],b(t[r],n)))}var fe=[[`easy`,`Moon Mist`,[32,42],[12,22],[17,27]],[`easy`,`Root Bloom`,[2,12],[24,34],[15,25]],[`easy`,`Frost Steam`,[2,12],[7,17],[19,29]],[`easy`,`Quiet Swirl`,[-28,-18],[19,29],[17,27]],[`easy`,`Bright Dew`,[27,37],[32,42],[25,35]],[`easy`,`Snow Dust`,[-16,-6],[28,38],[29,39]],[`medium`,`Acid Spark`,[17,27],[18,28],[29,39]],[`medium`,`Void Ember`,[0,10],[0,10],[45,55]],[`medium`,`Heavy Acid`,[0,10],[29,39],[25,35]],[`medium`,`Frost Acid`,[-13,-3],[13,23],[31,41]],[`medium`,`Dusty Void`,[-13,-3],[0,10],[47,57]],[`medium`,`Dragon Void`,[25,35],[1,11],[55,65]],[`medium`,`Rooted Night`,[-18,-8],[14,24],[55,65]],[`hard`,`Phoenix Pulse`,[57,67],[0,10],[37,47]],[`hard`,`Slime Crown`,[-5,5],[45,55],[3,13]],[`hard`,`Void Flame`,[25,35],[0,10],[60,70]],[`hard`,`Acid Bog`,[10,20],[39,49],[17,27]],[`hard`,`Frozen Ash`,[27,37],[0,10],[39,49]],[`hard`,`Triple Eclipse`,[-20,-10],[19,29],[60,70]],[`hard`,`Ember Soup`,[62,72],[24,34],[37,47]]].map(([e,t,n,r,i])=>({id:t.toLowerCase().replace(/\s+/g,`-`),name:t,difficulty:e,temperature:{min:n[0],max:n[1]},density:{min:r[0],max:r[1]},magicPower:{min:i[0],max:i[1]}}));function pe(e){return fe.filter(t=>t.difficulty===e)}function me(e){return s(pe(e))??null}var S=1e3;15*S;function he(e,t){return Math.max(0,e-t)}function ge(e,t,n){return Math.min(e+t,n)}function _e(e){let t=Math.ceil(e/S),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`}function ve(e){return a.slice(0,e.shelfSize)}function ye(e){return{status:`menu`,difficulty:e,score:0,timeLeft:0,endTime:null,lives:0,activeRecipe:null,cauldronIngredients:[],shelfStock:{},gameOverReason:null,lastReactionId:null}}function be(e,t,n){let r=t.startTime*S;return{status:`playing`,difficulty:e,score:0,timeLeft:r,endTime:n+r,lives:t.lives,activeRecipe:me(e),cauldronIngredients:[],shelfStock:u(ve(t)),gameOverReason:null,lastReactionId:null}}function C(e,t){return{...e,status:`game-over`,endTime:null,gameOverReason:t}}function w(e,t){if(e.status!==`playing`||e.endTime===null)return e;let n=he(e.endTime,t),r={...e,timeLeft:n};return n<=0?C(r,`time`):r}function xe(e,t){if(e.status!==`playing`)return e;let n=w(e,t);return n.status===`playing`?{...n,status:`paused`,endTime:null}:n}function Se(e,t){return e.status===`paused`?{...e,status:`playing`,endTime:t+e.timeLeft}:e}function Ce(e,t,n){let r=w(e,n);if(r.status!==`playing`||r.activeRecipe===null||r.cauldronIngredients.length===0)return{state:r,isSuccess:!1};let i=de(ae(r.cauldronIngredients,r.difficulty),r.activeRecipe,t.tolerance),a={...r,cauldronIngredients:[],lastReactionId:null},o;if(i){let e=ge(r.timeLeft,t.timeBonus*S,t.startTime*S);o={...a,score:r.score+t.scorePerBrew,timeLeft:e,endTime:n+e,activeRecipe:me(r.difficulty)}}else o={...a,lives:r.lives-1};return o.lives<=0?{state:C(o,`lives`),isSuccess:i}:f(o.shelfStock)?{state:C(o,`ingredients`),isSuccess:i}:{state:o,isSuccess:i}}function we(e){return{status:`paused`,difficulty:e.difficulty,score:e.score,timeLeft:e.timeLeft,endTime:null,lives:e.lives,activeRecipe:e.activeRecipe,cauldronIngredients:e.cauldronIngredients,shelfStock:e.shelfStock,gameOverReason:null,lastReactionId:null}}function Te(e,t,n){let r=Math.max(0,e.timeLeft-t*S);return{...e,timeLeft:r,endTime:n+r}}function Ee(e){return e.lives<=0?C(e,`lives`):e.timeLeft<=0?C(e,`time`):e.cauldronIngredients.length===0&&f(e.shelfStock)?C(e,`ingredients`):e}function De(e,t,n,r){let i=w(e,r),a=ee(i,t,n);if(a===i)return{state:i,fired:[]};let o=oe(i.cauldronIngredients,a.cauldronIngredients,a.difficulty);return{state:Ee(o.reduce((e,t)=>{let n=t.onFire??{},i={...e,lastReactionId:t.id};return n.timePenalty!==void 0&&(i=Te(i,n.timePenalty,r)),n.lifePenalty!==void 0&&(i={...i,lives:i.lives-n.lifePenalty}),n.clearCauldron===!0&&(i={...i,cauldronIngredients:[]}),i},a)),fired:o}}function Oe(e,t){let n=w(e,t);return n.status!==`playing`||n.cauldronIngredients.length===0?n:Ee(Te({...n,cauldronIngredients:[],lastReactionId:null},10,t))}function T(e){try{let t=localStorage.getItem(e);return t===null?null:JSON.parse(t)}catch{return null}}function E(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function D(e){try{localStorage.removeItem(e)}catch{}}var ke=`alchemists-cauldron:leaderboard:`,Ae=10;function O(e){return`${ke}${e}`}function je(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.name==`string`&&typeof t.score==`number`&&Number.isFinite(t.score)&&typeof t.date==`number`&&Number.isFinite(t.date)&&i(t.difficulty)}function Me(e){return[...e].sort((e,t)=>t.score-e.score||e.date-t.date)}function k(e){let t=T(O(e));return Array.isArray(t)?Me(t.filter(je).filter(t=>t.difficulty===e)).slice(0,Ae):[]}function Ne(e,t){if(e<=0)return!1;let n=k(t)[9];return n===void 0||e>n.score}function Pe(e){let t=Me([...k(e.difficulty),e]).slice(0,Ae);return E(O(e.difficulty),t),t.indexOf(e)+1}function Fe(e){D(O(e))}var A=`alchemists-cauldron:save`,Ie=15;function j(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function M(e,t,n){return typeof e==`number`&&Number.isInteger(e)&&e>=t&&e<=n}function Le(e){return j(e)&&typeof e.id==`string`?e.id:null}function Re(e,t){if(!j(e)||Object.keys(e).length!==t.length)return null;let n={};for(let r of t){let t=e[r.id];if(!M(t,0,Ie))return null;n[r.id]=t}return n}function ze(e,t,n){if(!Array.isArray(e)||e.length>n)return null;let r=[];for(let n of e){let e=t.find(e=>e.id===Le(n));if(!e)return null;r.push(e)}return r}function Be(t){if(!j(t)||!i(t.difficulty))return null;let n=t.difficulty,r=e[n],o=a.slice(0,r.shelfSize),s=Le(t.activeRecipe),c=fe.find(e=>e.id===s&&e.difficulty===n),l=Re(t.shelfStock,o),u=ze(t.cauldronIngredients,o,r.maxCauldronIngredients),{score:d,timeLeft:f,lives:p,status:m}=t;return m!==`playing`&&m!==`paused`||!M(d,0,2**53-1)||!M(f,1,r.startTime*1e3)||!M(p,1,r.lives)||c===void 0||l===null||u===null?null:{difficulty:n,score:d,timeLeft:f,lives:p,activeRecipe:c,cauldronIngredients:u,shelfStock:l,status:m}}function Ve(e){(e.status===`playing`||e.status===`paused`)&&E(A,{difficulty:e.difficulty,score:e.score,timeLeft:Math.round(e.timeLeft),lives:e.lives,activeRecipe:e.activeRecipe,cauldronIngredients:e.cauldronIngredients,shelfStock:e.shelfStock,status:e.status})}function He(){let e=Be(T(A));return e===null&&D(A),e}function Ue(){D(A)}var We=`alchemists-cauldron:difficulty`;function Ge(){let e=T(We);return i(e)?e:t}function Ke(e){E(We,e)}function N(e,t,n){let r=e.querySelector(t);if(!(r instanceof n))throw Error(`Element not found: ${t}`);return r}function P(e,t,n){let r=document.createElement(e);return r.className=t,n!==void 0&&(r.textContent=n),r}var qe=`−`;function F(e){return e<0?`${qe}${String(Math.abs(e))}`:String(e)}function Je(e){return e>0?`+${String(e)}`:F(e)}function Ye(e){return`${F(e.min)} – ${F(e.max)}`}function I(e){return String(e).padStart(2,`0`)}function Xe(e){let t=new Date(e),n=I(t.getDate()),r=I(t.getMonth()+1),i=`${I(t.getHours())}:${I(t.getMinutes())}`;return`${n}.${r}.${String(t.getFullYear())} ${i}`}var L=`viewBox="0 0 32 32" aria-hidden="true" focusable="false"`,R={compass:`<svg ${L}><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M16 3l3 10 10 3-10 3-3 10-3-10-10-3 10-3z"/></svg>`,clock:`<svg ${L}><circle cx="16" cy="17" r="12" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M16 10v7l5 3M12 3h8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,thermometer:`<svg ${L}><path d="M13 5a3 3 0 0 1 6 0v13a6 6 0 1 1-6 0z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="23" r="3.5" fill="currentColor"/><path d="M16 23V9" stroke="currentColor" stroke-width="2.5"/></svg>`,drop:`<svg ${L}><path fill="currentColor" d="M16 3C16 3 7 14 7 20a9 9 0 0 0 18 0C25 14 16 3 16 3z"/></svg>`,star:`<svg ${L}><path fill="currentColor" d="M16 2l3.5 8.5L28 8l-4 8 4 8-8.5-2.5L16 30l-3.5-8.5L4 24l4-8-4-8 8.5 2.5z"/><circle cx="16" cy="16" r="4" fill="#0d0b08"/></svg>`,book:`<svg ${L}><path d="M4 7c4-2 8-2 12 1 4-3 8-3 12-1v18c-4-2-8-2-12 1-4-3-8-3-12-1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 8v18" stroke="currentColor" stroke-width="2"/></svg>`,gear:`<svg ${L}><path fill="currentColor" d="M14 2h4l1 4 3 1.3 3.6-2.1 2.8 2.8-2.1 3.6L27.6 15l4 1v0l-4 1-1.3 3 2.1 3.6-2.8 2.8-3.6-2.1L19 26l-1 4h-4l-1-4-3-1.3-3.6 2.1-2.8-2.8 2.1-3.6L4.4 17l-4-1 4-1 1.3-3-2.1-3.6 2.8-2.8 3.6 2.1L13 6z"/><circle cx="16" cy="16" r="5" fill="#0d0b08"/></svg>`,heart:`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/><path fill="#fff" opacity="0.45" d="M6.5 7.2c-1.6.3-2.4 2-1.9 3.4.3-1.3 1.2-2.4 2.6-2.7z"/></svg>`},Ze=`
  <div class="frame">
    <header class="topbar" aria-label="Game status">
      <div class="topbar__panel topbar__panel--score">
        <span class="topbar__icon topbar__icon--compass">${R.compass}</span>
        <span class="topbar__label">Score:</span>
        <span class="topbar__value" data-score>0</span>
      </div>
      <div class="topbar__panel topbar__panel--time" data-timer>
        <span class="topbar__icon topbar__icon--clock">${R.clock}</span>
        <span class="topbar__label">Time:</span>
        <span class="topbar__value topbar__value--time" data-time>00:00</span>
        <span class="timer-bar"><span class="timer-bar__fill" data-time-bar></span></span>
      </div>
      <div class="topbar__panel topbar__panel--lives">
        <span class="lives" data-lives></span>
      </div>
    </header>

    <div class="tooltip" data-tooltip role="tooltip" hidden></div>
    <h1 class="title"><span class="title__text">Alchemist's Cauldron</span><span class="title__gem" aria-hidden="true"></span></h1>

    <main class="game" data-game>
      <section class="shelf-panel" aria-labelledby="shelf-title">
        <h2 class="plaque" id="shelf-title">Ingredients</h2>
        <div class="shelf" data-shelf></div>
      </section>

      <section class="cauldron-area" aria-label="Cauldron">
        <div class="cauldron cauldron--empty" data-cauldron>
          <div class="cauldron__stage">
            
  <svg class="cauldron__svg" viewBox="0 -40 520 470" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="cauldron-liquid" cx="50%" cy="45%" r="60%">
        <stop offset="0%" style="stop-color: var(--liquid-light)"/>
        <stop offset="55%" style="stop-color: var(--liquid-mid)"/>
        <stop offset="100%" style="stop-color: var(--liquid-dark)"/>
      </radialGradient>
      <radialGradient id="cauldron-body" cx="38%" cy="30%" r="75%">
        <stop offset="0%" stop-color="#585e52"/>
        <stop offset="35%" stop-color="#2b2f29"/>
        <stop offset="100%" stop-color="#070806"/>
      </radialGradient>
      <linearGradient id="cauldron-rim" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#7a8072"/>
        <stop offset="50%" stop-color="#2e322b"/>
        <stop offset="100%" stop-color="#121410"/>
      </linearGradient>
      <radialGradient id="cauldron-floor" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color: var(--floor-glow)"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <filter id="cauldron-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10"/>
      </filter>
      <filter id="cauldron-smoke" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="16"/>
      </filter>
      <radialGradient id="cauldron-bubble" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="35%" stop-color="#e6ff8a" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#7fc21e" stop-opacity="0.35"/>
      </radialGradient>
    </defs>

    <ellipse cx="260" cy="392" rx="250" ry="38" fill="url(#cauldron-floor)"/>
    <ellipse cx="260" cy="388" rx="215" ry="30" fill="#1c1e1b" stroke="#34372f" stroke-width="3"/>
    <ellipse cx="260" cy="388" rx="215" ry="30" fill="none" stroke="#0c0d0b" stroke-width="3" stroke-dasharray="26 6"/>
    <ellipse class="cauldron__ring" cx="260" cy="384" rx="178" ry="22" fill="none" stroke-width="5"/>

    <path d="M140 330l-22 56h30l18-46zM380 330l22 56h-30l-18-46zM248 352l-8 40h40l-8-40z" fill="#0f100e" stroke="#2c2f29" stroke-width="2"/>

    <path d="M62 150c-14 70 4 140 60 182 70 50 206 50 276 0 56-42 74-112 60-182z"
      fill="url(#cauldron-body)" stroke="#3b3f37" stroke-width="3"/>
    <path d="M92 190c-6 50 8 100 50 128" fill="none" stroke="rgb(255 255 255 / 10%)" stroke-width="10" stroke-linecap="round"/>

    <g class="cauldron__ornament" fill="none" stroke-width="3" stroke-linecap="round">
      <path d="M200 262c-30-4-50-26-44-50 4-14 20-16 26-6"/>
      <path d="M320 262c30-4 50-26 44-50-4-14-20-16-26-6"/>
      <path d="M190 300c-34 8-64-6-74-30"/>
      <path d="M330 300c34 8 64-6 74-30"/>
      <path d="M260 188v-16M260 336v14"/>
    </g>

    <g class="cauldron__emblem" fill="none">
      <circle cx="260" cy="262" r="56" stroke-width="7" class="cauldron__emblem-ring"/>
      <circle cx="260" cy="262" r="56" stroke-width="2"/>
      <path d="M260 222l38 64h-76z" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="260" cy="264" r="15" stroke-width="5"/>
    </g>

    <path d="M44 148c-34 0-38 54-2 58" fill="none" stroke="#2a2d27" stroke-width="13" stroke-linecap="round"/>
    <path d="M476 148c34 0 38 54 2 58" fill="none" stroke="#2a2d27" stroke-width="13" stroke-linecap="round"/>
    <path d="M44 148c-34 0-38 54-2 58" fill="none" stroke="rgb(255 255 255 / 12%)" stroke-width="3"/>
    <path d="M476 148c34 0 38 54 2 58" fill="none" stroke="rgb(255 255 255 / 12%)" stroke-width="3"/>

    <ellipse class="cauldron__liquid-glow" cx="260" cy="140" rx="200" ry="50" filter="url(#cauldron-blur)"/>
    <ellipse cx="260" cy="148" rx="205" ry="48" fill="#0b0c0a"/>
    <ellipse class="cauldron__liquid" cx="260" cy="150" rx="190" ry="40" fill="url(#cauldron-liquid)"/>
    <g class="cauldron__surface">
      <ellipse cx="260" cy="150" rx="120" ry="22" fill="none" stroke-width="2"/>
      <ellipse cx="260" cy="150" rx="70" ry="12" fill="none" stroke-width="2"/>
      <circle cx="195" cy="142" r="11"/>
      <circle cx="315" cy="156" r="9"/>
      <circle cx="245" cy="166" r="7"/>
      <circle cx="340" cy="138" r="6"/>
      <circle cx="160" cy="160" r="6"/>
      <circle cx="285" cy="132" r="5"/>
    </g>
    <ellipse cx="260" cy="148" rx="205" ry="48" fill="none" stroke="url(#cauldron-rim)" stroke-width="16"/>
    <ellipse cx="260" cy="142" rx="205" ry="46" fill="none" stroke="rgb(255 255 255 / 14%)" stroke-width="2"/>

    <g class="cauldron__fx">
      <g class="cauldron__smoke" filter="url(#cauldron-smoke)">
        <ellipse cx="150" cy="60" rx="55" ry="95" style="animation-delay: 0s"/>
        <ellipse cx="215" cy="40" rx="60" ry="110" style="animation-delay: 1.2s"/>
        <ellipse cx="285" cy="50" rx="60" ry="105" style="animation-delay: 2.4s"/>
        <ellipse cx="355" cy="65" rx="55" ry="95" style="animation-delay: 3.6s"/>
        <ellipse cx="250" cy="20" rx="70" ry="120" style="animation-delay: 0.6s"/>
      </g>
      <g class="cauldron__bubbles-svg">
        <circle cx="190" cy="140" r="14" style="animation-delay: 0s"/>
        <circle cx="240" cy="150" r="20" style="animation-delay: 0.7s"/>
        <circle cx="290" cy="138" r="12" style="animation-delay: 1.4s"/>
        <circle cx="330" cy="152" r="16" style="animation-delay: 2.1s"/>
        <circle cx="215" cy="160" r="9" style="animation-delay: 1s"/>
        <circle cx="270" cy="162" r="10" style="animation-delay: 2.6s"/>
        <circle cx="160" cy="150" r="8" style="animation-delay: 1.8s"/>
      </g>
      <g class="cauldron__sparks-svg">
        <circle cx="120" cy="130" r="2.5" style="animation-delay: 0s"/>
        <circle cx="160" cy="120" r="2" style="animation-delay: 1.5s"/>
        <circle cx="200" cy="130" r="3" style="animation-delay: 0.7s"/>
        <circle cx="235" cy="115" r="2" style="animation-delay: 2.3s"/>
        <circle cx="265" cy="125" r="2.5" style="animation-delay: 0.3s"/>
        <circle cx="300" cy="118" r="2" style="animation-delay: 1.9s"/>
        <circle cx="335" cy="128" r="3" style="animation-delay: 1.1s"/>
        <circle cx="370" cy="122" r="2" style="animation-delay: 2.7s"/>
        <circle cx="400" cy="132" r="2.5" style="animation-delay: 0.9s"/>
        <circle cx="180" cy="110" r="2" style="animation-delay: 3s"/>
        <circle cx="250" cy="105" r="2.5" style="animation-delay: 1.3s"/>
        <circle cx="320" cy="108" r="2" style="animation-delay: 2s"/>
      </g>
    </g>
  </svg>

            <div class="cauldron__floating" data-cauldron-floating aria-hidden="true"></div>
            <span class="cauldron__burst" aria-hidden="true"></span>
            <span class="cauldron__float-text" data-float-text aria-hidden="true"></span>
          </div>
          <p class="message" data-message role="status" aria-live="polite"></p>
        </div>
        <ol class="cauldron__list" data-cauldron-list aria-label="Ingredients in the cauldron"></ol>
      </section>

      <section class="book" aria-labelledby="recipe-title">
        <span class="book__ribbon" aria-hidden="true"></span>
        <div class="book__page">
          <h2 class="book__caption" id="recipe-title">Current Recipe</h2>
          <p class="book__name" data-recipe-name>Press Start Game</p>
          
  <svg class="book__sketch" viewBox="0 0 120 90" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M52 8h16M54 8v4h12V8M55 12v14c-12 4-20 14-20 27a25 25 0 0 0 50 0c0-13-8-23-20-27V12"/>
      <path d="M40 58c8 4 32 4 40 0"/>
      <path d="M48 40c3-4 6-7 10-8" opacity="0.7"/>
      <path d="M10 60c8-6 14 4 22-2M88 56c8-6 14 4 22-2M14 72c10-4 18 4 28 0M80 72c10-4 18 4 28 0" opacity="0.6"/>
    </g>
  </svg>

          <p class="book__counter" data-recipe-counter>Ingredients: 0 / 0</p>
          <dl class="book__ranges">
            <div class="book__range book__range--temperature">
              <dt><span class="book__icon">${R.thermometer}</span>Temp:</dt>
              <dd data-range-temperature>—</dd>
            </div>
            <div class="book__range book__range--density">
              <dt><span class="book__icon">${R.drop}</span>Density:</dt>
              <dd data-range-density>—</dd>
            </div>
            <div class="book__range book__range--magic">
              <dt><span class="book__icon">${R.star}</span>Magic:</dt>
              <dd data-range-magic>—</dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="bars" data-bars aria-label="Cauldron parameters"></section>
    </main>

    <footer class="controls">
      <button class="round-button" type="button" data-help>
        <span class="round-button__icon">${R.book}</span>
        <span class="round-button__label">Help</span>
      </button>
      <div class="controls__center">
        <button class="brew-button" type="button" data-start><span class="brew-button__text">Start Game</span></button>
        <button class="small-button" type="button" data-continue>Continue Game</button>
        <button class="brew-button" type="button" data-brew><span class="brew-button__text">Brew</span></button>
        <button class="small-button" type="button" data-pour-out>Pour Out <small>−10 s</small></button>
        <button class="small-button" type="button" data-pause>Pause</button>
        <span class="difficulty-badge" data-difficulty-badge>Medium</span>
      </div>
      <button class="round-button" type="button" data-menu>
        <span class="round-button__icon">${R.gear}</span>
        <span class="round-button__label">Settings</span>
      </button>
    </footer>
  </div>

  <dialog class="dialog" data-help-dialog aria-labelledby="help-title">
    <h2 class="dialog__title" id="help-title">How to play</h2>
    <ol class="dialog__list">
      <li>Press <b>Start Game</b>. You get a random recipe with 3 target ranges.</li>
      <li>Click ingredients on the shelf to add them to the cauldron (up to <span data-help-capacity>4</span>).</li>
      <li>Every ingredient changes <b>Temperature</b>, <b>Density</b> and <b>Magic Power</b>.</li>
      <li>Move all 3 markers into the green zones and press <b>Brew</b>. The check allows ±<span data-help-tolerance>8</span>.</li>
      <li>Success: +<span data-help-score>200</span> score, +<span data-help-bonus>10</span> s and a new recipe. Failure: −1 life.</li>
      <li>Hover an ingredient to see its numbers. Click it or drag it into the cauldron.</li>
      <li><b>Pour Out</b> empties the cauldron for −10 s without losing a life.</li>
      <li data-help-reactions-item>Reactions on this difficulty: <span data-help-reactions>none</span>.</li>
      <li>Choose Easy, Medium or Hard in <b>Settings</b> before the game starts.</li>
      <li>Keys during play: <kbd>1</kbd>–<kbd>8</kbd> add an ingredient, <kbd>B</kbd> brew, <kbd>O</kbd> pour out, <kbd>P</kbd> or <kbd>Esc</kbd> pause.</li>
      <li>Ingredient stock is limited and never refilled.</li>
      <li>The game ends when time runs out, lives reach 0 or ingredients run out.</li>
    </ol>
    <div class="dialog__actions">
      <button class="dialog-button dialog-button--primary" type="button" data-close>Got it</button>
    </div>
  </dialog>

  <dialog class="dialog" data-menu-dialog aria-labelledby="menu-title">
    <h2 class="dialog__title" id="menu-title">Settings</h2>
    <fieldset class="difficulty" data-difficulty-panel>
      <legend class="difficulty__legend">Difficulty</legend>
      <div class="difficulty__options" data-difficulty-options></div>
    </fieldset>
    <p class="dialog__text" data-difficulty-locked>Difficulty can be changed only before the game starts.</p>
    <div class="dialog__actions dialog__actions--column">
      <button class="dialog-button dialog-button--primary" type="button" data-resume-menu>Resume</button>
      <button class="dialog-button dialog-button--primary" type="button" data-continue>Continue Game</button>
      <button class="dialog-button dialog-button--primary" type="button" data-new-game>New Game</button>
      <button class="dialog-button" type="button" data-open-leaderboard>Leaderboard</button>
      <button class="dialog-button" type="button" data-close>Close</button>
    </div>
  </dialog>

  <dialog class="dialog" data-pause-dialog aria-labelledby="pause-title">
    <h2 class="dialog__title" id="pause-title">Paused</h2>
    <p class="dialog__text">The timer is stopped.</p>
    <div class="dialog__actions dialog__actions--column">
      <button class="dialog-button dialog-button--primary" type="button" data-resume>Resume</button>
      <button class="dialog-button" type="button" data-exit>Exit to Menu</button>
    </div>
  </dialog>

  <dialog class="dialog" data-game-over-dialog aria-labelledby="game-over-title">
    <h2 class="dialog__title" id="game-over-title">Game Over</h2>
    <p class="dialog__text" data-game-over-reason></p>
    <p class="dialog__score">Score: <span data-game-over-score>0</span></p>
    <form class="name-form" data-name-form novalidate>
      <label class="name-form__label" for="player-name">New Top-10 result! Enter your name:</label>
      <div class="name-form__row">
        <input class="name-form__input" id="player-name" name="playerName" type="text"
          maxlength="15" autocomplete="nickname" placeholder="2–15 characters" data-name-input />
        <button class="dialog-button dialog-button--primary" type="submit">Save</button>
      </div>
      <p class="name-form__error" data-name-error></p>
    </form>
    <p class="dialog__text dialog__text--success" data-saved-message></p>
    <div class="dialog__actions">
      <button class="dialog-button dialog-button--primary" type="button" data-play-again>Play again</button>
      <button class="dialog-button" type="button" data-open-leaderboard>Leaderboard</button>
      <button class="dialog-button" type="button" data-exit>Menu</button>
    </div>
  </dialog>

  <dialog class="dialog dialog--wide" data-leaderboard-dialog aria-labelledby="leaderboard-title">
    <h2 class="dialog__title" id="leaderboard-title">Top-10 Alchemists</h2>
    <div class="tabs" role="group" aria-label="Leaderboard difficulty" data-board-tabs></div>
    <div class="leaderboard">
      <table class="leaderboard__table">
        <thead>
          <tr><th scope="col">#</th><th scope="col">Name</th><th scope="col">Score</th><th scope="col">Difficulty</th><th scope="col">Date</th></tr>
        </thead>
        <tbody data-leaderboard-body></tbody>
      </table>
      <p class="leaderboard__empty" data-leaderboard-empty>No results yet.</p>
    </div>
    <div class="dialog__actions">
      <button class="dialog-button dialog-button--danger" type="button" data-clear-leaderboard>Clear Leaderboard</button>
      <button class="dialog-button dialog-button--primary" type="button" data-close>Close</button>
    </div>
  </dialog>

  <dialog class="dialog" data-confirm-dialog aria-labelledby="confirm-title">
    <h2 class="dialog__title" id="confirm-title">Clear the leaderboard?</h2>
    <p class="dialog__text">All saved results for <span data-confirm-difficulty>this difficulty</span> will be deleted.</p>
    <div class="dialog__actions">
      <button class="dialog-button dialog-button--danger" type="button" data-confirm-yes>Clear</button>
      <button class="dialog-button" type="button" data-close>Cancel</button>
    </div>
  </dialog>
`;function Qe(e){e.innerHTML=Ze;let t=N(e,`[data-game-over-dialog]`,HTMLDialogElement),n=N(e,`[data-menu-dialog]`,HTMLDialogElement);return{game:N(e,`[data-game]`,HTMLElement),helpButton:N(e,`[data-help]`,HTMLButtonElement),menuButton:N(e,`[data-menu]`,HTMLButtonElement),score:N(e,`[data-score]`,HTMLElement),time:N(e,`[data-time]`,HTMLElement),timeBar:N(e,`[data-time-bar]`,HTMLElement),timer:N(e,`[data-timer]`,HTMLElement),lives:N(e,`[data-lives]`,HTMLElement),shelf:N(e,`[data-shelf]`,HTMLElement),cauldron:N(e,`[data-cauldron]`,HTMLElement),cauldronList:N(e,`[data-cauldron-list]`,HTMLOListElement),message:N(e,`[data-message]`,HTMLElement),startButton:N(e,`[data-start]`,HTMLButtonElement),brewButton:N(e,`[data-brew]`,HTMLButtonElement),pauseButton:N(e,`[data-pause]`,HTMLButtonElement),recipeName:N(e,`[data-recipe-name]`,HTMLElement),recipeCounter:N(e,`[data-recipe-counter]`,HTMLElement),recipeRanges:{temperature:N(e,`[data-range-temperature]`,HTMLElement),density:N(e,`[data-range-density]`,HTMLElement),magicPower:N(e,`[data-range-magic]`,HTMLElement)},bars:N(e,`[data-bars]`,HTMLElement),helpDialog:N(e,`[data-help-dialog]`,HTMLDialogElement),menuDialog:n,resumeFromMenuButton:N(n,`[data-resume-menu]`,HTMLButtonElement),pauseDialog:N(e,`[data-pause-dialog]`,HTMLDialogElement),gameOverDialog:t,gameOverReason:N(t,`[data-game-over-reason]`,HTMLElement),gameOverScore:N(t,`[data-game-over-score]`,HTMLElement),nameForm:N(t,`[data-name-form]`,HTMLFormElement),nameInput:N(t,`[data-name-input]`,HTMLInputElement),nameError:N(t,`[data-name-error]`,HTMLElement),savedMessage:N(t,`[data-saved-message]`,HTMLElement),leaderboardDialog:N(e,`[data-leaderboard-dialog]`,HTMLDialogElement),leaderboardBody:N(e,`[data-leaderboard-body]`,HTMLElement),leaderboardEmpty:N(e,`[data-leaderboard-empty]`,HTMLElement),clearLeaderboardButton:N(e,`[data-clear-leaderboard]`,HTMLButtonElement),confirmDialog:N(e,`[data-confirm-dialog]`,HTMLDialogElement),confirmDifficulty:N(e,`[data-confirm-difficulty]`,HTMLElement),difficultyOptions:N(n,`[data-difficulty-options]`,HTMLElement),difficultyPanel:N(n,`[data-difficulty-panel]`,HTMLFieldSetElement),difficultyLocked:N(n,`[data-difficulty-locked]`,HTMLElement),difficultyBadge:N(e,`[data-difficulty-badge]`,HTMLElement),continueButtons:[...e.querySelectorAll(`[data-continue]`)],boardTabs:N(e,`[data-board-tabs]`,HTMLElement),helpCapacity:N(e,`[data-help-capacity]`,HTMLElement),helpTolerance:N(e,`[data-help-tolerance]`,HTMLElement),helpScore:N(e,`[data-help-score]`,HTMLElement),helpBonus:N(e,`[data-help-bonus]`,HTMLElement),helpReactions:N(e,`[data-help-reactions]`,HTMLElement),frame:N(e,`.frame`,HTMLElement),cauldronFloating:N(e,`[data-cauldron-floating]`,HTMLElement),floatText:N(e,`[data-float-text]`,HTMLElement),pourOutButton:N(e,`[data-pour-out]`,HTMLButtonElement),tooltip:N(e,`[data-tooltip]`,HTMLElement)}}var $e={temperature:R.thermometer,density:R.drop,magicPower:R.star};function z(e,t){return(Math.min(Math.max(e,t.min),t.max)-t.min)/(t.max-t.min)*100}function et(e,t,n){e.style.left=`${String(Math.min(t,n))}%`,e.style.width=`${String(Math.abs(n-t))}%`}function tt(e){let t=P(`div`,`bar__ticks`),n=(e.max-e.min)/4;for(let r=0;r<5;r+=1){let i=e.min+n*r,a=P(`span`,`bar__tick`,F(i));a.style.left=`${String(z(i,e))}%`,t.append(a)}return t}function nt(e){let t=P(`div`,`bar bar--${e.key}`),n=P(`span`,`bar__icon`);n.innerHTML=$e[e.key];let r=P(`div`,`bar__body`),i=P(`div`,`bar__header`),a=P(`span`,`bar__value`,`0`),o=P(`div`,`bar__track`),s=P(`span`,`bar__zone bar__zone--tolerance`),c=P(`span`,`bar__zone`),l=P(`span`,`bar__fill`),u=P(`span`,`bar__marker`);if(i.append(P(`span`,`bar__label`,e.label),a),o.append(l,s,c),e.min<0){let t=P(`span`,`bar__zero`);t.style.left=`${String(z(0,e))}%`,o.append(t)}return o.append(u),r.append(i,o,tt(e)),t.append(n,r),{root:t,value:a,zone:c,toleranceZone:s,fill:l,marker:u}}function rt(e){let t={temperature:nt(y.temperature),density:nt(y.density),magicPower:nt(y.magicPower)};return e.replaceChildren(...v.map(e=>t[e].root)),t}function it(e,t,n,r){v.forEach(i=>{let a=y[i],o=e[i],s=t[i],c=z(0,a),l=z(s,a);if(o.value.textContent=Je(s),et(o.fill,c,l),o.marker.style.left=`${String(l)}%`,o.root.classList.remove(`bar--match`,`bar--tolerance`),n===null){o.zone.hidden=!0,o.toleranceZone.hidden=!0;return}let u=n[i],d=b(u,r);o.zone.hidden=!1,o.toleranceZone.hidden=!1,et(o.zone,z(u.min,a),z(u.max,a)),et(o.toleranceZone,z(d.min,a),z(d.max,a));let f=ue(s,u,r);f!==`off`&&o.root.classList.add(`bar--${f}`)})}var B=`fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"`,at={drop:`<path fill="currentColor" d="M16 3C16 3 7 14 7 20a9 9 0 0 0 18 0C25 14 16 3 16 3z"/>`,sparkle:`<path fill="currentColor" d="M16 2l3 10 10 4-10 4-3 10-3-10-10-4 10-4z"/><circle fill="currentColor" cx="26" cy="6" r="2"/>`,snowflake:`<path ${B} d="M16 3v26M4.7 9.5l22.6 13M27.3 9.5L4.7 22.5"/><path ${B} d="M12 5l4 3 4-3M12 27l4-3 4 3"/>`,root:`<path ${B} d="M16 10v18M16 16c-4 2-7 6-8 11M16 16c4 2 7 6 8 11"/><path fill="currentColor" d="M16 10c-5 0-8-3-8-7 4 0 8 3 8 7zm0 0c5 0 8-3 8-7-4 0-8 3-8 7z"/>`,flask:`<path ${B} d="M12 3h8M13 3v9L6 26a2 2 0 0 0 1.8 3h16.4a2 2 0 0 0 1.8-3L19 12V3"/><path fill="currentColor" d="M9.5 21h13l2.5 5H7z"/>`,void:`<circle ${B} cx="16" cy="16" r="12"/><circle fill="currentColor" cx="16" cy="16" r="5"/>`,feather:`<path ${B} d="M27 4C15 5 8 13 6 28M27 4c-1 10-8 17-17 18M27 4L10 22"/>`,slime:`<path fill="currentColor" d="M5 24c0-8 5-15 11-15s11 7 11 15c0 3-3 4-5 2-2 3-5 3-6 0-2 3-5 3-6 0-2 2-5 1-5-2z"/><circle fill="#0d0b08" cx="12" cy="17" r="2"/><circle fill="#0d0b08" cx="20" cy="17" r="2"/>`};function ot(e,t){let n=document.createElement(`span`);return n.className=t,n.setAttribute(`aria-hidden`,`true`),n.innerHTML=`<svg viewBox="0 0 32 32" focusable="false">${at[e]}</svg>`,n}function st(e,t){let n=document.createElement(`span`);return n.className=t,n.setAttribute(`aria-hidden`,`true`),n.innerHTML=`
    <svg viewBox="0 0 64 76" focusable="false">
      <rect x="24" y="1" width="16" height="11" rx="2" fill="#9a6a3a" stroke="#4a2e14" stroke-width="1.5"/>
      <path d="M25 12h14v10c9 3 16 11 16 22a23 23 0 1 1-46 0c0-11 7-19 16-22z"
        fill="rgb(190 220 240 / 14%)" stroke="rgb(225 240 255 / 70%)" stroke-width="2"/>
      <path d="M11.4 40A21 21 0 1 0 52.6 40Z" fill="currentColor" opacity="0.85"/>
      <ellipse cx="32" cy="40" rx="20.6" ry="3.5" fill="currentColor"/>
      <path d="M17 34c3-5 7-8 11-9" fill="none" stroke="rgb(255 255 255 / 75%)" stroke-width="3" stroke-linecap="round"/>
      <g transform="translate(20 41) scale(0.75)" color="#ffffff">${at[e]}</g>
    </svg>`,n}function ct(e,t,n,r,i){let a=[];for(let e=0;e<i;e+=1){let t=r[e],n=P(`li`,`cauldron__slot`);t?(n.classList.add(`cauldron__slot--filled`,`ingredient--${t.id}`),n.title=t.name,n.append(ot(t.icon,`cauldron__icon`),P(`span`,`cauldron__name`,t.name))):n.setAttribute(`aria-hidden`,`true`),a.push(n)}t.replaceChildren(...a),n.replaceChildren(...r.map((e,t)=>ot(e.icon,`cauldron__floater cauldron__floater--${String(t%5)} ingredient--${e.id}`))),e.classList.toggle(`cauldron--empty`,r.length===0)}function lt(e){return[`${String(e.shelfSize)} ingredients`,`${String(e.startTime)} s`,`±${String(e.tolerance)}`,`${String(e.lives)} lives`,`+${String(e.scorePerBrew)}`].join(` · `)}function ut(t,i,a){t.replaceChildren(...n.map(t=>{let n=P(`button`,`difficulty__option`);return n.type=`button`,n.setAttribute(`aria-pressed`,String(t===i)),n.append(P(`span`,`difficulty__name`,r[t]),P(`span`,`difficulty__details`,lt(e[t]))),n.addEventListener(`click`,()=>{a(t)}),n}))}function dt(e,t,i){e.replaceChildren(...n.map(e=>{let n=P(`button`,`tabs__tab`,r[e]);return n.type=`button`,n.setAttribute(`aria-pressed`,String(e===t)),n.addEventListener(`click`,()=>{i(e)}),n}))}function ft(e,t,n){let r=t.status!==`menu`,i=n.startTime*S,a=r?t.timeLeft/i:0;e.time.textContent=_e(r?t.timeLeft:0),e.timeBar.style.width=`${String(Math.min(a,1)*100)}%`,e.timer.classList.toggle(`topbar__panel--danger`,t.status===`playing`&&t.timeLeft<15e3)}function pt(e,t){let n=[];for(let e=0;e<t;e+=1){let e=P(`span`,`lives__heart`);e.innerHTML=R.heart,n.push(e)}e.replaceChildren(...n),e.setAttribute(`aria-label`,`${String(t)} lives`)}function mt(e,t,n){e.score.textContent=String(t.score),ft(e,t,n),pt(e.lives,t.lives)}function ht(e,t,n){let i=n.map((e,t)=>{let n=P(`tr`,`leaderboard__row`);return n.append(P(`td`,`leaderboard__rank`,String(t+1)),P(`td`,`leaderboard__name`,e.name),P(`td`,`leaderboard__score`,String(e.score)),P(`td`,`leaderboard__difficulty`,r[e.difficulty]),P(`td`,`leaderboard__date`,Xe(e.date))),n});e.replaceChildren(...i),t.hidden=n.length>0}function gt(e,t,n){let r=t.activeRecipe,i=t.cauldronIngredients.length,a=n.maxCauldronIngredients;e.recipeName.textContent=r?.name??`Press Start Game`,e.recipeCounter.textContent=`Ingredients: ${String(i)} / ${String(a)}`,e.recipeCounter.classList.toggle(`book__counter--full`,i>=a),v.forEach(t=>{e.recipeRanges[t].textContent=r?Ye(r[t]):`—`})}function _t(e,t){e.classList.remove(t),e.getBoundingClientRect(),e.classList.add(t)}function vt(e,t,n,r,i){e.classList.remove(`cauldron--success`,`cauldron--fail`,`cauldron--reaction`),_t(e,`cauldron--${r}`),n.textContent=i,n.className=`cauldron__float-text`,_t(n,`cauldron__float-text--${r}`),r===`fail`&&_t(t,`frame--shake`)}var yt=`text/plain`;function bt(e){let t=P(`button`,`shelf-card shelf-card--empty ingredient--${e.id}`);return t.type=`button`,t.dataset.id=e.id,t.disabled=!0,t.tabIndex=-1,t.draggable=!1,t.setAttribute(`aria-label`,`${e.name}: out of stock`),t.append(P(`span`,`shelf-card__bottle`),P(`span`,`shelf-card__info`),P(`span`,`shelf-card__stock`,`0`)),t}function xt(e,t,n,r){if(t<=0)return bt(e);let i=P(`button`,`shelf-card ingredient--${e.id}`),a=P(`span`,`shelf-card__info`);return a.append(P(`span`,`shelf-card__name`,e.name)),i.type=`button`,i.dataset.id=e.id,i.disabled=n,i.draggable=!n,i.setAttribute(`aria-label`,`Add ${e.name}, ${String(t)} left`),i.append(st(e.icon,`shelf-card__bottle`),a,P(`span`,`shelf-card__stock`,String(t))),i.addEventListener(`click`,()=>{r.onAdd(e.id)}),i.addEventListener(`dragstart`,t=>{t.dataTransfer?.setData(yt,e.id),r.onHideTooltip()}),i.addEventListener(`mouseenter`,()=>{r.onShowTooltip(i,e)}),i.addEventListener(`focus`,()=>{r.onShowTooltip(i,e)}),i.addEventListener(`mouseleave`,r.onHideTooltip),i.addEventListener(`blur`,r.onHideTooltip),i}function St(e,t){let{ingredients:n,stock:r,isBlocked:i}=t;e.classList.toggle(`shelf--blocked`,i),e.replaceChildren(...n.map(e=>xt(e,d(r,e.id),i,t)))}var Ct=12,wt=[{key:`temperature`,label:`Temperature`,icon:R.thermometer},{key:`density`,label:`Density`,icon:R.drop},{key:`magicPower`,label:`Magic Power`,icon:R.star}];function Tt(e,t,n){let r=P(`div`,`tooltip__header`);r.append(ot(n.icon,`tooltip__icon`),P(`span`,`tooltip__name`,n.name));let i=P(`dl`,`tooltip__list`);wt.forEach(({key:e,label:t,icon:r})=>{let a=P(`div`,`tooltip__row tooltip__row--${e}`),o=P(`dt`,`tooltip__term`),s=P(`span`,`tooltip__row-icon`);s.innerHTML=r,o.append(s,t),a.append(o,P(`dd`,`tooltip__value`,Je(n[e]))),i.append(a)}),e.className=`tooltip ingredient--${n.id}`,e.replaceChildren(r,i),e.hidden=!1;let a=t.getBoundingClientRect(),o=e.getBoundingClientRect(),s=a.right+Ct+o.width>window.innerWidth,c=a.top+o.height>window.innerHeight;e.classList.toggle(`tooltip--left`,s),e.classList.toggle(`tooltip--up`,c),e.style.left=`${String(s?a.left-Ct-o.width:a.right+Ct)}px`,e.style.top=`${String(c?a.bottom-o.height:a.top)}px`}function Et(e){e.hidden=!0}var Dt=250,Ot=1e3,kt={time:`Time is up!`,lives:`No lives left!`,ingredients:`Out of ingredients`},V=Qe(N(document,`#app`,HTMLDivElement)),At=rt(V.bars),H=ye(Ge()),U=He()!==null,W=H.difficulty,jt=0;function G(){return e[H.difficulty]}function K(){return H.status===`playing`||H.status===`paused`}function q(e){e.open||e.showModal()}function J(e){e.open&&e.close()}function Mt(){K()?(Ve(H),jt=Date.now()):H.status===`game-over`&&(Ue(),U=!1)}function Y(e,t){V.message.textContent=e,V.message.className=`message`,V.message.getBoundingClientRect(),V.message.classList.add(`message--${t}`)}function X(){V.message.textContent=``,V.message.className=`message`}function Nt(e){V.helpCapacity.textContent=String(e.maxCauldronIngredients),V.helpTolerance.textContent=String(e.tolerance),V.helpScore.textContent=String(e.scorePerBrew),V.helpBonus.textContent=String(e.timeBonus),V.helpReactions.textContent=ie(H.difficulty).map(e=>`${e.name} (${e.description})`).join(`, `)||`none`}function Pt(){let e=K();ut(V.difficultyOptions,H.difficulty,Ft),V.difficultyPanel.disabled=e,V.difficultyPanel.hidden=e,V.difficultyLocked.hidden=!e,V.resumeFromMenuButton.hidden=H.status!==`paused`,V.continueButtons.forEach(t=>{t.hidden=e||!U})}function Z(){let e=G(),t=H.status===`playing`,n=K();mt(V,H,e),St(V.shelf,{ingredients:ve(e),stock:H.shelfStock,isBlocked:!t||p(H,e),onAdd:$,onShowTooltip:(e,t)=>{H.status===`playing`&&Tt(V.tooltip,e,t)},onHideTooltip:()=>{Et(V.tooltip)}}),ct(V.cauldron,V.cauldronList,V.cauldronFloating,H.cauldronIngredients,e.maxCauldronIngredients),gt(V,H,e),it(At,ae(H.cauldronIngredients,H.difficulty),H.activeRecipe,e.tolerance),Nt(e),Pt(),V.startButton.hidden=n,N(V.startButton,`.brew-button__text`,HTMLElement).textContent=H.status===`game-over`?`Play again`:`Start Game`,V.brewButton.hidden=!n,V.pauseButton.hidden=!n,V.pourOutButton.hidden=!n,V.pourOutButton.disabled=!t||H.cauldronIngredients.length===0,V.brewButton.disabled=!t||H.cauldronIngredients.length===0,V.pauseButton.disabled=!t,V.difficultyBadge.textContent=r[H.difficulty],V.game.classList.toggle(`game--paused`,H.status===`paused`),t||Et(V.tooltip),Mt()}function Ft(e){K()||(Ke(e),H=ye(e),X(),Z())}function Q(){if(H.gameOverReason===null)return;let e=Ne(H.score,H.difficulty);V.gameOverReason.textContent=kt[H.gameOverReason],V.gameOverScore.textContent=String(H.score),V.nameForm.hidden=!e,V.nameInput.value=``,V.nameError.textContent=``,V.savedMessage.textContent=``,q(V.gameOverDialog),e&&V.nameInput.focus()}function It(){J(V.gameOverDialog),J(V.menuDialog),H=be(H.difficulty,G(),Date.now()),U=!1,X(),Z()}function Lt(){let e=He();J(V.menuDialog),U=!1,e===null?Z():(H=we(e),X(),Z(),q(V.pauseDialog))}function Rt(){J(V.pauseDialog),J(V.gameOverDialog),Ue(),U=!1,H=ye(H.difficulty),X(),Z()}function zt(){H.status===`playing`&&(H=w(H,Date.now()),H.status===`game-over`?(Z(),Q()):(ft(V,H,G()),Date.now()-jt>=Ot&&Mt()))}function Bt(){H=xe(H,Date.now()),Z(),H.status===`paused`?q(V.pauseDialog):H.status===`game-over`&&Q()}function Vt(){J(V.pauseDialog),H=Se(H,Date.now()),Z()}function Ht(e){let t=e.find(e=>e.onFire!==void 0)??e.at(-1);if(t===void 0)return;let n=e.filter(e=>e!==t).map(e=>e.name),r=n.length>0?` (+ ${n.join(`, `)})`:``;Y(`${t.name}! ${t.description}${r}`,`reaction`),vt(V.cauldron,V.frame,V.floatText,`reaction`,t.name)}function $(e){if(H.status!==`playing`)return;let t=De(H,e,G(),Date.now());if(H=t.state,Z(),Ht(t.fired),H.status===`game-over`){Q();return}let n=V.shelf.querySelector(`[data-id="${e}"]`);n&&!n.disabled&&n.focus()}function Ut(){H.status===`playing`&&H.cauldronIngredients.length!==0&&(H=Oe(H,Date.now()),Y(`Poured out. −10 s`,`fail`),Z(),H.status===`game-over`&&Q())}function Wt(){return H.status===`playing`&&!p(H,G())}function Gt(){let e=V.cauldron;e.addEventListener(`dragover`,t=>{Wt()&&(t.preventDefault(),e.classList.add(`cauldron--drop`))}),e.addEventListener(`dragleave`,t=>{(!(t.relatedTarget instanceof Node)||!e.contains(t.relatedTarget))&&e.classList.remove(`cauldron--drop`)}),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`cauldron--drop`);let n=t.dataTransfer?.getData(`text/plain`)??``;n!==``&&Wt()&&$(n)})}function Kt(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}function qt(e){if(H.status!==`playing`||e.repeat||e.ctrlKey||e.metaKey||e.altKey||Kt(e.target)||document.querySelector(`dialog[open]`)!==null)return;let t=e.key.toLowerCase(),n=Number(t)-1,r=ve(G())[n];if(/^[1-8]$/.test(t))r&&(e.preventDefault(),$(r.id));else switch(t){case`b`:e.preventDefault(),Jt();break;case`o`:e.preventDefault(),Ut();break;case`p`:case`escape`:e.preventDefault(),Bt()}}function Jt(){if(zt(),H.status!==`playing`)return;let e=G(),t=Ce(H,e,Date.now());H=t.state,Z(),t.isSuccess?(Y(`Potion brewed! +${String(e.scorePerBrew)} score`,`success`),vt(V.cauldron,V.frame,V.floatText,`success`,`+${String(e.timeBonus)}s`)):(Y(`The potion failed. −1 life`,`fail`),vt(V.cauldron,V.frame,V.floatText,`fail`,`−1 ♥`)),H.status===`game-over`&&Q()}function Yt(){let e=k(W);dt(V.boardTabs,W,e=>{W=e,Yt()}),ht(V.leaderboardBody,V.leaderboardEmpty,e),V.clearLeaderboardButton.disabled=e.length===0,V.confirmDifficulty.textContent=r[W]}function Xt(){W=H.difficulty,Yt(),q(V.leaderboardDialog)}function Zt(e){if(e.preventDefault(),!le(V.nameInput.value)){V.nameError.textContent=`Use 2–15 characters: letters, digits, space, _ or -.`,V.nameInput.focus();return}let t=Pe({name:ce(V.nameInput.value),score:H.score,date:Date.now(),difficulty:H.difficulty});V.nameForm.hidden=!0,V.savedMessage.textContent=`Saved! Your rank: ${String(t)}`}function Qt(){V.startButton.addEventListener(`click`,It),V.brewButton.addEventListener(`click`,Jt),V.pauseButton.addEventListener(`click`,Bt),V.pourOutButton.addEventListener(`click`,Ut),document.addEventListener(`keydown`,qt),Gt(),V.continueButtons.forEach(e=>{e.addEventListener(`click`,Lt)}),V.menuButton.addEventListener(`click`,()=>{H.status===`playing`&&(H=xe(H,Date.now()),Z()),Pt(),q(V.menuDialog)}),V.resumeFromMenuButton.addEventListener(`click`,()=>{J(V.menuDialog),Vt()}),V.menuDialog.addEventListener(`close`,()=>{H.status===`paused`&&q(V.pauseDialog)}),V.helpButton.addEventListener(`click`,()=>{H.status===`playing`&&(H=xe(H,Date.now()),Z()),q(V.helpDialog)}),V.helpDialog.addEventListener(`close`,()=>{H.status===`paused`&&q(V.pauseDialog)}),N(V.menuDialog,`[data-new-game]`,HTMLButtonElement).addEventListener(`click`,It),N(V.pauseDialog,`[data-resume]`,HTMLButtonElement).addEventListener(`click`,Vt),V.pauseDialog.addEventListener(`cancel`,e=>{e.preventDefault(),Vt()}),N(V.gameOverDialog,`[data-play-again]`,HTMLButtonElement).addEventListener(`click`,It),document.querySelectorAll(`[data-exit]`).forEach(e=>{e.addEventListener(`click`,Rt)}),document.querySelectorAll(`[data-open-leaderboard]`).forEach(e=>{e.addEventListener(`click`,Xt)}),document.querySelectorAll(`[data-close]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`dialog`);t&&J(t)})}),V.clearLeaderboardButton.addEventListener(`click`,()=>{q(V.confirmDialog)}),N(V.confirmDialog,`[data-confirm-yes]`,HTMLButtonElement).addEventListener(`click`,()=>{Fe(W),J(V.confirmDialog),Yt()}),V.nameForm.addEventListener(`submit`,Zt),document.addEventListener(`visibilitychange`,()=>{document.hidden&&H.status===`playing`&&Bt()}),window.addEventListener(`pagehide`,()=>{H=w(H,Date.now()),Mt()})}Qt(),Z(),window.setInterval(zt,Dt);
//# sourceMappingURL=index-IbQ6zAKw.js.map