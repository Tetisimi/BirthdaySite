import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_PHOTOS = [
  "/assets/img1.jpeg",
  "/assets/img2.jpeg",
  "/assets/img3.jpeg",
  "/assets/img4.jpeg",
  "/assets/img5.jpeg",
  "/assets/img6.jpeg",
  "/assets/img7.jpeg",
  "/assets/img8.jpeg",
];

// Each entry is a full two-page spread shown together
const BOOK_SPREADS = [
  { left: "/assets/img1.jpeg", right: "/assets/img2.jpeg", caption: "As long as you're smiling, I'm happy 💕" },
  // { left: "/assets/img3.jpeg", right: "/assets/img4.jpeg", caption: "Walking tall, standing proud 🌺" },
  // { left: "/assets/img5.jpeg", right: "/assets/img6.jpeg", caption: "Those eyes tell a thousand stories 💫" },
  { left: "/assets/img7.jpeg", right: "/assets/img8.jpeg", caption: "Happy Birthday Oyin — here's to you ❤️" },
];

function heartPoint(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x, y };
}
const COLLAGE_ITEMS = [
  { type:"photo", src:"/assets/img1.jpeg" },
  { type:"emoji", char:"💕" },
  { type:"photo", src:"/assets/img2.jpeg" },
  { type:"emoji", char:"❤️" },
  { type:"photo", src:"/assets/img3.jpeg" },
  { type:"emoji", char:"💗" },
  { type:"photo", src:"/assets/img4.jpeg" },
  { type:"emoji", char:"🌸" },
  { type:"photo", src:"/assets/img5.jpeg" },
  { type:"emoji", char:"💖" },
  { type:"photo", src:"/assets/img6.jpeg" },
  { type:"emoji", char:"✨" },
  { type:"photo", src:"/assets/img7.jpeg" },
  { type:"emoji", char:"💝" },
  { type:"photo", src:"/assets/img8.jpeg" },
  { type:"emoji", char:"🎀" },
];
const HEART_POS = COLLAGE_ITEMS.map((_, i) => {
  const t = (i / COLLAGE_ITEMS.length) * 2 * Math.PI;
  const p = heartPoint(t);
  return { x: (p.x / 18) * 0.42 + 0.5, y: (p.y / 18) * 0.42 + 0.52 };
});



const REVEAL_ITEMS = [
  { type: "word", text: "Happy" },
  { type: "word", text: "Birthday" },
  { type: "word", text: "to" },
  { type: "word", text: "Oyindamola" },
  { type: "emoji", text: "❤️" },
  { type: "kitty" },
];

