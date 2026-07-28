import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── ESTILOS GLOBALES (inyectados una sola vez) ───────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@200;300;400;600;700;800&display=swap');

:root {
  --black: #020408;
  --dark: #050d18;
  --dark2: #071220;
  --cyan: #00d4ff;
  --cyan-dim: rgba(0,212,255,0.15);
  --cyan-glow: rgba(0,212,255,0.4);
  --emerald: #00e887;
  --emerald-dim: rgba(0,232,135,0.12);
  --emerald-glow: rgba(0,232,135,0.35);
  --text: #c8ddf0;
  --text-dim: #5a7a9a;
  --text-muted: #2a4a6a;
  --border: rgba(0,212,255,0.12);
  --border-bright: rgba(0,212,255,0.35);
  --mono: 'Share Tech Mono', monospace;
  --head: 'Exo 2', sans-serif;
  --body: 'Rajdhani', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background: var(--black);
  color: var(--text);
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--black); }
::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

/* ── CANVAS ── */
#matrix-canvas {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0; pointer-events: none; opacity: 0.18;
}

/* ── NAV ── */
.sal-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 18px 40px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(2,4,8,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.sal-nav-logo {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--head); font-size: 1.25rem; font-weight: 700;
  color: #fff; text-decoration: none; letter-spacing: 0.05em;
}
.sal-logo-icon {
  width: 34px; height: 34px;
  background: linear-gradient(135deg, var(--cyan), var(--emerald));
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex; align-items: center; justify-content: center; font-size: 14px;
  animation: hexPulse 3s ease-in-out infinite;
}
@keyframes hexPulse {
  0%,100% { box-shadow: 0 0 10px var(--cyan-glow); }
  50% { box-shadow: 0 0 25px var(--emerald-glow); }
}
.sal-nav-badge {
  background: var(--cyan-dim); border: 1px solid var(--border-bright);
  color: var(--cyan); font-family: var(--mono); font-size: 0.65rem;
  padding: 2px 8px; border-radius: 3px; letter-spacing: 0.1em;
}
.sal-nav-links {
  display: flex; gap: 32px; list-style: none;
}
.sal-nav-links a {
  color: var(--text-dim); text-decoration: none;
  font-family: var(--body); font-size: 0.9rem; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  transition: color 0.3s; position: relative;
}
.sal-nav-links a::after {
  content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
  height: 1px; background: var(--cyan);
  transform: scaleX(0); transition: transform 0.3s;
}
.sal-nav-links a:hover { color: var(--cyan); }
.sal-nav-links a:hover::after { transform: scaleX(1); }
.sal-nav-cta {
  background: transparent; border: 1px solid var(--cyan); color: var(--cyan);
  padding: 8px 20px; font-family: var(--mono); font-size: 0.8rem;
  cursor: pointer; letter-spacing: 0.1em; transition: all 0.3s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}
.sal-nav-cta:hover {
  background: var(--cyan); color: var(--black);
  box-shadow: 0 0 20px var(--cyan-glow);
}
.sal-hamburger {
  display: none; flex-direction: column; gap: 5px;
  cursor: pointer; background: none; border: none;
}
.sal-hamburger span { width: 24px; height: 2px; background: var(--cyan); transition: all 0.3s; }

/* ── HERO ── */
.sal-hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center;
  padding: 120px 40px 80px; overflow: hidden;
}
.sal-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}
.sal-hero-content {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: center; width: 100%;
}
.sal-hero-label {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 0.72rem; color: var(--emerald);
  letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 20px;
}
.sal-hero-label::before { content: ''; width: 30px; height: 1px; background: var(--emerald); }
.sal-label-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--emerald);
  animation: blink 1.5s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }

.sal-h1 {
  font-family: var(--head); font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 800; line-height: 0.95; letter-spacing: -0.02em; margin-bottom: 24px;
}
.sal-h1-secure { color: #fff; }
.sal-h1-auth {
  background: linear-gradient(135deg, var(--cyan) 0%, var(--emerald) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; display: block;
  filter: drop-shadow(0 0 20px rgba(0,212,255,0.3));
}
.sal-h1-lab {
  color: #fff; font-weight: 200; letter-spacing: 0.15em;
  font-size: 0.55em; display: block; margin-top: 4px;
}
.sal-hero-subtitle {
  font-size: 1.15rem; color: var(--cyan); font-weight: 500;
  margin-bottom: 16px; font-family: var(--body); letter-spacing: 0.02em;
}
.sal-hero-desc {
  font-size: 1rem; color: var(--text-dim);
  line-height: 1.75; margin-bottom: 40px; max-width: 500px;
}
.sal-hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }

.sal-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, var(--cyan), #0099bb);
  color: var(--black); padding: 14px 32px;
  font-family: var(--head); font-size: 0.95rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  border: none; cursor: pointer; text-decoration: none;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
  transition: all 0.3s; position: relative; overflow: hidden;
}
.sal-btn-primary::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--emerald), #00aa55);
  opacity: 0; transition: opacity 0.3s;
}
.sal-btn-primary:hover { box-shadow: 0 0 30px var(--cyan-glow); transform: translateY(-2px); }
.sal-btn-primary:hover::before { opacity: 1; }
.sal-btn-primary span { position: relative; z-index: 1; }

.sal-btn-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: var(--text); padding: 13px 28px;
  font-family: var(--head); font-size: 0.95rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  border: 1px solid var(--border-bright); cursor: pointer; text-decoration: none;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
  transition: all 0.3s;
}
.sal-btn-secondary:hover {
  border-color: var(--emerald); color: var(--emerald);
  box-shadow: 0 0 20px var(--emerald-dim); transform: translateY(-2px);
}
.sal-hero-stats {
  display: flex; gap: 32px; margin-top: 48px;
  padding-top: 32px; border-top: 1px solid var(--border);
}
.sal-stat-value {
  font-family: var(--mono); font-size: 1.6rem;
  color: var(--cyan); display: block; line-height: 1;
}
.sal-stat-label {
  font-size: 0.75rem; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: 0.1em;
  margin-top: 4px; display: block;
}

