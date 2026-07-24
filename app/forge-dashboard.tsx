"use client";

import { useMemo, useState } from "react";

type View =
  | "command"
  | "projects"
  | "operators"
  | "skills"
  | "frontend"
  | "blueprint"
  | "git"
  | "bridge";

type Truth = "verified" | "review" | "local" | "blocked";

const projects = [
  {
    id: "ai-forge",
    name: "AI Forge",
    lane: "SHIP NOW",
    state: "Construyendo",
    score: 72,
    next: "Cerrar núcleo, D1 y catálogo saneado",
    tags: ["control-plane", "frontend", "MCP"],
    truth: "verified" as Truth,
  },
  {
    id: "career-os",
    name: "Career OS V3",
    lane: "MERGE",
    state: "Fusionar",
    score: 58,
    next: "Extraer flujos válidos hacia AI Forge",
    tags: ["career", "tracker", "legacy"],
    truth: "review" as Truth,
  },
  {
    id: "abraham-vault",
    name: "ABRAHAM_OS",
    lane: "INDEX",
    state: "Reparar enlaces",
    score: 35,
    next: "Inventario, punteros y política de privacidad",
    tags: ["vault", "registry", "private"],
    truth: "local" as Truth,
  },
  {
    id: "portfolio",
    name: "Portfolio Tech",
    lane: "NEXT",
    state: "Auditar deploy",
    score: 64,
    next: "Separar público, privado y casos de estudio",
    tags: ["github", "commercial", "creative"],
    truth: "review" as Truth,
  },
];

const operators = [
  {
    id: "codex",
    glyph: "CX",
    name: "Codex",
    role: "Constructor",
    mascot: "Stacky",
    status: "active",
    accent: "cyan",
    best: "Cambios reproducibles, repositorios, pruebas y arquitectura.",
    avoid: "Decisiones comerciales sin fuentes ni validación humana.",
    route: "Scope → Patch → Tests → Git audit",
    runtime: "Workspace local + Sites",
    memory: "Archivos y memoria direccionable",
    permission: "Workspace write / push gated",
    skillState: "Skills instaladas por tarea",
  },
  {
    id: "claude",
    glyph: "CL",
    name: "Claude Code",
    role: "Revisor senior",
    mascot: "Sin mascota técnica",
    status: "ready",
    accent: "forge",
    best: "Revisión, documentación, refactor y coherencia de producto.",
    avoid: "Publicar o sincronizar sin inspeccionar el diff.",
    route: "Review → Risks → Handoff",
    runtime: "Claude Code + Cowork",
    memory: "Conversaciones + Skills",
    permission: "MCP local configurable",
    skillState: "Catálogo personal y oficial",
  },
  {
    id: "selene",
    glyph: "SE",
    name: "Selene / Grok",
    role: "Contrapunto",
    mascot: "Identidad propia",
    status: "manual",
    accent: "violet",
    best: "Creatividad lateral, crítica y tensión conceptual.",
    avoid: "Cerrar hechos actuales sin una fuente primaria.",
    route: "Challenge → Alternatives → Claude review",
    runtime: "Chat + navegador",
    memory: "Contexto por sesión",
    permission: "Conectores explícitos",
    skillState: "Prompts y herramientas",
  },
  {
    id: "gemini",
    glyph: "GM",
    name: "Gemini",
    role: "Archivista",
    mascot: "Identidad propia",
    status: "ready",
    accent: "blue",
    best: "Contexto grande, documentos y ecosistema Google.",
    avoid: "Acceso indiscriminado a carpetas privadas.",
    route: "Ingest → Structure → Evidence",
    runtime: "Cloud + ecosistema Google",
    memory: "Documentos seleccionados",
    permission: "Drive/Stitch por conector",
    skillState: "Skills por cliente",
  },
  {
    id: "manus",
    glyph: "MN",
    name: "Manus",
    role: "Ejecutor",
    mascot: "Mano / avatar de producto",
    status: "manual",
    accent: "green",
    best: "Tareas por fases, navegador y producción controlada.",
    avoid: "Microtareas repetitivas que consumen créditos.",
    route: "Brief → Execute → Verify → Report",
    runtime: "Cloud computer + mensajería",
    memory: "Perfil + conocimiento",
    permission: "Apps, API y MCP",
    skillState: "Habilidades activables",
  },
  {
    id: "local",
    glyph: "LM",
    name: "Local Models",
    role: "Zona privada",
    mascot: "Null Signal",
    status: "offline",
    accent: "amber",
    best: "Procesamiento local, borradores y material sensible.",
    avoid: "Dar por buenas respuestas sin una revisión externa.",
    route: "Private ingest → Draft → Audit",
    runtime: "GPU/CPU local",
    memory: "Vault local seleccionado",
    permission: "Sin red por defecto",
    skillState: "Paquetes locales revisados",
  },
];

