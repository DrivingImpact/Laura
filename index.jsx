import { useState, useEffect, useRef } from "react";

// ─── Logo icon as React component — v22 shape, two colour variants ──────────
function LogoIcon({ variant = "purple", size = 1, opacity = 1, style = {} }) {
  // variant: "purple" = purple shape, "white" = white shape. No background ever.
  const fill   = variant === "white" ? "white" : "#7B35A0";
  const shadow = variant === "white" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)";
  const stepLine = variant === "white" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)";
  const w = 40 * size, h = 80 * size;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="43 58 47 100"
      width={w} height={h} style={{ opacity, display:"block", ...style }}>
      <path d="M 85,155 L 85,80 A 19.5,19.5 0 0,0 46,80 L 46,116 L 59,116 L 59,129 L 72,129 L 72,142 L 85,142 L 85,155 Z"
        fill={shadow} transform="translate(2,2)"/>
      <path d="M 85,155 L 85,80 A 19.5,19.5 0 0,0 46,80 L 46,116 L 59,116 L 59,129 L 72,129 L 72,142 L 85,142 L 85,155 Z"
        fill={fill}/>
      <line x1="46" y1="116" x2="59" y2="116" stroke={stepLine} strokeWidth="2"/>
      <line x1="59" y1="129" x2="72" y2="129" stroke={stepLine} strokeWidth="2"/>
      <line x1="72" y1="142" x2="85" y2="142" stroke={stepLine} strokeWidth="2"/>
    </svg>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --purple:#7B35A0;--purple-lt:#9B55C0;--purple-pale:#F3EDF7;
  --white:#FDFCFD;--off:#F7F5F9;--ink:#1A1520;--mid:#6B6270;
  --light:#B0A8B8;--border:#E5E0EA;--red:#C0392B;
}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--white);color:var(--ink);font-size:14px;line-height:1.6;overflow-x:hidden;}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:200;height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 48px;background:rgba(253,252,253,0.93);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.nav-brand{display:flex;align-items:center;gap:12px;text-decoration:none;}
.nav-brand-text{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:400;color:var(--ink);letter-spacing:.02em;line-height:1.2;}
.nav-brand-text span{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--purple);font-family:'DM Sans',sans-serif;font-weight:300;}
.nav-links{display:flex;gap:36px;list-style:none;}
.nav-links a{font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:var(--mid);text-decoration:none;transition:color .2s;}
.nav-links a:hover{color:var(--purple);}
.nav-right{display:flex;gap:12px;align-items:center;}
.btn-nav{font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:9px 20px;border:1px solid var(--purple);color:var(--purple);background:transparent;cursor:pointer;text-decoration:none;transition:background .2s,color .2s;font-family:'DM Sans',sans-serif;}
.btn-nav:hover{background:var(--purple);color:white;}
.btn-admin{font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:9px 20px;border:1px solid var(--border);color:var(--mid);background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;}
.btn-admin:hover{border-color:var(--purple);color:var(--purple);}

/* HERO */
.hero{padding-top:68px;min-height:92vh;display:grid;grid-template-columns:1fr 1fr;position:relative;}
.hero-left{display:flex;flex-direction:column;justify-content:center;padding:80px 56px 80px 72px;}
.eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--purple);margin-bottom:24px;display:flex;align-items:center;gap:10px;}
.eyebrow::before{content:'';width:28px;height:1px;background:var(--purple);}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(48px,4.5vw,70px);font-weight:300;line-height:1.08;margin-bottom:24px;}
.hero-title em{font-style:italic;color:var(--purple);}
.hero-sub{font-size:14px;color:var(--mid);max-width:360px;line-height:1.75;margin-bottom:40px;}
.hero-btns{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
.btn-primary{padding:13px 32px;background:var(--purple);color:white;text-decoration:none;font-size:11px;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background .2s;display:inline-block;}
.btn-primary:hover{background:var(--purple-lt);}
.btn-ghost{padding:13px 24px;color:var(--mid);text-decoration:none;font-size:11px;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid var(--border);transition:color .2s,border-color .2s;}
.btn-ghost:hover{color:var(--purple);border-color:var(--purple);}
.hero-stats{display:flex;gap:40px;margin-top:56px;padding-top:36px;border-top:1px solid var(--border);}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:300;line-height:1;}
.stat-l{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--light);margin-top:4px;}
.hero-right{position:relative;overflow:hidden;}
.hero-mosaic{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;height:100%;gap:3px;}
.hero-mosaic .big{grid-row:1/3;}
.hero-mosaic img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.94);transition:filter .4s;}
.hero-mosaic img:hover{filter:brightness(1);}
.hero-pill{position:absolute;bottom:32px;left:0;background:var(--purple);color:white;padding:16px 24px;}
.hero-pill-n{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;}
.hero-pill-t{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-top:2px;}
.hero-watermark{position:absolute;bottom:-20px;left:40px;pointer-events:none;}

/* SEARCH */
.search-bar{background:var(--ink);padding:28px 72px;display:flex;gap:0;align-items:stretch;}
.sf{flex:1;padding:0 22px;border-right:1px solid rgba(255,255,255,.1);}
.sf:first-child{padding-left:0;}
.sf-label{font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:var(--light);margin-bottom:4px;}
.sf select,.sf input{width:100%;background:transparent;border:none;color:white;font-family:'DM Sans',sans-serif;font-size:13px;padding:3px 0;outline:none;cursor:pointer;appearance:none;}
.sf select option{background:var(--ink);}
.search-go{background:var(--purple);color:white;border:none;padding:0 36px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:background .2s;white-space:nowrap;}
.search-go:hover{background:var(--purple-lt);}

/* SECTION DIVIDER */
.sec-divider{display:flex;align-items:center;justify-content:center;gap:24px;padding:0 72px;margin:0;}
.sec-divider-line{flex:1;height:1px;background:var(--border);}

/* SECTION */
.section{padding:88px 72px;}
.section.grey{background:var(--off);}
.section.purple-bg{background:var(--purple);}
.sec-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:48px;}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:300;line-height:1.15;}
.sec-title em{font-style:italic;color:var(--purple);}
.sec-title.on-purple em{color:rgba(255,255,255,.7);}
.link-all{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mid);text-decoration:none;border-bottom:1px solid var(--border);padding-bottom:2px;transition:color .2s,border-color .2s;white-space:nowrap;margin-bottom:6px;}
.link-all:hover{color:var(--purple);border-color:var(--purple);}

/* CARDS */
.prop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
.prop-grid .span2{grid-column:span 2;}
.card{background:white;overflow:hidden;display:block;text-decoration:none;color:inherit;transition:transform .28s;cursor:pointer;}
.card:hover{transform:translateY(-4px);}
.card:hover .card-img{transform:scale(1.04);}
.card-img-wrap{position:relative;overflow:hidden;aspect-ratio:4/3;}
.span2 .card-img-wrap{aspect-ratio:16/7;}
.card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
.card-badge{position:absolute;top:14px;left:14px;background:var(--ink);color:white;font-size:9px;letter-spacing:.12em;text-transform:uppercase;padding:5px 11px;}
.card-tag{position:absolute;top:14px;right:14px;background:var(--purple);color:white;font-size:9px;letter-spacing:.1em;text-transform:uppercase;padding:5px 11px;}
.card-body{padding:22px 22px 26px;}
.card-addr{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--light);margin-bottom:6px;}
.card-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;margin-bottom:14px;line-height:1.2;}
.span2 .card-title{font-size:26px;}
.card-feats{display:flex;gap:18px;flex-wrap:wrap;padding-bottom:16px;border-bottom:1px solid var(--border);margin-bottom:14px;}
.feat{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--mid);}
.card-foot{display:flex;align-items:center;justify-content:space-between;}
.card-price{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;}
.card-price sup{font-size:12px;font-family:'DM Sans',sans-serif;font-weight:300;vertical-align:super;}
.card-arr{width:34px;height:34px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--mid);font-size:16px;transition:all .2s;}
.card:hover .card-arr{background:var(--purple);color:white;border-color:var(--purple);}

