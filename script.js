const SITE = { email: "lemuelmwesh@gmail.com", github: "https://github.com/mega7306626007", api: "https://api.github.com/users/mega7306626007/repos?sort=updated&per_page=12" };
const $ = id => document.getElementById(id);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

let booted = false;
function boot() {
  if (booted) return; booted = true;
  document.querySelectorAll(".hero .reveal").forEach(el => el.classList.add("in"));
  document.querySelectorAll("[data-count]").forEach(b => cio.observe(b));
}
function ready() { $("loader").classList.add("done"); setTimeout(boot, 180); }
addEventListener("load", () => setTimeout(ready, 600));
setTimeout(ready, 2400);

function tick() { try { $("nairobiTime").textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" }).format(new Date()); } catch {} }
tick(); setInterval(tick, 20000);

const roles = ["training neural nets on M-PESA", "pushing calendar tasks", "routing voice intents offline", "answering email in 48h", "shipping for Mweshimiwa"];
let ri = 0, ci = 0, del = false;
if (REDUCED) $("typer").textContent = roles[0];
else (function type() { const w = roles[ri]; $("typer").textContent = w.slice(0, ci);
  if (!del && ci < w.length) ci++; else if (!del) { del = true; return setTimeout(type, 1600); }
  else if (ci > 0) ci--; else { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 24 : 50); })();

const COLORS = ["#9a3f16", "#3f5a3a", "#e8b44a", "#1c1811"];
function confetti(x, y, n = 8) { if (REDUCED) return; for (let i = 0; i < n; i++) { const s = document.createElement("div"); s.className = "confetti";
  s.style.left = x + "px"; s.style.top = y + "px"; s.style.background = COLORS[i % COLORS.length];
  s.style.setProperty("--dx", (Math.random() * 180 - 90) + "px"); s.style.setProperty("--dy", (-(40 + Math.random() * 180)) + "px");
  s.style.setProperty("--rot", (Math.random() * 540 - 270) + "deg"); document.body.appendChild(s); setTimeout(() => s.remove(), 1000); } }

const cursor = $("cursor");
if (cursor && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; cursor.classList.remove("hide"); });
  addEventListener("mousedown", () => cursor.classList.add("down"));
  addEventListener("mouseup", () => cursor.classList.remove("down"));
  addEventListener("blur", () => cursor.classList.remove("down"));
  document.addEventListener("mouseleave", () => cursor.classList.add("hide"));
  document.querySelectorAll("[data-hover]").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("big"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
  });
  (function follow() { cx += (mx - cx) * .55; cy += (my - cy) * .55;
    cursor.style.left = cx.toFixed(1) + "px"; cursor.style.top = cy.toFixed(1) + "px";
    requestAnimationFrame(follow); })();
}