/* ── SHIELD VISUAL ── */
.sal-hero-visual {
  position: relative; display: flex;
  align-items: center; justify-content: center; height: 500px;
}
.sal-shield-container { position: relative; animation: float 5s ease-in-out infinite; }
@keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
.sal-shield-glow {
  position: absolute; inset: -60px;
  background: radial-gradient(ellipse, rgba(0,212,255,0.12) 0%, transparent 70%);
  animation: glowPulse 3s ease-in-out infinite;
}
@keyframes glowPulse { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
.sal-orbit {
  position: absolute; border-radius: 50%; border: 1px solid;
  animation: spinOrbit linear infinite;
}
.sal-orbit-1 {
  width: 340px; height: 340px; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  border-color: rgba(0,212,255,0.15); animation-duration: 12s;
}
.sal-orbit-2 {
  width: 260px; height: 260px; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  border-color: rgba(0,232,135,0.12); animation-duration: 8s;
  animation-direction: reverse;
}
.sal-orbit-dot {
  position: absolute; width: 8px; height: 8px;
  border-radius: 50%; top: -4px; left: 50%; margin-left: -4px;
}
.sal-orbit-1 .sal-orbit-dot { background: var(--cyan); box-shadow: 0 0 10px var(--cyan); }
.sal-orbit-2 .sal-orbit-dot { background: var(--emerald); box-shadow: 0 0 10px var(--emerald); }
@keyframes spinOrbit {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to { transform: translate(-50%,-50%) rotate(360deg); }
}
.sal-badge {
  position: absolute; background: rgba(5,13,24,0.9);
  border: 1px solid var(--border-bright); border-radius: 6px;
  padding: 10px 14px; font-family: var(--mono); font-size: 0.72rem;
  color: var(--cyan); backdrop-filter: blur(10px);
}
.sal-badge-jwt { top: 60px; right: 20px; animation: badgeFloat1 4s ease-in-out infinite; }
.sal-badge-bcrypt {
  bottom: 80px; left: 10px;
  animation: badgeFloat1 5s ease-in-out 1s infinite;
  color: var(--emerald); border-color: rgba(0,232,135,0.3);
}
.sal-badge-ssl { top: 50%; right: -10px; animation: badgeFloat2 6s ease-in-out 0.5s infinite; }
@keyframes badgeFloat1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes badgeFloat2 { 0%,100% { transform: translateY(-50%); } 50% { transform: translateY(calc(-50% - 8px)); } }

/* ── SECTIONS ── */
.sal-section { position: relative; z-index: 1; padding: 100px 40px; }
.sal-section-inner { max-width: 1200px; margin: 0 auto; }
.sal-features { background: linear-gradient(180deg, var(--black) 0%, var(--dark) 100%); }
.sal-tech { background: var(--dark); }
.sal-howto { background: linear-gradient(180deg, var(--dark) 0%, var(--black) 100%); }
.sal-objective { background: var(--black); }

.sal-section-tag {
  font-family: var(--mono); font-size: 0.7rem; color: var(--emerald);
  text-transform: uppercase; letter-spacing: 0.25em; margin-bottom: 12px;
  display: flex; align-items: center; gap: 10px;
}
.sal-section-tag::before, .sal-section-tag::after {
  content: ''; flex: 1; max-width: 50px; height: 1px; background: var(--emerald); opacity: 0.5;
}
.sal-section-tag::before { max-width: 20px; }
.sal-section-title {
  font-family: var(--head); font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 700; color: #fff; margin-bottom: 16px; letter-spacing: -0.02em;
}
.sal-section-sub {
  color: var(--text-dim); font-size: 1.05rem;
  max-width: 560px; line-height: 1.7; margin-bottom: 64px;
}

/* ── FEATURES GRID ── */
.sal-features-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;
}
.sal-feature-card {
  background: rgba(7,18,32,0.8); border: 1px solid var(--border);
  border-radius: 2px; padding: 32px; position: relative; overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: default;
}
.sal-feature-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  transform: scaleX(0); transition: transform 0.4s;
}
.sal-feature-card::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at top left, var(--cyan-dim), transparent 60%);
  opacity: 0; transition: opacity 0.4s;
}
.sal-feature-card:nth-child(even)::after {
  background: radial-gradient(ellipse at top left, var(--emerald-dim), transparent 60%);
}
.sal-feature-card:nth-child(even)::before {
  background: linear-gradient(90deg, transparent, var(--emerald), transparent);
}
.sal-feature-card:hover { border-color: var(--border-bright); transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
.sal-feature-card:hover::before { transform: scaleX(1); }
.sal-feature-card:hover::after { opacity: 1; }
.sal-feature-icon {
  width: 48px; height: 48px; border: 1px solid var(--border-bright);
  display: flex; align-items: center; justify-content: center; font-size: 1.4rem;
  margin-bottom: 20px; position: relative; z-index: 1;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  background: var(--cyan-dim);
}
.sal-feature-card:nth-child(even) .sal-feature-icon {
  background: var(--emerald-dim); border-color: rgba(0,232,135,0.3);
}
.sal-feature-name {
  font-family: var(--head); font-size: 1.15rem; font-weight: 700;
  color: #fff; margin-bottom: 10px; letter-spacing: 0.02em; position: relative; z-index: 1;
}
.sal-feature-desc { color: var(--text-dim); font-size: 0.95rem; line-height: 1.6; position: relative; z-index: 1; }
.sal-feature-number {
  position: absolute; top: 20px; right: 24px;
  font-family: var(--mono); font-size: 0.65rem; color: var(--text-muted); letter-spacing: 0.1em;
}

/* ── TECH GRID ── */
.sal-tech-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px;
}
.sal-tech-card {
  background: rgba(5,13,24,0.9); border: 1px solid var(--border);
  border-radius: 2px; padding: 28px 20px; text-align: center;
  transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
}
.sal-tech-card::before {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: var(--tech-color, var(--cyan)); transform: scaleX(0); transition: transform 0.3s;
}
.sal-tech-card:hover { border-color: rgba(255,255,255,0.1); transform: translateY(-4px); box-shadow: 0 10px 40px rgba(0,0,0,0.4); }
.sal-tech-card:hover::before { transform: scaleX(1); }
.sal-tech-emoji { font-size: 2rem; margin-bottom: 10px; display: block; }
.sal-tech-name { font-family: var(--mono); font-size: 0.78rem; color: var(--text); letter-spacing: 0.08em; text-transform: uppercase; }
.sal-tech-version { font-family: var(--mono); font-size: 0.62rem; color: var(--text-muted); margin-top: 4px; display: block; }

