/* ============================================================
   Investa — app logic, routing, gamification, tools,
   Khan-style practice activities & the Investing Arena.
   ============================================================ */

const App = (() => {
  const LS = "investa_progress_v2";
  let state = load();

  function load(){
    try { const s = JSON.parse(localStorage.getItem(LS)); return s ? migrate(s) : fresh(); }
    catch { return fresh(); }
  }
  function fresh(){ return { done:{}, xp:0, badges:{}, tools:{}, practice:{}, invest:null, onboarded:false, caseDone:{}, review:{}, missions:{}, plan:null, capstoneDone:false, certName:"", muted:false,
    streakCount:0, streakLast:"", qotdDay:"", qotdDone:false, notes:{}, theme:"light", diagnostic:null, mascotOff:false }; }
  function migrate(s){ return Object.assign(fresh(), s); }
  function save(){ localStorage.setItem(LS, JSON.stringify(state)); paintXP(); }

  /* ---------- level system ---------- */
  const LEVELS = [
    { min:0,    name:"Curious Beginner" },
    { min:200,  name:"Smart Saver" },
    { min:500,  name:"Apprentice Investor" },
    { min:900,  name:"Portfolio Builder" },
    { min:1400, name:"Market Analyst" },
    { min:2000, name:"Seasoned Investor" },
    { min:2700, name:"Wealth Strategist" },
    { min:3500, name:"Investa Master" }
  ];
  function levelInfo(xp){
    let i=0; for(let k=0;k<LEVELS.length;k++){ if(xp>=LEVELS[k].min) i=k; }
    const cur=LEVELS[i], nxt=LEVELS[i+1];
    const pct = nxt ? Math.round((xp-cur.min)/(nxt.min-cur.min)*100) : 100;
    return { i, num:i+1, name:cur.name, pct, next:nxt, toNext: nxt?nxt.min-xp:0 };
  }
  function paintXP(){
    const L=levelInfo(state.xp);
    const xb=document.getElementById("xpBadge"); if(xb) xb.textContent=`${state.xp} XP`;
    const ln=document.getElementById("lvlName"); if(ln) ln.textContent=L.name;
    const lnum=document.getElementById("lvlNum"); if(lnum) lnum.textContent=L.num;
    const ring=document.getElementById("lvlRing"); if(ring) ring.style.setProperty("--p", L.pct);
  }
  function addXP(n){
    const before=levelInfo(state.xp).i;
    state.xp += n; save();
    floatXP(n);
    const after=levelInfo(state.xp).i;
    if(after>before){ setTimeout(()=>{ toast(`🎉 Level up! You're now a ${LEVELS[after].name}`); sound("level"); bigConfetti(); }, 650); }
  }

  /* ---------- confetti engine (persistent, supports overlapping bursts & emoji) ---------- */
  let _cfParts=[], _cfRunning=false, _cfCanvas=null, _cfCtx=null;
  function confetti(opts){
    opts=opts||{};
    const count=opts.count||120, originX=opts.originX!=null?opts.originX:0.5, originY=opts.originY!=null?opts.originY:0.3, power=opts.power||1, emojis=opts.emojis||null;
    if(!_cfCanvas){ _cfCanvas=document.createElement("canvas"); _cfCanvas.id="confetti-canvas"; document.body.appendChild(_cfCanvas); _cfCtx=_cfCanvas.getContext("2d"); }
    _cfCanvas.width=innerWidth; _cfCanvas.height=innerHeight;
    const colors=["#4f46e5","#0ea5e9","#059669","#b45309","#e11d48","#9b7bff","#f59e0b"];
    for(let i=0;i<count;i++) _cfParts.push({
      x:innerWidth*originX+(Math.random()-.5)*140, y:innerHeight*originY+(Math.random()-.5)*30,
      vx:(Math.random()-.5)*12*power, vy:(Math.random()*-14-4)*power, g:0.3+Math.random()*0.13,
      s:6+Math.random()*7, rot:Math.random()*6.28, vr:(Math.random()-.5)*0.35,
      col:colors[i%colors.length], emoji:emojis?emojis[Math.floor(Math.random()*emojis.length)]:null,
      life:0, max:90+Math.random()*45 });
    if(!_cfRunning){ _cfRunning=true; requestAnimationFrame(_cfTick); }
  }
  function _cfTick(){
    _cfCtx.clearRect(0,0,_cfCanvas.width,_cfCanvas.height);
    _cfParts=_cfParts.filter(p=>p.life<p.max);
    _cfParts.forEach(p=>{ p.vy+=p.g; p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr; p.life++;
      _cfCtx.globalAlpha=Math.max(0,1-p.life/p.max); _cfCtx.save(); _cfCtx.translate(p.x,p.y); _cfCtx.rotate(p.rot);
      if(p.emoji){ _cfCtx.font=(p.s*3)+"px serif"; _cfCtx.textAlign="center"; _cfCtx.textBaseline="middle"; _cfCtx.fillText(p.emoji,0,0); }
      else { _cfCtx.fillStyle=p.col; _cfCtx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.62); }
      _cfCtx.restore(); });
    _cfCtx.globalAlpha=1;
    if(_cfParts.length) requestAnimationFrame(_cfTick); else { _cfRunning=false; _cfCtx.clearRect(0,0,_cfCanvas.width,_cfCanvas.height); }
  }
  function bigConfetti(){
    confetti({count:90,originX:0.28,power:1.1});
    setTimeout(()=>confetti({count:90,originX:0.72,power:1.1}),180);
    setTimeout(()=>confetti({count:130,originY:0.4,emojis:["🎉","💸","📈","⭐","🏆","🚀"]}),360);
  }

  /* ---------- sound effects (WebAudio, gentle, mutable) ---------- */
  let _audioCtx=null;
  function _ac(){ if(state.muted) return null; try{ _audioCtx=_audioCtx||new (window.AudioContext||window.webkitAudioContext)(); if(_audioCtx.state==="suspended") _audioCtx.resume(); return _audioCtx; }catch(e){ return null; } }
  function tone(freq,dur,type,vol,when){ const ac=_ac(); if(!ac) return; type=type||"sine"; vol=vol||0.12; when=when||0;
    const t=ac.currentTime+when, o=ac.createOscillator(), g=ac.createGain();
    o.type=type; o.frequency.value=freq; o.connect(g); g.connect(ac.destination);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.012); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.start(t); o.stop(t+dur+0.02); }
  function sound(name){
    if(state.muted) return;
    if(name==="correct"){ tone(660,0.12,"triangle",0.11); tone(990,0.14,"triangle",0.09,0.08); }
    else if(name==="wrong"){ tone(200,0.2,"sawtooth",0.06); }
    else if(name==="buy"){ tone(540,0.08,"square",0.06); tone(820,0.12,"square",0.06,0.06); }
    else if(name==="sell"){ tone(440,0.08,"square",0.05); tone(330,0.12,"square",0.05,0.06); }
    else if(name==="click"){ tone(520,0.05,"sine",0.04); }
    else if(name==="badge"){ [659,880,1175].forEach((f,i)=>tone(f,0.16,"triangle",0.1,i*0.07)); }
    else if(name==="level"){ [523,659,784,1047].forEach((f,i)=>tone(f,0.2,"triangle",0.11,i*0.1)); }
    else if(name==="win"){ [523,659,784,1047,1319].forEach((f,i)=>tone(f,0.26,"triangle",0.12,i*0.11)); }
  }
  function toggleMute(){ state.muted=!state.muted; save(); paintMute(); if(!state.muted) sound("click"); toast(state.muted?"🔇 Sounds off":"🔊 Sounds on"); }
  function paintMute(){ const b=document.getElementById("muteBtn"); if(b) b.textContent=state.muted?"🔇":"🔊"; }

  /* ---------- dates & daily streak ---------- */
  function dayStr(d){ d=d||new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); }
  function bumpStreak(){
    const t=dayStr(); if(state.streakLast===t) return;
    const y=dayStr(new Date(Date.now()-86400000));
    state.streakCount = (state.streakLast===y) ? (state.streakCount||0)+1 : 1;
    state.streakLast=t; save(); paintStreak();
    if(state.streakCount>=3) earn("streak3");
    if(state.streakCount>=7) earn("streak7");
  }
  function paintStreak(){ const el=document.getElementById("streakChip"); if(el){ el.style.display=state.streakCount>0?"flex":"none"; el.innerHTML=`🔥 ${state.streakCount}`; el.title=`${state.streakCount}-day streak`; } }

  /* ---------- theme (light/dark) ---------- */
  function applyTheme(){ document.documentElement.setAttribute("data-theme", state.theme||"light"); const b=document.getElementById("themeBtn"); if(b) b.textContent=(state.theme==="dark")?"☀️":"🌙"; }
  function toggleTheme(){ state.theme=(state.theme==="dark")?"light":"dark"; save(); applyTheme(); sound("click"); }

  /* ---------- animated number count-up ---------- */
  function countUp(el, to, opts){
    if(!el) return; opts=opts||{};
    const dec=opts.dec||0, prefix=opts.prefix||"", suffix=opts.suffix||"", dur=opts.dur||650;
    const from = (typeof opts.from==="number") ? opts.from : (parseFloat((el.textContent||"0").replace(/[^0-9.\-]/g,""))||0);
    if(from===to){ el.textContent=prefix+to.toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec})+suffix; return; }
    const start=performance.now();
    function tick(now){ let p=Math.min(1,(now-start)/dur); p=1-Math.pow(1-p,3);
      const v=from+(to-from)*p;
      el.textContent=prefix+v.toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec})+suffix;
      if(p<1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }

  /* ---------- mascot coach ---------- */
  const COACH_TIPS=[
    "Time in the market beats timing the market. ⏳",
    "Diversify — don't bet it all on one stock. 🧺",
    "Low fees are one of the only guarantees in investing. 💸",
    "A market dip is a sale, not a disaster — if you don't sell. 🛒",
    "Invest a fixed amount regularly and ignore the noise. 🤖",
    "Compounding rewards patience more than genius. 🌱",
    "Only invest money you won't need for 3–5 years. 📆",
    "The best day to start was years ago. The second best is today. 🚀"
  ];
  function mascotEnsure(){
    if(state.mascotOff) return null;
    let m=document.getElementById("mascot");
    if(!m){
      m=document.createElement("div"); m.id="mascot"; m.className="mascot";
      m.innerHTML=`<button class="mascot-x" title="Hide coach" aria-label="Hide coach">×</button>
        <div class="mascot-bubble" id="mascotBubble"></div>
        <div class="mascot-face" id="mascotFace">🦉</div>`;
      document.body.appendChild(m);
      m.querySelector(".mascot-x").onclick=()=>{ state.mascotOff=true; save(); m.remove(); };
      m.querySelector("#mascotFace").onclick=()=>mascotSay(COACH_TIPS[Math.floor(Math.random()*COACH_TIPS.length)]);
    }
    return m;
  }
  let _mascotTimer;
  function mascotSay(msg, mood){
    const m=mascotEnsure(); if(!m) return;
    const face=m.querySelector("#mascotFace"), bubble=m.querySelector("#mascotBubble");
    face.textContent = mood==="happy"?"🦉":mood==="sad"?"🦉":"🦉";
    bubble.textContent=msg; bubble.classList.add("show");
    face.classList.remove("bounce"); void face.offsetWidth; face.classList.add("bounce");
    clearTimeout(_mascotTimer); _mascotTimer=setTimeout(()=>bubble.classList.remove("show"), 4200);
  }
  function mascotReact(ok){ mascotSay(ok?pick(["Nice one! 🎉","Exactly right! 💪","You've got this! ⭐","Brilliant! 🚀"]):pick(["No worries — that's how we learn! 🌱","Close! Check the explanation. 💡","Mistakes make memory. Try again! 🔁"]), ok?"happy":"sad"); }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

  /* ---------- floating +XP ---------- */
  function floatXP(n){
    if(!n) return;
    const chip=document.getElementById("levelChip");
    const el=document.createElement("div"); el.className="xp-float"; el.textContent="+"+n+" XP";
    document.body.appendChild(el);
    const r=chip?chip.getBoundingClientRect():{left:innerWidth-130,top:50,width:90};
    el.style.left=(r.left+r.width/2)+"px"; el.style.top=(r.top+38)+"px";
    setTimeout(()=>el.remove(),1300);
  }

  /* ---------- animated badge unlock ---------- */
  function badgePop(b){
    const el=document.createElement("div"); el.className="badge-pop";
    el.innerHTML=`<div class="bp-emoji">${b.emoji}</div><div class="bp-txt"><small>Badge unlocked!</small><b>${b.name}</b></div>`;
    document.body.appendChild(el);
    requestAnimationFrame(()=>el.classList.add("show"));
    setTimeout(()=>{ el.classList.remove("show"); setTimeout(()=>el.remove(),420); },2600);
  }

  /* ---------- SVG progress ring ---------- */
  function ring(pct, size=46, stroke=5, label){
    const r=(size-stroke)/2, circ=2*Math.PI*r, off=circ*(1-pct/100);
    const txt = label!==undefined ? `<text class="ring-label" x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${label}</text>` : "";
    return `<svg class="ring" aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="ring-track" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"/>
      <circle class="ring-fill" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"
        stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/>${txt}</svg>`;
  }

  function earn(badgeId){
    if(state.badges[badgeId]) return;
    state.badges[badgeId] = true; save();
    const b = BADGES.find(x=>x.id===badgeId);
    if(b){ badgePop(b); sound("badge"); confetti({count:70,originY:0.22}); }
  }
  function checkModuleBadges(){
    const n = Object.keys(state.done).length;
    const wasGrad = state.badges.grad;
    if(n>=1) earn("first");
    if(n>=9) earn("half");
    if(n>=MODULES.length) earn("grad");
    // unit completion
    UNITS.forEach(u=>{ if(u.modules.every(m=>state.done[m])) earn("unit"); });
    if(["crashes","global","macro"].every(id=>state.done[id])) earn("historian");
    if(!wasGrad && state.badges.grad){ // finished the whole course — go big
      setTimeout(()=>{ bigConfetti(); sound("win"); toast("🎓 You finished the entire course — congratulations!"); }, 900);
      setTimeout(bigConfetti, 1600);
    }
  }

  /* ---------- sequential unlock ---------- */
  function isUnlocked(id){
    const i = MODULES.findIndex(m=>m.id===id);
    return i<=0 ? true : !!state.done[MODULES[i-1].id];
  }
  function firstIncomplete(){
    const m = MODULES.find(x=>!state.done[x.id]);
    return m ? m.id : MODULES[MODULES.length-1].id;
  }
  function lockedMsg(i){
    const prev = MODULES[i-1];
    toast(`🔒 Finish "${prev.title}" first to unlock this lesson.`);
  }

  /* ---------- spaced review (Leitner retrieval practice) ---------- */
  const DAY = 86400000;
  const REVIEW_INTERVALS = [1,2,4,8,16]; // days per level
  function reviewKey(mid,q){ return mid+"|"+q.slice(0,60); }
  function addReview(mid, item){
    if(!item || !item.q) return;
    state.review = state.review || {};
    const k=reviewKey(mid,item.q);
    state.review[k]={ mid, q:item.q, opts:item.opts.slice(), a:item.a, why:item.why, level:0, due:Date.now()+DAY };
    save();
  }
  function reviewGotRight(k){
    const r=state.review[k]; if(!r) return;
    r.level=(r.level||0)+1;
    if(r.level>=REVIEW_INTERVALS.length){ delete state.review[k]; } // graduated
    else r.due=Date.now()+REVIEW_INTERVALS[r.level]*DAY;
    save();
  }
  function reviewGotWrong(k){
    const r=state.review[k]; if(!r) return;
    r.level=0; r.due=Date.now()+DAY; save();
  }
  function reviewDue(){ const now=Date.now(); return Object.entries(state.review||{}).filter(([,r])=>r.due<=now); }
  function reviewAll(){ return Object.entries(state.review||{}); }

  /* ---------- glossary tooltips: auto-link key terms in lesson text ---------- */
  function glossify(scope){
    if(!scope || typeof GLOSSARY==="undefined") return;
    const terms = GLOSSARY.map(([t,d])=>({t,d,lc:t.toLowerCase()})).sort((a,b)=>b.t.length-a.t.length);
    const used=new Set();
    const walker=document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p=node.parentElement;
        if(!p || p.closest('.gloss-term,h1,h2,h3,h4,.def,.case-q,.quiz-q,a,button,table')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes=[]; let n; while(n=walker.nextNode()) nodes.push(n);
    for(const node of nodes){
      for(const {t,d,lc} of terms){
        if(used.has(lc)) continue;
        const re=new RegExp('\\b'+lc.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i');
        const m=re.exec(node.nodeValue);
        if(m){
          used.add(lc);
          const before=node.nodeValue.slice(0,m.index), after=node.nodeValue.slice(m.index+m[0].length);
          const span=document.createElement('span'); span.className='gloss-term'; span.tabIndex=0; span.setAttribute('aria-label',t+': '+d); span.textContent=m[0];
          const pop=document.createElement('span'); pop.className='gloss-pop'; pop.innerHTML='<b>'+t+'</b> — '+d; span.appendChild(pop);
          const frag=document.createDocumentFragment();
          if(before) frag.appendChild(document.createTextNode(before));
          frag.appendChild(span);
          if(after) frag.appendChild(document.createTextNode(after));
          node.parentNode.replaceChild(frag,node);
          break;
        }
      }
    }
    scope.querySelectorAll('.gloss-term').forEach(el=>el.addEventListener('click',e=>{ e.stopPropagation(); el.classList.toggle('open'); }));
  }

  /* ---------- inline lesson widgets ---------- */
  function mountWidgets(scope){
    if(!scope) return;
    scope.querySelectorAll('[data-widget]').forEach(el=>{
      ({ compound:widgetCompound, rule72:widgetRule72, pe:widgetPE, inflation:widgetInflation }[el.dataset.widget]||(()=>{}))(el);
    });
  }
  function widgetCompound(el){
    el.className='widget';
    el.innerHTML=`<div class="w-tag">🧮 Compound growth</div>
      <div class="w-row">
        <div class="w-field"><label>Monthly ($)</label><input type="number" value="200"></div>
        <div class="w-field"><label>Years</label><input type="number" value="30"></div>
        <div class="w-field"><label>Return %/yr</label><input type="number" value="8"></div>
      </div><div class="w-out"></div>`;
    const ins=el.querySelectorAll('input'), out=el.querySelector('.w-out');
    function calc(){ const m=+ins[0].value||0,y=+ins[1].value||0,r=(+ins[2].value||0)/100; let bal=0,rm=r/12;
      for(let i=0;i<y*12;i++) bal=bal*(1+rm)+m; const put=m*12*y;
      out.innerHTML=`After ${y} years: <span class="w-big">$${Math.round(bal).toLocaleString()}</span><br><span style="font-size:13px;color:var(--muted)">You put in $${Math.round(put).toLocaleString()} — compounding added <b>$${Math.round(bal-put).toLocaleString()}</b>.</span>`; }
    ins.forEach(i=>i.oninput=calc); calc();
  }
  function widgetRule72(el){
    el.className='widget';
    el.innerHTML=`<div class="w-tag">⏳ Rule of 72 — doubling time</div>
      <div class="w-row"><div class="w-field"><label>Annual return %</label><input type="number" value="8"></div></div><div class="w-out"></div>`;
    const inp=el.querySelector('input'), out=el.querySelector('.w-out');
    function calc(){ const r=+inp.value||0; out.innerHTML = r>0?`At ${r}%/yr your money doubles in about <span class="w-big">${(72/r).toFixed(1)} years</span>`:`Enter a return above 0.`; }
    inp.oninput=calc; calc();
  }
  function widgetPE(el){
    el.className='widget';
    el.innerHTML=`<div class="w-tag">🔬 Calculate a P/E ratio</div>
      <div class="w-row"><div class="w-field"><label>Share price ($)</label><input type="number" value="100"></div>
      <div class="w-field"><label>Earnings/share ($)</label><input type="number" value="4"></div></div><div class="w-out"></div>`;
    const ins=el.querySelectorAll('input'), out=el.querySelector('.w-out');
    function calc(){ const p=+ins[0].value||0,e=+ins[1].value||0; if(e<=0){ out.innerHTML='Earnings must be above 0.'; return; }
      const pe=p/e; const tag=pe<15?'low — value-priced or modest growth expected':pe<25?'moderate — typical for a steady company':pe<40?'high — strong growth expected':'very high — priced for rapid growth (risky if it slows)';
      out.innerHTML=`P/E = <span class="w-big">${pe.toFixed(1)}</span><br><span style="font-size:13px;color:var(--muted)">That's <b>${tag}</b>.</span>`; }
    ins.forEach(i=>i.oninput=calc); calc();
  }
  function widgetInflation(el){
    el.className='widget';
    el.innerHTML=`<div class="w-tag">💸 What inflation does to prices</div>
      <div class="w-row"><div class="w-field"><label>Costs today ($)</label><input type="number" value="100"></div>
      <div class="w-field"><label>Years</label><input type="number" value="25"></div>
      <div class="w-field"><label>Inflation %/yr</label><input type="number" value="3"></div></div><div class="w-out"></div>`;
    const ins=el.querySelectorAll('input'), out=el.querySelector('.w-out');
    function calc(){ const a=+ins[0].value||0,y=+ins[1].value||0,r=(+ins[2].value||0)/100;
      const fut=a*Math.pow(1+r,y); const worth=a/Math.pow(1+r,y);
      out.innerHTML=`In ${y} years, something costing $${a} today will cost about <span class="w-big">$${fut.toFixed(0)}</span><br><span style="font-size:13px;color:var(--muted)">Put differently, $${a} stuffed under a mattress would only buy <b>$${worth.toFixed(0)}</b> worth of today's goods. That's why cash needs to be invested.</span>`; }
    ins.forEach(i=>i.oninput=calc); calc();
  }

  /* ---------- accessibility: make clickable non-buttons keyboard-operable ---------- */
  function enhanceA11y(scope){
    (scope||document).querySelectorAll('[onclick]:not(button):not(a)').forEach(el=>{
      if(el.dataset.a11y) return; el.dataset.a11y="1";
      if(!el.hasAttribute("tabindex")) el.setAttribute("tabindex","0");
      if(!el.hasAttribute("role")) el.setAttribute("role","button");
      el.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); el.click(); } });
    });
  }

  let toastTimer;
  function toast(msg){
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(()=>t.classList.remove("show"), 2600);
  }

  /* ---------- nav / routing ---------- */
  const NAV = [["home","Home"],["learn","Course"],["practice","Practice"],["invest","Invest"]];
  function paintNav(active){
    document.getElementById("topnav").innerHTML =
      NAV.map(([r,l])=>`<button class="${r===active?'active':''}" onclick="App.go('${r}')">${typeof I18N!=="undefined"?I18N.t(l):l}</button>`).join("");
  }
  function go(route, arg){
    if(window.__arenaTimer){ clearInterval(window.__arenaTimer); window.__arenaTimer=null; }
    const navMap={ lesson:"learn", practiceRun:"practice", review:"practice", diagnostic:"learn", cheatsheets:"learn", notes:"learn" };
    const homeish=["tool","tools","glossary","badges","capstone","certificate","search","backtest","references"];
    paintNav(navMap[route] || (homeish.includes(route)?"home":route));
    window.scrollTo({top:0});
    const v = document.getElementById("view");
    v.classList.remove("fade"); void v.offsetWidth; v.classList.add("fade");
    ({ home:renderHome, learn:renderLearn, lesson:renderLesson, practice:renderPractice,
       practiceRun:renderPracticeRun, review:renderReview, invest:renderInvest, tools:renderTools, tool:renderTool,
       glossary:renderGlossary, badges:renderBadges, capstone:renderCapstone, certificate:renderCertificate,
       search:renderSearch, diagnostic:renderDiagnostic, notes:renderNotes, cheatsheets:renderCheatsheets, backtest:renderBacktest,
       references:renderReferences
     }[route] || renderHome)(v, arg);
    if(typeof I18N!=="undefined") I18N.localizeDOM(v);
    enhanceA11y(v);
  }

  /* ============================================================ HOME */
  function renderHome(v){
    const done = Object.keys(state.done).length;
    const pct = Math.round(done/MODULES.length*100);
    const nextId = firstIncomplete();
    const nextM = MODULES.find(m=>m.id===nextId);
    const nextIdx = MODULES.indexOf(nextM);
    const L = levelInfo(state.xp);
    v.innerHTML = `
      <section class="hero">
        <span class="eyebrow-pill">✨ No experience needed</span>
        <h1>Invest with <span class="grad">confidence,</span> starting from zero.</h1>
        <p class="hero-lead">A friendly, step-by-step course that turns complete beginners into confident investors — through real-world case studies, hands-on practice, and a live $100,000 investing competition.</p>
        <div class="hero-cta">
          <button class="btn big" onclick="App.go('lesson','${nextId}')">${done?'Continue learning →':'▶ Start the course'}</button>
          <button class="btn ghost big" onclick="App.go('learn')">Browse the course</button>
        </div>
      </section>

      <div class="trust-row">
        <div class="trust"><b>20</b><small>guided lessons</small></div>
        <div class="trust"><b>20</b><small>real-world case studies</small></div>
        <div class="trust"><b>$100k</b><small>to invest, risk-free</small></div>
      </div>

      ${done?`<div class="continue-card">
        <div class="cc-ring">${ring(pct,64,6,pct+'%')}</div>
        <div class="cc-body">
          <div class="cc-eyebrow">Pick up where you left off</div>
          <h3>Lesson ${nextIdx+1}: ${nextM.title}</h3>
          <p><b>${L.name}</b> · ${done}/${MODULES.length} lessons complete${L.next?` · ${L.toNext} XP to level up`:''}</p>
        </div>
        <button class="btn" onclick="App.go('lesson','${nextId}')">Resume →</button>
      </div>`:''}

      ${reviewDue().length?`<div class="review-nudge" onclick="App.go('review')">
        <span class="rn-ic">🔁</span>
        <div class="rn-body"><b>${reviewDue().length} question${reviewDue().length>1?'s':''} due for review</b><span>A 2-minute recall session locks in what you've learned.</span></div>
        <span class="rn-go">Review now →</span>
      </div>`:''}

      <div class="home-cards">
        <div class="hc qotd" id="qotdCard"></div>
        <div class="hc streak-card">
          <div class="hc-ic">🔥</div>
          <div><b>${state.streakCount||1}-day streak</b><span>${state.streakCount>=7?'On fire — amazing consistency!':state.streakCount>=3?'Great habit forming!':'Come back daily to grow it.'}</span></div>
        </div>
      </div>

      <div class="how-head">
        <div class="section-eyebrow">How Investa works</div>
        <h2>Three simple steps</h2>
        <p>Everything is laid out for you — you'll always know exactly what's next.</p>
      </div>
      <div class="steps">
        <div class="step" onclick="App.go('learn')"><div class="step-n">1</div><span class="step-emoji">📘</span><h3>Learn</h3><p>Short, friendly lessons unlock one at a time — read, explore a real case study, then prove it.</p><span class="step-go">Go to the course →</span></div>
        <div class="step" onclick="App.go('practice')"><div class="step-n">2</div><span class="step-emoji">✍️</span><h3>Practice</h3><p>Adaptive drills with hints lock each idea into memory, Khan-Academy style.</p><span class="step-go">Open practice →</span></div>
        <div class="step" onclick="App.go('invest')"><div class="step-n">3</div><span class="step-emoji">🏆</span><h3>Compete</h3><p>Invest a virtual <b>$100,000</b> in real stocks and climb the live leaderboard.</p><span class="step-go">Enter the arena →</span></div>
      </div>

      <div class="more-row">
        <button class="more-link" onclick="App.go('diagnostic')">🧭 Placement quiz</button>
        <button class="more-link" onclick="App.go('tools')">🧮 Tools & games</button>
        <button class="more-link" onclick="App.go('cheatsheets')">🧾 Cheat sheets</button>
        <button class="more-link" onclick="App.go('notes')">📝 My notes</button>
        <button class="more-link" onclick="App.go('glossary')">📖 Glossary</button>
        <button class="more-link" onclick="App.go('references')">📑 References</button>
        <button class="more-link" onclick="App.go('badges')">🏅 Your progress</button>
      </div>`;
    renderQOTD();
    if(!state.onboarded) showWelcome();
    else if(!state.mascotOff) setTimeout(()=>mascotSay(done?pick(COACH_TIPS):"Welcome! Tap a step to begin — I'll cheer you on. 🦉"),600);
  }

  /* ---------- Question of the Day ---------- */
  function qotdPool(){
    let pool=[];
    MODULES.forEach(m=>{ pool=pool.concat(m.quiz); if(typeof QUIZ_EXTRA!=="undefined"&&QUIZ_EXTRA[m.id]) pool=pool.concat(QUIZ_EXTRA[m.id]); });
    return pool;
  }
  function renderQOTD(){
    const card=document.getElementById("qotdCard"); if(!card) return;
    const t=dayStr(); const pool=qotdPool();
    // deterministic pick by date
    let seed=0; for(let i=0;i<t.length;i++) seed=(seed*31+t.charCodeAt(i))>>>0;
    const item=pool[seed%pool.length];
    if(state.qotdDay===t && state.qotdDone){
      card.innerHTML=`<div class="hc-ic">📅</div><div><b>Question of the Day ✓</b><span>Nice — come back tomorrow for a new one.</span></div>`;
      return;
    }
    card.classList.add("qotd-open");
    card.innerHTML=`<div style="width:100%"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span class="hc-ic" style="font-size:22px">📅</span><b>Question of the Day</b></div>
      <div class="quiz-q" style="font-size:16px;margin-bottom:10px">${item.q}</div>
      <div class="options" id="qotdOpts">${item.opts.map((o,i)=>`<button class="opt" data-i="${i}" style="padding:10px 14px;font-size:14px">${o}</button>`).join("")}</div>
      <div class="explain" id="qotdEx" style="margin-top:10px"></div></div>`;
    const order=item.a;
    card.querySelectorAll(".opt").forEach(btn=>btn.onclick=()=>{
      const ch=+btn.dataset.i, os=card.querySelectorAll(".opt"); os.forEach(o=>o.classList.add("disabled")); os[order].classList.add("correct");
      const ok=ch===order; if(!ok) btn.classList.add("wrong"); sound(ok?"correct":"wrong");
      const ex=document.getElementById("qotdEx"); ex.innerHTML=`${ok?'✅ <b>Correct!</b> ':'💡 '}${item.why}`; ex.classList.add("show");
      if(state.qotdDay!==t || !state.qotdDone){ state.qotdDay=t; state.qotdDone=true; addXP(ok?25:10); if(ok) confetti({count:50,originY:0.25}); save(); }
    });
  }

  function showWelcome(){
    if(document.getElementById("welcomeOverlay")) return;
    const o=document.createElement("div"); o.className="welcome-overlay"; o.id="welcomeOverlay";
    o.innerHTML=`<div class="welcome-card">
      <div class="wc-logo">📈</div>
      <h2>Welcome to Investa</h2>
      <p>Investing, finally made simple. Here's the whole journey — three easy steps:</p>
      <div class="welcome-steps">
        <div><span class="ws-ic">📘</span><div><b>1 · Learn</b><span>Bite-size lessons with real case studies.</span></div></div>
        <div><span class="ws-ic">✍️</span><div><b>2 · Practice</b><span>Quick drills that make it stick.</span></div></div>
        <div><span class="ws-ic">🏆</span><div><b>3 · Compete</b><span>Trade real stocks with a virtual $100k.</span></div></div>
      </div>
      <button class="btn big" id="welcomeStart" style="width:100%">▶ Start with Lesson 1</button>
      <button class="ghost-btn" id="welcomeSkip" style="width:auto;margin:12px auto 0;padding:0 14px;height:auto;border:0;color:var(--muted);font-size:14px">I'll look around first</button>
    </div>`;
    document.body.appendChild(o);
    document.getElementById("welcomeStart").onclick=()=>{ state.onboarded=true; save(); o.remove(); go("lesson", firstIncomplete()); };
    document.getElementById("welcomeSkip").onclick=()=>{ state.onboarded=true; save(); o.remove(); };
  }

  function unitsHTML(){
    return UNITS.map(u=>{
      const cards = u.modules.map(id=>moduleCard(id)).join("");
      const ud = u.modules.filter(m=>state.done[m]).length;
      const upct = Math.round(ud/u.modules.length*100);
      return `<div class="unit">
        <div class="unit-head">
          <div class="u-ring">${ring(upct,48,5,ud+'/'+u.modules.length)}</div>
          <div class="u-info"><div class="u-num">Unit ${u.n}</div><h3>${u.title}</h3><div class="u-desc">${u.desc}</div></div>
        </div>
        <div class="modules">${cards}</div></div>`;
    }).join("");
  }
  function moduleCard(id){
    const m = MODULES.find(x=>x.id===id); const i = MODULES.indexOf(m);
    const isDone = state.done[m.id];
    const unlocked = isUnlocked(m.id);
    if(!unlocked){
      return `<div class="module locked" onclick="App.lockedMsg(${i})">
        <div class="m-top"><div class="m-emoji">🔒</div><div class="m-idx">Lesson ${i+1}</div></div>
        <h4>${m.title}</h4><p>${m.blurb}</p>
        <div class="m-foot"><span class="pill locked">🔒 Locked</span><span class="m-meta">${m.read} min</span></div>
      </div>`;
    }
    return `<div class="module" onclick="App.go('lesson','${m.id}')">
      <div class="m-top"><div class="m-emoji">${m.emoji}</div><div class="m-idx">Lesson ${i+1}</div></div>
      <h4>${m.title}</h4><p>${m.blurb}</p>
      <div class="m-foot"><span class="pill ${isDone?'done':'todo'}">${isDone?'✓ Completed':'Start →'}</span><span class="m-meta">${m.read} min · case + quiz</span></div>
    </div>`;
  }

  /* ============================================================ LEARN */
  function renderLearn(v){
    const done = Object.keys(state.done).length, pct = Math.round(done/MODULES.length*100);
    v.innerHTML = `
      <div class="page-head">
        <div class="section-eyebrow">The Course</div>
        <h2>Your path to confident investing</h2>
        <div class="ph-sub">6 units · 20 lessons · each with a real-world case study and a quiz.</div>
      </div>
      <div class="overall-progress">
        <div>${ring(pct,52,6,pct+'%')}</div>
        <div class="op-text"><b>${done} of ${MODULES.length} lessons complete</b><small>${done===MODULES.length?'🎓 Course complete — you legend!':'Lessons unlock in order as you pass each quiz.'}</small></div>
      </div>
      ${unitsHTML()}`;
  }

  /* ============================================================ LESSON */
  function renderLesson(v, id){
    const m = MODULES.find(x=>x.id===id) || MODULES[0];
    const idx = MODULES.indexOf(m), next = MODULES[idx+1];
    if(!isUnlocked(m.id)){
      const prev = MODULES[idx-1];
      v.innerHTML = `<div class="lesson-wrap" style="text-align:center;padding-top:40px">
        <div style="font-size:60px">🔒</div>
        <h1 style="margin:10px 0">This lesson is locked</h1>
        <p class="lesson-sub">The course is step-by-step. Finish <b>"${prev.title}"</b> and pass its quiz to unlock <b>${m.title}</b>.</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px">
          <button class="btn" onclick="App.go('lesson','${firstIncomplete()}')">Go to my next lesson →</button>
          <button class="btn secondary" onclick="App.go('learn')">View the curriculum</button>
        </div></div>`;
      return;
    }
    const extra = (typeof LESSON_EXTRAS!=="undefined" && LESSON_EXTRAS[m.id]) || {};
    const cases = (typeof CASES!=="undefined" && CASES[m.id]) || [];
    const sections = m.sections.map(s=>`<div class="card"><h3>${s.h}</h3>${s.html}</div>`).join("");
    const videoCard = extra.video ? `<a class="video-card" href="https://www.youtube.com/results?search_query=${encodeURIComponent(extra.video)}" target="_blank" rel="noopener">
        <div class="vc-play">▶</div>
        <div class="vc-body"><b>Watch: a short video on this topic</b><span>Opens a YouTube search for “${extra.video}”</span></div>
        <div class="vc-ext">↗</div></a>` : "";
    const bankLen = (m.quiz.length) + ((typeof QUIZ_EXTRA!=="undefined" && QUIZ_EXTRA[m.id]) ? QUIZ_EXTRA[m.id].length : 0);

    // ----- paginated wizard: page 0 = lesson, 1..N = case studies, last = quiz -----
    state.caseDone = state.caseDone || {};
    const caseDoneArr = state.caseDone[m.id] = state.caseDone[m.id] || cases.map(()=>false);
    const totalPages = 1 + cases.length + 1;
    const QUIZ_PAGE = totalPages - 1;
    const steps = [{ic:"📖",lb:"Lesson"}].concat(cases.map((_,i)=>({ic:"📰",lb:"Case "+(i+1)}))).concat([{ic:"🧠",lb:"Quiz"}]);
    let page = 0;

    v.innerHTML = `
      <div class="lesson-wrap lesson-paged">
        <div class="crumb" onclick="App.go('learn')">← All lessons</div>
        <div class="lesson-head">
          <div class="lh-meta"><span class="lh-tag">Lesson ${idx+1} / ${MODULES.length}</span> <span>⏱️ ~${m.read} min</span> ${state.done[m.id]?'<span>✓ completed</span>':''}</div>
          <h1>${m.emoji} ${m.title}</h1>
          <p class="lesson-sub">${m.blurb}</p>
        </div>
        <div class="stepbar" id="stepbar"></div>
        <div id="pageBody"></div>
        <div class="page-nav" id="pageNav"></div>
      </div>`;

    function renderStepbar(){
      document.getElementById("stepbar").innerHTML = steps.map((s,i)=>{
        const isCase = i>=1 && i<=cases.length;
        const done = i<page || (isCase && caseDoneArr[i-1]);
        return `<button class="stepchip ${i===page?'active':''} ${done?'done':''}" data-p="${i}">${s.ic} <span>${s.lb}</span></button>`;
      }).join('<span class="stepsep"></span>');
      document.querySelectorAll(".stepchip").forEach(b=>b.onclick=()=>goTo(+b.dataset.p));
    }

    function renderNav(){
      const nav=document.getElementById("pageNav");
      const back = page>0
        ? `<button class="btn secondary" id="navBack">← Back</button>`
        : `<button class="btn secondary" onclick="App.go('learn')">← All lessons</button>`;
      let nextHTML="";
      if(page < QUIZ_PAGE){
        const label = page===0 ? (cases.length?"Start case studies →":"Continue to quiz →")
                    : (page===cases.length ? "Continue to quiz →" : "Next case →");
        nextHTML = `<button class="btn ${page>=1?'secondary':''}" id="navNext">${label}</button>`;
      }
      nav.innerHTML = `<div class="pn-left">${back}</div><div class="pn-right">${nextHTML}</div>`;
      const nb=document.getElementById("navBack"); if(nb) nb.onclick=()=>goTo(page-1);
      const nx=document.getElementById("navNext"); if(nx) nx.onclick=()=>goTo(page+1);
    }

    function renderCase(ci){
      const body=document.getElementById("pageBody");
      const cs=cases[ci];
      const csrc=(typeof CASE_SOURCES!=="undefined" && CASE_SOURCES[m.id])||null;
      let step=0;
      function draw(){
        const st=cs.steps[step];
        const last=step===cs.steps.length-1;
        const srcBlock=(csrc && last)?`<div class="case-sources"><b>📎 Sources for this case study:</b>${csrc.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join("")}</div>`:"";
        body.innerHTML = `<div class="card case-card fade">
          <div class="case-head"><div class="case-emoji">${cs.emoji}</div>
            <div><div class="section-eyebrow" style="margin:0">Case study ${ci+1} of ${cases.length}${cs.real?' · based on real events':''}</div>
              <h2 style="margin:2px 0 0">${cs.title}</h2></div></div>
          <div class="case-progress">Part ${step+1} of ${cs.steps.length}</div>
          <div class="case-context">${st.context||''}</div>
          ${st.q?`<div class="case-q">${st.q}</div><div class="options" id="caseOpts">${st.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}</div>`:''}
          <div class="explain" id="caseReveal"></div>
          <div id="caseNext" style="margin-top:16px"></div>${srcBlock}</div>`;
        if(st.q){
          body.querySelectorAll(".opt").forEach(btn=>btn.onclick=()=>{
            const chosen=+btn.dataset.i, opts=body.querySelectorAll(".opt");
            opts.forEach(o=>o.classList.add("disabled"));
            opts[st.a].classList.add("correct");
            if(chosen===st.a){ sound("correct"); } else { btn.classList.add("wrong"); sound("wrong"); addReview(m.id, {q:st.q, opts:st.opts, a:st.a, why:st.reveal}); }
            const rev=document.getElementById("caseReveal");
            rev.innerHTML=`<b>${chosen===st.a?'✅ You got it. ':'❌ Not quite. '}What actually happened:</b> ${st.reveal}`;
            rev.classList.add("show");
            showNext();
          });
        } else { showNext(); }
      }
      function showNext(){
        const nb=document.getElementById("caseNext");
        if(step<cs.steps.length-1){
          nb.innerHTML=`<button class="btn" id="caseContinue">Continue the story →</button>`;
          document.getElementById("caseContinue").onclick=()=>{ step++; draw(); body.querySelector(".case-card").scrollIntoView({behavior:"smooth",block:"start"}); };
        } else {
          if(!caseDoneArr[ci]){ sound("badge"); confetti({count:55,originY:0.3}); }
          caseDoneArr[ci]=true; save(); renderStepbar();
          nb.innerHTML=`<div class="case-done">✓ Case complete${cs.lesson?` — <span>${cs.lesson}</span>`:''}</div>
            <button class="btn" id="caseProceed" style="margin-top:12px">${ci<cases.length-1?'Next case →':'Continue to the quiz →'}</button>`;
          document.getElementById("caseProceed").onclick=()=>goTo(page+1);
        }
      }
      draw();
    }

    function renderBody(){
      const body=document.getElementById("pageBody");
      if(page===0){
        const wlist = (typeof WIDGETS!=="undefined" && WIDGETS[m.id]) || [];
        const widgetHTML = wlist.length ? `<div class="card"><div class="section-eyebrow">Try it yourself 🔬</div>${wlist.map(w=>`<div data-widget="${w}"></div>`).join("")}</div>` : "";
        const src = (typeof SOURCES!=="undefined" && (SOURCES[m.id]||SOURCES._default)) || null;
        const srcHTML = src ? `<div class="sources"><div class="src-tag2">📚 Go deeper — trusted, published sources</div>${src.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${(s.kind==='cite'?'📘 ':'🏛️ ')}${s.label}</a>`).join("")}<a class="src-all" onclick="App.go('references');return false" href="#">📑 See all references & sources →</a></div>` : "";
        const simple = (typeof SIMPLE!=="undefined" && SIMPLE[m.id]) || "";
        const nutshell = simple ? `<div class="nutshell"><b>🥜 In a nutshell:</b> ${simple}</div>` : "";
        const noteVal = (state.notes&&state.notes[m.id])||"";
        const notesHTML = `<div class="card notes-card"><div class="section-eyebrow">📝 My notes</div><textarea id="lessonNotes" class="notes-area" placeholder="Jot down anything you want to remember from this lesson…">${noteVal.replace(/</g,"&lt;")}</textarea><div class="notes-saved" id="notesSaved"></div></div>`;
        body.innerHTML = `<div class="section-eyebrow">Step 1 · Read the lesson</div>${nutshell}${videoCard}${sections}${widgetHTML}${notesHTML}${srcHTML}`;
        glossify(body);
        mountWidgets(body);
        const ta=document.getElementById("lessonNotes");
        if(ta){ let nt; ta.addEventListener("input",()=>{ state.notes=state.notes||{}; state.notes[m.id]=ta.value; clearTimeout(nt); nt=setTimeout(()=>{ save(); const s=document.getElementById("notesSaved"); if(s){ s.textContent="✓ Saved"; setTimeout(()=>s.textContent="",1500);} },400); }); }
      } else if(page<=cases.length){
        renderCase(page-1);
      } else {
        const isDone=state.done[m.id];
        body.innerHTML = `<div class="card quiz-gate fade" id="quizGate">
            <div class="section-eyebrow">Step 2 · Check your understanding</div>
            <h3>${isDone?'You’ve completed this lesson ✓':'Ready for the quiz?'}</h3>
            <p>5 questions pulled from a bank of ${bankLen} — many ask you to <b>reason with</b> what you learned, not just recall it. ${isDone?'Retake any time for practice.':'Pass (4/5) to complete the lesson and unlock the next one.'} Don’t pass? You’ll get a <b>fresh set</b> to try again.</p>
            <button class="btn big" id="startQuizBtn">${isDone?'Retake the quiz →':'Start the quiz →'}</button>
          </div>
          <div id="quizZone"></div>`;
        document.getElementById("startQuizBtn").onclick=()=>{
          document.getElementById("quizGate").style.display="none";
          startQuiz(m);
          document.getElementById("quizZone").scrollIntoView({behavior:"smooth",block:"start"});
        };
      }
    }

    function goTo(p){
      page = Math.max(0, Math.min(QUIZ_PAGE, p));
      renderStepbar(); renderBody(); renderNav();
      const head=document.querySelector(".lesson-head"); if(head) head.scrollIntoView({behavior:"smooth",block:"start"});
    }

    renderStepbar(); renderBody(); renderNav();
  }

  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function quizBank(m){ return m.quiz.concat((typeof QUIZ_EXTRA!=="undefined" && QUIZ_EXTRA[m.id]) || []); }

  function startQuiz(m){
    const zone = document.getElementById("quizZone");
    const nextM = MODULES[MODULES.indexOf(m)+1];
    const bank = quizBank(m);
    const SHOW = Math.min(5, bank.length);
    const PASS = Math.max(1, Math.ceil(SHOW*0.7));   // need ~70% to pass
    startQuiz._prev = startQuiz._prev || {};
    let prevSet = startQuiz._prev[m.id] || [];

    function pickIdxs(){
      const all = shuffle(bank.map((_,i)=>i));
      const fresh = all.filter(i=>!prevSet.includes(i));
      const chosen = fresh.slice(0, SHOW);
      if(chosen.length < SHOW){ all.filter(i=>!chosen.includes(i)).slice(0, SHOW-chosen.length).forEach(i=>chosen.push(i)); }
      return chosen;
    }
    function prep(i){
      const q = bank[i];
      const order = shuffle(q.opts.map((_,k)=>k));   // shuffle options too
      return { q:q.q, opts:order.map(k=>q.opts[k]), a:order.indexOf(q.a), why:q.why, orig:q };
    }

    function runAttempt(){
      const idxs = pickIdxs();
      prevSet = idxs; startQuiz._prev[m.id] = idxs;
      const items = idxs.map(prep);
      let qi=0, correct=0, mistakes=0;

      function renderQ(){
        const item = items[qi];
        zone.innerHTML = `<div class="card" id="quizCard">
          <div class="quiz-progress">Question ${qi+1} of ${items.length} · need ${PASS} to pass</div>
          <div class="quiz-q">${item.q}</div>
          <div class="options">${item.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}</div>
          <div class="explain" id="explain"></div><div id="qnext" style="margin-top:16px"></div></div>`;
        zone.querySelectorAll(".opt").forEach(btn=>btn.onclick=()=>{
          const chosen=+btn.dataset.i, opts=zone.querySelectorAll(".opt");
          opts.forEach(o=>o.classList.add("disabled"));
          opts[item.a].classList.add("correct");
          if(chosen===item.a){ correct++; sound("correct"); mascotReact(true); } else { mistakes++; btn.classList.add("wrong"); sound("wrong"); mascotReact(false); addReview(m.id, item.orig); }
          const ex=document.getElementById("explain");
          ex.innerHTML=`${chosen===item.a?'✅ <b>Correct!</b> ':'💡 <b>Think it through:</b> '}${item.why}`; ex.classList.add("show");
          const nb=document.getElementById("qnext");
          nb.innerHTML=`<button class="btn">${qi<items.length-1?'Next question →':'See results →'}</button>`;
          nb.querySelector("button").onclick=()=>{ qi++; qi<items.length?renderQ():finish(); };
        });
      }
      function finish(){
        const passed = correct>=PASS;
        if(passed){
          const wasDone=state.done[m.id]; state.done[m.id]=true;
          sound("win");
          if(!wasDone){ addXP(100); confetti(); }
          checkModuleBadges(); if(mistakes===0) earn("perfect"); save();
          zone.innerHTML=`<div class="card" style="text-align:center;padding:18px 0">
            <div style="font-size:52px">${mistakes===0?'💎':'✅'}</div>
            <h3 style="font-size:26px;margin:6px 0">${mistakes===0?'Perfect score!':'You passed!'}</h3>
            <p style="color:var(--muted)">Score: <b style="color:var(--green)">${correct}/${items.length}</b>${wasDone?' · already completed':' · +100 XP'}</p>
            <p style="color:var(--green);font-weight:600;font-size:14px">${nextM?`🔓 Unlocked: ${nextM.title}`:'🎓 You have unlocked everything — congratulations!'}</p>
            <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
              <button class="btn secondary" id="qRetake">Practice again</button>
              ${nextM?`<button class="btn" onclick="App.go('lesson','${nextM.id}')">Next lesson →</button>`:`<button class="btn" onclick="App.go('invest')">Enter the Arena →</button>`}</div></div>`;
          document.getElementById("qRetake").onclick=runAttempt;
        } else {
          zone.innerHTML=`<div class="card" style="text-align:center;padding:18px 0">
            <div style="font-size:52px">📚</div>
            <h3 style="font-size:24px;margin:6px 0">Not quite yet — ${correct}/${items.length}</h3>
            <p style="color:var(--muted)">You need <b>${PASS}/${items.length}</b> to pass. Review the lesson above, then try again with a <b>fresh set of questions</b>.</p>
            <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
              <button class="btn secondary" id="qReread">Reread the lesson</button>
              <button class="btn" id="qRetry">Try again — new questions →</button></div></div>`;
          document.getElementById("qReread").onclick=()=>document.querySelector(".lesson-wrap").scrollIntoView({behavior:"smooth"});
          document.getElementById("qRetry").onclick=()=>{ runAttempt(); zone.scrollIntoView({behavior:"smooth"}); };
        }
      }
      renderQ();
    }
    runAttempt();
  }

  /* ============================================================ PRACTICE (Khan-style) */
  function renderPractice(v){
    const mastered = ACTIVITIES.filter(a=>(state.practice[a.id]||{}).mastered).length;
    const dueN = reviewDue().length, trackedN = reviewAll().length;
    v.innerHTML = `
      <div class="page-head">
        <div class="section-eyebrow">Practice</div>
        <h2>Sharpen your skills ✍️</h2>
        <div class="ph-sub">Adaptive drills with hints and instant feedback. Get <b>5 in a row</b> to master each one — ${mastered}/${ACTIVITIES.length} mastered.</div>
      </div>
      <div class="modules" style="margin-bottom:30px">
        <div class="module feature" onclick="App.go('review')">
          <div class="m-top"><div class="m-emoji">🔁</div><div class="m-idx">Spaced review</div></div>
          <h4>Daily Review</h4><p>${trackedN?`Re-test the questions you've missed on a smart schedule. ${dueN} due now.`:`Missed questions appear here for spaced retrieval practice — the best way to remember.`}</p>
          <div class="m-foot"><span class="pill ${dueN?'todo':'done'}">${dueN?`${dueN} due →`:(trackedN?'All caught up':'Start learning')}</span><span class="m-meta">${trackedN} tracked</span></div>
        </div>
        <div class="module feature" onclick="App.go('capstone')">
          <div class="m-top"><div class="m-emoji">🗺️</div><div class="m-idx">Capstone project</div></div>
          <h4>Build Your Plan</h4><p>Design your own investment plan and get instant coaching feedback on it.</p>
          <div class="m-foot"><span class="pill ${state.capstoneDone?'done':'todo'}">${state.capstoneDone?'✓ Built':'Start →'}</span><span class="m-meta">apply everything</span></div>
        </div>
      </div>
      <div class="section-eyebrow">Skill drills</div>
      <div class="modules">
        ${ACTIVITIES.map(a=>{
          const m = state.practice[a.id]||{}; const mastered=m.mastered;
          return `<div class="module" onclick="App.go('practiceRun','${a.id}')">
            <div class="m-top"><div class="m-emoji">${a.emoji}</div><div class="m-idx">${a.skill}</div></div>
            <h4>${a.name}</h4><p>${a.desc}</p>
            <div class="m-foot"><span class="pill ${mastered?'done':'todo'}">${mastered?'🌟 Mastered':'Practice'}</span><span class="m-meta">best streak ${m.best||0}</span></div>
          </div>`;
        }).join("")}
      </div>`;
  }

  function renderPracticeRun(v, id){
    const act = ACTIVITIES.find(a=>a.id===id) || ACTIVITIES[0];
    const GOAL = 5;
    let streak = 0, best = (state.practice[id]||{}).best || 0, answered = 0;
    v.innerHTML = `<div class="lesson-wrap">
      <div class="crumb" onclick="App.go('practice')">← All activities</div>
      <h1>${act.emoji} ${act.name}</h1>
      <p class="lesson-sub">${act.desc}</p>
      <div class="tool">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <b>Mastery — ${GOAL} in a row</b><span id="streakLbl" style="font-weight:700;color:var(--brand)">0 / ${GOAL}</span>
        </div>
        <div class="progress-bar"><i id="masterBar" style="width:0%"></i></div>
      </div>
      <div class="card" id="exCard"></div>
    </div>`;

    function nextItem(){
      return act.numeric ? act.gen() : act.pool[Math.floor(Math.random()*act.pool.length)];
    }
    function setBar(){
      document.getElementById("masterBar").style.width = (streak/GOAL*100)+"%";
      document.getElementById("streakLbl").textContent = `${streak} / ${GOAL}`;
    }
    function done(){
      best = Math.max(best, streak);
      const p = state.practice[id] = state.practice[id]||{};
      p.best = Math.max(p.best||0, best);
      p.mastered = true; addXP(40); sound("win"); bigConfetti(); earn("mastery"); if(id==="myths") earn("mythbuster"); save();
      document.getElementById("exCard").innerHTML = `<div style="text-align:center;padding:10px 0">
        <div style="font-size:52px">🌟</div><h3 style="font-size:26px;margin:6px 0">Activity mastered!</h3>
        <p style="color:var(--muted)">You got ${GOAL} correct in a row · +40 XP · ${answered} answered total</p>
        <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn secondary" onclick="App.go('practice')">All activities</button>
          <button class="btn" onclick="App.go('practiceRun','${id}')">Keep practicing</button></div></div>`;
    }
    function render(){
      const item = nextItem();
      const card = document.getElementById("exCard");
      const optsHTML = act.numeric
        ? `<input type="number" id="numIn" placeholder="Type your answer${act.unit?' ('+act.unit+')':''}" step="0.1" style="max-width:280px">
           <div style="margin-top:14px"><button class="btn" id="checkBtn">Check</button> <button class="ghost-btn" id="hintBtn" style="width:auto;height:auto;padding:8px 14px">💡 Hint</button></div>`
        : `<div class="options">${item.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}</div>
           <div style="margin-top:12px"><button class="ghost-btn" id="hintBtn" style="width:auto;height:auto;padding:8px 14px">💡 Hint</button></div>`;
      card.innerHTML = `<div class="quiz-q">${item.q}</div>${optsHTML}<div class="explain" id="exExplain"></div><div id="exNext" style="margin-top:14px"></div>`;
      const hintBtn = document.getElementById("hintBtn");
      hintBtn.onclick = ()=>{ const e=document.getElementById("exExplain"); e.innerHTML=`💡 <b>Hint:</b> ${item.hint}`; e.classList.add("show"); };

      function resolve(ok){
        answered++;
        const e=document.getElementById("exExplain");
        e.innerHTML = `${ok?'✅ <b>Correct!</b> ':'❌ <b>Not quite.</b> '}${item.why}`; e.classList.add("show");
        if(ok){ streak++; sound("correct"); } else { streak=0; sound("wrong"); }
        setBar();
        if(ok && streak>=GOAL){ done(); return; }
        const nb=document.getElementById("exNext");
        nb.innerHTML=`<button class="btn">Next question →</button>`;
        nb.querySelector("button").onclick=render;
      }

      if(act.numeric){
        document.getElementById("checkBtn").onclick=()=>{
          const val=parseFloat(document.getElementById("numIn").value);
          if(isNaN(val)) return;
          document.getElementById("checkBtn").disabled=true;
          resolve(Math.abs(val-item.answer)<=item.tol);
        };
      } else {
        card.querySelectorAll(".opt").forEach(btn=>btn.onclick=()=>{
          const chosen=+btn.dataset.i, opts=card.querySelectorAll(".opt");
          opts.forEach(o=>o.classList.add("disabled"));
          opts[item.a].classList.add("correct");
          if(chosen!==item.a) btn.classList.add("wrong");
          resolve(chosen===item.a);
        });
      }
    }
    setBar(); render();
  }

  /* ============================================================ SPACED REVIEW */
  function renderReview(v){
    const due=reviewDue(), all=reviewAll();
    if(all.length===0){
      v.innerHTML=`<div class="page-head"><div class="section-eyebrow">Daily Review</div><h2>Spaced review 🔁</h2></div>
        <div class="card" style="text-align:center;padding:40px 24px">
          <div style="font-size:50px">✅</div><h3 style="font-size:23px;margin:8px 0">Nothing to review yet</h3>
          <p style="color:var(--muted);max-width:46ch;margin:0 auto 16px">When you miss a quiz or case-study question, it lands here. We'll resurface it on a smart schedule (1, 2, 4, 8, 16 days) so it sticks for good.</p>
          <button class="btn" onclick="App.go('learn')">Go learn something →</button></div>`;
      return;
    }
    // due first; if none due, allow practising the rest ("get ahead")
    const pool = (due.length?due:all).map(([k,r])=>({k,r}));
    const queue = shuffle(pool.map((_,i)=>i));
    let pos=0, right=0;
    v.innerHTML=`<div class="page-head"><div class="section-eyebrow">Daily Review · retrieval practice</div>
      <h2>Spaced review 🔁</h2>
      <div class="ph-sub">${due.length?`${due.length} question${due.length>1?'s':''} due today.`:`Nothing due right now — getting ahead on ${all.length} tracked question${all.length>1?'s':''}.`} Getting one right pushes it further out; missing it brings it back tomorrow.</div></div>
      <div class="overall-progress"><div>${ring(0,52,6,'0%')}</div><div class="op-text" id="revMeta"><b>Question 1 of ${queue.length}</b><small>Recall beats re-reading — give it your best shot.</small></div></div>
      <div id="revZone"></div>`;
    const zone=document.getElementById("revZone");
    function setMeta(){
      const pctp=Math.round(pos/queue.length*100);
      const op=document.querySelector(".overall-progress > div:first-child");
      if(op) op.innerHTML=ring(pctp,52,6,pctp+'%');
      const meta=document.getElementById("revMeta");
      if(meta) meta.innerHTML=`<b>Question ${Math.min(pos+1,queue.length)} of ${queue.length}</b><small>${right} correct so far.</small>`;
    }
    function step(){
      if(pos>=queue.length){ return finish(); }
      const {k,r}=pool[queue[pos]];
      const order=shuffle(r.opts.map((_,i)=>i));
      const opts=order.map(i=>r.opts[i]); const a=order.indexOf(r.a);
      const mod=MODULES.find(m=>m.id===r.mid);
      zone.innerHTML=`<div class="card">
        <div class="quiz-progress">${mod?mod.emoji+' '+mod.title:'Review'}</div>
        <div class="quiz-q">${r.q}</div>
        <div class="options">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}</div>
        <div class="explain" id="revEx"></div><div id="revNext" style="margin-top:16px"></div></div>`;
      zone.querySelectorAll(".opt").forEach(btn=>btn.onclick=()=>{
        const chosen=+btn.dataset.i, os=zone.querySelectorAll(".opt");
        os.forEach(o=>o.classList.add("disabled")); os[a].classList.add("correct");
        const ok=chosen===a;
        if(!ok) btn.classList.add("wrong");
        if(ok){ right++; reviewGotRight(k); sound("correct"); } else { reviewGotWrong(k); sound("wrong"); }
        const ex=document.getElementById("revEx");
        ex.innerHTML=`${ok?'✅ <b>Got it — pushed further out.</b> ':'🔁 <b>Brought back for tomorrow.</b> '}${r.why}`; ex.classList.add("show");
        const nb=document.getElementById("revNext");
        nb.innerHTML=`<button class="btn">${pos<queue.length-1?'Next →':'Finish review →'}</button>`;
        nb.querySelector("button").onclick=()=>{ pos++; setMeta(); pos<queue.length?step():finish(); };
      });
    }
    function finish(){
      addXP(20); sound("win"); confetti(); earn("reviewer");
      zone.innerHTML=`<div class="card" style="text-align:center;padding:24px">
        <div style="font-size:50px">🧠</div><h3 style="font-size:24px;margin:8px 0">Review complete!</h3>
        <p style="color:var(--muted)">You recalled <b style="color:var(--green-ink)">${right}/${queue.length}</b> correctly · +20 XP</p>
        <p style="color:var(--muted);font-size:14px;max-width:46ch;margin:6px auto 16px">Come back tomorrow — items you missed return sooner, items you nailed return later. That spacing is what locks knowledge into long-term memory.</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn secondary" onclick="App.go('practice')">Back to practice</button>
          <button class="btn" onclick="App.go('learn')">Keep learning →</button></div></div>`;
    }
    setMeta(); step();
  }

  /* ============================================================ INVESTING ARENA (brokerage style) */
  function hashStr(s){ let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))>>>0; return h; }
  function fmt2(n){ return "$"+(Math.round(n*100)/100).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); }

  function initArena(){
    return {
      v:3, apiKey:"", tab:"trade",
      cash:100000, holdings:{}, quotes:{},
      watchlist:[...DEFAULT_WATCHLIST],
      history:[100000], compInit:false,
      dataMode:"loading", lastErr:"",
      competitors: COMPETITORS.map(c=>({ name:c.name, style:c.style, weights:c.weights, shares:{}, cash:0 }))
    };
  }

  // fetch a single real (delayed) quote from Yahoo Finance via a no-key CORS proxy
  async function fetchYahoo(sym){
    const url='https://query1.finance.yahoo.com/v8/finance/chart/'+encodeURIComponent(sym)+'?interval=1d&range=1d';
    const proxies=[
      u=>'https://api.allorigins.win/raw?url='+encodeURIComponent(u),
      u=>'https://thingproxy.freeboard.io/fetch/'+u,
      u=>'https://api.allorigins.win/get?url='+encodeURIComponent(u)
    ];
    for(const wrap of proxies){
      try{
        const r=await fetch(wrap(url)); if(!r.ok) continue;
        let txt=await r.text();
        let j=JSON.parse(txt);
        if(j && j.contents) j=JSON.parse(j.contents); // allorigins /get wrapper
        const m=j&&j.chart&&j.chart.result&&j.chart.result[0]&&j.chart.result[0].meta;
        if(m && m.regularMarketPrice>0){
          const c=m.regularMarketPrice, pc=m.chartPreviousClose||m.previousClose||c;
          return { c, pc, d:c-pc, dp:pc?(c-pc)/pc*100:0 };
        }
      }catch(e){}
    }
    return null;
  }

  async function fetchQuotes(syms){
    const inv=state.invest; if(!inv) return;
    let real=0;
    inv._real = inv._real || {};
    if(inv.apiKey){
      await Promise.all(syms.map(async s=>{
        try{
          const r=await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(s)}&token=${inv.apiKey}`);
          if(r.status===401||r.status===403){ inv.lastErr="Finnhub rejected the key (check it's correct)."; return; }
          if(r.status===429){ inv.lastErr="Finnhub rate limit hit — wait a minute."; return; }
          const j=await r.json();
          if(j && typeof j.c==="number" && j.c>0){ inv.quotes[s]={ c:j.c, pc:j.pc||j.c, d:j.d||0, dp:j.dp||0 }; inv._real[s]=1; real++; }
        }catch(e){ inv.lastErr="Network blocked the request to Finnhub."; }
      }));
      inv.dataMode = real>0 ? "finnhub" : "sim";
      if(real>0) inv.lastErr="";
    } else {
      // no key → attempt real delayed quotes via proxy (best effort, with one retry for misses)
      const results=await Promise.all(syms.map(s=>fetchYahoo(s)));
      results.forEach((q,i)=>{ if(q){ inv.quotes[syms[i]]=q; inv._real[syms[i]]=1; real++; } });
      const misses=syms.filter(s=>!inv._real[s]);
      if(misses.length){
        const retry=await Promise.all(misses.map(s=>fetchYahoo(s)));
        retry.forEach((q,i)=>{ if(q){ inv.quotes[misses[i]]=q; inv._real[misses[i]]=1; real++; } });
      }
      const everReal=Object.keys(inv._real).length;
      inv.dataMode = everReal>0 ? "yahoo" : "sim";
      inv.lastErr = everReal>0 ? "" : "Could not reach a free price source from your browser.";
    }
    // any symbol still without a quote → seed it (static, not fake-moving) unless we're fully simulated
    if(inv.dataMode==="sim"){
      syms.forEach(s=>{ const prev=inv.quotes[s];
        const base=(prev&&prev.c)||SEED_PRICES[s]||(40+(hashStr(s)%260)); const pc=(prev&&prev.pc)||base;
        const c=Math.max(0.5, base*(1+(Math.random()-0.49)*0.012));
        inv.quotes[s]={ c, pc, d:c-pc, dp:(c-pc)/pc*100 }; });
    } else {
      syms.forEach(s=>{ if(!inv.quotes[s]){ const base=SEED_PRICES[s]||(40+(hashStr(s)%260)); inv.quotes[s]={ c:base, pc:base, d:0, dp:0 }; } });
    }
  }

  function renderInvest(v){
    if(!state.invest || state.invest.v!==3) state.invest=initArena();
    const inv=state.invest;
    let tradeSym = inv.watchlist[0]||"AAPL";
    let tradeSide = "buy";

    const priceOf = s => { const q=inv.quotes[s]; return q&&q.c ? q.c : (SEED_PRICES[s]||100); };
    const acctValue = () => { let t=inv.cash; for(const s in inv.holdings) t+=inv.holdings[s].shares*priceOf(s); return t; };
    const investedValue = () => { let t=0; for(const s in inv.holdings) t+=inv.holdings[s].shares*priceOf(s); return t; };
    const todayChange = () => { let t=0; for(const s in inv.holdings){ const q=inv.quotes[s]; if(q) t+=inv.holdings[s].shares*(q.c-q.pc); } return t; };

    function ensureComp(){
      if(inv.compInit) return;
      if(inv.dataMode==="loading") return; // wait for first real prices so everyone starts at $100k fairly
      inv.competitors.forEach(c=>{
        c.shares={}; let spent=0;
        for(const s in c.weights){ const sh=Math.floor(100000*c.weights[s]/priceOf(s)); c.shares[s]=sh; spent+=sh*priceOf(s); }
        c.cash=100000-spent;
      });
      inv.compInit=true;
    }
    const compValue = c => { let t=c.cash; for(const s in c.shares) t+=c.shares[s]*priceOf(s); return t; };

    function rankings(){
      ensureComp();
      const me={ name:"You", you:true, value:acctValue(), style:"Your portfolio" };
      const rows=inv.competitors.map(c=>({ name:c.name, style:c.style, value:compValue(c) })).concat(me)
        .sort((a,b)=>b.value-a.value);
      const myRank=rows.findIndex(r=>r.you)+1;
      if(myRank===1) earn("top");
      return { rows, myRank };
    }
    function allSymbols(){
      const set=new Set([...inv.watchlist, ...Object.keys(inv.holdings)]);
      COMPETITORS.forEach(c=>Object.keys(c.weights).forEach(s=>set.add(s)));
      return [...set];
    }

    /* ----- guided missions (theory → practice) ----- */
    const MISSIONS=[
      { id:"m_first", icon:"🛒", title:"Place your first trade", desc:"Buy any stock to get started.", xp:30, lesson:"stocks", check:()=>Object.keys(inv.holdings).length>=1 },
      { id:"m_index", icon:"🌍", title:"Own the whole market", desc:"Hold a broad index fund (SPY, QQQ, VOO or DIA).", xp:30, lesson:"funds", check:()=>["SPY","QQQ","VOO","DIA"].some(s=>inv.holdings[s]) },
      { id:"m_div", icon:"🧺", title:"Diversify", desc:"Hold at least 3 different stocks at once.", xp:40, lesson:"allocation", check:()=>Object.keys(inv.holdings).length>=3 },
      { id:"m_bond", icon:"🏦", title:"Add a shock absorber", desc:"Hold a bond fund (BND or AGG).", xp:30, lesson:"bonds", check:()=>["BND","AGG"].some(s=>inv.holdings[s]) },
      { id:"m_balance", icon:"⚖️", title:"Build a balanced portfolio", desc:"Hold stocks AND a bond fund, while keeping some cash.", xp:50, lesson:"allocation", check:()=>{ const h=inv.holdings; const hasStock=Object.keys(h).some(s=>!["BND","AGG"].includes(s)); const hasBond=["BND","AGG"].some(s=>h[s]); return hasStock&&hasBond&&inv.cash>=1000; } },
      { id:"m_invested", icon:"💪", title:"Put your money to work", desc:"Get most of your cash invested (under $20k cash).", xp:30, lesson:"strategies", check:()=>inv.cash<20000 && Object.keys(inv.holdings).length>0 },
      { id:"m_profit", icon:"📈", title:"Finish in the green", desc:"Grow your account above $100,000.", xp:40, lesson:"psychology", check:()=>acctValue()>100000 }
    ];
    function evalMissions(){
      state.missions=state.missions||{};
      const newly=MISSIONS.filter(m=>!state.missions[m.id] && m.check());
      if(newly.length){ newly.forEach(m=>state.missions[m.id]=true); const tot=newly.reduce((s,m)=>s+m.xp,0); addXP(tot); earn("missions"); save(); sound("level"); confetti({count:80,originY:0.3,emojis:["🎯","✅","🚀"]}); newly.forEach(m=>toast(`🎯 Mission complete: ${m.title} (+${m.xp} XP)`)); }
    }
    function tabMissions(){
      evalMissions();
      const body=document.getElementById("tabBody");
      const doneN=MISSIONS.filter(m=>state.missions&&state.missions[m.id]).length;
      body.innerHTML=`<p style="color:var(--muted);margin-bottom:16px">Turn theory into practice — these missions connect your lessons to real trades. <b>${doneN}/${MISSIONS.length}</b> complete.</p>`+
        MISSIONS.map(m=>{ const done=state.missions&&state.missions[m.id]; const mod=MODULES.find(x=>x.id===m.lesson);
          return `<div class="mission ${done?'complete':''}"><div class="mi-check">${done?'✓':''}</div>
            <div class="mi-body"><b>${m.icon} ${m.title}</b><span>${m.desc}${mod?` · learned in “${mod.title}”`:''}</span></div>
            <span class="mi-xp">+${m.xp} XP</span></div>`; }).join("");
    }
    async function refresh(){
      await fetchQuotes(allSymbols());
      ensureComp();
      if(!inv.benchStart && priceOf("SPY")) inv.benchStart=priceOf("SPY");
      const av=acctValue(), last=inv.history[inv.history.length-1];
      if(Math.abs(av-last)>0.01 || inv.history.length===1) inv.history.push(av);
      if(inv.history.length>240) inv.history=inv.history.slice(-240);
      save(); draw();
    }
    function order(side, sym, qty){
      qty=Math.floor(qty);
      if(!sym || !qty || qty<1){ toast("Enter a symbol and share quantity"); return; }
      const px=priceOf(sym), value=px*qty;
      if(side==="buy"){
        if(value>inv.cash){ toast("Not enough buying power 💸"); return; }
        const h=inv.holdings[sym]||{shares:0,avgCost:0}, newSh=h.shares+qty;
        h.avgCost=(h.avgCost*h.shares+value)/newSh; h.shares=newSh;
        inv.holdings[sym]=h; inv.cash-=value;
        earn("investor"); sound("buy"); confetti({count:46,originY:0.2,emojis:["💸","📈","🤑","💵"]}); toast(`✓ Bought ${qty} ${sym} @ ${fmt2(px)}`);
      } else {
        const h=inv.holdings[sym]; if(!h||qty>h.shares){ toast("You don't own that many shares"); return; }
        h.shares-=qty; inv.cash+=value; if(h.shares<=0) delete inv.holdings[sym];
        sound("sell"); toast(`✓ Sold ${qty} ${sym} @ ${fmt2(px)}`);
      }
      inv.history[inv.history.length-1]=acctValue(); save(); draw();
    }

    function draw(){
      evalMissions();
      const av=acctValue(), gain=av-100000, gpct=gain/100000*100, tc=todayChange();
      const { rows, myRank }=rankings();
      const mode=inv.dataMode||"loading";
      const visSyms=[...new Set([...inv.watchlist, ...Object.keys(inv.holdings)])];
      const realN=visSyms.filter(s=>inv._real&&inv._real[s]).length, totN=visSyms.length;
      const srcInfo = mode==="finnhub" ? {cls:"on",txt:"🟢 Live · real-time (Finnhub)"}
        : mode==="yahoo" ? {cls: realN/totN>=0.5?"on":"warn", txt:`${realN/totN>=0.5?'🟢':'🟡'} Real prices: ${realN}/${totN} live (delayed) · ↻ to load more`}
        : mode==="loading" ? {cls:"",txt:"⏳ Loading prices…"}
        : {cls:"warn",txt:"🟡 Simulated prices"};
      const missDone=MISSIONS.filter(m=>state.missions&&state.missions[m.id]).length;
      v.innerHTML = `<div id="arenaRoot">
        <div class="arena-top">
          <div><div class="section-eyebrow" style="margin:0">Investing Competition</div>
            <h2 style="font-size:26px;margin:2px 0">💼 Trading Simulator</h2></div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <div class="data-src ${srcInfo.cls}"><span class="live-dot"></span>${srcInfo.txt}</div>
            <button class="ghost-btn" id="refreshBtn" title="Refresh prices" style="width:auto;height:auto;padding:7px 12px">↻</button>
            <button class="ghost-btn" id="cfgBtn" style="width:auto;height:auto;padding:7px 12px">${inv.apiKey?'Settings':'Go real-time'}</button>
          </div>
        </div>
        ${mode==="sim"?`<div class="callout warn" style="margin:0 0 14px">⚠️ <b>Showing sample prices.</b> ${inv.lastErr||'A free price feed could not be reached from your browser.'} Click <b>↻</b> to retry, or add a free Finnhub key below for reliable real-time data.</div>`:''}
        <div id="cfgPanel" class="cfg-panel" style="display:none">
          <p style="margin:0 0 8px;font-size:14px;color:var(--ink-2)">Prices come from <b>Yahoo Finance (free, ~15-min delayed)</b> automatically. For <b>real-time</b> data, paste a free <a href="https://finnhub.io/register" target="_blank" rel="noopener">Finnhub API key</a> (30-second signup) — stored only in your browser.</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap"><input type="text" id="apiKeyIn" placeholder="Finnhub API key (optional)" value="${inv.apiKey||''}" style="flex:1;min-width:200px">
            <button class="btn" id="saveKey">Save & connect</button>${inv.apiKey?'<button class="btn secondary" id="clrKey">Use free feed</button>':''}</div>
        </div>
        <div class="acct-bar">
          <div class="acct-stat big"><small>Account Value</small><b>${fmt2(av)}</b></div>
          <div class="acct-stat"><small>Today's Change</small><b class="${tc>=0?'pl-pos':'pl-neg'}">${tc>=0?'+':''}${fmt2(tc)}</b></div>
          <div class="acct-stat"><small>Total Gain / Loss</small><b class="${gain>=0?'pl-pos':'pl-neg'}">${gain>=0?'+':''}${fmt2(gain)} (${gpct>=0?'+':''}${gpct.toFixed(2)}%)</b></div>
          <div class="acct-stat"><small>Cash / Buying Power</small><b>${fmt2(inv.cash)}</b></div>
          <div class="acct-stat"><small>Class Rank</small><b>#${myRank} <span style="color:var(--muted);font-weight:500;font-size:13px">of ${rows.length}</span></b></div>
        </div>
        <div class="arena-tabs">
          ${[["trade","📈 Trade"],["portfolio","📁 Portfolio"],["checkup","🩺 Check-up"],["missions",`🎯 Missions ${missDone}/${MISSIONS.length}`],["rankings","🏆 Rankings"]].map(([t,l])=>`<button class="arena-tab ${inv.tab===t?'active':''}" data-tab="${t}">${l}</button>`).join("")}
        </div>
        <div id="tabBody"></div>
      </div>`;
      document.getElementById("cfgBtn").onclick=()=>{ const p=document.getElementById("cfgPanel"); p.style.display=p.style.display==='none'?'block':'none'; };
      document.getElementById("refreshBtn").onclick=()=>{ toast("↻ Refreshing prices…"); refresh(); };
      const sk=document.getElementById("saveKey"); if(sk) sk.onclick=()=>{ inv.apiKey=document.getElementById("apiKeyIn").value.trim(); inv.quotes={}; inv.compInit=false; inv.dataMode="loading"; save(); toast(inv.apiKey?'🟢 Connecting to Finnhub…':'Switched to free feed'); refresh(); };
      const ck=document.getElementById("clrKey"); if(ck) ck.onclick=()=>{ inv.apiKey=""; inv.quotes={}; inv.compInit=false; inv.dataMode="loading"; save(); toast('Using free delayed feed'); refresh(); };
      document.querySelectorAll(".arena-tab").forEach(b=>b.onclick=()=>{ inv.tab=b.dataset.tab; save(); draw(); });
      ({ trade:tabTrade, portfolio:tabPortfolio, checkup:tabCheckup, missions:tabMissions, rankings:tabRankings }[inv.tab]||tabTrade)();
      // animate the headline account value
      const avEl=document.querySelector(".acct-stat.big b"); if(avEl && inv._lastShownAv!=null && Math.abs(inv._lastShownAv-av)>0.5){ countUp(avEl, av, {from:inv._lastShownAv, prefix:"$", dec:2}); } inv._lastShownAv=av;
    }

    function tabTrade(){
      const body=document.getElementById("tabBody");
      body.innerHTML=`<div class="trade-grid">
        <div><div class="ticket">
          <h3 style="font-size:18px;margin-bottom:14px">Order Ticket</h3>
          <label class="tk-label">Symbol</label>
          <div style="display:flex;gap:8px"><input type="text" id="tkSym" value="${tradeSym}" style="text-transform:uppercase"><button class="btn secondary" id="tkLookup">Quote</button></div>
          <div class="quote-line" id="quoteLine"></div>
          <label class="tk-label">Action</label>
          <div class="side-toggle"><button class="${tradeSide==='buy'?'active buy':''}" data-side="buy">Buy</button><button class="${tradeSide==='sell'?'active sell':''}" data-side="sell">Sell</button></div>
          <label class="tk-label">Quantity (shares)</label>
          <input type="number" id="tkQty" min="1" value="1">
          <div class="tk-est" id="tkEst"></div>
          <button class="btn big" id="tkSubmit" style="width:100%;margin-top:14px;justify-content:center">Submit ${tradeSide==='buy'?'Buy':'Sell'} Order</button>
          <p style="color:var(--muted);font-size:12px;margin-top:10px;text-align:center">Market order · executes at the current price</p>
        </div></div>
        <div>
          <div class="wl-head"><h3 style="font-size:18px">Watchlist</h3>
            <div style="display:flex;gap:6px"><input type="text" id="wlAdd" placeholder="Ticker…" style="width:96px;text-transform:uppercase"><button class="btn secondary" id="wlAddBtn">Add</button></div></div>
          <table class="data quote-table"><thead><tr><th>Symbol</th><th style="text-align:right">Price</th><th style="text-align:right">Today</th><th></th></tr></thead><tbody id="wlBody"></tbody></table>
        </div>
      </div>`;

      function estimate(){ const qty=+(document.getElementById("tkQty")?.value||0), px=priceOf(tradeSym), est=qty*px; return `<span style="color:var(--muted)">Estimated ${tradeSide==='buy'?'cost':'proceeds'}:</span> <b>${fmt2(est)}</b>`; }
      function paintQuote(){
        const qq=inv.quotes[tradeSym], ql=document.getElementById("quoteLine");
        if(qq){ const isReal=inv._real&&inv._real[tradeSym]; ql.innerHTML=`<b style="font-size:24px">${fmt2(qq.c)}</b> <span class="${qq.dp>=0?'pl-pos':'pl-neg'}">${qq.dp>=0?'▲':'▼'} ${Math.abs(qq.dp).toFixed(2)}%</span> <span class="src-tag">${isReal?(inv.apiKey?'real-time':'real · delayed'):'sample'}</span>`; }
        else ql.innerHTML=`<span style="color:var(--muted)">No quote yet — click Quote.</span>`;
        const held=inv.holdings[tradeSym];
        document.getElementById("tkEst").innerHTML=estimate()+(held?`<div style="color:var(--muted);font-size:12px;margin-top:4px">Position: ${held.shares} sh · avg ${fmt2(held.avgCost)}</div>`:'');
      }
      paintQuote();
      document.getElementById("tkLookup").onclick=async()=>{ tradeSym=(document.getElementById("tkSym").value.trim().toUpperCase())||tradeSym; await fetchQuotes([tradeSym]); save(); paintQuote(); };
      document.getElementById("tkSym").addEventListener("change",e=>{ tradeSym=e.target.value.trim().toUpperCase(); paintQuote(); });
      document.getElementById("tkQty").addEventListener("input",paintQuote);
      document.querySelectorAll(".side-toggle button").forEach(b=>b.onclick=()=>{ tradeSide=b.dataset.side; draw(); });
      document.getElementById("tkSubmit").onclick=()=>{ tradeSym=document.getElementById("tkSym").value.trim().toUpperCase(); order(tradeSide, tradeSym, +document.getElementById("tkQty").value); };
      document.getElementById("wlAddBtn").onclick=async()=>{ const s=document.getElementById("wlAdd").value.trim().toUpperCase(); if(s&&!inv.watchlist.includes(s)){ inv.watchlist.unshift(s); await fetchQuotes([s]); save(); draw(); } };

      document.getElementById("wlBody").innerHTML=inv.watchlist.map(s=>{ const qq=inv.quotes[s], dp=qq?qq.dp:0;
        return `<tr><td><b>${s}</b></td><td style="text-align:right">${qq?fmt2(qq.c):'—'}</td>
          <td style="text-align:right" class="${dp>=0?'pl-pos':'pl-neg'}">${qq?(dp>=0?'+':'')+dp.toFixed(2)+'%':'—'}</td>
          <td style="text-align:right;white-space:nowrap"><button class="mini-btn" data-trade="${s}">Trade</button> <button class="mini-btn x" data-rm="${s}">✕</button></td></tr>`; }).join("");
      document.querySelectorAll("[data-trade]").forEach(b=>b.onclick=()=>{ tradeSym=b.dataset.trade; tradeSide="buy"; draw(); });
      document.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{ inv.watchlist=inv.watchlist.filter(x=>x!==b.dataset.rm); save(); draw(); });
    }

    function tabPortfolio(){
      const body=document.getElementById("tabBody");
      const syms=Object.keys(inv.holdings), invVal=investedValue();
      const rowsHTML = syms.length ? syms.map(s=>{ const h=inv.holdings[s], px=priceOf(s), mv=h.shares*px, cost=h.avgCost*h.shares, gl=mv-cost, glp=cost>0?gl/cost*100:0;
        return `<tr><td><b>${s}</b></td><td style="text-align:right">${h.shares}</td><td style="text-align:right">${fmt2(h.avgCost)}</td>
          <td style="text-align:right">${fmt2(px)}</td><td style="text-align:right">${fmt2(mv)}</td>
          <td style="text-align:right" class="${gl>=0?'pl-pos':'pl-neg'}">${gl>=0?'+':''}${fmt2(gl)}<br><small>${gl>=0?'+':''}${glp.toFixed(2)}%</small></td>
          <td style="text-align:right"><button class="mini-btn" data-sell="${s}">Sell</button></td></tr>`; }).join("")
        : `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:26px">No positions yet. Go to the <b>Trade</b> tab to buy your first stock.</td></tr>`;
      body.innerHTML=`<canvas class="chart" id="invChart" style="height:180px;margin-bottom:16px"></canvas>
        <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:14px;color:var(--ink-2);font-size:14px">
          <div>Invested: <b>${fmt2(invVal)}</b></div><div>Cash: <b>${fmt2(inv.cash)}</b></div><div>Positions: <b>${syms.length}</b></div></div>
        <table class="data holdings"><thead><tr><th>Symbol</th><th style="text-align:right">Shares</th><th style="text-align:right">Avg Cost</th><th style="text-align:right">Last</th><th style="text-align:right">Mkt Value</th><th style="text-align:right">Gain / Loss</th><th></th></tr></thead><tbody>${rowsHTML}</tbody></table>`;
      drawLine("invChart", inv.history, 100000);
      document.querySelectorAll("[data-sell]").forEach(b=>b.onclick=()=>{ tradeSym=b.dataset.sell; tradeSide="sell"; inv.tab="trade"; save(); draw(); });
    }

    function tabCheckup(){
      const body=document.getElementById("tabBody");
      const syms=Object.keys(inv.holdings), invVal=investedValue(), av=acctValue();
      if(invVal<=0){ body.innerHTML=`<div class="card" style="text-align:center;padding:30px"><div style="font-size:46px">🩺</div><h3>Nothing to check up yet</h3><p style="color:var(--muted)">Buy a few investments in the <b>Trade</b> tab, then come back for a full diagnosis of your portfolio.</p></div>`; return; }
      earn("checkup");
      const RISK={ BND:1,AGG:1, SPY:3,QQQ:4,VOO:3,DIA:3, KO:2,JNJ:2,WMT:2,COST:3,JPM:3,V:3,XOM:4,DIS:4, AAPL:4,MSFT:4,GOOGL:4,AMZN:4,META:5,NFLX:5,NVDA:6,AMD:6,TSLA:7 };
      const SECT=(typeof SECTORS!=="undefined")?SECTORS:{};
      const bySector={}; let maxW=0;
      syms.forEach(s=>{ const val=inv.holdings[s].shares*priceOf(s); const sec=SECT[s]||"Other"; bySector[sec]=(bySector[sec]||0)+val; const w=val/invVal; if(w>maxW)maxW=w; });
      const nSec=Object.keys(bySector).length;
      const divScore=Math.max(0,Math.min(100, Math.round( (Math.min(syms.length,6)/6)*40 + (Math.min(nSec,5)/5)*40 + (1-maxW)*20 )));
      let riskW=0; syms.forEach(s=>{ riskW+=(inv.holdings[s].shares*priceOf(s)/invVal)*(RISK[s]||4); });
      const riskLabel= riskW<2.5?"Low 🟢":riskW<4?"Moderate 🟡":riskW<5.5?"High 🟠":"Very High 🔴";
      const cashW=Math.round(inv.cash/av*100);
      const myRet=(av-100000)/100000*100;
      const spRet= inv.benchStart? (priceOf("SPY")/inv.benchStart-1)*100 : 0;
      const beating=myRet>=spRet;
      // sector bars
      const palette=["#4f46e5","#0ea5e9","#059669","#b45309","#e11d48","#9b7bff","#f59e0b","#14b8a6"];
      const secRows=Object.entries(bySector).sort((a,b)=>b[1]-a[1]).map(([sec,val],i)=>{ const w=Math.round(val/invVal*100);
        return `<div class="sec-row"><span class="sec-name">${sec}</span><div class="sec-bar"><i style="width:${w}%;background:${palette[i%palette.length]}"></i></div><span class="sec-pct">${w}%</span></div>`; }).join("");
      // feedback
      const fb=[];
      if(syms.length<3) fb.push({w:1,t:"You're holding very few positions — add more (or a broad index fund) to diversify."});
      if(maxW>0.5) fb.push({w:1,t:`One holding is ${Math.round(maxW*100)}% of your portfolio — that's concentrated. Spreading out lowers risk.`});
      if(nSec<2) fb.push({w:1,t:"Everything is in one sector. Mixing sectors cushions you when one area falls."});
      if(cashW>40) fb.push({w:1,t:`You're holding ${cashW}% cash — fine short-term, but cash doesn't grow. Consider investing more.`});
      if(riskW>=5.5) fb.push({w:1,t:"This is a high-risk mix — expect big swings. Make sure that fits your timeline and nerves."});
      if(!fb.length) fb.push({w:0,t:"Nicely balanced! Good spread across holdings and sectors. Keep contributing and rebalance occasionally."});
      body.innerHTML=`
        <div class="checkup-scores">
          <div class="cu-score"><div class="cu-ring">${ring(divScore,84,8,divScore)}</div><b>Diversification</b><small>${divScore>=70?'Well spread':divScore>=40?'Could be wider':'Too concentrated'}</small></div>
          <div class="cu-score"><div class="cu-big ${riskW<4?'pl-pos':riskW<5.5?'':'pl-neg'}">${riskLabel}</div><b>Risk level</b><small>${syms.length} holdings · ${nSec} sector${nSec>1?'s':''}</small></div>
          <div class="cu-score"><div class="cu-big ${beating?'pl-pos':'pl-neg'}">${beating?'Beating':'Trailing'}</div><b>vs S&P 500</b><small>You ${myRet>=0?'+':''}${myRet.toFixed(1)}% · S&P ${spRet>=0?'+':''}${spRet.toFixed(1)}%</small></div>
        </div>
        <div class="card"><div class="section-eyebrow">Sector breakdown</div>${secRows||'<p style="color:var(--muted)">No sectors yet.</p>'}</div>
        <div class="card"><div class="section-eyebrow">Coach's notes</div>${fb.map(f=>`<div class="callout ${f.w?'warn':'key'}" style="margin:10px 0">${f.w?'⚠️':'✅'} ${f.t}</div>`).join("")}</div>`;
    }

    function tabRankings(){
      const { rows }=rankings(), body=document.getElementById("tabBody");
      body.innerHTML=`<table class="data rank-table"><thead><tr><th style="width:48px">#</th><th>Trader</th><th>Strategy</th><th style="text-align:right">Account Value</th><th style="text-align:right">Return</th></tr></thead><tbody>
        ${rows.map((r,i)=>{ const ret=(r.value-100000)/100000*100;
          return `<tr class="${r.you?'me':''}"><td><b>${i+1}</b>${i===0?' 👑':''}</td><td>${r.you?'⭐ ':''}${r.name}</td>
            <td style="color:var(--muted)">${r.style}</td><td style="text-align:right"><b>${fmt2(r.value)}</b></td>
            <td style="text-align:right" class="${ret>=0?'pl-pos':'pl-neg'}">${ret>=0?'+':''}${ret.toFixed(2)}%</td></tr>`; }).join("")}
      </tbody></table>
      <p style="color:var(--muted);font-size:12px;margin-top:12px">Everyone starts with <b>$100,000</b>. Competitors are simulated traders holding real tickers, valued at the same ${inv.apiKey?'live':'simulated'} prices you trade at — so the board moves with the real market. A shared leaderboard across real students needs a small backend (Firebase/Supabase) — just ask and I'll add it.</p>`;
    }

    draw();
    refresh();
    if(window.__arenaTimer) clearInterval(window.__arenaTimer);
    window.__arenaTimer=setInterval(()=>{ if(document.getElementById("arenaRoot")) refresh(); else { clearInterval(window.__arenaTimer); window.__arenaTimer=null; } }, inv.apiKey?20000:45000);
  }

  /* ============================================================ TOOLS HUB */
  const TOOLS = [
    { id:"compound", emoji:"🧮", name:"Compound Calculator", desc:"See how money snowballs over time." },
    { id:"backtest", emoji:"⏳", name:"Time Machine", desc:"Backtest a real S&P 500 investment through history.", route:"backtest" },
    { id:"portfolio", emoji:"🥧", name:"Portfolio Builder", desc:"Mix stocks/bonds/cash & see the risk." },
    { id:"analyzer", emoji:"🔬", name:"Stock Analyzer", desc:"Read real-style stock profiles." },
    { id:"sim", emoji:"📊", name:"Market Simulator", desc:"Survive 10 rounds of market chaos." },
  ];
  function renderTools(v){
    v.innerHTML = `
      <div class="page-head">
        <div class="section-eyebrow">Interactive</div>
        <h2>Tools & games 🎮</h2>
        <div class="ph-sub">Learning by doing beats reading — get hands-on with these calculators and simulators.</div>
      </div>
      <div class="modules">${TOOLS.map(t=>`<div class="module" onclick="${t.route?`App.go('${t.route}')`:`App.go('tool','${t.id}')`}">
        <div class="m-top"><div class="m-emoji">${t.emoji}</div></div><h4>${t.name}</h4><p>${t.desc}</p>
        <div class="m-foot"><span class="pill todo">Open →</span></div></div>`).join("")}</div>`;
  }
  function renderTool(v, id){
    v.innerHTML = `<div class="lesson-wrap"><div class="crumb" onclick="App.go('tools')">← All tools</div><div id="toolMount"></div></div>`;
    const mount = document.getElementById("toolMount");
    ({ compound:toolCompound, portfolio:toolPortfolio, analyzer:toolAnalyzer, sim:toolSim }[id]||toolCompound)(mount);
  }

  /* ---------- TOOL 1: Compound Calculator ---------- */
  function toolCompound(mount){
    earn("calc");
    mount.innerHTML = `
      <h1>🧮 Compound Calculator</h1>
      <p class="lesson-sub">Watch how regular investing snowballs. Drag the sliders.</p>
      <div class="tool"><div class="grid2">
        <div class="field"><label>Starting amount: <span class="val" id="lStart">$1,000</span></label><input type="range" id="cStart" min="0" max="50000" step="500" value="1000"></div>
        <div class="field"><label>Monthly contribution: <span class="val" id="lMonthly">$200</span></label><input type="range" id="cMonthly" min="0" max="2000" step="25" value="200"></div>
        <div class="field"><label>Years invested: <span class="val" id="lYears">30</span></label><input type="range" id="cYears" min="1" max="50" step="1" value="30"></div>
        <div class="field"><label>Annual return: <span class="val" id="lRate">7%</span></label><input type="range" id="cRate" min="1" max="15" step="0.5" value="7"></div>
      </div></div>
      <div class="tool" style="text-align:center">
        <div style="color:var(--muted);font-weight:600">Estimated value after <span id="oYears">30</span> years</div>
        <div class="result-big" id="oTotal">$0</div>
        <div style="display:flex;gap:28px;justify-content:center;flex-wrap:wrap;margin-top:10px">
          <div><div style="color:var(--muted);font-size:13px">You contributed</div><b id="oContrib" style="font-size:20px">$0</b></div>
          <div><div style="color:var(--muted);font-size:13px">Growth (compounding)</div><b id="oGrowth" style="font-size:20px;color:var(--green)">$0</b></div>
        </div>
        <canvas class="chart" id="cChart" style="margin-top:18px"></canvas>
      </div>
      <div class="callout key">💡 Notice how the <b>green growth</b> eventually dwarfs what you actually contributed — that's compounding, and why time matters more than amount.</div>`;
    ["cStart","cMonthly","cYears","cRate"].forEach(i=>document.getElementById(i).addEventListener("input", calc));
    function calc(){
      const start=+cStart.value, monthly=+cMonthly.value, years=+cYears.value, rate=+cRate.value/100;
      lStart.textContent="$"+start.toLocaleString(); lMonthly.textContent="$"+monthly.toLocaleString();
      lYears.textContent=years; lRate.textContent=rate*100+"%"; oYears.textContent=years;
      const series=[]; let bal=start; const r=rate/12;
      for(let mm=1;mm<=years*12;mm++){ bal=bal*(1+r)+monthly; if(mm%12===0) series.push(bal); }
      const contrib=start+monthly*12*years;
      oTotal.textContent=fmt(bal); oContrib.textContent=fmt(contrib); oGrowth.textContent=fmt(bal-contrib);
      drawLine("cChart", series, start);
    }
    calc();
  }
  function fmt(n){ return "$"+Math.round(n).toLocaleString(); }

  function drawLine(id, data, base){
    const c=document.getElementById(id); if(!c) return;
    const dpr=window.devicePixelRatio||1, w=c.clientWidth, h=c.clientHeight||200;
    c.width=w*dpr; c.height=h*dpr; const ctx=c.getContext("2d"); ctx.scale(dpr,dpr); ctx.clearRect(0,0,w,h);
    const max=Math.max(...data, base), min=Math.min(...data, base), pad=10;
    const x=i=>pad+i*(w-2*pad)/(data.length-1||1);
    const y=val=>h-pad-((val-min)/(max-min||1))*(h-2*pad);
    const up = data[data.length-1]>=base;
    const col = up?"#0f9d6b":"#d64560";
    const grad=ctx.createLinearGradient(0,0,0,h);
    grad.addColorStop(0, up?"rgba(15,157,107,.18)":"rgba(214,69,96,.18)"); grad.addColorStop(1,"rgba(255,255,255,0)");
    ctx.beginPath(); ctx.moveTo(x(0),y(data[0])); data.forEach((d,i)=>ctx.lineTo(x(i),y(d)));
    ctx.lineTo(x(data.length-1),h-pad); ctx.lineTo(x(0),h-pad); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath(); ctx.moveTo(x(0),y(data[0])); data.forEach((d,i)=>ctx.lineTo(x(i),y(d)));
    ctx.strokeStyle=col; ctx.lineWidth=2.5; ctx.lineJoin="round"; ctx.stroke();
  }

  /* ---------- TOOL 2: Portfolio Builder ---------- */
  function toolPortfolio(mount){
    const assets=[
      { key:"stocks", name:"Stocks (growth)", color:"#1f4fd8", ret:9, risk:16 },
      { key:"bonds", name:"Bonds (stability)", color:"#0d9488", ret:4, risk:5 },
      { key:"cash", name:"Cash (safety)", color:"#b8860b", ret:1.5, risk:1 },
    ];
    let alloc={stocks:70, bonds:25, cash:5};
    mount.innerHTML = `
      <h1>🥧 Portfolio Builder</h1>
      <p class="lesson-sub">Mix your assets to 100% and see expected return vs. risk update live.</p>
      <div class="tool">
        <div style="margin-bottom:10px;font-size:13px;color:var(--muted)">Quick presets:</div>
        <div class="stock-switch" id="presets">
          <button data-p="aggressive">⚡ Aggressive 90/10</button>
          <button data-p="balanced">⚖️ Balanced 60/40</button>
          <button data-p="conservative">🛡️ Conservative 40/60</button>
        </div>
        <div id="sliders"></div><div id="totalWarn" style="font-weight:700;margin-top:6px"></div>
      </div>
      <div class="tool"><div class="donut-wrap">
        <canvas id="donut" width="200" height="200" style="width:200px;height:200px"></canvas>
        <div style="min-width:210px">
          <div class="legend" id="legend"></div><hr style="border:none;border-top:1px solid var(--line);margin:14px 0">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="color:var(--muted)">Expected return / yr</span><b id="pRet" style="color:var(--green)">—</b></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--muted)">Risk level</span><b id="pRisk">—</b></div>
          <div id="pVerdict" style="margin-top:12px;font-size:14px;color:var(--ink-2)"></div>
        </div></div></div>`;
    function renderSliders(){
      document.getElementById("sliders").innerHTML = assets.map(a=>`
        <div class="alloc-row"><span class="dot" style="background:${a.color}"></span><span class="name">${a.name}</span>
          <input type="range" min="0" max="100" step="5" value="${alloc[a.key]}" data-k="${a.key}"><span class="pct" id="pct_${a.key}">${alloc[a.key]}%</span></div>`).join("");
      document.querySelectorAll('#sliders input').forEach(inp=>inp.addEventListener("input",()=>{ alloc[inp.dataset.k]=+inp.value; update(); }));
    }
    function update(){
      assets.forEach(a=>{ const e=document.getElementById("pct_"+a.key); if(e) e.textContent=alloc[a.key]+"%"; });
      const total=alloc.stocks+alloc.bonds+alloc.cash;
      const warn=document.getElementById("totalWarn");
      if(total!==100) warn.innerHTML=`<span style="color:var(--gold)">Total = ${total}% · adjust to 100% to finish</span>`;
      else { warn.innerHTML=`<span style="color:var(--green)">✓ Total = 100%</span>`; if(alloc.stocks>=40&&alloc.stocks<=80) earn("builder"); }
      const w=k=>alloc[k]/Math.max(total,1);
      const ret=assets.reduce((s,a)=>s+w(a.key)*a.ret,0), risk=assets.reduce((s,a)=>s+w(a.key)*a.risk,0);
      pRet.textContent=ret.toFixed(1)+"%"; pRisk.textContent=risk<6?"Low 🟢":risk<11?"Medium 🟡":"High 🔴";
      pVerdict.innerHTML=verdict(alloc.stocks); drawDonut();
    }
    function verdict(stk){
      if(stk>=80) return "🚀 <b>Aggressive.</b> Big growth potential, but expect steep drops. Great for long horizons (20+ yrs).";
      if(stk>=55) return "⚖️ <b>Balanced.</b> A solid all-rounder — growth with a cushion. A good default for most.";
      if(stk>=35) return "🛡️ <b>Conservative.</b> Smoother ride, slower growth. Fits shorter horizons or lower risk tolerance.";
      return "💤 <b>Very safe.</b> Barely grows, and inflation may nibble it. Best only for money you need soon.";
    }
    function drawDonut(){
      const c=document.getElementById("donut"), ctx=c.getContext("2d"); ctx.clearRect(0,0,200,200);
      const total=alloc.stocks+alloc.bonds+alloc.cash||1; let a0=-Math.PI/2;
      assets.forEach(a=>{ const a1=a0+(alloc[a.key]/total)*Math.PI*2;
        ctx.beginPath(); ctx.moveTo(100,100); ctx.arc(100,100,90,a0,a1); ctx.closePath(); ctx.fillStyle=a.color; ctx.fill(); a0=a1; });
      ctx.beginPath(); ctx.arc(100,100,54,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill();
      document.getElementById("legend").innerHTML=assets.map(a=>`<div><span class="dot" style="background:${a.color}"></span>${a.name.split(" ")[0]} — <b>${alloc[a.key]}%</b></div>`).join("");
    }
    document.querySelectorAll("#presets button").forEach(b=>b.onclick=()=>{
      const p=b.dataset.p; alloc=p==="aggressive"?{stocks:90,bonds:10,cash:0}:p==="balanced"?{stocks:60,bonds:30,cash:10}:{stocks:40,bonds:50,cash:10};
      renderSliders(); update();
    });
    renderSliders(); update();
  }

  /* ---------- TOOL 3: Stock Analyzer ---------- */
  function toolAnalyzer(mount){
    earn("analyst"); let cur=0;
    mount.innerHTML=`
      <h1>🔬 Stock Analyzer</h1>
      <p class="lesson-sub">Pick a company, read its profile like an analyst, then answer the guided questions.</p>
      <div class="stock-switch" id="stkSwitch">${STOCKS.map((s,i)=>`<button data-i="${i}" class="${i===0?'active':''}">${s.emoji} ${s.sym}</button>`).join("")}</div>
      <div id="stkBody"></div>`;
    function render(){
      const s=STOCKS[cur];
      document.querySelectorAll("#stkSwitch button").forEach(b=>b.classList.toggle("active",+b.dataset.i===cur));
      document.getElementById("stkBody").innerHTML=`
        <div class="tool">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px">
            <div><h3 style="font-size:24px">${s.emoji} ${s.name} <span style="color:var(--muted);font-size:16px">(${s.sym})</span></h3><div style="color:var(--muted)">${s.sector}</div></div>
            <div style="text-align:right"><div style="font-size:13px;color:var(--muted)">Share price</div><b style="font-size:26px;font-family:Fraunces">$${s.price}</b></div>
          </div>
          <canvas class="chart" id="stkChart" style="height:120px;margin:14px 0"></canvas>
          <div class="metric-grid">
            <div class="metric"><small>Market Cap</small><b>${s.mcap}</b></div><div class="metric"><small>P/E Ratio</small><b>${s.pe}</b></div>
            <div class="metric"><small>Revenue</small><b>${s.revenue}</b></div><div class="metric"><small>Net Income</small><b>${s.netInc}</b></div>
            <div class="metric"><small>Growth</small><b>${s.growth}</b></div><div class="metric"><small>Div. Yield</small><b>${s.yield}</b></div>
          </div>
          <div class="callout">📋 <b>The story:</b> ${s.story}</div>
        </div>
        <div class="card"><div class="section-eyebrow">Analyst challenge</div><h3>Can you read this stock? 🤔</h3><div id="stkQuiz"></div></div>`;
      drawLine("stkChart", s.spark, s.spark[0]); analyzerQuiz(s);
    }
    function analyzerQuiz(s){
      const body=document.getElementById("stkQuiz"); let qi=0;
      function q(){
        const item=s.questions[qi];
        body.innerHTML=`<div class="quiz-progress">Question ${qi+1} of ${s.questions.length}</div><div class="quiz-q">${item.q}</div>
          <div class="options">${item.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}</div>
          <div class="explain" id="aex"></div><div id="anext" style="margin-top:14px"></div>`;
        body.querySelectorAll(".opt").forEach(btn=>btn.onclick=()=>{
          const ch=+btn.dataset.i, opts=body.querySelectorAll(".opt");
          opts.forEach(o=>o.classList.add("disabled")); opts[item.a].classList.add("correct");
          if(ch!==item.a) btn.classList.add("wrong");
          const ex=document.getElementById("aex"); ex.innerHTML=`${ch===item.a?'✅ <b>Nailed it!</b> ':'💡 '}${item.why}`; ex.classList.add("show");
          const nb=document.getElementById("anext");
          if(qi<s.questions.length-1){ nb.innerHTML=`<button class="btn">Next →</button>`; nb.querySelector("button").onclick=()=>{qi++;q();}; }
          else { nb.innerHTML=`<div style="color:var(--green);font-weight:700">✓ Analysis complete! Try another company above.</div>`; addXP(20); }
        });
      } q();
    }
    document.querySelectorAll("#stkSwitch button").forEach(b=>b.onclick=()=>{cur=+b.dataset.i;render();});
    render();
  }

  /* ---------- TOOL 4: Market Simulator ---------- */
  function toolSim(mount){
    const EVENTS=[
      { t:"📰 A new product launch is a smash hit! Tech sector soars.", eff:0.14 },
      { t:"📉 A surprise interest-rate hike spooks investors.", eff:-0.11 },
      { t:"😱 Recession fears trigger a broad sell-off.", eff:-0.18 },
      { t:"🚀 Blowout earnings season beats all expectations.", eff:0.16 },
      { t:"⚖️ Markets drift sideways on quiet news.", eff:0.01 },
      { t:"🛢️ Energy prices spike, rattling the economy.", eff:-0.09 },
      { t:"💪 A strong jobs report boosts confidence.", eff:0.08 },
      { t:"🦠 A global scare causes sudden panic.", eff:-0.22 },
      { t:"📈 Steady growth — the market grinds higher.", eff:0.06 },
      { t:"🎉 The central bank cuts rates; markets celebrate.", eff:0.13 },
    ];
    let round=0, cash=1000, invested=0, history=[];
    mount.innerHTML=`<h1>📊 Market Simulator</h1>
      <p class="lesson-sub">You have $1,000 and 10 rounds. Each round, decide how much to invest — then the market reacts. Can you keep your cool?</p>
      <div class="tool" id="simStage"></div>`;
    function net(){ return cash+invested; }
    function stage(){
      const s=document.getElementById("simStage");
      if(round>=10) return end(s);
      s.innerHTML=`
        <div class="game-head">
          <div class="game-stat"><small style="color:var(--muted)">Round</small><b>${round+1}/10</b></div>
          <div class="game-stat"><small style="color:var(--muted)">💵 Cash</small><b>${fmt(cash)}</b></div>
          <div class="game-stat"><small style="color:var(--muted)">📈 Invested</small><b>${fmt(invested)}</b></div>
          <div class="game-stat"><small style="color:var(--muted)">Net worth</small><b style="color:var(--brand)">${fmt(net())}</b></div></div>
        <p style="color:var(--muted)">How much of your cash do you want to invest this round?</p>
        <div class="field"><input type="range" id="simAmt" min="0" max="${Math.round(cash)}" step="10" value="${Math.round(cash/2)}"></div>
        <div style="text-align:center;font-weight:700;margin-bottom:14px">Investing: <span class="val" id="simAmtL">${fmt(cash/2)}</span></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
          <button class="btn" id="simGo">Invest & advance ▶</button>
          <button class="btn ghost" id="simSkip">Stay in cash (skip)</button></div>
        ${history.length?`<canvas class="chart" id="simChart" style="height:140px;margin-top:18px"></canvas>`:''}`;
      const amt=document.getElementById("simAmt"); amt&&amt.addEventListener("input",()=>simAmtL.textContent=fmt(+amt.value));
      document.getElementById("simGo").onclick=()=>play(+document.getElementById("simAmt").value);
      document.getElementById("simSkip").onclick=()=>play(0);
      if(history.length) drawLine("simChart", history, 1000);
    }
    function play(addInvest){
      cash-=addInvest; invested+=addInvest;
      const e=EVENTS[(round + (addInvest>0?2:5)) % EVENTS.length];
      invested=Math.max(0, invested*(1+e.eff)); round++; history.push(net());
      const s=document.getElementById("simStage");
      s.innerHTML=`<div class="news">${e.t}<br><b style="color:${e.eff>=0?'var(--green)':'var(--red)'}">Your invested money ${e.eff>=0?'gained':'dropped'} ${Math.abs(e.eff*100).toFixed(0)}% → ${fmt(invested)}</b></div>
        <div class="game-head"><div class="game-stat"><small style="color:var(--muted)">💵 Cash</small><b>${fmt(cash)}</b></div>
          <div class="game-stat"><small style="color:var(--muted)">📈 Invested</small><b>${fmt(invested)}</b></div>
          <div class="game-stat"><small style="color:var(--muted)">Net worth</small><b style="color:var(--brand)">${fmt(net())}</b></div></div>
        <canvas class="chart" id="simChart" style="height:140px;margin:8px 0 16px"></canvas>
        <div style="text-align:center"><button class="btn" id="simNext">${round>=10?'See final results 🏁':'Next round ▶'}</button></div>`;
      drawLine("simChart", history, 1000); document.getElementById("simNext").onclick=stage;
    }
    function end(s){
      earn("trader"); addXP(60);
      const final=net(), gain=final-1000, pct=(gain/1000*100).toFixed(0);
      s.innerHTML=`<div style="text-align:center"><div style="font-size:52px">${gain>0?'🏆':'📉'}</div>
        <h3 style="font-size:28px">You finished with ${fmt(final)}</h3>
        <p style="color:${gain>=0?'var(--green)':'var(--red)'};font-weight:700;font-size:18px">${gain>=0?'+':''}${pct}% on your $1,000</p>
        <canvas class="chart" id="simChart" style="height:160px;margin:14px 0"></canvas>
        <div class="callout key" style="text-align:left">🧠 <b>Lesson:</b> Jumping in and out based on scary headlines is exhausting and unpredictable. In real life, most people do best by <b>staying invested steadily</b> and ignoring the noise — that's dollar-cost averaging at work.</div>
        <button class="btn" onclick="App.go('tool','sim')">Play again 🔄</button></div>`;
      drawLine("simChart", history, 1000);
    }
    stage();
  }

  /* ============================================================ GLOSSARY */
  function renderGlossary(v){
    earn("scholar");
    v.innerHTML=`
      <div class="page-head">
        <div class="section-eyebrow">Reference</div>
        <h2>Glossary 📖</h2>
        <div class="ph-sub">${GLOSSARY.length} key investing terms, in plain English.</div>
      </div>
      <input type="text" id="glossSearch" class="glossary-search" placeholder="🔎 Search terms…">
      <div id="glossList" class="gloss-grid"></div>`;
    const list=document.getElementById("glossList");
    const SORTED=[...GLOSSARY].sort((a,b)=>a[0].localeCompare(b[0]));
    function paint(filter=""){
      const f=filter.toLowerCase();
      const items=SORTED.filter(([t,d])=>t.toLowerCase().includes(f)||d.toLowerCase().includes(f));
      list.innerHTML = items.length ? items.map(([t,d])=>`<div class="gloss-item"><b>${t}</b><p>${d}</p></div>`).join("")
        : `<p style="color:var(--muted)">No terms match “${filter}”.</p>`;
    }
    document.getElementById("glossSearch").addEventListener("input",e=>paint(e.target.value));
    paint();
  }

  /* ============================================================ BADGES / PROGRESS */
  function renderBadges(v){
    const earned=Object.keys(state.badges).length;
    const lessons=Object.keys(state.done).length;
    const L=levelInfo(state.xp);
    v.innerHTML=`
      <div class="page-head"><div class="section-eyebrow">Your progress</div><h2>Profile & achievements</h2></div>
      <div class="profile-banner">
        <div class="pb-ring">${ring(L.pct,80,7,'Lv '+L.num)}</div>
        <div class="pb-info">
          <div class="pb-lvl">Level ${L.num}</div>
          <h2>${L.name}</h2>
          <div class="pb-bar"><i style="width:${L.pct}%"></i></div>
          <small>${state.xp} XP${L.next?` · ${L.toNext} XP to reach ${L.next.name}`:' · max level reached! 🏆'}</small>
        </div>
      </div>
      <div class="profile-stats">
        <div class="ps"><b>${lessons}/${MODULES.length}</b><small>Lessons completed</small></div>
        <div class="ps"><b>${earned}/${BADGES.length}</b><small>Badges earned</small></div>
        <div class="ps"><b>${state.xp}</b><small>Total XP</small></div>
      </div>
      ${lessons>=MODULES.length?`<div class="continue-card" style="margin-bottom:30px" onclick="App.go('certificate')">
        <div style="font-size:42px">📜</div>
        <div class="cc-body"><div class="cc-eyebrow">Course complete</div><h3>Your certificate is ready</h3><p>You finished all ${MODULES.length} lessons — claim your certificate of completion.</p></div>
        <button class="btn" onclick="event.stopPropagation();App.go('certificate')">View →</button>
      </div>`:''}
      <div class="section-eyebrow">Badges</div>
      <div class="badges">${BADGES.map(b=>`<div class="badge ${state.badges[b.id]?'earned':''}"><div class="b-emoji">${b.emoji}</div><b>${b.name}</b><small>${b.desc}</small></div>`).join("")}</div>`;
  }

  /* ============================================================ CAPSTONE: build your plan */
  function renderCapstone(v){
    const p = state.plan || { goal:"retirement", horizon:"20+", monthly:300, emergency:"yes", debt:"yes", stocks:80, bonds:15, cash:5, account:"taxadv" };
    const sel=(val,o)=>val===o?"selected":"";
    v.innerHTML=`
      <div class="lesson-wrap">
        <div class="crumb" onclick="App.go('learn')">← Back to course</div>
        <div class="page-head"><div class="section-eyebrow">Capstone Project</div>
          <h2>Build your own investment plan 🗺️</h2>
          <div class="ph-sub">Put everything together. Fill this in, and Investa will check it against the principles you learned — then you'll have a real, personal one-page plan.</div>
        </div>
        <div class="tool">
          <div class="grid2">
            <div class="field"><label>🎯 What are you investing for?</label>
              <select id="pGoal"><option value="retirement" ${sel(p.goal,'retirement')}>Retirement</option><option value="house" ${sel(p.goal,'house')}>A home deposit</option><option value="wealth" ${sel(p.goal,'wealth')}>General long-term wealth</option><option value="education" ${sel(p.goal,'education')}>Education</option></select></div>
            <div class="field"><label>⏳ When will you need most of it?</label>
              <select id="pHorizon"><option value="<3" ${sel(p.horizon,'<3')}>Under 3 years</option><option value="3-5" ${sel(p.horizon,'3-5')}>3–5 years</option><option value="5-10" ${sel(p.horizon,'5-10')}>5–10 years</option><option value="10-20" ${sel(p.horizon,'10-20')}>10–20 years</option><option value="20+" ${sel(p.horizon,'20+')}>20+ years</option></select></div>
            <div class="field"><label>💵 Monthly contribution</label><input type="number" id="pMonthly" min="0" value="${p.monthly}"></div>
            <div class="field"><label>🏦 Which account(s)?</label>
              <select id="pAccount"><option value="taxadv" ${sel(p.account,'taxadv')}>Tax-advantaged (retirement / ISA)</option><option value="match" ${sel(p.account,'match')}>Employer plan with a match</option><option value="taxable" ${sel(p.account,'taxable')}>Taxable brokerage only</option></select></div>
          </div>
          <div class="grid2">
            <div class="field"><label>🛟 Do you have a 3–6 month emergency fund?</label>
              <select id="pEmergency"><option value="yes" ${sel(p.emergency,'yes')}>Yes</option><option value="no" ${sel(p.emergency,'no')}>Not yet</option></select></div>
            <div class="field"><label>💳 High-interest debt cleared?</label>
              <select id="pDebt"><option value="yes" ${sel(p.debt,'yes')}>Yes / none</option><option value="no" ${sel(p.debt,'no')}>Still paying it down</option></select></div>
          </div>
          <label style="font-weight:600;font-size:14px;color:var(--ink-2)">📊 Your target allocation <span style="color:var(--muted);font-weight:400">(should total 100%)</span></label>
          <div style="margin-top:12px">
            <div class="alloc-row"><span class="dot" style="background:var(--brand)"></span><span class="name">Stocks</span><input type="range" id="pStocks" min="0" max="100" step="5" value="${p.stocks}"><span class="pct" id="pStocksV">${p.stocks}%</span></div>
            <div class="alloc-row"><span class="dot" style="background:var(--accent)"></span><span class="name">Bonds</span><input type="range" id="pBonds" min="0" max="100" step="5" value="${p.bonds}"><span class="pct" id="pBondsV">${p.bonds}%</span></div>
            <div class="alloc-row"><span class="dot" style="background:var(--gold)"></span><span class="name">Cash</span><input type="range" id="pCash" min="0" max="100" step="5" value="${p.cash}"><span class="pct" id="pCashV">${p.cash}%</span></div>
            <div id="allocTot" style="font-weight:700;margin-top:4px"></div>
          </div>
          <button class="btn big" id="pSubmit" style="margin-top:18px">Check my plan →</button>
        </div>
        <div id="planFeedback"></div>
      </div>`;
    const $=id=>document.getElementById(id);
    ["pStocks","pBonds","pCash"].forEach(id=>$(id).addEventListener("input",()=>{ $(id+"V").textContent=$(id).value+"%"; tot(); }));
    function tot(){ const t=(+$("pStocks").value)+(+$("pBonds").value)+(+$("pCash").value);
      $("allocTot").innerHTML = t===100?`<span style="color:var(--green-ink)">✓ Totals 100%</span>`:`<span style="color:var(--gold)">Currently ${t}% — adjust to 100%</span>`; return t; }
    tot();
    $("pSubmit").onclick=()=>{
      const plan={ goal:$("pGoal").value, horizon:$("pHorizon").value, monthly:+$("pMonthly").value,
        account:$("pAccount").value, emergency:$("pEmergency").value, debt:$("pDebt").value,
        stocks:+$("pStocks").value, bonds:+$("pBonds").value, cash:+$("pCash").value };
      if(plan.stocks+plan.bonds+plan.cash!==100){ toast("Make your allocation total 100% first"); return; }
      state.plan=plan; if(!state.capstoneDone){ state.capstoneDone=true; addXP(120); } earn("planner"); save();
      const fb=planFeedback(plan);
      const horizonTxt={"<3":"under 3 years","3-5":"3–5 years","5-10":"5–10 years","10-20":"10–20 years","20+":"20+ years"}[plan.horizon];
      const allDone=Object.keys(state.done).length>=MODULES.length;
      $("planFeedback").innerHTML=`
        <div class="card" style="border-color:var(--brand-soft-2)">
          <div class="section-eyebrow">Your one-page plan</div>
          <h3>Here's your plan 📋</h3>
          <table class="data"><tbody>
            <tr><th>Goal</th><td>${({retirement:'Retirement',house:'Home deposit',wealth:'Long-term wealth',education:'Education'})[plan.goal]}</td></tr>
            <tr><th>Horizon</th><td>${horizonTxt}</td></tr>
            <tr><th>Allocation</th><td>${plan.stocks}% stocks · ${plan.bonds}% bonds · ${plan.cash}% cash</td></tr>
            <tr><th>Contribution</th><td>$${plan.monthly}/month, automatic</td></tr>
            <tr><th>Accounts</th><td>${({taxadv:'Tax-advantaged first',match:'Employer match first, then tax-advantaged',taxable:'Taxable brokerage'})[plan.account]}</td></tr>
            <tr><th>Rules</th><td>Rebalance yearly · never panic-sell · keep fees low</td></tr>
          </tbody></table>
        </div>
        <div class="card">
          <div class="section-eyebrow">Coach's feedback</div>
          <h3>${fb.filter(f=>f.type==='warn').length?'A few things to consider 🧐':'Looks solid! ✅'}</h3>
          ${fb.map(f=>`<div class="callout ${f.type==='warn'?'warn':'key'}" style="margin:10px 0">${f.type==='warn'?'⚠️':'✅'} ${f.text}</div>`).join("")}
          <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
            ${allDone?`<button class="btn" onclick="App.go('certificate')">View your certificate 📜</button>`:`<button class="btn secondary" onclick="App.go('learn')">Finish the remaining lessons</button>`}
            <button class="btn ghost" onclick="App.go('invest')">Put it into practice in the Arena →</button>
          </div>
        </div>`;
      $("planFeedback").scrollIntoView({behavior:"smooth"});
      sound("win"); bigConfetti();
    };
  }
  function planFeedback(p){
    const f=[]; const longH=(p.horizon==="20+"||p.horizon==="10-20"); const shortH=(p.horizon==="<3"||p.horizon==="3-5");
    if(p.emergency==="no") f.push({type:"warn",text:"<b>Build your emergency fund first.</b> 3–6 months of expenses in cash protects your investments from being sold at a bad time."});
    if(p.debt==="no") f.push({type:"warn",text:"<b>Tackle high-interest debt before investing heavily.</b> Paying off a 20% card is a guaranteed 20% return — better than the market."});
    if(shortH && p.stocks>50) f.push({type:"warn",text:`<b>That's a lot of stocks for a short horizon.</b> Money needed within a few years can't survive a crash — consider shifting toward bonds and cash.`});
    if(longH && p.stocks<60) f.push({type:"warn",text:"<b>You may be too conservative for such a long horizon.</b> With 10–20+ years, stocks have time to recover and compound — many would lean more growth-heavy."});
    if(p.cash>20 && longH) f.push({type:"warn",text:"<b>High cash for a long horizon.</b> Cash is safe but loses value to inflation over decades — it's usually a small slice for long-term money."});
    if(p.monthly<=0) f.push({type:"warn",text:"<b>Add a regular contribution, even a small one.</b> Consistent automatic investing (dollar-cost averaging) is what builds wealth over time."});
    if(p.account==="taxable") f.push({type:"warn",text:"<b>Check for tax-advantaged accounts and any employer match first.</b> A match is free money; tax breaks supercharge compounding."});
    // positives
    if(longH && p.stocks>=60) f.push({type:"good",text:"Great fit: a long horizon paired with a growth-oriented allocation gives compounding room to work."});
    if(p.emergency==="yes"&&p.debt==="yes") f.push({type:"good",text:"Strong foundation — emergency fund set and high-interest debt handled. You're ready to invest."});
    if(p.monthly>0) f.push({type:"good",text:`Automating $${p.monthly}/month removes emotion and keeps you consistent through ups and downs.`});
    if(f.filter(x=>x.type==='good').length===0) f.push({type:"good",text:"You've built a complete, coherent plan — the hardest part is just starting and sticking with it."});
    return f;
  }

  /* ============================================================ CERTIFICATE */
  function renderCertificate(v){
    const lessons=Object.keys(state.done).length;
    const allDone=lessons>=MODULES.length;
    if(!allDone){
      v.innerHTML=`<div class="lesson-wrap"><div class="crumb" onclick="App.go('learn')">← Back</div>
        <div class="card" style="text-align:center;padding:40px 24px"><div style="font-size:50px">📜</div>
        <h2 style="font-size:24px;margin:8px 0">Your certificate is almost ready</h2>
        <p style="color:var(--muted);max-width:46ch;margin:0 auto 16px">Complete all ${MODULES.length} lessons to unlock your certificate of completion. You're at ${lessons}/${MODULES.length}.</p>
        <button class="btn" onclick="App.go('learn')">Continue the course →</button></div></div>`;
      return;
    }
    earn("certified");
    const name=state.certName||"";
    const L=levelInfo(state.xp);
    const d=new Date(); const date=d.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});
    v.innerHTML=`<div class="lesson-wrap">
      <div class="crumb" onclick="App.go('badges')">← Back to profile</div>
      <div class="field" style="max-width:420px"><label>Your name (for the certificate)</label>
        <input type="text" id="certName" placeholder="Type your name" value="${name}"></div>
      <div class="certificate" id="certCard">
        <div class="cert-border">
          <div class="cert-seal">📈</div>
          <div class="cert-eyebrow">Investa · Certificate of Completion</div>
          <div class="cert-pre">This certifies that</div>
          <div class="cert-name" id="certNameOut">${name||"Your Name"}</div>
          <div class="cert-body">has successfully completed the complete <b>Investa Investing Course</b> — all ${MODULES.length} lessons across 6 units, ${Object.values(CASES).flat().length} real-world case studies, and the capstone project — demonstrating a confident, well-rounded understanding of how investing works.</div>
          <div class="cert-foot"><div><b>${date}</b><span>Date</span></div><div><b>Level ${L.num} · ${L.name}</b><span>Standing</span></div><div><b>${state.xp} XP</b><span>Earned</span></div></div>
        </div>
      </div>
      <div style="text-align:center;margin-top:18px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <button class="btn ghost" onclick="App.go('badges')">Back to profile</button>
      </div></div>`;
    const ni=document.getElementById("certName");
    ni.addEventListener("input",()=>{ state.certName=ni.value; save(); document.getElementById("certNameOut").textContent=ni.value||"Your Name"; });
    if(!name){ sound("win"); bigConfetti(); }
  }

  /* ============================================================ GLOBAL SEARCH */
  function renderSearch(v){
    v.innerHTML=`<div class="lesson-wrap">
      <div class="page-head"><div class="section-eyebrow">Search</div><h2>Find anything 🔍</h2></div>
      <input type="text" id="searchInput" class="glossary-search" placeholder="Search lessons, terms, stocks…" autofocus>
      <div id="searchResults"></div></div>`;
    const inp=document.getElementById("searchInput"), out=document.getElementById("searchResults");
    function run(q){
      q=q.trim().toLowerCase();
      if(!q){ out.innerHTML=`<p style="color:var(--muted)">Type to search across the course, glossary, and stocks.</p>`; return; }
      const res=[];
      MODULES.forEach((m,i)=>{ if((m.title+" "+m.blurb).toLowerCase().includes(q)) res.push({t:"Lesson",emoji:m.emoji,title:`Lesson ${i+1}: ${m.title}`,desc:m.blurb,go:`App.go('lesson','${m.id}')`,locked:!isUnlocked(m.id)}); });
      (typeof GLOSSARY!=="undefined"?GLOSSARY:[]).forEach(([t,d])=>{ if((t+" "+d).toLowerCase().includes(q)) res.push({t:"Term",emoji:"📖",title:t,desc:d,go:`App.go('glossary')`}); });
      (typeof STOCKS!=="undefined"?STOCKS:[]).forEach(s=>{ if((s.sym+" "+s.name+" "+s.sector).toLowerCase().includes(q)) res.push({t:"Stock",emoji:s.emoji,title:`${s.name} (${s.sym})`,desc:s.sector,go:`App.go('tool','analyzer')`}); });
      out.innerHTML = res.length ? res.slice(0,30).map(r=>`<div class="search-row" onclick="${r.locked?`App.toast&&0;`:r.go}" ${r.locked?'style="opacity:.55"':''}>
          <span class="sr-emoji">${r.emoji}</span><div><b>${r.title} ${r.locked?'🔒':''}</b><span>${r.desc}</span></div><span class="sr-tag">${r.t}</span></div>`).join("")
        : `<p style="color:var(--muted)">No matches for “${q}”.</p>`;
    }
    inp.addEventListener("input",e=>run(e.target.value)); run("");
  }

  /* ============================================================ PLACEMENT DIAGNOSTIC */
  function renderDiagnostic(v){
    // one representative question per unit, drawn from each unit's first lesson quiz
    const picks=UNITS.map(u=>{ const mid=u.modules[0]; const m=MODULES.find(x=>x.id===mid); const q=m.quiz[0]; return {unit:u, mid, m, q}; });
    let qi=0, score=0; const per=[];
    v.innerHTML=`<div class="lesson-wrap">
      <div class="page-head"><div class="section-eyebrow">2-minute placement</div><h2>Where should you start? 🧭</h2>
        <div class="ph-sub">Answer ${picks.length} quick questions and we'll point you to the right place — no pressure, nothing is graded.</div></div>
      <div class="card" id="diagCard"></div></div>`;
    function renderQ(){
      const p=picks[qi]; const order=shuffle(p.q.opts.map((_,k)=>k)); const opts=order.map(k=>p.q.opts[k]); const a=order.indexOf(p.q.a);
      document.getElementById("diagCard").innerHTML=`<div class="quiz-progress">Question ${qi+1} of ${picks.length} · ${p.unit.title}</div>
        <div class="quiz-q">${p.q.q}</div><div class="options">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}</div>
        <div class="explain" id="diagEx"></div><div id="diagNext" style="margin-top:14px"></div>`;
      document.querySelectorAll("#diagCard .opt").forEach(btn=>btn.onclick=()=>{
        const ch=+btn.dataset.i, os=document.querySelectorAll("#diagCard .opt"); os.forEach(o=>o.classList.add("disabled")); os[a].classList.add("correct");
        const ok=ch===a; if(!ok) os[ch].classList.add("wrong"); if(ok) score++; per.push({unit:p.unit,ok}); sound(ok?"correct":"wrong");
        document.getElementById("diagEx").innerHTML=`${ok?'✅ ':'💡 '}${p.q.why}`; document.getElementById("diagEx").classList.add("show");
        const nb=document.getElementById("diagNext"); nb.innerHTML=`<button class="btn">${qi<picks.length-1?'Next →':'See my result →'}</button>`;
        nb.querySelector("button").onclick=()=>{ qi++; qi<picks.length?renderQ():finish(); };
      });
    }
    function finish(){
      state.diagnostic={score, total:picks.length, at:Date.now()}; save(); sound("win"); confetti();
      const weak=per.filter(x=>!x.ok).map(x=>x.unit);
      const startId = firstIncomplete();
      const startM=MODULES.find(m=>m.id===startId); const startIdx=MODULES.indexOf(startM);
      let advice;
      if(score>=picks.length-1) advice=`Impressive — you already know a lot! You could move quickly, but doing the lessons will fill the gaps and unlock the arena features.`;
      else if(score>=Math.ceil(picks.length/2)) advice=`Solid foundation! Focus your energy on: <b>${[...new Set(weak.map(u=>u.title))].join(", ")||"the later units"}</b>.`;
      else advice=`Perfect place to be — you'll get the most out of starting from the beginning and going in order.`;
      document.getElementById("diagCard").innerHTML=`<div style="text-align:center;padding:10px 0">
        <div style="font-size:50px">🧭</div><h3 style="font-size:24px;margin:6px 0">You scored ${score}/${picks.length}</h3>
        <p style="color:var(--ink-2);max-width:48ch;margin:0 auto 16px">${advice}</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn" onclick="App.go('lesson','${startId}')">${startIdx>0?'Continue':'Start'} at Lesson ${startIdx+1} →</button>
          <button class="btn ghost" onclick="App.go('learn')">See full course</button></div></div>`;
    }
    renderQ();
  }

  /* ============================================================ MY NOTES */
  function renderNotes(v){
    const ids=Object.keys(state.notes||{}).filter(k=>state.notes[k] && state.notes[k].trim());
    v.innerHTML=`<div class="lesson-wrap">
      <div class="page-head"><div class="section-eyebrow">Your notebook</div><h2>My notes 📝</h2>
        <div class="ph-sub">Notes you've written while studying. Open a lesson to add more.</div></div>
      ${ids.length?ids.map(id=>{ const m=MODULES.find(x=>x.id===id); if(!m) return ""; const i=MODULES.indexOf(m);
        return `<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><b>${m.emoji} Lesson ${i+1}: ${m.title}</b><button class="mini-btn" onclick="App.go('lesson','${id}')">Open →</button></div><p style="color:var(--ink-2);white-space:pre-wrap;margin:0">${state.notes[id].replace(/</g,"&lt;")}</p></div>`; }).join("")
        :`<div class="card" style="text-align:center;padding:36px"><div style="font-size:46px">📝</div><p style="color:var(--muted);margin-top:8px">No notes yet. Open any lesson and use the <b>My notes</b> box to jot things down.</p><button class="btn" style="margin-top:12px" onclick="App.go('learn')">Browse lessons</button></div>`}
    </div>`;
  }

  /* ============================================================ CHEAT SHEETS */
  function renderCheatsheets(v){
    v.innerHTML=`<div class="lesson-wrap">
      <div class="page-head"><div class="section-eyebrow">Quick reference</div><h2>Cheat sheets 🧾</h2>
        <div class="ph-sub">Every lesson distilled to its essentials. Great for review — use your browser's Print to save a PDF.</div>
        <button class="btn" style="margin-top:12px" onclick="window.print()">🖨️ Print all</button></div>
      ${UNITS.map(u=>`<div class="card cheat-unit"><h3>Unit ${u.n}: ${u.title}</h3>
        ${u.modules.map(id=>{ const m=MODULES.find(x=>x.id===id); const simple=(typeof SIMPLE!=="undefined"&&SIMPLE[id])||m.blurb; const take=(typeof CASES!=="undefined"&&CASES[id]&&CASES[id][0]&&CASES[id][0].lesson)||"";
          return `<div class="cheat-row"><b>${m.emoji} ${m.title}</b><p>${simple}</p>${take?`<p class="cheat-take">💡 ${take}</p>`:""}</div>`; }).join("")}
      </div>`).join("")}
    </div>`;
  }

  /* ============================================================ REFERENCES & SOURCES */
  function renderReferences(v){
    const refs = (typeof REFERENCES!=="undefined") ? REFERENCES : [];
    v.innerHTML=`<div class="lesson-wrap">
      <div class="page-head"><div class="section-eyebrow">Bibliography</div><h2>References & sources 📑</h2>
        <div class="ph-sub">This course teaches standard, widely-accepted financial-literacy concepts. The works below — by named authors in published books, peer-reviewed journals, and government/central-bank publications — teach and corroborate the same material. Print this page to keep a copy.</div>
        <button class="btn" style="margin-top:12px" onclick="window.print()">🖨️ Print references</button>
      </div>
      ${refs.map(group=>`<div class="card"><h3>${group.cat}</h3>
        ${group.items.map(it=>`<div class="ref-row"><b>${it.who}</b>${it.year?` (${it.year})`:''}. ${it.url?`<a class="ref-title" href="${it.url}" target="_blank" rel="noopener">${it.title} ↗</a>`:`<span class="ref-title">${it.title}</span>`}${it.where?`. <span class="ref-where">${it.where}</span>`:''}.</div>`).join("")}
      </div>`).join("")}
      ${(typeof CASE_SOURCES!=="undefined")?`<div class="card"><h3>Case studies — primary sources (per lesson)</h3>
        <p style="color:var(--muted);font-size:14px;margin-bottom:12px">Every case study's factual claims are sourced to government reports, central banks, regulators, scholarly papers, or reputable reporting:</p>
        ${MODULES.filter(m=>CASE_SOURCES[m.id]).map(m=>`<div class="ref-row"><b>${m.emoji} ${m.title}</b><br>${CASE_SOURCES[m.id].map(s=>`<a href="${s.url}" target="_blank" rel="noopener" style="display:inline-block;margin:3px 0;font-size:13.5px">${s.label} ↗</a>`).join("<br>")}</div>`).join("")}
        ${(typeof HIST_SOURCE!=="undefined")?`<div class="ref-row"><b>⏳ Time Machine — historical returns data</b><br><a href="${HIST_SOURCE.url}" target="_blank" rel="noopener" style="font-size:13.5px">${HIST_SOURCE.label} ↗</a></div>`:''}
      </div>`:''}
      <div class="callout">📝 Each lesson's <b>"Go deeper"</b> box links to the most relevant of these. Book and paper links open a search to the genuine published work, so they stay valid even if a specific page moves. <b>Investa is an educational project — not financial advice.</b></div>
    </div>`;
  }

  /* ============================================================ HISTORICAL BACKTEST */
  function renderBacktest(v){
    earn("timetraveler");
    const years=HIST_RETURNS.map(r=>r[0]); const minY=years[0], maxY=years[years.length-1];
    v.innerHTML=`<div class="lesson-wrap">
      <div class="crumb" onclick="App.go('tools')">← All tools</div>
      <h1>⏳ Time Machine</h1>
      <p class="lesson-sub">See how a real S&P 500 investment would have grown — straight through the dot-com crash, 2008, and COVID.</p>
      <div class="tool"><div class="grid2">
        <div class="field"><label>Amount invested ($)</label><input type="number" id="btAmt" value="10000"></div>
        <div class="field"><label>Starting year</label><select id="btYear">${years.map(y=>`<option value="${y}" ${y===2000?'selected':''}>${y}</option>`).join("")}</select></div>
      </div>
      <div class="field"><label>Also add monthly? ($/mo, optional)</label><input type="number" id="btMo" value="0"></div>
      </div>
      <div class="tool" style="text-align:center">
        <div style="color:var(--muted);font-weight:600">Value at end of ${maxY}</div>
        <div class="result-big" id="btOut">$0</div>
        <div id="btSub" style="color:var(--muted);margin-top:4px"></div>
        <canvas class="chart" id="btChart" style="height:240px;margin-top:18px"></canvas>
        <div id="btNotes" style="text-align:left;margin-top:12px"></div>
      </div>
      <div class="callout">📌 Based on approximate S&P 500 annual <b>total returns</b> (incl. dividends), ${minY}–${maxY}. Notice the deep dips — and how staying invested recovered every time.${(typeof HIST_SOURCE!=="undefined")?` <a href="${HIST_SOURCE.url}" target="_blank" rel="noopener" style="font-weight:600">Source: ${HIST_SOURCE.label} ↗</a>`:''}</div></div>`;
    const $=id=>document.getElementById(id);
    ["btAmt","btYear","btMo"].forEach(id=>$(id).addEventListener("input",calc));
    function calc(){
      const amt=+$("btAmt").value||0, startY=+$("btYear").value, mo=+$("btMo").value||0;
      let bal=amt; const series=[bal]; const labels=[startY]; const crashes=[];
      HIST_RETURNS.filter(r=>r[0]>=startY).forEach(([y,ret])=>{
        bal=bal*(1+ret/100)+mo*12; series.push(bal); labels.push(y+1);
        if(HIST_EVENTS[y]) crashes.push({i:series.length-1, y, label:HIST_EVENTS[y], val:bal});
      });
      const contributed=amt+mo*12*(maxY-startY+1);
      $("btOut").textContent="$"+Math.round(bal).toLocaleString();
      $("btSub").innerHTML=`You invested <b>$${Math.round(contributed).toLocaleString()}</b> · that's a <b style="color:var(--green-ink)">${((bal/contributed-1)*100).toFixed(0)}%</b> total gain`;
      drawLine("btChart", series, series[0]);
      $("btNotes").innerHTML=crashes.map(c=>`<div style="font-size:13px;color:var(--ink-2);margin-bottom:4px">⚠️ <b>${c.y}: ${c.label}</b> — your balance dipped, then recovered.</div>`).join("");
    }
    calc();
  }

  /* ---------- reset / init ---------- */
  function resetProgress(){ if(confirm("Reset ALL progress, XP, badges and your Arena portfolio?")){ state=fresh(); save(); toast("Progress reset 🌱"); applyTheme(); go("home"); } }
  function init(){ if(typeof I18N!=="undefined") I18N.init(); applyTheme(); paintXP(); paintMute(); bumpStreak(); paintStreak(); go("home"); }
  document.addEventListener("DOMContentLoaded", init);

  return { go, resetProgress, lockedMsg, toggleMute, toggleTheme, mascotSay };
})();