const skills = [
  {
    name: "orchestrating-ai-forge",
    family: "core",
    platforms: ["Codex", "Claude", "Gemini"],
    state: "canonical",
    privacy: "safe",
  },
  {
    name: "auditing-project-readiness",
    family: "audit",
    platforms: ["Codex", "Claude"],
    state: "canonical",
    privacy: "safe",
  },
  {
    name: "frontend-hyper-boost",
    family: "frontend-master",
    platforms: ["Codex", "Claude", "Gemini"],
    state: "canonical",
    privacy: "safe",
  },
  {
    name: "routing-model-workflows",
    family: "routing",
    platforms: ["Codex", "Claude", "Grok", "Local"],
    state: "canonical",
    privacy: "safe",
  },
  {
    name: "operating-abraham-mcp",
    family: "mcp",
    platforms: ["Codex", "Claude", "VS Code"],
    state: "canonical",
    privacy: "safe",
  },
  {
    name: "legacy-user-library",
    family: "private",
    platforms: ["Local"],
    state: "quarantine",
    privacy: "sensitive",
  },
];

const navItems: Array<{ id: View; label: string; meta: string }> = [
  { id: "command", label: "Daily Command", meta: "NOW" },
  { id: "projects", label: "Project Corkboard", meta: "04" },
  { id: "operators", label: "Operator Shelter", meta: "06" },
  { id: "skills", label: "Skill Registry", meta: "01 MASTER" },
  { id: "frontend", label: "Frontend Lab", meta: "BOOST" },
  { id: "blueprint", label: "Fork Blueprint", meta: "12 LAYERS" },
  { id: "git", label: "Git Auditor", meta: "LOCAL" },
  { id: "bridge", label: "MCP Bridge", meta: "READY" },
];

const motionScenes = [
  {
    id: "material",
    kicker: "SKIPER 12 / TRANSLATED",
    name: "Material Field",
    detail: "Una materia reactiva enmarca el producto sin bloquear el contenido.",
    input: "pointer · focus · tap pulse",
    fallback: "poster + gradient",
  },
  {
    id: "relief",
    kicker: "SKIPER 14 / TRANSLATED",
    name: "ASCII Relief",
    detail: "Volumen 3D convertido en terminal, píxel y relieve navegable.",
    input: "drag · arrows · D-pad",
    fallback: "static angle + alt",
  },
  {
    id: "path",
    kicker: "SKIPER 19 / TRANSLATED",
    name: "Narrative Path",
    detail: "La ruta visual enlaza hitos reales y hace visible el progreso.",
    input: "scroll · headings · PageDown",
    fallback: "full path + marker",
  },
] as const;

