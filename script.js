:root{
  --bg:#0f1720; --card:#0b1220; --muted:#bfcbd6; --accent:#4da3ff;
  --glass: rgba(255,255,255,0.03);
}
*{box-sizing:border-box;margin:0;padding:0}
body{
  font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background:var(--bg); color:#fff; line-height:1.6;
}

/* NAV */
.navbar{
  position:fixed; top:0; left:0; right:0; height:64px;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 20px; background:linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0.2));
  backdrop-filter: blur(6px); z-index:100;
  border-bottom:1px solid rgba(255,255,255,0.03);
}
.brand{font-weight:700; font-size:18px; color:var(--accent)}
.nav-desktop a{
  margin-left:18px; text-decoration:none; color:var(--muted); font-weight:600;
}
.nav-desktop a:hover{color: #fff; text-decoration:underline}
.hamburger{display:none; background:transparent; border:0; color:#fff; font-size:22px; cursor:pointer}

/* mobile menu */
.mobile-menu{
  position:fixed; right:20px; top:74px; background:var(--card); padding:12px 10px; border-radius:10px;
  box-shadow:0 8px 30px rgba(2,6,23,0.6); z-index:110;
}
.mobile-menu a{display:block; padding:8px 6px; color:var(--muted); text-decoration:none; font-weight:700}
.mobile-menu a:hover{color:#fff}
.hidden{display:none}

/* HERO */
.hero{
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  gap:40px; padding:110px 24px 60px 24px;
}
.hero-left{flex:1; max-width:700px}
.small-title{color:var(--accent); letter-spacing:2px; font-weight:700}
.big-title{font-size:48px; margin-top:14px; color:#fff}
.tagline{margin-top:16px; color:var(--muted); font-size:18px}
.hero-cta{margin-top:18px}
.btn{display:inline-block; background:var(--accent); color:#000; padding:10px 16px; border-radius:8px; font-weight:700; text-decoration:none; margin-right:10px}
.btn-outline{display:inline-block; border:2px solid var(--accent); color:var(--accent); padding:8px 14px; border-radius:8px; text-decoration:none; font-weight:700}

/* profile image */
.hero-right{flex:1; display:flex; justify-content:center}
.profile-photo{width:320px; height:320px; object-fit:cover; border-radius:18px; border:6px solid rgba(255,255,255,0.04); box-shadow:0 10px 40px rgba(2,6,23,0.7)}

/* sections */
.section{padding:80px 20px}
.section.alt{background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0));}
.container{max-width:1100px; margin:0 auto}
.section h2{font-size:32px; color:var(--accent); margin-bottom:14px}
.section p{color:var(--muted); font-size:17px}

/* skills */
.skills-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; list-style:none}
.skills-grid li{background:var(--glass); padding:14px; border-radius:10px; color:var(--muted); font-weight:700; border:1px solid rgba(255,255,255,0.03)}

/* lists */
.bullet-list li{margin:8px 0; color:var(--muted); font-weight:600}

/* projects */
.projects-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px}
.project-card{background:var(--card); padding:16px; border-radius:12px; border:1px solid rgba(255,255,255,0.03)}
.project-card h3{color:#fff; margin-bottom:8px}
.project-card p{color:var(--muted)}

/* footer */
.footer{padding:24px; text-align:center; color:var(--muted); border-top:1px solid rgba(255,255,255,0.02)}

/* responsive */
@media (max-width:900px){
  .nav-desktop{display:none}
  .hamburger{display:block}
  .hero{flex-direction:column-reverse; padding-top:90px}
  .profile-photo{width:220px;height:220px}
}
