/* ============================================================
   CyberGuard AI — main.js v2.0
   ============================================================ */

/* ---- NAV SCROLL ---- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 10);
}, {passive:true});

/* ---- HAMBURGER ---- */
function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  const h = document.getElementById('hamburger');
  if (!m || !h) return;
  m.classList.toggle('open'); h.classList.toggle('open');
}
document.addEventListener('click', e => {
  const m = document.getElementById('mobileMenu');
  const h = document.getElementById('hamburger');
  if (m?.classList.contains('open') && !m.contains(e.target) && !h?.contains(e.target)) {
    m.classList.remove('open'); h?.classList.remove('open');
  }
});

/* ---- ACTIVE NAV ---- */
(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

/* ---- SCROLL REVEAL ---- */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.1, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);

/* ---- ANIMATED COUNTER ---- */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const update = now => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 4);
    const value = isFloat ? (ease * target).toFixed(1) : Math.round(ease * target);
    el.textContent = el.dataset.prefix + value + el.dataset.suffix;
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseFloat(el.dataset.target);
        if (!isNaN(target)) animateCounter(el, target);
        obs.unobserve(el);
      }
    });
  }, {threshold:0.5});
  document.querySelectorAll('[data-target]').forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initCounters);

/* ---- RIPPLE EFFECT ON BUTTONS ---- */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-primary, .btn-outline, .btn-success, .btn-danger, .nav-cta, .tool-submit');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const r = document.createElement('span');
  r.className = 'ripple-wave';
  const size = Math.max(rect.width, rect.height);
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
  btn.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
});

/* ---- TABS ---- */
function switchTab(id, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById('tab-' + id);
  if (el) { el.classList.add('active'); el.querySelectorAll('.reveal').forEach(r => r.classList.add('visible')); }
}

/* ---- TOOL TABS ---- */
function switchTool(id, clickedEl) {
  document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.th-card').forEach(c => c.classList.remove('active'));
  document.getElementById('panel-' + id)?.classList.add('active');
  if (clickedEl) clickedEl.classList.add('active');
}

/* ============================================================
   CANVAS BACKGROUNDS — context-aware per page type
   ============================================================ */

/* HOME — neural network */
function initHeroCanvas(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], raf;
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    spawnNodes();
  }
  function spawnNodes() {
    nodes = [];
    const n = Math.min(100, Math.floor(W*H/10000));
    for (let i = 0; i < n; i++) {
      nodes.push({
        x:Math.random()*W, y:Math.random()*H,
        vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
        r:Math.random()*1.8+.6,
        c:Math.random() > .7 ? '#7b2ff7' : '#00f0ff'
      });
    }
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    // Grid
    ctx.strokeStyle='rgba(0,210,255,0.05)'; ctx.lineWidth=1;
    for(let x=0;x<W;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=64){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    // Edges
    for(let i=0;i<nodes.length;i++) {
      for(let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<160) {
          const alpha=.18*(1-d/160);
          ctx.strokeStyle=`rgba(0,240,255,${alpha})`; ctx.lineWidth=.6;
          ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();
        }
      }
    }
    // Nodes
    nodes.forEach(n => {
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0||n.x>W) n.vx*=-1;
      if(n.y<0||n.y>H) n.vy*=-1;
      ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle=n.c+'99'; ctx.fill();
      ctx.beginPath();ctx.arc(n.x,n.y,n.r+3,0,Math.PI*2);
      ctx.strokeStyle=n.c+'22'; ctx.lineWidth=1; ctx.stroke();
    });
    raf=requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize', ()=>{cancelAnimationFrame(raf);resize();draw();}, {passive:true});
}