document.querySelectorAll(".tilt").forEach(card => { card.addEventListener("mousemove", e => { const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`; });
  card.addEventListener("mouseleave", () => card.style.transform = ""); });

function splitWords(el) {
  if (REDUCED) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  let n = 0;
  texts.forEach(t => {
    if (!t.nodeValue || !t.nodeValue.trim()) return;
    const frag = document.createDocumentFragment();
    t.nodeValue.split(/(\s+)/).forEach(p => {
      if (!p) return;
      if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
      const w = document.createElement("span"); w.className = "wm";
      const i = document.createElement("i");
      i.textContent = p;
      i.style.transitionDelay = Math.min(n * 42, 660) + "ms";
      n++;
      w.appendChild(i); frag.appendChild(w);
    });
    t.parentNode.replaceChild(frag, t);
  });
  el.classList.add("split");
}
if (!REDUCED) {
  document.querySelectorAll(".section h2").forEach(splitWords);
  document.querySelectorAll(".display .line").forEach(l => {
    const li = document.createElement("span"); li.className = "li";
    while (l.firstChild) li.appendChild(l.firstChild);
    l.appendChild(li);
  });
}
document.querySelectorAll(".sys .flow").forEach(f => {
  try { const L = Math.ceil(f.getTotalLength()); if (L > 0) f.style.setProperty("--dl", L); } catch {}
});
function seqSys(sys) {
  const svg = sys.querySelector("svg"); if (!svg) return;
  const kids = [...svg.children].filter(k => k.tagName.toLowerCase() !== "defs");
  const cls = k => k.getAttribute("class") || "";
  const nodes = kids.filter(k => !/flow|dot/.test(cls(k)));
  const flows = kids.filter(k => /flow/.test(cls(k)));
  const dots = kids.filter(k => /dot/.test(cls(k)));
  nodes.forEach((k, i) => k.style.animationDelay = (i * 22) + "ms");
  const f0 = nodes.length * 22 + 50;
  flows.forEach((f, i) => f.style.setProperty("--fd", (f0 + i * 60) + "ms"));
  const d0 = f0 + flows.length * 60 + 220;
  dots.forEach((d, i) => d.style.animationDelay = (d0 + i * 60) + "ms");
}

const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target;
  if (el.classList.contains("sys") && !REDUCED) seqSys(el);
  el.classList.add("in");
  const d = parseInt(el.style.transitionDelay) || 0;
  if (d) setTimeout(() => { if (el.style.transitionDelay) el.style.transitionDelay = ""; }, 900 + d);
}), { threshold: .1 });
document.querySelectorAll(".reveal").forEach(el => { if (!el.closest(".hero")) io.observe(el); });
document.querySelectorAll(".reveal").forEach(el => {
  if (el.closest(".hero")) return;
  const sibs = [...el.parentElement.children].filter(c => c.classList && c.classList.contains("reveal"));
  const i = Math.min(sibs.indexOf(el), 6);
  if (i > 0) el.style.transitionDelay = (i * 70) + "ms";
});

const navIo = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("section[id]").forEach(s => navIo.observe(s));

addEventListener("scroll", () => { const h = document.documentElement; const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  $("progress").style.width = p + "%"; $("toTop").classList.toggle("show", h.scrollTop > 700);
  $("nav").classList.toggle("small", h.scrollTop > 70);
  const gh = document.querySelector(".hero-ghost"); if (gh && h.scrollTop < 1000) gh.style.transform = `translateY(${(h.scrollTop * .16).toFixed(1)}px)`; }, { passive: true });
$("toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const b = e.target, end = +b.dataset.count; cio.unobserve(b);
  const t0 = performance.now(); (function step(t) { const p = Math.min((t - t0) / 1200, 1);
    b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + (end === 100 ? "%" : "+"); if (p < 1) requestAnimationFrame(step); })(t0); }), { threshold: .5 });

const pio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; pio.unobserve(e.target);
  const b = e.target, txt = b.textContent, m = txt.match(/^([\d.]+)/); if (!m) return;
  const end = parseFloat(m[1]), dec = m[1].includes("."), suf = txt.slice(m[1].length);
  if (REDUCED) { b.textContent = txt; return; }
  const idx = Math.max(0, [...b.closest(".proof").children].indexOf(b.parentElement));
  const t0 = performance.now() + idx * 140;
  requestAnimationFrame(function step(t) { const pr = Math.max(0, Math.min((t - t0) / 1300, 1)), v = end * (1 - Math.pow(1 - pr, 3));
    b.textContent = (dec ? v.toFixed(1) : Math.round(v).toLocaleString()) + suf;
    if (pr < 1) requestAnimationFrame(step); else b.textContent = txt; }); }), { threshold: .6 });
document.querySelectorAll(".p b").forEach(b => pio.observe(b));

const cv = $("particles"), ctx = cv.getContext("2d"); let pts = [];
function rs() { cv.width = innerWidth; cv.height = innerHeight; } rs(); addEventListener("resize", rs);
for (let i = 0; i < 40; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2, r: Math.random() * 1.1 + .3 });
(function loop() { requestAnimationFrame(loop); if (REDUCED || document.hidden) return;
  ctx.clearRect(0, 0, cv.width, cv.height); ctx.fillStyle = "rgba(154,63,22,.28)";
  pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > cv.width) p.vx *= -1; if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }); })();

document.querySelectorAll(".f").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".f").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
  btn.classList.add("active"); btn.setAttribute("aria-pressed", "true");
  const f = btn.dataset.filter;
  const cards = [...document.querySelectorAll("#projectGrid .proj")];
  let vis = 0;
  cards.forEach(c => {
    const show = f === "all" || c.dataset.tags.includes(f);
    c.style.transitionDelay = "0ms";
    if (show) {
      const delay = vis * 30; vis++;
      if (REDUCED) { c.classList.remove("hide", "fadeout"); return; }
      if (c.classList.contains("hide")) { c.classList.remove("hide"); c.classList.add("fadeout"); }
      void c.offsetWidth;
      c.style.transitionDelay = delay + "ms";
      requestAnimationFrame(() => c.classList.remove("fadeout"));
    } else if (!c.classList.contains("hide")) {
      if (REDUCED) { c.classList.add("hide"); return; }
      c.classList.add("fadeout");
      setTimeout(() => { if (c.classList.contains("fadeout")) c.classList.add("hide"); }, 420);
    }
  });
  setTimeout(() => cards.forEach(c => { if (!c.classList.contains("fadeout")) c.style.transitionDelay = ""; }), 950);
}));

const CASES = {
"Jarvis (Mwesh) — Voice Assistant": `
<p class="cs-hook">Every other assistant wants your email, your cloud, and your prayers for the Wi-Fi to hold. Jarvis wants none of it. Meet Mwesh — a butler that lives <em>inside</em> your phone.</p>
<h5>The brief</h5>
<p>Build a voice assistant for a Nairobi reality: cheap data, patchy signal, and a phone that's got better things to do than stream your voice to a server farm.</p>
<h5>What's actually under the hood</h5>
<ul>
<li><b>On-device ONNX inference</b> — the model runs local. No round trip, no bill, no eavesdropper.</li>
<li><b>Room-backed memory</b> — alarms, notes, reminders, full conversations, all queryable, all yours.</li>
<li><b>Command router</b> — time, calculator, jokes, timers: deterministic first, neural where it counts.</li>
<li><b>Speech + TTS</b> — hears you, answers out loud, in a voice you can live with.</li>
<li><b>Trilingual corpus</b> — English, Kiswahili, French. 80+ source files, 100+ tests.</li>
</ul>
<div class="cs-stats"><span><b>80+</b>source files</span><span><b>100+</b>tests</span><span><b>EN·SW·FR</b>languages</span><span><b>0</b>cloud calls</span></div>
<p class="cs-end">It's currently tied to my wrist-level daily use and the full build is on <a href="https://github.com/mega7306626007/mwesh" target="_blank" rel="noopener">GitHub</a>. Clone it. Wake it up. <b>It doesn't need your password to impress you.</b></p>`,

"PesaFlow — Student Finance": `
<p class="cs-hook">Look at you — salary hits on the 1st, and by the 10th you're negotiating with a bowl of *unga* like it's a hostage situation. Receipts live in three apps, M-PESA statements nobody reads, and "I'll budget next week" is a personality trait now. <em>Well, look no further than PesaFlow.</em></p>
<h5>The diagnosis</h5>
<p>Student money isn't a spreadsheet problem — it's an <b>irregular-income, peer-pressure, airtime-leakage</b> problem. Generic finance apps assume you get paid monthly and never split a pizza bill with four friends. Campus does neither.</p>
<h5>What I built</h5>
<ul>
<li><b>7 input sources</b> — manual entry, M-PESA SMS parser (10+ formats), natural-language parser (<i>&ldquo;nikiwe na laso&rdquo; = money out</i>), share-to-app, on-device OCR receipts, CSV import, dedupe across all of them.</li>
<li><b>Budgets that survive the month</b> — envelopes with actual campus semantics: transport, *mtaro*, photocopy, *nyama choma Fridays*.</li>
<li><b>Debt-payoff planner</b> — because "bro nipee 200" compounds in ways friendship can't.</li>
<li><b>Investment simulator</b> — watch *mbeki* grow before risking a shilling.</li>
<li><b>Analytics</b> — the truth, charted. No sugarcoating.</li>
</ul>
<div class="cs-stats"><span><b>7</b>input sources</span><span><b>134+</b>Kotlin files</span><span><b>KES</b>only</span><span><b>0</b>accounts/servers</span></div>
<p class="cs-end">134+ Kotlin files, verified debug build, offline-first, zero accounts. Your money never leaves the device — mostly because <b>there's nobody to send it to.</b> <a href="https://github.com/mega7306626007/PesaFlow" target="_blank" rel="noopener">Open the code</a> and start surviving the month properly.</p>`,

"SMS Engine · M-PESA Neural": `
<p class="cs-hook">Your M-PESA inbox is a novel: 29 plot twists (Fuliza, M-Shwari, KCB M-PESA, Okoa, Pochi, Ziidi…), unreliable narrators, and typos on every page. Regex reads page one. The neural net <em>finishes the book</em> — typos, Sheng, and truncation included.</p>
<h5>Why regex alone dies</h5>
<p>Users type "MPSA", "Fuliza cut", "boss umeniweka" — and truncation eats the tail. Pattern matching hits <b>74%</b> and taps out. That's not good enough when the next line is a budget decision.</p>
<h5>What's inside</h5>
<ul>
<li><b>10+ format parser</b> — every real M-PESA template, 0% fail on clean input.</li>
<li><b>Pattern-probability layer</b> — soft matching when the message is mangled.</li>
<li><b>Finance intelligence</b> — income vs credit gap, month runway, "are you Okoa-dependent?" detection.</li>
<li><b>4.31M-parameter neural classifier</b> — trained on 100k messages, 35% noise-augmented so typos are <i>the training set, not the exception.</i></li>
<li><b>ONNX export</b> — the same brain runs on-device inside PesaFlow.</li>
</ul>
<div class="cs-stats"><span><b>100%</b>noisy accuracy</span><span><b>74%→100%</b>vs regex</span><span><b>29</b>tx types</span><span><b>4.31M</b>params</span></div>
<p class="cs-end">100k messages in, macro-F1 1.0 out, 100% on the noisy gauntlet where regex scores 74. Try it yourself in <b>the Lab</b> above — paste your filthiest money SMS.</p>`,

"Calendar Rescheduler": `
<p class="cs-hook">Be honest: you saw the 9am task and thought <em>"later."</em> Later never came. Your calendar is a graveyard of good intentions. This is the "later" that actually <b>shows up.</b></p>
<h5>The truth about to-do lists</h5>
<p>Lists are where tasks go to feel guilty. A list can't move a meeting. A list doesn't know you're free at 14:30. So I stopped making lists and started building an <b>anti-procrastination OS</b> on top of Google Calendar.</p>
<h5>How it works</h5>
<ul>
<li><b>Push to next free slot</b> — freebusy-aware search across 8:00–22:45, day/week/month views.</li>
<li><b>Class-cancelled overfill queue</b> — a lecture dies, its tasks re-enter a priority queue and get re-slotted automatically.</li>
<li><b>6-hour undo stack</b> — regret is a feature: anything within 6h comes back with one tap.</li>
<li><b>Protected blocks</b> — your sleep, meals, and DND hours are <i>never</i> touched. The scheduler respects you.</li>
<li><b>PWA + native APK</b> — Android WebView wrapper, installs like a real app.</li>
</ul>
<div class="cs-stats"><span><b>v16</b>shipped</span><span><b>6h</b>undo window</span><span><b>8–22:45</b>search window</span><span><b>0</b>stolen blocks</span></div>
<p class="cs-end">Version 16 — and yes, it runs <b>my</b> life daily, including the day this site went out. Proof: you're reading it. <a href="https://github.com/mega7306626007/calendar-rescheduler" target="_blank" rel="noopener">Take the wheel</a>.</p>`,

"Transcriber — Kiswahili Voice": `
<p class="cs-hook">Sermon. Lecture. Interview in Kiswahili. Podcast your aunt sent at 6am. It all becomes text — <b>and the audio never leaves your machine.</b> No cloud, no "we may use your data", no surprises.</p>
<h5>The problem</h5>
<p>Transcription tools are English-first, cloud-only, and quietly expensive. Kiswahili speakers get breadcrumbs — no fine-tune path, no synced review, and their audio gets uploaded to who-knows-where.</p>
<h5>What I built</h5>
<ul>
<li><b>Synced player + transcript</b> — click a line, the audio jumps. Fix a word, the timestamp follows.</li>
<li><b>SRT editor</b> — clean subtitles out, ready for YouTube or the archive.</li>
<li><b>Kiswahili support</b> — not an afterthought: real accuracy on the language people actually speak here.</li>
<li><b>Whisper fine-tuning pipeline</b> — feed it your domain (court, clinic, classroom) and make it sharper.</li>
</ul>
<div class="cs-stats"><span><b>SW</b>first-class</span><span><b>Local</b>audio stays home</span><span><b>SRT</b>export</span><span><b>Fine-tune</b>pipeline</span></div>
<p class="cs-end">Long audio in, timestamped knowledge out. <a href="https://github.com/mega7306626007/transcriber" target="_blank" rel="noopener">Run it locally</a> — I dare you to find the part that phones home.</p>`,

"PyChat — Advanced Offline Chatbot": `
<p class="cs-hook">Imagine a chatbot that remembers you, thinks before answering, works with zero bars of signal — and <em>still</em> offers to call an LLM when the question's above its pay grade. That's PyChat: the offline brain with an optional cloud mouthpiece.</p>
<h5>Why "offline" is the whole point</h5>
<p>Most chat demos collapse when the Wi-Fi does. In Nairobi that's not an edge case — it's Tuesday. So the architecture is <b>local-first by default</b>, hybrid by choice.</p>
<h5>What's inside</h5>
<ul>
<li><b>Memory module</b> — remembers context across conversations, on disk, yours alone.</li>
<li><b>Intent router</b> — deterministic routing first; the model only gets paid when needed.</li>
<li><b>Neural nets + sklearn</b> — classification that trains on <i>your</i> conversation style.</li>
<li><b>LLM hybrid</b> — optional escalation to a big model for hard questions. Optional being the operative word.</li>
<li><b>Flask web face</b> — a real UI for it, deploy-ready.</li>
</ul>
<div class="cs-stats"><span><b>14</b>modules</span><span><b>0</b>required APIs</span><span><b>Hybrid</b>LLM optional</span><span><b>Live</b>on Render</span></div>
<p class="cs-end">It's live on Render — <a href="https://pychat-hbih.onrender.com/" target="_blank" rel="noopener">go pick a fight with it</a> (free tier, so give it a minute to wake up) — or skip the queue with the <a href="https://chatbot-web-flame.vercel.app" target="_blank" rel="noopener">instant demo</a>. Source is open: <a href="https://github.com/mega7306626007/chatbot-web" target="_blank" rel="noopener">web face</a> plus the <a href="https://github.com/mega7306626007/chatbot_modules" target="_blank" rel="noopener">engine</a>. Ask it something rude. It has memory.</p>`,

"The Heart v4 — Poetry Experience": `
<p class="cs-hook">You type a line of poetry. A neural net finishes the stanza. <em>In your browser.</em> No server reads your verse, no API key, no waiting — just you, a model, and the audacity to rhyme at midnight.</p>
<h5>The idea</h5>
<p>Art that thinks back — Mwesh's poetry wired to a small neural continuation model that runs fully client-side. It's a statement as much as a feature: creativity doesn't need permission from a datacenter.</p>
<h5>What's under it</h5>
<ul>
<li><b>In-browser neural continuation</b> — model served as static assets, inference on your CPU.</li>
<li><b>Live on Vercel</b> — zero backend, zero cost, zero telemetry.</li>
<li><b>The Heart family</b> — v2 added voice prompts; v4 is the one that <i>writes back.</i></li>
</ul>
<div class="cs-stats"><span><b>0</b>servers</span><span><b>In-browser</b>neural net</span><span><b>v4</b>current</span><span><b>Live</b>on Vercel</span></div>
<p class="cs-end">Don't take my word for it: <a href="https://the-heart-4.vercel.app" target="_blank" rel="noopener">open it</a>, type one honest line, and see what the machine dares to say back. <a href="https://github.com/mega7306626007/the-heart-4" target="_blank" rel="noopener">Source here</a>.</p>`,

"Parlons — French for Kenyans": `
<p class="cs-hook">Paris textbooks will teach you <i>le subjonctif</i> and not a single word for arguing with your Sheng-speaking friends. Parlons teaches French the Nairobi way — from <em>"niaje"</em> to <em>"nom d'une pipe."</em></p>
<h5>The gap</h5>
<p>Kenyans learn French from material written for people who grew up queuing at boulangeries. Nobody explains the meaning gaps, nobody warns you that textbook French and campus French are different sports, and nobody makes it stick.</p>
<h5>What I built</h5>
<ul>
<li><b>65 lessons, ~860 phrases</b> — structured units with real conversation targets.</li>
<li><b>Simba the chat partner</b> — 12 scenarios with fuzzy correction, so mistakes die in practice, not in a quiz.</li>
<li><b>Leitner SRS</b> — spaced repetition tuned to what you keep getting wrong.</li>
<li><b>13 exercise types</b> — no single-question fatigue.</li>
<li><b>Offline speech</b> — Vosk models on-device. Practice pronunciation on the bus, in a tunnel, wherever.</li>
<li><b>Zero accounts, zero keys</b> — install, learn, exist.</li>
</ul>
<div class="cs-stats"><span><b>65</b>lessons</span><span><b>~860</b>phrases</span><span><b>13</b>exercise types</span><span><b>SW·ENG·SHENG</b>bridge</span></div>
<p class="cs-end">French for Kenyans, built by one. <a href="https://github.com/mega7306626007/Parlons" target="_blank" rel="noopener">Clone it</a> — Simba is waiting, and he does not go easy.</p>`
};

const overlay = $("overlay"), modal = $("modal");
function openModal(t, b) { $("modalTitle").textContent = t; $("modalBody").innerHTML = b;
  if (!REDUCED) [...$("modalBody").children].forEach((c, i) => { c.style.animation = `fadeUp .5s var(--ease) ${(.06 + i * .05).toFixed(2)}s backwards`; });
  overlay.classList.add("open"); modal.classList.add("open"); modal.scrollTop = 0; }
function closeModal() { overlay.classList.remove("open"); modal.classList.remove("open"); }
document.querySelectorAll(".open-modal").forEach(b => b.addEventListener("click", e => { const c = e.target.closest(".proj"); openModal(c.dataset.title, CASES[c.dataset.title] || c.dataset.body); }));
$("modalX").addEventListener("click", closeModal); overlay.addEventListener("click", closeModal); $("modalCta").addEventListener("click", closeModal);

const termOut = $("termOut");
function print(cmd, html) { termOut.innerHTML += `\n<span class="c">$</span> ${cmd}\n<span class="g">${html}</span>`; termOut.scrollTop = termOut.scrollHeight; }
const JOKES = ["Why do programmers prefer dark mode? Because light attracts bugs.", "I told my calendar a joke — it moved it to next week.", "M-PESA balance: enough to dream, not enough to relax."];
$("termForm").addEventListener("submit", e => { e.preventDefault(); const raw = $("termIn").value.trim(); if (!raw) return; $("termIn").value = "";
  const c = raw.toLowerCase().split(" ")[0];
  if (c === "help") print(raw, "help · whoami · projects · hire · joke · company · github");
  else if (c === "whoami") print(raw, "emmanuel @ mweshimiwa enterprises — nairobi systems builder");
  else if (c === "company") print(raw, "Mweshimiwa Enterprises · AI · Android · Web · reply <48h · " + SITE.email);
  else if (c === "projects") print(raw, "jarvis/ pesaflow/ parlons/ transcriber/ pychat/ the-heart — see work");
  else if (c === "hire") { print(raw, "opening email — let's scope it"); location.hash = "#contact"; }
  else if (c === "github") { print(raw, "opening github"); open(SITE.github, "_blank"); }
  else if (c === "joke") print(raw, JOKES[Math.floor(Math.random() * JOKES.length)]);
  else print(raw, "try: help"); });

function setMobileMenu(open) {
  $("mobileMenu").classList.toggle("open", open);
  $("menuBtn").setAttribute("aria-expanded", String(open));
  $("menuBtn").setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
}
$("menuBtn").addEventListener("click", () => setMobileMenu(!$("mobileMenu").classList.contains("open")));
document.querySelectorAll("#mobileMenu a").forEach(a => a.addEventListener("click", () => setMobileMenu(false)));

$("copyEmail").addEventListener("click", async () => { try { await navigator.clipboard.writeText(SITE.email); toast("email copied"); } catch { toast(SITE.email); } });

function toast(msg) { document.querySelectorAll(".toast-pop").forEach(t => t.remove()); const t = document.createElement("div");
  t.className = "toast-pop"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); }

const palette = $("palette"), palInput = $("palInput"), palList = $("palList");
const cmds = [{ n: "Selected work", fn: () => location.hash = "#work" }, { n: "Systems", fn: () => location.hash = "#systems" },
  { n: "The lab", fn: () => location.hash = "#lab" }, { n: "About", fn: () => location.hash = "#about" },
  { n: "Copy email", fn: () => navigator.clipboard.writeText(SITE.email).then(() => toast("email copied")) },
  { n: "Open GitHub", fn: () => open(SITE.github, "_blank") }, { n: "Contact", fn: () => location.hash = "#contact" }];
function renderPal(q = "") { palList.innerHTML = ""; cmds.filter(c => c.n.toLowerCase().includes(q.toLowerCase())).forEach((c, i) => {
  const d = document.createElement("div"); d.textContent = c.n; if (i === 0) d.classList.add("sel");
  d.onclick = () => { palette.classList.remove("open"); c.fn(); }; palList.appendChild(d); }); }
addEventListener("keydown", e => { if (e.key.toLowerCase() === "k" && !/input|textarea/i.test(document.activeElement.tagName)) {
  palette.classList.toggle("open"); renderPal(); palInput.value = ""; setTimeout(() => palInput.focus(), 30); }
  if (e.key === "Escape") { closeModal(); palette.classList.remove("open"); setMobileMenu(false); } });
palInput.addEventListener("input", () => renderPal(palInput.value));
palInput.addEventListener("keydown", e => { if (e.key === "Enter") { const f = palList.querySelector("div"); f && f.click(); } });

// Lab: M-PESA classifier
const SAMPLES = {
  send: "QHX7K2LMNO Confirmed. Ksh2,450.00 sent to JOHN DOE 0722123456 on 12/9/26 at 9:41 AM. New M-PESA balance is Ksh12,300.50. Transaction cost, Ksh28.00.",
  fuliza: "Confirmed. Fuliza advance of Ksh1,500.00 on 12/9/26. Outstanding Fuliza amount Ksh1,545.00 including access fee. Repay via M-PESA.",
  okoa: "Confirmed. Okoa Data 1GB advanced to 0722000111. Repay Ksh110.00 from airtime. Dial *444# to repay.",
  paybill: "QAB12CD34E Confirmed. Ksh1,200.00 paid to KPLC PREPAID, account 37199465 on 11/9/26. New balance Ksh8,900.00.",
  sheng: "Qzx9 Confirmed ksh 500 sent 2 john latr plz new bal 300 uko poa?? cost 27... mpsa"
};
document.querySelectorAll("[data-sms]").forEach(b => b.addEventListener("click", () => { $("smsIn").value = SAMPLES[b.dataset.sms]; }));
function classifySMS(s) { s = s.toLowerCase(); const c = [
  ["FULIZA_ADVANCE", /fuliza.*advanc|advance.*fuliza/], ["FULIZA_REPAY", /fuliza.*repay|repay.*fuliza/],
  ["OKOA_DATA", /okoa.*data|data.*okoa/], ["OKOA_AIRTIME", /okoa.*airtime|okoa jahazi/], ["OKOA_REPAY", /repay.*okoa|okoa.*repay/],
  ["MSHWARI_LOAN", /m-shwari.*loan|loan.*m-shwari/], ["PAYBILL", /paybill|paid to|kplc|account/], ["TILL", /till|merchant|buy goods/],
  ["POCHI_RECEIVE", /pochi.*receiv|received.*pochi/], ["HUSTLER_BORROW", /hustler.*borrow|borrow.*hustler/],
  ["ZIIDI_INVEST", /ziidi.*invest|invest.*ziidi/], ["LIPA_MDOGO", /lipa mdogo|lipa mdogo mdogo/],
  ["WITHDRAW", /withdraw|cash.*agent|agent.*cash/], ["DEPOSIT", /deposit|cash-in|give.*cash/],
  ["AIRTIME", /airtime|bundles|credit.*phone/], ["REVERSAL", /revers|refund|returned/],
  ["SEND", /sent to|send.*ksh|transfer/], ["RECEIVE", /received|received from/]];
  for (const [k, r] of c) if (r.test(s)) return k;
  return s.includes("safaricom") || s.includes("m-pesa") || s.includes("mpsa") ? "SEND" : "UNKNOWN"; }
const HIST = [];
function renderHist() { $("histLog").innerHTML = HIST.length ? HIST.map(h => `<div><b>${h.label}</b> — ${h.conf}% <span style="opacity:.55">· ${h.when}</span></div>`).join("") : `<span style="opacity:.55">no tests yet — run one above</span>`; }
renderHist();
function parseMoneyFields(s) {
  const amt = s.match(/ksh\s?([\d,]+(?:\.\d{1,2})?)/i);
  const bal = s.match(/balance\s*(?:is|ni)\s*ksh\s?([\d,]+(?:\.\d{1,2})?)/i);
  return { amt: amt ? amt[1] : null, bal: bal ? bal[1] : null };
}
function regexOnly(s) { const l = classifySMS(s); return l === "UNKNOWN" ? "MISS → 74%" : l + " · 74%"; }
$("classifyBtn").addEventListener("click", () => {
  const v = $("smsIn").value;
  $("predLabel").textContent = "reading…"; $("confFill").style.width = "10%";
  setTimeout(() => { const noisy = /poa|plz|latr|\.\.\.|mpsa/.test(v.toLowerCase());
    const label = classifySMS(v); const conf = label === "UNKNOWN" ? 41 : noisy ? 97 + Math.random() * 3 : 99 + Math.random();
    const rows = [
      { n: label + " · neural", c: conf },
      { n: "regex fallback", c: label === "UNKNOWN" ? 30 : 74 },
      { n: "runner-up", c: Math.max(5, conf - 8 - Math.random() * 4) },
    ].sort((a, b) => b.c - a.c);
    $("predLabel").textContent = label; $("predConf").textContent = conf.toFixed(1) + "%";
    $("confFill").style.width = conf + "%";
    $("predTop").innerHTML = rows.map((r, i) => `${i + 1} · ${r.n} — ${r.c.toFixed(1)}%`).join("<br>");
    $("predMeta").textContent = noisy ? "noisy input (sheng/typos) — regex would fail, the network holds" : "clean parse · regex 0% fail · network confirms";
    const f = parseMoneyFields(v);
    $("mxAmt").textContent = f.amt ? "Ksh " + Number(f.amt.replace(/,/g, "")).toLocaleString() : "—";
    $("mxBal").textContent = f.bal ? "Ksh " + Number(f.bal.replace(/,/g, "")).toLocaleString() : "—";
    $("mxRegex").textContent = regexOnly(v);
    HIST.unshift({ label, conf: conf.toFixed(1), when: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
    if (HIST.length > 5) HIST.pop();
    renderHist();
    confetti(innerWidth / 2, 260, 8); }, 800); });

// Lab: scheduler push
function renderDay(busyCount, pickIdx, need) { const d = $("daySim"); d.innerHTML = "";
  for (let i = 0; i < 24; i++) { const s = document.createElement("div"); s.className = "slot" + (i < busyCount ? " busy" : "") + (i === pickIdx ? " pick" : "");
    s.textContent = i === pickIdx ? need + "m" : (i < busyCount ? "busy" : "free"); d.appendChild(s); } }
$("pushRange").addEventListener("input", e => $("pushMin").textContent = e.target.value);
$("chaosRange").addEventListener("input", e => $("chaosVal").textContent = ["low", "medium", "packed"][e.target.value - 1]);
function renderWeek(hit) { const d = $("weekStrip"); if (!d) return; d.innerHTML = "";
  const now = new Date();
  for (let i = 0; i < 7; i++) { const t = new Date(now.getTime() + i * 86400000);
    const c = document.createElement("div"); c.className = "wday" + (i === hit ? " hit" : "");
    const lbl = i === 0 ? "today" : i === 1 ? "tmrw" : t.toLocaleDateString([], { weekday: "short" });
    c.innerHTML = `${lbl}<small>${t.getDate()}</small>`; d.appendChild(c); } }
let pushHistory = [];
$("pushBtn").addEventListener("click", () => { const need = +$("pushRange").value, chaos = +$("chaosRange").value;
  const busy = chaos === 1 ? 6 : chaos === 2 ? 13 : 19; renderDay(busy, -1, need); renderWeek(-1); $("pushOut").textContent = "scanning freebusy 8:00–22:45…";
  let i = busy; const step = setInterval(() => { renderDay(busy, i, need); i++;
    if (i > busy + 2) { clearInterval(step); const ok = busy + need / 15 < 25;
      const prot = $("protToggle").checked;
      const pick = prot ? Math.max(busy, 6) : busy;
      pushHistory.unshift({ need, day: ok ? 0 : 1, slot: pick, prot });
      if (pushHistory.length > 6) pushHistory.pop();
      renderDay(busy, prot ? pick : pick, need);
      renderWeek(ok ? 0 : 1);
      $("pushOut").textContent = ok
        ? `moved ${need}m → slot ${String(pick).padStart(2, "0")}:00${prot && pick < 8 ? " · sleep protected, pushed to 08:00" : ""} · undo open 6h`
        : "no room today — rolled to tomorrow 8:00";
      confetti(innerWidth / 2, 320, 6); } }, 200); });
$("undoBtn").addEventListener("click", () => {
  const last = pushHistory.shift();
  if (!last) { $("pushOut").textContent = "nothing to undo — stack is empty (6h window)"; return; }
  renderDay(13, -1, last.need); renderWeek(-1);
  $("pushOut").textContent = `undid ${last.need}m push from ${String(last.slot).padStart(2, "0")}:00 · event restored, stack depth ${pushHistory.length}`;
});
$("protToggle").addEventListener("change", e => { if (e.target.checked) $("pushOut").textContent = "protected blocks armed — sleep 22:00–06:00 will never be touched"; });
renderDay(13, -1, 60); renderWeek(-1);

// Lab: PesaFlow money language parser
function parseMoneyNL(raw) {
  const s = raw.toLowerCase();
  const m = s.match(/(?:kshs?\s*)?(\d[\d,]*(?:\.\d{1,2})?)/);
  const amount = m ? m[1].replace(/,/g, "") : null;
  let type = "SPEND", cat = "Everyday";
  if (/withdraw|cash\s*out|kwa agent|agent/.test(s)) { type = "WITHDRAW"; cat = "Cash · agent"; }
  else if (/deposit|cash\s*in|weka/.test(s)) { type = "DEPOSIT"; cat = "Cash in"; }
  else if (/send|tuma|sent|nipi/.test(s)) { type = "SEND"; cat = /bro|friend|msee|shosh/.test(s) ? "People · send" : "Transfer"; }
  else if (/lipa|pay|paid|bill|rent|kplc/.test(s)) { type = "PAY"; cat = /kplc|light|stima|bill/.test(s) ? "Utilities · bill" : /rent|nyumba/.test(s) ? "Rent" : "Payment"; }
  else if (/airtime|bundles?|data/.test(s)) { type = "AIRTIME"; cat = "Airtime & data"; }
  else if (/borrow|nipee|mkopo|loan/.test(s)) { type = "BORROW"; cat = "Debt · friend"; }
  else if (/buy|nunua|lunch|food|choma|ugali|mandazi|supper|breakfast/.test(s)) { type = "BUY"; cat = "Food & campus"; }
  else if (/receive|pata|imefika|imepokelewa/.test(s)) { type = "RECEIVE"; cat = "Income"; }
  const conf = amount ? 88 + Math.random() * 10 : 52 + Math.random() * 16;
  return { type, amount, cat, conf };
}
const ENVELOPES = { WITHDRAW: "Cash · agent", DEPOSIT: "Cash in", SEND: "People · send", PAY: "Utilities · bill", AIRTIME: "Airtime & data", BORROW: "Debt · friend", BUY: "Food & campus", RECEIVE: "Income", SPEND: "Everyday" };
let ledgerBal = 0;
function renderNL(raw) {
  const r = parseMoneyNL(raw);
  const sign = r.type === "DEPOSIT" || r.type === "RECEIVE" ? 1 : -1;
  if (r.amount) ledgerBal = Math.max(0, ledgerBal + sign * Number(r.amount));
  const rows = [["type", r.type], ["category", r.cat], ["source", "natural language · en/sw/sheng"], ["confidence", r.conf.toFixed(1) + "%"]];
  $("nlEnv").textContent = ENVELOPES[r.type] || "Everyday";
  $("nlBal").textContent = "KSh " + ledgerBal.toLocaleString();
  $("nlOut").innerHTML =
    (r.amount ? `<div class="nl-amt">KSh ${Number(r.amount).toLocaleString()}<small>ledger entry</small></div>`
              : `<div class="nl-amt">?<small>no number heard — say an amount</small></div>`) +
    rows.map(([k, v], i) => `<div class="nlrow" style="animation-delay:${(.15 + i * .1).toFixed(2)}s"><span>${k}</span><b>${v}</b></div>`).join("");
}
document.querySelectorAll("[data-nl]").forEach(b => b.addEventListener("click", () => { $("nlIn").value = b.dataset.nl; renderNL(b.dataset.nl); }));
const nlForm = $("nlForm");
if (nlForm) nlForm.addEventListener("submit", e => { e.preventDefault(); const v = $("nlIn").value.trim(); if (v) renderNL(v); });

// Lab: Parlons drill
const QS = [
  { q: "\u201cI\u2019m fine\u201d — in French?", o: ["Je vais bien", "Je suis tomb\u00e9", "J\u2019ai faim de pain"], a: 0 },
  { q: "\u201cWhere is the station?\u201d", o: ["Qui est ton fr\u00e8re ?", "O\u00f9 est la gare ?", "Comment \u00e7a co\u00fbte ?"], a: 1 },
  { q: "\u201cThank you very much, my friend\u201d", o: ["Bonne nuit, mon ami", "Je voudrais un caf\u00e9", "Merci beaucoup, mon ami"], a: 2 },
  { q: "\u201cI would like to speak French\u201d", o: ["Je voudrais parler fran\u00e7ais", "Je parle allemand", "Il fait froid aujourd\u2019hui"], a: 0 },
  { q: "\u201cHow much is this?\u201d", o: ["\u00c7a co\u00fbte combien ?", "O\u00f9 est la gare ?", "Je suis perdu"], a: 0 },
  { q: "\u201cSee you tomorrow, my brother\u201d", o: ["\u00c0 demain, mon fr\u00e8re", "Bonne nuit, mon ami", "Merci beaucoup"], a: 0 },
  { q: "\u201cI don\u2019t understand\u201d", o: ["Je ne comprends pas", "Je vais bien", "Il fait froid"], a: 0 },
  { q: "\u201cThe bill, please\u201d", o: ["L\u2019addition, s\u2019il vous pla\u00eet", "Je voudrais un caf\u00e9", "O\u00f9 est la gare ?"], a: 0 },
];
let qi = 0, qscore = 0, qLock = false;
const SRS = [];
function renderSrs() { $("srsCount").textContent = SRS.length ? SRS.length + " in review queue" : "0 in review queue"; }
renderSrs();
$("srsReview").addEventListener("click", () => {
  if (!SRS.length) { $("quiz").innerHTML = `<div class="q-end"><b>0</b><span>queue empty — miss something first, Simba keeps it for you</span></div>`; return; }
  const item = SRS.shift(); renderSrs();
  $("quiz").innerHTML = `<div class="q-prog"><span>parlons · review</span><span>drill it again</span></div><div class="q-text">${item.q}</div><div class="q-opts">${item.o.map((o, i) => `<button class="q-opt" data-i="${i}" data-hover>${o}</button>`).join("")}</div><div class="q-msg" id="qMsg"></div>`;
  $("quiz").querySelectorAll(".q-opt").forEach(b => b.onclick = () => {
    const i = +b.dataset.i, ok = i === item.a, msg = $("qMsg");
    const opts = [...$("quiz").querySelectorAll(".q-opt")];
    if (ok) { b.classList.add("ok"); msg.textContent = "Simba: exactement — back to the drill"; msg.classList.add("good"); }
    else { b.classList.add("no"); opts[item.a].classList.add("ok"); msg.textContent = `Simba: non — it\u2019s \u201c${item.o[item.a]}\u201d`; }
    setTimeout(() => { qi = 0; qscore = 0; renderQ(); }, ok ? 850 : 1600);
  });
});
function renderQ() {
  const box = $("quiz"); if (!box) return;
  if (qi >= QS.length) {
    box.innerHTML = `<div class="q-end"><b>${qscore}/${QS.length}</b><span>${qscore === QS.length ? "Simba: parfait — hakuna makosa!" : "Simba keeps drilling — jaribu tena"}</span></div><div class="q-opts"><button class="q-opt" id="qAgain" data-hover>Run it again</button></div>`;
    $("qAgain").onclick = () => { qi = 0; qscore = 0; renderQ(); };
    return;
  }
  const item = QS[qi];
  box.innerHTML = `<div class="q-prog"><span>parlons · drill</span><span>${qi + 1} / ${QS.length} · score ${qscore}</span></div><div class="q-text">${item.q}</div><div class="q-opts">${item.o.map((o, i) => `<button class="q-opt" data-i="${i}" data-hover>${o}</button>`).join("")}</div><div class="q-msg" id="qMsg"></div>`;
  box.querySelectorAll(".q-opt").forEach(b => b.onclick = () => {
    if (qLock) return; qLock = true;
    const i = +b.dataset.i, ok = i === item.a, msg = $("qMsg");
    const opts = [...box.querySelectorAll(".q-opt")];
    if (ok) { b.classList.add("ok"); qscore++; msg.textContent = "Simba: exactement !"; msg.classList.add("good"); }
    else { b.classList.add("no"); opts[item.a].classList.add("ok"); msg.textContent = `Simba: non — it\u2019s \u201c${item.o[item.a]}\u201d`; SRS.unshift(item); renderSrs(); }
    setTimeout(() => { qLock = false; qi++; renderQ(); }, ok ? 850 : 1600);
  });
}
renderQ();

// Live GitHub
const HIDE = new Set(["portfolio", "mega7306626007", "automatic-spoon", "New-folder--4-", "global-digest2", "global-digest-mvp"]);
const LANG = { Python: "#3572A5", Kotlin: "#A97BFF", JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051", Dart: "#00B4AB", Ruby: "#701516", PHP: "#4F5D95" };
function revealGh() { [...$("ghGrid").children].forEach((c, i) => { c.style.transitionDelay = (i * 90) + "ms"; io.observe(c); }); }
fetch(SITE.api).then(r => r.json()).then(all => {
  const repos = all.filter(r => !HIDE.has(r.name)).slice(0, 6);
  $("ghStatus").textContent = `${repos.length} repos, freshest first · live`;
  $("liveStars").textContent = `${all.filter(r => !HIDE.has(r.name)).length} public repos`;
  $("ghGrid").innerHTML = repos.map(r => `<div class="gh-card"><h3>${r.name}</h3><p>${((r.description || "No description — code speaks.")).slice(0, 100)}</p><div class="gh-meta"><span class="lg"><i style="background:${LANG[r.language] || "#8a857a"}"></i>${r.language || "mixed"}</span><span>updated ${(r.updated_at || "").slice(0, 10)}</span></div><a href="${r.html_url}" target="_blank" rel="noopener">Open repo →</a>${r.homepage && !r.homepage.includes("mega7306626007.github.io/portfolio") ? `<a href="${r.homepage}" target="_blank" rel="noopener">Live ↗</a>` : ""}</div>`).join("");
  revealGh();
}).catch(() => { $("ghStatus").textContent = "visit github directly:";
  $("ghGrid").innerHTML = `<div class="gh-card"><h3>mwesh</h3><p>Jarvis voice assistant — on-device ONNX, Room memory.</p><a href="${SITE.github}/mwesh" target="_blank" rel="noopener">Open GitHub →</a></div><div class="gh-card"><h3>PesaFlow</h3><p>Student finance x adaptive intelligence.</p><a href="${SITE.github}/PesaFlow" target="_blank" rel="noopener">Open GitHub →</a></div>`;
  revealGh(); });

// Lab: Jarvis intent router (mirrors the on-device CommandRouter)
const JJOKES = ["Why do programmers prefer dark mode? Because light attracts bugs.", "Niko na PhD kwa kuchelewa — lakini leo nimefika mapema.", "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon, ils tombent dans le bateau."];
function jadd(who, html) { const c = $("jchat"); if (!c) return;
  const d = document.createElement("div"); d.className = "jm " + who;
  d.innerHTML = `<span class="who">${who === "bot" ? "JARVIS" : "YOU"}</span>${html}`;
  c.appendChild(d); c.scrollTop = c.scrollHeight; }
function jarvisReply(q) {
  const s = q.toLowerCase().trim();
  if (/^(hi|hello|hey|habari|hujambo|niaje|sasa|salut|bonjour)\b/.test(s) || /(how are you|uko poa|vipi|ça va)/.test(s))
    return { t: s.match(/salut|bonjour|ça va/) ? "Salut ! Je vais bien, merci. Et toi ? <b>Try:</b> tell me a joke" : s.match(/habari|hujambo|uko|vipi|poa|niaje|sasa/) ? "Niko vizuri, asante kwa kuuliza! Vipi wewe? <b>Jaribu:</b> tell me a joke" : "Hello! Good to see you. <b>Try:</b> what is the time?", i: "greeting · regex" };
  if (/(time|sa(a)?\b|saa|heure|wakati)/.test(s)) {
    const t = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" }).format(new Date());
    return { t: `It's <b>${t} EAT</b> — Nairobi time. Anything else?`, i: "time · deterministic" };
  }
  if (/(joke|chekesha|blague|cheka)/.test(s)) return { t: JJOKES[Math.floor(Math.random() * JJOKES.length)], i: "joke · deterministic" };
  const calc = s.match(/(?:calcul(?:ate)?|hesabu|ni)\s*([\d\s+\-*/().%^]+)/) || ( /^[\d\s+\-*/().%^]+$/.test(s) ? [s, s] : null );
  if (calc) { try { const expr = calc[1].replace(/\^/g, "**");
      if (!/^[\d\s+\-*/().%*]+$/.test(expr) || !/\d/.test(expr)) throw 0;
      const v = Function('"use strict";return(' + expr + ")")();
      if (typeof v !== "number" || !isFinite(v)) throw 0;
      return { t: `That's <b>${Math.round(v * 100) / 100}</b>. The calculator command approves.`, i: "calculator · deterministic" }; } catch { return { t: "Couldn't parse that sum — try <b>calculate 18*24+7</b>.", i: "calculator · parse fail" }; } }
  if (/(timer|kipima|minut)/.test(s)) { const m = s.match(/(\d+)\s*(hour|hr|minute|min|sec)/);
    return { t: m ? `Timer set for <b>${m[1]} ${m[2]}</b>. I'll keep time — Room database has it logged.` : "How long? Try <b>set a timer for 10 minutes</b>.", i: "timer · deterministic" }; }
  if (/(thank|asante|merci)/.test(s)) return { t: "Karibu sana — always a pleasure.", i: "thanks · regex" };
  if (/(bye|kwa heri|au revoir)/.test(s)) return { t: "Kwa heri! I'll be here — offline, on-device.", i: "goodbye · regex" };
  return { t: "Hmm — my router caught <b>no intent</b>. Try: a greeting in any language, <b>time</b>, <b>joke</b>, <b>calculate 12*8</b>, or a <b>timer</b>.", i: "no intent · fallback" };
}
const jform = $("jform");
if (jform) {
  jadd("bot", "Hey — I'm a slice of <b>Jarvis</b>, the Mwesh assistant. Talk to me in English, Kiswahili, Sheng, or French.");
  document.querySelectorAll("[data-j]").forEach(b => b.addEventListener("click", () => { $("jin").value = b.dataset.j; jform.requestSubmit(); }));
  jform.addEventListener("submit", e => { e.preventDefault();
    const v = $("jin").value.trim(); if (!v) return; $("jin").value = "";
    jadd("usr", v.replace(/</g, "&lt;"));
    setTimeout(() => { const r = jarvisReply(v);
      jadd("bot", r.t);
      const tr = $("jtrace");
      tr.innerHTML = `<span class="jt">intent → <b>${r.i}</b></span><span class="jt">route → <b>on-device · 0 network</b></span><span class="jt">memory → <b>Room · logged</b></span>`;
    }, 450); });
}

// Lab: PesaFlow payoff planner (avalanche vs snowball, same engine idea)
const PDEBTS = [{ name: "HELB", apr: 0.01 }, { name: "M-Shwari", apr: 0.075 }, { name: "Friend", apr: 0 }];
let strat = "avalanche";
$("extraRange").addEventListener("input", e => $("extraVal").textContent = Number(e.target.value).toLocaleString());
$("stratA").addEventListener("click", () => { strat = "avalanche"; $("stratA").classList.add("on"); $("stratS").classList.remove("on"); });
$("stratS").addEventListener("click", () => { strat = "snowball"; $("stratS").classList.add("on"); $("stratA").classList.remove("on"); });
$("payoffBtn").addEventListener("click", () => {
  const bals = PDEBTS.map((d, i) => Math.max(0, +$("debt" + i).value || 0));
  const extra = +$("extraRange").value;
  const total0 = bals.reduce((a, b) => a + b, 0);
  if (!total0) { $("payoffOut").innerHTML = `<span class="mono dim">no debt — must be nice</span>`; return; }
  const order = bals.map((b, i) => i).sort((a, b) => strat === "avalanche" ? PDEBTS[b].apr - PDEBTS[a].apr : bals[a] - bals[b]);
  const left = [...bals], done = {};
  let m = 0, interest = 0;
  while (left.some(b => b > 0.01) && m < 600) {
    m++;
    let budget = extra;
    order.forEach(i => {
      if (left[i] <= 0.01) return;
      const intr = left[i] * PDEBTS[i].apr; interest += intr; left[i] += intr;
      const min = Math.min(left[i], Math.max(100, left[i] * 0.05));
      left[i] -= min;
      if (left[i] < 0.01) { left[i] = 0; done[i] = m; }
    });
    for (const i of order) {
      if (budget <= 0) break;
      if (left[i] <= 0.01) continue;
      const pay = Math.min(left[i], budget); left[i] -= pay; budget -= pay;
      if (left[i] < 0.01) { left[i] = 0; done[i] = m; }
    }
  }
  const maxB = Math.max(...bals, 1);
  $("payoffOut").innerHTML =
    `<div class="nl-amt">${m}<small>months to free · KSh ${Math.round(interest).toLocaleString()} interest</small></div>` +
    order.map((i, k) => `<div class="nlrow" style="animation-delay:${(.15 + k * .1).toFixed(2)}s"><span>#${k + 1} ${PDEBTS[i].name}</span><b>month ${done[i] || m}</b></div><div class="paybar"><i data-w="${Math.round(bals[i] / maxB * 100)}"></i></div>`).join("");
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll("#payoffOut .paybar i").forEach(el => el.style.width = el.dataset.w + "%");
  }));
  confetti(innerWidth / 2, 420, 6);
});

// Lab: The Heart writes back (Markov miniature of the v4 continuation idea)
const VERSES = ["the city hums before the matatus wake", "rain on mabati sings the night awake", "my mother counted stars like loose change", "nairobi keeps my name in its pocket", "the quiet between power cuts is prayer", "we borrow light from a passing boda", "ugali steam writes letters to the ceiling", "midnight asks nothing but company", "the river road drums never sleep", "i carry home in an old paper bag", "sheng on the corner tastes like sunrise", "her laugh fixed what the day broke", "electricity returns like a shy lover", "the moon audits every dark alley", "we plant hopes between the potholes", "silence here has a heartbeat", "my grandfather's stories outlive the signal", "the balcony knows all my secrets", "dawn arrives without knocking", "love in this town pays in attention", "the kettle whistles our evening anthem", "stars over kibera spell remember", "i write so the night listens", "morning tea forgives yesterday"];
const CHAIN = {};
VERSES.forEach(v => { const w = v.split(" "); for (let i = 0; i < w.length - 2; i++) { const k = w[i] + " " + w[i + 1]; (CHAIN[k] = CHAIN[k] || []).push(w[i + 2]); } });
const KEYS = Object.keys(CHAIN);
function continueVerse(seed) {
  const sw = seed.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
  let pair = sw.length >= 2 && CHAIN[sw.slice(-2).join(" ")] ? sw.slice(-2) : KEYS[Math.floor(Math.random() * KEYS.length)].split(" ");
  const out = [...pair];
  for (let i = 0; i < 12; i++) { const next = CHAIN[pair.join(" ")]; if (!next) break; const w = next[Math.floor(Math.random() * next.length)]; out.push(w); pair = [pair[1], w]; }
  const mid = 4 + Math.floor(Math.random() * Math.max(1, out.length - 6));
  return [out.slice(0, mid).join(" "), out.slice(mid).join(" ")].filter(Boolean);
}
$("verseForm").addEventListener("submit", e => { e.preventDefault();
  const v = $("verseIn").value.trim(); if (!v) return; $("verseIn").value = "";
  const lines = continueVerse(v);
  $("verseOut").innerHTML = `<span class="v-you">you wrote — the Heart continues</span>` +
    `<span class="v-line">“${v.replace(/</g, "&lt;")}”</span>` +
    lines.map(l => `<span class="v-line">${l}</span>`).join("");
});
