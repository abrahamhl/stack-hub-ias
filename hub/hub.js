/* AI Forge Hub v2 — static cockpit, GitHub API only */
(() => {
  "use strict";

  const PUB = "kinkydisorder/stack-hub-ias-public";
  const PRIV = "kinkydisorder/stack-hub-ias";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const pat = () => localStorage.getItem("forge_pat") || "";
  const repo = () => (pat() ? PRIV : PUB);

  const escapeHtml = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const rel = (iso) => {
    if (!iso) return "—";
    const m = Math.round((Date.now() - new Date(iso)) / 60000);
    if (Number.isNaN(m)) return "—";
    if (m < 60) return `${m}m`;
    if (m < 1440) return `${Math.round(m / 60)}h`;
    return `${Math.round(m / 1440)}d`;
  };

  const dayKey = (d) => {
    const x = new Date(d);
    return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
  };

  const AGENT_RULES = [
    { re: /claude|anthropic|fable/i, label: "Claude", color: "var(--purple)" },
    { re: /codex|chatgpt|openai/i, label: "Codex", color: "var(--green)" },
    { re: /gemini|google/i, label: "Gemini", color: "var(--blue)" },
    { re: /grok|xai/i, label: "Grok", color: "var(--cyan)" },
    { re: /manus/i, label: "Manus", color: "var(--yellow)" },
    { re: /sah|vertex/i, label: "SAH/Vertex", color: "var(--red)" },
  ];

  const mapAgent = (name) => {
    const n = name || "unknown";
    for (const r of AGENT_RULES) {
      if (r.re.test(n)) return { label: r.label, color: r.color, raw: n };
    }
    return { label: n, color: "var(--dim)", raw: n };
  };

  async function gh(path) {
    const headers = { Accept: "application/vnd.github+json" };
    if (pat()) headers.Authorization = `Bearer ${pat()}`;
    const r = await fetch(`https://api.github.com/repos/${repo()}${path}`, { headers });
    if (!r.ok) {
      const err = new Error(String(r.status));
      err.status = r.status;
      throw err;
    }
    return r.json();
  }

  async function fetchCommitsSince(iso, maxPages = 8) {
    const all = [];
    for (let page = 1; page <= maxPages; page++) {
      const batch = await gh(
        `/commits?per_page=100&since=${encodeURIComponent(iso)}&page=${page}`
      );
      if (!Array.isArray(batch) || batch.length === 0) break;
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return all;
  }

  function showError(el, title, detail) {
    if (!el) return;
    const isFeed = el.classList.contains("feed");
    if (isFeed) {
      el.innerHTML = `<div class="item err-box" role="listitem"><strong>${escapeHtml(title)}</strong> ${escapeHtml(detail)}</div>`;
      return;
    }
    el.innerHTML = `<div class="err-box" role="alert"><strong>${escapeHtml(title)}</strong>${escapeHtml(detail)}</div>`;
  }

  /* ── Command center + audit feed + issues ── */
  async function loadState() {
    $("#mode-label").textContent = pat() ? "privado" : "público";
    $("#dot-mode").className = "dot " + (pat() ? "on" : "live");
    if (pat()) $("#pat").value = pat();

    try {
      const since30 = new Date(Date.now() - 30 * 864e5).toISOString();
      const [commits30, branches, issues] = await Promise.all([
        gh(`/commits?per_page=100&since=${encodeURIComponent(since30)}`),
        gh("/branches?per_page=50"),
        gh("/issues?state=open&per_page=30").catch(() => []),
      ]);
      $("#dot-node").className = "dot on";
      $("#k-commits").textContent = Array.isArray(commits30) ? commits30.length : "—";
      $("#k-branches").textContent = Array.isArray(branches) ? branches.length : "—";
      $("#k-issues").textContent = Array.isArray(issues) ? issues.length : "—";
      $("#k-updated").textContent =
        commits30[0] ? rel(commits30[0].commit.author.date) : "—";

      const feed = $("#commit-feed");
      if (!commits30.length) {
        feed.innerHTML =
          '<div class="item note" role="listitem">Sin commits en los últimos 30 días (o repo vacío).</div>';
      } else {
        feed.innerHTML = commits30
          .slice(0, 12)
          .map((c) => {
            const msg = escapeHtml(c.commit.message.split("\n")[0]);
            const who = escapeHtml(c.commit.author?.name || c.author?.login || "?");
            return `<div class="item" role="listitem">
              <span class="sha"><a href="${escapeHtml(c.html_url)}" target="_blank" rel="noopener">${escapeHtml(c.sha.slice(0, 7))}</a></span>
              <span>${msg}</span>
              <span class="when">${who} · ${rel(c.commit.author.date)}</span>
            </div>`;
          })
          .join("");
      }

      const issuesFeed = $("#issues-feed");
      if (!issues.length) {
        issuesFeed.innerHTML =
          '<div class="item note" role="listitem">Sin issues abiertas. El corcho está limpio.</div>';
      } else {
        issuesFeed.innerHTML = issues
          .slice(0, 8)
          .map((i) => {
            const labels = (i.labels || []).map((l) => l.name).join(" ") || "sin etiqueta";
            return `<div class="item" role="listitem">
              <span class="sha">#${i.number}</span>
              <span><a href="${escapeHtml(i.html_url)}" target="_blank" rel="noopener">${escapeHtml(i.title)}</a></span>
              <span class="when">${escapeHtml(labels)} · ${rel(i.updated_at)}</span>
            </div>`;
          })
          .join("");
      }
    } catch (e) {
      $("#dot-node").className = "dot err";
      const hint = pat()
        ? "Revisa el token en Config (scope read-only de repos)."
        : "El repo público puede no existir o estar vacío — añade un PAT en Config para leer el privado.";
      showError(
        $("#commit-feed"),
        `No se pudo leer ${repo()} (HTTP ${e.message})`,
        hint
      );
      showError(
        $("#issues-feed"),
        "Tableros no disponibles",
        "Misma causa que la auditoría o sin red."
      );
      $("#k-commits").textContent = "—";
      $("#k-branches").textContent = "—";
      $("#k-issues").textContent = "—";
      $("#k-updated").textContent = "—";
    }
  }

  /* ── Heatmap 90d ── */
  async function loadHeatmap() {
    const root = $("#heatmap-root");
    const offline = !navigator.onLine;
    if (offline) {
      showError(
        root,
        "Sin red",
        "El heatmap necesita la API de GitHub. Reintenta cuando haya conexión."
      );
      return;
    }

    try {
      const since = new Date(Date.now() - 90 * 864e5).toISOString();
      const commits = await fetchCommitsSince(since);
      $("#k-commits-90").textContent = String(commits.length);

      // Build day → { count, authors: Map }
      const byDay = new Map();
      const authorTotals = new Map();
      for (const c of commits) {
        const date = c.commit?.author?.date || c.commit?.committer?.date;
        if (!date) continue;
        const key = dayKey(date);
        const authorName =
          c.author?.login || c.commit?.author?.name || "unknown";
        const agent = mapAgent(authorName);
        if (!byDay.has(key)) byDay.set(key, { count: 0, authors: new Map() });
        const cell = byDay.get(key);
        cell.count += 1;
        cell.authors.set(agent.label, (cell.authors.get(agent.label) || 0) + 1);
        authorTotals.set(agent.label, (authorTotals.get(agent.label) || 0) + 1);
      }

      // 13 weeks ending today (Sun-Sat grid like GitHub: Sun first)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const end = new Date(today);
      // align end to end of week (Saturday = 6)
      const endDow = end.getDay(); // 0 Sun
      // we show columns as weeks Sun→Sat
      const start = new Date(end);
      start.setDate(start.getDate() - (12 * 7 + endDow));

      const weeks = [];
      const cursor = new Date(start);
      while (cursor <= end) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const k = dayKey(cursor);
          const data = byDay.get(k) || { count: 0, authors: new Map() };
          week.push({
            key: k,
            date: new Date(cursor),
            count: data.count,
            authors: data.authors,
            future: cursor > today,
          });
          cursor.setDate(cursor.getDate() + 1);
        }
        weeks.push(week);
      }

      const max = Math.max(1, ...[...byDay.values()].map((v) => v.count));
      const level = (n) => {
        if (n <= 0) return "";
        if (n <= max * 0.25) return "l1";
        if (n <= max * 0.5) return "l2";
        if (n <= max * 0.75) return "l3";
        return "l4";
      };

      const months = [];
      let lastM = -1;
      weeks.forEach((w, wi) => {
        const m = w[0].date.getMonth();
        if (m !== lastM) {
          months.push({
            label: w[0].date.toLocaleString("es", { month: "short" }),
            col: wi,
          });
          lastM = m;
        }
      });

      const dayLabels = ["D", "L", "M", "X", "J", "V", "S"];
      const monthsHtml = months
        .map((m, i) => {
          const next = months[i + 1]?.col ?? weeks.length;
          const span = Math.max(1, next - m.col);
          return `<span style="flex:0 0 ${span * 15}px">${escapeHtml(m.label)}</span>`;
        })
        .join("");

      const cells = weeks
        .flatMap((week) =>
          week.map((cell) => {
            if (cell.future) {
              return `<button type="button" class="hm-cell" disabled aria-hidden="true" tabindex="-1"></button>`;
            }
            const authors = [...cell.authors.entries()]
              .map(([a, n]) => `${a}: ${n}`)
              .join(", ");
            const title = `${cell.key}: ${cell.count} commit${cell.count === 1 ? "" : "s"}${authors ? " · " + authors : ""}`;
            return `<button type="button" class="hm-cell ${level(cell.count)}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}" data-day="${escapeHtml(cell.key)}"></button>`;
          })
        )
        .join("");

      const agentsSorted = [...authorTotals.entries()].sort((a, b) => b[1] - a[1]);
      const authorsHtml = agentsSorted.length
        ? agentsSorted
            .map(([label, n]) => {
              const color = mapAgent(label).color;
              return `<span class="pill"><span class="dot-a" style="background:${color}"></span>${escapeHtml(label)} <b>${n}</b></span>`;
            })
            .join("")
        : '<span class="note">Sin commits en 90 días (o sin acceso al repo).</span>';

      root.innerHTML = `
        <div class="hm-wrap">
          <div class="hm" role="img" aria-label="Heatmap de commits de los últimos 90 días">
            <div class="hm-days" aria-hidden="true">${dayLabels.map((d) => `<span>${d}</span>`).join("")}</div>
            <div class="hm-body">
              <div class="hm-months">${monthsHtml}</div>
              <div class="hm-grid">${cells}</div>
            </div>
          </div>
        </div>
        <div class="hm-legend" aria-hidden="true">
          <span class="note">Menos</span>
          <span class="sw"></span>
          <span class="sw l1" style="background:rgba(255,138,76,.22)"></span>
          <span class="sw l2" style="background:rgba(255,138,76,.42)"></span>
          <span class="sw l3" style="background:rgba(255,138,76,.68)"></span>
          <span class="sw l4" style="background:var(--forge)"></span>
          <span class="note">Más · repo ${escapeHtml(repo())} · ${commits.length} commits / 90d</span>
        </div>
        <div class="hm-authors" aria-label="Commits por autor/agente">${authorsHtml}</div>
        <p class="note" style="margin-top:12px">Hover o foco en una celda para ver el desglose. Intensidad = commits/día. Autor mapeado a agente cuando el nombre lo permite.</p>
      `;
    } catch (e) {
      $("#k-commits-90").textContent = "—";
      const hint = pat()
        ? "Token inválido o sin permiso de lectura."
        : "Sin PAT se intenta el catálogo público. Si falla, abre Config y pega un token de solo lectura.";
      showError(root, `Heatmap no disponible (HTTP ${e.message})`, hint);
    }
  }

  /* ── Credits panel ── */
  let creditsData = null;

  async function loadCredits() {
    const root = $("#credits-grid");
    try {
      const r = await fetch("credits.json", { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      creditsData = await r.json();
      renderCredits();
    } catch {
      showError(
        root,
        "credits.json no disponible",
        "Coloca hub/credits.json junto a esta página. Sin red local el panel no carga."
      );
    }
  }

  function formatUsage(p) {
    if (p.usage === null || p.usage === undefined || p.usage === "") {
      return p.verification_status === "estimated" ? "sin dato" : "—";
    }
    return String(p.usage);
  }

  function truthLabel(vs) {
    if (vs === "estimated") return "estimated · no es uso real";
    if (vs === "manual") return "manual";
    if (vs === "verified") return "verified";
    return vs;
  }

  function renderCredits() {
    const root = $("#credits-grid");
    if (!creditsData?.providers) {
      showError(root, "Datos de créditos inválidos", "Revisa el schema de credits.json.");
      return;
    }
    $("#credits-updated").textContent = creditsData.last_updated || "—";
    root.innerHTML = creditsData.providers
      .map((p) => {
        const vs = p.verification_status || "estimated";
        const estimatedWarn =
          vs === "estimated"
            ? `<p class="note truth-warn" role="note">Truth model: estimación o placeholder — no presentar como consumo real.</p>`
            : "";
        return `<article class="card credit-card" data-id="${escapeHtml(p.id)}">
          <div class="meta">
            <h3>${escapeHtml(p.name)}</h3>
            <span class="tag ${escapeHtml(vs)}" title="verification_status">${escapeHtml(truthLabel(vs))}</span>
          </div>
          <div class="usage" aria-label="uso ${escapeHtml(vs)}">${escapeHtml(formatUsage(p))}<span class="unit">${escapeHtml(p.unit || "")}</span></div>
          ${estimatedWarn}
          <p class="note">plan: ${escapeHtml(p.plan || "—")} · checked: ${escapeHtml(p.last_checked_at || "—")}</p>
          <p class="src">source: ${escapeHtml(p.source || "—")}</p>
          <div class="row" style="margin-top:12px">
            <button type="button" class="ghost btn-edit-credit" data-id="${escapeHtml(p.id)}">Editar</button>
          </div>
          <div class="fields">
            <label>Uso / gasto</label>
            <input type="text" data-f="usage" value="${escapeHtml(p.usage ?? "")}" placeholder="ej. 12.40 o vacío" />
            <label>Límite</label>
            <input type="text" data-f="limit" value="${escapeHtml(p.limit ?? "")}" placeholder="opcional" />
            <label>Plan</label>
            <input type="text" data-f="plan" value="${escapeHtml(p.plan ?? "")}" />
            <label>Unidad</label>
            <input type="text" data-f="unit" value="${escapeHtml(p.unit ?? "")}" />
            <label>verification_status</label>
            <select data-f="verification_status">
              <option value="verified" ${vs === "verified" ? "selected" : ""}>verified</option>
              <option value="manual" ${vs === "manual" ? "selected" : ""}>manual</option>
              <option value="estimated" ${vs === "estimated" ? "selected" : ""}>estimated</option>
            </select>
            <label>source</label>
            <input type="text" data-f="source" value="${escapeHtml(p.source ?? "")}" />
            <label>notes</label>
            <textarea data-f="notes">${escapeHtml(p.notes ?? "")}</textarea>
            <div class="row" style="margin-top:10px">
              <button type="button" class="btn-save-credit" data-id="${escapeHtml(p.id)}">Aplicar</button>
              <button type="button" class="ghost btn-cancel-credit" data-id="${escapeHtml(p.id)}">Cerrar</button>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function applyCreditEdit(id, card) {
    const p = creditsData.providers.find((x) => x.id === id);
    if (!p) return;
    const get = (f) => card.querySelector(`[data-f="${f}"]`)?.value ?? "";
    const usageRaw = get("usage").trim();
    p.usage = usageRaw === "" ? null : usageRaw;
    const limitRaw = get("limit").trim();
    p.limit = limitRaw === "" ? null : limitRaw;
    p.plan = get("plan").trim() || "—";
    p.unit = get("unit").trim();
    p.verification_status = get("verification_status") || "estimated";
    p.source = get("source").trim() || "manual in-page";
    p.notes = get("notes");
    p.last_checked_at = new Date().toISOString().slice(0, 10);
    creditsData.last_updated = p.last_checked_at;
    renderCredits();
  }

  function exportCredits() {
    if (!creditsData) return;
    const blob = new Blob([JSON.stringify(creditsData, null, 2) + "\n"], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "credits.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /* ── Sources / news feed ── */
  let sourcesData = null;

  async function loadSources() {
    const root = $("#sources-feed");
    try {
      const r = await fetch("sources.json", { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      sourcesData = await r.json();
      // merge localStorage manual checks
      const saved = JSON.parse(localStorage.getItem("forge_sources_checks") || "{}");
      for (const ch of sourcesData.channels || []) {
        if (saved[ch.id]) {
          ch.last_checked_at = saved[ch.id].last_checked_at;
          ch.last_note = saved[ch.id].last_note;
        }
      }
      renderSources();
    } catch {
      showError(
        root,
        "sources.json no disponible",
        "Coloca hub/sources.json junto a esta página."
      );
    }
  }

  function renderSources() {
    const root = $("#sources-feed");
    if (!sourcesData?.channels?.length) {
      root.innerHTML = '<div class="item note" role="listitem">Sin canales configurados.</div>';
      return;
    }
    root.innerHTML = sourcesData.channels
      .map((ch) => {
        const checked = ch.last_checked_at
          ? escapeHtml(ch.last_checked_at)
          : "nunca";
        return `<div class="item" role="listitem">
          <span class="sha">${escapeHtml(ch.kind || "link")}</span>
          <span>
            <a href="${escapeHtml(ch.url)}" target="_blank" rel="noopener">${escapeHtml(ch.name)}</a>
            <span class="note"> — ${escapeHtml(ch.last_note || "")}</span>
          </span>
          <span class="when">
            <span class="tag manual">${escapeHtml(ch.verification_status || "manual")}</span>
            · check: ${checked}
            <button type="button" class="ghost btn-check-source" data-id="${escapeHtml(ch.id)}" style="margin-left:8px;padding:4px 10px">Marcar check</button>
          </span>
        </div>`;
      })
      .join("");
  }

  function markSourceCheck(id) {
    const ch = sourcesData?.channels?.find((c) => c.id === id);
    if (!ch) return;
    const note = window.prompt(
      `Nota breve del check de «${ch.name}» (qué hay de nuevo):`,
      ch.last_note && ch.last_note !== "Sin check manual aún" ? ch.last_note : ""
    );
    if (note === null) return;
    ch.last_checked_at = new Date().toISOString().slice(0, 10);
    ch.last_note = note.trim() || "Revisado, sin novedad anotada";
    ch.verification_status = "manual";
    const saved = JSON.parse(localStorage.getItem("forge_sources_checks") || "{}");
    saved[id] = {
      last_checked_at: ch.last_checked_at,
      last_note: ch.last_note,
    };
    localStorage.setItem("forge_sources_checks", JSON.stringify(saved));
    renderSources();
  }

  /* ── Gallery + lightbox ── */
  let galleryItems = [];
  let lbIndex = 0;
  let lbLastFocus = null;

  async function loadGallery() {
    const root = $("#gallery-grid");
    try {
      const r = await fetch("gallery.json", { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      const data = await r.json();
      galleryItems = data.items || [];
      if (!galleryItems.length) {
        root.innerHTML = '<p class="note">Galería vacía.</p>';
        return;
      }
      root.innerHTML = galleryItems
        .map(
          (it, i) => `
        <button type="button" class="gal-item" data-i="${i}" aria-label="Abrir ${escapeHtml(it.title)}">
          <img src="${escapeHtml(it.src)}" alt="" loading="lazy" decoding="async"
            onerror="this.closest('button').classList.add('err'); this.replaceWith(Object.assign(document.createElement('span'),{className:'note',style:'padding:16px;display:block',textContent:'Imagen no encontrada'}))" />
          <span class="cap">${escapeHtml(it.title)}</span>
        </button>`
        )
        .join("");
    } catch {
      showError(
        root,
        "gallery.json no disponible",
        "Rutas relativas a ../src/. Si solo subes hub/ a Hostinger, sube también src/ o copia las capturas."
      );
    }
  }

  function lbFocusables() {
    return $$("#lightbox button:not([disabled]), #lightbox a[href]");
  }

  function openLightbox(i) {
    if (!galleryItems.length) return;
    if ($("#lightbox").hidden) lbLastFocus = document.activeElement;
    lbIndex = ((i % galleryItems.length) + galleryItems.length) % galleryItems.length;
    const it = galleryItems[lbIndex];
    const lb = $("#lightbox");
    $("#lb-img").src = it.src;
    $("#lb-img").alt = it.title || "Referencia visual";
    $("#lb-title").textContent = `${it.title} (${lbIndex + 1}/${galleryItems.length})`;
    lb.hidden = false;
    $("#lb-close").focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lb = $("#lightbox");
    lb.hidden = true;
    $("#lb-img").src = "";
    $("#lb-img").alt = "";
    document.body.style.overflow = "";
    if (lbLastFocus && typeof lbLastFocus.focus === "function") lbLastFocus.focus();
    lbLastFocus = null;
  }

  function lbNav(delta) {
    openLightbox(lbIndex + delta);
  }

  /* ── Catalog + protocol ── */
  async function loadCatalog() {
    try {
      const r = await fetch("catalog.json");
      const data = await r.json();
      $("#skill-grid").innerHTML = data.skills
        .map(
          (s) => `
        <article class="card">
          <div class="row" style="justify-content:space-between;margin-bottom:6px">
            <span class="tag ${escapeHtml(s.category)}">${escapeHtml(s.category)}</span>
            <a class="note" href="https://github.com/${PRIV}/edit/hyper-boost/${escapeHtml(s.path)}" target="_blank" rel="noopener">editar ↗</a>
          </div>
          <h3>${escapeHtml(s.name)}</h3>
          <p>${escapeHtml(s.description)}</p>
        </article>`
        )
        .join("");
    } catch {
      showError(
        $("#skill-grid"),
        "catalog.json no disponible",
        "Debe estar junto a index.html en hub/."
      );
    }
  }

  async function loadProto() {
    try {
      const r = await fetch("bootstrap.txt");
      if (!r.ok) throw new Error("missing");
      $("#proto-block").textContent = await r.text();
    } catch {
      $("#proto-block").textContent =
        "Sube hub/bootstrap.txt junto a esta página (se genera desde docs/workflows/UNIVERSAL_BOOTSTRAP_PROMPT.md).";
    }
  }

  /* ── Keyboard / nav ── */
  function setupNav() {
    const links = $$(".rail a[href^='#'], .mobile-nav a[href^='#']");
    const sections = links
      .map((a) => $(a.getAttribute("href")))
      .filter(Boolean);

    const setCurrent = () => {
      let current = sections[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= 100) current = s;
      }
      links.forEach((a) => {
        const on = a.getAttribute("href") === `#${current?.id}`;
        if (a.closest(".rail")) a.setAttribute("aria-current", on ? "true" : "false");
      });
    };
    window.addEventListener("scroll", setCurrent, { passive: true });
    setCurrent();
  }

  function wireEvents() {
    $("#cfg-btn").onclick = () => {
      const s = $("#cfg");
      s.hidden = !s.hidden;
      if (!s.hidden) {
        s.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        $("#pat").focus();
      }
    };
    $("#save-pat").onclick = () => {
      localStorage.setItem("forge_pat", $("#pat").value.trim());
      loadState();
      loadHeatmap();
    };
    $("#clear-pat").onclick = () => {
      localStorage.removeItem("forge_pat");
      $("#pat").value = "";
      loadState();
      loadHeatmap();
    };
    $("#copy-proto").onclick = async () => {
      try {
        await navigator.clipboard.writeText($("#proto-block").textContent);
        $("#copy-proto").textContent = "Copiado ✓";
        setTimeout(() => ($("#copy-proto").textContent = "Copiar bloque"), 1800);
      } catch {
        $("#copy-proto").textContent = "Fallo al copiar";
      }
    };
    $("#export-credits")?.addEventListener("click", exportCredits);

    document.addEventListener("click", (e) => {
      const t = e.target.closest("button, .gal-item");
      if (!t) return;
      if (t.classList.contains("btn-edit-credit")) {
        const card = t.closest(".credit-card");
        $$(".credit-card.editing").forEach((c) => c.classList.remove("editing"));
        card?.classList.add("editing");
      }
      if (t.classList.contains("btn-cancel-credit")) {
        t.closest(".credit-card")?.classList.remove("editing");
      }
      if (t.classList.contains("btn-save-credit")) {
        applyCreditEdit(t.dataset.id, t.closest(".credit-card"));
      }
      if (t.classList.contains("btn-check-source")) {
        markSourceCheck(t.dataset.id);
      }
      if (t.classList.contains("gal-item")) {
        openLightbox(Number(t.dataset.i));
      }
      if (t.id === "lb-close") closeLightbox();
      if (t.id === "lb-prev") lbNav(-1);
      if (t.id === "lb-next") lbNav(1);
    });

    document.addEventListener("keydown", (e) => {
      const lb = $("#lightbox");
      if (lb.hidden) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        lbNav(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        lbNav(1);
        return;
      }
      if (e.key === "Tab") {
        const nodes = lbFocusables();
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    $("#lightbox")?.addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });

    window.addEventListener("offline", () => {
      $("#dot-node").className = "dot err";
    });
    window.addEventListener("online", () => {
      loadState();
      loadHeatmap();
    });
  }

  /* ── boot ── */
  function boot() {
    wireEvents();
    setupNav();
    loadState();
    loadHeatmap();
    loadCatalog();
    loadProto();
    loadCredits();
    loadSources();
    loadGallery();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