/* DETECTION PAGE — radar sweep */
function initRadarCanvas(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, angle=0, blips=[], raf;
  function resize() { W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; }
  function draw() {
    ctx.clearRect(0,0,W,H);
    const cx=W/2, cy=H/2, maxR=Math.min(W,H)*0.42;
    // Rings
    for(let r=maxR/4;r<=maxR;r+=maxR/4){
      ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(0,240,255,0.07)';ctx.lineWidth=1;ctx.stroke();
    }
    // Cross
    ctx.strokeStyle='rgba(0,240,255,0.06)';
    ctx.beginPath();ctx.moveTo(cx,cy-maxR);ctx.lineTo(cx,cy+maxR);ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx-maxR,cy);ctx.lineTo(cx+maxR,cy);ctx.stroke();
    // Sweep
    const grad=ctx.createConicalGradient?null:null;
    ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);
    const sweep=ctx.createLinearGradient(0,0,maxR,0);
    sweep.addColorStop(0,'rgba(0,240,255,0.18)');sweep.addColorStop(1,'rgba(0,240,255,0)');
    ctx.beginPath();ctx.moveTo(0,0);
    ctx.arc(0,0,maxR,-Math.PI/10,0);
    ctx.closePath();ctx.fillStyle=sweep;ctx.fill();
    ctx.restore();
    // Blips
    blips=blips.filter(b=>b.life>0);
    blips.forEach(b=>{
      b.life-=2;
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,255,159,${b.life/100})`;ctx.fill();
    });
    if(Math.random()<.04){
      const a=Math.random()*Math.PI*2, r=Math.random()*maxR*.85;
      blips.push({x:cx+Math.cos(a)*r, y:cy+Math.sin(a)*r, r:Math.random()*3+2, life:80+Math.random()*60});
    }
    angle+=0.012;
    raf=requestAnimationFrame(draw);
  }
  resize();draw();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw();},{passive:true});
}

/* USECASES — matrix code rain */
function initMatrixCanvas(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,cols,drops=[],raf;
  const chars='01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
  function resize(){
    W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;
    cols=Math.floor(W/18);drops=Array(cols).fill(0).map(()=>Math.random()*H/16|0);
  }
  function draw(){
    ctx.fillStyle='rgba(1,12,26,0.06)';ctx.fillRect(0,0,W,H);
    ctx.font='13px monospace';
    drops.forEach((y,i)=>{
      const c=chars[Math.floor(Math.random()*chars.length)];
      const x=i*18;
      ctx.fillStyle=y<3?'rgba(0,255,159,0.9)':'rgba(0,240,255,0.18)';
      ctx.fillText(c,x,y*16);
      if(y*16>H&&Math.random()>.97) drops[i]=0; else drops[i]++;
    });
    raf=requestAnimationFrame(draw);
  }
  resize();draw();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw();},{passive:true});
}

/* CHALLENGES — particle storm (red) */
function initStormCanvas(id) {
  const canvas=document.getElementById(id);
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,particles=[],raf;
  function resize(){
    W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;spawnParticles();
  }
  function spawnParticles(){
    particles=[];
    for(let i=0;i<60;i++){
      particles.push({
        x:Math.random()*W,y:Math.random()*H,
        vx:(Math.random()-.5)*1.2,vy:(Math.random()-.5)*1.2,
        r:Math.random()*2+.5,
        hue:Math.random()>0.6?'rgba(255,62,108,' : 'rgba(255,94,26,',
        alpha:Math.random()*.5+.1
      });
    }
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.hue+p.alpha+')';ctx.fill();
    });
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ctx.strokeStyle=`rgba(255,62,108,${.08*(1-d/120)})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();}
      }
    }
    raf=requestAnimationFrame(draw);
  }
  resize();draw();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw();},{passive:true});
}

/* BEST PRACTICES — hex grid */
function initHexCanvas(id) {
  const canvas=document.getElementById(id);
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,raf,t=0;
  function hex(x,y,r,fill){
    ctx.beginPath();
    for(let i=0;i<6;i++){const a=(i*60-30)*Math.PI/180;ctx.lineTo(x+r*Math.cos(a),y+r*Math.sin(a));}
    ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill();}
  }
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  function draw(){
    ctx.clearRect(0,0,W,H);
    const r=40,dx=r*Math.sqrt(3),dy=r*1.5;
    const cols=Math.ceil(W/dx)+2,rows=Math.ceil(H/dy)+2;
    t+=0.01;
    for(let row=-1;row<rows;row++){
      for(let col=-1;col<cols;col++){
        const x=col*dx+(row%2)*dx/2;const y=row*dy;
        const d=Math.sin(t+col*0.4+row*0.4);
        const alpha=0.03+Math.abs(d)*0.05;
        ctx.strokeStyle=`rgba(0,255,159,${alpha})`;ctx.lineWidth=1;
        hex(x,y,r-2,null);ctx.stroke();
        if(Math.abs(d)>.85){hex(x,y,4,`rgba(0,255,159,${alpha*3})`);}
      }
    }
    raf=requestAnimationFrame(draw);
  }
  resize();draw();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw();},{passive:true});
}

