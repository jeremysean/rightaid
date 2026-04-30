/* RightAid Shared Utilities */
/* Session state */
var SESSION = {
  user: { name: "Analis Kebijakan", role: "Kemensos RI", email: "guest@rightaid.id" },
  province: null,
  scenario: "normal",
  anomalyPct: 15,
  generated: false
};

function saveSession() {
  try {
    var s = Object.assign({}, SESSION);
    sessionStorage.setItem("rightaid_session", JSON.stringify(s));
  } catch(e) {}
}

function loadSession() {
  try {
    var raw = sessionStorage.getItem("rightaid_session");
    if (raw) Object.assign(SESSION, JSON.parse(raw));
  } catch(e) {}
}

function goTo(page) { window.location.href = page; }

function showToast(msg, type) {
  type = type || "default";
  var c = document.getElementById("toast-container");
  if (!c) return;
  var t = document.createElement("div");
  t.className = "toast " + type;
  t.innerHTML = msg;
  c.appendChild(t);
  setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 3000);
}

function fmtNum(n, dec) {
  dec = dec || 0;
  return Number(n).toLocaleString("id-ID", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function fmtPct(n, dec) { dec = dec !== undefined ? dec : 1; return Number(n).toFixed(dec) + "%"; }
function fmtRp(n) { return "Rp" + fmtNum(Math.round(n)); }

function buildSidebar(activePage) {
  var iconDash = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>';
  var iconGen  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>';
  var iconAna  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>';
  var iconPol  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
  var iconGlobe = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>';
  var iconLogout = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';

  var nav = [
    { id: "dashboard", label: "Beranda",       icon: iconDash, href: "dashboard.html" },
    { id: "generator", label: "Data Viewer",   icon: iconGen,  href: "data-viewer.html" },
    { id: "analysis",  label: "Analisis Model",icon: iconAna,  href: "analysis.html"  },
    { id: "policy",    label: "Policy Brief",  icon: iconPol,  href: "policy.html"    }
  ];

  var initials = SESSION.user.name.split(" ").map(function(w) { return w[0]; }).join("").slice(0, 2).toUpperCase();

  var navHTML = nav.map(function(item) {
    var cls = "nav-item" + (activePage === item.id ? " active" : "");
    return '<a href="' + item.href + '" class="' + cls + '">' + item.icon + '<span>' + item.label + '</span></a>';
  }).join("");

  return [
    '<aside class="sidebar" id="sidebar">',
    '<div class="sidebar-logo">',
    '<div class="logo-mark">' + iconGlobe + '</div>',
    '<div class="brand">Right<span>Aid</span></div>',
    '</div>',
    '<nav class="sidebar-nav">',
    '<div class="nav-section-label">Menu Utama</div>',
    navHTML,
    '</nav>',
    '<div class="sidebar-footer">',
    '<div class="avatar"><span>' + initials + '</span></div>',
    '<div class="user-info">',
    '<div class="user-name">' + SESSION.user.name + '</div>',
    '<div class="user-role">' + SESSION.user.role + '</div>',
    '</div></div></aside>'
  ].join("");
}

function buildTopbar(title, actions) {
  actions = actions || "";
  var iconLogout = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
  var iconMenu = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  
  return [
    '<header class="topbar">',
    '<div style="display:flex;align-items:center;gap:12px;">',
    '<button class="mobile-menu-btn" onclick="document.getElementById(\'sidebar\').classList.toggle(\'open\')">' + iconMenu + '</button>',
    '<div class="topbar-title">' + title + '</div>',
    '</div>',
    '<div class="topbar-actions">' + actions,
    '<button class="btn btn-secondary btn-sm" onclick="goTo(\'index.html\')">' + iconLogout + ' Logout</button>',
    '</div></header>'
  ].join("");
}

function injectToastContainer() {
  if (!document.getElementById("toast-container")) {
    var div = document.createElement("div");
    div.id = "toast-container";
    document.body.appendChild(div);
  }
}

function sleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }
/* Canvas width helper */
function getCanvasWidth(canvas, fallback) {
  var w = canvas.offsetWidth;
  if (!w && canvas.parentElement) w = canvas.parentElement.clientWidth;
  if (!w) w = fallback || 800;
  return w;
}
/* Auto-redraw on resize */
function watchCanvas(canvas, drawFn) {
  drawFn(canvas);
  if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
    var ro = new ResizeObserver(function() {
      var newW = canvas.parentElement.clientWidth;
      if (newW && newW !== canvas.width) { canvas.width = newW; drawFn(canvas); }
    });
    ro.observe(canvas.parentElement);
  }
}
/* Bar chart */
function _drawBar(canvas, labels, datasets, opts) {
  opts = opts || {};
  var ctx = canvas.getContext("2d");
  var w = canvas.width, h = canvas.height;
  var pad = { top: 20, right: 16, bottom: 36, left: 44 };
  var chartW = w - pad.left - pad.right;
  var chartH = h - pad.top - pad.bottom;
  var n = labels.length;
  var colors = opts.colors || ["#2563EB", "#DC2626", "#16A34A"];
  var allVals = [];
  datasets.forEach(function(d) { d.data.forEach(function(v) { allVals.push(v); }); });
  var maxVal = Math.max.apply(null, allVals) * 1.15;
  ctx.clearRect(0, 0, w, h);
  ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#9CA3AF";
  for (var i = 0; i <= 4; i++) {
    var v = Math.round((maxVal / 4) * i);
    var y = pad.top + chartH - (v / maxVal) * chartH;
    ctx.fillText(v, 4, y + 3);
    ctx.strokeStyle = "#E5E7EB"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + chartW, y); ctx.stroke();
  }
  var groupW = chartW / n;
  var barW = Math.max(2, (groupW - 12) / datasets.length);
  datasets.forEach(function(dataset, di) {
    ctx.fillStyle = colors[di % colors.length];
    dataset.data.forEach(function(val, i) {
      var bh = (val / maxVal) * chartH;
      var x = pad.left + i * groupW + 6 + di * barW;
      var y2 = pad.top + chartH - bh;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y2, barW - 2, bh, [2, 2, 0, 0]);
      else ctx.rect(x, y2, barW - 2, bh);
      ctx.fill();
    });
  });
  ctx.fillStyle = "#9CA3AF";
  labels.forEach(function(lbl, i) {
    var x = pad.left + i * groupW + groupW / 2;
    ctx.fillText(lbl, x - ctx.measureText(lbl).width / 2, h - 8);
  });
}

