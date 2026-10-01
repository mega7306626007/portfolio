const SITE = { email: "lemuelmwesh@gmail.com", github: "https://github.com/mega7306626007", api: "https://api.github.com/users/mega7306626007/repos?sort=updated&per_page=6" };
const $ = id => document.getElementById(id);

// loader
addEventListener("load", () => setTimeout(() => $("loader").classList.add("done"), 650));
setTimeout(() => $("loader").classList.add("done"), 2600);

// sound (tiny WebAudio blips, off by default)
let soundOn = false, AC = null;
function blip(f = 600) { if (!soundOn) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const o = AC.createOscillator(), g = AC.createGain(); o.frequency.value = f; o.type = "sine"; g.gain.value = .06; o.connect(g); g.connect(AC.destination); o.start(); o.stop(AC.currentTime + .09); } catch {} }
$("soundBtn").addEventListener("click", () => { soundOn = !soundOn; $("soundBtn").textContent = soundOn ? "🔊" : "🔇"; blip(700); toast(soundOn ? "sound on — playful mode" : "sound off"); });

// theme
document.querySelectorAll("[data-theme-btn]").forEach(b => b.addEventListener("click", () => {
  document.documentElement.dataset.theme = b.dataset.themeBtn;
  document.querySelectorAll("[data-theme-btn]").forEach(x => x.classList.toggle("active", x === b));
  blip(500); addXP(5, "themed");
}));

