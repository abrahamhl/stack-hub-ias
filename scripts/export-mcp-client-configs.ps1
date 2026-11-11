param(
    [string]$BridgeRoot = (Join-Path $PSScriptRoot "..\mcp\abraham-os-bridge"),
    [string]$OutputRoot = (Join-Path $PSScriptRoot "..\.ai-forge\client-configs")
)

$ErrorActionPreference = "Stop"
$bridge = [System.IO.Path]::GetFullPath($BridgeRoot)
$output = [System.IO.Path]::GetFullPath($OutputRoot)
$server = Join-Path $bridge "dist\index.js"
$policy = Join-Path $bridge "config\policy.local.json"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js no está disponible en PATH."
}
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    throw "pnpm no está disponible en PATH. npm/npx/Yarn están prohibidos por la política del nodo."
}
if (-not (Test-Path -LiteralPath $server -PathType Leaf)) {
    throw "Falta $server. Ejecuta pnpm run build en mcp\abraham-os-bridge."
}
if (-not (Test-Path -LiteralPath $policy -PathType Leaf)) {
    throw "Falta policy.local.json. Copia y revisa config\policy.example.json."
}

New-Item -ItemType Directory -Force -Path $output | Out-Null
$stdio = [ordered]@{
    command = "node"
    args = @($server)
    env = [ordered]@{ ABRAHAM_MCP_POLICY = $policy }
}

[ordered]@{ mcpServers = [ordered]@{ "abraham-os" = $stdio } } |
    ConvertTo-Json -Depth 8 |
    Set-Content -LiteralPath (Join-Path $output "claude-cursor-lmstudio.json") -Encoding utf8

[ordered]@{
    servers = [ordered]@{
        "abraham-os" = [ordered]@{
            type = "stdio"
            command = "node"
            args = @($server)
            env = [ordered]@{ ABRAHAM_MCP_POLICY = $policy }
        }
    }
} | ConvertTo-Json -Depth 8 |
    Set-Content -LiteralPath (Join-Path $output "vscode-mcp.json") -Encoding utf8

$allowedTools = @(
    "list_roots", "list_directory", "read_project_file", "git_status",
    "search_project_text", "write_audit_note"
)
[ordered]@{
    mcp = [ordered]@{ allowed = @("abraham-os") }
    mcpServers = [ordered]@{
        "abraham-os" = [ordered]@{
            command = "node"
            args = @($server)
            env = [ordered]@{ ABRAHAM_MCP_POLICY = $policy }
            trust = $false
            includeTools = $allowedTools
        }
    }
} | ConvertTo-Json -Depth 8 |
    Set-Content -LiteralPath (Join-Path $output "gemini-settings.json") -Encoding utf8

$serverToml = $server.Replace("\", "\\").Replace('"', '\"')
$policyToml = $policy.Replace("\", "\\").Replace('"', '\"')
$toml = @"
[mcp_servers.abraham_os]
command = "node"
args = ["$serverToml"]
startup_timeout_sec = 10

[mcp_servers.abraham_os.env]
ABRAHAM_MCP_POLICY = "$policyToml"
"@
Set-Content -LiteralPath (Join-Path $output "codex-config.toml") -Value $toml -Encoding utf8

[ordered]@{
    generatedAt = (Get-Date).ToUniversalTime().ToString("o")
    bridge = $bridge
    files = @(
        "codex-config.toml", "claude-cursor-lmstudio.json",
        "gemini-settings.json", "vscode-mcp.json"
    )
    note = "Legacy abraham-os-only examples. For profile-routed harness configs use scripts/export-harness-client-configs.ps1."
} | ConvertTo-Json -Depth 5 |
    Set-Content -LiteralPath (Join-Path $output "manifest.json") -Encoding utf8

Write-Host "Configuraciones legacy generadas en: $output"
Write-Host "No se ha modificado ninguna configuración global. Usa export-harness-client-configs.ps1 para el harness completo."