const capabilityLayers = [
  {
    name: "Identidad",
    benchmark: "Perfil, instrucciones, mascotas",
    forge: "Avatar separado del contrato técnico",
    state: "verified",
  },
  {
    name: "Skills",
    benchmark: "Skills personales, oficiales y plugins",
    forge: ".skills canónica + adaptadores",
    state: "verified",
  },
  {
    name: "Agentes",
    benchmark: "Cowork, subagentes, agente desplegable",
    forge: "Roster con scope, runtime y evidencia",
    state: "review",
  },
  {
    name: "Conectores",
    benchmark: "Apps, APIs y MCP personalizado",
    forge: "Catálogo con permiso y estado real",
    state: "review",
  },
  {
    name: "Computadora",
    benchmark: "Workspace, MCP local, cloud computer",
    forge: "Puente local allowlisted",
    state: "verified",
  },
  {
    name: "Navegador",
    benchmark: "Chrome integrado y navegador cloud",
    forge: "Herramienta separada y auditable",
    state: "review",
  },
  {
    name: "Memoria",
    benchmark: "Chats, conocimiento y archivos",
    forge: "Vault direccionable, no prompt gigante",
    state: "local",
  },
  {
    name: "Git",
    benchmark: "Worktrees, ramas y conector GitHub",
    forge: "Diff → test → commit → sync gated",
    state: "verified",
  },
  {
    name: "Uso",
    benchmark: "Límites, créditos y facturación",
    forge: "Coste + resultado + valor por evento",
    state: "review",
  },
  {
    name: "Automatización",
    benchmark: "Programado, hooks y mensajería",
    forge: "Colas durables y avisos saneados",
    state: "review",
  },
  {
    name: "Datos",
    benchmark: "Sandbox, privacidad y controles",
    forge: "Policy gateway visible",
    state: "verified",
  },
  {
    name: "Deploy",
    benchmark: "Sites, previews y cloud runtimes",
    forge: "Sites staging + GitHub/Vercel production",
    state: "review",
  },
] as const;

const heatmap = [
  0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 3, 1, 0, 0, 0, 2, 1, 0, 0, 4, 2, 1, 0,
  0, 1, 2, 0, 3, 1, 0, 0, 2, 4, 3, 1, 0, 2, 0, 1, 3, 2, 4, 1, 0, 2, 3, 1,
  4,
];

function TruthBadge({ truth }: { truth: Truth }) {
  const labels: Record<Truth, string> = {
    verified: "VERIFIED",
    review: "REVIEW",
    local: "LOCAL ONLY",
    blocked: "BLOCKED",
  };
  return <span className={`truth truth-${truth}`}>{labels[truth]}</span>;
}