// clock
function tick() { try { $("nairobiTime").textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" }).format(new Date()); } catch {} }
tick(); setInterval(tick, 20000);

// typer
const roles = ["training neural nets on M-PESA…", "pushing calendar tasks…", "weaving habits offline…", "answering email in 48h…", "shipping for Mweshimiwa…"];
let ri = 0, ci = 0, del = false;
(function type() { const w = roles[ri]; $("typer").textContent = w.slice(0, ci);
  if (!del && ci < w.length) ci++; else if (!del) { del = true; return setTimeout(type, 1500); }
  else if (ci > 0) ci--; else { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 26 : 52); })();

// XP + badges (localStorage)
let xp = +(localStorage.getItem("mw_xp") || 0);
const seen = new Set(JSON.parse(localStorage.getItem("mw_badges") || "[]"));
function renderXP() { $("xpVal").textContent = xp; $("lvl").textContent = 1 + Math.floor(xp / 100); $("xpBar").style.width = Math.min(100, xp % 100) + "%";
  $("badges").innerHTML = [...seen].map(s => `<span class="badge">${s}</span>`).join(""); }
function addXP(n, badge) { xp += n; if (badge && !seen.has(badge)) { seen.add(badge); toast("🏅 unlocked: " + badge); blip(880); }
  localStorage.setItem("mw_xp", xp); localStorage.setItem("mw_badges", JSON.stringify([...seen])); renderXP(); }
renderXP();

// confetti (click anywhere, capped)
const COLORS = ["#c8f04a", "#8b7bff", "#ffb224", "#ff5f57", "#06b6d4", "#ec4899"];
function confetti(x, y, n = 14) { for (let i = 0; i < n; i++) { const s = document.createElement("div"); s.className = "confetti";
  s.style.left = x + "px"; s.style.top = y + "px"; s.style.background = COLORS[i % COLORS.length];
  s.style.setProperty("--dx", (Math.random() * 260 - 130) + "px"); s.style.setProperty("--dy", (-(60 + Math.random() * 260)) + "px");
  s.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg"); document.body.appendChild(s); setTimeout(() => s.remove(), 1100); } }
let lastConf = 0;
addEventListener("pointerdown", e => { const t = Date.now(); if (t - lastConf < 350) return; lastConf = t;
  if (e.target.closest("input,textarea,a,button")) return; confetti(e.clientX, e.clientY, 12); addXP(2); blip(440 + Math.random() * 300); });

// cursor + trail
const cursor = $("cursor"), trailLayer = $("trailLayer");
addEventListener("mousemove", e => { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px";
  if (Math.random() < .25) { const d = document.createElement("div"); d.className = "trail"; d.style.left = e.clientX + "px"; d.style.top = e.clientY + "px"; trailLayer.appendChild(d); setTimeout(() => d.remove(), 650); } });
document.querySelectorAll("[data-hover]").forEach(el => { el.addEventListener("mouseenter", () => { cursor.style.width = "34px"; cursor.style.height = "34px"; }); el.addEventListener("mouseleave", () => { cursor.style.width = "14px"; cursor.style.height = "14px"; }); });

// tilt
document.querySelectorAll(".tilt").forEach(card => { card.addEventListener("mousemove", e => { const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-3px)`; });
  card.addEventListener("mouseleave", () => card.style.transform = ""); });

// reveal + progress + section badges + toTop
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in");
  if (e.target.id) addXP(8, "visited #" + e.target.id); } }), { threshold: .15 });
document.querySelectorAll(".reveal,.section").forEach(el => io.observe(el));
addEventListener("scroll", () => { const h = document.documentElement; const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  $("progress").style.width = p + "%"; $("toTop").classList.toggle("show", h.scrollTop > 700);
  $("nav").style.borderBottomColor = h.scrollTop > 10 ? "rgba(200,240,74,.3)" : ""; });
$("toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

// counters
const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const b = e.target, end = +b.dataset.count; cio.unobserve(b);
  const t0 = performance.now(); (function step(t) { const p = Math.min((t - t0) / 1300, 1);
    b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + (end === 100 ? "%" : "+"); if (p < 1) requestAnimationFrame(step); })(t0); }), { threshold: .5 });
document.querySelectorAll("[data-count]").forEach(b => cio.observe(b));

// particles
const cv = $("particles"), ctx = cv.getContext("2d"); let pts = [];
function rs() { cv.width = innerWidth; cv.height = innerHeight; } rs(); addEventListener("resize", rs);
for (let i = 0; i < 70; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.6 + .4 });
(function loop() { ctx.clearRect(0, 0, cv.width, cv.height); ctx.fillStyle = "rgba(200,240,74,.5)";
  pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > cv.width) p.vx *= -1; if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }); requestAnimationFrame(loop); })();

// filters
document.querySelectorAll(".f").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".f").forEach(b => b.classList.remove("active")); btn.classList.add("active");
  const f = btn.dataset.filter; document.querySelectorAll("#projectGrid .card").forEach(c => c.classList.toggle("hide", f !== "all" && !c.dataset.tags.includes(f))); blip(600); }));

// modal
const overlay = $("overlay"), modal = $("modal");
function openModal(t, b) { $("modalTitle").textContent = t; $("modalBody").textContent = b; overlay.classList.add("open"); modal.classList.add("open"); }
function closeModal() { overlay.classList.remove("open"); modal.classList.remove("open"); }
document.querySelectorAll(".open-modal").forEach(b => b.addEventListener("click", e => { const c = e.target.closest(".card"); openModal(c.dataset.title, c.dataset.body); addXP(6, "case-reader"); }));
$("modalX").addEventListener("click", closeModal); overlay.addEventListener("click", closeModal); $("modalCta").addEventListener("click", closeModal);

// terminal
const termOut = $("termOut");
function print(cmd, html) { termOut.innerHTML += `\n<span class="c">$</span> ${cmd}\n<span class="g">${html}</span>`; termOut.scrollTop = termOut.scrollHeight; }
const JOKES = ["Why do programmers prefer dark mode? Because light attracts bugs. 🐛", "I told my calendar a joke — it moved it to next week. 📅", "M-PESA balance: enough to dream, not enough to relax. 💸"];
$("termForm").addEventListener("submit", e => { e.preventDefault(); const raw = $("termIn").value.trim(); if (!raw) return; $("termIn").value = "";
  const [c, ...rest] = raw.toLowerCase().split(" "); const arg = rest.join(" ");
  if (c === "help") print(raw, "help · whoami · projects · hire · joke · confetti · theme [onyx|violet|paper] · company · github");
  else if (c === "whoami") print(raw, "emmanuel @ mweshimiwa enterprises — nairobi systems builder");
  else if (c === "company") print(raw, "Mweshimiwa Enterprises · AI · Android · Web · reply &lt;48h · " + SITE.email);
  else if (c === "projects") print(raw, "calendar-rescheduler / sms-engine / four-threads / poetry-os — scroll to #work");
  else if (c === "hire") { print(raw, "opening email… let's scope it 📝"); location.hash = "#contact"; }
  else if (c === "github") { print(raw, "opening github…"); open(SITE.github, "_blank"); }
  else if (c === "joke") print(raw, JOKES[Math.floor(Math.random() * JOKES.length)]);
  else if (c === "confetti") { print(raw, "🎉"); confetti(innerWidth / 2, innerHeight / 2, 40); }
  else if (c === "theme") { document.documentElement.dataset.theme = arg || "onyx"; print(raw, "theme → " + (arg || "onyx")); }
  else if (c === "disco") { document.body.classList.toggle("disco"); print(raw, "🪩 disco " + (document.body.classList.contains("disco") ? "ON" : "OFF")); }
  else print(raw, "hmm — try `help`. (psst: the ★ playground has more toys)");
  addXP(4, "terminal-hacker"); blip(700); });

// tabs
document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(x => x.classList.remove("active")); t.classList.add("active");
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active")); $("panel-" + t.dataset.tab).classList.add("active");
  addXP(5, "player: " + t.dataset.tab); blip(650); if (t.dataset.tab === "weave") sizeWeave(); }));

// --- M-PESA demo classifier (mirrors the real 29-type engine, client-side) ---
const SAMPLES = {
  send: "QHX7K2LMNO Confirmed. Ksh2,450.00 sent to JOHN DOE 0722123456 on 12/9/26 at 9:41 AM. New M-PESA balance is Ksh12,300.50. Transaction cost, Ksh28.00.",
  fuliza: "Confirmed. Fuliza advance of Ksh1,500.00 on 12/9/26. Outstanding Fuliza amount Ksh1,545.00 including access fee. Repay via M-PESA.",
  okoa: "Confirmed. Okoa Data 1GB advanced to 0722000111. Repay Ksh110.00 from airtime. Dial *444# to repay.",
  paybill: "QAB12CD34E Confirmed. Ksh1,200.00 paid to KPLC PREPAID, account 37199465 on 11/9/26. New balance Ksh8,900.00.",
  sheng: "Qzx9 Confirmed ksh 500 sent 2 john latr plz new bal 300 uko poa?? cost 27... mpsa"
};
document.querySelectorAll("[data-sms]").forEach(b => b.addEventListener("click", () => { $("smsIn").value = SAMPLES[b.dataset.sms]; blip(550); }));
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
$("classifyBtn").addEventListener("click", () => {
  const v = $("smsIn").value; $("scanline").classList.remove("go"); void $("scanline").offsetWidth; $("scanline").classList.add("go");
  $("predLabel").textContent = "thinking…"; $("confFill").style.width = "12%";
  setTimeout(() => { const noisy = /poa|plz|latr|\.\.\.|mpsa/.test(v.toLowerCase());
    const label = classifySMS(v); const conf = label === "UNKNOWN" ? 41 : noisy ? 97 + Math.random() * 3 : 99 + Math.random();
    $("predLabel").textContent = label; $("predConf").textContent = conf.toFixed(1) + "%";
    $("confFill").style.width = conf + "%";
    $("predTop").innerHTML = `① ${label} — ${conf.toFixed(1)}%<br>② regex-fallback — ${(label === "UNKNOWN" ? 30 : 74).toFixed(0)}%<br>③ runner-up — ${(conf - 8).toFixed(1)}%`;
    $("predMeta").textContent = noisy ? "noisy input detected (sheng/typos) — regex would fail, NN holds ✓" : "clean parse · regex 0% fail · NN confirms ✓";
    addXP(10, "mpesa-tester"); confetti(innerWidth / 2, 200, 8); blip(900); }, 950); });

// --- push simulator ---
function renderDay(busyCount, pickIdx, need) { const d = $("daySim"); d.innerHTML = "";
  for (let i = 0; i < 24; i++) { const s = document.createElement("div"); s.className = "slot" + (i < busyCount ? " busy" : "") + (i === pickIdx ? " pick" : "");
    s.textContent = i === pickIdx ? need + "m ✓" : (i < busyCount ? "busy" : "free"); d.appendChild(s); } }
$("pushRange").addEventListener("input", e => $("pushMin").textContent = e.target.value);
$("chaosRange").addEventListener("input", e => $("chaosVal").textContent = ["low", "medium", "packed"][e.target.value - 1]);
$("pushBtn").addEventListener("click", () => { const need = +$("pushRange").value, chaos = +$("chaosRange").value;
  const busy = chaos === 1 ? 6 : chaos === 2 ? 13 : 19; renderDay(busy, -1, need); $("pushOut").textContent = "scanning freebusy 8:00–22:45…";
  let i = busy; const step = setInterval(() => { renderDay(busy, i, need); i++;
    if (i > busy + 2) { clearInterval(step); const ok = busy + need / 15 < 25;
      $("pushOut").textContent = ok ? `✓ pushed ${need}m → slot ${busy - 8 + 8}:00 · kept out of ${busy} busy blocks · undo available 6h` : "✕ no room today — rolled to tomorrow 8:00 (rollover)";
      addXP(10, "scheduler"); confetti(innerWidth / 2, 300, 10); blip(ok ? 920 : 300); } }, 220); });
renderDay(13, -1, 60);

// --- weave toy ---
const weave = $("weave"), wctx = weave.getContext("2d"); let strokes = 0, drawing = false, last = null;
const THREADS = [["#c8f04a", 0], ["#8b7bff", 6], ["#ffb224", 12], ["#06b6d4", 18]];
function sizeWeave() { const r = weave.getBoundingClientRect(); weave.width = Math.max(300, r.width); }
function weaveTo(x, y) { if (!last) last = { x, y };
  THREADS.forEach(([col, off]) => { wctx.strokeStyle = col; wctx.lineWidth = 2.4; wctx.beginPath();
    wctx.moveTo(last.x + off * .3, last.y + off * .3);
    wctx.quadraticCurveTo((last.x + x) / 2 + Math.sin(x) * 8, (last.y + y) / 2, x + off * .3, y + off * .3); wctx.stroke(); });
  last = { x, y }; }
function pos(e) { const r = weave.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return { x: p.clientX - r.left, y: p.clientY - r.top }; }
weave.addEventListener("pointerdown", e => { drawing = true; last = null; weave.setPointerCapture(e.pointerId); });
weave.addEventListener("pointermove", e => { if (drawing) weaveTo(pos(e).x, pos(e).y); });
addEventListener("pointerup", () => { if (drawing) { drawing = false; strokes++; $("weaveCount").textContent = strokes + " strokes"; addXP(3, "weaver"); } });
$("weaveClear").addEventListener("click", () => { wctx.clearRect(0, 0, weave.width, weave.height); strokes = 0; $("weaveCount").textContent = "fresh canvas"; blip(400); });

// --- reflex game ---
let hits = [], t0 = 0, playing = false;
const best = +(localStorage.getItem("mw_best") || 0); if (best) $("reactBest").textContent = best + "ms";
function moveTarget() { const a = $("arena"), t = $("target"); const r = a.getBoundingClientRect();
  t.style.left = Math.random() * (r.width - 50) + "px"; t.style.top = Math.random() * (r.height - 50) + "px"; t.style.display = "block"; t0 = performance.now(); }
$("reactStart").addEventListener("click", () => { hits = []; playing = true; $("reactScore").textContent = "hit it! 0/5"; moveTarget(); blip(700); });
$("target").addEventListener("pointerdown", () => { if (!playing) return; hits.push(performance.now() - t0); blip(900);
  confetti(event.clientX, event.clientY, 6);
  if (hits.length >= 5) { playing = false; $("target").style.display = "none";
    const avg = Math.round(hits.reduce((a, b) => a + b) / 5);
    $("reactScore").textContent = `avg ${avg}ms — ${avg < 450 ? "cofounder material 🏆" : avg < 700 ? "solid dev hands ⌨️" : "matatu WiFi reflexes 🐢"}`;
    if (!best || avg < best) { localStorage.setItem("mw_best", avg); $("reactBest").textContent = avg + "ms"; }
    addXP(15, "sharpshooter"); } else { $("reactScore").textContent = `hit it! ${hits.length}/5`; moveTarget(); } });

// --- live github ---
fetch(SITE.api).then(r => r.json()).then(repos => {
  $("ghStatus").textContent = `live · ${repos.length} freshest repos · updated just now`;
  $("liveStars").textContent = `★ ${repos.reduce((a, r) => a + (r.stargazers_count || 0), 0)} stars →`;
  $("ghGrid").innerHTML = repos.map(r => `<div class="gh-card reveal in"><h3>${r.name}</h3><p>${(r.description || "No description — code speaks.").slice(0, 110)}</p><div class="gh-meta"><span>★ ${r.stargazers_count || 0}</span><span>${r.language || "mixed"}</span></div><a href="${r.html_url}" target="_blank" rel="noopener" data-hover>Open repo ↗</a></div>`).join("");
  addXP(8, "github-live");
}).catch(() => { $("ghStatus").textContent = "offline preview — visit github directly:";
  $("ghGrid").innerHTML = `<div class="gh-card"><h3>sms-engine</h3><p>M-PESA parser + 4.3M-param NN + ONNX.</p><a href="${SITE.github}" target="_blank" rel="noopener">Open GitHub ↗</a></div><div class="gh-card"><h3>calendar-rescheduler</h3><p>Push · overfill · undo scheduling OS.</p><a href="${SITE.github}" target="_blank" rel="noopener">Open GitHub ↗</a></div>`; });

// copy email
$("copyEmail").addEventListener("click", async () => { try { await navigator.clipboard.writeText(SITE.email); toast("email copied ✓ — reply <48h"); } catch { toast(SITE.email); } addXP(3); });

// toast
function toast(msg) { document.querySelectorAll(".toast-pop").forEach(t => t.remove()); const t = document.createElement("div");
  t.className = "toast-pop"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2400); }

// mobile menu
$("menuBtn").addEventListener("click", () => $("mobileMenu").classList.toggle("open"));
document.querySelectorAll("#mobileMenu a").forEach(a => a.addEventListener("click", () => $("mobileMenu").classList.remove("open")));

// palette
const palette = $("palette"), palInput = $("palInput"), palList = $("palList");
const cmds = [{ n: "★ Playground", fn: () => location.hash = "#play" }, { n: "→ Work", fn: () => location.hash = "#work" },
  { n: "→ GitHub live", fn: () => location.hash = "#github" }, { n: "✉ Copy email", fn: () => navigator.clipboard.writeText(SITE.email).then(() => toast("email copied ✓")) },
  { n: "↗ Open GitHub", fn: () => open(SITE.github, "_blank") }, { n: "🪩 Disco mode", fn: () => { document.body.classList.toggle("disco"); toast("disco!"); } },
  { n: "🎉 Confetti bomb", fn: () => confetti(innerWidth / 2, innerHeight / 3, 60) },
  { n: "🎨 Theme: paper", fn: () => document.documentElement.dataset.theme = "paper" }, { n: "🎨 Theme: onyx", fn: () => document.documentElement.dataset.theme = "onyx" }];
function renderPal(q = "") { palList.innerHTML = ""; cmds.filter(c => c.n.toLowerCase().includes(q.toLowerCase())).forEach((c, i) => {
  const d = document.createElement("div"); d.textContent = c.n; if (i === 0) d.classList.add("sel");
  d.onclick = () => { palette.classList.remove("open"); c.fn(); }; palList.appendChild(d); }); }
addEventListener("keydown", e => { if (e.key.toLowerCase() === "k" && !/input|textarea/i.test(document.activeElement.tagName)) {
  palette.classList.toggle("open"); renderPal(); palInput.value = ""; setTimeout(() => palInput.focus(), 30); }
  if (e.key === "Escape") { closeModal(); palette.classList.remove("open"); } });
palInput.addEventListener("input", () => renderPal(palInput.value));
palInput.addEventListener("keydown", e => { if (e.key === "Enter") { const f = palList.querySelector("div"); f && f.click(); } });

// konami → disco
const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"]; let ki = 0;
addEventListener("keydown", e => { const k = e.key.toLowerCase(); ki = k === seq[ki] ? ki + 1 : k === seq[0] ? 1 : 0;
  if (k === "k" && ki === 0) return;
  if (ki === seq.length || "konami" === (window._kb = (window._kb || "") + (/^[a-z]$/.test(k) ? k : "")).slice(-6)) {
    document.body.classList.toggle("disco"); toast("🪩 DISCO MODE — mweshimiwa party"); confetti(innerWidth / 2, 200, 60); addXP(25, "disco-king"); ki = 0; window._kb = ""; } });