// ── Matrix Rain ──────────────────────────────────────
function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let id;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコ0123456789♥★✦✿♪";
    const fs = 14;
    let drops = Array(Math.floor(canvas.width / fs)).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cols = Math.floor(canvas.width / fs);
      while (drops.length < cols) drops.push(1);
      for (let i = 0; i < cols; i++) {
        ctx.fillStyle = `hsl(${318 + Math.random() * 44},100%,${58 + Math.random() * 22}%)`;
        ctx.font = `${fs}px monospace`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ── Countdown ───────────────────────────────────────
function Countdown({ onDone }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n === 0) { setTimeout(onDone, 400); return; }
    const t = setTimeout(() => setN(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <AnimatePresence mode="wait">
      <motion.span key={n}
        className="text-9xl font-black select-none"
        style={{ color: "#ff69b4", textShadow: "0 0 40px #ff69b4, 0 0 80px #ff1493" }}
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.3, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {n === 0 ? "✦" : n}
      </motion.span>
    </AnimatePresence>
  );
}

// ── Glitter word ─────────────────────────────────────
function GlitterWord({ children, fontSize = "5rem" }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
        @keyframes glitter {
          0%,100%{background-position:0% 50%;filter:brightness(1) drop-shadow(0 0 8px #ff69b4);}
          50%{background-position:100% 50%;filter:brightness(2.2) drop-shadow(0 0 28px #fff);}
        }
        .g-word {
          font-family:'Pinyon Script',cursive;
          background:linear-gradient(90deg,#ff69b4,#ff1493,#fff,#ffb6c1,#ff69b4,#ff1493,#fff);
          background-size:400% 400%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:glitter 2s ease infinite;
          display:inline-block;
          line-height:1.1;
        }
      `}</style>
      <span className="g-word" style={{ fontSize }}>{children}</span>
    </>
  );
}


// ── Kitty SVG ────────────────────────────────────────
function KittySVG() {
  return (
    <svg width="110" height="120" viewBox="0 0 120 130">
      <ellipse cx="60" cy="95" rx="30" ry="28" fill="#ffb3c6"/>
      <circle cx="60" cy="58" r="28" fill="#ffb3c6"/>
      <polygon points="35,38 28,16 48,32" fill="#ffb3c6"/>
      <polygon points="85,38 92,16 72,32" fill="#ffb3c6"/>
      <polygon points="37,36 32,20 46,33" fill="#ff9eb5"/>
      <polygon points="83,36 88,20 74,33" fill="#ff9eb5"/>
      <path d="M47 56 Q52 51 57 56" stroke="#3d2b1f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M63 56 Q68 51 73 56" stroke="#3d2b1f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="60" cy="63" rx="4" ry="3" fill="#ff6b9d"/>
      <path d="M55 67 Q60 73 65 67" stroke="#3d2b1f" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="30" y1="62" x2="50" y2="64" stroke="#3d2b1f" strokeWidth="1.2" opacity="0.5"/>
      <line x1="30" y1="67" x2="50" y2="67" stroke="#3d2b1f" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="64" x2="90" y2="62" stroke="#3d2b1f" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="67" x2="90" y2="67" stroke="#3d2b1f" strokeWidth="1.2" opacity="0.5"/>
      <circle cx="46" cy="67" r="7" fill="#ff9eb5" opacity="0.4"/>
      <circle cx="74" cy="67" r="7" fill="#ff9eb5" opacity="0.4"/>
      <path d="M88 108 Q112 88 102 73" stroke="#ffb3c6" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <ellipse cx="44" cy="120" rx="10" ry="7" fill="#ffc2d4"/>
      <ellipse cx="76" cy="120" rx="10" ry="7" fill="#ffc2d4"/>
      <polygon points="60,10 42,42 78,42" fill="#ff69b4"/>
      <defs>
        <pattern id="hs" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <rect width="4" height="8" fill="#ff1493" opacity="0.4"/>
        </pattern>
      </defs>
      <polygon points="60,10 42,42 78,42" fill="url(#hs)"/>
      <circle cx="60" cy="10" r="4" fill="#fff" opacity="0.9"/>
      <ellipse cx="60" cy="42" rx="18" ry="4" fill="#ff1493" opacity="0.45"/>
    </svg>
  );
}

// ── Sequential Reveal ────────────────────────────────
// Each item is visible for SHOW_MS, then fades out over EXIT_MS before next appears
const SHOW_MS = 1100;   // how long item stays fully visible
const EXIT_MS = 320;    // fade-out duration
const KITTY_SHOW_MS = 2400;

function SequentialReveal({ onDone }) {
  const [step, setStep] = useState(-1);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStep(0), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step < 0) return;
    if (step >= REVEAL_ITEMS.length) {
      setTimeout(onDone, 1800);
      return;
    }
    const isLast = step === REVEAL_ITEMS.length - 1;
    const stayMs = isLast ? KITTY_SHOW_MS : SHOW_MS;

    const stayTimer = setTimeout(() => {
      if (isLast) { setStep(s => s + 1); return; }
      setExiting(true);
      setTimeout(() => {
        setExiting(false);
        setStep(s => s + 1);
      }, EXIT_MS);
    }, stayMs);

    return () => clearTimeout(stayTimer);
  }, [step]);

  const item = step >= 0 && step < REVEAL_ITEMS.length ? REVEAL_ITEMS[step] : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[280px] w-full px-6">
      <AnimatePresence mode="wait">
        {item && (
          <motion.div
            key={step}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 32, scale: 0.85 }}
            animate={exiting
              ? { opacity: 0, y: -24, scale: 0.9, transition: { duration: EXIT_MS / 1000, ease: "easeIn" } }
              : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }
            }
            exit={{ opacity: 0, transition: { duration: 0.01 } }}
          >
            {item.type === "word" && (
              <GlitterWord fontSize={
                item.text === "Birthday" || item.text === "Oyindamola" ? "7rem"
                : item.text === "to" ? "5.5rem"
                : "6rem"
              }>
                {item.text}
              </GlitterWord>
            )}
            {item.type === "emoji" && (
              <motion.span
                className="text-8xl"
                animate={{ scale: [1, 1.22, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 20px #ff69b4)" }}
              >
                {item.text}
              </motion.span>
            )}
            {item.type === "kitty" && (
              <div className="flex flex-col items-center gap-1">
                <motion.p
                  className="text-pink-300 text-base tracking-widest"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                >
                  ✦ happy birthday ✦
                </motion.p>
                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                >
                  <KittySVG />
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 mt-8">
        {REVEAL_ITEMS.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i <= step ? "#ff69b4" : "rgba(255,255,255,0.15)" }} />
        ))}
      </div>
    </div>
  );
}

function useTypewriter(text, speed = 38) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

// ── 3D Flipbook Scene (📕 → open spread → flip → 📕) ──
function BookScene({ onDone }) {
  const [bookOpen, setBookOpen] = useState(false);
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [flipPhase, setFlipPhase] = useState("idle");
  const [spreadKey, setSpreadKey] = useState(0);
  const total = BOOK_SPREADS.length;

  const spread   = BOOK_SPREADS[spreadIdx];
  const leftSrc  = spread?.left;
  const rightSrc = spread?.right;
  const isLast   = spreadIdx >= total - 1;

  const captionText = bookOpen ? (spread?.caption ?? "") : "A little something for you 🎀";
  const caption = useTypewriter(captionText, 36);

  const handleTap = () => {
    if (!bookOpen) { setBookOpen(true); return; }
    if (flipPhase !== "idle") return;
    if (isLast) { onDone(); return; }
    setFlipPhase("out");
  };

  const handleAnimComplete = () => {
    if (flipPhase === "out") {
      setSpreadIdx(s => s + 1);
      setSpreadKey(k => k + 1);
      setFlipPhase("in");
    } else if (flipPhase === "in") {
      setFlipPhase("idle");
    }
  };

  const S = { // shared inline-style helpers
    page: { flex:1, overflow:"hidden", position:"relative" },
    inShadowR: { position:"absolute",right:0,top:0,bottom:0,width:20,background:"linear-gradient(to left,rgba(0,0,0,0.22),transparent)",pointerEvents:"none" },
    inShadowL: { position:"absolute",left:0,top:0,bottom:0,width:20,background:"linear-gradient(to right,rgba(0,0,0,0.22),transparent)",pointerEvents:"none" },
    pageNum: { position:"absolute",bottom:8,left:0,right:0,textAlign:"center",color:"rgba(255,255,255,0.45)",fontSize:10,fontFamily:"monospace" },
  };

  return (
    <div className="flex flex-col items-center w-full px-4 gap-4 select-none">

      {/* Glassmorphism caption */}
      <div style={{ background:"rgba(255,255,255,0.08)",backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",border:"1px solid rgba(255,182,193,0.35)",borderRadius:20,padding:"12px 20px",width:"100%",maxWidth:340,minHeight:58,boxShadow:"0 4px 32px rgba(255,20,147,0.12)",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <p style={{ fontFamily:"Georgia,serif",fontSize:14,color:"#ffd6e8",textAlign:"center",letterSpacing:"0.03em",lineHeight:1.6,minHeight:22 }}>
          {caption}<span style={{ opacity:0.55,animation:"blink 1s step-end infinite" }}>|</span>
        </p>
      </div>

      {/* Book container */}
      <div onClick={handleTap} style={{ cursor:"pointer",perspective:"1600px",width: bookOpen ? Math.min(window.innerWidth*0.94, 560) : 240,height:500,transition:"width 0.55s cubic-bezier(0.22,1,0.36,1)",position:"relative" }}>

        {!bookOpen ? (
          /* ── CLOSED 📕 ── */
          <div style={{ display:"flex",width:"100%",height:"100%",borderRadius:6,overflow:"hidden",boxShadow:"6px 8px 40px rgba(0,0,0,0.7)" }}>
            <div style={{ width:24,flexShrink:0,background:"linear-gradient(to right,#6b1832,#b8384e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6 }}>
              {[0,1,2,3,4].map(i=><div key={i} style={{width:2,height:16,background:"rgba(255,255,255,0.15)",borderRadius:1}}/>)}
            </div>
            <div style={{ flex:1,position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#2a0018 0%,#5c1030 45%,#3d0020 100%)" }}>
              {/* Subtle pattern overlay */}
              <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 30% 30%,rgba(255,105,180,0.15) 0%,transparent 60%),radial-gradient(circle at 70% 70%,rgba(255,20,147,0.12) 0%,transparent 60%)"}}/>
              {/* Corner flourishes */}
              <div style={{position:"absolute",top:12,left:12,color:"rgba(255,182,193,0.35)",fontSize:22,lineHeight:1}}>✿</div>
              <div style={{position:"absolute",top:12,right:12,color:"rgba(255,182,193,0.35)",fontSize:22,lineHeight:1}}>✿</div>
              <div style={{position:"absolute",bottom:12,left:12,color:"rgba(255,182,193,0.35)",fontSize:22,lineHeight:1}}>✿</div>
              <div style={{position:"absolute",bottom:12,right:12,color:"rgba(255,182,193,0.35)",fontSize:22,lineHeight:1}}>✿</div>
              {/* Center content */}
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
                <div style={{fontSize:46,filter:"drop-shadow(0 0 18px rgba(255,105,180,0.8))",animation:"heartbeat 1.6s ease-in-out infinite"}}>❤️</div>
                <p style={{fontFamily:"Georgia,serif",color:"#ffd6e8",fontSize:18,letterSpacing:"0.12em",textAlign:"center",textShadow:"0 0 14px rgba(255,105,180,0.6)"}}>For Oyindamola</p>
                <div style={{width:40,height:1,background:"rgba(255,182,193,0.4)",margin:"2px 0"}}/>
                <p style={{fontFamily:"Georgia,serif",color:"rgba(255,182,193,0.55)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase"}}>with love</p>
              </div>
              {/* Tap hint */}
              <div style={{position:"absolute",bottom:16,left:0,right:0,textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase"}}>tap to open</div>
            </div>
          </div>
        ) : (
          /* ── OPEN 📖 ── */
          <motion.div initial={{opacity:0,scaleX:0.5}} animate={{opacity:1,scaleX:1}} transition={{duration:0.45}} style={{display:"flex",width:"100%",height:"100%",boxShadow:"0 28px 65px rgba(0,0,0,0.65)",borderRadius:4}}>

            {/* LEFT page — animates in together with right */}
            <motion.div
              key={`L-${spreadKey}`}
              style={{...S.page,borderRadius:"4px 0 0 4px",background:"#fff9f0",transformOrigin:"100% 50%",transformStyle:"preserve-3d"}}
              initial={{ rotateY: flipPhase==="in" ? -90 : 0 }}
              animate={{ rotateY: 0 }}
              transition={{ duration:0.3, ease:"easeOut" }}
            >
              <img src={leftSrc} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="left"/>
              <div style={S.inShadowR}/>
              <div style={S.pageNum}>{spreadIdx * 2 + 1}</div>
            </motion.div>

            {/* Spine */}
            <div style={{width:10,flexShrink:0,background:"linear-gradient(to right,#7a2035,#b8384e,#7a2035)"}}/>

            {/* RIGHT page — flips out on each turn */}
            <motion.div
              key={`R-${spreadKey}`}
              style={{...S.page,borderRadius:"0 4px 4px 0",transformOrigin:"0% 50%",transformStyle:"preserve-3d"}}
              initial={{ rotateY: flipPhase==="in" ? 90 : 0 }}
              animate={{ rotateY: flipPhase==="out" ? -90 : 0 }}
              transition={{ duration:0.3, ease: flipPhase==="out"?"easeIn":"easeOut" }}
              onAnimationComplete={handleAnimComplete}
            >
              <img src={rightSrc} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} alt="right"/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 55%,rgba(0,0,0,0.18) 100%)",pointerEvents:"none"}}/>
              <div style={S.inShadowL}/>
              <div style={S.pageNum}>{spreadIdx * 2 + 2} / {total * 2}</div>
            </motion.div>

          </motion.div>
        )}
      </div>

      <motion.p key={isLast?"fin":bookOpen?"flip":"open"} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
        style={{color:"rgba(255,182,193,0.5)",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase"}}>
        {!bookOpen?"tap to open ›":isLast?"tap for the finale ✦":"tap to flip ›"}
      </motion.p>

      <style>{`@keyframes blink{0%,100%{opacity:0.55}50%{opacity:0}} @keyframes heartbeat{0%,100%{transform:scale(1)} 14%{transform:scale(1.18)} 28%{transform:scale(1)} 42%{transform:scale(1.12)} 70%{transform:scale(1)}}`}</style>
    </div>
  );
}





// ── Heart Collage (photos + emoji hearts) ────────────
function HeartCollage() {
  const vw = Math.min(typeof window !== "undefined" ? window.innerWidth : 400, 480);
  const size = 96;
  const area = Math.min(vw * 1.15, 520);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <motion.p
        className="text-pink-300 text-lg tracking-widest"
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      >
        ✦ made with love ✦
      </motion.p>

      <div className="relative" style={{ width: area, height: area * 1.05 }}>
        {/* Ghost heart emoji */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 0.07 }} transition={{ delay: 2 }}
        >
          <span style={{ fontSize: area * 0.88, lineHeight: 1 }}>💗</span>
        </motion.div>

        {COLLAGE_ITEMS.map((item, i) => {
          const pos = HEART_POS[i];
          const startX = (Math.random() - 0.5) * vw * 2.2;
          const startY = (Math.random() - 0.5) * vw * 2.2;
          const startRot = (Math.random() - 0.5) * 540;
          const isEmoji = item.type === "emoji";
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: size, height: size,
                borderRadius: isEmoji ? "50%" : 10,
                overflow: "hidden",
                border: isEmoji ? "none" : "2.5px solid rgba(255,255,255,0.35)",
                boxShadow: isEmoji ? "none" : "0 0 16px rgba(255,105,180,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isEmoji ? "transparent" : undefined,
              }}
              initial={{ x: startX, y: startY, opacity: 0, scale: 0.1, rotate: startRot }}
              animate={{ x: pos.x * area - size / 2, y: pos.y * area - size / 2, opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 55, damping: 12, delay: i * 0.09 }}
            >
              {isEmoji ? (
                <span style={{ fontSize: size * 0.62, lineHeight: 1, filter: "drop-shadow(0 0 10px rgba(255,105,180,0.9))" }}>
                  {item.char}
                </span>
              ) : (
                <img src={item.src} alt={`memory ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              )}
            </motion.div>
          );
        })}

      </div>

      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }}
      >
        <p className="text-pink-300">Happy Birthday, Oyin 🎂</p>
        <p className="text-pink-400/60 text-xs tracking-widest mt-1">may this year be your most beautiful yet</p>
      </motion.div>
    </div>
  );
}

