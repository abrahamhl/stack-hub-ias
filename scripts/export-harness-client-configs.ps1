[CmdletBinding()]
param(
    [ValidateSet("core", "research", "deep-code", "browser", "cyber", "observability", "gateway")]
    [string]$Profile = "core",
    [string]$BridgeRoot = (Join-Path $PSScriptRoot "..\mcp\abraham-os-bridge"),
    [string]$OutputRoot = (Join-Path $PSScriptRoot "..\.ai-forge\client-configs\harness")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$bridge = [System.IO.Path]::GetFullPath($BridgeRoot)
$output = [System.IO.Path]::GetFullPath($OutputRoot)
$server = Join-Path $bridge "dist\index.js"
$policy = Join-Path $bridge "config\policy.local.json"
$localCodebaseMemory = Join-Path $env:LOCALAPPDATA "AbrahamHarness\bin\codebase-memory-mcp.exe"

if (-not (Test-Path -LiteralPath $server -PathType Leaf)) {
    throw "Missing Abraham OS bridge build: $server. Build with pnpm in mcp\abraham-os-bridge."
}
if (-not (Test-Path -LiteralPath $policy -PathType Leaf)) {
    throw "Missing local bridge policy: $policy. Copy/review config\policy.example.json first."
}

function Resolve-Executable([string]$Name, [string]$Fallback = "") {
    $cmd = Get-Command $Name -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    if ($Fallback -and (Test-Path -LiteralPath $Fallback -PathType Leaf)) { return $Fallback }
    return $Name
}

function Stdio([string]$Command, [string[]]$Arguments = @(), [hashtable]$Env = @{}) {
    return [ordered]@{
        command = $Command
        args = @($Arguments)
        env = [ordered]@{} + $Env
    }
}

$servers = [ordered]@{}
$servers["abraham-os"] = Stdio "node" @($server) @{ ABRAHAM_MCP_POLICY = $policy }
$servers["context-mode"] = Stdio (Resolve-Executable "context-mode")
$servers["codebase-memory-mcp"] = Stdio (Resolve-Executable "codebase-memory-mcp" $localCodebaseMemory)

switch ($Profile) {
    "research" {
        $servers["scrapling"] = Stdio (Resolve-Executable "scrapling-mcp")
    }
    "deep-code" {
        $servers["graphify"] = Stdio (Resolve-Executable "graphify") @("serve")
    }
    "browser" {
        $servers["browser-use"] = Stdio (Resolve-Executable "browser-use") @("--mcp")
    }
    "cyber" {
        $servers["graphify"] = Stdio (Resolve-Executable "graphify") @("serve")
    }
    "observability" {
        Write-Warning "Observability services are not MCP client entries; this export keeps only the core MCP servers."
    }
    "gateway" {
        Write-Warning "ContextForge is intentionally not embedded here. Connect the client to an authenticated gateway endpoint after isolated deployment."
    }
}

New-Item -ItemType Directory -Force -Path $output | Out-Null

[ordered]@{ mcpServers = $servers } |
    ConvertTo-Json -Depth 12 |
    Set-Content -LiteralPath (Join-Path $output "$Profile-claude-cursor-lmstudio.json") -Encoding utf8

$vscodeServers = [ordered]@{}
foreach ($name in $servers.Keys) {
    $s = $servers[$name]
    $vscodeServers[$name] = [ordered]@{
        type = "stdio"
        command = $s.command
        args = @($s.args)
        env = $s.env
    }
}
[ordered]@{ servers = $vscodeServers } |
    ConvertTo-Json -Depth 12 |
    Set-Content -LiteralPath (Join-Path $output "$Profile-vscode-mcp.json") -Encoding utf8

$geminiServers = [ordered]@{}
foreach ($name in $servers.Keys) {
    $s = $servers[$name]
    $geminiServers[$name] = [ordered]@{
        command = $s.command
        args = @($s.args)
        env = $s.env
        trust = $false
    }
}
[ordered]@{ mcpServers = $geminiServers } |
    ConvertTo-Json -Depth 12 |
    Set-Content -LiteralPath (Join-Path $output "$Profile-gemini-settings.json") -Encoding utf8

$toml = New-Object System.Collections.Generic.List[string]
foreach ($name in $servers.Keys) {
    $s = $servers[$name]
    $tomlName = $name.Replace("-", "_")
    $cmd = ([string]$s.command).Replace("\", "\\").Replace('"', '\"')
    $argsList = @($s.args | ForEach-Object { '"' + ([string]$_).Replace("\", "\\").Replace('"', '\"') + '"' }) -join ", "
    $toml.Add("[mcp_servers.$tomlName]")
    $toml.Add("command = `"$cmd`"")
    $toml.Add("args = [$argsList]")
    $toml.Add("startup_timeout_sec = 20")
    if ($s.env.Count -gt 0) {
        $toml.Add("")
        $toml.Add("[mcp_servers.$tomlName.env]")
        foreach ($key in $s.env.Keys) {
            $value = ([string]$s.env[$key]).Replace("\", "\\").Replace('"', '\"')
            $toml.Add("$key = `"$value`"")
        }
    }
    $toml.Add("")
}
$toml -join "`n" |
    Set-Content -LiteralPath (Join-Path $output "$Profile-codex-config.toml") -Encoding utf8

$manifest = [ordered]@{
    generated_at = (Get-Date).ToUniversalTime().ToString("o")
    profile = $Profile
    server_names = @($servers.Keys)
    output_root = $output
    disposable = $true
    note = "Generated local configs. Do not commit machine-specific paths or secrets. Restart the target client and verify MCP handshakes before claiming activation."
}
$manifest | ConvertTo-Json -Depth 8 |
    Set-Content -LiteralPath (Join-Path $output "$Profile-manifest.json") -Encoding utf8

Write-Host "Generated harness profile '$Profile' in: $output" -ForegroundColor Green
Write-Host "No global client configuration was modified." -ForegroundColor Yellow
