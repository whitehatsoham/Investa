/* ============================================================
   Investa — language switching (English / हिंदी)

   Content lives in data.js (English) and hi-content.js (Hindi).
   Switching mutates the shared content arrays in place, because
   data.js declares them with `const` and they can't be reassigned.
   ============================================================ */
const I18N = (() => {
  const KEY = "investa_lang";
  let lang = localStorage.getItem(KEY) || "en";

  const clone = o => JSON.parse(JSON.stringify(o));

  /* English snapshot, taken once before anything is swapped */
  const EN = {
    UNITS: clone(UNITS), MODULES: clone(MODULES), GLOSSARY: clone(GLOSSARY),
    SIMPLE: clone(SIMPLE), CASES: clone(CASES), QUIZ_EXTRA: clone(QUIZ_EXTRA),
    BADGES: clone(BADGES)
  };

  /* ---- interface strings ---- */
  const UI = {
    hi: {
      "Home":"होम", "Course":"कोर्स", "Practice":"अभ्यास", "Invest":"निवेश",
      "✨ No experience needed":"✨ किसी अनुभव की ज़रूरत नहीं",
      "▶ Start the course":"▶ कोर्स शुरू करें",
      "Continue learning →":"सीखना जारी रखें →",
      "Browse the course":"कोर्स देखें",
      "guided lessons":"निर्देशित पाठ",
      "real-world case studies":"वास्तविक केस स्टडी",
      "to invest, risk-free":"निवेश के लिए, बिना जोखिम",
      "Pick up where you left off":"जहाँ छोड़ा था वहीं से जारी रखें",
      "Resume →":"जारी रखें →",
      "How Investa works":"Investa कैसे काम करता है",
      "Three simple steps":"तीन आसान कदम",
      "Everything is laid out for you — you'll always know exactly what's next.":
        "सब कुछ क्रम से रखा गया है — आपको हमेशा पता रहेगा कि आगे क्या करना है।",
      "Learn":"सीखें", "Compete":"मुकाबला करें",
      "Go to the course →":"कोर्स पर जाएँ →",
      "Open practice →":"अभ्यास खोलें →",
      "Enter the arena →":"अरीना में जाएँ →",
      "🧭 Placement quiz":"🧭 स्तर जाँच क्विज़",
      "🧮 Tools & games":"🧮 टूल्स और गेम्स",
      "🧾 Cheat sheets":"🧾 चीट शीट",
      "📝 My notes":"📝 मेरे नोट्स",
      "📖 Glossary":"📖 शब्दावली",
      "📑 References":"📑 संदर्भ",
      "🏅 Your progress":"🏅 आपकी प्रगति",
      "The Course":"कोर्स",
      "Your path to confident investing":"आत्मविश्वास से निवेश तक आपका रास्ता",
      "Lessons unlock in order as you pass each quiz.":
        "हर क्विज़ पास करने पर अगला पाठ खुलता जाएगा।",
      "Start →":"शुरू करें →", "✓ Completed":"✓ पूरा हुआ", "🔒 Locked":"🔒 बंद",
      "← All lessons":"← सभी पाठ", "← Back":"← वापस", "← Back to course":"← कोर्स पर वापस",
      "Lesson":"पाठ", "Quiz":"क्विज़", "Case":"केस",
      "Step 1 · Read the lesson":"चरण 1 · पाठ पढ़ें",
      "Step 2 · Check your understanding":"चरण 2 · अपनी समझ जाँचें",
      "Ready for the quiz?":"क्विज़ के लिए तैयार हैं?",
      "Start the quiz →":"क्विज़ शुरू करें →",
      "Retake the quiz →":"क्विज़ दोबारा दें →",
      "Next question →":"अगला प्रश्न →",
      "See results →":"परिणाम देखें →",
      "Next lesson →":"अगला पाठ →",
      "Continue the story →":"कहानी जारी रखें →",
      "Next case →":"अगला केस →",
      "Continue to quiz →":"क्विज़ पर जाएँ →",
      "Start case studies →":"केस स्टडी शुरू करें →",
      "Practice again":"फिर अभ्यास करें",
      "You passed!":"आप पास हुए!",
      "Perfect score!":"शत-प्रतिशत अंक!",
      "Reread the lesson":"पाठ दोबारा पढ़ें",
      "Try again — new questions →":"फिर कोशिश करें — नए प्रश्न →",
      "💡 Hint":"💡 संकेत", "Check":"जाँचें",
      "🥜 In a nutshell:":"🥜 संक्षेप में:",
      "📝 My notes":"📝 मेरे नोट्स", "✓ Saved":"✓ सेव हुआ",
      "📚 Go deeper — trusted, published sources":"📚 और गहराई में — विश्वसनीय, प्रकाशित स्रोत",
      "Practice":"अभ्यास", "Sharpen your skills ✍️":"अपने कौशल निखारें ✍️",
      "Skill drills":"कौशल अभ्यास", "Daily Review":"रोज़ाना दोहराव",
      "Spaced review":"अंतराल पर दोहराव", "Capstone project":"कैपस्टोन प्रोजेक्ट",
      "Build Your Plan":"अपनी योजना बनाएँ", "🌟 Mastered":"🌟 महारत",
      "Your progress":"आपकी प्रगति", "Profile & achievements":"प्रोफ़ाइल और उपलब्धियाँ",
      "Lessons completed":"पूरे हुए पाठ", "Badges earned":"मिले बैज", "Total XP":"कुल XP",
      "Badges":"बैज", "Reference":"संदर्भ", "Glossary 📖":"शब्दावली 📖",
      "Search":"खोज", "Find anything 🔍":"कुछ भी खोजें 🔍",
      "Investing Competition":"निवेश प्रतियोगिता",
      "💼 Trading Simulator":"💼 ट्रेडिंग सिम्युलेटर",
      "Account Value":"खाता मूल्य", "Today's Change":"आज का बदलाव",
      "Total Gain / Loss":"कुल लाभ / हानि", "Cash / Buying Power":"नक़दी / खरीद क्षमता",
      "Class Rank":"कक्षा रैंक", "📈 Trade":"📈 ट्रेड", "📁 Portfolio":"📁 पोर्टफोलियो",
      "🩺 Check-up":"🩺 जाँच", "🏆 Rankings":"🏆 रैंकिंग",
      "Order Ticket":"ऑर्डर टिकट", "Symbol":"सिंबल", "Action":"क्रिया",
      "Buy":"खरीदें", "Sell":"बेचें", "Quantity (shares)":"मात्रा (शेयर)",
      "Watchlist":"वॉचलिस्ट", "Price":"भाव", "Today":"आज",
      "Interactive":"इंटरैक्टिव", "Tools & games 🎮":"टूल्स और गेम्स 🎮",
      "Quick reference":"त्वरित संदर्भ", "Cheat sheets 🧾":"चीट शीट 🧾",
      "Your notebook":"आपकी नोटबुक", "My notes 📝":"मेरे नोट्स 📝",
      "Bibliography":"ग्रंथ-सूची",
      "An educational project — not financial advice.":
        "यह एक शैक्षिक प्रोजेक्ट है — वित्तीय सलाह नहीं।"
    }
  };
  function t(s){ return lang === "hi" && UI.hi[s] ? UI.hi[s] : s; }

  /* ---- swap the content arrays in place ---- */
  /* A content pack overrides only the pieces it defines; everything
     else falls through to the layer below. EN_SIMPLE (plain-English
     rewrites) sits on the base content, and HI sits on top of that. */
  function mergeModule(base, pack){
    if(!pack) return base;
    const out = Object.assign({}, base);
    ["title","blurb"].forEach(k=>{ if(pack[k]) out[k]=pack[k]; });
    if(pack.sections) out.sections = pack.sections;
    if(pack.quiz)     out.quiz     = pack.quiz;
    return out;
  }
  function overlay(src, PACK){
    if(!PACK) return src;
    src.UNITS = src.UNITS.map(u => {
      const p = PACK.UNITS && PACK.UNITS[u.id];
      return p ? Object.assign({}, u, p) : u;
    });
    src.MODULES = src.MODULES.map(m => mergeModule(m, PACK.MODULES && PACK.MODULES[m.id]));
    if(PACK.GLOSSARY && PACK.GLOSSARY.length) src.GLOSSARY = PACK.GLOSSARY;
    Object.assign(src.SIMPLE, PACK.SIMPLE || {});
    Object.assign(src.CASES, PACK.CASES || {});
    Object.assign(src.QUIZ_EXTRA, PACK.QUIZ_EXTRA || {});
    if(PACK.BADGES) src.BADGES = src.BADGES.map(b =>
      PACK.BADGES[b.id] ? Object.assign({}, b, PACK.BADGES[b.id]) : b);
    return src;
  }
  function build(){
    let src = clone(EN);
    if(typeof EN_SIMPLE !== "undefined") src = overlay(src, EN_SIMPLE);
    if(lang === "hi" && typeof HI !== "undefined") src = overlay(src, HI);
    return src;
  }
  function refill(target, next){        // arrays and objects are const — mutate them
    if(Array.isArray(target)){ target.length = 0; next.forEach(v=>target.push(v)); }
    else { Object.keys(target).forEach(k=>delete target[k]); Object.assign(target, next); }
  }
  function applyContent(){
    const s = build();
    refill(UNITS, s.UNITS); refill(MODULES, s.MODULES); refill(GLOSSARY, s.GLOSSARY);
    refill(SIMPLE, s.SIMPLE); refill(CASES, s.CASES);
    refill(QUIZ_EXTRA, s.QUIZ_EXTRA); refill(BADGES, s.BADGES);
  }

  /* ---- translate interface text after each render ---- */
  function localizeDOM(scope){
    if(lang !== "hi" || !scope) return;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = []; let n;
    while(n = walker.nextNode()) nodes.push(n);
    nodes.forEach(node => {
      const raw = node.nodeValue.trim();
      if(raw && UI.hi[raw]) node.nodeValue = node.nodeValue.replace(raw, UI.hi[raw]);
    });
  }

  function paintButton(){
    const b = document.getElementById("langBtn");
    if(b){ b.textContent = lang === "hi" ? "EN" : "हिं"; 
           b.title = lang === "hi" ? "Switch to English" : "हिंदी में देखें"; }
  }
  function toggle(){
    lang = lang === "hi" ? "en" : "hi";
    localStorage.setItem(KEY, lang);
    applyContent(); paintButton();
    if(typeof App !== "undefined") App.go("home");
  }
  function init(){ applyContent(); paintButton(); }

  return { t, toggle, init, localizeDOM, get lang(){ return lang; } };
})();