/* ── TIMELINE ── */
.sal-timeline { position: relative; max-width: 700px; margin: 0 auto; }
.sal-timeline::before {
  content: ''; position: absolute; left: 40px; top: 0; bottom: 0; width: 1px;
  background: linear-gradient(180deg, transparent, var(--cyan) 20%, var(--emerald) 80%, transparent);
}
.sal-tl-item { display: flex; gap: 32px; padding: 32px 0; position: relative; }
.sal-tl-num { width: 80px; flex-shrink: 0; display: flex; align-items: flex-start; justify-content: flex-end; }
.sal-tl-circle {
  width: 42px; height: 42px; border: 2px solid var(--cyan);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 0.8rem; color: var(--cyan);
  background: var(--black); position: relative; z-index: 1; transition: all 0.3s; flex-shrink: 0;
}
.sal-tl-item:nth-child(odd) .sal-tl-circle { border-color: var(--emerald); color: var(--emerald); }
.sal-tl-item:hover .sal-tl-circle { background: var(--cyan); color: var(--black); box-shadow: 0 0 20px var(--cyan-glow); }
.sal-tl-item:nth-child(odd):hover .sal-tl-circle { background: var(--emerald); color: var(--black); box-shadow: 0 0 20px var(--emerald-glow); }
.sal-tl-content {
  flex: 1; background: rgba(7,18,32,0.6);
  border: 1px solid var(--border); border-radius: 2px; padding: 24px 28px; transition: all 0.3s;
}
.sal-tl-item:hover .sal-tl-content { border-color: var(--border-bright); box-shadow: 0 4px 30px rgba(0,212,255,0.05); }
.sal-tl-title { font-family: var(--head); font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 8px; }
.sal-tl-desc { color: var(--text-dim); font-size: 0.92rem; line-height: 1.6; }
.sal-tl-code {
  font-family: var(--mono); font-size: 0.72rem; color: var(--cyan);
  background: var(--cyan-dim); border: 1px solid rgba(0,212,255,0.2);
  padding: 2px 8px; border-radius: 3px; display: inline-block; margin-top: 10px;
}

/* ── OBJECTIVE ── */
.sal-obj-card {
  background: rgba(7,18,32,0.7); border: 1px solid var(--border);
  border-radius: 4px; padding: 60px; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 2fr; gap: 60px; align-items: center;
}
.sal-obj-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--cyan), var(--emerald), var(--cyan));
  background-size: 200% 100%; animation: shimmer 3s linear infinite;
}
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
.sal-obj-left {
  text-align: center; border-right: 1px solid var(--border); padding-right: 60px;
}
.sal-big-icon {
  font-size: 5rem; display: block; margin-bottom: 16px;
  filter: drop-shadow(0 0 20px rgba(0,212,255,0.4)); animation: float 4s ease-in-out infinite;
}
.sal-obj-label { font-family: var(--mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em; }
.sal-obj-text { font-size: 1.1rem; color: var(--text); line-height: 1.8; font-weight: 400; }
.sal-obj-text strong { color: var(--cyan); font-weight: 600; }
.sal-tag-pill {
  font-family: var(--mono); font-size: 0.75rem; padding: 6px 12px; border-radius: 3px; display: inline-block;
}

/* ── FOOTER ── */
.sal-footer {
  background: var(--dark2); border-top: 1px solid var(--border);
  padding: 60px 40px 40px; position: relative; z-index: 1;
}
.sal-footer-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; margin-bottom: 48px;
}
.sal-footer-logo {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--head); font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 16px;
}
.sal-footer-tagline { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; max-width: 300px; }
.sal-footer-social { display: flex; gap: 12px; margin-top: 24px; }
.sal-social-btn {
  width: 38px; height: 38px; border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-dim); text-decoration: none; font-size: 1rem;
  transition: all 0.3s;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
}
.sal-social-btn:hover { border-color: var(--cyan); color: var(--cyan); background: var(--cyan-dim); box-shadow: 0 0 15px var(--cyan-glow); }
.sal-footer-col h4 {
  font-family: var(--head); font-size: 0.9rem; font-weight: 700;
  color: #fff; letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
}
.sal-footer-links { list-style: none; }
.sal-footer-links li { margin-bottom: 10px; }
.sal-footer-links a {
  color: var(--text-dim); text-decoration: none; font-size: 0.9rem;
  transition: color 0.3s; display: flex; align-items: center; gap: 8px;
}
.sal-footer-links a::before { content: '▸'; color: var(--cyan); font-size: 0.6rem; opacity: 0; transition: opacity 0.3s; }
.sal-footer-links a:hover { color: var(--cyan); }
.sal-footer-links a:hover::before { opacity: 1; }
.sal-footer-bottom {
  max-width: 1200px; margin: 0 auto; padding-top: 24px;
  border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;
}
.sal-footer-copy { font-family: var(--mono); font-size: 0.72rem; color: var(--text-muted); letter-spacing: 0.1em; }
.sal-footer-status { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 0.7rem; color: var(--emerald); }
.sal-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--emerald); animation: blink 2s step-end infinite; }

