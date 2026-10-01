const SITE = { email: "lemuelmwesh@gmail.com", github: "https://github.com/mega7306626007", api: "https://api.github.com/users/mega7306626007/repos?sort=updated&per_page=6" };
const $ = id => document.getElementById(id);

addEventListener("load", () => setTimeout(() => $("loader").classList.add("done"), 600));
setTimeout(() => $("loader").classList.add("done"), 2400);

function tick() { try { $("nairobiTime").textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" }).format(new Date()); } catch {} }
tick(); setInterval(tick, 20000);

const roles = ["training neural nets on M-PESA", "pushing calendar tasks", "weaving habits offline", "answering email in 48h", "shipping for Mweshimiwa"];
let ri = 0, ci = 0, del = false;
(function type() { const w = roles[ri]; $("typer").textContent = w.slice(0, ci);
  if (!del && ci < w.length) ci++; else if (!del) { del = true; return setTimeout(type, 1500); }
  else if (ci > 0) ci--; else { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 24 : 48); })();

const COLORS = ["#c8f04a", "#a78bfa", "#fbbf24", "#ff5f57", "#06b6d4", "#ec4899"];
function confetti(x, y, n = 10) { for (let i = 0; i < n; i++) { const s = document.createElement("div"); s.className = "confetti";
  s.style.left = x + "px"; s.style.top = y + "px"; s.style.background = COLORS[i % COLORS.length];
  s.style.setProperty("--dx", (Math.random() * 200 - 100) + "px"); s.style.setProperty("--dy", (-(40 + Math.random() * 200)) + "px");
  s.style.setProperty("--rot", (Math.random() * 600 - 300) + "deg"); document.body.appendChild(s); setTimeout(() => s.remove(), 1000); } }

const cursor = $("cursor");
addEventListener("mousemove", e => { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; });
document.querySelectorAll("[data-hover]").forEach(el => { el.addEventListener("mouseenter", () => { cursor.style.width = "24px"; cursor.style.height = "24px"; }); el.addEventListener("mouseleave", () => { cursor.style.width = "6px"; cursor.style.height = "6px"; }); });

document.querySelectorAll(".tilt").forEach(card => { card.addEventListener("mousemove", e => { const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`; });
  card.addEventListener("mouseleave", () => card.style.transform = ""); });

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: .12 });
document.querySelectorAll(".reveal,.section").forEach(el => io.observe(el));

addEventListener("scroll", () => { const h = document.documentElement; const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  $("progress").style.width = p + "%"; $("toTop").classList.toggle("show", h.scrollTop > 700);
  $("nav").style.borderBottomColor = h.scrollTop > 10 ? "rgba(200,240,74,.2)" : ""; });
$("toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const b = e.target, end = +b.dataset.count; cio.unobserve(b);
  const t0 = performance.now(); (function step(t) { const p = Math.min((t - t0) / 1200, 1);
    b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + (end === 100 ? "%" : "+"); if (p < 1) requestAnimationFrame(step); })(t0); }), { threshold: .5 });
document.querySelectorAll("[data-count]").forEach(b => cio.observe(b));

const cv = $("particles"), ctx = cv.getContext("2d"); let pts = [];
function rs() { cv.width = innerWidth; cv.height = innerHeight; } rs(); addEventListener("resize", rs);
for (let i = 0; i < 50; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.2 + .3 });
(function loop() { ctx.clearRect(0, 0, cv.width, cv.height); ctx.fillStyle = "rgba(200,240,74,.35)";
  pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > cv.width) p.vx *= -1; if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }); requestAnimationFrame(loop); })();

document.querySelectorAll(".f").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".f").forEach(b => b.classList.remove("active")); btn.classList.add("active");
  const f = btn.dataset.filter; document.querySelectorAll("#projectGrid .card").forEach(c => c.classList.toggle("hide", f !== "all" && !c.dataset.tags.includes(f))); }));

const overlay = $("overlay"), modal = $("modal");
function openModal(t, b) { $("modalTitle").textContent = t; $("modalBody").textContent = b; overlay.classList.add("open"); modal.classList.add("open"); }
function closeModal() { overlay.classList.remove("open"); modal.classList.remove("open"); }
document.querySelectorAll(".open-modal").forEach(b => b.addEventListener("click", e => { const c = e.target.closest(".card"); openModal(c.dataset.title, c.dataset.body); }));
$("modalX").addEventListener("click", closeModal); overlay.addEventListener("click", closeModal); $("modalCta").addEventListener("click", closeModal);

const termOut = $("termOut");
function print(cmd, html) { termOut.innerHTML += `\n<span class="c">$</span> ${cmd}\n<span class="g">${html}</span>`; termOut.scrollTop = termOut.scrollHeight; }
const JOKES = ["Why do programmers prefer dark mode? Because light attracts bugs.", "I told my calendar a joke — it moved it to next week.", "M-PESA balance: enough to dream, not enough to relax."];
$("termForm").addEventListener("submit", e => { e.preventDefault(); const raw = $("termIn").value.trim(); if (!raw) return; $("termIn").value = "";
  const [c, ...rest] = raw.toLowerCase().split(" "); const arg = rest.join(" ");
  if (c === "help") print(raw, "help · whoami · projects · hire · joke · company · github");
  else if (c === "whoami") print(raw, "emmanuel @ mweshimiwa enterprises — nairobi systems builder");
  else if (c === "company") print(raw, "Mweshimiwa Enterprises · AI · Android · Web · reply <48h · " + SITE.email);
  else if (c === "projects") print(raw, "calendar-rescheduler / sms-engine / four-threads / poetry-os — scroll to work");
  else if (c === "hire") { print(raw, "opening email — let's scope it"); location.hash = "#contact"; }
  else if (c === "github") { print(raw, "opening github"); open(SITE.github, "_blank"); }
  else if (c === "joke") print(raw, JOKES[Math.floor(Math.random() * JOKES.length)]);
  else if (c === "confetti") { print(raw, "confetti"); confetti(innerWidth / 2, innerHeight / 2, 30); }
  else print(raw, "try: help"); });

$("menuBtn").addEventListener("click", () => $("mobileMenu").classList.toggle("open"));
document.querySelectorAll("#mobileMenu a").forEach(a => a.addEventListener("click", () => $("mobileMenu").classList.remove("open")));

$("copyEmail").addEventListener("click", async () => { try { await navigator.clipboard.writeText(SITE.email); toast("email copied"); } catch { toast(SITE.email); } });

function toast(msg) { document.querySelectorAll(".toast-pop").forEach(t => t.remove()); const t = document.createElement("div");
  t.className = "toast-pop"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); }

const palette = $("palette"), palInput = $("palInput"), palList = $("palList");
const cmds = [{ n: "View work", fn: () => location.hash = "#work" }, { n: "View demos", fn: () => location.hash = "#demos" },
  { n: "About", fn: () => location.hash = "#about" }, { n: "GitHub", fn: () => location.hash = "#github" },
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

// Live demos
const dtLines = [
  ["$", "python engine.py run --n 5000"],
  ["ok", "parse_fail_rate=0.0 — 29/29 types"],
  ["$", "train-nn --n 100000 --noise 0.35"],
  ["ok", "4.31M params — macro-F1 1.0"],
  ["$", "finance --in parsed.json"],
  ["ok", "income 706k — credit gap 170k"],
  ["$", "onnx export → android"],
  ["ok", "model.onnx ready"],
];
let dtIdx = 0;
setInterval(() => { const dt = $("dtBody"); if (!dt) return;
  const [p, t] = dtLines[dtIdx % dtLines.length];
  dt.innerHTML += `<span class="c">${p}</span> <span class="g">${t}</span>\n`;
  dtIdx++;
  if (dtIdx > 10) dt.innerHTML = "";
}, 1500);

const dw = $("demoWeave");
if (dw) { const dctx = dw.getContext("2d");
  const dThreads = [["#c8f04a", 0], ["#a78bfa", 5], ["#fbbf24", 10], ["#06b6d4", 15]];
  let dLast = null, dAngle = 0;
  setInterval(() => { dAngle += .03;
    const x = dw.width / 2 + Math.cos(dAngle) * 100, y = dw.height / 2 + Math.sin(dAngle * 1.3) * 50;
    if (dLast) { dThreads.forEach(([col, off]) => { dctx.strokeStyle = col; dctx.lineWidth = 1.5; dctx.beginPath();
      dctx.moveTo(dLast.x + off * .2, dLast.y + off * .2);
      dctx.quadraticCurveTo((dLast.x + x) / 2 + Math.sin(x) * 5, (dLast.y + y) / 2, x + off * .2, y + off * .2); dctx.stroke(); }); }
    dLast = { x, y };
    if (dAngle > 40) { dctx.clearRect(0, 0, dw.width, dw.height); dAngle = 0; dLast = null; }
  }, 50); }

const poemLines = ["The matatu hums at dawn,", "Nairobi wakes in gold.", "I weave my threads —", "body, mind, craft, soul.", "Slow web. Deep work."];
let poemIdx = 0, poemChar = 0, poemDel = false;
setInterval(() => { const pt = $("poemText"); if (!pt) return;
  const line = poemLines[poemIdx];
  if (!poemDel && poemChar <= line.length) { pt.textContent = poemLines.slice(0, poemIdx).join("\n") + (poemIdx ? "\n" : "") + line.slice(0, poemChar); poemChar++; }
  else if (!poemDel) { poemDel = true; return; }
  else if (poemChar > 0) { poemChar--; pt.textContent = poemLines.slice(0, poemIdx).join("\n") + (poemIdx ? "\n" : "") + line.slice(0, poemChar); }
  else { poemDel = false; poemIdx = (poemIdx + 1) % poemLines.length; if (poemIdx === 0) pt.textContent = ""; }
}, 55);

const wf = $("waveform");
if (wf) { for (let i = 0; i < 20; i++) { const b = document.createElement("i"); wf.appendChild(b); } }

fetch(SITE.api).then(r => r.json()).then(repos => {
  $("ghStatus").textContent = `${repos.length} freshest repos`;
  $("liveStars").textContent = `★ ${repos.reduce((a, r) => a + (r.stargazers_count || 0), 0)} stars`;
  $("ghGrid").innerHTML = repos.map(r => `<div class="gh-card reveal in"><h3>${r.name}</h3><p>${(r.description || "No description — code speaks.").slice(0, 100)}</p><div class="gh-meta"><span>★ ${r.stargazers_count || 0}</span><span>${r.language || "mixed"}</span></div><a href="${r.html_url}" target="_blank" rel="noopener" data-hover>Open repo</a></div>`).join("");
}).catch(() => { $("ghStatus").textContent = "visit github directly:";
  $("ghGrid").innerHTML = `<div class="gh-card"><h3>sms-engine</h3><p>M-PESA parser + 4.3M-param NN + ONNX.</p><a href="${SITE.github}" target="_blank" rel="noopener">Open GitHub</a></div><div class="gh-card"><h3>calendar-rescheduler</h3><p>Push · overfill · undo scheduling OS.</p><a href="${SITE.github}" target="_blank" rel="noopener">Open GitHub</a></div>`; });