/* TOOLS PAGE — circuit board */
function initCircuitCanvas(id) {
  const canvas=document.getElementById(id);
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,lines=[],raf,t=0;
  function resize(){
    W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;buildCircuit();
  }
  function buildCircuit(){
    lines=[];
    const grid=80;
    for(let x=0;x<W;x+=grid){
      for(let y=0;y<H;y+=grid){
        if(Math.random()>.55){
          const horiz=Math.random()>.5;
          lines.push({x1:x,y1:y,x2:horiz?x+grid:x,y2:horiz?y:y+grid,t:Math.random()*100});
        }
        if(Math.random()>.7) lines.push({type:'dot',x,y});
      }
    }
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.4;
    lines.forEach(l=>{
      if(l.type==='dot'){ctx.beginPath();ctx.arc(l.x,l.y,2,0,Math.PI*2);ctx.fillStyle='rgba(123,47,247,0.18)';ctx.fill();return;}
      const pulse=Math.sin((t+l.t)*0.05);
      const alpha=0.04+Math.max(0,pulse)*0.12;
      ctx.strokeStyle=pulse>0.7?`rgba(0,240,255,${alpha*3})`:`rgba(123,47,247,${alpha})`;
      ctx.lineWidth=pulse>0.7?1.5:1;
      ctx.beginPath();ctx.moveTo(l.x1,l.y1);ctx.lineTo(l.x2,l.y2);ctx.stroke();
    });
    raf=requestAnimationFrame(draw);
  }
  resize();draw();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw();},{passive:true});
}

/* LEARN PAGE — brain waves */
function initBrainCanvas(id) {
  const canvas=document.getElementById(id);
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,raf,t=0;
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.008;
    for(let i=0;i<6;i++){
      const freq=0.5+i*0.15,amp=18-i*2,offset=H*(0.3+i*0.07);
      ctx.beginPath();
      for(let x=0;x<W;x++){
        const y=offset+Math.sin(x*0.012*freq+t)*amp+Math.sin(x*0.02*freq+t*1.3)*amp*0.5;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      const alpha=0.04+i*0.015;
      ctx.strokeStyle=i%2===0?`rgba(0,240,255,${alpha})`:`rgba(123,47,247,${alpha*0.8})`;
      ctx.lineWidth=1;ctx.stroke();
    }
    raf=requestAnimationFrame(draw);
  }
  resize();draw();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw();},{passive:true});
}

/* ============================================================
   AI API + TOOLS
   ============================================================ */
async function callAI(sys, msg) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:sys,messages:[{role:'user',content:msg}]})
  });
  const d=await res.json();
  if(d.error) throw new Error(d.error.message);
  return d.content[0].text;
}
function parseJSON(t){return JSON.parse(t.replace(/```json|```/g,'').trim());}

const EXAMPLES={
  fraud:[
    "International wire of $3,200 to Romania at 2:30 AM. Card is registered in Nairobi, Kenya. Third transfer in 48 hours — previous two were $1,000 each.",
    "Five charges of $9.99 each within 15 minutes: AppStore, GooglePlay, NetflixUS, SpotifyPR, AmazonDigital. Occurred at 11 PM. I did not initiate any of them.",
    "Single $4,800 charge at a luxury jewelry store in Dubai. Cardholder lives in Kisumu, Kenya and has never traveled internationally."
  ],
  spam:[
    "Subject: URGENT - KCB Account Suspended\nFrom: security@kcb-bank-verify.net\nYour account has been suspended. Verify within 24 hours: http://kcb-account-verify-secure.xyz/login. Enter your account number, PIN and M-Pesa number.",
    "SMS: Congratulations! You have won KES 500,000 in the Safaricom Lucky Draw. Send KES 2,500 processing fee to Paybill 123456 Account: PRIZE2024. Expires in 2 hours.",
    "Email: You qualify for a remote data entry job paying $800/week. No experience needed. Send $150 registration fee to jobs@dataentry-remote.info. Reply with your ID number and M-Pesa."
  ],
  product:[
    "Instagram seller (@iphone_deals_ke) selling iPhone 16 Pro Max 256GB brand new for KES 18,000. Normal price is KES 145,000. Wants M-Pesa before delivery. 200 followers, 2 months old account, no other posts.",
    "Website brandedshoesoutlet.co selling Nike Air Jordan 1 Retro for $45 (retail $180). Poor grammar, no physical address, no phone, only Western Union accepted.",
    "OLX seller offering 'genuine' Rolex Submariner for KES 50,000. Says it was a gift, needs quick cash. Second hand moves in smooth sweep. Cash on meetup only."
  ]
};
function setExample(type,idx){const el=document.getElementById(type+'-input');if(el)el.value=EXAMPLES[type][idx];}

