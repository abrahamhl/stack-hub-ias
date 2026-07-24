/* AI Forge Hub — Fallout Shelter Factory / Operator Arena */
(() => {
  "use strict";

  const PUB = "kinkydisorder/stack-hub-ias-public";
  const PRIV = "kinkydisorder/stack-hub-ias";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const state = {
    view: "floor",
    agentId: null,
    agentsData: null,
    catalog: null,
    credits: null,
    sources: null,
    gallery: [],
    bootstrap: "",
    commits: [],
  };

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

  async function fetchCommitsSince(iso, maxPages = 6) {
    const all = [];
    for (let page = 1; page <= maxPages; page++) {
      const batch = await gh(
        `/commits?per_page=100&since=${encodeURIComponent(iso)}&page=${page}`
      );
      if (!Array.isArray(batch) || !batch.length) break;
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return all;
  }

  function setInspector(title, html, action) {
    $("#insp-context").innerHTML = `<h3>${escapeHtml(title)}</h3>${html}`;
    if (action) $("#insp-action").textContent = action;
  }

  function setNav(view, agentId = null) {
    state.view = view;
    state.agentId = agentId;
    $$(".navitem[data-view]").forEach((b) => {
      b.classList.toggle("on", b.dataset.view === view && !agentId);
    });
    $$(".navitem[data-agent]").forEach((b) => {
      b.classList.toggle("on", b.dataset.agent === agentId);
    });
    const hash = agentId ? `agent/${agentId}` : view;
    if (location.hash.replace(/^#/, "") !== hash) {
      history.replaceState(null, "", `#${hash}`);
    }
    render();
  }

  /* ── Views ── */
  function render() {
    const canvas = $("#canvas");
    if (state.view === "agent" && state.agentId) {
      canvas.innerHTML = viewAgent(state.agentId);
      wireView();
      return;
    }
    const map = {
      floor: viewFloor,
      skills: viewSkills,
      ops: viewOps,
      credits: viewCredits,
      news: viewNews,
      gallery: viewGallery,
      protocol: viewProtocol,
      audit: viewAudit,
      config: viewConfig,
    };
    const fn = map[state.view] || viewFloor;
    canvas.innerHTML = fn();
    wireView();
  }

  function viewFloor() {
    const agents = state.agentsData?.agents || [];
    const lanes = state.agentsData?.lanes || [];
    setInspector(
      "Factory Floor",
      `<p class="note">Cada sala es un agente. Entra para ver su stack (skills, rutas del repo, tools). No arrastres memoria del chat: <b>RESET FORGE</b> + este mapa.</p>
       <p class="note" style="margin-top:8px">${agents.length} salas · ${lanes.length} carriles de handoff</p>`,
      "Click en una sala → copiar bootstrap de esa superficie → trabajar solo con rutas del repo."
    );

    const rooms = agents
      .map((a) => {
        const load = Math.min(95, 30 + (a.skills?.length || 0) * 8);
        return `<button type="button" class="room" data-agent="${escapeHtml(a.id)}" data-accent="${escapeHtml(a.accent)}" aria-label="Entrar en sala ${escapeHtml(a.name)}">
          <div class="room-top">
            <div class="avatar" aria-hidden="true">${escapeHtml(a.glyph || "•")}</div>
            <span class="status-pill ${escapeHtml(a.status)}">${escapeHtml(a.status)}</span>
          </div>
          <h2>${escapeHtml(a.short || a.name)}</h2>
          <p>${escapeHtml(a.role)}</p>
          <div class="meter" aria-hidden="true" style="--w:${load}%"><i></i></div>
          <span class="note">${(a.skills || []).length} skills · ${(a.repo_paths || []).length} rutas</span>
        </button>`;
      })
      .join("");

    const laneLabels = lanes
      .map(
        (l) =>
          `<span>${escapeHtml(l.from)} → ${escapeHtml(l.to)} · ${escapeHtml(l.label)}</span>`
      )
      .join("");

    // SVG lanes as decorative production lines (not blocking hit targets)
    const svgLanes = `
      <svg class="lanes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="15" y1="30" x2="50" y2="55" />
        <line x1="50" y1="55" x2="85" y2="30" />
        <line x1="20" y1="70" x2="80" y2="70" />
        <line x1="50" y1="20" x2="50" y2="80" />
      </svg>`;

    return `
      <div class="view-head">
        <div>
          <div class="caption">00 · Fallout Shelter Factory</div>
          <h1>Entra en la <em>sala</em>.<br />No en el chat.</h1>
        </div>
        <p class="lead">GitHub es la lista de código. Esto es el mapa: agentes generalistas arriba, al pulsar → su repositorio lógico (skills, tools, paths). RESET FORGE limpia memoria arrastrada.</p>
      </div>
      <div class="factory">
        <div class="factory-map" role="region" aria-label="Mapa de salas de agentes">
          ${svgLanes}
          <div class="rooms">${rooms || '<p class="note">agents.json no cargado</p>'}</div>
        </div>
        <div class="lane-legend" aria-label="Carriles de handoff">${laneLabels}</div>
        <div class="kpis" style="margin-top:8px">
          <div class="kpi"><div class="v" id="k-commits">—</div><div class="k">commits 30d</div></div>
          <div class="kpi"><div class="v" id="k-branches">—</div><div class="k">ramas</div></div>
          <div class="kpi"><div class="v" id="k-issues">—</div><div class="k">issues</div></div>
          <div class="kpi"><div class="v" id="k-updated">—</div><div class="k">último push</div></div>
        </div>
      </div>`;
  }

  function viewAgent(id) {
    const a = state.agentsData?.agents?.find((x) => x.id === id);
    if (!a) {
      return `<div class="err-box"><strong>Sala no encontrada</strong>No hay agente «${escapeHtml(id)}» en agents.json.</div>
        <p style="margin-top:12px"><button type="button" data-view="floor">← Volver al floor</button></p>`;
    }
    const catalogSkills = state.catalog?.skills || [];
    const skillCards = (a.skills || [])
      .map((name) => {
        const meta = catalogSkills.find((s) => s.name === name);
        return `<li>
          <strong>${escapeHtml(name)}</strong>
          ${meta ? escapeHtml(meta.description) : "ver SKILL.md en el repo"}
          ${meta ? `<br /><span style="color:var(--cyan)">${escapeHtml(meta.path)}</span>` : ""}
        </li>`;
      })
      .join("");

    const paths = (a.repo_paths || [])
      .map((p) => `<li>${escapeHtml(p)}</li>`)
      .join("");
    const tools = (a.tools || [])
      .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
      .join("");
    const best = (a.best_for || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const avoid = (a.avoid_for || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const lanes = (state.agentsData?.lanes || []).filter(
      (l) => l.from === id || l.to === id
    );
    const laneHtml = lanes.length
      ? lanes
          .map(
            (l) =>
              `<div class="item"><span class="sha">${escapeHtml(l.from)}→${escapeHtml(l.to)}</span><span>${escapeHtml(l.label)}</span><span class="when">${escapeHtml(l.via || "")}</span></div>`
          )
          .join("")
      : `<div class="item note">Sin carriles declarados.</div>`;

    setInspector(
      a.name,
      `<p class="note"><b>Superficie:</b> ${escapeHtml(a.surface)}</p>
       <p class="note"><b>Protocolo:</b> ${escapeHtml(a.protocol)}</p>
       <p class="note" style="margin-top:8px">${escapeHtml(a.notes || "")}</p>`,
      `Copia el bootstrap, escribe RESET FORGE en ${a.surface}, pega el bloque, abre las rutas de esta sala.`
    );

    const agentBoot = buildAgentBootstrap(a);

    return `
      <div class="row" style="margin-bottom:14px">
        <button type="button" class="ghost" data-view="floor">← Factory Floor</button>
        <span class="chip">sala / ${escapeHtml(a.id)}</span>
        <span class="status-pill ${escapeHtml(a.status)}">${escapeHtml(a.status)}</span>
      </div>
      <div class="dossier-hero" data-accent="${escapeHtml(a.accent)}">
        <div class="avatar" style="--room:var(--${escapeHtml(a.accent)})" aria-hidden="true">${escapeHtml(a.glyph || "•")}</div>
        <div>
          <div class="caption">Dossier · operador</div>
          <h1>${escapeHtml(a.name)}</h1>
          <p class="lead" style="margin-top:8px">${escapeHtml(a.role)}</p>
          <div class="tagrow">${best}</div>
        </div>
      </div>
      <div class="dossier-grid">
        <div class="panel">
          <div class="caption">Stack de skills en esta sala</div>
          <ul class="stack-list" style="margin-top:10px">${skillCards || "<li class='note'>Sin skills mapeadas</li>"}</ul>
          <div class="caption" style="margin-top:16px">Tools de la sala</div>
          <div class="tagrow" style="margin-top:8px">${tools}</div>
        </div>
        <div class="panel">
          <div class="caption">Rutas del repositorio (subdirectorios lógicos)</div>
          <ul class="path-list" style="margin-top:10px">${paths}</ul>
          <div class="caption" style="margin-top:16px">Evitar</div>
          <div class="tagrow" style="margin-top:8px">${avoid || '<span class="note">—</span>'}</div>
          <div class="caption" style="margin-top:16px">Carriles (handoffs)</div>
          <div class="feed" style="margin-top:8px">${laneHtml}</div>
        </div>
      </div>
      <div class="panel" style="margin-top:14px">
        <div class="row" style="justify-content:space-between;margin-bottom:10px">
          <div>
            <div class="caption">Terminal de la sala · bootstrap</div>
            <p class="note">Pega esto en ${escapeHtml(a.surface)} tras RESET FORGE. No arrastres el chat anterior.</p>
          </div>
          <button type="button" class="hot" id="copy-agent-boot" data-boot="1">Copiar bootstrap de sala</button>
        </div>
        <pre class="boot-box" id="agent-boot">${escapeHtml(agentBoot)}</pre>
      </div>`;
  }

  function buildAgentBootstrap(a) {
    const shared = state.agentsData?.shared || {};
    return `[AI FORGE · SALA ${a.short || a.name} · ${a.id}]

1. RESET FORGE — descarta memoria de chats previos.
2. Nodo: ${shared.node || PRIV}
3. Protocolo de esta superficie: ${a.protocol}
4. Lee también: ${(shared.protocol_files || []).join(", ")}
5. Tu rol: ${a.role}
6. Skills a cargar (archivos del repo, no inventes):
${(a.skills || []).map((s) => `   - ${s}`).join("\n")}
7. Rutas de tu sala:
${(a.repo_paths || []).map((p) => `   - ${p}`).join("\n")}
8. Tools: ${(a.tools || []).join(", ")}
9. Truth model: estimated ≠ uso real. Nada sin source + verification_status + fecha.
10. Entrega: commit atómico + nota .ai-forge/audit/ (actor: ${a.id}-*)

Confirma: nombre de agente, qué puedes leer/escribir, próxima acción única.`;
  }

  function viewSkills() {
    const skills = state.catalog?.skills || [];
    const owners = state.agentsData?.skill_owners || {};
    setInspector(
      "Skill Registry",
      `<p class="note">Skills canónicas viven en el repo. Este panel solo las lista y dice qué agentes las usan.</p>`,
      "Edita la skill en su path del repo, no en el chat."
    );
    const cards = skills
      .map((s) => {
        const who = owners[s.name] || [];
        return `<article class="card">
          <div class="row" style="justify-content:space-between;margin-bottom:6px">
            <span class="tag ${escapeHtml(s.category)}">${escapeHtml(s.category)}</span>
            <a class="note" href="https://github.com/${PRIV}/blob/hyper-boost/${escapeHtml(s.path)}" target="_blank" rel="noopener">repo ↗</a>
          </div>
          <h3>${escapeHtml(s.name)}</h3>
          <p>${escapeHtml(s.description)}</p>
          <div class="tagrow" style="margin-top:8px">${who.map((w) => `<span class="tag">${escapeHtml(w)}</span>`).join("") || '<span class="note">sin owner map</span>'}</div>
        </article>`;
      })
      .join("");
    return `
      <div class="view-head">
        <div><div class="caption">01 · Skill Registry Matrix</div><h1>Una skill,<br /><em>muchas salas</em>.</h1></div>
        <p class="lead">Generalistas en el floor. Dentro de cada agente solo ves su stack. Aquí ves el mapa completo.</p>
      </div>
      <div class="grid c3" id="skill-grid">${cards || '<p class="note">catalog.json no disponible</p>'}</div>`;
  }

  function viewOps() {
    setInspector(
      "Ops",
      `<p class="note">Heatmap y KPIs desde GitHub API. Sin PAT, el catálogo público puede 404.</p>`,
      "Si falla el público: Config → PAT solo lectura del privado."
    );
    return `
      <div class="view-head">
        <div><div class="caption">02 · Activity</div><h1>Señales del <em>nodo</em>.</h1></div>
        <p class="lead">Commits = qué cambió. Notas de auditoría = por qué. El heatmap es el pulso de la fábrica.</p>
      </div>
      <div class="panel" id="heatmap-root"><p class="note">Cargando heatmap…</p></div>
      <div class="panel" style="margin-top:14px">
        <div class="caption">Commits recientes</div>
        <div class="feed" id="commit-feed" role="list" aria-live="polite"><div class="item note" role="listitem">Cargando…</div></div>
      </div>
      <div class="panel" style="margin-top:14px">
        <div class="caption">Issues abiertas (tableros)</div>
        <div class="feed" id="issues-feed" role="list"><div class="item note" role="listitem">Cargando…</div></div>
      </div>`;
  }

  function viewCredits() {
    setInspector(
      "Créditos",
      `<p class="note">Truth model obligatorio. Estimated nunca se presenta como gasto real.</p>`,
      "Edita → Exportar credits.json → commit en hub/credits.json"
    );
    return `
      <div class="view-head">
        <div><div class="caption">03 · Credit Monitor</div><h1>Dinero visible.<br /><em>Sin inventar.</em></h1></div>
        <p class="lead">Placeholders estimated hasta que rellenes datos verificados. Export JSON listo para commit.</p>
      </div>
      <div class="row" style="margin-bottom:12px">
        <button type="button" class="hot" id="export-credits">Exportar credits.json</button>
        <span class="note">Actualizado en archivo: <span id="credits-updated">—</span></span>
      </div>
      <div class="grid c3" id="credits-grid"><p class="note">Cargando…</p></div>`;
  }

  function viewNews() {
    setInspector("Novedades", `<p class="note">Canales oficiales. Check manual, sin scraping.</p>`, "Marca check tras leer el changelog.");
    return `
      <div class="view-head">
        <div><div class="caption">04 · Fuentes oficiales</div><h1>Qué cambió <em>fuera</em>.</h1></div>
        <p class="lead">Cada IA tiene su canal. El check queda en este navegador (localStorage).</p>
      </div>
      <div class="panel"><div class="feed" id="sources-feed" role="list"><div class="item note">Cargando…</div></div></div>`;
  }

  function viewGallery() {
    setInspector("Referencias", `<p class="note">Capturas de dirección visual en src/. Lightbox con teclado.</p>`, "Úsalas para no diseñar de memoria.");
    return `
      <div class="view-head">
        <div><div class="caption">05 · Galería UX</div><h1>Referencias, no <em>copias</em>.</h1></div>
        <p class="lead">Gramática visual del stack. Enter / Esc / flechas en lightbox.</p>
      </div>
      <div class="gal" id="gallery-grid"><p class="note">Cargando…</p></div>`;
  }

  function viewProtocol() {
    setInspector(
      "Protocolo",
      `<p class="note">Bootstrap universal. RESET FORGE = reconstruir solo desde el repo.</p>`,
      "Copia → pega en cualquier IA sin carpeta del repo."
    );
    return `
      <div class="view-head">
        <div><div class="caption">06 · Protocolo universal</div><h1>Una pasta.<br /><em>Todas las IAs.</em></h1></div>
        <p class="lead">Sustituye la memoria de plataforma. El nodo es el repo.</p>
      </div>
      <div class="panel">
        <pre class="boot-box" id="proto-block">${escapeHtml(state.bootstrap || "Cargando bootstrap.txt…")}</pre>
        <div class="row" style="margin-top:12px">
          <button type="button" class="hot" id="copy-proto">Copiar bloque</button>
          <button type="button" id="reset-btn-2">Copiar ritual RESET FORGE</button>
        </div>
      </div>`;
  }

  function viewAudit() {
    setInspector("Auditoría", `<p class="note">Commits = qué. Notas .ai-forge/audit = por qué.</p>`, "Sin commit no existe.");
    return `
      <div class="view-head">
        <div><div class="caption">07 · Git Auditor</div><h1>Evidencia, no <em>relato</em>.</h1></div>
        <p class="lead">Feed vivo de commits del repo activo (público o privado con PAT).</p>
      </div>
      <div class="panel"><div class="feed" id="commit-feed" role="list"><div class="item note">Cargando…</div></div></div>`;
  }

  function viewConfig() {
    setInspector("Config", `<p class="note">PAT solo en localStorage de este navegador.</p>`, "Nunca commits de tokens.");
    return `
      <div class="view-head">
        <div><div class="caption">Config local</div><h1>Token de <em>solo lectura</em>.</h1></div>
        <p class="lead">Para leer el nodo privado cuando el catálogo público aún no existe.</p>
      </div>
      <div class="panel">
        <p class="note" style="margin-bottom:10px">GitHub fine-grained PAT · contents:read. Se guarda solo aquí.</p>
        <div class="row">
          <input type="password" id="pat" placeholder="github_pat_…" style="max-width:420px" autocomplete="off" />
          <button type="button" class="hot" id="save-pat">Guardar</button>
          <button type="button" class="ghost" id="clear-pat">Borrar</button>
        </div>
      </div>`;
  }

  /* ── Wire interactions inside canvas ── */
  function wireView() {
    $$("[data-view]", $("#canvas")).forEach((el) => {
      el.addEventListener("click", () => setNav(el.dataset.view));
    });
    $$("[data-agent]", $("#canvas")).forEach((el) => {
      el.addEventListener("click", () => setNav("agent", el.dataset.agent));
    });

    const copyBoot = $("#copy-agent-boot");
    if (copyBoot) {
      copyBoot.onclick = async () => {
        const t = $("#agent-boot")?.textContent || "";
        try {
          await navigator.clipboard.writeText(t);
          copyBoot.textContent = "Copiado ✓";
          setTimeout(() => (copyBoot.textContent = "Copiar bootstrap de sala"), 1600);
        } catch {
          copyBoot.textContent = "Fallo al copiar";
        }
      };
    }

    $("#copy-proto")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(state.bootstrap || $("#proto-block")?.textContent || "");
        $("#copy-proto").textContent = "Copiado ✓";
        setTimeout(() => ($("#copy-proto").textContent = "Copiar bloque"), 1600);
      } catch { /* ignore */ }
    });
    $("#reset-btn-2")?.addEventListener("click", copyReset);

    if (state.view === "ops" || state.view === "audit" || state.view === "floor") {
      loadGithubPanels();
    }
    if (state.view === "ops") loadHeatmap();
    if (state.view === "credits") renderCredits();
    if (state.view === "news") renderSources();
    if (state.view === "gallery") renderGallery();
    if (state.view === "config") {
      if (pat()) $("#pat").value = pat();
      $("#save-pat").onclick = () => {
        localStorage.setItem("forge_pat", $("#pat").value.trim());
        updateModeChips();
        loadGithubPanels();
      };
      $("#clear-pat").onclick = () => {
        localStorage.removeItem("forge_pat");
        $("#pat").value = "";
        updateModeChips();
        loadGithubPanels();
      };
    }

    // credit edit handlers
    $$(".btn-edit-credit").forEach((b) => {
      b.onclick = () => {
        $$(".credit-card.editing").forEach((c) => c.classList.remove("editing"));
        b.closest(".credit-card")?.classList.add("editing");
      };
    });
    $$(".btn-cancel-credit").forEach((b) => {
      b.onclick = () => b.closest(".credit-card")?.classList.remove("editing");
    });
    $$(".btn-save-credit").forEach((b) => {
      b.onclick = () => applyCreditEdit(b.dataset.id, b.closest(".credit-card"));
    });
    $("#export-credits")?.addEventListener("click", exportCredits);
    $$(".btn-check-source").forEach((b) => {
      b.onclick = () => markSourceCheck(b.dataset.id);
    });
    $$(".gal-item").forEach((b) => {
      b.onclick = () => openLightbox(Number(b.dataset.i));
    });
  }

  /* ── Data loads ── */
  async function loadStatic() {
    const [agents, catalog, credits, sources, gallery, boot] = await Promise.all([
      fetch("agents.json").then((r) => r.json()).catch(() => null),
      fetch("catalog.json").then((r) => r.json()).catch(() => null),
      fetch("credits.json").then((r) => r.json()).catch(() => null),
      fetch("sources.json").then((r) => r.json()).catch(() => null),
      fetch("gallery.json").then((r) => r.json()).catch(() => null),
      fetch("bootstrap.txt").then((r) => (r.ok ? r.text() : "")).catch(() => ""),
    ]);
    state.agentsData = agents;
    state.catalog = catalog;
    state.credits = credits;
    state.sources = sources;
    // merge source checks
    if (state.sources?.channels) {
      const saved = JSON.parse(localStorage.getItem("forge_sources_checks") || "{}");
      for (const ch of state.sources.channels) {
        if (saved[ch.id]) {
          ch.last_checked_at = saved[ch.id].last_checked_at;
          ch.last_note = saved[ch.id].last_note;
        }
      }
    }
    state.gallery = gallery?.items || [];
    state.bootstrap = boot;
    $("#nav-skills").textContent = String(catalog?.skills?.length || "—");
    renderRailAgents();
    renderMobileTabs();
  }

  function renderRailAgents() {
    const box = $("#rail-agents");
    if (!box) return;
    const agents = state.agentsData?.agents || [];
    box.innerHTML = agents
      .map(
        (a) =>
          `<button type="button" class="navitem" data-agent="${escapeHtml(a.id)}"><span>${escapeHtml(a.glyph || "•")} ${escapeHtml(a.short || a.name)}</span><span class="count">${escapeHtml(a.status)}</span></button>`
      )
      .join("");
    box.querySelectorAll("[data-agent]").forEach((b) => {
      b.addEventListener("click", () => setNav("agent", b.dataset.agent));
    });
  }

  function renderMobileTabs() {
    const tabs = $("#mobile-tabs");
    if (!tabs) return;
    const items = [
      ["floor", "Floor"],
      ["skills", "Skills"],
      ["ops", "Ops"],
      ["credits", "€"],
      ["protocol", "Boot"],
      ["audit", "Git"],
    ];
    tabs.innerHTML = items
      .map(([v, l]) => `<button type="button" data-view="${v}">${l}</button>`)
      .join("");
    tabs.querySelectorAll("[data-view]").forEach((b) => {
      b.addEventListener("click", () => setNav(b.dataset.view));
    });
  }

  function updateModeChips() {
    $("#mode-label").textContent = pat() ? "privado" : "público";
    $("#dot-mode").className = "d " + (pat() ? "on" : "live");
    if (pat()) $("#pat") && ($("#pat").value = pat());
  }

  async function loadGithubPanels() {
    updateModeChips();
    try {
      const since30 = new Date(Date.now() - 30 * 864e5).toISOString();
      const [commits30, branches, issues] = await Promise.all([
        gh(`/commits?per_page=100&since=${encodeURIComponent(since30)}`),
        gh("/branches?per_page=50"),
        gh("/issues?state=open&per_page=20").catch(() => []),
      ]);
      $("#dot-node").className = "d on";
      $("#node-label").textContent = repo().split("/")[1] || "nodo";
      if ($("#k-commits")) $("#k-commits").textContent = commits30.length;
      if ($("#k-branches")) $("#k-branches").textContent = branches.length;
      if ($("#k-issues")) $("#k-issues").textContent = issues.length;
      if ($("#k-updated")) $("#k-updated").textContent = commits30[0] ? rel(commits30[0].commit.author.date) : "—";
      state.commits = commits30;

      const feedHtml = commits30.length
        ? commits30
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
            .join("")
        : `<div class="item note" role="listitem">Sin commits recientes.</div>`;

      $$("#commit-feed").forEach((el) => {
        el.innerHTML = feedHtml;
      });

      const issuesFeed = $("#issues-feed");
      if (issuesFeed) {
        issuesFeed.innerHTML = issues.length
          ? issues
              .slice(0, 8)
              .map(
                (i) => `<div class="item" role="listitem">
              <span class="sha">#${i.number}</span>
              <span><a href="${escapeHtml(i.html_url)}" target="_blank" rel="noopener">${escapeHtml(i.title)}</a></span>
              <span class="when">${rel(i.updated_at)}</span>
            </div>`
              )
              .join("")
          : `<div class="item note" role="listitem">Sin issues abiertas.</div>`;
      }
      $("#dock-status").textContent = `repo ${repo()} · ${commits30.length} commits/30d · ok`;
    } catch (e) {
      $("#dot-node").className = "d err";
      const hint = pat()
        ? "Revisa el PAT (solo lectura)."
        : "Público 404 o vacío — Config → PAT del privado.";
      const err = `<div class="item err-box" role="listitem"><strong>No se pudo leer ${escapeHtml(repo())} (HTTP ${escapeHtml(e.message)})</strong>${escapeHtml(hint)}</div>`;
      $$("#commit-feed").forEach((el) => {
        el.innerHTML = err;
      });
      const issuesFeed = $("#issues-feed");
      if (issuesFeed) issuesFeed.innerHTML = err;
      $("#dock-status").textContent = `error ${e.message} · ${repo()}`;
    }
  }

  async function loadHeatmap() {
    const root = $("#heatmap-root");
    if (!root) return;
    if (!navigator.onLine) {
      root.innerHTML = `<div class="err-box"><strong>Sin red</strong>El heatmap necesita api.github.com.</div>`;
      return;
    }
    try {
      const since = new Date(Date.now() - 90 * 864e5).toISOString();
      const commits = await fetchCommitsSince(since);
      const byDay = new Map();
      const authors = new Map();
      for (const c of commits) {
        const date = c.commit?.author?.date;
        if (!date) continue;
        const k = dayKey(date);
        byDay.set(k, (byDay.get(k) || 0) + 1);
        const who = c.author?.login || c.commit?.author?.name || "?";
        authors.set(who, (authors.get(who) || 0) + 1);
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const end = new Date(today);
      const endDow = end.getDay();
      const start = new Date(end);
      start.setDate(start.getDate() - (12 * 7 + endDow));
      const weeks = [];
      const cursor = new Date(start);
      while (cursor <= end) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const k = dayKey(cursor);
          week.push({ key: k, count: byDay.get(k) || 0, future: cursor > today });
          cursor.setDate(cursor.getDate() + 1);
        }
        weeks.push(week);
      }
      const max = Math.max(1, ...byDay.values(), 1);
      const level = (n) => {
        if (n <= 0) return "";
        if (n <= max * 0.25) return "l1";
        if (n <= max * 0.5) return "l2";
        if (n <= max * 0.75) return "l3";
        return "l4";
      };
      const cells = weeks
        .flatMap((w) =>
          w.map((c) =>
            c.future
              ? `<span class="hm-cell"></span>`
              : `<button type="button" class="hm-cell ${level(c.count)}" title="${escapeHtml(c.key)}: ${c.count}" aria-label="${escapeHtml(c.key)}: ${c.count} commits"></button>`
          )
        )
        .join("");
      const authorPills = [...authors.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([n, c]) => `<span class="tag">${escapeHtml(n)} · ${c}</span>`)
        .join("");
      root.innerHTML = `
        <div class="caption">Heatmap · 90 días · ${commits.length} commits · ${escapeHtml(repo())}</div>
        <div class="hm-wrap" style="margin-top:12px"><div class="hm-grid">${cells}</div></div>
        <div class="tagrow" style="margin-top:12px">${authorPills || '<span class="note">Sin commits</span>'}</div>`;
    } catch (e) {
      root.innerHTML = `<div class="err-box"><strong>Heatmap no disponible (HTTP ${escapeHtml(e.message)})</strong>${pat() ? "Token inválido." : "Añade PAT en Config o publica el catálogo."}</div>`;
    }
  }

  function renderCredits() {
    const root = $("#credits-grid");
    if (!root) return;
    if (!state.credits?.providers) {
      root.innerHTML = `<div class="err-box"><strong>credits.json no disponible</strong></div>`;
      return;
    }
    if ($("#credits-updated")) $("#credits-updated").textContent = state.credits.last_updated || "—";
    root.innerHTML = state.credits.providers
      .map((p) => {
        const vs = p.verification_status || "estimated";
        const usage =
          p.usage === null || p.usage === undefined || p.usage === ""
            ? vs === "estimated"
              ? "sin dato"
              : "—"
            : String(p.usage);
        const warn =
          vs === "estimated"
            ? `<p class="truth-warn">Truth model: estimación/placeholder — no es consumo real.</p>`
            : "";
        return `<article class="card credit-card" data-id="${escapeHtml(p.id)}">
          <div class="meta">
            <h3>${escapeHtml(p.name)}</h3>
            <span class="tag ${escapeHtml(vs)}">${escapeHtml(vs === "estimated" ? "estimated · no real" : vs)}</span>
          </div>
          <div class="usage">${escapeHtml(usage)}<span class="unit">${escapeHtml(p.unit || "")}</span></div>
          ${warn}
          <p class="note">plan: ${escapeHtml(p.plan || "—")} · ${escapeHtml(p.last_checked_at || "—")}</p>
          <p class="note">source: ${escapeHtml(p.source || "—")}</p>
          <div class="row" style="margin-top:10px"><button type="button" class="ghost btn-edit-credit" data-id="${escapeHtml(p.id)}">Editar</button></div>
          <div class="fields">
            <label>Uso</label><input type="text" data-f="usage" value="${escapeHtml(p.usage ?? "")}" />
            <label>Límite</label><input type="text" data-f="limit" value="${escapeHtml(p.limit ?? "")}" />
            <label>Plan</label><input type="text" data-f="plan" value="${escapeHtml(p.plan ?? "")}" />
            <label>Unidad</label><input type="text" data-f="unit" value="${escapeHtml(p.unit ?? "")}" />
            <label>verification_status</label>
            <select data-f="verification_status">
              <option value="verified" ${vs === "verified" ? "selected" : ""}>verified</option>
              <option value="manual" ${vs === "manual" ? "selected" : ""}>manual</option>
              <option value="estimated" ${vs === "estimated" ? "selected" : ""}>estimated</option>
            </select>
            <label>source</label><input type="text" data-f="source" value="${escapeHtml(p.source ?? "")}" />
            <label>notes</label><textarea data-f="notes">${escapeHtml(p.notes ?? "")}</textarea>
            <div class="row" style="margin-top:10px">
              <button type="button" class="hot btn-save-credit" data-id="${escapeHtml(p.id)}">Aplicar</button>
              <button type="button" class="ghost btn-cancel-credit">Cerrar</button>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function applyCreditEdit(id, card) {
    const p = state.credits.providers.find((x) => x.id === id);
    if (!p || !card) return;
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
    state.credits.last_updated = p.last_checked_at;
    renderCredits();
    wireView();
  }

  function exportCredits() {
    if (!state.credits) return;
    const blob = new Blob([JSON.stringify(state.credits, null, 2) + "\n"], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "credits.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function renderSources() {
    const root = $("#sources-feed");
    if (!root) return;
    if (!state.sources?.channels?.length) {
      root.innerHTML = `<div class="item note">sources.json no disponible</div>`;
      return;
    }
    root.innerHTML = state.sources.channels
      .map((ch) => {
        const checked = ch.last_checked_at ? escapeHtml(ch.last_checked_at) : "nunca";
        return `<div class="item" role="listitem">
          <span class="sha">${escapeHtml(ch.kind || "link")}</span>
          <span><a href="${escapeHtml(ch.url)}" target="_blank" rel="noopener">${escapeHtml(ch.name)}</a>
            <span class="note"> — ${escapeHtml(ch.last_note || "")}</span></span>
          <span class="when"><span class="tag manual">${escapeHtml(ch.verification_status || "manual")}</span>
            · ${checked}
            <button type="button" class="ghost btn-check-source" data-id="${escapeHtml(ch.id)}" style="margin-left:6px;padding:4px 8px">Check</button>
          </span>
        </div>`;
      })
      .join("");
  }

  function markSourceCheck(id) {
    const ch = state.sources?.channels?.find((c) => c.id === id);
    if (!ch) return;
    const note = window.prompt(`Nota del check «${ch.name}»:`, ch.last_note || "");
    if (note === null) return;
    ch.last_checked_at = new Date().toISOString().slice(0, 10);
    ch.last_note = note.trim() || "Revisado";
    ch.verification_status = "manual";
    const saved = JSON.parse(localStorage.getItem("forge_sources_checks") || "{}");
    saved[id] = { last_checked_at: ch.last_checked_at, last_note: ch.last_note };
    localStorage.setItem("forge_sources_checks", JSON.stringify(saved));
    renderSources();
    wireView();
  }

  function renderGallery() {
    const root = $("#gallery-grid");
    if (!root) return;
    if (!state.gallery.length) {
      root.innerHTML = `<div class="err-box"><strong>gallery.json vacío</strong>Rutas a ../src/</div>`;
      return;
    }
    root.innerHTML = state.gallery
      .map(
        (it, i) => `<button type="button" class="gal-item" data-i="${i}" aria-label="Abrir ${escapeHtml(it.title)}">
        <img src="${escapeHtml(it.src)}" alt="" loading="lazy" onerror="this.style.opacity=.3" />
        <span class="cap">${escapeHtml(it.title)}</span>
      </button>`
      )
      .join("");
  }

  /* lightbox */
  let lbIndex = 0;
  let lbLast = null;
  function openLightbox(i) {
    if (!state.gallery.length) return;
    if ($("#lightbox").hidden) lbLast = document.activeElement;
    lbIndex = ((i % state.gallery.length) + state.gallery.length) % state.gallery.length;
    const it = state.gallery[lbIndex];
    $("#lb-img").src = it.src;
    $("#lb-img").alt = it.title || "Referencia";
    $("#lb-title").textContent = `${it.title} (${lbIndex + 1}/${state.gallery.length})`;
    $("#lightbox").hidden = false;
    $("#lb-close").focus();
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    $("#lightbox").hidden = true;
    $("#lb-img").src = "";
    document.body.style.overflow = "";
    lbLast?.focus?.();
  }

  async function copyReset() {
    const text = `RESET FORGE

Descarta toda memoria de chats previos sobre este stack.
Reconstruye SOLO desde el nodo git:
- AGENTS.md (o CLAUDE.md)
- SOUL.md
- hub/agents.json (mapa de salas)
- docs/workflows/UNIVERSAL_BOOTSTRAP_PROMPT.md
- skill que toque en .agents/skills/ o .skills/

Confirma listando archivos cargados y próxima acción única.`;
    try {
      await navigator.clipboard.writeText(text);
      $("#dock-status").textContent = "RESET FORGE copiado al portapapeles";
    } catch {
      $("#dock-status").textContent = "No se pudo copiar RESET";
    }
  }

  function parseHash() {
    const h = location.hash.replace(/^#/, "");
    if (h.startsWith("agent/")) {
      state.view = "agent";
      state.agentId = h.slice(6);
    } else if (h) {
      state.view = h;
      state.agentId = null;
    }
  }

  function wireGlobal() {
    $$(".rail .navitem[data-view], .dock [data-view]").forEach((b) => {
      b.addEventListener("click", () => setNav(b.dataset.view));
    });
    $("#cfg-btn").onclick = () => setNav("config");
    $("#reset-btn").onclick = copyReset;
    $("#dock-copy-boot").onclick = async () => {
      try {
        await navigator.clipboard.writeText(state.bootstrap || "");
        $("#dock-status").textContent = "bootstrap universal copiado";
      } catch {
        $("#dock-status").textContent = "fallo al copiar bootstrap";
      }
    };
    $("#search").addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const q = e.target.value.trim().toLowerCase();
      if (!q) return;
      const agent = state.agentsData?.agents?.find(
        (a) =>
          a.id.includes(q) ||
          a.name.toLowerCase().includes(q) ||
          a.short?.toLowerCase().includes(q)
      );
      if (agent) return setNav("agent", agent.id);
      const skill = state.catalog?.skills?.find((s) => s.name.toLowerCase().includes(q));
      if (skill) return setNav("skills");
      if (q.includes("credit") || q.includes("€")) return setNav("credits");
      if (q.includes("heat") || q.includes("ops")) return setNav("ops");
      if (q.includes("boot") || q.includes("proto")) return setNav("protocol");
      setNav("floor");
    });

    $("#lb-close").onclick = closeLightbox;
    $("#lb-prev").onclick = () => openLightbox(lbIndex - 1);
    $("#lb-next").onclick = () => openLightbox(lbIndex + 1);
    $("#lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if ($("#lightbox").hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
      if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
    });
    window.addEventListener("hashchange", () => {
      parseHash();
      render();
    });
  }

  async function boot() {
    wireGlobal();
    updateModeChips();
    parseHash();
    await loadStatic();
    render();
    loadGithubPanels();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