function Metric({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: string;
}) {
  return (
    <article className={`metric-card tone-${tone}`}>
      <div className="metric-label">{label}</div>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

export function ForgeDashboard() {
  const [view, setView] = useState<View>("command");
  const [operatorId, setOperatorId] = useState("codex");
  const [query, setQuery] = useState("");
  const [density, setDensity] = useState<"focus" | "dense">("focus");
  const [scene, setScene] =
    useState<(typeof motionScenes)[number]["id"]>("material");
  const [quality, setQuality] = useState<"calm" | "boost" | "ultra">("boost");
  const [mobileMenu, setMobileMenu] = useState(false);

  const selectedOperator =
    operators.find((operator) => operator.id === operatorId) ?? operators[0];

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(normalized) ||
        project.tags.some((tag) => tag.includes(normalized)),
    );
  }, [query]);

  const filteredSkills = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return skills;
    return skills.filter(
      (skill) =>
        skill.name.includes(normalized) ||
        skill.family.includes(normalized) ||
        skill.platforms.some((platform) =>
          platform.toLowerCase().includes(normalized),
        ),
    );
  }, [query]);

  return (
    <main
      className={`forge-app density-${density} quality-${quality}`}
      data-active-scene={view === "frontend" ? scene : undefined}
    >
      <header className="topbar">
        <button
          className="mobile-menu"
          type="button"
          aria-expanded={mobileMenu}
          aria-controls="forge-navigation"
          onClick={() => setMobileMenu((open) => !open)}
        >
          MENU
        </button>
        <div className="brand">
          <span className="brand-mark">AF</span>
          <span>
            <b>AI FORGE</b>
            <small>ABRAHAM_OS / CONTROL PLANE</small>
          </span>
        </div>
        <label className="command-search">
          <span className="sr-only">Buscar en el hub</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar proyecto, Skill, operador..."
          />
          <kbd>⌘ K</kbd>
        </label>
        <div className="system-flags" aria-label="Estado del sistema">
          <span className="flag flag-ok">LOCAL SAFE</span>
          <span className="flag flag-warn">GITHUB OFF</span>
        </div>
      </header>

      <div className="workspace">
        <nav
          id="forge-navigation"
          className={`rail ${mobileMenu ? "rail-open" : ""}`}
          aria-label="Ventanas de AI Forge"
        >
          <div className="rail-label">FACTORY LEVELS</div>
          {navItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={view === item.id ? "rail-item active" : "rail-item"}
              onClick={() => {
                setView(item.id);
                setMobileMenu(false);
              }}
            >
              <span className="rail-index">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
              <small>{item.meta}</small>
            </button>
          ))}
          <div className="rail-callout">
            <span>MASTER ROOT</span>
            <b>stack-hub-IAs</b>
            <p>La biblioteca sensible permanece fuera del deploy.</p>
          </div>
        </nav>

        <section
          className={view === "frontend" ? "canvas canvas-motion" : "canvas"}
          aria-live="polite"
        >
          {view === "command" && (
            <>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">SHIFT 01 / 05:05—09:00</span>
                  <h1>Construir la fábrica.<br />No otra wiki rota.</h1>
                </div>
                <div className="focus-orbit" aria-label="Prioridad actual">
                  <span>SHIP NOW</span>
                  <strong>AI FORGE</strong>
                  <small>72% ready</small>
                </div>
              </div>

              <div className="metric-grid">
                <Metric
                  label="Acción primaria"
                  value="CORE"
                  detail="Frontend, registro y backend D1 mínimo."
                  tone="forge"
                />
                <Metric
                  label="Riesgo crítico"
                  value="PRIVACY"
                  detail=".skills contiene datos personales: no publicar."
                  tone="risk"
                />
                <Metric
                  label="Git actual"
                  value="LOCAL"
                  detail="Rama aislada y commit verificado; sin GitHub."
                  tone="cyan"
                />
                <Metric
                  label="Puente MCP"
                  value="READY"
                  detail="Allowlist, límites y smoke test local."
                  tone="violet"
                />
              </div>

              <div className="command-grid">
                <article className="panel mission-panel">
                  <div className="panel-head">
                    <span>SECUENCIA ACTIVA</span>
                    <TruthBadge truth="verified" />
                  </div>
                  <ol className="mission-list">
                    <li className="done">
                      <span>01</span>
                      <div>
                        <b>Auditar master y privacidad</b>
                        <small>Rutas, Git, legacy y Skills identificados.</small>
                      </div>
                      <em>DONE</em>
                    </li>
                    <li className="done">
                      <span>02</span>
                      <div>
                        <b>Construir control plane</b>
                        <small>Shell, proyectos, operadores y verdad.</small>
                      </div>
                      <em>DONE</em>
                    </li>
                    <li className="done">
                      <span>03</span>
                      <div>
                        <b>Activar backend y MCP local</b>
                        <small>D1 remoto + bridge local con permisos.</small>
                      </div>
                      <em>DONE</em>
                    </li>
                    <li className="active">
                      <span>04</span>
                      <div>
                        <b>Conectar GitHub privado</b>
                        <small>Solo catálogo saneado y código revisado.</small>
                      </div>
                      <em>GATED</em>
                    </li>
                  </ol>
                </article>

                <article className="panel system-panel">
                  <div className="panel-head">
                    <span>FACTORY MAP</span>
                    <span className="live-dot">LIVE MODEL</span>
                  </div>
                  <div className="factory-map">
                    <div className="map-line line-a" />
                    <div className="map-line line-b" />
                    <div className="map-line line-c" />
                    <button type="button" className="map-node node-root">
                      ABRAHAM
                      <small>orchestrator</small>
                    </button>
                    <button type="button" className="map-node node-ui">
                      FRONTEND
                      <small>Sites</small>
                    </button>
                    <button type="button" className="map-node node-data">
                      CONTROL DB
                      <small>D1</small>
                    </button>
                    <button type="button" className="map-node node-local">
                      LOCAL MCP
                      <small>allowlist</small>
                    </button>
                    <button type="button" className="map-node node-git">
                      GITHUB
                      <small>disconnected</small>
                    </button>
                  </div>
                </article>
              </div>
            </>
          )}

          {view === "projects" && (
            <>
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">PROJECT CORKBOARD</span>
                  <h1>Todo proyecto tiene<br />dueño, fase y salida.</h1>
                </div>
                <TruthBadge truth="review" />
              </div>
              <div className="project-grid">
                {filteredProjects.map((project) => (
                  <article className="project-card" key={project.id}>
                    <div className="project-top">
                      <span>{project.lane}</span>
                      <TruthBadge truth={project.truth} />
                    </div>
                    <h2>{project.name}</h2>
                    <p>{project.state}</p>
                    <div className="progress">
                      <span style={{ width: `${project.score}%` }} />
                    </div>
                    <div className="project-score">
                      <b>{project.score}%</b>
                      <small>readiness</small>
                    </div>
                    <div className="next-action">
                      <span>NEXT PHYSICAL ACTION</span>
                      <b>{project.next}</b>
                    </div>
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {view === "operators" && (
            <>
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">OPERATOR SHELTER</span>
                  <h1>Un equipo visible.<br />Una misión cada vez.</h1>
                </div>
                <span className="section-note">Selecciona un habitante para abrir su dossier.</span>
              </div>
              <div className="shelter">
                <div className="operator-roster">
                  {operators.map((operator) => (
                    <button
                      key={operator.id}
                      type="button"
                      className={
                        operator.id === operatorId
                          ? `operator-cell active accent-${operator.accent}`
                          : `operator-cell accent-${operator.accent}`
                      }
                      onClick={() => setOperatorId(operator.id)}
                    >
                      <span className="operator-avatar">{operator.glyph}</span>
                      <span>
                        <b>{operator.name}</b>
                        <small>{operator.role}</small>
                      </span>
                      <em>{operator.status}</em>
                    </button>
                  ))}
                </div>
                <article className={`operator-dossier accent-${selectedOperator.accent}`}>
                  <div className="dossier-title">
                    <span className="operator-avatar large" aria-hidden="true">
                      {selectedOperator.glyph}
                    </span>
                    <div>
                      <span>DOSSIER / {selectedOperator.id.toUpperCase()}</span>
                      <h2>{selectedOperator.name}</h2>
                      <p>{selectedOperator.role} · {selectedOperator.mascot}</p>
                    </div>
                  </div>
                  <div className="dossier-grid">
                    <div>
                      <span>BEST FOR</span>
                      <p>{selectedOperator.best}</p>
                    </div>
                    <div>
                      <span>AVOID</span>
                      <p>{selectedOperator.avoid}</p>
                    </div>
                    <div>
                      <span>ROUTE</span>
                      <p className="mono">{selectedOperator.route}</p>
                    </div>
                    <div>
                      <span>RUNTIME</span>
                      <p>{selectedOperator.runtime}</p>
                    </div>
                    <div>
                      <span>MEMORY</span>
                      <p>{selectedOperator.memory}</p>
                    </div>
                    <div>
                      <span>PERMISSION</span>
                      <p>{selectedOperator.permission}</p>
                    </div>
                    <div>
                      <span>SKILL STATE</span>
                      <p>{selectedOperator.skillState}</p>
                    </div>
                  </div>
                  <div className="dossier-footer">
                    <TruthBadge
                      truth={
                        selectedOperator.status === "active"
                          ? "verified"
                          : selectedOperator.status === "offline"
                            ? "blocked"
                            : "review"
                      }
                    />
                    <span>
                      La mascota comunica presencia; nunca concede permisos, memoria ni
                      capacidad.
                    </span>
                  </div>
                </article>
              </div>
            </>
          )}

          {view === "skills" && (
            <>
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">UNIVERSAL SKILL REGISTRY</span>
                  <h1>Una Skill canónica.<br />Adaptadores, no copias.</h1>
                </div>
                <div className="skill-stats">
                  <span><b>01</b> frontend master</span>
                  <span><b>04</b> system Skills</span>
                  <span><b>1</b> cuarentena</span>
                </div>
              </div>
              <article className="skill-source-map" aria-label="Modelo de distribución de la Skill">
                <div>
                  <span>AUTHOR ONCE</span>
                  <b>.skills/frontend-hyper-boost</b>
                  <small>SKILL.md · references · scripts · assets</small>
                </div>
                <i>→</i>
                <div>
                  <span>PACKAGE</span>
                  <b>frontend-hyper-boost.skill</b>
                  <small>contenedor ZIP local, fuera de Git</small>
                </div>
                <i>→</i>
                <div>
                  <span>DISCOVER</span>
                  <b>.agents/skills adapter</b>
                  <small>sin duplicar conocimiento</small>
                </div>
              </article>
              <article className="panel table-panel">
                <div className="panel-head">
                  <span>REGISTRY / FILTERED</span>
                  <TruthBadge truth="local" />
                </div>
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Skill</th>
                        <th>Familia</th>
                        <th>Plataformas</th>
                        <th>Estado</th>
                        <th>Privacidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSkills.map((skill) => (
                        <tr key={skill.name}>
                          <td className="mono">{skill.name}</td>
                          <td>{skill.family}</td>
                          <td>
                            <div className="platform-list">
                              {skill.platforms.map((platform) => (
                                <span key={platform}>{platform}</span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <span className={`status status-${skill.state}`}>
                              {skill.state}
                            </span>
                          </td>
                          <td>
                            <span
                              className={
                                skill.privacy === "safe"
                                  ? "privacy-safe"
                                  : "privacy-risk"
                              }
                            >
                              {skill.privacy}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
              <div className="warning-strip">
                <b>QUARANTINE RULE</b>
                <span>
                  CV, identidad, asuntos legales, NSFW y secretos nunca se incluyen en
                  exports públicos ni en prompts globales.
                </span>
              </div>
            </>
          )}

          {view === "frontend" && (
            <>
              <div className="motion-atmosphere" aria-hidden="true">
                <span className="motion-orb orb-a" />
                <span className="motion-orb orb-b" />
                <div className="ascii-relief">
                  {`+ / \\ = # @ %\n\\ # AI FORGE /\n= HYPER BOOST =\n/ @ # % \\ +`}
                </div>
                <svg className="story-path" viewBox="0 0 800 520" role="presentation">
                  <path
                    pathLength={1}
                    d="M65 60 C 245 10, 215 220, 390 170 S 575 110, 535 290 S 690 390, 745 470"
                  />
                </svg>
              </div>

              <div className="section-heading motion-heading">
                <div>
                  <span className="eyebrow">FRONTEND LAB / QUALITY {quality.toUpperCase()}</span>
                  <h1>Una interfaz que cambia<br />sin perder al usuario.</h1>
                </div>
                <div className="motion-mode">
                  <span>ACTIVE SCENE</span>
                  <strong>{motionScenes.find((item) => item.id === scene)?.name}</strong>
                  <small>hover previews · focus previews · tap pins</small>
                </div>
              </div>

              <div className="scene-selector" aria-label="Escenas de interacción">
                {motionScenes.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    aria-pressed={scene === item.id}
                    onPointerEnter={() => setScene(item.id)}
                    onFocus={() => setScene(item.id)}
                    onClick={() => setScene(item.id)}
                  >
                    <span>{String(index + 1).padStart(2, "0")} / {item.kicker}</span>
                    <b>{item.name}</b>
                    <p>{item.detail}</p>
                    <small>{item.input}</small>
                    <em>{item.fallback}</em>
                  </button>
                ))}
              </div>

              <div className="lab-grid">
                <article className="panel pattern-panel">
                  <div className="panel-head">
                    <span>INTERACTION CONTRACT</span>
                    <TruthBadge truth="verified" />
                  </div>
                  <div className="pattern-contract">
                    <div><span>POINTER</span><b>Preview without trapping</b></div>
                    <div><span>KEYBOARD</span><b>Focus mirrors hover</b></div>
                    <div><span>TOUCH</span><b>Tap selects explicitly</b></div>
                    <div><span>TV</span><b>D-pad keeps targets visible</b></div>
                    <div><span>REDUCED</span><b>Static story remains complete</b></div>
                    <div><span>LOW POWER</span><b>Poster/CSS fallback first</b></div>
                  </div>
                </article>

                <article className="panel never-lose-panel">
                  <div className="panel-head">
                    <span>DO NOT LOSE THE PATH</span>
                    <span className="live-dot">12 GATES</span>
                  </div>
                  <ol>
                    <li><b>01</b><span>SCOPE + PRIVACY</span></li>
                    <li><b>02</b><span>SEMANTIC CALM CORE</span></li>
                    <li><b>03</b><span>MOTION EQUIVALENTS</span></li>
                    <li><b>04</b><span>PHONE · TABLET · TV</span></li>
                    <li><b>05</b><span>TEST · DIFF · PREVIEW</span></li>
                    <li><b>06</b><span>CHANGELOG + NEXT ACTION</span></li>
                  </ol>
                </article>
              </div>
            </>
          )}

          {view === "blueprint" && (
            <>
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">TUNED FORK / PRODUCT BLUEPRINT</span>
                  <h1>El encanto arriba.<br />El contrato técnico debajo.</h1>
                </div>
                <TruthBadge truth="review" />
              </div>

              <div className="blueprint-intro">
                <article>
                  <span>MASCOT</span>
                  <b>Presence shell</b>
                  <p>Avatar, humor, color y estado percibido.</p>
                </article>
                <i>≠</i>
                <article>
                  <span>AGENT</span>
                  <b>Accountable worker</b>
                  <p>Objetivo, runtime, modelo, herramientas y ciclo.</p>
                </article>
                <i>+</i>
                <article>
                  <span>SKILL</span>
                  <b>Reusable capability</b>
                  <p>Instrucciones, referencias, scripts y templates.</p>
                </article>
              </div>

              <div className="capability-grid">
                {capabilityLayers.map((layer, index) => (
                  <article className="capability-card" key={layer.name}>
                    <div>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <TruthBadge truth={layer.state as Truth} />
                    </div>
                    <h2>{layer.name}</h2>
                    <p><small>BENCHMARK</small>{layer.benchmark}</p>
                    <p><small>AI FORGE</small>{layer.forge}</p>
                  </article>
                ))}
              </div>
              <div className="warning-strip blueprint-rule">
                <b>TRUTH RULE</b>
                <span>
                  Ningún avatar, toggle o tarjeta bonita convierte una integración en
                  verificada. El estado requiere prueba observable.
                </span>
              </div>
            </>
          )}

          {view === "git" && (
            <>
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">GIT AUDITOR</span>
                  <h1>Cada IA deja una<br />huella revisable.</h1>
                </div>
                <TruthBadge truth="local" />
              </div>
              <div className="git-grid">
                <article className="panel">
                  <div className="panel-head">
                    <span>REPOSITORY STATUS</span>
                    <span className="flag flag-warn">NO REMOTE</span>
                  </div>
                  <dl className="repo-facts">
                    <div><dt>Branch</dt><dd>agent/ai-forge-control-plane</dd></div>
                    <div><dt>Tracked commits</dt><dd>3</dd></div>
                    <div><dt>Legacy</dt><dd>preserved</dd></div>
                    <div><dt>GitHub CLI</dt><dd>missing</dd></div>
                    <div><dt>Publish gate</dt><dd>blocked</dd></div>
                  </dl>
                </article>
                <article className="panel heatmap-panel">
                  <div className="panel-head">
                    <span>AUDIT HEATMAP / UNSYNCED PREVIEW</span>
                    <span>7 × 7</span>
                  </div>
                  <div className="heatmap" aria-label="Previsualización de actividad">
                    {heatmap.map((level, index) => (
                      <span key={index} data-level={level} />
                    ))}
                  </div>
                  <p>
                    El heatmap definitivo se generará con commits reales y eventos del
                    MCP, nunca con actividad inventada.
                  </p>
                </article>
              </div>
              <article className="panel change-contract">
                <div className="panel-head"><span>CHANGE CONTRACT</span></div>
                <div className="contract-flow">
                  <span>SCOPE</span><i>→</i><span>BRANCH</span><i>→</i>
                  <span>PATCH</span><i>→</i><span>TEST</span><i>→</i>
                  <span>REVIEW</span><i>→</i><span>COMMIT</span><i>→</i>
                  <span>SYNC</span>
                </div>
              </article>
              <article className="panel changelog-panel">
                <div className="panel-head">
                  <span>CHANGELOG / 2026-07-23</span>
                  <TruthBadge truth="local" />
                </div>
                <ul>
                  <li><b>ADDED</b><span>frontend-hyper-boost canonical Skill</span></li>
                  <li><b>MERGED</b><span>frontend + Google Stitch workflows</span></li>
                  <li><b>ADDED</b><span>Frontend Lab + tuned fork blueprint</span></li>
                  <li><b>PENDING</b><span>real Git/MCP event heatmap</span></li>
                </ul>
              </article>
            </>
          )}

          {view === "bridge" && (
            <>
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">ABRAHAM MCP BRIDGE</span>
                  <h1>Acceso al PC con<br />límites que se ven.</h1>
                </div>
                <TruthBadge truth="review" />
              </div>
              <div className="bridge-grid">
                <article className="panel architecture-panel">
                  <div className="panel-head"><span>CONTROL / DATA PLANE</span></div>
                  <div className="architecture-stack">
                    <div>
                      <span>01</span>
                      <b>Chatbots y CLIs</b>
                      <small>Codex · Claude · Gemini · Grok · Local</small>
                    </div>
                    <i>↓ MCP / JSON-RPC</i>
                    <div>
                      <span>02</span>
                      <b>Policy Gateway</b>
                      <small>identidad · permisos · presupuesto · logging</small>
                    </div>
                    <i>↓ allowlisted tools</i>
                    <div>
                      <span>03</span>
                      <b>Local Bridge</b>
                      <small>filesystem · Git · procesos aprobados · notifications</small>
                    </div>
                    <i>↓ sanitized events</i>
                    <div>
                      <span>04</span>
                      <b>AI Forge Backend</b>
                      <small>D1 ahora · Postgres cuando lo exija la escala</small>
                    </div>
                  </div>
                </article>
                <article className="panel permission-panel">
                  <div className="panel-head"><span>PERMISSION PROFILE / MVP</span></div>
                  <ul>
                    <li><b>read_projects</b><span>carpetas seleccionadas</span><em>ALLOW</em></li>
                    <li><b>write_project</b><span>rama y scope activos</span><em>ASK</em></li>
                    <li><b>git_commit</b><span>tras tests y diff</span><em>ASK</em></li>
                    <li><b>git_push</b><span>remoto privado validado</span><em>BLOCK</em></li>
                    <li><b>run_command</b><span>lista de comandos seguros</span><em>ASK</em></li>
                    <li><b>read_secrets</b><span>nunca por MCP general</span><em>DENY</em></li>
                  </ul>
                </article>
              </div>
            </>
          )}
        </section>

        <aside className="inspector">
          <div className="inspector-section">
            <span className="inspector-label">SHIFT STATUS</span>
            <div className="shift-score">
              <strong>72</strong>
              <span>/100<br />MVP readiness</span>
            </div>
          </div>
          <div className="inspector-section">
            <span className="inspector-label">TRUTH ENVELOPE</span>
            <div className="truth-list">
              <TruthBadge truth="verified" />
              <span>Filesystem inspected</span>
              <TruthBadge truth="local" />
              <span>Git has no remote</span>
              <TruthBadge truth="review" />
              <span>Backend migration</span>
              <TruthBadge truth="blocked" />
              <span>GitHub publish</span>
            </div>
          </div>
          <div className="inspector-section">
            <span className="inspector-label">VIEW MODE</span>
            <div className="segmented">
              <button
                type="button"
                aria-pressed={density === "focus"}
                onClick={() => setDensity("focus")}
              >
                Focus
              </button>
              <button
                type="button"
                aria-pressed={density === "dense"}
                onClick={() => setDensity("dense")}
              >
                Dense
              </button>
            </div>
          </div>
          <div className="inspector-section">
            <span className="inspector-label">MOTION QUALITY</span>
            <div className="segmented quality-control">
              {(["calm", "boost", "ultra"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={quality === mode}
                  onClick={() => setQuality(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p className="inspector-copy">
              Calm conserva la historia sin parallax. Ultra nunca sustituye el
              contenido semántico.
            </p>
          </div>
          <div className="inspector-section">
            <span className="inspector-label">NON-NEGOTIABLE</span>
            <p className="inspector-copy">
              GitHub recibe código y metadatos saneados. Secretos, rutas privadas,
              conversaciones y datos personales permanecen locales.
            </p>
          </div>
        </aside>
      </div>

      <footer className="dock">
        <span><b>CTRL+K</b> command palette</span>
        <span><b>MODE</b> {density}</span>
        <span><b>MOTION</b> {quality}</span>
        <span><b>BACKEND</b> D1 connected</span>
        <span><b>MCP</b> allowlist first</span>
        <span className="dock-time">MASTER / stack-hub-IAs</span>
      </footer>
    </main>
  );
}