/* LISTING PAGE */
.lp{padding-top:68px;min-height:100vh;background:var(--white);}
.lp-hero{position:relative;height:520px;overflow:hidden;background:#1a1520;}
.lp-hero img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.82);}
.lp-back{position:absolute;top:24px;left:40px;display:flex;align-items:center;gap:8px;color:white;font-size:11px;letter-spacing:.12em;text-transform:uppercase;background:rgba(0,0,0,.32);border:1px solid rgba(255,255,255,.2);padding:9px 18px;cursor:pointer;transition:background .2s;text-decoration:none;backdrop-filter:blur(6px);}
.lp-back:hover{background:rgba(0,0,0,.55);}
.lp-hero-badge{position:absolute;bottom:0;left:40px;background:var(--purple);color:white;padding:10px 20px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;}
.lp-hero-tag{position:absolute;top:24px;right:40px;background:var(--purple);color:white;padding:8px 16px;font-size:9px;letter-spacing:.12em;text-transform:uppercase;}
.lp-body{display:grid;grid-template-columns:1fr 380px;gap:56px;padding:56px 72px 80px;align-items:start;}
.lp-main{}
.lp-eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--purple);margin-bottom:14px;display:flex;align-items:center;gap:10px;}
.lp-eyebrow::before{content:'';width:24px;height:1px;background:var(--purple);}
.lp-title{font-family:'Cormorant Garamond',serif;font-size:clamp(34px,3.5vw,52px);font-weight:300;line-height:1.1;margin-bottom:10px;}
.lp-addr{font-size:13px;color:var(--mid);margin-bottom:32px;}
.lp-feats{display:flex;gap:0;border:1px solid var(--border);margin-bottom:40px;flex-wrap:wrap;}
.lp-feat{flex:1;min-width:100px;padding:18px 20px;border-right:1px solid var(--border);display:flex;flex-direction:column;gap:5px;}
.lp-feat:last-child{border-right:none;}
.lp-feat-lbl{font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:var(--light);}
.lp-feat-val{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;line-height:1;}
.lp-desc-title{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--mid);margin-bottom:12px;}
.lp-desc{font-size:14px;color:var(--mid);line-height:1.85;max-width:580px;}
.lp-thumb-row{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:36px;}
.lp-thumb{aspect-ratio:4/3;overflow:hidden;}
.lp-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s;filter:brightness(.92);}
.lp-thumb:hover img{transform:scale(1.05);filter:brightness(1);}
.lp-sidebar{}
.lp-price-box{border:1px solid var(--border);padding:32px;margin-bottom:16px;background:white;}
.lp-price-lbl{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--light);margin-bottom:8px;}
.lp-price{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:300;line-height:1;color:var(--ink);margin-bottom:4px;}
.lp-price sup{font-size:20px;vertical-align:super;font-family:'DM Sans',sans-serif;font-weight:300;}
.lp-price-sub{font-size:11px;color:var(--light);}
.lp-cta-btn{width:100%;padding:15px;background:var(--purple);color:white;border:none;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:background .2s;margin-top:20px;display:block;text-align:center;}
.lp-cta-btn:hover{background:var(--purple-lt);}
.lp-cta-wa{width:100%;padding:14px;background:#25D366;color:white;border:none;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:background .2s;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;}
.lp-cta-wa:hover{background:#20b858;}
.lp-agent{border:1px solid var(--border);padding:24px;background:var(--off);}
.lp-agent-lbl{font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:var(--light);margin-bottom:12px;}
.lp-agent-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;margin-bottom:4px;}
.lp-agent-sub{font-size:12px;color:var(--mid);}
@media(max-width:1024px){.lp-body{grid-template-columns:1fr;gap:40px;padding:40px 36px 64px;}.lp-back{left:24px;}.lp-hero-badge{left:24px;}.lp-hero-tag{right:24px;}}
@media(max-width:640px){.lp-hero{height:300px;}.lp-body{padding:28px 20px 56px;}.lp-feats{flex-wrap:wrap;}.lp-feat{min-width:calc(50% - 1px);}}

/* ABOUT */
.about{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
.about-body{font-size:14px;color:var(--mid);line-height:1.85;margin-bottom:24px;}
.about-imgs{display:grid;grid-template-columns:1fr 1fr;gap:3px;}
.about-img{overflow:hidden;}
.about-img.tall{grid-row:span 2;}
.about-img img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.88) saturate(.9);transition:filter .4s;}
.about-img:hover img{filter:brightness(.95) saturate(1);}

/* PURPLE BAND */
.purple-band{background:var(--purple);padding:64px 72px;display:flex;align-items:center;justify-content:space-between;gap:48px;}
.pb-left{flex:1;}
.pb-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;color:white;line-height:1.15;margin-bottom:12px;}
.pb-title em{font-style:italic;color:rgba(255,255,255,.65);}
.pb-sub{font-size:13px;color:rgba(255,255,255,.6);max-width:480px;line-height:1.7;}
.pb-icons{display:flex;gap:4px;flex-shrink:0;}
.pb-btn{padding:13px 32px;border:1px solid rgba(255,255,255,.4);color:white;background:transparent;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;text-decoration:none;transition:background .2s,border-color .2s;display:inline-block;flex-shrink:0;}
.pb-btn:hover{background:rgba(255,255,255,.15);border-color:white;}

/* CONTACT */
.contact{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start;}
.ci-list{display:flex;flex-direction:column;gap:22px;margin-top:40px;}
.ci{display:flex;gap:14px;align-items:flex-start;}
.ci-icon{width:38px;height:38px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--purple);flex-shrink:0;}
.ci-lbl{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--light);margin-bottom:3px;}
.ci-val{font-size:14px;}
.ci-val a{color:var(--ink);text-decoration:none;transition:color .2s;}
.ci-val a:hover{color:var(--purple);}
.contact-form{padding:40px;background:white;border:1px solid var(--border);}
.form-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;margin-bottom:28px;}
.fg{margin-bottom:16px;}
.fg label{display:block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--light);margin-bottom:6px;}
.fg input,.fg textarea,.fg select{width:100%;padding:10px 14px;border:1px solid var(--border);background:var(--off);font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink);outline:none;transition:border-color .2s;appearance:none;}
.fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--purple);}
.fg textarea{resize:vertical;min-height:90px;}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.submit{width:100%;padding:14px;background:var(--purple);color:white;border:none;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;margin-top:6px;transition:background .2s;}
.submit:hover{background:var(--purple-lt);}