export default function AnitaBirthday() {
  const [phase, setPhase] = useState("countdown");

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{background:"#080008"}}>
      <style>{`* {-webkit-tap-highlight-color:transparent;} body{overscroll-behavior:none;}`}</style>

      {(phase==="countdown"||phase==="reveal") && <MatrixRain />}

      <div className="pointer-events-none absolute inset-0 z-10"
        style={{background:"radial-gradient(ellipse at center,transparent 35%,rgba(8,0,8,0.9) 100%)"}}/>

      {[...Array(14)].map((_,i)=>(
        <motion.span key={i}
          className="pointer-events-none fixed select-none z-0 text-lg"
          style={{left:`${(i*7.3)%100}%`,top:"-8%"}}
          animate={{y:"110vh",rotate:[0,360],opacity:[0.55,0.2,0.55]}}
          transition={{duration:7+(i%5)*1.6,repeat:Infinity,delay:i*0.55,ease:"linear"}}
        >
          {["🌸","✿","💮","🌺","✦","🎀"][i%6]}
        </motion.span>
      ))}

      <AnimatePresence mode="wait">

        {phase==="countdown" && (
          <motion.div key="cd" className="relative z-20"
            exit={{opacity:0,scale:1.8}} transition={{duration:0.3}}>
            <Countdown onDone={()=>setPhase("reveal")} />
          </motion.div>
        )}

        {phase==="reveal" && (
          <motion.div key="rev" className="relative z-20 w-full flex items-center justify-center"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,y:-30}} transition={{duration:0.35}}>
            <SequentialReveal onDone={()=>setPhase("book")} />
          </motion.div>
        )}

        {phase==="book" && (
          <motion.div key="book" className="relative z-20 w-full flex flex-col items-center justify-center py-8"
            initial={{opacity:0,y:50,scale:0.9}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,scale:0.85}}
            transition={{type:"spring",stiffness:200,damping:22}}>
            <BookScene onDone={()=>setPhase("collage")} />
          </motion.div>
        )}

        {phase==="collage" && (
          <motion.div key="col" className="relative z-20 w-full flex flex-col items-center py-6 px-2"
            initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6}}>
            <div className="pointer-events-none fixed inset-0"
              style={{background:"radial-gradient(ellipse at 50% 40%,#2a0030 0%,#080008 70%)"}}/>
            <div className="relative z-10 w-full flex flex-col items-center">
              <HeartCollage />
              <motion.button onClick={()=>setPhase("countdown")}
                className="mt-6 text-pink-500/60 text-xs tracking-widest underline underline-offset-4"
                initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.8}}>
                replay ↺
              </motion.button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}