function drawBarChart(canvas, labels, datasets, opts) {
  canvas.width = getCanvasWidth(canvas, 900);
  watchCanvas(canvas, function(c) { _drawBar(c, labels, datasets, opts); });
}
/* Line chart */
function _drawLine(canvas, labels, datasets, opts) {
  opts = opts || {};
  var ctx = canvas.getContext("2d");
  var w = canvas.width, h = canvas.height;
  var pad = { top: 20, right: 16, bottom: 36, left: 44 };
  var chartW = w - pad.left - pad.right;
  var chartH = h - pad.top - pad.bottom;
  var colors = opts.colors || ["#2563EB", "#DC2626"];
  var allVals = [];
  datasets.forEach(function(d) { d.data.forEach(function(v) { allVals.push(v); }); });
  var maxVal = Math.max.apply(null, allVals) * 1.2;
  var n = labels.length;
  ctx.clearRect(0, 0, w, h);
  ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#9CA3AF";
  for (var i = 0; i <= 4; i++) {
    var v = Math.round((maxVal / 4) * i);
    var y = pad.top + chartH - (v / maxVal) * chartH;
    ctx.fillText(v + "%", 2, y + 3);
    ctx.strokeStyle = "#E5E7EB"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + chartW, y); ctx.stroke();
  }
  datasets.forEach(function(ds, di) {
    var col = colors[di % colors.length];
    ctx.strokeStyle = col; ctx.lineWidth = 2;
    ctx.beginPath();
    ds.data.forEach(function(val, i) {
      var x = pad.left + (i / (n - 1)) * chartW;
      var y2 = pad.top + chartH - (val / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y2); else ctx.lineTo(x, y2);
    });
    ctx.stroke();
    ctx.fillStyle = col;
    ds.data.forEach(function(val, i) {
      var x = pad.left + (i / (n - 1)) * chartW;
      var y2 = pad.top + chartH - (val / maxVal) * chartH;
      ctx.beginPath(); ctx.arc(x, y2, 3, 0, Math.PI * 2); ctx.fill();
    });
  });
  ctx.fillStyle = "#9CA3AF";
  labels.forEach(function(lbl, i) {
    var x = pad.left + (i / (n - 1)) * chartW;
    ctx.fillText(lbl, x - ctx.measureText(lbl).width / 2, h - 8);
  });
}

function drawLineChart(canvas, labels, datasets, opts) {
  canvas.width = getCanvasWidth(canvas, 520);
  watchCanvas(canvas, function(c) { _drawLine(c, labels, datasets, opts); });
}
/* SHAP visualizer */
function renderSHAP(container, shapData) {
  var maxAbs = 0;
  shapData.forEach(function(d) { if (Math.abs(d.value) > maxAbs) maxAbs = Math.abs(d.value); });
  container.innerHTML = shapData.map(function(d) {
    var pct = Math.abs(d.value) / maxAbs * 45;
    var isPos = d.value > 0;
    return [
      '<div class="shap-row">',
      '<div class="shap-label">' + d.feature + '</div>',
      '<div class="shap-bar-wrap">',
      '<div class="shap-bar-center"></div>',
      '<div class="shap-bar-fill ' + (isPos ? 'pos' : 'neg') + '" style="width:' + pct + '%"></div>',
      '</div>',
      '<div class="shap-val ' + (isPos ? 'pos' : 'neg') + '">' + (isPos ? '+' : '') + d.value.toFixed(2) + '</div>',
      '</div>'
    ].join("");
  }).join("");
}
/* Synchronous init - runs immediately when script is parsed */
loadSession();
(function() {
  var isDeployed = window.location.protocol === "https:";
  var path = window.location.pathname;
  var isLoginPage = path.includes("index.html") || path === "/" || path === "" || path.endsWith("/frontend/");
  if (isDeployed && !isLoginPage && !sessionStorage.getItem("rightaid_session")) {
    goTo("index.html");
    return;
  }
  if (!sessionStorage.getItem("rightaid_session")) {
    SESSION.user     = { name: "Analis Kebijakan", role: "Kemensos RI", email: "guest@rightaid.id" };
    SESSION.province = SESSION.province || "JB";
    SESSION.scenario = SESSION.scenario || "normal";
    SESSION.anomalyPct = SESSION.anomalyPct || 15;
    saveSession();
  }
})();

document.addEventListener("DOMContentLoaded", function() {
  injectToastContainer();
});

window.App = {
  SESSION: SESSION,
  saveSession: saveSession,
  loadSession: loadSession,
  goTo: goTo,
  showToast: showToast,
  fmtNum: fmtNum,
  fmtPct: fmtPct,
  fmtRp: fmtRp,
  buildSidebar: buildSidebar,
  buildTopbar: buildTopbar,
  sleep: sleep,
  drawBarChart: drawBarChart,
  drawLineChart: drawLineChart,
  renderSHAP: renderSHAP
};