/* FOOTER */
footer{background:#130E18;padding:56px 72px 28px;position:relative;overflow:hidden;}
.ft{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.8fr;gap:48px;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:24px;}
.ft-brand{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:white;margin-bottom:14px;}
.ft-brand span{color:#C49DDD;}
.ft-desc{font-size:12px;color:#555;line-height:1.75;max-width:260px;margin-bottom:20px;}
.ft-col-t{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:white;margin-bottom:16px;}
.ft-links{list-style:none;}
.ft-links li{margin-bottom:8px;}
.ft-links a{font-size:12px;color:#555;text-decoration:none;transition:color .2s;}
.ft-links a:hover{color:#C49DDD;}
.ft-bot{display:flex;justify-content:space-between;}
.ft-copy{font-size:11px;color:#333;}
.ft-city{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;color:#333;}
.ft-watermark{position:absolute;bottom:-20px;right:-10px;pointer-events:none;}

/* WA */
.wa{position:fixed;bottom:28px;right:28px;z-index:300;width:50px;height:50px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(37,211,102,.35);transition:transform .2s,box-shadow .2s;}
.wa:hover{transform:scale(1.1);box-shadow:0 6px 26px rgba(37,211,102,.45);}

/* ADMIN */
.admin-overlay{position:fixed;inset:0;z-index:500;background:rgba(19,14,24,.7);backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:flex-end;}
.admin-drawer{width:min(680px,95vw);height:100vh;background:white;overflow-y:auto;display:flex;flex-direction:column;box-shadow:-8px 0 40px rgba(0,0,0,.18);}
.admin-head{display:flex;align-items:center;justify-content:space-between;padding:24px 32px;border-bottom:1px solid var(--border);position:sticky;top:0;background:white;z-index:2;}
.admin-head-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;}
.admin-head-sub{font-size:11px;color:var(--mid);margin-top:2px;}
.admin-close{width:36px;height:36px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:18px;color:var(--mid);display:flex;align-items:center;justify-content:center;transition:all .2s;}
.admin-close:hover{border-color:var(--red);color:var(--red);}
.admin-body{padding:28px 32px;flex:1;}
.listing-row{display:grid;grid-template-columns:64px 1fr auto;gap:16px;align-items:center;padding:14px 0;border-bottom:1px solid var(--border);}
.listing-row:last-child{border-bottom:none;}
.lr-thumb{width:64px;height:48px;object-fit:cover;display:block;}
.lr-title{font-size:13px;font-weight:500;margin-bottom:3px;}
.lr-meta{font-size:11px;color:var(--mid);}
.lr-btns{display:flex;gap:8px;}
.lr-edit,.lr-del{padding:6px 14px;border:1px solid var(--border);background:transparent;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:all .2s;}
.lr-edit:hover{border-color:var(--purple);color:var(--purple);}
.lr-del:hover{border-color:var(--red);color:var(--red);}
.add-btn{width:100%;padding:14px;margin-top:24px;background:var(--purple);color:white;border:none;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:background .2s;}
.add-btn:hover{background:var(--purple-lt);}
.admin-form{margin-top:24px;}
.admin-form-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border);}
.afg{margin-bottom:14px;}
.afg label{display:block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--light);margin-bottom:5px;}
.afg input,.afg textarea,.afg select{width:100%;padding:9px 12px;border:1px solid var(--border);background:var(--off);font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink);outline:none;transition:border-color .2s;appearance:none;}
.afg input:focus,.afg textarea:focus,.afg select:focus{border-color:var(--purple);}
.afg textarea{resize:vertical;min-height:80px;}
.afr{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.af-actions{display:flex;gap:12px;margin-top:20px;}
.af-save{flex:1;padding:13px;background:var(--purple);color:white;border:none;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:background .2s;}
.af-save:hover{background:var(--purple-lt);}
.af-cancel{padding:13px 24px;background:transparent;border:1px solid var(--border);font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;color:var(--mid);transition:all .2s;}
.af-cancel:hover{border-color:var(--ink);color:var(--ink);}
.af-img-preview{width:100%;height:120px;object-fit:cover;display:block;margin-top:8px;border:1px solid var(--border);}
.toast{position:fixed;bottom:88px;left:50%;transform:translateX(-50%);background:var(--purple);color:white;padding:12px 28px;font-size:12px;letter-spacing:.08em;z-index:1000;animation:toastIn .25s ease;}
@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

@media(max-width:1024px){
  .nav{padding:0 28px;}
  .hero{grid-template-columns:1fr;}
  .hero-left{padding:72px 36px 48px;}
  .hero-right{height:340px;}
  .search-bar,.section,.purple-band,footer{padding-left:36px;padding-right:36px;}
  .prop-grid{grid-template-columns:1fr 1fr;}
  .prop-grid .span2{grid-column:span 2;}
  .about,.contact{grid-template-columns:1fr;}
  .ft{grid-template-columns:1fr 1fr;gap:36px;}
  .pb-icons{display:none;}
}
@media(max-width:640px){
  .nav{padding:0 18px;}
  .nav-links{display:none;}
  .hero-left{padding:56px 20px 36px;}
  .hero-stats{gap:24px;}
  .search-bar,.section,.purple-band,footer{padding-left:20px;padding-right:20px;}
  .prop-grid{grid-template-columns:1fr;}
  .prop-grid .span2{grid-column:span 1;}
  .span2 .card-img-wrap{aspect-ratio:4/3;}
  .ft{grid-template-columns:1fr;}
  .fr,.afr{grid-template-columns:1fr;}
  .contact-form{padding:24px 20px;}
  .admin-body{padding:20px;}
  .admin-head{padding:18px 20px;}
  .pb-btn{display:none;}
}
`;

const DEFAULT_LISTINGS = [
  { id:1, tipo:"Hotel", etiqueta:"Venta", tag:"", titulo:"Hotel de 2 estrellas — Oportunidad Comercial", direccion:"Hipólito Yrigoyen 1361", ciudad:"Mar del Plata", precio:"U$S 100", m2:"562", m2lote:"900", dorm:"", banos:"", cochera:"", descripcion:"Terreno 13×43. Lobby, 24 habitaciones con baño privado, kitchenette y TV cable.", imagen:"https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/447634_7067079_WhatsApp Image 202.jpeg", url:"https://laurachavarripropiedades.com/hotel-en-venta-mar-del-plata_447634_real-state-property.html", destacado:true },
  { id:2, tipo:"Casa/Chalet", etiqueta:"Venta", tag:"Oportunidad", titulo:"Chalet en Barrio Estación Camet", direccion:"Esquel 1230", ciudad:"Camet", precio:"U$S 49.800", m2:"120", m2lote:"850", dorm:"4", banos:"3", cochera:"1", descripcion:"Amplio lote arbolado con chalet de 4 ambientes.", imagen:"https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/409282_3003363_IMG_20230.jpg", url:"https://laurachavarripropiedades.com/casa-chalet-en-venta-camet_409282_real-state-property.html", destacado:false },
  { id:3, tipo:"Departamento", etiqueta:"Venta", tag:"", titulo:"Departamento 2 ambientes contrafrente", direccion:"Mitre 1245", ciudad:"Mar del Plata", precio:"U$S 58.000", m2:"47", m2lote:"", dorm:"2", banos:"1", cochera:"", descripcion:"Living comedor amplio, cocina separada luminosa, baño completo y dormitorio con placard.", imagen:"https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/img_457452_9065210_4.jpeg", url:"https://laurachavarripropiedades.com/departamento-en-venta-mar-del-plata_457452_real-state-property.html", destacado:false },
  { id:4, tipo:"Departamento", etiqueta:"Venta", tag:"Retasado", titulo:"Departamento 3 ambientes reciclado", direccion:"Salta s/n", ciudad:"Mar del Plata", precio:"U$S 89.500", m2:"", m2lote:"", dorm:"3", banos:"2", cochera:"1", descripcion:"Living comedor amplio, cocina reciclada, terraza tipo jardín de invierno.", imagen:"https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/444537_1963613_Screenshot_2025-01-17-08.jpg", url:"https://laurachavarripropiedades.com/departamento-en-venta-mar-del-plata_444537_real-state-property.html", destacado:false },
  { id:5, tipo:"Departamento", etiqueta:"Venta", tag:"", titulo:"Departamento 3 amb espacioso y luminoso", direccion:"Hipólito Yrigoyen 1500", ciudad:"Mar del Plata", precio:"U$S 185.000", m2:"110", m2lote:"", dorm:"3", banos:"2", cochera:"1", descripcion:"Living con piso de madera y balcón corrido. Dos dormitorios en suite.", imagen:"https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/img_453318_4941259_4.jpg", url:"https://laurachavarripropiedades.com/departamento-en-venta-mar-del-plata_453318_real-state-property.html", destacado:false },
  { id:6, tipo:"PH", etiqueta:"Venta", tag:"Apto Crédito", titulo:"PH al frente con garage — French 3666", direccion:"French 3666", ciudad:"Mar del Plata", precio:"U$S 99.000", m2:"120", m2lote:"", dorm:"3", banos:"2", cochera:"1", descripcion:"Jardín al frente, living comedor 5×4, dos dormitorios con placard.", imagen:"https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/434341_5949587_WhatsApp Image 202.jpeg", url:"https://laurachavarripropiedades.com/horizontal-property-sale-mar-del-plata_434341_real-state-property.html", destacado:false },
];

const BLANK = { id:null, tipo:"Departamento", etiqueta:"Venta", tag:"", titulo:"", direccion:"", ciudad:"Mar del Plata", precio:"", m2:"", m2lote:"", dorm:"", banos:"", cochera:"", descripcion:"", imagen:"", url:"", lazo:"", destacado:false };
const TIPOS = ["Departamento","Casa/Chalet","PH","Terreno","Hotel","Otro"];

const Ic = {
  bed: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9V6a2 2 0 012-2h16a2 2 0 012 2v3"/><rect x="2" y="14" width="20" height="6" rx="2"/><path d="M2 11h20"/></svg>,
  bath: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 12V6a2 2 0 014 0v6"/><path d="M2 20a2 2 0 002 2h16a2 2 0 002-2v-8H2v8z"/></svg>,
  car: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="11" width="20" height="9" rx="2"/><path d="M16 11V7a4 4 0 00-8 0v4"/><circle cx="8" cy="17" r="1"/><circle cx="16" cy="17" r="1"/></svg>,
  m2: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/></svg>,
  pin: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  tel: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.89a16 16 0 006.2 6.2l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  msg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  mail: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  wa: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
};

function descBullets(raw) {
  if (!raw) return [];
  // split on newlines, periods followed by capital, or common separators
  const lines = raw.split(/\n|(?<=\.)\s+(?=[A-ZÁÉÍÓÚÑ])/g).map(s=>s.trim()).filter(Boolean);
  return lines.length > 1 ? lines : raw.split(/[.;]\s+/).map(s=>s.trim()).filter(s=>s.length>4);
}

function SimilarCarousel({ listings, current, onSelect }) {
  const similar = listings.filter(l => l.id !== current.id && (l.tipo === current.tipo || l.etiqueta === current.etiqueta)).slice(0,6);
  if (!similar.length) return null;
  const scrollRef = useRef(null);
  const scroll = (dir) => { scrollRef.current.scrollBy({left: dir*300, behavior:"smooth"}); };
  return (
    <div style={{padding:"56px 72px 0",borderTop:"1px solid var(--border)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28}}>
        <div>
          <div style={{fontSize:10,letterSpacing:".16em",textTransform:"uppercase",color:"var(--purple)",marginBottom:8}}>Seguí explorando</div>
          <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:32,fontWeight:300}}>Propiedades <em style={{fontStyle:"italic"}}>similares</em></div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>scroll(-1)} style={{width:36,height:36,border:"1px solid var(--border)",background:"transparent",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.background="var(--ink)";e.currentTarget.style.color="white"}} onMouseOut={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="inherit"}}>←</button>
          <button onClick={()=>scroll(1)}  style={{width:36,height:36,border:"1px solid var(--border)",background:"transparent",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.background="var(--ink)";e.currentTarget.style.color="white"}} onMouseOut={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="inherit"}}>→</button>
        </div>
      </div>
      <div ref={scrollRef} style={{display:"flex",gap:3,overflowX:"auto",scrollSnapType:"x mandatory",paddingBottom:40,scrollbarWidth:"none",msOverflowStyle:"none"}}>
        {similar.map(l=>(
          <div key={l.id} onClick={()=>onSelect(l)} style={{flex:"0 0 280px",scrollSnapAlign:"start",background:"white",cursor:"pointer",transition:"transform .25s"}}
            onMouseOver={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseOut={e=>e.currentTarget.style.transform="none"}>
            <div style={{position:"relative",aspectRatio:"4/3",overflow:"hidden"}}>
              <img src={l.imagen} alt={l.titulo} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform .4s"}}
                onMouseOver={e=>e.target.style.transform="scale(1.04)"} onMouseOut={e=>e.target.style.transform="none"}/>
              <div style={{position:"absolute",top:10,left:10,background:"var(--ink)",color:"white",fontSize:9,letterSpacing:".1em",textTransform:"uppercase",padding:"4px 9px"}}>{l.tipo}</div>
              {l.tag && <div style={{position:"absolute",top:10,right:10,background:"var(--purple)",color:"white",fontSize:9,letterSpacing:".1em",textTransform:"uppercase",padding:"4px 9px"}}>{l.tag}</div>}
            </div>
            <div style={{padding:"16px 18px 20px"}}>
              <div style={{fontSize:10,letterSpacing:".07em",textTransform:"uppercase",color:"var(--light)",marginBottom:5}}>{l.direccion} · {l.ciudad}</div>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:17,fontWeight:400,marginBottom:12,lineHeight:1.25}}>{l.titulo}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid var(--border)",paddingTop:12}}>
                <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,fontWeight:400}}><sup style={{fontSize:11,fontFamily:"DM Sans,sans-serif",fontWeight:300}}>$</sup>{l.precio.replace(/^U\$S\s*/,"")}</div>
                <div style={{width:28,height:28,border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"var(--mid)"}}>→</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingPage({ p, listings, onBack, onSelect }) {
  useEffect(() => { window.scrollTo(0,0); }, [p.id]);

  const allImgs = [
    p.imagen,
    "https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_3700128_enc.jpg",
    "https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_6012703_enc.jpg",
    "https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_8516029_enc.jpg",
    "https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_4188007_enc.jpg",
  ].filter(Boolean);

  const [imgIdx, setImgIdx] = useState(0);
  const prev = () => setImgIdx(i => (i - 1 + allImgs.length) % allImgs.length);
  const next = () => setImgIdx(i => (i + 1) % allImgs.length);

  const bullets = descBullets(p.descripcion);
  const mapQuery = encodeURIComponent(`${p.direccion}, ${p.ciudad}, Buenos Aires, Argentina`);

  const btnStyle = {width:36,height:36,background:"rgba(0,0,0,.45)",border:"none",color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)",flexShrink:0,transition:"background .2s"};

  return (
    <div className="lp">

      {/* ── CAROUSEL ── */}
      <div style={{paddingTop:68,position:"relative",background:"#0e0b12",userSelect:"none"}}>
        {/* main image */}
        <div style={{position:"relative",height:520,overflow:"hidden"}}>
          {allImgs.map((src,i)=>(
            <img key={i} src={src} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:i===imgIdx?1:0,transition:"opacity .4s ease",filter:"brightness(.88)"}}/>
          ))}
          {/* back */}
          <button onClick={onBack} style={{position:"absolute",top:20,left:36,zIndex:10,display:"flex",alignItems:"center",gap:8,color:"white",fontSize:11,letterSpacing:".12em",textTransform:"uppercase",background:"rgba(0,0,0,.38)",border:"1px solid rgba(255,255,255,.2)",padding:"8px 16px",cursor:"pointer",backdropFilter:"blur(6px)"}}>← Volver</button>
          {/* badges */}
          <div style={{position:"absolute",bottom:0,left:0,background:"var(--purple)",color:"white",padding:"8px 18px",fontSize:9,letterSpacing:".14em",textTransform:"uppercase"}}>{p.tipo} · {p.etiqueta}</div>
          {p.tag && <div style={{position:"absolute",top:20,right:36,background:"var(--purple)",color:"white",padding:"7px 14px",fontSize:9,letterSpacing:".12em",textTransform:"uppercase"}}>{p.tag}</div>}
          {/* counter */}
          <div style={{position:"absolute",bottom:12,right:36,color:"rgba(255,255,255,.7)",fontSize:11,letterSpacing:".1em"}}>{imgIdx+1} / {allImgs.length}</div>
          {/* arrows */}
          <button onClick={prev} style={{...btnStyle,position:"absolute",left:16,top:"50%",transform:"translateY(-50%)"}} onMouseOver={e=>e.currentTarget.style.background="rgba(0,0,0,.75)"} onMouseOut={e=>e.currentTarget.style.background="rgba(0,0,0,.45)"}>‹</button>
          <button onClick={next} style={{...btnStyle,position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}} onMouseOver={e=>e.currentTarget.style.background="rgba(0,0,0,.75)"} onMouseOut={e=>e.currentTarget.style.background="rgba(0,0,0,.45)"}>›</button>
        </div>
        {/* thumbnails */}
        <div style={{display:"flex",gap:3,padding:"3px 0 0",overflowX:"auto",scrollbarWidth:"none"}}>
          {allImgs.map((src,i)=>(
            <div key={i} onClick={()=>setImgIdx(i)} style={{flex:"0 0 100px",height:64,overflow:"hidden",cursor:"pointer",opacity:i===imgIdx?1:.45,transition:"opacity .2s",outline:i===imgIdx?"2px solid var(--purple)":"none",outlineOffset:-2}}>
              <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="lp-body">
        <div className="lp-main">
          <div className="lp-eyebrow">{p.ciudad}</div>
          <h1 className="lp-title">{p.titulo}</h1>
          <div className="lp-addr">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:5,verticalAlign:"middle",opacity:.45}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {p.direccion}, {p.ciudad}, Buenos Aires
          </div>

          <div className="lp-feats">
            {p.m2     && <div className="lp-feat"><div className="lp-feat-lbl">Sup. cubierta</div><div className="lp-feat-val">{p.m2}<span style={{fontSize:13}}> m²</span></div></div>}
            {p.m2lote && <div className="lp-feat"><div className="lp-feat-lbl">Sup. lote</div><div className="lp-feat-val">{p.m2lote}<span style={{fontSize:13}}> m²</span></div></div>}
            {p.dorm   && <div className="lp-feat"><div className="lp-feat-lbl">Dorm.</div><div className="lp-feat-val">{p.dorm}</div></div>}
            {p.banos  && <div className="lp-feat"><div className="lp-feat-lbl">Baños</div><div className="lp-feat-val">{p.banos}</div></div>}
            {p.cochera&& <div className="lp-feat"><div className="lp-feat-lbl">Cochera</div><div className="lp-feat-val">Sí</div></div>}
          </div>

          <div className="lp-desc-title">Descripción</div>
          {bullets.length > 1
            ? <ul style={{listStyle:"none",padding:0,margin:0}}>
                {bullets.map((b,i)=>(
                  <li key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,color:"var(--mid)",lineHeight:1.7,marginBottom:5}}>
                    <span style={{marginTop:8,width:5,height:5,borderRadius:"50%",background:"var(--purple)",flexShrink:0,display:"block"}}/>
                    {b.replace(/^[-–•]\s*/,"")}
                  </li>
                ))}
              </ul>
            : <p className="lp-desc">{p.descripcion || "Consultenos para más información."}</p>
          }

          {/* MAP */}
          <div style={{marginTop:36}}>
            <div className="lp-desc-title" style={{marginBottom:12}}>Ubicación</div>
            <div style={{position:"relative",width:"100%",height:240,overflow:"hidden",border:"1px solid var(--border)"}}>
              <iframe title="mapa" width="100%" height="100%" style={{border:0,display:"block"}} loading="lazy"
                src={`https://maps.google.com/maps?q=${mapQuery}&output=embed&z=15`}/>
              <a href={`https://maps.google.com/?q=${mapQuery}`} target="_blank" rel="noreferrer"
                style={{position:"absolute",bottom:10,right:10,background:"white",border:"1px solid var(--border)",padding:"5px 10px",fontSize:10,letterSpacing:".08em",textTransform:"uppercase",textDecoration:"none",color:"var(--ink)",display:"flex",alignItems:"center",gap:5}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Ver en Maps
              </a>
            </div>
          </div>
        </div>

        {/* ── SIDEBAR — price only ── */}
        <div className="lp-sidebar">
          <div style={{border:"1px solid var(--border)",padding:"16px 18px",background:"white",width:"100%"}}>
            <div style={{fontSize:9,letterSpacing:".13em",textTransform:"uppercase",color:"var(--light)",marginBottom:3}}>Precio</div>
            <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:28,fontWeight:300,lineHeight:1.1,color:"var(--ink)"}}>
              <span style={{fontSize:12,fontFamily:"DM Sans,sans-serif",fontWeight:300,marginRight:4}}>U$S</span>{p.precio.replace(/^U\$S\s*/,"")}
            </div>
          </div>
        </div>
      </div>

      <SimilarCarousel listings={listings} current={p} onSelect={onSelect}/>

      {/* CONTACT */}
      <section className="section" id="contacto" style={{borderTop:"1px solid var(--border)"}}>
        <div className="contact">
          <div>
            <div className="eyebrow" style={{marginBottom:14}}>Contacto</div>
            <h2 className="sec-title">Encontremos<br/>su <em>propiedad ideal</em></h2>
            <div className="ci-list">
              <div className="ci"><div className="ci-icon">{Ic.pin}</div><div><div className="ci-lbl">Dirección</div><div className="ci-val">Hipólito Yrigoyen 1377<br/>Mar del Plata, Buenos Aires</div></div></div>
              <div className="ci"><div className="ci-icon">{Ic.tel}</div><div><div className="ci-lbl">Teléfono</div><div className="ci-val"><a href="tel:+540223496413">(0223) 496-4136</a></div></div></div>
              <div className="ci"><div className="ci-icon">{Ic.msg}</div><div><div className="ci-lbl">WhatsApp</div><div className="ci-val"><a href="https://wa.me/5492236856703" target="_blank" rel="noreferrer">+54 9 223 685-6703</a></div></div></div>
              <div className="ci"><div className="ci-icon">{Ic.mail}</div><div><div className="ci-lbl">Email</div><div className="ci-val"><a href="mailto:laurachavarripropiedades@hotmail.com">laurachavarripropiedades@hotmail.com</a></div></div></div>
            </div>
          </div>
          <ContactForm prefill={`Hola, me interesa la propiedad: ${p.titulo} (${p.direccion})`}/>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="ft-watermark" style={{position:"absolute",bottom:0,right:-10,opacity:.06}}>
          <LogoIcon variant="purple" size={1.4}/>
        </div>
        <div className="ft">
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div className="ft-brand">Laura Chavarri</div>
              <LogoIcon variant="white" size={0.27} opacity={0.85}/>
            </div>
            <div className="ft-desc">Más de 25 años de experiencia en el mercado inmobiliario de Mar del Plata.</div>
            <div style={{display:"flex",gap:10,marginTop:16}}>
              <a href="https://www.instagram.com/laurachavarripropiedades/" target="_blank" rel="noreferrer" style={{width:34,height:34,border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"#888",textDecoration:"none",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.borderColor="#C49DDD";e.currentTarget.style.color="#C49DDD"}} onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.color="#888"}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.facebook.com/laurachavarripropiedades" target="_blank" rel="noreferrer" style={{width:34,height:34,border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"#888",textDecoration:"none",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.borderColor="#C49DDD";e.currentTarget.style.color="#C49DDD"}} onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.color="#888"}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://wa.me/5492236856703" target="_blank" rel="noreferrer" style={{width:34,height:34,border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"#888",textDecoration:"none",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.borderColor="#C49DDD";e.currentTarget.style.color="#C49DDD"}} onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.color="#888"}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <div className="ft-col-t">Navegación</div>
            <ul className="ft-links">
              <li><a href="#" onClick={e=>{e.preventDefault();onBack();}}>Inicio</a></li>
              <li><a href="#" onClick={e=>{e.preventDefault();onBack();}}>Propiedades</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          <div>
            <div className="ft-col-t">Tipos de propiedad</div>
            <ul className="ft-links">
              <li><a href="https://laurachavarripropiedades.com/departamento-en-venta.html" target="_blank" rel="noreferrer">Departamentos</a></li>
              <li><a href="https://laurachavarripropiedades.com/casa-chalet-en-venta.html" target="_blank" rel="noreferrer">Casas / Chalets</a></li>
              <li><a href="https://laurachavarripropiedades.com/ph-en-venta.html" target="_blank" rel="noreferrer">PH</a></li>
              <li><a href="https://laurachavarripropiedades.com/terreno-en-venta.html" target="_blank" rel="noreferrer">Terrenos</a></li>
              <li><a href="https://laurachavarripropiedades.com/hotel-en-venta.html" target="_blank" rel="noreferrer">Hoteles</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">© 2025 Laura Chavarri Propiedades. Todos los derechos reservados.</div>
          <div className="ft-city">Mar del Plata, Argentina</div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm({ prefill="" }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [interes, setInteres] = useState(prefill ? "Consultar esta propiedad" : "Comprar una propiedad");
  const [msg, setMsg] = useState(prefill);
  const [sent, setSent] = useState(false);

  const send = () => {
    const subject = encodeURIComponent(`Consulta: ${interes}`);
    const body = encodeURIComponent(`Nombre: ${nombre} ${apellido}\nEmail: ${email}\nTeléfono: ${tel}\nInterés: ${interes}\n\n${msg}`);
    window.open(`mailto:laurachavarripropiedades@hotmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(()=>setSent(false), 4000);
  };

  return (
    <div className="contact-form">
      <div className="form-title">Envienos un mensaje</div>
      <div className="fr">
        <div className="fg"><label>Nombre</label><input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="María"/></div>
        <div className="fg"><label>Apellido</label><input value={apellido} onChange={e=>setApellido(e.target.value)} placeholder="García"/></div>
      </div>
      <div className="fg"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="maria@email.com"/></div>
      <div className="fg"><label>Teléfono</label><input type="tel" value={tel} onChange={e=>setTel(e.target.value)} placeholder="+54 223..."/></div>
      <div className="fg"><label>Me interesa</label>
        <select value={interes} onChange={e=>setInteres(e.target.value)}>
          {prefill && <option>Consultar esta propiedad</option>}
          <option>Comprar una propiedad</option>
          <option>Vender una propiedad</option>
          <option>Tasación</option>
          <option>Consulta general</option>
        </select>
      </div>
      <div className="fg"><label>Mensaje</label><textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Cuéntenos qué está buscando…"/></div>
      <button className="submit" onClick={send}>{sent ? "✓ Abriendo correo…" : "Enviar mensaje"}</button>
    </div>
  );
}

function Card({ p, wide, onSelect }) {
  return (
    <div className={`card${wide ? " span2" : ""}`} onClick={()=>onSelect(p)} style={{position:"relative"}}>
      {p.lazo && (
        <div style={{position:"absolute",top:0,right:0,width:80,height:80,overflow:"hidden",zIndex:10,pointerEvents:"none"}}>
          <div style={{position:"absolute",top:18,right:-22,width:110,background:"var(--purple)",color:"white",fontSize:9,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",textAlign:"center",padding:"5px 0",transform:"rotate(45deg)",boxShadow:"0 2px 6px rgba(0,0,0,.25)"}}>
            {p.lazo}
          </div>
        </div>
      )}
      <div className="card-img-wrap">
        <img className="card-img" src={p.imagen || "https://via.placeholder.com/600x400?text=Sin+imagen"} alt={p.titulo} loading="lazy"/>
        <div className="card-badge">{p.tipo}</div>
        {p.tag && <div className="card-tag">{p.tag}</div>}
      </div>
      <div className="card-body">
        <div className="card-addr">{p.direccion} · {p.ciudad}</div>
        <div className="card-title">{p.titulo}</div>
        <div className="card-feats">
          {p.m2      && <span className="feat">{Ic.m2} {p.m2} m²</span>}
          {p.m2lote  && <span className="feat">{Ic.m2} Lote {p.m2lote} m²</span>}
          {p.dorm    && <span className="feat">{Ic.bed} {p.dorm} dorm.</span>}
          {p.banos   && <span className="feat">{Ic.bath} {p.banos} baños</span>}
          {p.cochera && <span className="feat">{Ic.car} cochera</span>}
        </div>
        <div className="card-foot">
          <div className="card-price"><sup>$</sup>{p.precio.replace(/^U\$S\s*/,"")}</div>
          <div className="card-arr">→</div>
        </div>
      </div>
    </div>
  );
}

function PasswordModal({ val, setVal, err, onSubmit, onClose }) {
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const onKey = (e) => { if (e.key === "Enter") onSubmit(); if (e.key === "Escape") onClose(); };
  return (
    <div style={{position:"fixed",inset:0,z:600,background:"rgba(19,14,24,.75)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"white",padding:"40px 44px",width:340,boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
        <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:26,fontWeight:400,marginBottom:6}}>Acceso admin</div>
        <div style={{fontSize:12,color:"var(--mid)",marginBottom:24}}>Ingresá la contraseña para continuar.</div>
        <input
          ref={inputRef}
          type="password"
          value={val}
          onChange={e=>setVal(e.target.value)}
          onKeyDown={onKey}
          placeholder="Contraseña"
          style={{width:"100%",padding:"10px 14px",border:`1px solid ${err?"var(--red)":"var(--border)"}`,fontFamily:"DM Sans,sans-serif",fontSize:14,outline:"none",marginBottom:err?6:20,boxSizing:"border-box"}}
        />
        {err && <div style={{fontSize:11,color:"var(--red)",marginBottom:14}}>Contraseña incorrecta.</div>}
        <div style={{display:"flex",gap:10}}>
          <button onClick={onSubmit} style={{flex:1,padding:"11px",background:"var(--purple)",color:"white",border:"none",fontFamily:"DM Sans,sans-serif",fontSize:11,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer"}}>Entrar</button>
          <button onClick={onClose} style={{padding:"11px 18px",background:"transparent",border:"1px solid var(--border)",fontFamily:"DM Sans,sans-serif",fontSize:11,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",color:"var(--mid)"}}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function AdminDrawer({ listings, onClose, onChange }) {
  const [editing, setEditing] = useState(null); // id of row being edited inline
  const [form, setForm] = useState({});
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({...BLANK});
  const dragIdx = useRef(null);

  const startEdit = (l) => { setEditing(l.id); setForm({...l}); setAdding(false); };
  const cancelEdit = () => { setEditing(null); setForm({}); };
  const saveEdit = () => { onChange(listings.map(l=>l.id===editing?{...form}:l)); setEditing(null); };
  const del = (id) => { if(confirm("¿Eliminar esta propiedad?")) onChange(listings.filter(l=>l.id!==id)); };

  const startAdd = () => { setAdding(true); setAddForm({...BLANK}); setEditing(null); };
  const saveAdd = () => {
    const id = Math.max(0,...listings.map(l=>l.id))+1;
    onChange([...listings,{...addForm,id}]);
    setAdding(false);
  };

  // drag-to-reorder
  const onDragStart = (i) => { dragIdx.current = i; };
  const onDragOver = (e,i) => { e.preventDefault(); if(dragIdx.current===i) return; const arr=[...listings]; const [item]=arr.splice(dragIdx.current,1); arr.splice(i,0,item); dragIdx.current=i; onChange(arr); };

  const Field = ({label, k, obj, setObj, type="text", full=false, options=null}) => (
    <div style={{marginBottom:10,gridColumn:full?"1/-1":"auto"}}>
      <div style={{fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:"var(--light)",marginBottom:4}}>{label}</div>
      {options
        ? <select value={obj[k]||""} onChange={e=>setObj(p=>({...p,[k]:e.target.value}))} style={{width:"100%",padding:"8px 10px",border:"1px solid var(--border)",background:"var(--off)",fontFamily:"DM Sans,sans-serif",fontSize:12,color:"var(--ink)",outline:"none",appearance:"none"}}>{options.map(o=><option key={o}>{o}</option>)}</select>
        : type==="textarea"
          ? <textarea value={obj[k]||""} onChange={e=>setObj(p=>({...p,[k]:e.target.value}))} rows={2} style={{width:"100%",padding:"8px 10px",border:"1px solid var(--border)",background:"var(--off)",fontFamily:"DM Sans,sans-serif",fontSize:12,color:"var(--ink)",outline:"none",resize:"vertical"}}/>
          : <input type={type} value={obj[k]||""} onChange={e=>setObj(p=>({...p,[k]:e.target.value}))} style={{width:"100%",padding:"8px 10px",border:"1px solid var(--border)",background:"var(--off)",fontFamily:"DM Sans,sans-serif",fontSize:12,color:"var(--ink)",outline:"none"}}/>
      }
    </div>
  );

  const InlineForm = ({obj, setObj, onSave, onCancel, saveLabel}) => (
    <div style={{background:"var(--off)",border:"1px solid var(--border)",padding:"20px 24px",marginBottom:2}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
        <Field label="Tipo" k="tipo" obj={obj} setObj={setObj} options={TIPOS}/>
        <Field label="Operación" k="etiqueta" obj={obj} setObj={setObj} options={["Venta","Alquiler"]}/>
        <Field label="Título" k="titulo" obj={obj} setObj={setObj} full/>
        <Field label="Dirección" k="direccion" obj={obj} setObj={setObj}/>
        <Field label="Ciudad" k="ciudad" obj={obj} setObj={setObj}/>
        <Field label="Precio (ej: U$S 85.000)" k="precio" obj={obj} setObj={setObj}/>
        <Field label="Tag (Oportunidad, Apto Crédito…)" k="tag" obj={obj} setObj={setObj}/>
        <Field label="m² cubiertos" k="m2" obj={obj} setObj={setObj} type="number"/>
        <Field label="m² lote" k="m2lote" obj={obj} setObj={setObj} type="number"/>
        <Field label="Dormitorios" k="dorm" obj={obj} setObj={setObj} type="number"/>
        <Field label="Baños" k="banos" obj={obj} setObj={setObj} type="number"/>
        <Field label="Cochera" k="cochera" obj={obj} setObj={setObj} options={["","1"]}/>
        <Field label='Lazo diagonal (ej: "Vendido", "Reservado")' k="lazo" obj={obj} setObj={setObj} full/>
        <Field label="Descripción" k="descripcion" obj={obj} setObj={setObj} type="textarea" full/>
        <Field label="URL imagen" k="imagen" obj={obj} setObj={setObj} full/>
      </div>
      {obj.imagen && <img src={obj.imagen} alt="" style={{width:"100%",height:120,objectFit:"cover",marginBottom:12,border:"1px solid var(--border)"}} onError={e=>e.target.style.display="none"}/>}
      <div style={{display:"flex",gap:8,marginTop:4}}>
        <button onClick={onSave} style={{flex:1,padding:"11px",background:"var(--purple)",color:"white",border:"none",fontFamily:"DM Sans,sans-serif",fontSize:11,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer"}}>{saveLabel}</button>
        <button onClick={onCancel} style={{padding:"11px 20px",background:"transparent",border:"1px solid var(--border)",fontFamily:"DM Sans,sans-serif",fontSize:11,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",color:"var(--mid)"}}>Cancelar</button>
      </div>
    </div>
  );

  return (
    <div className="admin-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="admin-drawer">
        <div className="admin-head">
          <div>
            <div className="admin-head-title">Propiedades</div>
            <div className="admin-head-sub">Arrastrá para reordenar · Editá en línea</div>
          </div>
          <button className="admin-close" onClick={onClose}>✕</button>
        </div>
        <div className="admin-body">

          {listings.map((l,i)=>(
            <div key={l.id} draggable onDragStart={()=>onDragStart(i)} onDragOver={e=>onDragOver(e,i)}
              style={{marginBottom:2,cursor:"grab",userSelect:"none"}}>
              {editing===l.id
                ? <InlineForm obj={form} setObj={setForm} onSave={saveEdit} onCancel={cancelEdit} saveLabel="Guardar"/>
                : (
                  <div style={{display:"grid",gridTemplateColumns:"8px 56px 1fr auto",gap:12,alignItems:"center",padding:"12px 0",borderBottom:"1px solid var(--border)"}}>
                    <div style={{width:8,height:32,background:"var(--border)",borderRadius:2,cursor:"grab"}}/>
                    <img src={l.imagen||"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='42'%3E%3Crect fill='%23eee' width='56' height='42'/%3E%3C/svg%3E"} alt="" style={{width:56,height:42,objectFit:"cover",display:"block"}} onError={e=>e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='42'%3E%3Crect fill='%23eee' width='56' height='42'/%3E%3C/svg%3E"}/>
                    <div>
                      <div style={{fontSize:13,fontWeight:500,marginBottom:2,lineHeight:1.3}}>{l.titulo||"(sin título)"}</div>
                      <div style={{fontSize:11,color:"var(--mid)"}}>{l.tipo} · {l.ciudad} · <strong style={{color:"var(--ink)"}}>{l.precio}</strong></div>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>startEdit(l)} style={{padding:"5px 12px",border:"1px solid var(--border)",background:"transparent",fontFamily:"DM Sans,sans-serif",fontSize:10,letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer",color:"var(--mid)",transition:"all .15s"}}
                        onMouseOver={e=>{e.target.style.borderColor="var(--purple)";e.target.style.color="var(--purple)"}} onMouseOut={e=>{e.target.style.borderColor="var(--border)";e.target.style.color="var(--mid)"}}>Editar</button>
                      <button onClick={()=>del(l.id)} style={{padding:"5px 12px",border:"1px solid var(--border)",background:"transparent",fontFamily:"DM Sans,sans-serif",fontSize:10,letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer",color:"var(--mid)",transition:"all .15s"}}
                        onMouseOver={e=>{e.target.style.borderColor="var(--red)";e.target.style.color="var(--red)"}} onMouseOut={e=>{e.target.style.borderColor="var(--border)";e.target.style.color="var(--mid)"}}>✕</button>
                    </div>
                  </div>
                )
              }
            </div>
          ))}

          {adding
            ? <InlineForm obj={addForm} setObj={setAddForm} onSave={saveAdd} onCancel={()=>setAdding(false)} saveLabel="Agregar propiedad"/>
            : <button className="add-btn" onClick={startAdd}>+ Nueva propiedad</button>
          }
        </div>
      </div>
    </div>
  );
}


// ─── Search Bar — real filtering ─────────────────────────────────────────────
function SearchBar({ onSearch }) {
  const [op,   setOp]   = useState("Venta");
  const [tipo, setTipo] = useState("Todos");
  const [ciudad, setCiudad] = useState("Todas");
  const [dorm,  setDorm]  = useState("Cualquier cant.");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [cochera, setCochera] = useState(false);
  const [luminoso, setLuminoso] = useState(false);
  const [credito, setCredito] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const extrasRef = useRef(null);

  useEffect(() => {
    const h = e => { if (extrasRef.current && !extrasRef.current.contains(e.target)) setExtrasOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const activeCount = [cochera, luminoso, credito].filter(Boolean).length;
  const go = () => onSearch({ op, tipo, ciudad, dorm, desde, hasta, cochera, luminoso, credito });

  const sel = (label, val, setVal, opts) => (
    <div className="sf">
      <div className="sf-label">{label}</div>
      <select value={val} onChange={e=>{setVal(e.target.value);}}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="search-bar" style={{flexWrap:"wrap"}}>
      {sel("Operación", op, setOp, ["Venta","Alquiler"])}
      {sel("Tipo de propiedad", tipo, setTipo, ["Todos","Casa - Chalet","Departamento","Hotel","PH","Terreno"])}
      {sel("Ciudad / Zona", ciudad, setCiudad, ["Todas","Mar del Plata","Camet","Sierra de los Padres"])}
      {sel("Ambientes", dorm, setDorm, ["Cualquier cant.","1","2","3","4","5+"])}
      <div className="sf" style={{flex:"0 0 auto",padding:"0 16px"}}>
        <div className="sf-label">Precio desde (U$S)</div>
        <input value={desde} onChange={e=>setDesde(e.target.value)} placeholder="—" style={{background:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,0.2)",color:"white",fontFamily:"DM Sans,sans-serif",fontSize:12,outline:"none",width:"80px",padding:"2px 0"}}/>
      </div>
      <div className="sf" style={{flex:"0 0 auto",padding:"0 16px"}}>
        <div className="sf-label">Precio hasta (U$S)</div>
        <input value={hasta} onChange={e=>setHasta(e.target.value)} placeholder="—" style={{background:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,0.2)",color:"white",fontFamily:"DM Sans,sans-serif",fontSize:12,outline:"none",width:"80px",padding:"2px 0"}}/>
      </div>
      <div className="sf" style={{flex:"0 0 auto",borderRight:"none",position:"relative"}} ref={extrasRef}>
        <div className="sf-label">Extras</div>
        <button onClick={()=>setExtrasOpen(o=>!o)} style={{background:"transparent",border:"none",color:"white",fontFamily:"DM Sans,sans-serif",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6,padding:"3px 0"}}>
          {activeCount > 0 ? `${activeCount} sel.` : "Seleccionar"}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="white" style={{transform:extrasOpen?"rotate(180deg)":"none",transition:"transform .2s"}}><path d="M1 3l4 4 4-4"/></svg>
        </button>
        {extrasOpen && (
          <div style={{position:"absolute",top:"calc(100% + 8px)",left:0,background:"#1A1520",border:"1px solid rgba(255,255,255,0.12)",padding:"16px 20px",zIndex:100,minWidth:160,display:"flex",flexDirection:"column",gap:12}}>
            {[["cochera","Cochera",cochera,setCochera],["luminoso","Luminoso",luminoso,setLuminoso],["credito","Apto Crédito",credito,setCredito]].map(([key,label,val,setter])=>(
              <label key={key} style={{display:"flex",alignItems:"center",gap:10,color:"white",fontSize:12,cursor:"pointer",userSelect:"none"}}>
                <div onClick={()=>setter(v=>!v)} style={{width:16,height:16,border:`1px solid ${val?"#7B35A0":"rgba(255,255,255,0.3)"}`,background:val?"#7B35A0":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .15s"}}>
                  {val && <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2"><polyline points="1.5,5 4,7.5 8.5,2"/></svg>}
                </div>
                {label}
              </label>
            ))}
          </div>
        )}
      </div>
      <button className="search-go" onClick={go}>Buscar</button>
    </div>
  );
}

export default function App() {
  const [listings, setListings] = useState(DEFAULT_LISTINGS);
  const [adminOpen, setAdminOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState(null);
  const [pwPrompt, setPwPrompt] = useState(false);
  const [pwVal, setPwVal] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const toastRef = useRef(null);
  const ADMIN_PASSWORD = "laura2025";

  // Keyboard shortcut: Ctrl+Shift+A anywhere
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") { e.preventDefault(); setPwPrompt(true); setPwVal(""); setPwErr(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const tryPassword = () => {
    if (pwVal === ADMIN_PASSWORD) { setPwPrompt(false); setAdminOpen(true); setPwErr(false); }
    else { setPwErr(true); setPwVal(""); }
  };

  useEffect(()=>{ (async()=>{ try{ const r=await window.storage.get("listings"); if(r?.value) setListings(JSON.parse(r.value)); }catch{} })(); },[]);

  const updateListings = async(next)=>{ setListings(next); try{await window.storage.set("listings",JSON.stringify(next));}catch{} showToast("Guardado ✓"); };
  const showToast = (msg)=>{ setToast(msg); clearTimeout(toastRef.current); toastRef.current=setTimeout(()=>setToast(""),2200); };

  const applyFilters = (f) => {
    setFilters(f);
    // scroll to listings
    setTimeout(()=>{ const el=document.getElementById("propiedades"); if(el) el.scrollIntoView({behavior:"smooth"}); }, 50);
  };

  const visibleListings = filters ? listings.filter(l => {
    const price = parseFloat((l.precio||"").replace(/[^0-9.]/g,"")) || 0;
    const desde = parseFloat((filters.desde||"").replace(/[^0-9.]/g,"")) || 0;
    const hasta = parseFloat((filters.hasta||"").replace(/[^0-9.]/g,"")) || Infinity;
    const tipoMatch = filters.tipo === "Todos" || l.tipo.toLowerCase().includes(filters.tipo.toLowerCase().replace(" - ","/").replace("casa - chalet","casa").split(" ")[0]);
    const opMatch = l.etiqueta?.toLowerCase() === filters.op.toLowerCase();
    const ciudadMatch = filters.ciudad === "Todas" || l.ciudad === filters.ciudad;
    const dormMatch = filters.dorm === "Cualquier cant." || (l.dorm && (filters.dorm === "5+" ? parseInt(l.dorm)>=5 : parseInt(l.dorm)===parseInt(filters.dorm)));
    const cocheraMatch = !filters.cochera || !!l.cochera;
    const creditoMatch = !filters.credito || (l.tag||"").toLowerCase().includes("crédito");
    return opMatch && tipoMatch && ciudadMatch && dormMatch && cocheraMatch && creditoMatch && price >= desde && price <= hasta;
  }) : listings;

  if (selected) {
    return (
      <>
        <style>{CSS}</style>
        <nav className="nav">
          <a href="#" className="nav-brand" onClick={e=>{e.preventDefault();setSelected(null);}}>
            <LogoIcon variant="purple" size={0.28} style={{marginBottom:4}}/>
            <div className="nav-brand-text">Laura Chavarri<span>Propiedades</span></div>
          </a>
          <ul className="nav-links">
            <li><a href="#" onClick={e=>{e.preventDefault();setSelected(null);}}>Propiedades</a></li>
            <li><a href="#" onClick={e=>{e.preventDefault();setSelected(null);}}>Inicio</a></li>
          </ul>
          <div className="nav-right">
            <a href="https://wa.me/5492236856703" className="btn-nav" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </nav>
        <ListingPage p={selected} listings={listings} onBack={()=>setSelected(null)} onSelect={setSelected}/>
        <a href="https://wa.me/5492236856703" className="wa" target="_blank" rel="noreferrer">{Ic.wa}</a>
        {toast && <div className="toast">{toast}</div>}
        {adminOpen && <AdminDrawer listings={listings} onClose={()=>setAdminOpen(false)} onChange={updateListings}/>}
        {pwPrompt && <PasswordModal val={pwVal} setVal={setPwVal} err={pwErr} onSubmit={tryPassword} onClose={()=>setPwPrompt(false)}/>}
      </>
    );
  }

  const heroImgs = [
    "https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_3636527_enc.jpg",
    "https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_3700128_enc.jpg",
    "https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_6012703_enc.jpg",
  ];

  return (
    <>
      <style>{CSS}</style>

      {/* NAV — icon + wordmark */}
      <nav className="nav">
        <a href="#" className="nav-brand">
          <LogoIcon variant="purple" size={0.28} style={{marginBottom:4}}/>
          <div className="nav-brand-text">Laura Chavarri<span>Propiedades</span></div>
        </a>
        <ul className="nav-links">
          <li><a href="#propiedades">Propiedades</a></li>
          <li><a href="#nosotros">Quiénes somos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <div className="nav-right">
          <a href="https://wa.me/5492236856703" className="btn-nav" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </nav>

      {/* HERO — full width, no photo mosaic */}
      <section className="hero" style={{gridTemplateColumns:"1fr",minHeight:"62vh",overflow:"visible"}}>
        <div className="hero-left" style={{position:"relative",padding:"100px 15vw 80px"}}>
          <div style={{position:"absolute",top:-60,right:-20,pointerEvents:"none",overflow:"visible"}}>
            <LogoIcon variant="white" size={7} opacity={0.07}/>
          </div>
          <p className="eyebrow">Mar del Plata · Desde 1999</p>
          <h1 className="hero-title">Tu <em>propiedad ideal</em><br/>en Mar del Plata</h1>
          <p className="hero-sub">Más de 25 años de experiencia en compraventa de inmuebles residenciales y comerciales en Mar del Plata y la región.</p>
          <div className="hero-btns">
            <a href="#propiedades" className="btn-primary" onClick={e=>{e.preventDefault();document.getElementById("propiedades")?.scrollIntoView({behavior:"smooth"})}}>Ver propiedades</a>
            <a href="#contacto" className="btn-ghost" onClick={e=>{e.preventDefault();document.getElementById("contacto")?.scrollIntoView({behavior:"smooth"})}}>Contáctenos</a>
          </div>
          <div className="hero-stats">
            <div><div className="stat-n">25+</div><div className="stat-l">Años de trayectoria</div></div>
            <div><div className="stat-n">500+</div><div className="stat-l">Propiedades vendidas</div></div>
          </div>
        </div>
      </section>

      {/* PROPERTIES HEADING + SEARCH */}
      <section className="section" id="propiedades" style={{paddingBottom:0}}>
        <div className="sec-head">
          <div>
            <div className="eyebrow" style={{marginBottom:10}}>Publicaciones activas</div>
            <h2 className="sec-title">Propiedades <em>destacadas</em></h2>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:20}}>
            {filters && <span style={{fontSize:11,color:"var(--mid)"}}>{visibleListings.length} resultado{visibleListings.length!==1?"s":""} · <button onClick={()=>setFilters(null)} style={{border:"none",background:"none",color:"var(--purple)",cursor:"pointer",fontSize:11,padding:0,textDecoration:"underline"}}>limpiar</button></span>}
            <a href="https://laurachavarripropiedades.com/propiedad-en-venta.html" className="link-all" target="_blank" rel="noreferrer">Ver todas →</a>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <SearchBar onSearch={applyFilters} />

      {/* SECTION DIVIDER with icon */}
      <div className="sec-divider" style={{padding:"32px 72px"}}>
        <div className="sec-divider-line"/>
        <LogoIcon variant="white" size={0.18}/>
        <div className="sec-divider-line"/>
      </div>

      {/* PROPERTY GRID */}
      <section className="section" style={{paddingTop:0}}>
        {visibleListings.length === 0
          ? <div style={{padding:"48px 0",textAlign:"center",color:"var(--mid)",fontSize:14}}>No se encontraron propiedades con estos filtros.</div>
          : <div className="prop-grid">{visibleListings.map((p,i)=><Card key={p.id} p={p} wide={i===0} onSelect={setSelected}/>)}</div>
        }
      </section>

      {/* PURPLE BAND with flipped icons */}
      <div className="purple-band">
        <div className="pb-left">
          <div className="pb-title">¿Querés vender o <em>tasar tu propiedad?</em></div>
          <div className="pb-sub">Contamos con más de 25 años de experiencia en el mercado. Contactanos y te asesoramos sin compromiso.</div>
        </div>
        <div className="pb-icons">
          <LogoIcon variant="white" size={0.38} opacity={0.25}/>
          <LogoIcon variant="white" size={0.48} opacity={0.45}/>
          <LogoIcon variant="white" size={0.38} opacity={0.25}/>
        </div>
        <a href="#contacto" className="pb-btn">Consultanos</a>
      </div>

      {/* ABOUT */}
      <section className="section grey" id="nosotros">
        <div className="about">
          <div>
            <div className="eyebrow" style={{marginBottom:14}}>Quiénes somos</div>
            <h2 className="sec-title" style={{marginBottom:24}}>Un legado de <em>confianza</em><br/>en Mar del Plata</h2>
            <p className="about-body">Somos una empresa dedicada a la comercialización de inmuebles con más de 25 años de trayectoria en la ciudad, especializados en compraventa y locación en Mar del Plata y la zona.</p>
            <a href="#contacto" className="btn-primary">Hablemos</a>
          </div>
          <div style={{position:"relative"}}>
            <div className="about-imgs">
              <div className="about-img tall"><img src="https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_8516029_enc.jpg" alt="Mar del Plata"/></div>
              <div className="about-img"><img src="https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_4188007_enc.jpg" alt="propiedad"/></div>
              <div className="about-img"><img src="https://inmobiliaticastorage.blob.core.windows.net/imagenes-propiedades/Files/250202/Sliders/2_1_7974175_enc.jpg" alt="propiedad"/></div>
            </div>
            {/* Flipped colour icon overlapping the image grid */}
            <div style={{position:"absolute",bottom:-16,left:-16,zIndex:2}}>
              <LogoIcon variant="white" size={0.45}/>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contacto">
        <div className="contact">
          <div>
            <div className="eyebrow" style={{marginBottom:14}}>Contacto</div>
            <h2 className="sec-title">Encontremos<br/>su <em>propiedad ideal</em></h2>
            <div className="ci-list">
              <div className="ci"><div className="ci-icon">{Ic.pin}</div><div><div className="ci-lbl">Dirección</div><div className="ci-val">Hipólito Yrigoyen 1377<br/>Mar del Plata, Buenos Aires</div></div></div>
              <div className="ci"><div className="ci-icon">{Ic.tel}</div><div><div className="ci-lbl">Teléfono</div><div className="ci-val"><a href="tel:+540223496413">(0223) 496-4136</a></div></div></div>
              <div className="ci"><div className="ci-icon">{Ic.msg}</div><div><div className="ci-lbl">WhatsApp</div><div className="ci-val"><a href="https://wa.me/5492236856703" target="_blank" rel="noreferrer">+54 9 223 685-6703</a></div></div></div>
              <div className="ci"><div className="ci-icon">{Ic.mail}</div><div><div className="ci-lbl">Email</div><div className="ci-val"><a href="mailto:laurachavarripropiedades@hotmail.com">laurachavarripropiedades@hotmail.com</a></div></div></div>
            </div>
          </div>
          <ContactForm/>
        </div>
      </section>

      {/* FOOTER — large faded watermark bottom-right */}
      <footer>
        <div className="ft-watermark" style={{position:"absolute",bottom:0,right:-10,opacity:.06}}>
          <LogoIcon variant="purple" size={1.4}/>
        </div>
        <div className="ft">
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div className="ft-brand">Laura Chavarri</div>
              <LogoIcon variant="white" size={0.27} opacity={0.85}/>
            </div>
            <div className="ft-desc">Más de 25 años de experiencia en el mercado inmobiliario de Mar del Plata. Dedicados a ayudar a nuestros clientes a encontrar, comprar y vender propiedades con profesionalismo.</div>
            <div style={{display:"flex",gap:10,marginTop:16}}>
              <a href="https://www.instagram.com/laurachavarripropiedades/" target="_blank" rel="noreferrer" style={{width:34,height:34,border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"#888",textDecoration:"none",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.borderColor="#C49DDD";e.currentTarget.style.color="#C49DDD"}} onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.color="#888"}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.facebook.com/laurachavarripropiedades" target="_blank" rel="noreferrer" style={{width:34,height:34,border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"#888",textDecoration:"none",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.borderColor="#C49DDD";e.currentTarget.style.color="#C49DDD"}} onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.color="#888"}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://wa.me/5492236856703" target="_blank" rel="noreferrer" style={{width:34,height:34,border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"#888",textDecoration:"none",transition:"all .2s"}} onMouseOver={e=>{e.currentTarget.style.borderColor="#C49DDD";e.currentTarget.style.color="#C49DDD"}} onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.color="#888"}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <div className="ft-col-t">Navegación</div>
            <ul className="ft-links">
              <li><a href="#">Inicio</a></li>
              <li><a href="#propiedades">Propiedades en venta</a></li>
              <li><a href="#nosotros">Quiénes somos</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          <div>
            <div className="ft-col-t">Tipos de propiedad</div>
            <ul className="ft-links">
              <li><a href="https://laurachavarripropiedades.com/departamento-en-venta.html" target="_blank" rel="noreferrer">Departamentos</a></li>
              <li><a href="https://laurachavarripropiedades.com/casa-chalet-en-venta.html" target="_blank" rel="noreferrer">Casas / Chalets</a></li>
              <li><a href="https://laurachavarripropiedades.com/ph-en-venta.html" target="_blank" rel="noreferrer">PH</a></li>
              <li><a href="https://laurachavarripropiedades.com/terreno-en-venta.html" target="_blank" rel="noreferrer">Terrenos</a></li>
              <li><a href="https://laurachavarripropiedades.com/hotel-en-venta.html" target="_blank" rel="noreferrer">Hoteles</a></li>
            </ul>
          </div>
          <div>
            <div className="ft-col-t">Dónde estamos</div>
            <div style={{position:"relative",width:"100%",height:160,overflow:"hidden",border:"1px solid rgba(255,255,255,.08)",marginBottom:10}}>
              <iframe
                title="Oficina"
                width="100%" height="100%"
                style={{border:0,display:"block",filter:"grayscale(1) invert(0.9) contrast(1.1) brightness(0.55)"}}
                loading="lazy"
                src="https://maps.google.com/maps?q=Hip%C3%B3lito+Yrigoyen+1377%2C+Mar+del+Plata%2C+Buenos+Aires%2C+Argentina&output=embed&z=16"
              />
            </div>
            <div style={{fontSize:11,color:"#555",lineHeight:1.7}}>Hipólito Yrigoyen 1377, Mar del Plata</div>
            <a href="https://maps.google.com/?q=Hip%C3%B3lito+Yrigoyen+1377,+Mar+del+Plata" target="_blank" rel="noreferrer"
              style={{fontSize:10,letterSpacing:".08em",textTransform:"uppercase",color:"#7B35A0",textDecoration:"none",marginTop:4,display:"inline-block",opacity:.8}}>
              Cómo llegar →
            </a>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">© 2025 Laura Chavarri Propiedades. Todos los derechos reservados.</div>
          <div className="ft-city">Mar del Plata, Argentina</div>
        </div>
      </footer>

      <a href="https://wa.me/5492236856703" className="wa" target="_blank" rel="noreferrer">{Ic.wa}</a>

      {adminOpen && <AdminDrawer listings={listings} onClose={()=>setAdminOpen(false)} onChange={updateListings}/>}
      {pwPrompt && <PasswordModal val={pwVal} setVal={setPwVal} err={pwErr} onSubmit={tryPassword} onClose={()=>setPwPrompt(false)}/>}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