function buildScanAnim(){
  return `<div class="scan-bars">${Array(7).fill('<div class="scan-bar"></div>').join('')}</div>`;
}

async function runFraud(){
  const input=document.getElementById('fraud-input')?.value?.trim();
  if(!input){alert('Please enter transaction details.');return;}
  const btn=document.getElementById('fraud-btn');
  const loading=document.getElementById('fraud-loading');
  const result=document.getElementById('fraud-result');
  btn.disabled=true;loading.innerHTML=buildScanAnim()+'Analyzing transaction patterns...';loading.classList.add('show');result.style.display='none';
  const sys=`You are an expert financial fraud analyst. Analyze the transaction and respond ONLY with valid JSON (no markdown):
{"riskLevel":"LOW|MEDIUM|HIGH","riskScore":0-100,"suspiciousIndicators":["..."],"safeIndicators":["..."],"recommendation":"...","verdict":"..."}`;
  try{
    const d=parseJSON(await callAI(sys,'Transaction:\n'+input));
    const lvl=d.riskLevel?.toLowerCase()||'high';
    const colors={low:'var(--c3)',medium:'var(--c5)',high:'var(--c4)'};
    const icons={low:'fa-circle-check',medium:'fa-circle-exclamation',high:'fa-circle-xmark'};
    const bdrColors={low:'rgba(0,255,159,.25)',medium:'rgba(255,184,48,.25)',high:'rgba(255,62,108,.3)'};
    result.innerHTML=`
      <div class="risk-meter">
        <div class="risk-label">Risk Assessment</div>
        <div class="risk-level ${lvl}"><i class="fas ${icons[lvl]}"></i> ${d.riskLevel} RISK</div>
        <div class="risk-bar-track"><div class="risk-bar-fill ${lvl}" style="width:0%" id="rfill"></div></div>
        <div style="display:flex;justify-content:space-between;margin-top:.5rem">
          <span style="font-size:.68rem;color:var(--txt3)">Score</span>
          <span style="font-family:'Orbitron',monospace;font-size:.8rem;color:${colors[lvl]}">${d.riskScore}/100</span>
        </div>
      </div>
      <div class="result-grid">
        <div class="result-section"><h4><i class="fas fa-triangle-exclamation" style="color:var(--c4);margin-right:.4rem"></i>Suspicious Indicators</h4>
          <ul class="result-list">${(d.suspiciousIndicators||[]).map(i=>`<li class="red">${i}</li>`).join('')||'<li style="color:var(--txt3)">None identified</li>'}</ul>
        </div>
        <div class="result-section"><h4><i class="fas fa-circle-check" style="color:var(--c3);margin-right:.4rem"></i>Safe Signals</h4>
          <ul class="result-list">${(d.safeIndicators||[]).map(i=>`<li class="green">${i}</li>`).join('')||'<li style="color:var(--txt3)">None identified</li>'}</ul>
        </div>
      </div>
      <div class="verdict-box" style="border:1px solid ${bdrColors[lvl]}">
        <i class="fas ${icons[lvl]} verdict-icon" style="color:${colors[lvl]}"></i>
        <div class="verdict-text"><h4>Recommendation</h4><p>${d.recommendation||''}</p><p style="margin-top:.5rem;font-size:.82rem;color:var(--txt2)">${d.verdict||''}</p></div>
      </div>`;
    result.style.display='block';
    setTimeout(()=>{const f=document.getElementById('rfill');if(f)f.style.width=d.riskScore+'%';},50);
  }catch(e){
    result.innerHTML=`<div class="verdict-box" style="border-color:rgba(255,62,108,.3)"><i class="fas fa-circle-xmark verdict-icon" style="color:var(--c4)"></i><div class="verdict-text"><h4>Analysis Error</h4><p style="color:var(--txt2)">Could not complete analysis. ${e.message||'Please try again.'}</p></div></div>`;
    result.style.display='block';
  }
  loading.classList.remove('show');btn.disabled=false;
}