/* ── SCROLL REVEAL ── */
.sal-reveal { opacity: 0; transform: translateY(30px); transition: all 0.7s cubic-bezier(0.16,1,0.3,1); }
.sal-reveal.visible { opacity: 1; transform: translateY(0); }
.sal-delay-1 { transition-delay: 0.1s; }
.sal-delay-2 { transition-delay: 0.2s; }
.sal-delay-3 { transition-delay: 0.3s; }
.sal-delay-4 { transition-delay: 0.4s; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .sal-nav { padding: 16px 24px; }
  .sal-nav-links, .sal-nav-cta { display: none; }
  .sal-hamburger { display: flex; }
  .sal-hero { padding: 100px 24px 60px; }
  .sal-hero-content { grid-template-columns: 1fr; gap: 40px; text-align: center; }
  .sal-hero-desc { margin: 0 auto 40px; }
  .sal-hero-buttons { justify-content: center; }
  .sal-hero-visual { height: 300px; }
  .sal-orbit-1 { width: 240px; height: 240px; }
  .sal-orbit-2 { width: 180px; height: 180px; }
  .sal-hero-stats { justify-content: center; }
  .sal-badge-ssl { display: none; }
  .sal-section { padding: 70px 24px; }
  .sal-obj-card { grid-template-columns: 1fr; padding: 40px 30px; gap: 32px; }
  .sal-obj-left { border-right: none; border-bottom: 1px solid var(--border); padding-right: 0; padding-bottom: 32px; }
  .sal-footer-inner { grid-template-columns: 1fr; gap: 40px; }
  .sal-footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
}
@media (max-width: 600px) {
  .sal-features-grid { grid-template-columns: 1fr; }
  .sal-tech-grid { grid-template-columns: repeat(2, 1fr); }
  .sal-h1 { font-size: 2.8rem; }
}
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const FEATURES = [
  { num: "01", icon: "", name: "Autenticación JWT", desc: "Implementación de tokens seguros para validar usuarios a través de JSON Web Tokens firmados y verificados en cada petición." },
  { num: "02", icon: "", name: "Protección de rutas", desc: "Acceso restringido mediante middleware y validaciones que aseguran que solo usuarios autenticados accedan a recursos protegidos." },
  { num: "03", icon: "", name: "Contraseñas cifradas", desc: "Protección de credenciales usando bcrypt con salt rounds configurables para hashing robusto y seguro de contraseñas." },
  { num: "04", icon: "", name: "Roles y permisos", desc: "Administración de accesos entre usuarios y administradores con un sistema de control granular de permisos." },
  { num: "05", icon: "", name: "Base de datos segura", desc: "Integración con MySQL para gestión de usuarios con consultas parametrizadas que previenen inyecciones SQL." },
  { num: "06", icon: "", name: "Backend robusto", desc: "Desarrollado con Express.js y arquitectura organizada en capas, siguiendo principios de clean code y separación de responsabilidades." },
];

const TECHS = [
  { emoji: "", name: "React",      version: "v18.x",          color: "#61DAFB" },
  { emoji: "", name: "Node.js",    version: "v20 LTS",         color: "#8CC84B" },
  { emoji: "", name: "Express",    version: "v4.x",            color: "#999" },
  { emoji: "", name: "MySQL",      version: "v8.x",            color: "#4479A1" },
  { emoji: "", name: "JWT",        version: "RFC 7519",        color: "#d4aa00" },
  { emoji: "", name: "JavaScript", version: "ES2024",          color: "#F7DF1E" },
  { emoji: "", name: "TailwindCSS",version: "v3.x",            color: "#38BDF8" },
  { emoji: "", name: "bcrypt",     version: "v5.x",            color: "#00e887" },
];

const TIMELINE = [
  { num: "01", title: " Registro de usuario",       desc: "El usuario crea una cuenta proporcionando sus credenciales. La contraseña es procesada con bcrypt antes de almacenarse, garantizando que nunca se guarde en texto plano.", code: "POST /api/auth/register" },
  { num: "02", title: " Inicio de sesión",          desc: "El sistema valida las credenciales contra la base de datos, compara el hash de la contraseña y verifica la existencia del usuario de forma segura.", code: "POST /api/auth/login" },
  { num: "03", title: " Generación de JWT",         desc: "Tras autenticarse, el servidor genera un JSON Web Token firmado con una clave secreta, que contiene el payload del usuario con tiempo de expiración.", code: "jwt.sign(payload, SECRET, { expiresIn })" },
  { num: "04", title: " Verificación del token",    desc: "En cada petición a rutas protegidas, el middleware intercepta el token del header Authorization, lo verifica y extrae los datos del usuario.", code: "Authorization: Bearer <token>" },
  { num: "05", title: " Acceso a rutas protegidas", desc: "Con el token validado, el usuario accede a los recursos según su rol. Los administradores y usuarios regulares tienen vistas y permisos diferenciados.", code: "GET /api/dashboard — 200 OK" },
];

