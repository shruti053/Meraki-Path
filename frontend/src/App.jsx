import { useState, useEffect } from "react";

// ── 15 SCIENCE CAREERS ───────────────────────────────────────────────────────
const CAREERS = [
  { id:"engineering",   label:"Engineering",        icon:"⚙️",  desc:"B.Tech/BE in CS, Mech, Civil, EE",
    fin:{ govt:"1L-4L", pvt:"5L-25L", hostel:"60K-1.2L/yr", coaching:"50K-2L", dur:"4 yrs", start:"4L-12L", long:"15L-40L+", roi:"High" },
    alts:["data_science","ai_ml","cybersecurity"] },
  { id:"mbbs",          label:"MBBS",               icon:"🩺",  desc:"Bachelor of Medicine & Surgery",
    fin:{ govt:"1L-5L", pvt:"40L-1Cr", hostel:"80K-1.5L/yr", coaching:"1L-5L", dur:"5.5 yrs", start:"6L-12L", long:"20L-60L+", roi:"High" },
    alts:["nursing","bds","bpharm","physiotherapy"] },
  { id:"bds",           label:"BDS",                icon:"🦷",  desc:"Bachelor of Dental Surgery",
    fin:{ govt:"2L-6L", pvt:"15L-50L", hostel:"60K-1L/yr", coaching:"50K-2L", dur:"5 yrs", start:"3L-8L", long:"10L-30L+", roi:"Medium" },
    alts:["mbbs","bpharm","physiotherapy"] },
  { id:"bpharm",        label:"B.Pharm",            icon:"💊",  desc:"Bachelor of Pharmacy",
    fin:{ govt:"50K-2L", pvt:"3L-10L", hostel:"50K-1L/yr", coaching:"20K-80K", dur:"4 yrs", start:"2.5L-6L", long:"8L-20L+", roi:"Medium" },
    alts:["nursing","biotech","pure_sciences"] },
  { id:"biotech",       label:"Biotechnology",      icon:"🧬",  desc:"B.Tech/BSc in Biotechnology",
    fin:{ govt:"50K-2L", pvt:"3L-12L", hostel:"50K-1L/yr", coaching:"30K-1L", dur:"4 yrs", start:"3L-7L", long:"10L-25L+", roi:"Medium" },
    alts:["pure_sciences","agri","enviro"] },
  { id:"nursing",       label:"Nursing",            icon:"🏥",  desc:"B.Sc Nursing",
    fin:{ govt:"30K-1L", pvt:"2L-8L", hostel:"40K-80K/yr", coaching:"10K-50K", dur:"4 yrs", start:"2L-5L", long:"6L-15L+", roi:"Medium" },
    alts:["physiotherapy","bpharm","pure_sciences"] },
  { id:"physiotherapy", label:"Physiotherapy",      icon:"🦴",  desc:"B.Sc / BPT Physiotherapy",
    fin:{ govt:"50K-2L", pvt:"3L-10L", hostel:"40K-80K/yr", coaching:"20K-80K", dur:"4.5 yrs", start:"2.5L-6L", long:"8L-20L+", roi:"Medium" },
    alts:["nursing","bpharm","biotech"] },
  { id:"data_science",  label:"Data Science",       icon:"📊",  desc:"B.Tech/BSc in Data Science",
    fin:{ govt:"50K-2L", pvt:"3L-12L", hostel:"50K-1L/yr", coaching:"30K-1.5L", dur:"4 yrs", start:"5L-14L", long:"15L-40L+", roi:"High" },
    alts:["ai_ml","engineering","cybersecurity"] },
  { id:"ai_ml",         label:"AI / ML",            icon:"🤖",  desc:"AI & Machine Learning Engineering",
    fin:{ govt:"50K-2L", pvt:"4L-15L", hostel:"50K-1L/yr", coaching:"50K-2L", dur:"4 yrs", start:"6L-18L", long:"20L-60L+", roi:"Very High" },
    alts:["data_science","engineering","cybersecurity"] },
  { id:"cybersecurity", label:"Cybersecurity",      icon:"🔐",  desc:"B.Tech/BSc Cybersecurity",
    fin:{ govt:"50K-2L", pvt:"3L-12L", hostel:"50K-1L/yr", coaching:"30K-1.5L", dur:"4 yrs", start:"4L-12L", long:"15L-35L+", roi:"High" },
    alts:["ai_ml","data_science","engineering"] },
  { id:"architecture",  label:"Architecture",       icon:"🏛️",  desc:"B.Arch (5 year program)",
    fin:{ govt:"50K-3L", pvt:"5L-20L", hostel:"60K-1.2L/yr", coaching:"30K-1.5L", dur:"5 yrs", start:"3L-8L", long:"10L-30L+", roi:"Medium" },
    alts:["engineering","pure_sciences"] },
  { id:"pure_sciences", label:"Pure Sciences (BSc)", icon:"🔬", desc:"BSc Physics/Chemistry/Maths/Bio",
    fin:{ govt:"10K-50K", pvt:"50K-3L", hostel:"40K-80K/yr", coaching:"10K-50K", dur:"3 yrs", start:"2L-5L", long:"6L-20L+", roi:"Medium" },
    alts:["biotech","enviro","agri"] },
  { id:"enviro",        label:"Environmental Sci",  icon:"🌿",  desc:"B.Sc Environmental Science",
    fin:{ govt:"20K-1L", pvt:"1L-5L", hostel:"40K-80K/yr", coaching:"10K-40K", dur:"3 yrs", start:"2L-5L", long:"6L-15L+", roi:"Low-Medium" },
    alts:["agri","pure_sciences","biotech"] },
  { id:"agri",          label:"Agriculture",        icon:"🌾",  desc:"B.Sc Agriculture",
    fin:{ govt:"20K-1L", pvt:"1L-6L", hostel:"30K-70K/yr", coaching:"10K-40K", dur:"4 yrs", start:"2L-6L", long:"8L-20L+", roi:"Medium" },
    alts:["enviro","biotech","pure_sciences"] },
  { id:"veterinary",    label:"Veterinary Science", icon:"🐾",  desc:"B.V.Sc & AH",
    fin:{ govt:"50K-2L", pvt:"5L-20L", hostel:"50K-1L/yr", coaching:"30K-1L", dur:"5 yrs", start:"3L-8L", long:"10L-25L+", roi:"Medium" },
    alts:["mbbs","biotech","agri"] },
];

// ── 6-CATEGORY QUIZ (3 questions each = 18 total) ────────────────────────────
const CATEGORIES = [
  { id:"aptitude",    label:"Aptitude & Reasoning",   icon:"🧠", color:"#38bdf8" },
  { id:"academic",    label:"Academic Readiness",      icon:"📚", color:"#818cf8" },
  { id:"commitment",  label:"Commitment Level",        icon:"💪", color:"#4ade80" },
  { id:"financial",   label:"Financial Assessment",    icon:"💰", color:"#fbbf24" },
  { id:"softskills",  label:"Soft Skills",             icon:"🤝", color:"#f472b6" },
  { id:"expectation", label:"Career Expectations",     icon:"🎯", color:"#fb923c" },
];