async function runSpam(){
  const input=document.getElementById('spam-input')?.value?.trim();
  if(!input){alert('Please paste a message to analyze.');return;}
  const btn=document.getElementById('spam-btn');
  const loading=document.getElementById('spam-loading');
  const result=document.getElementById('spam-result');
  btn.disabled=true;loading.innerHTML=buildScanAnim()+'Scanning message content...';loading.classList.add('show');result.style.display='none';
  const sys=`You are a cybersecurity expert specializing in phishing and spam detection. Respond ONLY with valid JSON (no markdown):
{"classification":"LEGITIMATE|SPAM|PHISHING|SCAM","confidencePercent":0-100,"redFlags":["..."],"safeSignals":["..."],"explanation":"...","recommendation":"..."}`;
  try{
    const d=parseJSON(await callAI(sys,'Message:\n'+input));
    const cl={'LEGITIMATE':'legitimate','SPAM':'spam','PHISHING':'phishing','SCAM':'scam'}[d.classification]||'spam';
    const icons={legitimate:'fa-circle-check',spam:'fa-envelope-circle-check',phishing:'fa-fish',scam:'fa-skull-crossbones'};
    const bdr={legitimate:'rgba(0,255,159,.25)',spam:'rgba(255,184,48,.25)',phishing:'rgba(255,62,108,.3)',scam:'rgba(255,62,108,.3)'};
    result.innerHTML=`
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.2rem;flex-wrap:wrap">
        <span class="classification-badge ${cl}"><i class="fas ${icons[cl]||'fa-question'}"></i> ${d.classification}</span>
        <div class="confidence-row" style="margin:0"><div class="confidence-num">${d.confidencePercent}%</div><div class="confidence-label">Confidence<br>Score</div></div>
      </div>
      <div class="result-grid">
        <div class="result-section"><h4><i class="fas fa-triangle-exclamation" style="color:var(--c4);margin-right:.4rem"></i>Red Flags</h4>
          <ul class="result-list">${(d.redFlags||[]).map(i=>`<li class="red">${i}</li>`).join('')||'<li style="color:var(--txt3)">None found</li>'}</ul>
        </div>
        <div class="result-section"><h4><i class="fas fa-circle-check" style="color:var(--c3);margin-right:.4rem"></i>Safe Signals</h4>
          <ul class="result-list">${(d.safeSignals||[]).map(i=>`<li class="green">${i}</li>`).join('')||'<li style="color:var(--txt3)">None found</li>'}</ul>
        </div>
      </div>
      <div class="result-section" style="margin-bottom:1.2rem"><h4><i class="fas fa-brain" style="color:var(--c1);margin-right:.4rem"></i>AI Analysis</h4>
        <p style="font-size:.88rem;color:var(--txt);line-height:1.85">${d.explanation||''}</p>
      </div>
      <div class="verdict-box" style="border:1px solid ${bdr[cl]}">
        <i class="fas fa-shield-halved verdict-icon" style="color:${cl==='legitimate'?'var(--c3)':'var(--c4)'}"></i>
        <div class="verdict-text"><h4>What To Do</h4><p>${d.recommendation||''}</p></div>
      </div>`;
    result.style.display='block';
  }catch(e){
    result.innerHTML=`<div class="verdict-box" style="border-color:rgba(255,62,108,.3)"><i class="fas fa-circle-xmark verdict-icon" style="color:var(--c4)"></i><div class="verdict-text"><h4>Analysis Error</h4><p style="color:var(--txt2)">${e.message||'Please try again.'}</p></div></div>`;
    result.style.display='block';
  }
  loading.classList.remove('show');btn.disabled=false;
}

