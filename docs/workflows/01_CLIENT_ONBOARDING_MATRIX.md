# Matriz de conexión por cliente

Verificada con documentación oficial el 2026-07-23.

## Regla

No se dice a cada chatbot “instala el repo”. Se configura el **host MCP**.
Ollama, DeepSeek y Z.ai pueden ser modelos dentro de un host; no son por sí
solos el lugar donde se instala el MCP.

| Cliente | Qué recibe ahora | Método |
|---|---|---|
| Codex Desktop/CLI | MCP local + repo + Skills | `config.toml` o conexiones |
| Claude Code | MCP local + repo + Skill | `claude mcp add`; scope local |
| Claude Desktop | MCP local + Skill | configuración Developer |
| Gemini CLI | MCP local + repo + Skill enlazada | `gemini mcp add` |
| VS Code + Copilot | MCP local + workspace | `.vscode/mcp.json` o user |
| Cursor Composer | MCP local + repo | `.cursor/mcp.json` o global |
| Antigravity | MCP local | detectar versión antes de elegir ruta |
| LM Studio | MCP local; modelo detrás | `mcp.json`; tools limitadas |
| Jules | GitHub + rama + `AGENTS.md` | hoy no admite MCP custom local |
| ChatGPT web | después: MCP HTTPS | app/conector remoto |
| Grok / connector | después: MCP HTTPS | custom connector autenticado |
| Manus | después: MCP HTTPS | Custom MCP Server remoto |
| Ollama | modelo detrás de un host | no recibe MCP directamente |
| DeepSeek | modelo/API detrás de host | no recibe MCP directamente |
| Z.ai en VS Code | modelo en extensión | MCP lo gestiona el cliente |
| Grok Builder | por confirmar | no improvisar configuración |

## Onboarding local seguro

```powershell
cd mcp\abraham-os-bridge
npm install
npm run build
npm test
cd ..\..

.\scripts\export-mcp-client-configs.ps1
.\scripts\mcp-doctor.ps1
```

Los ejemplos salen en `.ai-forge\client-configs\`, ignorado por Git. No se
copian automáticamente a configuraciones de usuario.

### Codex

```powershell
codex mcp add abraham-os --env ABRAHAM_MCP_POLICY="<policy>" -- node "<server>"
codex mcp list
```

### Claude Code

Empezar en scope local:

```powershell
claude mcp add --scope local abraham-os --env ABRAHAM_MCP_POLICY="<policy>" -- node "<server>"
claude mcp list
```

La Skill se importa aparte. Solo tras revisión se valora `--scope project`.

### Gemini CLI

```powershell
gemini mcp add --scope project abraham-os node "<server>"
gemini mcp list
```

La política se configura localmente. Skill y MCP son instalaciones distintas.

### VS Code, Cursor, LM Studio y Antigravity

- VS Code: `MCP: Add Server`; la raíz JSON es `servers`.
- Cursor: revisar el fragmento y colocarlo en `.cursor/mcp.json` o global.
- LM Studio: editar `mcp.json`, habilitar servidor y limitar tools.
- Antigravity: registrar primero versión/producto; sus rutas han cambiado.

## Clientes cloud

ChatGPT web, Grok y Manus no apuntan a `C:\...` ni `localhost`. La fase remota
requiere Streamable HTTP sobre HTTPS, autenticación, allowlist, rate limit,
auditoría, revocación y pruebas contra prompt injection.

## Fuentes oficiales

- [OpenAI Codex MCP](https://developers.openai.com/codex/codex-manual.md)
- [ChatGPT y MCP](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt-beta)
- [Claude Code MCP](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [Gemini CLI MCP](https://geminicli.com/docs/tools/mcp-server/)
- [VS Code MCP](https://code.visualstudio.com/docs/agent-customization/mcp-servers)
- [Cursor MCP](https://docs.cursor.com/context/model-context-protocol)
- [Jules y MCP](https://jules.google/docs/changelog/2026-02-02)
- [LM Studio MCP](https://lmstudio.ai/docs/app/mcp)
- [Ollama tool calling](https://docs.ollama.com/capabilities/tool-calling)
- [Manus Custom MCP](https://manus.im/docs/integrations/custom-mcp)
- [Grok connectors](https://docs.x.ai/grok/connectors)
- [DeepSeek API](https://api-docs.deepseek.com/)