// Each option: { text, score } where score is 0-3
const QUIZ = [
  {
    cat: "financial",
    q: "Your family is discussing education budgets. A top private engineering college costs approximately ₹8–12 lakhs total over 4 years. A government NIT or state college costs ₹2–5 lakhs. Which best describes your situation?",
    opts: [
      { t: "My family cannot support significant education expenses and loans or scholarships are not a realistic option right now", s: 1 },
      { t: "My family can manage government college fees but private college fees would require difficult financial decisions", s: 2 },
      { t: "My family can manage either option with some financial planning, including loans if needed", s: 3 },
      { t: "Cost is not a major constraint — my family can support either pathway comfortably", s: 4 }
    ]
  },
  {
    cat: "academic",
    q: "Looking honestly at your Class 11 and Class 12 performance so far, which statement most accurately describes you?",
    opts: [
      { t: "I have struggled consistently with Maths and Physics", s: 1 },
      { t: "I perform averagely in Maths and Physics", s: 2 },
      { t: "I perform well in Maths and Physics with consistent effort", s: 3 },
      { t: "I perform very well and enjoy challenging problems", s: 4 }
    ]
  },
  {
    cat: "aptitude",
    q: "Your school's water cooler has stopped dispensing water properly. No technician is available. What would you most likely do?",
    opts: [
      { t: "Wait for someone else to fix it", s: 1 },
      { t: "Ask a technically inclined friend", s: 2 },
      { t: "Observe it and attempt a logical fix", s: 3 },
      { t: "Systematically inspect and diagnose the problem", s: 4 }
    ]
  },
  {
    cat: "softskills",
    q: "During a group project, your team is split into two camps with conflicting approaches. What do you do?",
    opts: [
      { t: "Stay quiet and follow others", s: 1 },
      { t: "Defend only my own approach", s: 2 },
      { t: "Listen to both sides and suggest a balanced solution", s: 3 },
      { t: "Facilitate discussion and help the team reach consensus", s: 4 }
    ]
  },
  {
    cat: "commitment",
    q: "Engineering technology changes rapidly. How do you feel about constantly learning new skills?",
    opts: [
      { t: "Sounds exhausting", s: 1 },
      { t: "I can manage if necessary", s: 2 },
      { t: "I am comfortable with it", s: 3 },
      { t: "I genuinely enjoy continuous learning", s: 4 }
    ]
  },
  {
    cat: "academic",
    q: "Outside of exams, what best describes your relationship with Mathematics?",
    opts: [
      { t: "Just a subject to pass", s: 1 },
      { t: "Interesting only when practical", s: 2 },
      { t: "I enjoy solving Maths problems", s: 3 },
      { t: "I actively explore Maths beyond the syllabus", s: 4 }
    ]
  },
  {
    cat: "academic",
    q: "You watch a bridge collapse during high winds. What is your reaction?",
    opts: [
      { t: "Just a bridge falling", s: 1 },
      { t: "Wonder why it wasn't checked properly", s: 2 },
      { t: "Curious about the structural flaw", s: 3 },
      { t: "Want to understand the complete physics behind it", s: 4 }
    ]
  },
  {
    cat: "aptitude",
    q: "A company claims its energy drink increases productivity by 40%. What is your response?",
    opts: [
      { t: "Sounds impressive", s: 1 },
      { t: "I would ask others about it", s: 2 },
      { t: "I would question how productivity was measured", s: 3 },
      { t: "I would analyse methodology, sample size, controls, and bias", s: 4 }
    ]
  },
  {
    cat: "expectation",
    q: "Which activity most appeals to you?",
    opts: [
      { t: "Creative arts only", s: 1 },
      { t: "Sports and outdoor activities", s: 2 },
      { t: "Building and assembling things", s: 3 },
      { t: "Designing, testing, fixing, and improving systems", s: 4 }
    ]
  },
  {
    cat: "expectation",
    q: "A wireless charger stops working. What do you do?",
    opts: [
      { t: "Replace it", s: 1 },
      { t: "Google a quick fix", s: 2 },
      { t: "Try logical troubleshooting steps", s: 3 },
      { t: "Investigate the failure deeply and understand the internals", s: 4 }
    ]
  },
  {
    cat: "expectation",
    q: "You read about a solar panel that generates electricity from raindrops. What do you do?",
    opts: [
      { t: "Interesting, then move on", s: 1 },
      { t: "Share it with friends", s: 2 },
      { t: "Read the article completely", s: 3 },
      { t: "Research the underlying technology and science", s: 4 }
    ]
  },
  {
    cat: "aptitude",
    q: "A program should print numbers 1–10 but stops at 9. What is your reaction?",
    opts: [
      { t: "Ask someone else to fix it", s: 1 },
      { t: "Run it again", s: 2 },
      { t: "Check the loop condition", s: 3 },
      { t: "Trace the logic step by step and verify edge cases", s: 4 }
    ]
  },
  {
    cat: "commitment",
    q: "You need to rename 200 files automatically. What do you do?",
    opts: [
      { t: "Rename manually", s: 1 },
      { t: "Use a ready-made tool", s: 2 },
      { t: "Follow a tutorial and use a script", s: 3 },
      { t: "Write or modify a script myself", s: 4 }
    ]
  },
  {
    cat: "aptitude",
    q: "You must design the most efficient route for a school bus to pick up 15 students. What is your approach?",
    opts: [
      { t: "Guess a route", s: 1 },
      { t: "Draw a rough route", s: 2 },
      { t: "Group locations logically and optimize travel", s: 3 },
      { t: "Treat it as an optimization problem and evaluate multiple solutions", s: 4 }
    ]
  },
  {
    cat: "commitment",
    q: "You have spent 45 minutes on a difficult Maths or Physics problem. What do you do?",
    opts: [
      { t: "Leave it for later", s: 1 },
      { t: "Try a little longer then stop", s: 2 },
      { t: "Take a break and try again", s: 3 },
      { t: "Become even more determined to solve it", s: 4 }
    ]
  }
];

const SCHOLARSHIPS = {
  general:[
    "Central Sector Scheme of Scholarships (CSSS) — Up to Rs12,000/yr",
    "National Means-cum-Merit Scholarship (NMMS)",
    "Prime Minister's Scholarship Scheme",
    "INSPIRE Scholarship (DST) for top science students",
  ],
  govt:[
    "NSP (National Scholarship Portal) — scholarships.gov.in",
    "State government merit scholarships (varies by state)",
    "SC/ST/OBC scholarships through Ministry of Social Justice",
    "Minority scholarships through Ministry of Minority Affairs",
  ],
  girls:[
    "Pragati Scholarship for Girls (AICTE) — Rs50,000/yr for technical education",
    "Saksham Scholarship (AICTE) for differently-abled girls",
    "Vigyan Jyoti Program (DST) for girls in science",
    "Women Scientist Scheme (WOS-C) by DST",
    "Many private colleges offer 5-25% fee concession for female students",
    "Some states offer free education for girls in govt colleges",
  ],
};

