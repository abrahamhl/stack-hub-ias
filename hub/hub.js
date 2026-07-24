/* AI FORGE VAULT — Fallout Shelter Factory · premium grammar reimplemented */
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
    taxonomy: null,
    catalog: null,
    credits: null,
    sources: null,
    gallery: [],
    bootstrap: "",
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
  };

  const pat = () => localStorage.getItem("forge_pat") || "";
  const repo = () => (pat() ? PRIV : PUB);
  const esc = (s) =>
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

  async function gh(path) {
    const headers = { Accept: "application/vnd.github+json" };
    if (pat()) headers.Authorization = `Bearer ${pat()}`;
    const r = await fetch(`https://api.github.com/repos/${repo()}${path}`, { headers });
    if (!r.ok) {
      const e = new Error(String(r.status));
      e.status = r.status;
      throw e;
    }
    return r.json();
  }

  async function fetchCommitsSince(iso, maxPages = 6) {
    const all = [];
    for (let page = 1; page <= maxPages; page++) {
      const batch = await gh(`/commits?per_page=100&since=${encodeURIComponent(iso)}&page=${page}`);
      if (!Array.isArray(batch) || !batch.length) break;
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return all;
  }

  /* ── Particles (ref #8) ── */
  let particleRaf = 0;
  function startParticles() {
    const c = $("#particle-field");
    if (!c || state.reducedMotion) return;
    const ctx = c.getContext("2d");
    const resize = () => {
      c.width = innerWidth * devicePixelRatio;
      c.height = innerHeight * devicePixelRatio;
      c.style.width = innerWidth + "px";
      c.style.height = innerHeight + "px";
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    addEventListener("resize", resize);
    const N = 48;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.6,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = "rgba(55,232,255,0.35)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(255,138,76,${0.12 * (1 - d / 120)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      particleRaf = requestAnimationFrame(tick);
    };
    particleRaf = requestAnimationFrame(tick);
  }

  /* ── Spotlight on rooms (ref #3) ── */
  function wireSpotlight(root = document) {
    $$(".room", root).forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("focus", () => {
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "30%");
      });
    });
  }

  function setInspector(title, html, action, phase = 0, busy = false) {
    $("#insp-context").innerHTML = `<h3>${esc(title)}</h3>${html}`;
    if (action) $("#insp-action").textContent = action;
    const rings = $$("#insp-phases i");
    rings.forEach((el, i) => {
      el.classList.toggle("on", i < Math.max(1, phase));
      el.classList.toggle("busy", busy && i === Math.min(phase, 3));
    });
    $("#insp-phase-label").textContent = busy
      ? `Fase ${phase} · job en curso (visible sin app del proveedor)`
      : `Fase ${phase} · standby`;
  }

  function liveJobs() {
    return (state.agentsData?.agents || []).filter((a) =>
      ["processing", "directing"].includes(a.job_state)
    );
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
    if (location.hash.replace(/^#/, "") !== hash) history.replaceState(null, "", `#${hash}`);
    render();
  }

  function roomCard(a, compact = false) {
    const busy = ["processing", "directing"].includes(a.job_state);
    const intensity = Math.round((a.intensity || 0.2) * 100);
    const orbClass = busy
      ? a.job_state === "processing"
        ? "orb busy swirl"
        : "orb busy"
      : "orb idle";
    return `
      <div class="room" data-accent="${esc(a.accent)}" data-agent-card="${esc(a.id)}">
        <div class="room-top">
          <div class="${orbClass}" style="--room:var(--${esc(a.accent)})" aria-hidden="true"></div>
          <span class="status-pill ${esc(a.job_state || a.status)}">${esc(a.job_state || a.status)}</span>
        </div>
        <h2>${esc(a.short || a.name)}</h2>
        ${!compact ? `<p>${esc(a.role)}</p>` : ""}
        <div class="job-label">${esc(a.job_label || "—")}</div>
        <div class="meter" style="--w:${intensity}%" aria-hidden="true"><i></i></div>
        <span class="note">${(a.skills || []).length} skills · fase ${esc(String(a.phase ?? 0))}</span>
      </div>`;
  }

  /* ── Views ── */
  function viewFloor() {
    const agents = state.agentsData?.agents || [];
    const lanes = state.agentsData?.lanes || [];
    const jobs = liveJobs();
    setInspector(
      "Factory Floor",
      `<p class="note">Fallout Shelter · cada sala es un agente. Orbes = job vivo (aunque la app del proveedor esté cerrada).</p>
       <p class="note" style="margin-top:8px"><b>${jobs.length}</b> jobs activos · <b>${agents.length}</b> salas · refs 1,3,4,8,10,11</p>`,
      jobs[0]
        ? `Sala caliente: ${jobs[0].short} — ${jobs[0].job_label}. Entra y copia bootstrap.`
        : "Ningún job hot. Entra en Claude o Grok para stack."
      ,
      jobs[0]?.phase || 1,
      jobs.length > 0
    );

    // Orrey positions: evenly on ring
    const n = agents.length || 1;
    const nodes = agents
      .map((a, i) => {
        const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
        const radius = 38; // % of stage
        const left = 50 + radius * Math.cos(ang);
        const top = 50 + radius * Math.sin(ang);
        return `<button type="button" class="orrey-node" style="left:${left}%;top:${top}%" data-agent="${esc(a.id)}" aria-label="Entrar en sala ${esc(a.name)}">
          ${roomCard(a, true)}
        </button>`;
      })
      .join("");

    const laneHtml = lanes
      .map((l) => {
        const live =
          jobs.some((j) => j.id === l.from) || jobs.some((j) => j.id === l.to);
        return `<span class="${live ? "live" : ""}">${esc(l.from)} → ${esc(l.to)} · ${esc(l.label)}</span>`;
      })
      .join("");

    return `
      <section class="hero-vault">
        <span class="kicker"><span class="d live" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--cyan);margin-right:6px"></span>VAULT ONLINE · PREMIUM GRAMMAR</span>
        <h1>Shelter factory.<br /><em>Not a wiki.</em></h1>
        <p class="lead">Nodo git visual: salas de agentes, stacks, handoffs como vault Obsidian, jobs vivos con orbes. RESET FORGE limpia memoria de chat. Taxonomía del stack registrada en <code>hub/taxonomy.json</code>.</p>
        <div class="row" style="margin-top:14px">
          <button type="button" class="hot" data-view="protocol">Copiar bootstrap</button>
          <button type="button" class="ghost" data-view="taxonomy">Ver taxonomía</button>
          <button type="button" class="ghost" data-view="ops">Pulse / barras</button>
        </div>
      </section>

      <div class="orrey-wrap" role="region" aria-label="Mapa orrey de agentes">
        <div class="orrey-stage">
          <div class="orrey-ring r1"></div>
          <div class="orrey-ring r2"></div>
          <div class="orrey-ring r3"></div>
          <div class="orrey-core" aria-hidden="true">
            <div>
              <strong>NODE</strong>
              <small>git · hub</small>
            </div>
          </div>
          ${nodes}
        </div>
      </div>

      <div class="lane-legend" aria-label="Carriles de handoff">${laneHtml}</div>

      <div class="kpis" style="margin-top:16px">
        <div class="kpi"><div class="v" id="k-commits">—</div><div class="k">commits 30d</div></div>
        <div class="kpi"><div class="v" id="k-jobs">${jobs.length}</div><div class="k">jobs vivos</div></div>
        <div class="kpi"><div class="v" id="k-branches">—</div><div class="k">ramas</div></div>
        <div class="kpi"><div class="v" id="k-issues">—</div><div class="k">issues</div></div>
      </div>`;
  }

  function viewAgent(id) {
    const a = state.agentsData?.agents?.find((x) => x.id === id);
    if (!a) {
      return `<div class="err-box"><strong>Sala no encontrada</strong>${esc(id)}</div>
        <p style="margin-top:12px"><button type="button" data-view="floor">← Floor</button></p>`;
    }
    const busy = ["processing", "directing"].includes(a.job_state);
    setInspector(
      a.name,
      `<p class="note"><b>Job:</b> ${esc(a.job_label)}</p>
       <p class="note"><b>Estado:</b> ${esc(a.job_state)} · fase ${esc(String(a.phase))}</p>
       <p class="note"><b>Superficie:</b> ${esc(a.surface)}</p>
       <p class="note" style="margin-top:8px">${esc(a.notes || "")}</p>`,
      `RESET FORGE en ${a.surface} → pega bootstrap de sala → trabaja solo con rutas listadas.`,
      a.phase || 0,
      busy
    );

    const catalogSkills = state.catalog?.skills || [];
    const skillCards = (a.skills || [])
      .map((name) => {
        const meta = catalogSkills.find((s) => s.name === name);
        return `<li><strong>${esc(name)}</strong>${meta ? esc(meta.description) : ""}
          ${meta ? `<br/><span style="color:var(--cyan)">${esc(meta.path)}</span>` : ""}</li>`;
      })
      .join("");
    const paths = (a.repo_paths || []).map((p) => `<li>${esc(p)}</li>`).join("");
    const tools = (a.tools || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const best = (a.best_for || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const avoid = (a.avoid_for || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const lanes = (state.agentsData?.lanes || []).filter((l) => l.from === id || l.to === id);
    const laneHtml = lanes.length
      ? lanes
          .map(
            (l) =>
              `<div class="item"><span class="sha">${esc(l.from)}→${esc(l.to)}</span><span>${esc(l.label)}</span><span class="when">${esc(l.via || "")}</span></div>`
          )
          .join("")
      : `<div class="item note">Sin carriles</div>`;
    const boot = buildAgentBootstrap(a);
    const orbClass = busy
      ? a.job_state === "processing"
        ? "orb busy swirl"
        : "orb busy"
      : "orb idle";

    return `
      <div class="row" style="margin-bottom:14px">
        <button type="button" class="ghost" data-view="floor">← Factory Floor</button>
        <span class="chip">ROOM / ${esc(a.id)}</span>
        <span class="status-pill ${esc(a.job_state)}">${esc(a.job_state)}</span>
      </div>
      <div class="dossier-hero">
        <div class="${orbClass}" style="--room:var(--${esc(a.accent)})" aria-hidden="true"></div>
        <div>
          <div class="caption">Dossier · shelter room · refs 1,3,4,17</div>
          <h1>${esc(a.name)}</h1>
          <p class="lead" style="margin-top:8px">${esc(a.role)}</p>
          <div class="job-label" style="margin-top:6px">${esc(a.job_label)}</div>
          <div class="tagrow">${best}</div>
        </div>
      </div>
      <div class="dossier-grid">
        <div class="panel">
          <div class="caption">Stack de skills</div>
          <ul class="stack-list" style="margin-top:10px">${skillCards}</ul>
          <div class="caption" style="margin-top:14px">Tools</div>
          <div class="tagrow">${tools}</div>
        </div>
        <div class="panel">
          <div class="caption">Rutas del repositorio</div>
          <ul class="path-list" style="margin-top:10px">${paths}</ul>
          <div class="caption" style="margin-top:14px">Evitar</div>
          <div class="tagrow">${avoid || "—"}</div>
          <div class="caption" style="margin-top:14px">Handoffs</div>
          <div class="feed" style="margin-top:8px">${laneHtml}</div>
        </div>
      </div>
      <div class="panel" style="margin-top:14px">
        <div class="row" style="justify-content:space-between;margin-bottom:10px">
          <div>
            <div class="caption">Terminal de sala</div>
            <p class="note">Pega tras RESET FORGE en ${esc(a.surface)}</p>
          </div>
          <button type="button" class="hot" id="copy-agent-boot">Copiar bootstrap</button>
        </div>
        <pre class="boot-box" id="agent-boot">${esc(boot)}</pre>
      </div>`;
  }

  function buildAgentBootstrap(a) {
    const shared = state.agentsData?.shared || {};
    return `[AI FORGE · SALA ${a.short || a.name} · ${a.id}]
Job actual en hub: ${a.job_state} — ${a.job_label}

1. RESET FORGE — descarta memoria de chats previos.
2. Nodo: ${shared.node || PRIV}
3. Protocolo: ${a.protocol}
4. También: ${(shared.protocol_files || []).join(", ")}
5. Rol: ${a.role}
6. Skills (archivos del repo):
${(a.skills || []).map((s) => `   - ${s}`).join("\n")}
7. Rutas de sala:
${(a.repo_paths || []).map((p) => `   - ${p}`).join("\n")}
8. Premium UI grammar: .skills/frontend-hyper-boost/references/premium-21st-registry.md
9. Truth model: estimated ≠ uso real.
10. Entrega: commit atómico + .ai-forge/audit/ (actor: ${a.id}-*)

Confirma: nombre, qué lees/escribes, próxima acción única.`;
  }

  function viewSkills() {
    setInspector("Skill Vault", `<p class="note">Skills canónicas del nodo + owners por sala.</p>`, "Edita en el path del repo.", 1, false);
    const owners = state.agentsData?.skill_owners || {};
    const cards = (state.catalog?.skills || [])
      .map((s) => {
        const who = owners[s.name] || [];
        return `<article class="card">
          <div class="row" style="justify-content:space-between;margin-bottom:6px">
            <span class="tag ${esc(s.category)}">${esc(s.category)}</span>
            <a class="note" href="https://github.com/${PRIV}/blob/hyper-boost/${esc(s.path)}" target="_blank" rel="noopener">repo ↗</a>
          </div>
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.description)}</p>
          <div class="tagrow">${who.map((w) => `<span class="tag">${esc(w)}</span>`).join("")}</div>
        </article>`;
      })
      .join("");
    return `
      <div class="view-head">
        <div><div class="caption">Skill Vault · ref #1 shader cards</div><h1>Una skill,<br/><em>varias salas.</em></h1></div>
        <p class="lead">Inventario del nodo. Owners desde agents.json.</p>
      </div>
      <div class="grid c3">${cards || '<p class="note">catalog.json missing</p>'}</div>`;
  }

  function viewOps() {
    setInspector("Pulse", `<p class="note">Barras verticales + commits. Ref #15 vertical-bars, #4 sphere.</p>`, "PAT en Config si el público 404.", 2, true);
    return `
      <div class="view-head">
        <div><div class="caption">Pulse · 90d</div><h1>Señal del <em>nodo</em>.</h1></div>
        <p class="lead">Heatmap como barras de reactor, no tabla gris.</p>
      </div>
      <div class="panel" id="heatmap-root"><p class="note">Cargando pulse…</p></div>
      <div class="panel" style="margin-top:14px">
        <div class="caption">Commits</div>
        <div class="feed" id="commit-feed" role="list"><div class="item note">…</div></div>
      </div>
      <div class="panel" style="margin-top:14px">
        <div class="caption">Issues</div>
        <div class="feed" id="issues-feed" role="list"><div class="item note">…</div></div>
      </div>`;
  }

  function viewCredits() {
    setInspector("Power cells", `<p class="note">Truth model. Estimated ≠ real.</p>`, "Export → commit credits.json", 1, false);
    return `
      <div class="view-head">
        <div><div class="caption">Power cells</div><h1>Créditos <em>visibles</em>.</h1></div>
        <p class="lead">Placeholders estimated hasta verificación.</p>
      </div>
      <div class="row" style="margin-bottom:12px">
        <button type="button" class="hot" id="export-credits">Exportar credits.json</button>
        <span class="note">file: <span id="credits-updated">—</span></span>
      </div>
      <div class="grid c3" id="credits-grid"></div>`;
  }

  function viewNews() {
    setInspector("Comms", `<p class="note">Canales oficiales. Check manual.</p>`, "Marca check tras leer.", 0, false);
    return `
      <div class="view-head">
        <div><div class="caption">Comms</div><h1>Señal <em>externa</em>.</h1></div>
        <p class="lead">sources.json · sin scraping.</p>
      </div>
      <div class="panel"><div class="feed" id="sources-feed" role="list"></div></div>`;
  }

  function viewGallery() {
    setInspector("Archives", `<p class="note">Galería circular + grid. Refs #12–14.</p>`, "Enter / Esc / flechas", 1, false);
    return `
      <div class="view-head">
        <div><div class="caption">Archives · UX refs</div><h1>Referencias, no <em>copias</em>.</h1></div>
        <p class="lead">Órbita de capturas desde src/.</p>
      </div>
      <div class="panel"><div class="gal-orbit" id="gallery-orbit"></div></div>
      <div class="gal-grid" id="gallery-grid" style="margin-top:14px"></div>`;
  }

  function viewProtocol() {
    setInspector("Bootstrap", `<p class="note">Protocolo universal + RESET FORGE.</p>`, "Copia y pega en cualquier IA.", 0, false);
    return `
      <div class="view-head">
        <div><div class="caption">Bootstrap</div><h1>Una pasta.<br/><em>Todas las IAs.</em></h1></div>
        <p class="lead">El chat no es el nodo. Esto sí.</p>
      </div>
      <div class="panel">
        <pre class="boot-box" id="proto-block">${esc(state.bootstrap || "…")}</pre>
        <div class="row" style="margin-top:12px">
          <button type="button" class="hot" id="copy-proto">Copiar bloque</button>
          <button type="button" id="reset-btn-2">Copiar RESET FORGE</button>
        </div>
      </div>`;
  }

  function viewAudit() {
    setInspector("Audit trail", `<p class="note">Commits = qué. Audit notes = por qué.</p>`, "Sin commit no existe.", 1, false);
    return `
      <div class="view-head">
        <div><div class="caption">Audit trail</div><h1>Evidencia, no <em>relato</em>.</h1></div>
        <p class="lead">Feed git del repo activo.</p>
      </div>
      <div class="panel"><div class="feed" id="commit-feed" role="list"></div></div>`;
  }

  function viewTaxonomy() {
    const t = state.taxonomy;
    setInspector(
      "Taxonomy",
      `<p class="note">Todo lo hablado con las IAs debe acabar en git + este mapa.</p>`,
      "Si no está aquí o en audit/, no cuenta para el stack.",
      1,
      false
    );
    if (!t) {
      return `<div class="err-box"><strong>taxonomy.json missing</strong></div>`;
    }
    const refs = (t.ref_map_hub_v2 || [])
      .map(
        (r) =>
          `<tr><td>#${esc(String(r.ref))} · ${esc(r.zone)}</td><td>${esc(r.impl)}</td></tr>`
      )
      .join("");
    const conv = (t.conversation_taxonomy?.items || [])
      .map(
        (c) =>
          `<tr><td>${esc(c.topic)}</td><td>${esc(c.where)}</td></tr>`
      )
      .join("");
    return `
      <div class="view-head">
        <div><div class="caption">Stack taxonomy</div><h1>Contado en el <em>nodo</em>.</h1></div>
        <p class="lead">Orientación premium REQUIRED · ${esc(t.premium_orientation?.level)} · ${esc(t.premium_orientation?.metaphor)}</p>
      </div>
      <div class="panel">
        <div class="caption">Registry → zonas del hub</div>
        <table class="tax-table" style="margin-top:10px">
          <thead><tr><th>Ref / zona</th><th>Implementación</th></tr></thead>
          <tbody>${refs}</tbody>
        </table>
      </div>
      <div class="panel" style="margin-top:14px">
        <div class="caption">Conversación → registro</div>
        <table class="tax-table" style="margin-top:10px">
          <thead><tr><th>Tema</th><th>Dónde vive</th></tr></thead>
          <tbody>${conv}</tbody>
        </table>
      </div>
      <div class="panel" style="margin-top:14px">
        <div class="caption">Nodo</div>
        <p class="note">repo: ${esc(t.node?.repo)} · hub: ${esc(t.node?.hub_entry)} · registry: ${esc(t.premium_orientation?.registry)}</p>
      </div>`;
  }

  function viewConfig() {
    setInspector("Config", `<p class="note">PAT solo en localStorage.</p>`, "Nunca en git.", 0, false);
    return `
      <div class="view-head">
        <div><div class="caption">Config</div><h1>Token <em>read-only</em>.</h1></div>
        <p class="lead">Para el nodo privado si el público 404.</p>
      </div>
      <div class="panel">
        <div class="row">
          <input type="password" id="pat" placeholder="github_pat_…" style="max-width:420px" autocomplete="off" />
          <button type="button" class="hot" id="save-pat">Guardar</button>
          <button type="button" class="ghost" id="clear-pat">Borrar</button>
        </div>
      </div>`;
  }

  function render() {
    const canvas = $("#canvas");
    if (state.view === "agent" && state.agentId) {
      canvas.innerHTML = viewAgent(state.agentId);
    } else {
      const map = {
        floor: viewFloor,
        skills: viewSkills,
        ops: viewOps,
        credits: viewCredits,
        news: viewNews,
        gallery: viewGallery,
        protocol: viewProtocol,
        audit: viewAudit,
        taxonomy: viewTaxonomy,
        config: viewConfig,
      };
      canvas.innerHTML = (map[state.view] || viewFloor)();
    }
    wireView();
    updateJobChip();
  }

  function updateJobChip() {
    const jobs = liveJobs();
    $("#jobs-label").textContent = jobs.length ? `${jobs.length} jobs live` : "0 jobs";
    $("#dot-jobs").className = "d " + (jobs.length ? "busy" : "live");
  }

  function wireView() {
    $$("[data-view]", $("#canvas")).forEach((el) =>
      el.addEventListener("click", () => setNav(el.dataset.view))
    );
    $$("[data-agent]", $("#canvas")).forEach((el) =>
      el.addEventListener("click", () => setNav("agent", el.dataset.agent))
    );
    // orrey-node wraps room — click on button
    $$(".orrey-node", $("#canvas")).forEach((el) => {
      el.addEventListener("click", () => setNav("agent", el.dataset.agent));
    });
    wireSpotlight($("#canvas"));

    $("#copy-agent-boot")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText($("#agent-boot")?.textContent || "");
        $("#copy-agent-boot").textContent = "Copiado ✓";
      } catch { /* */ }
    });
    $("#copy-proto")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(state.bootstrap);
        $("#copy-proto").textContent = "Copiado ✓";
      } catch { /* */ }
    });
    $("#reset-btn-2")?.addEventListener("click", copyReset);

    if (["ops", "audit", "floor"].includes(state.view)) loadGithubPanels();
    if (state.view === "ops") loadHeatmapBars();
    if (state.view === "credits") renderCredits();
    if (state.view === "news") renderSources();
    if (state.view === "gallery") renderGallery();
    if (state.view === "config") {
      if (pat()) $("#pat").value = pat();
      $("#save-pat").onclick = () => {
        localStorage.setItem("forge_pat", $("#pat").value.trim());
        updateMode();
        loadGithubPanels();
      };
      $("#clear-pat").onclick = () => {
        localStorage.removeItem("forge_pat");
        $("#pat").value = "";
        updateMode();
        loadGithubPanels();
      };
    }
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
      b.onclick = () => applyCredit(b.dataset.id, b.closest(".credit-card"));
    });
    $("#export-credits")?.addEventListener("click", exportCredits);
    $$(".btn-check-source").forEach((b) => {
      b.onclick = () => markSource(b.dataset.id);
    });
    $$(".gal-item").forEach((b) => {
      b.onclick = () => openLb(Number(b.dataset.i));
    });
  }

  async function loadStatic() {
    const [agents, catalog, credits, sources, gallery, boot, taxonomy] = await Promise.all([
      fetch("agents.json").then((r) => r.json()).catch(() => null),
      fetch("catalog.json").then((r) => r.json()).catch(() => null),
      fetch("credits.json").then((r) => r.json()).catch(() => null),
      fetch("sources.json").then((r) => r.json()).catch(() => null),
      fetch("gallery.json").then((r) => r.json()).catch(() => null),
      fetch("bootstrap.txt").then((r) => (r.ok ? r.text() : "")).catch(() => ""),
      fetch("taxonomy.json").then((r) => r.json()).catch(() => null),
    ]);
    state.agentsData = agents;
    state.catalog = catalog;
    state.credits = credits;
    state.sources = sources;
    if (state.sources?.channels) {
      const saved = JSON.parse(localStorage.getItem("forge_sources_checks") || "{}");
      for (const ch of state.sources.channels) {
        if (saved[ch.id]) Object.assign(ch, saved[ch.id]);
      }
    }
    state.gallery = gallery?.items || [];
    state.bootstrap = boot;
    state.taxonomy = taxonomy;
    $("#nav-skills").textContent = String(catalog?.skills?.length || "—");
    renderRail();
    renderMobile();
  }

  function renderRail() {
    const box = $("#rail-agents");
    box.innerHTML = (state.agentsData?.agents || [])
      .map((a) => {
        const hot = ["processing", "directing"].includes(a.job_state);
        return `<button type="button" class="navitem" data-agent="${esc(a.id)}">
          <span>${hot ? "◉ " : "○ "}${esc(a.short || a.name)}</span>
          <span class="count">${esc(a.job_state || a.status)}</span>
        </button>`;
      })
      .join("");
    box.querySelectorAll("[data-agent]").forEach((b) =>
      b.addEventListener("click", () => setNav("agent", b.dataset.agent))
    );
  }

  function renderMobile() {
    const tabs = $("#mobile-tabs");
    const items = [
      ["floor", "Floor"],
      ["skills", "Skills"],
      ["ops", "Pulse"],
      ["credits", "€"],
      ["taxonomy", "Tax"],
      ["protocol", "Boot"],
    ];
    tabs.innerHTML = items
      .map(([v, l]) => `<button type="button" data-view="${v}">${l}</button>`)
      .join("");
    tabs.querySelectorAll("[data-view]").forEach((b) =>
      b.addEventListener("click", () => setNav(b.dataset.view))
    );
  }

  function updateMode() {
    $("#mode-label").textContent = pat() ? "privado" : "público";
    $("#dot-mode").className = "d " + (pat() ? "on" : "live");
  }

  async function loadGithubPanels() {
    updateMode();
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

      const feedHtml = commits30.length
        ? commits30
            .slice(0, 12)
            .map((c) => {
              const msg = esc(c.commit.message.split("\n")[0]);
              const who = esc(c.commit.author?.name || c.author?.login || "?");
              return `<div class="item" role="listitem">
                <span class="sha"><a href="${esc(c.html_url)}" target="_blank" rel="noopener">${esc(c.sha.slice(0, 7))}</a></span>
                <span>${msg}</span>
                <span class="when">${who} · ${rel(c.commit.author.date)}</span>
              </div>`;
            })
            .join("")
        : `<div class="item note">Sin commits recientes.</div>`;
      $$("#commit-feed").forEach((el) => {
        el.innerHTML = feedHtml;
      });
      const issuesFeed = $("#issues-feed");
      if (issuesFeed) {
        issuesFeed.innerHTML = issues.length
          ? issues
              .slice(0, 8)
              .map(
                (i) =>
                  `<div class="item" role="listitem"><span class="sha">#${i.number}</span><span><a href="${esc(i.html_url)}" target="_blank" rel="noopener">${esc(i.title)}</a></span><span class="when">${rel(i.updated_at)}</span></div>`
              )
              .join("")
          : `<div class="item note">Sin issues.</div>`;
      }
      $("#dock-status").textContent = `vault · ${repo()} · ${commits30.length} c/30d · premium`;
    } catch (e) {
      $("#dot-node").className = "d err";
      const hint = pat()
        ? "Revisa PAT."
        : "Público 404 — Config → PAT del privado.";
      const err = `<div class="item err-box" role="listitem"><strong>HTTP ${esc(e.message)} · ${esc(repo())}</strong>${esc(hint)}</div>`;
      $$("#commit-feed").forEach((el) => {
        el.innerHTML = err;
      });
      const issuesFeed = $("#issues-feed");
      if (issuesFeed) issuesFeed.innerHTML = err;
      $("#dock-status").textContent = `error ${e.message}`;
    }
  }

  async function loadHeatmapBars() {
    const root = $("#heatmap-root");
    if (!root) return;
    try {
      const since = new Date(Date.now() - 90 * 864e5).toISOString();
      const commits = await fetchCommitsSince(since);
      const byDay = new Map();
      for (const c of commits) {
        const d = c.commit?.author?.date;
        if (!d) continue;
        const k = d.slice(0, 10);
        byDay.set(k, (byDay.get(k) || 0) + 1);
      }
      // last 42 days as vertical bars
      const days = [];
      for (let i = 41; i >= 0; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        const k = d.toISOString().slice(0, 10);
        days.push({ k, n: byDay.get(k) || 0 });
      }
      const max = Math.max(1, ...days.map((d) => d.n));
      const bars = days
        .map((d) => {
          const h = Math.max(4, Math.round((d.n / max) * 100));
          return `<b style="--h:${h}%" title="${esc(d.k)}: ${d.n} commits" tabindex="0"></b>`;
        })
        .join("");
      const authors = new Map();
      for (const c of commits) {
        const who = c.author?.login || c.commit?.author?.name || "?";
        authors.set(who, (authors.get(who) || 0) + 1);
      }
      const pills = [...authors.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([n, c]) => `<span class="tag">${esc(n)} · ${c}</span>`)
        .join("");
      root.innerHTML = `
        <div class="caption">Reactor bars · 42d window · ${commits.length} commits / 90d · ${esc(repo())}</div>
        <div class="vbars" style="margin-top:12px" role="img" aria-label="Barras de actividad">${bars}</div>
        <div class="tagrow" style="margin-top:12px">${pills}</div>`;
    } catch (e) {
      root.innerHTML = `<div class="err-box"><strong>Pulse offline (HTTP ${esc(e.message)})</strong>${pat() ? "Token." : "Añade PAT."}</div>`;
    }
  }

  function renderCredits() {
    const root = $("#credits-grid");
    if (!root || !state.credits?.providers) {
      if (root) root.innerHTML = `<div class="err-box"><strong>credits.json</strong></div>`;
      return;
    }
    if ($("#credits-updated")) $("#credits-updated").textContent = state.credits.last_updated || "—";
    root.innerHTML = state.credits.providers
      .map((p) => {
        const vs = p.verification_status || "estimated";
        const usage =
          p.usage === null || p.usage === undefined || p.usage === ""
            ? "sin dato"
            : String(p.usage);
        const warn =
          vs === "estimated"
            ? `<p class="truth-warn">estimated — no es consumo real</p>`
            : "";
        return `<article class="card credit-card" data-id="${esc(p.id)}">
          <div class="meta"><h3>${esc(p.name)}</h3><span class="tag ${esc(vs)}">${esc(vs)}</span></div>
          <div class="usage">${esc(usage)}<span class="unit">${esc(p.unit || "")}</span></div>
          ${warn}
          <p class="note">${esc(p.plan || "—")} · ${esc(p.last_checked_at || "—")}</p>
          <div class="row" style="margin-top:8px"><button type="button" class="ghost btn-edit-credit" data-id="${esc(p.id)}">Editar</button></div>
          <div class="fields">
            <label>Uso</label><input data-f="usage" value="${esc(p.usage ?? "")}" />
            <label>Plan</label><input data-f="plan" value="${esc(p.plan ?? "")}" />
            <label>Status</label>
            <select data-f="verification_status">
              <option value="verified" ${vs === "verified" ? "selected" : ""}>verified</option>
              <option value="manual" ${vs === "manual" ? "selected" : ""}>manual</option>
              <option value="estimated" ${vs === "estimated" ? "selected" : ""}>estimated</option>
            </select>
            <label>source</label><input data-f="source" value="${esc(p.source ?? "")}" />
            <div class="row" style="margin-top:8px">
              <button type="button" class="hot btn-save-credit" data-id="${esc(p.id)}">Aplicar</button>
              <button type="button" class="ghost btn-cancel-credit">Cerrar</button>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function applyCredit(id, card) {
    const p = state.credits.providers.find((x) => x.id === id);
    if (!p || !card) return;
    const get = (f) => card.querySelector(`[data-f="${f}"]`)?.value ?? "";
    const u = get("usage").trim();
    p.usage = u === "" ? null : u;
    p.plan = get("plan").trim() || "—";
    p.verification_status = get("verification_status") || "estimated";
    p.source = get("source").trim() || "manual";
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
    root.innerHTML = (state.sources?.channels || [])
      .map((ch) => {
        const checked = ch.last_checked_at ? esc(ch.last_checked_at) : "nunca";
        return `<div class="item" role="listitem">
          <span class="sha">${esc(ch.kind || "link")}</span>
          <span><a href="${esc(ch.url)}" target="_blank" rel="noopener">${esc(ch.name)}</a>
            <span class="note"> — ${esc(ch.last_note || "")}</span></span>
          <span class="when">${checked}
            <button type="button" class="ghost btn-check-source" data-id="${esc(ch.id)}" style="margin-left:6px;padding:4px 8px">Check</button>
          </span>
        </div>`;
      })
      .join("") || `<div class="item note">sources.json missing</div>`;
  }

  function markSource(id) {
    const ch = state.sources?.channels?.find((c) => c.id === id);
    if (!ch) return;
    const note = prompt(`Check «${ch.name}»`, ch.last_note || "");
    if (note === null) return;
    ch.last_checked_at = new Date().toISOString().slice(0, 10);
    ch.last_note = note.trim() || "ok";
    const saved = JSON.parse(localStorage.getItem("forge_sources_checks") || "{}");
    saved[id] = { last_checked_at: ch.last_checked_at, last_note: ch.last_note };
    localStorage.setItem("forge_sources_checks", JSON.stringify(saved));
    renderSources();
    wireView();
  }

  function renderGallery() {
    const orbit = $("#gallery-orbit");
    const grid = $("#gallery-grid");
    if (!state.gallery.length) {
      if (orbit) orbit.innerHTML = `<p class="note">Sin capturas</p>`;
      return;
    }
    if (orbit) {
      const n = Math.min(state.gallery.length, 10);
      orbit.innerHTML = state.gallery
        .slice(0, n)
        .map((it, i) => {
          const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
          const left = 50 + 38 * Math.cos(ang);
          const top = 50 + 38 * Math.sin(ang);
          return `<button type="button" class="gal-item" style="left:${left}%;top:${top}%" data-i="${i}" aria-label="${esc(it.title)}">
            <img src="${esc(it.src)}" alt="" loading="lazy" />
            <span class="cap">${esc(it.title)}</span>
          </button>`;
        })
        .join("");
    }
    if (grid) {
      grid.innerHTML = state.gallery
        .map(
          (it, i) =>
            `<button type="button" class="gal-item" data-i="${i}" aria-label="${esc(it.title)}">
              <img src="${esc(it.src)}" alt="" loading="lazy" />
              <span class="cap">${esc(it.title)}</span>
            </button>`
        )
        .join("");
    }
  }

  let lbIndex = 0;
  let lbLast = null;
  function openLb(i) {
    if (!state.gallery.length) return;
    if ($("#lightbox").hidden) lbLast = document.activeElement;
    lbIndex = ((i % state.gallery.length) + state.gallery.length) % state.gallery.length;
    const it = state.gallery[lbIndex];
    $("#lb-img").src = it.src;
    $("#lb-img").alt = it.title || "";
    $("#lb-title").textContent = `${it.title} (${lbIndex + 1}/${state.gallery.length})`;
    $("#lightbox").hidden = false;
    $("#lb-close").focus();
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    $("#lightbox").hidden = true;
    $("#lb-img").src = "";
    document.body.style.overflow = "";
    lbLast?.focus?.();
  }

  async function copyReset() {
    const text = `RESET FORGE

Descarta memoria de chats previos sobre este stack.
Reconstruye SOLO desde el nodo:
- AGENTS.md / CLAUDE.md
- SOUL.md
- hub/agents.json + hub/taxonomy.json
- .skills/frontend-hyper-boost/references/premium-21st-registry.md
- skill que toque en .agents/skills/ o .skills/

Confirma archivos cargados y próxima acción única.`;
    try {
      await navigator.clipboard.writeText(text);
      $("#dock-status").textContent = "RESET FORGE copiado";
    } catch {
      $("#dock-status").textContent = "no se pudo copiar";
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
    $$(".rail .navitem[data-view], .dock [data-view]").forEach((b) =>
      b.addEventListener("click", () => setNav(b.dataset.view))
    );
    $("#cfg-btn").onclick = () => setNav("config");
    $("#reset-btn").onclick = copyReset;
    $("#dock-copy-boot").onclick = async () => {
      try {
        await navigator.clipboard.writeText(state.bootstrap || "");
        $("#dock-status").textContent = "bootstrap copiado";
      } catch { /* */ }
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
      if (q.includes("tax")) return setNav("taxonomy");
      if (q.includes("skill")) return setNav("skills");
      if (q.includes("heat") || q.includes("pulse") || q.includes("ops")) return setNav("ops");
      setNav("floor");
    });
    $("#lb-close").onclick = closeLb;
    $("#lb-prev").onclick = () => openLb(lbIndex - 1);
    $("#lb-next").onclick = () => openLb(lbIndex + 1);
    $("#lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLb();
    });
    document.addEventListener("keydown", (e) => {
      if ($("#lightbox").hidden) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") openLb(lbIndex - 1);
      if (e.key === "ArrowRight") openLb(lbIndex + 1);
    });
    window.addEventListener("hashchange", () => {
      parseHash();
      render();
    });
  }

  async function boot() {
    wireGlobal();
    updateMode();
    parseHash();
    startParticles();
    await loadStatic();
    render();
    loadGithubPanels();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
