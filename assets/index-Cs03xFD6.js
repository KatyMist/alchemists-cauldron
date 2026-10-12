(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={easy:{shelfSize:4,maxCauldronIngredients:4,startTime:180,tolerance:12,lives:5,scorePerBrew:100,timeBonus:15,reactionCount:0},medium:{shelfSize:6,maxCauldronIngredients:4,startTime:150,tolerance:8,lives:3,scorePerBrew:200,timeBonus:10,reactionCount:2},hard:{shelfSize:8,maxCauldronIngredients:5,startTime:150,tolerance:5,lives:3,scorePerBrew:300,timeBonus:5,reactionCount:3}},t=`medium`,n=[{id:`dragon-tears`,name:`Dragon Tears`,icon:`drop`,temperature:25,density:8,magicPower:10},{id:`fairy-dust`,name:`Fairy Dust`,icon:`sparkle`,temperature:12,density:9,magicPower:12},{id:`frost-lotus`,name:`Frost Lotus`,icon:`snowflake`,temperature:-18,density:4,magicPower:14},{id:`mandrake-root`,name:`Mandrake Root`,icon:`root`,temperature:-5,density:20,magicPower:8},{id:`caustic-acid`,name:`Caustic Acid`,icon:`flask`,temperature:10,density:14,magicPower:22},{id:`essence-of-the-void`,name:`Essence of the Void`,icon:`void`,temperature:-20,density:-10,magicPower:40},{id:`phoenix-feather`,name:`Phoenix Feather`,icon:`feather`,temperature:50,density:-10,magicPower:30},{id:`toad-slime`,name:`Toad Slime`,icon:`slime`,temperature:5,density:30,magicPower:0}];function r(e,t){return Math.floor(Math.random()*(t-e+1))+e}function i(e){return e[r(0,e.length-1)]}var a=2,o=15;function s(e){let t={};return e.forEach(e=>{t[e.id]=r(a,o)}),t}function c(e,t){return e[t]??0}function l(e){return Object.values(e).every(e=>e<=0)}function u(e,t){return e.cauldronIngredients.length>=t.maxCauldronIngredients}function d(e,t,n){return e.status===`playing`&&!u(e,n)&&c(e.shelfStock,t)>0}function f(e,t,r){let i=n.find(e=>e.id===t);return!i||!d(e,t,r)?e:{...e,cauldronIngredients:[...e.cauldronIngredients,i],shelfStock:{...e.shelfStock,[t]:c(e.shelfStock,t)-1}}}function p(e){return e.reduce((e,t)=>({temperature:e.temperature+t.temperature,density:e.density+t.density,magicPower:e.magicPower+t.magicPower}),{temperature:0,density:0,magicPower:0})}var ee=/^[\p{L}\d _-]{2,15}$/u;function m(e){return e.trim()}function te(e){return ee.test(m(e))}var h=[`temperature`,`density`,`magicPower`],g={temperature:{key:`temperature`,label:`Temperature`,min:-100,max:100},density:{key:`density`,label:`Density`,min:-100,max:100},magicPower:{key:`magicPower`,label:`Magic Power`,min:0,max:160}};function _(e,t){return{min:e.min-t,max:e.max+t}}function v(e,t){return e>=t.min&&e<=t.max}function ne(e,t,n){return v(e,t)?`match`:v(e,_(t,n))?`tolerance`:`off`}function re(e,t,n){return h.every(r=>v(e[r],_(t[r],n)))}var ie=[[`easy`,`Moon Mist`,[32,42],[12,22],[17,27]],[`easy`,`Root Bloom`,[2,12],[24,34],[15,25]],[`easy`,`Frost Steam`,[2,12],[7,17],[19,29]],[`easy`,`Quiet Swirl`,[-28,-18],[19,29],[17,27]],[`easy`,`Bright Dew`,[27,37],[32,42],[25,35]],[`easy`,`Snow Dust`,[-16,-6],[28,38],[29,39]],[`medium`,`Acid Spark`,[17,27],[18,28],[29,39]],[`medium`,`Void Ember`,[0,10],[0,10],[45,55]],[`medium`,`Heavy Acid`,[0,10],[29,39],[25,35]],[`medium`,`Frost Acid`,[-13,-3],[13,23],[31,41]],[`medium`,`Dusty Void`,[-13,-3],[0,10],[47,57]],[`medium`,`Dragon Void`,[25,35],[1,11],[55,65]],[`medium`,`Rooted Night`,[-18,-8],[14,24],[55,65]],[`hard`,`Phoenix Pulse`,[57,67],[0,10],[37,47]],[`hard`,`Slime Crown`,[-5,5],[45,55],[3,13]],[`hard`,`Void Flame`,[25,35],[0,10],[60,70]],[`hard`,`Acid Bog`,[10,20],[39,49],[17,27]],[`hard`,`Frozen Ash`,[27,37],[0,10],[39,49]],[`hard`,`Triple Eclipse`,[-20,-10],[19,29],[60,70]],[`hard`,`Ember Soup`,[62,72],[24,34],[37,47]]].map(([e,t,n,r,i])=>({id:t.toLowerCase().replace(/\s+/g,`-`),name:t,difficulty:e,temperature:{min:n[0],max:n[1]},density:{min:r[0],max:r[1]},magicPower:{min:i[0],max:i[1]}}));function ae(e){return ie.filter(t=>t.difficulty===e)}function y(e){return i(ae(e))??null}var b=1e3;15*b;function oe(e,t){return Math.max(0,e-t)}function se(e,t,n){return Math.min(e+t,n)}function ce(e){let t=Math.ceil(e/b),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`}function x(e){return n.slice(0,e.shelfSize)}function S(e){return{status:`menu`,difficulty:e,score:0,timeLeft:0,endTime:null,lives:0,activeRecipe:null,cauldronIngredients:[],shelfStock:{},gameOverReason:null}}function le(e,t,n){let r=t.startTime*b;return{status:`playing`,difficulty:e,score:0,timeLeft:r,endTime:n+r,lives:t.lives,activeRecipe:y(e),cauldronIngredients:[],shelfStock:s(x(t)),gameOverReason:null}}function C(e,t){return{...e,status:`game-over`,endTime:null,gameOverReason:t}}function w(e,t){if(e.status!==`playing`||e.endTime===null)return e;let n=oe(e.endTime,t),r={...e,timeLeft:n};return n<=0?C(r,`time`):r}function T(e,t){if(e.status!==`playing`)return e;let n=w(e,t);return n.status===`playing`?{...n,status:`paused`,endTime:null}:n}function ue(e,t){return e.status===`paused`?{...e,status:`playing`,endTime:t+e.timeLeft}:e}function de(e,t,n){let r=w(e,n);if(r.status!==`playing`||r.activeRecipe===null||r.cauldronIngredients.length===0)return{state:r,isSuccess:!1};let i=re(p(r.cauldronIngredients),r.activeRecipe,t.tolerance),a={...r,cauldronIngredients:[]},o;if(i){let e=se(r.timeLeft,t.timeBonus*b,t.startTime*b);o={...a,score:r.score+t.scorePerBrew,timeLeft:e,endTime:n+e,activeRecipe:y(r.difficulty)}}else o={...a,lives:r.lives-1};return o.lives<=0?{state:C(o,`lives`),isSuccess:i}:l(o.shelfStock)?{state:C(o,`ingredients`),isSuccess:i}:{state:o,isSuccess:i}}var E=`alchemists-cauldron:leaderboard`,D=10;function fe(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.name==`string`&&typeof t.score==`number`&&Number.isFinite(t.score)&&typeof t.date==`number`&&Number.isFinite(t.date)}function O(e){return[...e].sort((e,t)=>t.score-e.score||e.date-t.date)}function k(){try{let e=localStorage.getItem(E);if(e===null)return[];let t=JSON.parse(e);return Array.isArray(t)?O(t.filter(fe)).slice(0,D):[]}catch{return[]}}function pe(e){try{localStorage.setItem(E,JSON.stringify(e))}catch{}}function me(e){if(e<=0)return!1;let t=k()[9];return t===void 0||e>t.score}function he(e){let t=O([...k(),e]).slice(0,D);return pe(t),t.indexOf(e)+1}function ge(){try{localStorage.removeItem(E)}catch{}}function A(e,t,n){let r=e.querySelector(t);if(!(r instanceof n))throw Error(`Element not found: ${t}`);return r}function j(e,t,n){let r=document.createElement(e);return r.className=t,n!==void 0&&(r.textContent=n),r}function M(e){return e>0?`+${String(e)}`:e<0?`−${String(Math.abs(e))}`:`0`}function _e(e){return`${String(e.min)}..${String(e.max)}`}function N(e){return String(e).padStart(2,`0`)}function ve(e){let t=new Date(e),n=N(t.getDate()),r=N(t.getMonth()+1),i=`${N(t.getHours())}:${N(t.getMinutes())}`;return`${n}.${r}.${String(t.getFullYear())} ${i}`}function P(e,t){return(Math.min(Math.max(e,t.min),t.max)-t.min)/(t.max-t.min)*100}function F(e,t,n){e.style.left=`${String(Math.min(t,n))}%`,e.style.width=`${String(Math.abs(n-t))}%`}function I(e){let t=j(`div`,`bar bar--${e.key}`),n=j(`div`,`bar__header`),r=j(`span`,`bar__value`,`0`),i=j(`span`,`bar__target`,``),a=j(`div`,`bar__track`),o=j(`span`,`bar__zone bar__zone--tolerance`),s=j(`span`,`bar__zone`),c=j(`span`,`bar__fill`),l=j(`span`,`bar__marker`);if(n.append(j(`span`,`bar__label`,e.label),r),a.append(o,s,c,l),e.min<0){let t=j(`span`,`bar__zero`);t.style.left=`${String(P(0,e))}%`,a.append(t)}return t.append(n,a,i),{root:t,value:r,target:i,zone:s,toleranceZone:o,fill:c,marker:l}}function ye(e){let t={temperature:I(g.temperature),density:I(g.density),magicPower:I(g.magicPower)};return e.replaceChildren(...h.map(e=>t[e].root)),t}function be(e,t,n,r){h.forEach(i=>{let a=g[i],o=e[i],s=t[i],c=P(0,a),l=P(s,a);if(o.value.textContent=M(s),F(o.fill,c,l),o.marker.style.left=`${String(l)}%`,o.root.classList.remove(`bar--match`,`bar--tolerance`),n===null){o.zone.hidden=!0,o.toleranceZone.hidden=!0,o.target.textContent=``;return}let u=n[i],d=_(u,r);o.zone.hidden=!1,o.toleranceZone.hidden=!1,F(o.zone,P(u.min,a),P(u.max,a)),F(o.toleranceZone,P(d.min,a),P(d.max,a)),o.target.textContent=`Target ${_e(u)} (±${String(r)})`;let f=ne(s,u,r);f!==`off`&&o.root.classList.add(`bar--${f}`)})}var L=`fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"`,xe={drop:`<path fill="currentColor" d="M16 3C16 3 7 14 7 20a9 9 0 0 0 18 0C25 14 16 3 16 3z"/>`,sparkle:`<path fill="currentColor" d="M16 2l3 10 10 4-10 4-3 10-3-10-10-4 10-4z"/><circle fill="currentColor" cx="26" cy="6" r="2"/>`,snowflake:`<path ${L} d="M16 3v26M4.7 9.5l22.6 13M27.3 9.5L4.7 22.5"/><path ${L} d="M12 5l4 3 4-3M12 27l4-3 4 3"/>`,root:`<path ${L} d="M16 10v18M16 16c-4 2-7 6-8 11M16 16c4 2 7 6 8 11"/><path fill="currentColor" d="M16 10c-5 0-8-3-8-7 4 0 8 3 8 7zm0 0c5 0 8-3 8-7-4 0-8 3-8 7z"/>`,flask:`<path ${L} d="M12 3h8M13 3v9L6 26a2 2 0 0 0 1.8 3h16.4a2 2 0 0 0 1.8-3L19 12V3"/><path fill="currentColor" d="M9.5 21h13l2.5 5H7z"/>`,void:`<circle ${L} cx="16" cy="16" r="12"/><circle fill="currentColor" cx="16" cy="16" r="5"/>`,feather:`<path ${L} d="M27 4C15 5 8 13 6 28M27 4c-1 10-8 17-17 18M27 4L10 22"/>`,slime:`<path fill="currentColor" d="M5 24c0-8 5-15 11-15s11 7 11 15c0 3-3 4-5 2-2 3-5 3-6 0-2 3-5 3-6 0-2 2-5 1-5-2z"/><circle fill="var(--color-bg)" cx="12" cy="17" r="2"/><circle fill="var(--color-bg)" cx="20" cy="17" r="2"/>`};function R(e,t){let n=document.createElement(`span`);return n.className=t,n.setAttribute(`aria-hidden`,`true`),n.innerHTML=`<svg viewBox="0 0 32 32" focusable="false">${xe[e]}</svg>`,n}function Se(e,t,n){let r=[];for(let e=0;e<n;e+=1){let n=t[e],i=j(`li`,`cauldron__slot`);n?(i.classList.add(`cauldron__slot--filled`,`ingredient--${n.id}`),i.append(R(n.icon,`cauldron__icon`),j(`span`,`cauldron__name`,n.name))):i.setAttribute(`aria-hidden`,`true`),r.push(i)}e.replaceChildren(...r)}var Ce=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>`;function z(e,t,n){let r=t.status!==`menu`,i=n.startTime*b,a=r?t.timeLeft/i:0;e.time.textContent=ce(r?t.timeLeft:0),e.timeBar.style.width=`${String(Math.min(a,1)*100)}%`,e.timer.classList.toggle(`hud__item--danger`,t.status===`playing`&&t.timeLeft<15e3)}function we(e,t){let n=[];for(let e=0;e<t;e+=1){let e=j(`span`,`lives__heart`);e.innerHTML=Ce,n.push(e)}e.replaceChildren(...n),e.setAttribute(`aria-label`,`${String(t)} lives`)}function Te(e,t,n){e.score.textContent=String(t.score),z(e,t,n),we(e.lives,t.lives)}var Ee=`
  <header class="header">
    <h1 class="header__title">Alchemist's Cauldron</h1>
    <div class="header__actions">
      <button class="button button--small" type="button" data-help>Help</button>
      <button class="button button--small" type="button" data-menu>Menu</button>
    </div>
  </header>

  <section class="hud" aria-label="Game status">
    <div class="hud__item">
      <span class="hud__label">Score</span>
      <span class="hud__value" data-score>0</span>
    </div>
    <div class="hud__item hud__item--timer" data-timer>
      <span class="hud__label">Time</span>
      <span class="hud__value" data-time>00:00</span>
      <span class="timer-bar"><span class="timer-bar__fill" data-time-bar></span></span>
    </div>
    <div class="hud__item">
      <span class="hud__label">Lives</span>
      <span class="lives" data-lives></span>
    </div>
  </section>

  <main class="game" data-game>
    <section class="panel shelf-panel" aria-labelledby="shelf-title">
      <h2 class="panel__title" id="shelf-title">Ingredient Shelf</h2>
      <div class="shelf" data-shelf></div>
    </section>

    <section class="panel cauldron-panel" aria-labelledby="cauldron-title">
      <h2 class="panel__title" id="cauldron-title">Cauldron</h2>
      <div class="cauldron">
        <div class="cauldron__pot">
          <ol class="cauldron__list" data-cauldron-list aria-label="Ingredients in the cauldron"></ol>
        </div>
      </div>
      <p class="message" data-message role="status" aria-live="polite"></p>
      <div class="actions">
        <button class="button button--primary" type="button" data-start>Start Game</button>
        <button class="button button--primary" type="button" data-brew>Brew</button>
        <button class="button" type="button" data-pause>Pause</button>
      </div>
    </section>

    <section class="panel recipe-panel" aria-labelledby="recipe-title">
      <h2 class="panel__title" id="recipe-title">Recipe</h2>
      <p class="recipe__name" data-recipe-name>Press Start Game</p>
      <p class="recipe__counter" data-recipe-counter>Ingredients: 0 / 0</p>
      <div class="bars" data-bars></div>
    </section>
  </main>

  <dialog class="dialog" data-help-dialog aria-labelledby="help-title">
    <h2 class="dialog__title" id="help-title">How to play</h2>
    <ol class="dialog__list">
      <li>Press <b>Start Game</b>. You get a random recipe with 3 target ranges.</li>
      <li>Click ingredients on the shelf to add them to the cauldron (up to 4).</li>
      <li>Every ingredient changes <b>Temperature</b>, <b>Density</b> and <b>Magic Power</b>.</li>
      <li>Move all 3 values into the target zones and press <b>Brew</b>. The check allows ±8.</li>
      <li>Success: +200 score, +10 s and a new recipe. Failure: −1 life.</li>
      <li>Ingredient stock is limited and never refilled.</li>
      <li>The game ends when time runs out, lives reach 0 or ingredients run out.</li>
    </ol>
    <div class="dialog__actions">
      <button class="button button--primary" type="button" data-close>Got it</button>
    </div>
  </dialog>

  <dialog class="dialog" data-menu-dialog aria-labelledby="menu-title">
    <h2 class="dialog__title" id="menu-title">Menu</h2>
    <div class="dialog__actions dialog__actions--column">
      <button class="button button--primary" type="button" data-new-game>New Game</button>
      <button class="button" type="button" data-open-leaderboard>Leaderboard</button>
      <button class="button" type="button" data-close>Close</button>
    </div>
  </dialog>

  <dialog class="dialog" data-pause-dialog aria-labelledby="pause-title">
    <h2 class="dialog__title" id="pause-title">Paused</h2>
    <p class="dialog__text">The timer is stopped.</p>
    <div class="dialog__actions dialog__actions--column">
      <button class="button button--primary" type="button" data-resume>Resume</button>
      <button class="button" type="button" data-exit>Exit to Menu</button>
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
        <button class="button button--primary" type="submit">Save</button>
      </div>
      <p class="name-form__error" data-name-error></p>
    </form>
    <p class="dialog__text dialog__text--success" data-saved-message></p>
    <div class="dialog__actions">
      <button class="button button--primary" type="button" data-play-again>Play again</button>
      <button class="button" type="button" data-open-leaderboard>Leaderboard</button>
      <button class="button" type="button" data-exit>Menu</button>
    </div>
  </dialog>

  <dialog class="dialog dialog--wide" data-leaderboard-dialog aria-labelledby="leaderboard-title">
    <h2 class="dialog__title" id="leaderboard-title">Top-10 Alchemists</h2>
    <div class="leaderboard">
      <table class="leaderboard__table">
        <thead>
          <tr><th scope="col">#</th><th scope="col">Name</th><th scope="col">Score</th><th scope="col">Date</th></tr>
        </thead>
        <tbody data-leaderboard-body></tbody>
      </table>
      <p class="leaderboard__empty" data-leaderboard-empty>No results yet.</p>
    </div>
    <div class="dialog__actions">
      <button class="button button--danger" type="button" data-clear-leaderboard>Clear Leaderboard</button>
      <button class="button button--primary" type="button" data-close>Close</button>
    </div>
  </dialog>

  <dialog class="dialog" data-confirm-dialog aria-labelledby="confirm-title">
    <h2 class="dialog__title" id="confirm-title">Clear the leaderboard?</h2>
    <p class="dialog__text">All saved results will be deleted.</p>
    <div class="dialog__actions">
      <button class="button button--danger" type="button" data-confirm-yes>Clear</button>
      <button class="button" type="button" data-close>Cancel</button>
    </div>
  </dialog>
`;function De(e){e.innerHTML=Ee;let t=A(e,`[data-game-over-dialog]`,HTMLDialogElement);return{game:A(e,`[data-game]`,HTMLElement),helpButton:A(e,`[data-help]`,HTMLButtonElement),menuButton:A(e,`[data-menu]`,HTMLButtonElement),score:A(e,`[data-score]`,HTMLElement),time:A(e,`[data-time]`,HTMLElement),timeBar:A(e,`[data-time-bar]`,HTMLElement),timer:A(e,`[data-timer]`,HTMLElement),lives:A(e,`[data-lives]`,HTMLElement),shelf:A(e,`[data-shelf]`,HTMLElement),cauldronList:A(e,`[data-cauldron-list]`,HTMLOListElement),message:A(e,`[data-message]`,HTMLElement),startButton:A(e,`[data-start]`,HTMLButtonElement),brewButton:A(e,`[data-brew]`,HTMLButtonElement),pauseButton:A(e,`[data-pause]`,HTMLButtonElement),recipeName:A(e,`[data-recipe-name]`,HTMLElement),recipeCounter:A(e,`[data-recipe-counter]`,HTMLElement),bars:A(e,`[data-bars]`,HTMLElement),helpDialog:A(e,`[data-help-dialog]`,HTMLDialogElement),menuDialog:A(e,`[data-menu-dialog]`,HTMLDialogElement),pauseDialog:A(e,`[data-pause-dialog]`,HTMLDialogElement),gameOverDialog:t,gameOverReason:A(t,`[data-game-over-reason]`,HTMLElement),gameOverScore:A(t,`[data-game-over-score]`,HTMLElement),nameForm:A(t,`[data-name-form]`,HTMLFormElement),nameInput:A(t,`[data-name-input]`,HTMLInputElement),nameError:A(t,`[data-name-error]`,HTMLElement),savedMessage:A(t,`[data-saved-message]`,HTMLElement),leaderboardDialog:A(e,`[data-leaderboard-dialog]`,HTMLDialogElement),leaderboardBody:A(e,`[data-leaderboard-body]`,HTMLElement),leaderboardEmpty:A(e,`[data-leaderboard-empty]`,HTMLElement),clearLeaderboardButton:A(e,`[data-clear-leaderboard]`,HTMLButtonElement),confirmDialog:A(e,`[data-confirm-dialog]`,HTMLDialogElement)}}function Oe(e,t,n){let r=n.map((e,t)=>{let n=j(`tr`,`leaderboard__row`);return n.append(j(`td`,`leaderboard__rank`,String(t+1)),j(`td`,`leaderboard__name`,e.name),j(`td`,`leaderboard__score`,String(e.score)),j(`td`,`leaderboard__date`,ve(e.date))),n});e.replaceChildren(...r),t.hidden=n.length>0}function ke(e,t,n){let r=t.cauldronIngredients.length,i=n.maxCauldronIngredients;e.recipeName.textContent=t.activeRecipe?.name??`Press Start Game`,e.recipeCounter.textContent=`Ingredients: ${String(r)} / ${String(i)}`,e.recipeCounter.classList.toggle(`recipe__counter--full`,r>=i)}function Ae(e){let t=j(`dl`,`shelf-card__values`);return[[`T`,`Temperature`,e.temperature],[`D`,`Density`,e.density],[`M`,`Magic Power`,e.magicPower]].forEach(([e,n,r])=>{let i=j(`div`,`shelf-card__value`),a=j(`dt`,`shelf-card__value-name`,e);a.title=n,i.append(a,j(`dd`,`shelf-card__value-number`,M(r))),t.append(i)}),t}function je(e,t,n,r){let i=j(`button`,`shelf-card ingredient--${e.id}`);i.type=`button`,i.dataset.id=e.id;let a=j(`span`,`shelf-card__stock`,String(t));return t<=0?(i.classList.add(`shelf-card--empty`),i.disabled=!0,i.tabIndex=-1,i.setAttribute(`aria-label`,`${e.name}: out of stock`),i.append(a),i):(i.disabled=n,i.setAttribute(`aria-label`,`Add ${e.name}, ${String(t)} left`),i.append(a,R(e.icon,`shelf-card__icon`),j(`span`,`shelf-card__name`,e.name),Ae(e)),i.addEventListener(`click`,()=>{r(e.id)}),i)}function Me(e,t){let{ingredients:n,stock:r,isBlocked:i,onAdd:a}=t;e.classList.toggle(`shelf--blocked`,i),e.replaceChildren(...n.map(e=>je(e,c(r,e.id),i,a)))}var Ne=250,Pe={time:`Time is up!`,lives:`No lives left!`,ingredients:`Out of ingredients`},B=t,V=e[B],H=De(A(document,`#app`,HTMLDivElement)),Fe=ye(H.bars),U=S(B);function W(e){e.open||e.showModal()}function G(e){e.open&&e.close()}function K(e,t){H.message.textContent=e,H.message.className=`message`,H.message.getBoundingClientRect(),H.message.classList.add(`message--${t}`)}function q(){H.message.textContent=``,H.message.className=`message`}function J(){let e=U.status===`playing`,t=e||U.status===`paused`;Te(H,U,V),Me(H.shelf,{ingredients:x(V),stock:U.shelfStock,isBlocked:!e||u(U,V),onAdd:Re}),Se(H.cauldronList,U.cauldronIngredients,V.maxCauldronIngredients),ke(H,U,V),be(Fe,p(U.cauldronIngredients),U.activeRecipe,V.tolerance),H.startButton.hidden=t,H.startButton.textContent=U.status===`game-over`?`Play again`:`Start Game`,H.brewButton.hidden=!t,H.pauseButton.hidden=!t,H.brewButton.disabled=!e||U.cauldronIngredients.length===0,H.pauseButton.disabled=!e,H.menuButton.hidden=t,H.game.classList.toggle(`game--paused`,U.status===`paused`)}function Y(){if(U.gameOverReason===null)return;let e=me(U.score);H.gameOverReason.textContent=Pe[U.gameOverReason],H.gameOverScore.textContent=String(U.score),H.nameForm.hidden=!e,H.nameInput.value=``,H.nameError.textContent=``,H.savedMessage.textContent=``,W(H.gameOverDialog),e&&H.nameInput.focus()}function X(){G(H.gameOverDialog),G(H.menuDialog),U=le(B,V,Date.now()),q(),J()}function Ie(){G(H.pauseDialog),G(H.gameOverDialog),U=S(B),q(),J()}function Z(){U.status===`playing`&&(U=w(U,Date.now()),U.status===`game-over`?(J(),Y()):z(H,U,V))}function Q(){U=T(U,Date.now()),J(),U.status===`paused`?W(H.pauseDialog):U.status===`game-over`&&Y()}function Le(){G(H.pauseDialog),U=ue(U,Date.now()),J()}function Re(e){if(U.status!==`playing`)return;U=f(U,e,V),J();let t=H.shelf.querySelector(`[data-id="${e}"]`);t&&!t.disabled&&t.focus()}function ze(){if(Z(),U.status!==`playing`)return;let e=de(U,V,Date.now());U=e.state,e.isSuccess?K(`Potion brewed! +${String(V.scorePerBrew)} score`,`success`):K(`The potion failed. −1 life`,`fail`),J(),U.status===`game-over`&&Y()}function $(){let e=k();Oe(H.leaderboardBody,H.leaderboardEmpty,e),H.clearLeaderboardButton.disabled=e.length===0,W(H.leaderboardDialog)}function Be(e){if(e.preventDefault(),!te(H.nameInput.value)){H.nameError.textContent=`Use 2–15 characters: letters, digits, space, _ or -.`,H.nameInput.focus();return}let t=he({name:m(H.nameInput.value),score:U.score,date:Date.now()});H.nameForm.hidden=!0,H.savedMessage.textContent=`Saved! Your rank: ${String(t)}`}function Ve(){H.startButton.addEventListener(`click`,X),H.brewButton.addEventListener(`click`,ze),H.pauseButton.addEventListener(`click`,Q),H.menuButton.addEventListener(`click`,()=>{W(H.menuDialog)}),H.helpButton.addEventListener(`click`,()=>{U.status===`playing`&&(U=T(U,Date.now()),J()),W(H.helpDialog)}),H.helpDialog.addEventListener(`close`,()=>{U.status===`paused`&&W(H.pauseDialog)}),A(H.menuDialog,`[data-new-game]`,HTMLButtonElement).addEventListener(`click`,X),A(H.pauseDialog,`[data-resume]`,HTMLButtonElement).addEventListener(`click`,Le),H.pauseDialog.addEventListener(`cancel`,e=>{e.preventDefault(),Le()}),A(H.gameOverDialog,`[data-play-again]`,HTMLButtonElement).addEventListener(`click`,X),document.querySelectorAll(`[data-exit]`).forEach(e=>{e.addEventListener(`click`,Ie)}),document.querySelectorAll(`[data-open-leaderboard]`).forEach(e=>{e.addEventListener(`click`,$)}),document.querySelectorAll(`[data-close]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`dialog`);t&&G(t)})}),H.clearLeaderboardButton.addEventListener(`click`,()=>{W(H.confirmDialog)}),A(H.confirmDialog,`[data-confirm-yes]`,HTMLButtonElement).addEventListener(`click`,()=>{ge(),G(H.confirmDialog),$()}),H.nameForm.addEventListener(`submit`,Be),document.addEventListener(`visibilitychange`,()=>{document.hidden&&U.status===`playing`&&Q()})}Ve(),J(),window.setInterval(Z,Ne);
//# sourceMappingURL=index-Cs03xFD6.js.map