// ── STYLE FACTORY ─────────────────────────────────────────────────────────────
function s(theme) {
  const dark       = theme==="dark";
  const card       = dark?"rgba(13,34,64,.55)":"#ffffff";
  const cardBorder = dark?"#0d2240":"#e2e8f0";
  const navBg      = dark?"rgba(5,11,20,0.95)":"rgba(248,250,252,0.95)";
  const appBg      = dark?"#050b14":"#f1f5f9";
  const appColor   = dark?"#e8edf5":"#0f172a";
  const muted      = dark?"#94a3b8":"#64748b";
  const dim        = dark?"#64748b":"#94a3b8";
  const optBg      = dark?"rgba(5,11,20,.6)":"#f8fafc";
  const optBorder  = dark?"#1e3a5f":"#cbd5e1";
  const optColor   = dark?"#e8edf5":"#0f172a";
  const statsBg    = dark?"rgba(13,34,64,.3)":"#e0f2fe";
  const statsBorder= dark?"#0d2240":"#bae6fd";
  const heroBg     = dark
    ?"radial-gradient(ellipse 70% 50% at 50% 0%,rgba(56,189,248,.12),transparent)"
    :"radial-gradient(ellipse 70% 50% at 50% 0%,rgba(2,132,199,.1),transparent)";
  return {
    app:{minHeight:"100vh",background:appBg,color:appColor,fontFamily:"'Segoe UI',sans-serif",transition:"background .3s,color .3s"},
    nav:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 40px",borderBottom:`1px solid ${cardBorder}`,background:navBg,position:"sticky",top:0,zIndex:100,backdropFilter:"blur(10px)",transition:"background .3s"},
    logo:{fontSize:"20px",fontWeight:700,background:"linear-gradient(90deg,#38bdf8,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"-0.5px"},
    navLinks:{display:"flex",gap:"28px"},
    navLink:{background:"none",border:"none",color:muted,fontSize:"14px",cursor:"pointer",fontFamily:"inherit"},
    navBtn:{background:"linear-gradient(135deg,#38bdf8,#6366f1)",border:"none",color:"#fff",padding:"9px 20px",borderRadius:"8px",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
    toggleBtn:{background:dark?"#0d2240":"#e2e8f0",border:`1px solid ${cardBorder}`,color:muted,padding:"7px 14px",borderRadius:"999px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginRight:"10px",transition:"background .3s"},
    hero:{textAlign:"center",padding:"90px 24px 70px",background:heroBg},
    badge:{display:"inline-block",background:"rgba(56,189,248,.1)",border:"1px solid rgba(56,189,248,.3)",color:"#38bdf8",padding:"6px 16px",borderRadius:"999px",fontSize:"12px",fontWeight:600,letterSpacing:"1px",marginBottom:"28px",textTransform:"uppercase"},
    heroTitle:{fontSize:"clamp(32px,5vw,60px)",fontWeight:800,lineHeight:1.1,marginBottom:"22px",letterSpacing:"-1.5px"},
    heroHL:{background:"linear-gradient(90deg,#38bdf8,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
    heroSub:{maxWidth:"560px",margin:"0 auto 40px",color:muted,fontSize:"17px",lineHeight:1.7},
    heroBtns:{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap"},
    primaryBtn:{background:"linear-gradient(135deg,#38bdf8,#6366f1)",border:"none",color:"#fff",padding:"14px 32px",borderRadius:"10px",fontSize:"16px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},
    outlineBtn:{background:"transparent",border:`1px solid ${dark?"#1e3a5f":"#94a3b8"}`,color:muted,padding:"14px 32px",borderRadius:"10px",fontSize:"16px",cursor:"pointer",fontFamily:"inherit"},
    smallBtn:{background:"linear-gradient(135deg,#38bdf8,#6366f1)",border:"none",color:"#fff",padding:"10px 20px",borderRadius:"8px",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
    statsRow:{display:"flex",justifyContent:"center",gap:"48px",padding:"32px 24px",flexWrap:"wrap",borderTop:`1px solid ${statsBorder}`,borderBottom:`1px solid ${statsBorder}`,background:statsBg},
    statNum:{fontSize:"32px",fontWeight:800,background:"linear-gradient(90deg,#38bdf8,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
    statLabel:{fontSize:"13px",color:dim,marginTop:"4px"},
    section:{padding:"72px 24px"},
    sectionTitle:{textAlign:"center",fontSize:"clamp(24px,4vw,38px)",fontWeight:800,marginBottom:"12px",letterSpacing:"-0.5px"},
    sectionSub:{textAlign:"center",color:dim,maxWidth:"560px",margin:"0 auto 48px",fontSize:"15px",lineHeight:1.7},
    careerGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:"14px",maxWidth:"1100px",margin:"0 auto"},
    careerCard:{background:card,border:`2px solid ${cardBorder}`,borderRadius:"14px",padding:"20px 16px",cursor:"pointer",transition:"all .2s",textAlign:"center",boxShadow:dark?"none":"0 2px 10px rgba(0,0,0,.06)"},
    careerCardActive:{background:"rgba(56,189,248,.08)",borderColor:"#38bdf8",boxShadow:"0 0 24px rgba(56,189,248,.15)"},
    quizWrap:{maxWidth:"700px",margin:"0 auto",padding:"40px 24px"},
    card:{background:card,border:`1px solid ${cardBorder}`,borderRadius:"16px",padding:"28px",boxShadow:dark?"none":"0 4px 20px rgba(0,0,0,.07)"},
    optionBtn:{display:"block",width:"100%",textAlign:"left",background:optBg,border:`1px solid ${optBorder}`,color:optColor,padding:"14px 18px",borderRadius:"10px",marginBottom:"10px",cursor:"pointer",fontFamily:"inherit",fontSize:"14px",transition:"all .15s"},
    optionCorrect:{background:"rgba(34,197,94,.1)",borderColor:"#22c55e",color:dark?"#4ade80":"#16a34a"},
    optionWrong:{background:"rgba(239,68,68,.1)",borderColor:"#ef4444",color:dark?"#f87171":"#dc2626"},
    progressBar:{height:"8px",background:cardBorder,borderRadius:"99px",overflow:"hidden"},
    progressFill:{height:"100%",background:"linear-gradient(90deg,#38bdf8,#6366f1)",borderRadius:"99px",transition:"width .4s ease"},
    resultWrap:{maxWidth:"900px",margin:"0 auto",padding:"40px 24px"},
    resultCard:{background:card,border:`1px solid ${cardBorder}`,borderRadius:"14px",padding:"22px",boxShadow:dark?"none":"0 2px 12px rgba(0,0,0,.06)"},
    resultCardTitle:{fontSize:"12px",color:dim,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"12px"},
    roadmapWrap:{maxWidth:"860px",margin:"0 auto",padding:"40px 24px"},
    monthCard:{background:card,border:`1px solid ${cardBorder}`,borderRadius:"16px",padding:"28px",marginBottom:"20px",boxShadow:dark?"none":"0 2px 14px rgba(0,0,0,.07)"},
    tag:{display:"inline-block",padding:"3px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:600,marginRight:"6px",marginBottom:"6px"},
    footer:{textAlign:"center",padding:"28px 24px",borderTop:`1px solid ${cardBorder}`,color:dim,fontSize:"13px",background:dark?"transparent":"#f8fafc"},
    card_v:card, cardBorder_v:cardBorder, muted_v:muted, dim_v:dim, dark_v:dark, optBg_v:optBg, optBorder_v:optBorder,
  };
}

// ── SCORE CALCULATOR ──────────────────────────────────────────────────────────
function calcScores(answers) {
  const getVal = (idx) => (idx !== null && idx !== undefined) ? (idx + 1) : 0;

  const q1 = getVal(answers[0]);
  const q2 = getVal(answers[1]);
  const q3 = getVal(answers[2]);
  const q4 = getVal(answers[3]);
  const q5 = getVal(answers[4]);
  const q6 = getVal(answers[5]);
  const q7 = getVal(answers[6]);
  const q8 = getVal(answers[7]);
  const q9 = getVal(answers[8]);
  const q10 = getVal(answers[9]);
  const q11 = getVal(answers[10]);
  const q12 = getVal(answers[11]);
  const q13 = getVal(answers[12]);
  const q14 = getVal(answers[13]);
  const q15 = getVal(answers[14]);

  const fitScore = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10 + q11 + q12 + q13 + q14 + q15;
  
  const analytical = Math.round(((q6 + q8 + q14) / 12) * 100) || 0;
  const problem = Math.round(((q3 + q9 + q12) / 12) * 100) || 0;
  const curiosity = Math.round(((q7 + q10 + q11) / 12) * 100) || 0;
  const commitment = Math.round(((q5 + q13) / 8) * 100) || 0;
  const persistence = Math.round((q15 / 4) * 100) || 0;

  const academic = Math.round((q2 / 4) * 100) || 0;
  const financial = Math.round((q1 / 4) * 100) || 0;

  return {
    fitScore,
    analytical,
    problem,
    curiosity,
    commitment,
    persistence,
    academic,
    financial
  };
}

// ── GEMINI ROADMAP ────────────────────────────────────────────────────────────
async function fetchRoadmap(career, scores) {
  const careerLabel = CAREERS.find(c => c.id === career)?.label || career;

  const res = await fetch("/api/roadmap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ career: careerLabel, scores }),
  });

  return await res.json();
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ setPage, theme, toggleTheme }) {
  const S = s(theme);
  return (
    <nav style={S.nav}>
      <div style={S.logo}>Career Reality AI</div>
      <div style={S.navLinks}>
        {["home","careers","about"].map(p=>(
          <button key={p} style={S.navLink} onClick={()=>setPage(p)}>
            {p.charAt(0).toUpperCase()+p.slice(1)}
          </button>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center"}}>
        <button style={S.toggleBtn} onClick={toggleTheme}>{theme==="dark"?"☀️ Light":"🌙 Dark"}</button>
        <button style={S.navBtn} onClick={()=>setPage("careers")}>Get Started →</button>
      </div>
    </nav>
  );
}

// ── LANDING PAGE ──────────────────────────────────────────────────────────────
function LandingPage({ setPage, theme }) {
  const S = s(theme);
  const dark = theme==="dark";
  const features = [
    {icon:"🔬",title:"15 Science Careers",desc:"Comprehensive coverage of all major science career paths in India."},
    {icon:"📊",title:"6-Category Assessment",desc:"Aptitude, academic, financial, commitment, soft skills & expectations."},
    {icon:"💰",title:"Financial Reality Check",desc:"Real cost breakdown with govt vs private college fees, ROI analysis."},
    {icon:"🗺️",title:"AI Personalized Roadmap",desc:"Gemini AI generates a custom 4-month plan based on your profile."},
    {icon:"🎓",title:"Scholarship Finder",desc:"General, government & girl-specific scholarships all in one place."},
    {icon:"🔄",title:"Alternative Careers",desc:"If one path is tough, instantly discover better-suited alternatives."},
  ];
  return (
    <>
      <section style={S.hero}>
        <div style={S.badge}>🔬 Science Career Guidance Platform</div>
        <h1 style={S.heroTitle}>Find Your Science Career<br/><span style={S.heroHL}>Reality Before You Begin</span></h1>
        <p style={S.heroSub}>6-category assessment covering aptitude, finances, academics and more — plus an AI roadmap built just for you.</p>
        <div style={S.heroBtns}>
          <button style={S.primaryBtn} onClick={()=>setPage("careers")}>Start Free Assessment →</button>
          <button style={S.outlineBtn} onClick={()=>setPage("about")}>How It Works</button>
        </div>
      </section>
      <div style={S.statsRow}>
        {[["15","Science Careers"],["18","Assessment Questions"],["6","Score Categories"],["AI","Roadmap"]].map(([n,l])=>(
          <div key={l} style={{textAlign:"center"}}><div style={S.statNum}>{n}</div><div style={S.statLabel}>{l}</div></div>
        ))}
      </div>
      <section style={S.section}>
        <h2 style={S.sectionTitle}>Complete Career Intelligence</h2>
        <p style={S.sectionSub}>Everything a career counselor would tell you — in 5 minutes.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"18px",maxWidth:"1000px",margin:"0 auto"}}>
          {features.map(f=>(
            <div key={f.title} style={{background:S.card_v,border:`1px solid ${S.cardBorder_v}`,borderRadius:"16px",padding:"24px",boxShadow:dark?"none":"0 2px 12px rgba(0,0,0,.07)"}}>
              <div style={{fontSize:"28px",marginBottom:"12px"}}>{f.icon}</div>
              <div style={{fontWeight:700,fontSize:"15px",marginBottom:"7px"}}>{f.title}</div>
              <div style={{color:S.dim_v,fontSize:"13px",lineHeight:1.6}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ── CAREERS PAGE ──────────────────────────────────────────────────────────────
function CareersPage({ setPage, setSelectedCareer, setAnswers, theme }) {
  const S = s(theme);
  const [active, setActive] = useState(null);
  function handleStart() {
    if(!active) return alert("Please select a career first!");
    setSelectedCareer(active);
    setAnswers(Array(QUIZ.length).fill(null));
    localStorage.setItem("career_reality_current_q", "0");
    localStorage.setItem("career_reality_show_review", "false");
    setPage("quiz");
  }
  return (
    <section style={S.section}>
      <h2 style={S.sectionTitle}>Choose Your Science Career</h2>
      <p style={S.sectionSub}>Select the career path you want to assess. We will evaluate your fit across 6 categories.</p>
      <div style={S.careerGrid}>
        {CAREERS.map(c=>(
          <div key={c.id} style={{...S.careerCard,...(active===c.id?S.careerCardActive:{})}} onClick={()=>setActive(c.id)}>
            <div style={{fontSize:"30px",marginBottom:"8px"}}>{c.icon}</div>
            <div style={{fontWeight:700,fontSize:"13px",marginBottom:"4px"}}>{c.label}</div>
            <div style={{color:S.dim_v,fontSize:"11px",lineHeight:1.4}}>{c.desc}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginTop:"36px"}}>
        <button style={{...S.primaryBtn,opacity:active?1:0.4}} onClick={handleStart}>Begin Assessment →</button>
      </div>
    </section>
  );
}

// ── QUIZ PAGE ─────────────────────────────────────────────────────────────────
function QuizPage({ career, setPage, answers, setAnswers, theme }) {
  const S = s(theme);
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem("career_reality_current_q");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showReview, setShowReview] = useState(() => {
    return localStorage.getItem("career_reality_show_review") === "true";
  });
  const [validationError, setValidationError] = useState("");

  // Sync current question and showReview to localStorage
  useEffect(() => {
    localStorage.setItem("career_reality_current_q", current.toString());
  }, [current]);

  useEffect(() => {
    localStorage.setItem("career_reality_show_review", showReview ? "true" : "false");
  }, [showReview]);

  const q = QUIZ[current];
  const catInfo = CATEGORIES.find(c => c.id === q.cat);
  const catQuestions = QUIZ.filter(x => x.cat === q.cat);
  const catIndex = catQuestions.indexOf(q) + 1;

  const answeredCount = answers.filter(a => a !== null).length;
  const unansweredCount = QUIZ.length - answeredCount;
  const percentComplete = Math.round((answeredCount / QUIZ.length) * 100);

  // Clear validation error when user changes option or current question
  useEffect(() => {
    setValidationError("");
  }, [current, answers[current]]);

  // Handle option select
  const handleOptionSelect = (idx) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[current] === null) {
      setValidationError("Please select an option before proceeding.");
      return;
    }
    if (current + 1 < QUIZ.length) {
      setCurrent(current + 1);
    } else {
      setShowReview(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSubmit = () => {
    if (answeredCount < QUIZ.length) {
      const missing = [];
      answers.forEach((ans, idx) => {
        if (ans === null) missing.push(idx + 1);
      });
      setValidationError(`Please answer all questions before generating your report. Missing questions: ${missing.join(", ")}`);
      return;
    }
    setPage("result");
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (showReview) {
          handleSubmit();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, answers, showReview]);

  // Render the review screen view
  if (showReview) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={S.badge}>📋 Review Your Responses</div>
          <h2 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, marginBottom: "8px" }}>Assessment Summary</h2>
          <p style={{ color: S.muted_v, fontSize: "14px" }}>
            You have answered <strong>{answeredCount}</strong> of <strong>{QUIZ.length}</strong> questions.
          </p>
        </div>

        {validationError && (
          <div style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid #ef4444",
            color: "#f87171",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600
          }}>
            ⚠️ {validationError}
          </div>
        )}

        <div style={{ marginBottom: "24px" }}>
          {QUIZ.map((question, idx) => {
            const answerIdx = answers[idx];
            const hasAnswer = answerIdx !== null;
            const optionText = hasAnswer ? question.opts[answerIdx].t : "";
            
            return (
              <div key={idx} style={{
                background: S.card_v,
                border: `1px solid ${hasAnswer ? S.cardBorder_v : "#ef4444"}`,
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                boxShadow: theme === "dark" ? "none" : "0 2px 8px rgba(0,0,0,.04)"
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: S.dim_v, marginBottom: "4px" }}>
                    Question {idx + 1}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>{question.q}</div>
                  <div style={{
                    fontSize: "14px",
                    color: hasAnswer ? (theme === "dark" ? "#38bdf8" : "#0284c7") : "#ef4444",
                    fontWeight: 500
                  }}>
                    {hasAnswer ? `✓ Answered: ${optionText}` : "⚠️ Unanswered"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrent(idx);
                    setShowReview(false);
                  }}
                  style={{
                    ...S.outlineBtn,
                    padding: "8px 16px",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderRadius: "8px",
                    whiteSpace: "nowrap"
                  }}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginTop: "24px" }}>
          <button
            onClick={() => setShowReview(false)}
            style={{
              ...S.outlineBtn,
              flex: 1,
              padding: "14px",
              fontWeight: 700
            }}
          >
            ← Back to Quiz
          </button>
          
          <button
            onClick={handleSubmit}
            style={{
              ...S.primaryBtn,
              flex: 1,
              padding: "14px",
              fontWeight: 700,
              opacity: answeredCount === QUIZ.length ? 1 : 0.4,
              cursor: answeredCount === QUIZ.length ? "pointer" : "not-allowed"
            }}
          >
            Generate Final Report →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "24px" }}>
        
        {/* Left Column: Question Card */}
        <div style={{ flex: "1 1 650px", minWidth: "280px" }}>
          
          {validationError && (
            <div style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid #ef4444",
              color: "#f87171",
              borderRadius: "10px",
              padding: "12px 16px",
              marginBottom: "16px",
              fontSize: "14px",
              fontWeight: 600
            }}>
              ⚠️ {validationError}
            </div>
          )}

          <div style={S.card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>{catInfo.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "15px", color: catInfo.color }}>{catInfo.label}</div>
                  <div style={{ fontSize: "12px", color: S.dim_v }}>Question {current + 1} of {QUIZ.length}</div>
                </div>
              </div>
              
              <div style={{
                fontSize: "11px",
                background: S.optBg_v,
                border: `1px solid ${S.cardBorder_v}`,
                padding: "4px 10px",
                borderRadius: "999px",
                color: S.muted_v,
                fontWeight: 600
              }}>
                {catInfo.label}: {catIndex} / {catQuestions.length}
              </div>
            </div>

            <div style={{ fontSize: "17px", fontWeight: 600, marginBottom: "22px", lineHeight: 1.5 }}>
              {q.q}
            </div>

            {q.opts.map((opt, i) => {
              const isSelected = i === answers[current];
              return (
                <button key={i}
                  style={{
                    ...S.optionBtn,
                    ...(isSelected ? {
                      background: "rgba(56, 189, 248, 0.12)",
                      borderColor: "#38bdf8",
                      color: "#38bdf8",
                      fontWeight: 600,
                    } : {}),
                  }}
                  onClick={() => handleOptionSelect(i)}
                >
                  <span style={{
                    marginRight: "10px",
                    fontWeight: isSelected ? 700 : 400,
                    color: isSelected ? "#38bdf8" : S.dim_v,
                  }}>
                    {isSelected ? "●" : String.fromCharCode(65 + i) + "."}
                  </span>
                  {opt.t}
                </button>
              );
            })}

            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={handlePrev}
                disabled={current === 0}
                style={{
                  ...S.outlineBtn,
                  flex: 1,
                  opacity: current === 0 ? 0.4 : 1,
                  cursor: current === 0 ? "not-allowed" : "pointer",
                  padding: "12px"
                }}
              >
                ← Previous
              </button>
              
              <button
                onClick={handleNext}
                style={{
                  ...S.primaryBtn,
                  flex: 1,
                  padding: "12px"
                }}
              >
                {current + 1 < QUIZ.length ? "Next Question →" : "Review & Submit →"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div style={{ flex: "1 1 300px", minWidth: "280px" }}>
          
          {/* Progress Tracker Card */}
          <div style={S.card}>
            <div style={{ fontWeight: 800, fontSize: "15px", marginBottom: "12px" }}>Progress Tracker</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
              <span style={{ color: S.muted_v }}>Completed</span>
              <span style={{ fontWeight: 700, color: "#38bdf8" }}>{percentComplete}%</span>
            </div>
            <div style={{ ...S.progressBar, marginBottom: "14px" }}>
              <div style={{ ...S.progressFill, width: `${percentComplete}%` }} />
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: S.muted_v }}>
              <span>Answered: <strong>{answeredCount}</strong></span>
              <span>Unanswered: <strong>{unansweredCount}</strong></span>
            </div>
          </div>

          {/* Question Navigator Card */}
          <div style={{ ...S.card, marginTop: "18px" }}>
            <div style={{ fontWeight: 800, fontSize: "15px", marginBottom: "4px" }}>Question Navigator</div>
            <div style={{ fontSize: "12px", color: S.dim_v, marginBottom: "14px" }}>Jump freely to any question:</div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "6px"
            }}>
              {QUIZ.map((_, idx) => {
                const isCurrent = idx === current;
                const isAnswered = answers[idx] !== null;
                
                let bg = S.optBg_v;
                let border = S.optBorder_v;
                let color = S.muted_v;
                
                if (isCurrent) {
                  bg = theme === "dark" ? "rgba(56, 189, 248, 0.15)" : "#e0f2fe";
                  border = "#38bdf8";
                  color = "#38bdf8";
                } else if (isAnswered) {
                  bg = theme === "dark" ? "rgba(34, 197, 94, 0.15)" : "#dcfce7";
                  border = "#22c55e";
                  color = theme === "dark" ? "#4ade80" : "#16a34a";
                }
                
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrent(idx);
                      setShowReview(false);
                    }}
                    style={{
                      background: bg,
                      border: `2px solid ${border}`,
                      color: color,
                      borderRadius: "8px",
                      padding: "8px 0",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "12px",
                      textAlign: "center",
                      transition: "all 0.15s"
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowReview(true)}
              style={{
                ...S.outlineBtn,
                width: "100%",
                marginTop: "16px",
                padding: "10px",
                fontSize: "13px",
                fontWeight: 700
              }}
            >
              📋 Review Assessment ({answeredCount}/{QUIZ.length})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── SCORE BAR COMPONENT ───────────────────────────────────────────────────────
function ScoreBar({ label, score, color, icon }) {
  const level = score>=70?"Strong":score>=45?"Developing":"Needs Work";
  return (
    <div style={{marginBottom:"18px"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
        <span style={{fontWeight:600,fontSize:"14px"}}>{icon} {label}</span>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"12px",padding:"2px 8px",borderRadius:"999px",background:`${color}22`,color:color,fontWeight:600}}>{level}</span>
          <span style={{fontWeight:800,fontSize:"16px",color:color}}>{score}%</span>
        </div>
      </div>
      <div style={{height:"10px",background:"rgba(100,116,139,.2)",borderRadius:"99px",overflow:"hidden"}}>
        <div style={{height:"100%",width:`${score}%`,background:`linear-gradient(90deg,${color},${color}99)`,borderRadius:"99px",transition:"width 1s ease"}}/>
      </div>
    </div>
  );
}

// ── RESULT PAGE ───────────────────────────────────────────────────────────────
function ResultPage({ career, answers, setPage, theme }) {
  const S = s(theme);
  const dark = theme==="dark";
  const scores = calcScores(answers);
  const careerData = CAREERS.find(c=>c.id===career);
  const fin = careerData?.fin;
  const overall = scores.fitScore;

  let verdict = "Weak Fit ⚠️";
  let verdictColor = dark ? "#f87171" : "#dc2626";
  let verdictDesc = "Based on your current assessment, additional preparation may be beneficial before pursuing this path. Your roadmap will guide you step by step.";

  if (overall >= 51) {
    verdict = "Strong Fit 🌟";
    verdictColor = dark ? "#4ade80" : "#16a34a";
    verdictDesc = "Your profile shows strong alignment with this career. You have the aptitude, commitment and readiness to pursue it successfully.";
  } else if (overall >= 38) {
    verdict = "Moderate Fit ✅";
    verdictColor = dark ? "#38bdf8" : "#0284c7";
    verdictDesc = "Based on your current assessment, you show good potential. With focused preparation in the identified areas, this career is very achievable.";
  } else if (overall >= 26) {
    verdict = "Explore Further 📈";
    verdictColor = dark ? "#fbbf24" : "#ca8a04";
    verdictDesc = "Based on your current assessment, exploring this path further and building foundational skills will help clarify your interest and suitability.";
  }

  const scoreCategories = [
    {label:"Analytical Thinking", key:"analytical", color:"#38bdf8", icon:"🧠"},
    {label:"Problem Solving",     key:"problem",    color:"#818cf8", icon:"⚙️"},
    {label:"Technical Curiosity", key:"curiosity",  color:"#4ade80", icon:"🔍"},
    {label:"Learning Commitment", key:"commitment", color:"#f472b6", icon:"📚"},
    {label:"Persistence Level",   key:"persistence",color:"#fb923c", icon:"💪"},
  ];

  return (
    <div style={S.resultWrap}>
      <div style={{textAlign:"center",marginBottom:"36px"}}>
        <div style={S.badge}>📊 Your Assessment Report</div>
        <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800,marginBottom:"8px"}}>{careerData?.label} — Career Analysis</h2>
      </div>

      {/* Overall score + verdict */}
      <div style={{display:"grid",gridTemplateColumns:"160px 1fr",gap:"20px",marginBottom:"24px",alignItems:"center"}}>
        <div style={{width:"140px",height:"140px",borderRadius:"50%",background:dark?"linear-gradient(135deg,#0d2240,#1e3a5f)":"#f0f9ff",border:`5px solid ${verdictColor}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:`0 0 30px ${verdictColor}44`,margin:"0 auto"}}>
          <div style={{fontSize:"36px",fontWeight:800,color:verdictColor}}>{overall}</div>
          <div style={{fontSize:"11px",color:S.dim_v,marginTop:"2px"}}>Score (15-60)</div>
        </div>
        <div style={{...S.resultCard}}>
          <div style={{color:verdictColor,fontWeight:800,fontSize:"20px",marginBottom:"6px"}}>{verdict}</div>
          <div style={{color:S.muted_v,fontSize:"14px",lineHeight:1.7}}>
            {verdictDesc}
          </div>
        </div>
      </div>

      {/* 6 Score Bars */}
      <div style={{...S.resultCard,marginBottom:"20px"}}>
        <div style={S.resultCardTitle}>📊 Detailed Score Breakdown</div>
        {scoreCategories.map(sc=>(
          <ScoreBar key={sc.key} label={sc.label} score={scores[sc.key]} color={sc.color} icon={sc.icon}/>
        ))}
      </div>

      {/* Financial Analysis */}
      <div style={{...S.resultCard,marginBottom:"20px"}}>
        <div style={S.resultCardTitle}>💰 Realistic Financial Analysis</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"12px",marginBottom:"16px"}}>
          {[
            ["🏛️ Govt College",fin?.govt],["🏫 Private College",fin?.pvt],
            ["🏠 Hostel/Living",fin?.hostel],["📖 Coaching",fin?.coaching],
            ["⏱️ Duration",fin?.dur],["💼 Starting Salary",fin?.start],
            ["📈 Long-term Salary",fin?.long],["📊 ROI",fin?.roi],
          ].map(([label,val])=>(
            <div key={label} style={{background:dark?"rgba(13,34,64,.4)":"#f8fafc",border:`1px solid ${S.cardBorder_v}`,borderRadius:"10px",padding:"12px"}}>
              <div style={{fontSize:"11px",color:S.dim_v,marginBottom:"4px"}}>{label}</div>
              <div style={{fontWeight:700,fontSize:"13px",color:dark?"#e8edf5":"#0f172a"}}>₹{val}</div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(56,189,248,.08)",border:"1px solid rgba(56,189,248,.2)",borderRadius:"10px",padding:"12px",fontSize:"13px",color:S.muted_v}}>
          💡 Financial Capacity Score: <strong style={{color:scores.financial>=70?"#4ade80":scores.financial>=45?"#fbbf24":"#f87171"}}>{scores.financial}%</strong>
          {scores.financial < 50 ? " — Explore government colleges and scholarship options below." : " — Your financial profile is well-suited for this career."}
        </div>
      </div>

      {/* Scholarships */}
      <div style={{...S.resultCard,marginBottom:"20px"}}>
        <div style={S.resultCardTitle}>🎓 Potential Scholarship Opportunities and Fee Benefits</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
          <div>
            <div style={{fontWeight:700,fontSize:"13px",color:"#38bdf8",marginBottom:"8px"}}>🌐 General Scholarships</div>
            {SCHOLARSHIPS.general.map(sc=><div key={sc} style={{fontSize:"12px",color:S.muted_v,marginBottom:"6px",lineHeight:1.5}}>• {sc}</div>)}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:"13px",color:"#818cf8",marginBottom:"8px"}}>🏛️ Government Scholarships</div>
            {SCHOLARSHIPS.govt.map(sc=><div key={sc} style={{fontSize:"12px",color:S.muted_v,marginBottom:"6px",lineHeight:1.5}}>• {sc}</div>)}
          </div>
        </div>
        <div style={{marginTop:"16px",background:"rgba(244,114,182,.08)",border:"1px solid rgba(244,114,182,.3)",borderRadius:"10px",padding:"14px"}}>
          <div style={{fontWeight:700,fontSize:"13px",color:"#f472b6",marginBottom:"8px"}}>👩 Scholarships & Benefits Specifically for Girls</div>
          {SCHOLARSHIPS.girls.map(sc=><div key={sc} style={{fontSize:"12px",color:S.muted_v,marginBottom:"6px",lineHeight:1.5}}>• {sc}</div>)}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"8px"}}>
        <button style={{...S.primaryBtn,width:"100%"}} onClick={()=>setPage("roadmap")}>🗺️ View AI Roadmap</button>
        <button style={{...S.outlineBtn,width:"100%",borderColor:"#f472b6",color:"#f472b6"}} onClick={()=>setPage("alternatives")}>🔄 Explore Alternative Careers</button>
      </div>
      <button style={{...S.outlineBtn,width:"100%",marginTop:"12px"}} onClick={()=>setPage("careers")}>← Try Another Career</button>
    </div>
  );
}

// ── ROADMAP PAGE ──────────────────────────────────────────────────────────────
function RoadmapPage({ career, answers, setPage, theme }) {
  const S = s(theme);
  const scores = calcScores(answers);
  const [roadmap, setRoadmap]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const careerData = CAREERS.find(c=>c.id===career);
  const tagColors = [
    {bg:"rgba(56,189,248,.15)",color:"#38bdf8"},{bg:"rgba(99,102,241,.15)",color:"#818cf8"},
    {bg:"rgba(34,197,94,.15)",color:"#4ade80"},{bg:"rgba(251,191,36,.15)",color:"#fbbf24"},
  ];

  const getDiffStyle = (diff) => {
    const d = (diff || "Beginner").toLowerCase();
    if (d.includes("adv")) return { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171" };
    if (d.includes("int")) return { bg: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" };
    return { bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80" };
  };

  async function generate() {
    setLoading(true); setError(null);
    try { setRoadmap(await fetchRoadmap(career, scores)); }
    catch(e) { setError("Could not generate roadmap. Check your API key in .env"); }
    setLoading(false);
  }
  useState(()=>{ generate(); },[]);
  if(!roadmap && !loading && !error) generate();

  return (
    <div style={S.roadmapWrap}>
      <div style={{textAlign:"center",marginBottom:"36px"}}>
        <div style={S.badge}>🗺️ AI-Generated Roadmap</div>
        <h2 style={{fontSize:"clamp(22px,4vw,34px)",fontWeight:800,marginBottom:"8px"}}>Your {careerData?.label} Roadmap</h2>
        <p style={{color:S.muted_v,fontSize:"14px"}}>Personalized by Gemini AI based on your 6-category assessment</p>
      </div>

      {/* ── FIX 2: Back to Report always visible — even while loading ── */}
      <div style={{display:"flex",gap:"12px",marginBottom:"28px",flexWrap:"wrap"}}>
        <button style={{...S.outlineBtn,padding:"10px 22px",fontSize:"14px"}} onClick={()=>setPage("result")}>
          ← Back to Report
        </button>
        <button style={{...S.outlineBtn,padding:"10px 22px",fontSize:"14px",borderColor:"#f472b6",color:"#f472b6"}} onClick={()=>setPage("alternatives")}>
          🔄 Alternative Careers
        </button>
      </div>

      {loading && (
        <div style={{textAlign:"center",padding:"60px 0"}}>
          <div style={{fontSize:"44px",marginBottom:"16px",display:"inline-block",animation:"spin 1.5s linear infinite"}}>⚙️</div>
          <p style={{color:S.muted_v,fontSize:"16px"}}>Gemini AI is building your personalized roadmap...</p>
          <p style={{color:S.dim_v,fontSize:"13px",marginTop:"6px"}}>This takes about 5-10 seconds</p>
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {error && (
        <div style={{background:"rgba(239,68,68,.1)",border:"1px solid #ef4444",borderRadius:"12px",padding:"24px",textAlign:"center"}}>
          <p style={{color:"#f87171",fontWeight:600,marginBottom:"12px"}}>{error}</p>
          <button style={S.primaryBtn} onClick={generate}>Try Again</button>
        </div>
      )}

      {roadmap && !loading && (
        <>
          <div style={{background:"linear-gradient(135deg,rgba(56,189,248,.1),rgba(99,102,241,.1))",border:"1px solid rgba(56,189,248,.2)",borderRadius:"14px",padding:"20px",marginBottom:"24px"}}>
            <p style={{color:S.muted_v,fontSize:"15px",lineHeight:1.7}}>{roadmap.summary}</p>
          </div>

          {/* Strengths & Gaps */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"24px"}}>
            <div style={S.resultCard}>
              <div style={S.resultCardTitle}>✅ Your Strengths</div>
              {roadmap.strengths?.map(str=><div key={str} style={{fontSize:"13px",color:S.muted_v,marginBottom:"6px"}}>• {str}</div>)}
            </div>
            <div style={S.resultCard}>
              <div style={S.resultCardTitle}>📈 Skills to Develop</div>
              {roadmap.gaps?.map(g=><div key={g} style={{fontSize:"13px",color:S.muted_v,marginBottom:"6px"}}>• {g}</div>)}
            </div>
          </div>

          {/* Month cards */}
          {roadmap.months?.map((m,i)=>(
            <div key={i} style={S.monthCard}>
              <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"18px"}}>
                <div style={{minWidth:"50px",height:"50px",borderRadius:"12px",background:"linear-gradient(135deg,#38bdf8,#6366f1)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                  <span style={{fontSize:"9px",fontWeight:600,opacity:.8}}>MONTH</span>
                  <span style={{fontSize:"18px",fontWeight:800,lineHeight:1}}>{m.month}</span>
                </div>
                <div>
                  <div style={{fontWeight:800,fontSize:"17px"}}>{m.title}</div>
                  <div style={{color:"#38bdf8",fontSize:"12px"}}>Focus: {m.focus}</div>
                </div>
              </div>
              <div style={{marginBottom:"16px"}}>
                <div style={{fontSize:"11px",fontWeight:700,color:S.dim_v,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"8px"}}>📚 Topics</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                  {m.topics?.map((t,ti)=><span key={ti} style={{...S.tag,...tagColors[ti%tagColors.length]}}>{t}</span>)}
                </div>
              </div>
              {m.courses?.length>0 && (
                <div style={{marginBottom:"16px"}}>
                  <div style={{fontSize:"11px",fontWeight:700,color:S.dim_v,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"8px"}}>📚 Courses</div>
                  {m.courses.map((c,ci)=>{
                    const isVerified = c.url && c.url !== "Resource could not be verified";
                    const diffStyle = getDiffStyle(c.difficulty);
                    return (
                      <div key={ci} style={{background:S.dark_v?"rgba(5,11,20,.4)":"#f8fafc",border:`1px solid ${S.cardBorder_v}`,borderRadius:"10px",padding:"14px",marginBottom:"10px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"10px",flexWrap:"wrap",marginBottom:"6px"}}>
                          <div>
                            <span style={{fontWeight:700,fontSize:"14px",color:S.dark_v?"#e8edf5":"#0f172a"}}>{c.name}</span>
                            <span style={{color:S.dim_v,fontSize:"11px",marginLeft:"8px"}}>({c.platform})</span>
                          </div>
                          <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
                            <span style={{background:diffStyle.bg,color:diffStyle.color,padding:"2px 8px",borderRadius:"99px",fontSize:"10px",fontWeight:700}}>
                              {c.difficulty || "Beginner"}
                            </span>
                            {c.free&&<span style={{background:"rgba(34,197,94,.15)",color:"#4ade80",padding:"2px 6px",borderRadius:"99px",fontSize:"10px",fontWeight:700}}>FREE</span>}
                            {isVerified ? (
                              <a href={c.url} target="_blank" rel="noreferrer" style={{background:"rgba(56,189,248,.15)",color:"#38bdf8",padding:"4px 12px",borderRadius:"6px",fontSize:"11px",fontWeight:600,textDecoration:"none"}}>Open →</a>
                            ) : (
                              <span style={{background:"rgba(100,116,139,.15)",color:S.dim_v,padding:"4px 12px",borderRadius:"6px",fontSize:"11px",fontWeight:600,cursor:"not-allowed"}}>Resource could not be verified</span>
                            )}
                          </div>
                        </div>
                        {c.why && (
                          <div style={{fontSize:"12.5px",color:S.muted_v,lineHeight:1.5,marginTop:"6px",borderLeft:`2px solid ${S.cardBorder_v}`,paddingLeft:"8px"}}>
                            💡 <strong>Why recommended:</strong> {c.why}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {m.youtube?.length>0 && (
                <div style={{marginBottom:"16px"}}>
                  <div style={{fontSize:"11px",fontWeight:700,color:S.dim_v,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"8px"}}>▶️ YouTube</div>
                  {m.youtube.map((y,yi)=>{
                    const isVerified = y.url && y.url !== "Resource could not be verified";
                    const diffStyle = getDiffStyle(y.difficulty);
                    return (
                      <div key={yi} style={{background:S.dark_v?"rgba(5,11,20,.4)":"#f8fafc",border:`1px solid ${S.cardBorder_v}`,borderRadius:"10px",padding:"14px",marginBottom:"10px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"10px",flexWrap:"wrap",marginBottom:"6px"}}>
                          <div>
                            <span style={{fontWeight:700,fontSize:"14px",color:S.dark_v?"#e8edf5":"#0f172a"}}>{y.channel}</span>
                            <span style={{color:S.dim_v,fontSize:"11px",marginLeft:"8px"}}>— Topic: {y.topic}</span>
                          </div>
                          <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
                            <span style={{background:diffStyle.bg,color:diffStyle.color,padding:"2px 8px",borderRadius:"99px",fontSize:"10px",fontWeight:700}}>
                              {y.difficulty || "Beginner"}
                            </span>
                            {isVerified ? (
                              <a href={y.url} target="_blank" rel="noreferrer" style={{background:"rgba(239,68,68,.15)",color:"#f87171",padding:"4px 12px",borderRadius:"6px",fontSize:"11px",fontWeight:600,textDecoration:"none"}}>Watch →</a>
                            ) : (
                              <span style={{background:"rgba(100,116,139,.15)",color:S.dim_v,padding:"4px 12px",borderRadius:"6px",fontSize:"11px",fontWeight:600,cursor:"not-allowed"}}>Resource could not be verified</span>
                            )}
                          </div>
                        </div>
                        {y.why && (
                          <div style={{fontSize:"12.5px",color:S.muted_v,lineHeight:1.5,marginTop:"6px",borderLeft:`2px solid ${S.cardBorder_v}`,paddingLeft:"8px"}}>
                            💡 <strong>Why recommended:</strong> {y.why}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <div style={{background:S.dark_v?"rgba(56,189,248,.05)":"#f0f9ff",border:"1px solid rgba(56,189,248,.2)",borderRadius:"8px",padding:"12px 14px"}}>
                <span style={{color:"#38bdf8",fontWeight:700,fontSize:"12px"}}>🎯 Month Goal: </span>
                <span style={{color:S.muted_v,fontSize:"13px"}}>{m.goal}</span>
              </div>
            </div>
          ))}

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"}}>
            <div style={S.resultCard}>
              <div style={S.resultCardTitle}>🏆 Certifications to Earn</div>
              {roadmap.certifications?.map((c,i)=><div key={i} style={{fontSize:"13px",color:S.muted_v,marginBottom:"6px"}}>• {c}</div>)}
            </div>
            <div style={S.resultCard}>
              <div style={S.resultCardTitle}>💰 Scholarships to Apply</div>
              {roadmap.scholarships?.map((sc,i)=><div key={i} style={{fontSize:"13px",color:S.muted_v,marginBottom:"6px"}}>• {sc}</div>)}
            </div>
          </div>

          {roadmap.tip && (
            <div style={{background:"linear-gradient(135deg,rgba(99,102,241,.1),rgba(56,189,248,.1))",border:"1px solid rgba(99,102,241,.3)",borderRadius:"12px",padding:"18px 22px",marginBottom:"24px",textAlign:"center"}}>
              <span style={{fontSize:"18px"}}>💡 </span>
              <span style={{color:S.muted_v,fontSize:"14px",lineHeight:1.7}}>{roadmap.tip}</span>
            </div>
          )}

          {/* ── FIX 2: Bottom nav — same as top ── */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px",flexWrap:"wrap"}}>
            <button style={{...S.primaryBtn}} onClick={generate}>🔄 Regenerate</button>
            <button style={{...S.outlineBtn}} onClick={()=>setPage("result")}>← Back to Report</button>
            <button style={{...S.outlineBtn,borderColor:"#f472b6",color:"#f472b6"}} onClick={()=>setPage("alternatives")}>🔄 Alternatives</button>
          </div>
        </>
      )}
    </div>
  );
}

// ── ALTERNATIVES PAGE ─────────────────────────────────────────────────────────
function AlternativesPage({ career, answers, setPage, setSelectedCareer, theme }) {
  const S = s(theme);
  const scores = calcScores(answers);
  const currentCareer = CAREERS.find(c=>c.id===career);
  const altIds = currentCareer?.alts || [];
  const altCareers = altIds.map(id=>CAREERS.find(c=>c.id===id)).filter(Boolean);

  return (
    <div style={S.resultWrap}>
      <div style={{textAlign:"center",marginBottom:"32px"}}>
        <div style={S.badge}>🔄 Alternative Career Paths</div>
        <h2 style={{fontSize:"clamp(22px,4vw,34px)",fontWeight:800,marginBottom:"8px"}}>Better-Suited Alternatives</h2>
        <p style={{color:S.muted_v,fontSize:"14px",maxWidth:"500px",margin:"0 auto"}}>
          Based on your aptitude, budget, and interests — these careers may be a better fit than {currentCareer?.label}.
        </p>
      </div>

      {/* Comparison table */}
      <div style={{...S.resultCard,marginBottom:"20px",overflowX:"auto"}}>
        <div style={S.resultCardTitle}>📊 Side-by-Side Comparison</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}>
          <thead>
            <tr style={{borderBottom:`1px solid ${S.cardBorder_v}`}}>
              {["Career","Duration","Govt Cost","Starting Salary","ROI"].map(h=>(
                <th key={h} style={{textAlign:"left",padding:"8px 12px",color:S.dim_v,fontWeight:700,fontSize:"11px",textTransform:"uppercase"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[currentCareer,...altCareers].map((c,i)=>(
              <tr key={c.id} style={{borderBottom:`1px solid ${S.cardBorder_v}`,background:i===0?"rgba(56,189,248,.05)":"transparent"}}>
                <td style={{padding:"10px 12px",fontWeight:i===0?700:400}}>
                  {c.icon} {c.label} {i===0&&<span style={{fontSize:"10px",color:"#38bdf8",marginLeft:"4px"}}>(current)</span>}
                </td>
                <td style={{padding:"10px 12px",color:S.muted_v}}>{c.fin.dur}</td>
                <td style={{padding:"10px 12px",color:S.muted_v}}>₹{c.fin.govt}</td>
                <td style={{padding:"10px 12px",color:S.muted_v}}>₹{c.fin.start}</td>
                <td style={{padding:"10px 12px"}}>
                  <span style={{padding:"2px 8px",borderRadius:"99px",fontSize:"11px",fontWeight:600,
                    background:c.fin.roi==="High"||c.fin.roi==="Very High"?"rgba(34,197,94,.1)":"rgba(251,191,36,.1)",
                    color:c.fin.roi==="High"||c.fin.roi==="Very High"?"#4ade80":"#fbbf24"}}>
                    {c.fin.roi}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alt career cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"16px",marginBottom:"24px"}}>
        {altCareers.map(c=>(
          <div key={c.id} style={S.resultCard}>
            <div style={{fontSize:"32px",marginBottom:"10px"}}>{c.icon}</div>
            <div style={{fontWeight:800,fontSize:"16px",marginBottom:"6px"}}>{c.label}</div>
            <div style={{color:S.dim_v,fontSize:"12px",marginBottom:"12px",lineHeight:1.5}}>{c.desc}</div>
            <div style={{fontSize:"12px",color:S.muted_v,marginBottom:"4px"}}>⏱️ {c.fin.dur} &nbsp;|&nbsp; 💰 Govt: ₹{c.fin.govt}</div>
            <div style={{fontSize:"12px",color:S.muted_v,marginBottom:"16px"}}>💼 Start: ₹{c.fin.start}/yr</div>
            <button style={{...S.smallBtn,width:"100%"}} onClick={()=>{ setSelectedCareer(c.id); setPage("quiz"); }}>
              Assess for {c.label} →
            </button>
          </div>
        ))}
      </div>

      <button style={{...S.outlineBtn,width:"100%"}} onClick={()=>setPage("result")}>← Back to My Report</button>
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage({ theme }) {
  const S = s(theme);
  return (
    <section style={S.section}>
      <h2 style={S.sectionTitle}>How It Works</h2>
      <p style={S.sectionSub}>A professional career counseling experience in 4 steps.</p>
      <div style={{maxWidth:"700px",margin:"0 auto"}}>
        {[
          ["01","Choose a Science Career","Pick from 15 science career paths, each with full financial data."],
          ["02","Complete 6-Category Assessment","18 questions covering aptitude, academics, finances, commitment, soft skills and expectations."],
          ["03","Get Your Full Report","6 individual scores, financial analysis, and scholarship opportunities including girl-specific benefits."],
          ["04","AI Roadmap + Alternatives","Gemini generates a 4-month personalized plan. Not satisfied? Explore better-suited alternatives instantly."],
        ].map(([num,title,desc])=>(
          <div key={num} style={{display:"flex",gap:"20px",alignItems:"flex-start",marginBottom:"24px",padding:"22px",background:S.card_v,border:`1px solid ${S.cardBorder_v}`,borderRadius:"14px"}}>
            <div style={{minWidth:"44px",height:"44px",borderRadius:"10px",background:"linear-gradient(135deg,#38bdf8,#6366f1)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"15px",color:"#fff"}}>{num}</div>
            <div>
              <div style={{fontWeight:700,fontSize:"16px",marginBottom:"5px"}}>{title}</div>
              <div style={{color:S.dim_v,fontSize:"13px",lineHeight:1.6}}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("career_reality_page") || "home";
  });
  const [selectedCareer, setSelectedCareer] = useState(() => {
    return localStorage.getItem("career_reality_career") || null;
  });
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem("career_reality_answers");
      return saved ? JSON.parse(saved) : Array(18).fill(null);
    } catch {
      return Array(18).fill(null);
    }
  });
  const [theme, setTheme]                   = useState("dark");
  const toggleTheme = () => setTheme(p=>p==="dark"?"light":"dark");
  const S = s(theme);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem("career_reality_page", page);
  }, [page]);

  useEffect(() => {
    if (selectedCareer) {
      localStorage.setItem("career_reality_career", selectedCareer);
    } else {
      localStorage.removeItem("career_reality_career");
    }
  }, [selectedCareer]);

  useEffect(() => {
    localStorage.setItem("career_reality_answers", JSON.stringify(answers));
  }, [answers]);

  return (
    <div style={S.app}>
      <Navbar setPage={setPage} theme={theme} toggleTheme={toggleTheme}/>
      {page==="home"         && <LandingPage     setPage={setPage} theme={theme}/>}
      {page==="careers"      && <CareersPage      setPage={setPage} setSelectedCareer={setSelectedCareer} setAnswers={setAnswers} theme={theme}/>}
      {page==="quiz"         && <QuizPage         career={selectedCareer} setPage={setPage} answers={answers} setAnswers={setAnswers} theme={theme}/>}
      {page==="result"       && <ResultPage       career={selectedCareer} answers={answers} setPage={setPage} theme={theme}/>}
      {page==="roadmap"      && <RoadmapPage      career={selectedCareer} answers={answers} setPage={setPage} theme={theme}/>}
      {page==="alternatives" && <AlternativesPage career={selectedCareer} answers={answers} setPage={setPage} setSelectedCareer={setSelectedCareer} theme={theme}/>}
      {page==="about"        && <AboutPage        theme={theme}/>}
      <footer style={S.footer}>© 2024 Career Reality AI — Built for Students, by Students</footer>
    </div>
  );
}