async function runProduct(){
  const input=document.getElementById('product-input')?.value?.trim();
  if(!input){alert('Please describe the product or deal.');return;}
  const btn=document.getElementById('product-btn');
  const loading=document.getElementById('product-loading');
  const result=document.getElementById('product-result');
  btn.disabled=true;loading.innerHTML=buildScanAnim()+'Evaluating product signals...';loading.classList.add('show');result.style.display='none';
  const sys=`You are a consumer protection expert and product authenticity analyst. Respond ONLY with valid JSON (no markdown):
{"authenticityScore":0-100,"verdict":"LIKELY AUTHENTIC|SUSPICIOUS|LIKELY COUNTERFEIT|PROBABLE SCAM","redFlags":["..."],"verificationSteps":["..."],"safetyTips":["..."],"summary":"..."}`;
  try{
    const d=parseJSON(await callAI(sys,'Product:\n'+input));
    const sc=d.authenticityScore||0;
    const vl=(d.verdict||'').toLowerCase();
    const color=vl.includes('authentic')?'var(--c3)':vl.includes('suspicious')?'var(--c5)':'var(--c4)';
    const cls=sc>=70?'low':sc>=40?'medium':'high';
    const bdr=sc>=70?'rgba(0,255,159,.25)':sc>=40?'rgba(255,184,48,.25)':'rgba(255,62,108,.3)';
    result.innerHTML=`
      <div class="risk-meter">
        <div class="risk-label">Authenticity Score</div>
        <div class="risk-level ${cls}" style="color:${color}"><i class="fas fa-magnifying-glass"></i> ${d.verdict}</div>
        <div class="risk-bar-track"><div class="risk-bar-fill ${cls}" style="width:0%;background:linear-gradient(90deg,${color},${color}88)" id="pfill"></div></div>
        <div style="display:flex;justify-content:space-between;margin-top:.5rem">
          <span style="font-size:.68rem;color:var(--txt3)">Authenticity</span>
          <span style="font-family:'Orbitron',monospace;font-size:.8rem;color:${color}">${sc}/100</span>
        </div>
      </div>
      <div class="result-section" style="margin-bottom:1.2rem"><h4><i class="fas fa-brain" style="color:var(--c1);margin-right:.4rem"></i>Assessment</h4>
        <p style="font-size:.88rem;color:var(--txt);line-height:1.85">${d.summary||''}</p>
      </div>
      <div class="result-grid">
        <div class="result-section"><h4><i class="fas fa-triangle-exclamation" style="color:var(--c4);margin-right:.4rem"></i>Red Flags</h4>
          <ul class="result-list">${(d.redFlags||[]).map(i=>`<li class="red">${i}</li>`).join('')||'<li style="color:var(--txt3)">None found</li>'}</ul>
        </div>
        <div class="result-section"><h4><i class="fas fa-list-check" style="color:var(--c1);margin-right:.4rem"></i>Verification Steps</h4>
          <ul class="result-list">${(d.verificationSteps||[]).map(i=>`<li class="green">${i}</li>`).join('')||'<li style="color:var(--txt3)">None available</li>'}</ul>
        </div>
      </div>
      <div class="verdict-box" style="border:1px solid ${bdr}">
        <i class="fas fa-shield-halved verdict-icon" style="color:${color}"></i>
        <div class="verdict-text"><h4>Safety Tips</h4>
          <ul style="list-style:none;display:grid;gap:.45rem">${(d.safetyTips||[]).map(t=>`<li style="font-size:.84rem;color:var(--txt2);display:flex;gap:.5rem"><span style="color:${color};margin-top:.1rem">&#9658;</span>${t}</li>`).join('')}</ul>
        </div>
      </div>`;
    result.style.display='block';
    setTimeout(()=>{const f=document.getElementById('pfill');if(f)f.style.width=sc+'%';},50);
  }catch(e){
    result.innerHTML=`<div class="verdict-box" style="border-color:rgba(255,62,108,.3)"><i class="fas fa-circle-xmark verdict-icon" style="color:var(--c4)"></i><div class="verdict-text"><h4>Analysis Error</h4><p style="color:var(--txt2)">${e.message||'Please try again.'}</p></div></div>`;
    result.style.display='block';
  }
  loading.classList.remove('show');btn.disabled=false;
}