// ─── SVG SHIELD ──────────────────────────────────────────────────────────────
function ShieldSVG() {
  return (
    <svg width="200" height="230" viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#00e887" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="innerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#071220"/>
          <stop offset="100%" stopColor="#020408"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M100 5 L190 40 L190 110 Q190 175 100 225 Q10 175 10 110 L10 40 Z"
            fill="url(#innerGrad)" stroke="url(#shieldGrad)" strokeWidth="2" filter="url(#glow)"/>
      <path d="M100 22 L175 52 L175 110 Q175 163 100 205 Q25 163 25 110 L25 52 Z"
            fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1"/>
      <rect x="72" y="118" width="56" height="44" rx="4" fill="none" stroke="url(#shieldGrad)" strokeWidth="2" filter="url(#glow)"/>
      <path d="M82 118 L82 105 Q82 88 100 88 Q118 88 118 105 L118 118"
            fill="none" stroke="url(#shieldGrad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)"/>
      <circle cx="100" cy="138" r="7" fill="url(#shieldGrad)" opacity="0.8"/>
      <rect x="97" y="138" width="6" height="12" rx="1" fill="url(#shieldGrad)" opacity="0.8"/>
      <path d="M65 70 L72 66 L79 70 L79 78 L72 82 L65 78 Z" fill="none" stroke="rgba(0,232,135,0.3)" strokeWidth="0.8"/>
      <path d="M125 65 L132 61 L139 65 L139 73 L132 77 L125 73 Z" fill="none" stroke="rgba(0,232,135,0.3)" strokeWidth="0.8"/>
      <path d="M55 100 L60 97 L65 100 L65 106 L60 109 L55 106 Z" fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="0.8"/>
      <path d="M137 98 L142 95 L147 98 L147 104 L142 107 L137 104 Z" fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="0.8"/>
      <line x1="25" x2="175" y1="100" y2="100" stroke="rgba(0,212,255,0.6)" strokeWidth="1" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="translate" from="0 -80" to="0 105" dur="2.5s" repeatCount="indefinite"/>
      </line>
      <circle cx="100" cy="50" r="3" fill="#00d4ff" opacity="0.7"/>
      <circle cx="145" cy="85" r="2" fill="#00e887" opacity="0.5"/>
      <circle cx="55" cy="85" r="2" fill="#00e887" opacity="0.5"/>
    </svg>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function LandingPage() {
  const canvasRef = useRef(null);

  // Inject global CSS once
  useEffect(() => {
    if (document.getElementById("sal-global-css")) return;
    const style = document.createElement("style");
    style.id = "sal-global-css";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);

  // Matrix canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, cols, drops, raf;

    const chars = "01アイウエオカキクケコABCDEFGHIJKLMN0123456789<>{}[]".split("");

    function init() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.floor(W / 20);
      drops = Array(cols).fill(0).map(() => Math.random() * -50);
    }

    function draw() {
      ctx.fillStyle = "rgba(2,4,8,0.05)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "13px Share Tech Mono";
      for (let i = 0; i < drops.length; i++) {
        const c = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;
        const y = drops[i] * 20;
        const ratio = y / H;
        ctx.fillStyle = ratio < 0.3
          ? `rgba(0,232,135,${0.3 + ratio})`
          : `rgba(0,212,255,${0.6 - ratio * 0.3})`;
        ctx.fillText(c, x, y);
        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
      raf = requestAnimationFrame(draw);
    }

    init();
    window.addEventListener("resize", init);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", init); };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".sal-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Nav active
  useEffect(() => {
    const links = document.querySelectorAll(".sal-nav-links a");
    const onScroll = () => {
      const y = window.scrollY;
      document.querySelectorAll("section[id]").forEach(sec => {
        const top = sec.offsetTop - 100;
        const bot = top + sec.offsetHeight;
        if (y >= top && y < bot) {
          links.forEach(a => {
            a.style.color = a.getAttribute("href") === "#" + sec.id ? "var(--cyan)" : "";
          });
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleMenu() {
    const links = document.querySelector(".sal-nav-links");
    const isOpen = links.style.display === "flex";
    if (isOpen) {
      links.style.cssText = "";
    } else {
      links.style.cssText =
        "display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;" +
        "background:rgba(2,4,8,0.97);padding:20px;gap:20px;" +
        "border-bottom:1px solid rgba(0,212,255,0.15);z-index:99;";
    }
  }

  return (
    <>
      <canvas ref={canvasRef} id="matrix-canvas" />

      {/* NAV */}
      <nav className="sal-nav">
        <a href="#" className="sal-nav-logo">
          <div className="sal-logo-icon"></div>
          SecureAuth Lab
          <span className="sal-nav-badge">v2.1</span>
        </a>
        <ul className="sal-nav-links">
          <li><a href="#features">Características</a></li>
          <li><a href="#tech">Stack</a></li>
          <li><a href="#howto">Cómo funciona</a></li>
          <li><a href="#objective">Objetivo</a></li>
        </ul>
        <button className="sal-nav-cta">[ Comenzar ]</button>
        <button className="sal-hamburger" onClick={toggleMenu}>
          <span/><span/><span/>
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="sal-hero">
        <div className="sal-hero-grid" />
        <div className="sal-hero-content">
          <div>
            <div className="sal-hero-label">
              <span className="sal-label-dot" />
              Plataforma activa
            </div>
            <h1 className="sal-h1">
              <span className="sal-h1-secure">Secure</span>
              <span className="sal-h1-auth">Auth</span>
              <span className="sal-h1-lab">— Lab —</span>
            </h1>
            <p className="sal-hero-subtitle">
              Aprende y experimenta con autenticación segura<br/>en un entorno real de ciberseguridad.
            </p>
            <p className="sal-hero-desc">
              SecureAuth Lab es una plataforma desarrollada para aprender y practicar conceptos
              fundamentales de seguridad informática mediante la implementación de sistemas reales
              de autenticación. El proyecto permite comprender cómo funcionan los registros de
              usuarios, inicio de sesión seguro, cifrado de contraseñas y protección de rutas.
            </p>
            <div className="sal-hero-buttons">
              <Link to="/login" className="sal-btn-primary"><span>Iniciar sesión</span></Link>
              <Link to="/register" className="sal-btn-secondary">Registrarse</Link>
            </div>
            <div className="sal-hero-stats">
              <div><span className="sal-stat-value">256</span><span className="sal-stat-label">Bit Encryption</span></div>
              <div><span className="sal-stat-value">JWT</span><span className="sal-stat-label">Auth Tokens</span></div>
              <div><span className="sal-stat-value">99.9%</span><span className="sal-stat-label">Uptime</span></div>
            </div>
          </div>

          <div className="sal-hero-visual">
            <div className="sal-shield-container">
              <div className="sal-shield-glow" />
              <div className="sal-orbit sal-orbit-1"><div className="sal-orbit-dot" /></div>
              <div className="sal-orbit sal-orbit-2"><div className="sal-orbit-dot" /></div>
              <ShieldSVG />
              <div className="sal-badge sal-badge-jwt">JWT Token</div>
              <div className="sal-badge sal-badge-bcrypt"> bcrypt</div>
              <div className="sal-badge sal-badge-ssl">🛡 SSL/TLS</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="sal-section sal-features">
        <div className="sal-section-inner">
          <p className="sal-section-tag sal-reveal">Módulos</p>
          <h2 className="sal-section-title sal-reveal">Características del sistema</h2>
          <p className="sal-section-sub sal-reveal">Cada módulo está diseñado para enseñar un concepto real de seguridad aplicado en producción.</p>
          <div className="sal-features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.num} className={`sal-feature-card sal-reveal sal-delay-${(i % 3) + 1}`}>
                <span className="sal-feature-number">{f.num}</span>
                <div className="sal-feature-icon">{f.icon}</div>
                <h3 className="sal-feature-name">{f.name}</h3>
                <p className="sal-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="sal-section sal-tech">
        <div className="sal-section-inner">
          <p className="sal-section-tag sal-reveal">Stack tecnológico</p>
          <h2 className="sal-section-title sal-reveal">Tecnologías utilizadas</h2>
          <p className="sal-section-sub sal-reveal">Herramientas de nivel profesional utilizadas en entornos de producción reales.</p>
          <div className="sal-tech-grid">
            {TECHS.map((t, i) => (
              <div key={t.name} className={`sal-tech-card sal-reveal sal-delay-${(i % 4) + 1}`}
                   style={{ "--tech-color": t.color }}>
                <span className="sal-tech-emoji">{t.emoji}</span>
                <div className="sal-tech-name">{t.name}</div>
                <span className="sal-tech-version">{t.version}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howto" className="sal-section sal-howto">
        <div className="sal-section-inner">
          <p className="sal-section-tag sal-reveal">Flujo del sistema</p>
          <h2 className="sal-section-title sal-reveal">Cómo funciona</h2>
          <p className="sal-section-sub sal-reveal">Un flujo completo de autenticación seguro, desde el registro hasta el acceso a recursos protegidos.</p>
          <div className="sal-timeline">
            {TIMELINE.map((step) => (
              <div key={step.num} className="sal-tl-item sal-reveal">
                <div className="sal-tl-num"><div className="sal-tl-circle">{step.num}</div></div>
                <div className="sal-tl-content">
                  <h4 className="sal-tl-title">{step.title}</h4>
                  <p className="sal-tl-desc">{step.desc}</p>
                  <span className="sal-tl-code">{step.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIVE */}
      <section id="objective" className="sal-section sal-objective">
        <div className="sal-section-inner">
          <p className="sal-section-tag sal-reveal">Misión del proyecto</p>
          <h2 className="sal-section-title sal-reveal">Objetivo del proyecto</h2>
          <div className="sal-obj-card sal-reveal">
            <div className="sal-obj-left">
              <span className="sal-big-icon">🫦</span>
              <p className="sal-obj-label">SecureAuth Lab</p>
            </div>
            <div>
              <p className="sal-obj-text">
                El objetivo de <strong>SecureAuth Lab</strong> es proporcionar una experiencia práctica
                para aprender principios fundamentales de{" "}
                <strong>autenticación y seguridad en aplicaciones modernas</strong>, permitiendo
                desarrollar habilidades reales en ciberseguridad y desarrollo backend.
              </p>
              <br/>
              <p className="sal-obj-text">
                Este proyecto está diseñado para estudiantes, desarrolladores junior y cualquier persona
                que quiera comprender cómo funciona la{" "}
                <strong>seguridad de autenticación en entornos reales</strong>, sin sacrificar la
                profundidad técnica ni la calidad del código.
              </p>
              <br/>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
                <span className="sal-tag-pill" style={{ color: "var(--emerald)", background: "var(--emerald-dim)", border: "1px solid rgba(0,232,135,0.2)" }}>✓ Open Source</span>
                <span className="sal-tag-pill" style={{ color: "var(--cyan)", background: "var(--cyan-dim)", border: "1px solid rgba(0,212,255,0.2)" }}>✓ Hands-on learning</span>
                <span className="sal-tag-pill" style={{ color: "var(--emerald)", background: "var(--emerald-dim)", border: "1px solid rgba(0,232,135,0.2)" }}>✓ Production-ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sal-footer">
        <div className="sal-footer-inner">
          <div>
            <div className="sal-footer-logo">
              <div className="sal-logo-icon" style={{ width: 30, height: 30, fontSize: 12 }}></div>
              SecureAuth Lab
            </div>
            <p className="sal-footer-tagline">
              Plataforma educativa de ciberseguridad enfocada en autenticación segura y protección de usuarios en aplicaciones modernas.
            </p>
            <div className="sal-footer-social">
              <a href="#" className="sal-social-btn" title="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="sal-social-btn" title="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="sal-social-btn" title="Documentación">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="sal-footer-col">
            <h4>Plataforma</h4>
            <ul className="sal-footer-links">
              {["#features|Características","#tech|Tecnologías","#howto|Cómo funciona","#objective|Objetivo"].map(l => {
                const [href, label] = l.split("|");
                return <li key={href}><a href={href}>{label}</a></li>;
              })}
            </ul>
          </div>
          <div className="sal-footer-col">
            <h4>Recursos</h4>
            <ul className="sal-footer-links">
              {["Documentación","GitHub Repo","API Reference","Tutoriales"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sal-footer-bottom">
          <span className="sal-footer-copy">SecureAuth Lab © 2026 — Todos los derechos reservados</span>
          <div className="sal-footer-status"><span className="sal-status-dot"/>Sistema operativo</div>
        </div>
      </footer>
    </>
  );
}