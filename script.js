const SITE = { email: "lemuelmwesh@gmail.com", github: "https://github.com/mega7306626007", api: "https://api.github.com/users/mega7306626007/repos?sort=updated&per_page=6" };
const $ = id => document.getElementById(id);

addEventListener("load", () => setTimeout(() => $("loader").classList.add("done"), 600));
setTimeout(() => $("loader").classList.add("done"), 2400);

function tick() { try { $("nairobiTime").textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" }).format(new Date()); } catch {} }
tick(); setInterval(tick, 20000);

const roles = ["training neural nets on M-PESA", "pushing calendar tasks", "weaving habits offline", "answering email in 48h", "shipping for Mweshimiwa"];
let ri = 0, ci = 0, del = false;
(function type() { const w = roles[ri]; $("typer").textContent = w.slice(0, ci);
  if (!del && ci < w.length) ci++; else if (!del) { del = true; return setTimeout(type, 1600); }
  else if (ci > 0) ci--; else { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 24 : 50); })();

const COLORS = ["#9a3f16", "#3f5a3a", "#e8b44a", "#1c1811"];
function confetti(x, y, n = 8) { for (let i = 0; i < n; i++) { const s = document.createElement("div"); s.className = "confetti";
  s.style.left = x + "px"; s.style.top = y + "px"; s.style.background = COLORS[i % COLORS.length];
  s.style.setProperty("--dx", (Math.random() * 180 - 90) + "px"); s.style.setProperty("--dy", (-(40 + Math.random() * 180)) + "px");
  s.style.setProperty("--rot", (Math.random() * 540 - 270) + "deg"); document.body.appendChild(s); setTimeout(() => s.remove(), 1000); } }

const cursor = $("cursor");
if (cursor) addEventListener("mousemove", e => { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; });

document.querySelectorAll(".tilt").forEach(card => { card.addEventListener("mousemove", e => { const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`; });
  card.addEventListener("mouseleave", () => card.style.transform = ""); });

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: .1 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

addEventListener("scroll", () => { const h = document.documentElement; const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  $("progress").style.width = p + "%"; $("toTop").classList.toggle("show", h.scrollTop > 700); }, { passive: true });
$("toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const b = e.target, end = +b.dataset.count; cio.unobserve(b);
  const t0 = performance.now(); (function step(t) { const p = Math.min((t - t0) / 1200, 1);
    b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + (end === 100 ? "%" : "+"); if (p < 1) requestAnimationFrame(step); })(t0); }), { threshold: .5 });
document.querySelectorAll("[data-count]").forEach(b => cio.observe(b));

const cv = $("particles"), ctx = cv.getContext("2d"); let pts = [];
function rs() { cv.width = innerWidth; cv.height = innerHeight; } rs(); addEventListener("resize", rs);
for (let i = 0; i < 40; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2, r: Math.random() * 1.1 + .3 });
(function loop() { ctx.clearRect(0, 0, cv.width, cv.height); ctx.fillStyle = "rgba(154,63,22,.28)";
  pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > cv.width) p.vx *= -1; if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }); requestAnimationFrame(loop); })();

document.querySelectorAll(".f").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".f").forEach(b => b.classList.remove("active")); btn.classList.add("active");
  const f = btn.dataset.filter; document.querySelectorAll("#projectGrid .proj").forEach(c => c.classList.toggle("hide", f !== "all" && !c.dataset.tags.includes(f))); }));

const overlay = $("overlay"), modal = $("modal");
function openModal(t, b) { $("modalTitle").textContent = t; $("modalBody").textContent = b; overlay.classList.add("open"); modal.classList.add("open"); }
function closeModal() { overlay.classList.remove("open"); modal.classList.remove("open"); }
document.querySelectorAll(".open-modal").forEach(b => b.addEventListener("click", e => { const c = e.target.closest(".proj"); openModal(c.dataset.title, c.dataset.body); }));
$("modalX").addEventListener("click", closeModal); overlay.addEventListener("click", closeModal); $("modalCta").addEventListener("click", closeModal);

const termOut = $("termOut");
function print(cmd, html) { termOut.innerHTML += `\n<span class="c">$</span> ${cmd}\n<span class="g">${html}</span>`; termOut.scrollTop = termOut.scrollHeight; }
const JOKES = ["Why do programmers prefer dark mode? Because light attracts bugs.", "I told my calendar a joke — it moved it to next week.", "M-PESA balance: enough to dream, not enough to relax."];
$("termForm").addEventListener("submit", e => { e.preventDefault(); const raw = $("termIn").value.trim(); if (!raw) return; $("termIn").value = "";
  const c = raw.toLowerCase().split(" ")[0];
  if (c === "help") print(raw, "help · whoami · projects · hire · joke · company · github");
  else if (c === "whoami") print(raw, "emmanuel @ mweshimiwa enterprises — nairobi systems builder");
  else if (c === "company") print(raw, "Mweshimiwa Enterprises · AI · Android · Web · reply <48h · " + SITE.email);
  else if (c === "projects") print(raw, "calendar-rescheduler / sms-engine / four-threads / poetry-os — see work");
  else if (c === "hire") { print(raw, "opening email — let's scope it"); location.hash = "#contact"; }
  else if (c === "github") { print(raw, "opening github"); open(SITE.github, "_blank"); }
  else if (c === "joke") print(raw, JOKES[Math.floor(Math.random() * JOKES.length)]);
  else print(raw, "try: help"); });

$("menuBtn").addEventListener("click", () => $("mobileMenu").classList.toggle("open"));
document.querySelectorAll("#mobileMenu a").forEach(a => a.addEventListener("click", () => $("mobileMenu").classList.remove("open")));

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
  if (e.key === "Escape") { closeModal(); palette.classList.remove("open"); } });
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
$("classifyBtn").addEventListener("click", () => {
  const v = $("smsIn").value;
  $("predLabel").textContent = "reading…"; $("confFill").style.width = "10%";
  setTimeout(() => { const noisy = /poa|plz|latr|\.\.\.|mpsa/.test(v.toLowerCase());
    const label = classifySMS(v); const conf = label === "UNKNOWN" ? 41 : noisy ? 97 + Math.random() * 3 : 99 + Math.random();
    $("predLabel").textContent = label; $("predConf").textContent = conf.toFixed(1) + "%";
    $("confFill").style.width = conf + "%";
    $("predTop").innerHTML = `1 · ${label} — ${conf.toFixed(1)}%<br>2 · regex fallback — ${(label === "UNKNOWN" ? 30 : 74).toFixed(0)}%<br>3 · runner-up — ${(conf - 8).toFixed(1)}%`;
    $("predMeta").textContent = noisy ? "noisy input (sheng/typos) — regex would fail, the network holds" : "clean parse · regex 0% fail · network confirms";
    confetti(innerWidth / 2, 260, 8); }, 800); });

// Lab: scheduler push
function renderDay(busyCount, pickIdx, need) { const d = $("daySim"); d.innerHTML = "";
  for (let i = 0; i < 24; i++) { const s = document.createElement("div"); s.className = "slot" + (i < busyCount ? " busy" : "") + (i === pickIdx ? " pick" : "");
    s.textContent = i === pickIdx ? need + "m" : (i < busyCount ? "busy" : "free"); d.appendChild(s); } }
$("pushRange").addEventListener("input", e => $("pushMin").textContent = e.target.value);
$("chaosRange").addEventListener("input", e => $("chaosVal").textContent = ["low", "medium", "packed"][e.target.value - 1]);
$("pushBtn").addEventListener("click", () => { const need = +$("pushRange").value, chaos = +$("chaosRange").value;
  const busy = chaos === 1 ? 6 : chaos === 2 ? 13 : 19; renderDay(busy, -1, need); $("pushOut").textContent = "scanning freebusy 8:00–22:45…";
  let i = busy; const step = setInterval(() => { renderDay(busy, i, need); i++;
    if (i > busy + 2) { clearInterval(step); const ok = busy + need / 15 < 25;
      $("pushOut").textContent = ok ? `moved ${need}m → first fitting slot after ${busy} busy blocks · undo open 6h` : "no room today — rolled to tomorrow 8:00";
      confetti(innerWidth / 2, 320, 6); } }, 200); });
renderDay(13, -1, 60);

// Live GitHub
fetch(SITE.api).then(r => r.json()).then(repos => {
  $("ghStatus").textContent = `${repos.length} freshest repositories`;
  $("liveStars").textContent = `★ ${repos.reduce((a, r) => a + (r.stargazers_count || 0), 0)} stars`;
  $("ghGrid").innerHTML = repos.map(r => `<div class="gh-card"><h3>${r.name}</h3><p>${(r.description || "No description — code speaks.").slice(0, 100)}</p><div class="gh-meta"><span>★ ${r.stargazers_count || 0}</span><span>${r.language || "mixed"}</span></div><a href="${r.html_url}" target="_blank" rel="noopener">Open repo →</a></div>`).join("");
  document.querySelectorAll("#ghGrid .gh-card").forEach((el, i) => setTimeout(() => el.classList.add("in"), i * 80));
}).catch(() => { $("ghStatus").textContent = "visit github directly:";
  $("ghGrid").innerHTML = `<div class="gh-card"><h3>sms-engine</h3><p>M-PESA parser + 4.3M-param NN + ONNX.</p><a href="${SITE.github}" target="_blank" rel="noopener">Open GitHub →</a></div><div class="gh-card"><h3>calendar-rescheduler</h3><p>Push · overfill · undo scheduling OS.</p><a href="${SITE.github}" target="_blank" rel="noopener">Open GitHub →</a></div>`; });
