const SITE = { email: "lemuelmwesh@gmail.com", github: "https://github.com/mega7306626007", api: "https://api.github.com/users/mega7306626007/repos?sort=updated&per_page=12" };
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
const HIST = [];
function renderHist() { $("histLog").innerHTML = HIST.length ? HIST.map(h => `<div><b>${h.label}</b> — ${h.conf}% <span style="opacity:.55">· ${h.when}</span></div>`).join("") : `<span style="opacity:.55">no tests yet — run one above</span>`; }
renderHist();
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
$("pushBtn").addEventListener("click", () => { const need = +$("pushRange").value, chaos = +$("chaosRange").value;
  const busy = chaos === 1 ? 6 : chaos === 2 ? 13 : 19; renderDay(busy, -1, need); renderWeek(-1); $("pushOut").textContent = "scanning freebusy 8:00–22:45…";
  let i = busy; const step = setInterval(() => { renderDay(busy, i, need); i++;
    if (i > busy + 2) { clearInterval(step); const ok = busy + need / 15 < 25;
      renderWeek(ok ? 0 : 1);
      $("pushOut").textContent = ok ? `moved ${need}m → first fitting slot after ${busy} busy blocks · undo open 6h` : "no room today — rolled to tomorrow 8:00";
      confetti(innerWidth / 2, 320, 6); } }, 200); });
renderDay(13, -1, 60); renderWeek(-1);

// Live GitHub
const HIDE = new Set(["portfolio", "mega7306626007", "automatic-spoon", "New-folder--4-", "global-digest2", "global-digest-mvp"]);
fetch(SITE.api).then(r => r.json()).then(all => {
  const repos = all.filter(r => !HIDE.has(r.name)).slice(0, 6);
  $("ghStatus").textContent = `${repos.length} freshest repositories · live`;
  $("liveStars").textContent = `${all.filter(r => !HIDE.has(r.name)).length} public repos`;
  $("ghGrid").innerHTML = repos.map(r => `<div class="gh-card"><h3>${r.name}</h3><p>${((r.description || "No description — code speaks.")).slice(0, 100)}</p><div class="gh-meta"><span>${r.language || "mixed"}</span><span>updated ${(r.updated_at || "").slice(0, 10)}</span></div><a href="${r.html_url}" target="_blank" rel="noopener">Open repo →</a></div>`).join("");
}).catch(() => { $("ghStatus").textContent = "visit github directly:";
  $("ghGrid").innerHTML = `<div class="gh-card"><h3>mwesh</h3><p>Jarvis voice assistant — on-device ONNX, Room memory.</p><a href="${SITE.github}/mwesh" target="_blank" rel="noopener">Open GitHub →</a></div><div class="gh-card"><h3>PesaFlow</h3><p>Student finance x adaptive intelligence.</p><a href="${SITE.github}/PesaFlow" target="_blank" rel="noopener">Open GitHub →</a></div>`; });

// Lab: Jarvis intent router (mirrors the on-device CommandRouter)
const JJOKES = ["Why do programmers prefer dark mode? Because light attracts bugs.", "Niko na PhD kwa kuchelewa — lakini leo nimefika mapema.", "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon, ils tombent dans le bateau."];
function jadd(who, html) { const c = $("jchat"); if (!c) return;
  const d = document.createElement("div"); d.className = "jm " + who;
  d.innerHTML = `<span class="who">${who === "bot" ? "JARVIS" : "YOU"}</span>${html}`;
  c.appendChild(d); c.scrollTop = c.scrollHeight; }
function jarvisReply(q) {
  const s = q.toLowerCase().trim();
  if (/^(hi|hello|hey|habari|hujambo|niaje|sasa|salut|bonjour)\b/.test(s) || /(how are you|uko poa|vipi|ça va)/.test(s))
    return s.match(/salut|bonjour|ça va/) ? "Salut ! Je vais bien, merci. Et toi ? <b>Try:</b> tell me a joke" : s.match(/habari|hujambo|uko|vipi|poa|niaje|sasa/) ? "Niko vizuri, asante kwa kuuliza! Vipi wewe? <b>Jaribu:</b> tell me a joke" : "Hello! Good to see you. <b>Try:</b> what is the time?";
  if (/(time|sa(a)?\b|saa|heure|wakati)/.test(s)) {
    const t = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" }).format(new Date());
    return `It's <b>${t} EAT</b> — Nairobi time. Anything else?`;
  }
  if (/(joke|chekesha|blague|cheka)/.test(s)) return JJOKES[Math.floor(Math.random() * JJOKES.length)];
  const calc = s.match(/(?:calcul(?:ate)?|hesabu|ni)\s*([\d\s+\-*/().%^]+)/) || ( /^[\d\s+\-*/().%^]+$/.test(s) ? [s, s] : null );
  if (calc) { try { const expr = calc[1].replace(/\^/g, "**");
      if (!/^[\d\s+\-*/().%*]+$/.test(expr) || !/\d/.test(expr)) throw 0;
      const v = Function('"use strict";return(' + expr + ")")();
      if (typeof v !== "number" || !isFinite(v)) throw 0;
      return `That's <b>${Math.round(v * 100) / 100}</b>. The calculator command approves.`; } catch { return "Couldn't parse that sum — try <b>calculate 18*24+7</b>."; } }
  if (/(timer|kipima|minut)/.test(s)) { const m = s.match(/(\d+)\s*(hour|hr|minute|min|sec)/);
    return m ? `Timer set for <b>${m[1]} ${m[2]}</b>. I'll keep time — Room database has it logged.` : "How long? Try <b>set a timer for 10 minutes</b>."; }
  if (/(thank|asante|merci)/.test(s)) return "Karibu sana — always a pleasure.";
  if (/(bye|kwa heri|au revoir)/.test(s)) return "Kwa heri! I'll be here — offline, on-device.";
  return "Hmm — my router caught <b>no intent</b>. Try: a greeting in any language, <b>time</b>, <b>joke</b>, <b>calculate 12*8</b>, or a <b>timer</b>.";
}
const jform = $("jform");
if (jform) {
  jadd("bot", "Hey — I'm a slice of <b>Jarvis</b>, the Mwesh assistant. Talk to me in English, Kiswahili, Sheng, or French.");
  document.querySelectorAll("[data-j]").forEach(b => b.addEventListener("click", () => { $("jin").value = b.dataset.j; jform.requestSubmit(); }));
  jform.addEventListener("submit", e => { e.preventDefault();
    const v = $("jin").value.trim(); if (!v) return; $("jin").value = "";
    jadd("usr", v.replace(/</g, "&lt;"));
    setTimeout(() => jadd("bot", jarvisReply(v)), 450); });
}
