/* RightAid API Client
 * ---------------------------------------------------------------------------
 * Talks to the FastAPI backend when an API base URL is configured, and falls
 * back transparently to the local EkoData demo layer when the backend is unset
 * or unreachable. This lets the same build run as a live app (against the API)
 * and as a static demo (e.g. on Netlify with no backend).
 *
 * Configure the backend in any of these ways (checked in order):
 *   1. window.RIGHTAID_CONFIG = { API_BASE: "https://api.example.com" }
 *   2. localStorage "rightaid_api_base"
 *   3. ?api=https://api.example.com  (also persisted to localStorage)
 * Leave it empty to force demo mode.
 */
(function () {
  "use strict";

  function ApiError(message, status) {
    this.message = message;
    this.status = status || 0;
  }
  ApiError.prototype = Object.create(Error.prototype);

  /* ── Base URL resolution ──────────────────────────────────────────────── */
  function resolveBase() {
    var cfg = window.RIGHTAID_CONFIG || {};
    var base = "";
    try {
      var qs = new URLSearchParams(window.location.search);
      if (qs.has("api")) {
        base = qs.get("api");
        localStorage.setItem("rightaid_api_base", base);
      }
    } catch (e) {}
    if (!base) {
      try { base = localStorage.getItem("rightaid_api_base") || ""; } catch (e) {}
    }
    if (!base) base = cfg.API_BASE || "";
    return base.replace(/\/+$/, "");
  }

  var Api = {
    base: resolveBase(),
    token: null,
    online: false,        // set true after a successful /health check
    _warned: false,
    _demoState: null       // { province, scenario, anomalyPct, records }
  };
  Api.enabled = !!Api.base; // a backend URL is configured

  try { Api.token = sessionStorage.getItem("rightaid_token") || null; } catch (e) {}

  Api.setToken = function (t) {
    Api.token = t || null;
    try {
      if (t) sessionStorage.setItem("rightaid_token", t);
      else sessionStorage.removeItem("rightaid_token");
    } catch (e) {}
  };

  Api.setApiBase = function (url) {
    try { localStorage.setItem("rightaid_api_base", url || ""); } catch (e) {}
    Api.base = (url || "").replace(/\/+$/, "");
    Api.enabled = !!Api.base;
  };

  /* ── Low-level fetch helpers ──────────────────────────────────────────── */
  function timeoutSignal(ms) {
    if (typeof AbortController === "undefined") return undefined;
    var c = new AbortController();
    setTimeout(function () { c.abort(); }, ms);
    return c.signal;
  }

  function _fetch(path, opts) {
    opts = opts || {};
    opts.headers = Object.assign(
      { "Content-Type": "application/json" },
      opts.headers || {}
    );
    if (Api.token) opts.headers["Authorization"] = "Bearer " + Api.token;
    if (opts.timeout !== false) opts.signal = timeoutSignal(opts.timeout || 20000);

    return fetch(Api.base + path, opts).then(function (res) {
      if (res.status === 401) {
        Api.setToken(null);
        throw new ApiError("unauthorized", 401);
      }
      if (!res.ok) {
        return res.text().then(function (t) {
          var msg = t;
          try { msg = JSON.parse(t).detail || t; } catch (e) {}
          throw new ApiError(msg || res.statusText, res.status);
        });
      }
      return res;
    });
  }
  function _get(p, opts) { return _fetch(p, opts).then(function (r) { return r.json(); }); }
  function _post(p, body, opts) {
    return _fetch(p, Object.assign({ method: "POST", body: JSON.stringify(body || {}) }, opts || {}))
      .then(function (r) { return r.json(); });
  }

  Api._fellBack = function (err) {
    if (!Api._warned) {
      Api._warned = true;
      Api.online = false;
      if (window.App && App.showToast) {
        App.showToast("Backend tidak tersedia &mdash; menampilkan data demo.", "warning");
      }
      updateConnChip();
    }
  };

  /* ── Health check / connection indicator ──────────────────────────────── */
  function updateConnChip() {
    var el = document.getElementById("conn-chip");
    if (!el) return;
    if (!Api.enabled) {
      el.textContent = "Mode Demo";
      el.className = "conn-chip demo";
      el.title = "Tidak ada backend dikonfigurasi — data simulasi lokal.";
    } else if (Api.online) {
      el.textContent = "Live";
      el.className = "conn-chip live";
      el.title = "Terhubung ke backend RightAid API.";
    } else {
      el.textContent = "Demo (offline)";
      el.className = "conn-chip demo";
      el.title = "Backend tidak merespons — fallback ke data demo.";
    }
  }
  Api.updateConnChip = updateConnChip;

  Api.checkHealth = function () {
    if (!Api.enabled) { Api.online = false; updateConnChip(); return Promise.resolve(false); }
    return _get("/health", { timeout: 6000 })
      .then(function (r) { Api.online = !!(r && r.status === "ok"); updateConnChip(); return Api.online; })
      .catch(function () { Api.online = false; updateConnChip(); return false; });
  };

  /* ── Province normalisation ───────────────────────────────────────────── */
  // Backend returns id == full province name; demo uses 2-letter codes.
  function demoProvinces() {
    return EkoData.PROVINCES.map(function (p) {
      return {
        id: p.id, name: p.name,
        povertyRate: p.povertyRate, giniCoef: p.giniCoef,
        avgHHSize: p.avgHHSize,
        pctFloorDirt: p.pctFloorDirt, pctNoElec: p.pctNoElec, pctNoCar: p.pctNoCar
      };
    });
  }

  Api.getProvinces = function () {
    if (Api.enabled) {
      return _get("/api/provinces").then(function (rows) {
        return rows.map(function (c) {
          return {
            id: c.id, name: c.name,
            povertyRate: c.povertyRate, giniCoef: c.giniCoef,
            avgHHSize: c.avgHHSize,
            urbanPct: c.urbanPct,
            pctMotorcycle: c.pctMotorcycle, pctCar: c.pctCar,
            pctElectricity: c.pctElectricity,
            pctNoElec: c.pctElectricity != null ? +(100 - c.pctElectricity).toFixed(1) : undefined
          };
        });
      }).catch(function (e) { Api._fellBack(e); return demoProvinces(); });
    }
    return Promise.resolve(demoProvinces());
  };

  /* ── Auth ─────────────────────────────────────────────────────────────── */
  function demoLogin(email, password) {
    var creds = {
      "guest@rightaid.id": { p: "guest123", name: "Guest Analyst", role: "Kemensos RI" },
      "guest@rightaid": { p: "guest123", name: "Analis Kebijakan", role: "Kemensos RI" },
      "analis@kemensos.go.id": { p: "kemensos2025", name: "Analis Kemensos", role: "Kemensos RI" }
    };
    var u = creds[email];
    if (u && password === u.p) {
      return { ok: true, mode: "demo", user: { name: u.name, role: u.role, email: email } };
    }
    return { ok: false, error: "invalid" };
  }

  Api.login = function (email, password) {
    if (Api.enabled) {
      return _post("/api/auth/login", { email: email, password: password })
        .then(function (r) {
          Api.setToken(r.token);
          Api.online = true; updateConnChip();
          var u = r.user || {};
          return {
            ok: true, mode: "backend",
            user: { name: u.name || "Analis", role: u.role || "RightAid", email: u.email || email }
          };
        })
        .catch(function (e) {
          if (e.status === 401) return { ok: false, error: "invalid" };
          Api._fellBack(e);                 // network/server error → demo
          return demoLogin(email, password);
        });
    }
    return Promise.resolve(demoLogin(email, password));
  };

  Api.logout = function () {
    var done = function () { Api.setToken(null); };
    if (Api.enabled && Api.token) {
      return _post("/api/auth/logout", {}).then(done).catch(done);
    }
    done();
    return Promise.resolve();
  };

  /* ── National stats / trend / model comparison ────────────────────────── */
  Api.getNationalStats = function () {
    if (Api.enabled) {
      return _get("/api/stats/national").catch(function (e) {
        Api._fellBack(e); return EkoData.NATIONAL_STATS;
      });
    }
    return Promise.resolve(EkoData.NATIONAL_STATS);
  };

  Api.getTrend = function () {
    if (Api.enabled) {
      return _get("/api/stats/trend").catch(function (e) {
        Api._fellBack(e); return EkoData.MONTHLY_TREND;
      });
    }
    return Promise.resolve(EkoData.MONTHLY_TREND);
  };

  Api.getModelComparison = function () {
    if (Api.enabled) {
      return _get("/api/model/comparison").catch(function (e) {
        Api._fellBack(e); return EkoData.ACCURACY_COMPARISON;
      });
    }
    return Promise.resolve(EkoData.ACCURACY_COMPARISON);
  };

  /* ── Generate ─────────────────────────────────────────────────────────── */
  Api.generate = function (provinceId, scenario, anomalyPct, n) {
    if (Api.enabled) {
      var body = {
        province_id: provinceId,
        scenario: scenario,
        anomaly_pct: Math.max(0, Math.min(0.5, (anomalyPct || 0) / 100)),
        n: Math.max(100, Math.min(50000, n || 5000))
      };
      return _post("/api/generate", body).then(function (r) {
        Api.online = true; updateConnChip();
        return { mode: "backend", session_id: r.session_id, total: r.total_records, preview: r.preview };
      }).catch(function (e) {
        Api._fellBack(e);
        return demoGenerate(provinceId, scenario, anomalyPct);
      });
    }
    return Promise.resolve(demoGenerate(provinceId, scenario, anomalyPct));
  };

  function demoGenerate(provinceId, scenario, anomalyPct) {
    var records = EkoData.generateHouseholds(provinceId, scenario, anomalyPct);
    Api._demoState = {
      province: provinceId, scenario: scenario, anomalyPct: anomalyPct, records: records
    };
    return { mode: "demo", session_id: "demo", total: records.length, records: records };
  }

  // Deterministic demo regeneration so pages stay consistent across navigation.
  function demoRecords() {
    var S = (window.App && App.SESSION) || {};
    var pid = S.province || EkoData.PROVINCES[0].id;
    var sc = S.scenario || "normal";
    var ap = S.anomalyPct != null ? S.anomalyPct : 15;
    if (!Api._demoState || Api._demoState.province !== pid ||
        Api._demoState.scenario !== sc || Api._demoState.anomalyPct !== ap) {
      demoGenerate(pid, sc, ap);
    }
    return Api._demoState.records;
  }

  /* ── Data (paginated) ─────────────────────────────────────────────────── */
  Api.getData = function (sessionId, page, limit) {
    page = page || 1; limit = limit || 50;
    if (Api.enabled && sessionId && sessionId !== "demo") {
      return _get("/api/data/" + encodeURIComponent(sessionId) + "?page=" + page + "&limit=" + limit)
        .catch(function (e) { Api._fellBack(e); return demoPage(page, limit); });
    }
    return Promise.resolve(demoPage(page, limit));
  };

  function demoPage(page, limit) {
    var recs = demoRecords();
    var total = recs.length;
    var pages = Math.max(1, Math.ceil(total / limit));
    var start = (page - 1) * limit;
    return { records: recs.slice(start, start + limit), total: total, page: page, pages: pages };
  }

  /* ── CSV export ───────────────────────────────────────────────────────── */
  Api.exportCsv = function (sessionId) {
    if (Api.enabled && sessionId && sessionId !== "demo") {
      return _fetch("/api/data/" + encodeURIComponent(sessionId) + "/export", { timeout: 60000 })
        .then(function (res) { return res.blob(); })
        .then(function (blob) { triggerDownload(blob, "rightaid_" + sessionId.slice(0, 8) + ".csv"); return true; })
        .catch(function (e) { Api._fellBack(e); return demoCsv(); });
    }
    return Promise.resolve(demoCsv());
  };

  function demoCsv() {
    var recs = demoRecords();
    if (!recs.length) return false;
    var headers = ["ID Record", "Kecamatan", "Jenis Kelamin KRT", "Usia KRT", "Jumlah Jiwa",
      "Pendidikan", "Sektor", "Pengeluaran/Bln", "Jenis Lantai", "Sumber Air",
      "Kendaraan Roda 4", "Kendaraan Roda 2", "Desil PMT", "Desil Aktual", "Skor PMT"];
    var esc = function (v) {
      var s = String(v);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    var rows = recs.map(function (r) {
      return [r.id, r.kecamatan, r.headGender, r.headAge, r.hhSize, r.edu, r.sector,
        r.expenditure, r.floor, r.water, r.ownCar ? "Ya" : "Tidak",
        r.ownMotor ? "Ya" : "Tidak", r.pmtDecile, r.actualDecile, r.pmtScore].map(esc).join(",");
    });
    var csv = [headers.join(",")].concat(rows).join("\n");
    triggerDownload(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" }),
      "rightaid_demo_" + new Date().toISOString().slice(0, 10) + ".csv");
    return true;
  }

  function triggerDownload(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ── Predict ──────────────────────────────────────────────────────────── */
  Api.predict = function (sessionId, scenario) {
    if (Api.enabled && sessionId && sessionId !== "demo") {
      return _post("/api/predict/" + encodeURIComponent(sessionId), {})
        .catch(function (e) { Api._fellBack(e); return demoPredict(scenario); });
    }
    return Promise.resolve(demoPredict(scenario));
  };

  function cmMetrics(cm) {
    var tp = cm.tp, fp = cm.fp, fn = cm.fn, tn = cm.tn;
    var precision = tp / (tp + fp + 1e-9);
    var recall = tp / (tp + fn + 1e-9);
    return {
      exclusionErr: +(fn / (fn + tp + 1e-9) * 100).toFixed(2),
      inclusionErr: +(fp / (fp + tn + 1e-9) * 100).toFixed(2),
      precision: +precision.toFixed(2),
      recall: +recall.toFixed(2),
      f1: +(2 * precision * recall / (precision + recall + 1e-9)).toFixed(4)
    };
  }

  function demoPredict(scenario) {
    var sc = scenario || (window.App && App.SESSION.scenario) || "normal";
    var cmMl = EkoData.CM_DATA[sc], cmPmt = EkoData.CM_DATA_PMT[sc];
    var adj = { normal: [0, 0], phk: [-0.06, -0.08], bencana: [-0.09, -0.11] }[sc] || [0, 0];
    var base = EkoData.ACCURACY_COMPARISON;

    var mMl = cmMetrics(cmMl);
    mMl.auc = +(base.ml.auc + adj[1]).toFixed(2);
    var mPmt = cmMetrics(cmPmt);
    mPmt.auc = +(base.pmt.auc).toFixed(2);

    var recs = demoRecords();
    var cands = recs.filter(function (r) {
      return Math.abs(r.pmtDecile - r.mlDecile) >= 2 || r.isAnomaly;
    }).sort(function (a, b) {
      return Math.abs(b.pmtDecile - b.mlDecile) - Math.abs(a.pmtDecile - a.mlDecile);
    }).slice(0, 50).map(function (c) {
      return {
        id: c.id, kecamatan: c.kecamatan,
        actualDecile: c.actualDecile, pmtDecile: c.pmtDecile,
        mlEligible: c.mlDecile <= 4 ? 1 : 0,
        confidence: c.confidence, isAnomaly: c.isAnomaly, status: c.status
      };
    });

    return {
      confusion_matrix: cmMl, confusion_matrix_pmt: cmPmt,
      metrics: mMl, metrics_pmt: mPmt,
      decile_dist: EkoData.DECILE_DIST[sc],
      mistargeting_candidates: cands,
      mode: "demo"
    };
  }

  /* ── SHAP ─────────────────────────────────────────────────────────────── */
  Api.getShap = function (sessionId, recordId) {
    if (Api.enabled && sessionId && sessionId !== "demo") {
      return _get("/api/shap/" + encodeURIComponent(sessionId) + "/" + encodeURIComponent(recordId))
        .catch(function (e) { Api._fellBack(e); return demoShap(recordId); });
    }
    return Promise.resolve(demoShap(recordId));
  };

  function demoShap(recordId) {
    var seed = recordId.charCodeAt(recordId.length - 1);
    var features = EkoData.SHAP_DEMO.map(function (s) {
      var mod = (seed % 5) / 10 + 0.8;
      return { feature: s.feature, value: +(s.value * mod * (seed % 2 === 0 ? 1 : -1)).toFixed(2) };
    }).sort(function (a, b) { return Math.abs(b.value) - Math.abs(a.value); });
    var rec = demoRecords().filter(function (r) { return r.id === recordId; })[0];
    return {
      record_id: recordId, features: features,
      prediction: rec ? rec.confidence : 0.5,
      eligible: rec ? (rec.mlDecile <= 4 ? 1 : 0) : 0
    };
  }

  /* ── Policy brief ─────────────────────────────────────────────────────── */
  Api.getPolicyBrief = function (provinceId, scenario, sessionId) {
    if (Api.enabled && sessionId && sessionId !== "demo") {
      // Ensure the session has predictions before requesting the brief.
      return _post("/api/predict/" + encodeURIComponent(sessionId), {})
        .catch(function () { /* may already be predicted */ })
        .then(function () {
          return _post("/api/policy-brief", {
            province_id: provinceId, scenario: scenario, session_id: sessionId
          });
        })
        .then(function (r) { return { title: r.title, content: r.content, mode: "backend" }; })
        .catch(function (e) { Api._fellBack(e); return demoBrief(provinceId, scenario); });
    }
    return Promise.resolve(demoBrief(provinceId, scenario));
  };

  function demoBrief(provinceId, scenario) {
    var prov = EkoData.PROVINCES.filter(function (p) { return p.id === provinceId; })[0]
      || { name: provinceId };
    var tpl = EkoData.POLICY_TEMPLATES[scenario] || EkoData.POLICY_TEMPLATES.normal;
    var name = prov.name;
    var findings = tpl.findings.replace(/{province}/g, name);
    var demographics = tpl.demographics.replace(/{province}/g, name);
    var recs = tpl.recommendations.replace(/{province}/g, name);
    var content = [
      "1. RINGKASAN TEMUAN UTAMA", findings, "",
      "2. PROFIL DEMOGRAFIS TERDAMPAK", demographics, "",
      "3. REKOMENDASI TINDAK LANJUT", recs
    ].join("\n");
    return { title: tpl.title, content: content, mode: "demo" };
  }

  /* ── Session helper (lazy generate for analysis/policy pages) ──────────── */
  Api.ensureSession = function () {
    var S = window.App.SESSION;
    if (!Api.enabled) return Promise.resolve("demo");
    if (S.session_id && S.session_id !== "demo") return Promise.resolve(S.session_id);

    // In backend mode province ids are full names; repair stale demo codes
    // (2–3 char) or a missing province before generating.
    var needsProvince = !S.province || S.province.length <= 3;
    var prep = needsProvince
      ? Api.getProvinces().then(function (list) {
          var ids = list.map(function (p) { return p.id; });
          if (ids.indexOf(S.province) < 0) { S.province = list[0] && list[0].id; App.saveSession(); }
        })
      : Promise.resolve();

    return prep.then(function () {
      return Api.generate(S.province, S.scenario, S.anomalyPct, S.sampleN || 5000);
    }).then(function (r) {
      if (r.session_id && r.session_id !== "demo") {
        S.session_id = r.session_id;
        App.saveSession();
      }
      return r.session_id;
    });
  };

  Api.init = function () { Api.checkHealth(); };

  window.Api = Api;
})();
