[CmdletBinding()]
param(
    [ValidateSet("core", "research", "deep-code", "browser", "cyber", "observability", "gateway")]
    [string]$Profile = "core",
    [switch]$InstallApproved,
    [switch]$InstallBrowserDeps,
    [switch]$GenerateConfigs
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$HarnessRoot = Join-Path $env:LOCALAPPDATA "AbrahamHarness"
$BinRoot = Join-Path $HarnessRoot "bin"
$Registry = Join-Path $RepoRoot "hub\harness-registry.json"

function Write-Step([string]$Message) {
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Has-Command([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Command-Location([string]$Name) {
    $cmd = Get-Command $Name -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    return ""
}

function Invoke-Checked([string]$Command, [string[]]$Arguments) {
    Write-Host ("> " + $Command + " " + ($Arguments -join " ")) -ForegroundColor DarkGray
    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed ($LASTEXITCODE): $Command $($Arguments -join ' ')"
    }
}

function Require-Pnpm {
    if (Has-Command "pnpm") { return }
    if (-not $InstallApproved) {
        throw "pnpm is not available. Re-run with -InstallApproved to allow Corepack activation, or install pnpm yourself. npm/npx are forbidden."
    }
    if (-not (Has-Command "corepack")) {
        throw "Neither pnpm nor corepack is available. Install a supported Node.js/Corepack runtime first. Do not use npm/npx."
    }
    Invoke-Checked "corepack" @("enable")
    Invoke-Checked "corepack" @("prepare", "pnpm@10.23.0", "--activate")
    if (-not (Has-Command "pnpm")) { throw "Corepack ran but pnpm is still not resolvable." }
}

function Require-Uv {
    if (-not (Has-Command "uv")) {
        throw "uv is required for the selected Python-backed profile. Install Astral uv, then rerun. The bootstrap does not curl|sh third-party installers."
    }
}

function Install-CodebaseMemory {
    if (Has-Command "codebase-memory-mcp") {
        Write-Host "codebase-memory-mcp already on PATH."
        return
    }

    $localExe = Join-Path $BinRoot "codebase-memory-mcp.exe"
    if (Test-Path -LiteralPath $localExe -PathType Leaf) {
        Write-Host "codebase-memory-mcp already installed at $localExe"
        return
    }

    if (-not $InstallApproved) {
        Write-Warning "codebase-memory-mcp missing (expected PATH or $localExe)."
        return
    }

    Write-Step "Install codebase-memory-mcp v0.10.8 with release checksum verification"
    New-Item -ItemType Directory -Force -Path $BinRoot | Out-Null
    $tmp = Join-Path ([System.IO.Path]::GetTempPath()) ("codebase-memory-" + [guid]::NewGuid().ToString("N"))
    New-Item -ItemType Directory -Force -Path $tmp | Out-Null
    try {
        $base = "https://github.com/DeusData/codebase-memory-mcp/releases/download/v0.10.8"
        $asset = "codebase-memory-mcp-windows-amd64.zip"
        $zip = Join-Path $tmp $asset
        $checksums = Join-Path $tmp "checksums.txt"
        Invoke-WebRequest -Uri "$base/$asset" -OutFile $zip -UseBasicParsing
        Invoke-WebRequest -Uri "$base/checksums.txt" -OutFile $checksums -UseBasicParsing
        $line = Get-Content -LiteralPath $checksums | Where-Object { $_ -match [regex]::Escape($asset) } | Select-Object -First 1
        if (-not $line) { throw "Release checksum entry for $asset was not found; refusing install." }
        $expected = (($line -split '\s+')[0]).ToLowerInvariant()
        $actual = ((Get-FileHash -LiteralPath $zip -Algorithm SHA256).Hash).ToLowerInvariant()
        if ($expected -ne $actual) { throw "SHA256 mismatch for $asset; refusing install." }
        $extract = Join-Path $tmp "extract"
        Expand-Archive -LiteralPath $zip -DestinationPath $extract -Force
        $exe = Get-ChildItem -LiteralPath $extract -Recurse -Filter "codebase-memory-mcp.exe" | Select-Object -First 1
        if (-not $exe) { throw "codebase-memory-mcp.exe not found in verified archive." }
        Copy-Item -LiteralPath $exe.FullName -Destination $localExe -Force
        Write-Host "Installed: $localExe"
    }
    finally {
        Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
    }
}

function Install-ContextMode {
    if (Has-Command "context-mode") {
        Write-Host "context-mode already on PATH."
        return
    }
    if (-not $InstallApproved) {
        Write-Warning "context-mode missing. Approved pin: 1.0.169."
        return
    }
    Require-Pnpm
    Write-Step "Install Context Mode 1.0.169 using pnpm"
    Invoke-Checked "pnpm" @("add", "--global", "context-mode@1.0.169")
}

function Install-Graphify {
    if (Has-Command "graphify") {
        Write-Host "graphify already on PATH."
        return
    }
    if (-not $InstallApproved) {
        Write-Warning "graphify missing. Approved pin: graphifyy[mcp]==0.9.47."
        return
    }
    Require-Uv
    Write-Step "Install Graphify 0.9.47 using uv"
    Invoke-Checked "uv" @("tool", "install", "--force", "graphifyy[mcp]==0.9.47")
}

function Install-Scrapling {
    if (Has-Command "scrapling-mcp") {
        Write-Host "scrapling-mcp already on PATH."
    }
    elseif ($InstallApproved) {
        Require-Uv
        Write-Step "Install Scrapling MCP 0.4.15 using uv"
        Invoke-Checked "uv" @("tool", "install", "--force", "scrapling[ai]==0.4.15")
    }
    else {
        Write-Warning "scrapling-mcp missing. Approved pin: scrapling[ai]==0.4.15."
    }

    if ($InstallApproved -and $InstallBrowserDeps) {
        if (-not (Has-Command "scrapling")) { throw "scrapling CLI not found after install." }
        Write-Step "Install Scrapling browser dependencies (explicitly requested)"
        Invoke-Checked "scrapling" @("install")
    }
}

function Install-BrowserUse {
    if (Has-Command "browser-use") {
        Write-Host "browser-use already on PATH."
        return
    }
    if (-not $InstallApproved) {
        Write-Warning "browser-use missing. Approved catalog pin: 0.13.10."
        return
    }
    Require-Uv
    Write-Step "Install Browser Use 0.13.10 using uv"
    Invoke-Checked "uv" @("tool", "install", "--force", "browser-use[cli]==0.13.10")
}

function Check-CyberTooling {
    Require-Pnpm
    if ($InstallApproved) {
        Write-Step "Verify Promptfoo pinned runner"
        Invoke-Checked "pnpm" @("dlx", "promptfoo@0.122.2", "--version")
    }
    if (Has-Command "docker") {
        Write-Host "Docker available. Approved scanner images: aquasec/trivy:0.74.0 and ghcr.io/gitleaks/gitleaks:v8.30.1"
    }
    else {
        Write-Warning "Docker missing: Trivy/Gitleaks container gates remain unavailable until Docker is installed."
    }
}

Write-Step "Harness truth check"
if (-not (Test-Path -LiteralPath $Registry -PathType Leaf)) { throw "Missing registry: $Registry" }
$registryJson = Get-Content -LiteralPath $Registry -Raw | ConvertFrom-Json
Write-Host "Registry schema: $($registryJson.schema_version) | updated: $($registryJson.updated)"
Write-Host "Profile: $Profile | install approved: $InstallApproved"

if (-not (Has-Command "node")) { throw "Node.js is required by the core bridge/context layer." }
Require-Pnpm

Install-ContextMode
Install-CodebaseMemory

switch ($Profile) {
    "research" { Install-Scrapling }
    "deep-code" { Install-Graphify }
    "browser" { Install-BrowserUse }
    "cyber" {
        Install-Graphify
        Check-CyberTooling
    }
    "observability" {
        Write-Host "Observability services are catalogued but intentionally not auto-started. Use pinned Docker/OTel configs after selecting a destination and retention policy."
    }
    "gateway" {
        Write-Host "IBM ContextForge 1.0.9 is the approved gateway candidate, but gateway deployment is intentionally isolated and not auto-started by this bootstrap."
    }
}

if ($GenerateConfigs) {
    Write-Step "Generate disposable client configs"
    $exporter = Join-Path $PSScriptRoot "export-harness-client-configs.ps1"
    if (-not (Test-Path -LiteralPath $exporter -PathType Leaf)) { throw "Missing exporter: $exporter" }
    & $exporter -Profile $Profile
}

Write-Step "Doctor summary"
$checks = @(
    [pscustomobject]@{ Component = "node"; Ready = (Has-Command "node"); Location = (Command-Location "node") },
    [pscustomobject]@{ Component = "pnpm"; Ready = (Has-Command "pnpm"); Location = (Command-Location "pnpm") },
    [pscustomobject]@{ Component = "context-mode"; Ready = (Has-Command "context-mode"); Location = (Command-Location "context-mode") },
    [pscustomobject]@{ Component = "codebase-memory-mcp"; Ready = ((Has-Command "codebase-memory-mcp") -or (Test-Path -LiteralPath (Join-Path $BinRoot "codebase-memory-mcp.exe"))); Location = $(if (Has-Command "codebase-memory-mcp") { Command-Location "codebase-memory-mcp" } else { Join-Path $BinRoot "codebase-memory-mcp.exe" }) },
    [pscustomobject]@{ Component = "uv"; Ready = (Has-Command "uv"); Location = (Command-Location "uv") },
    [pscustomobject]@{ Component = "scrapling-mcp"; Ready = (Has-Command "scrapling-mcp"); Location = (Command-Location "scrapling-mcp") },
    [pscustomobject]@{ Component = "graphify"; Ready = (Has-Command "graphify"); Location = (Command-Location "graphify") },
    [pscustomobject]@{ Component = "docker"; Ready = (Has-Command "docker"); Location = (Command-Location "docker") }
)
$checks | Format-Table -AutoSize

Write-Host "`nNo npm/npx commands were used. Canonical pins and policy live in hub/harness-registry.json." -ForegroundColor Green
Write-Host "Machine activation is only proven after the target MCP client starts the selected servers and evidence is recorded." -ForegroundColor Yellow
