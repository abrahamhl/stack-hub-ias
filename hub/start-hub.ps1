# AI Forge Vault — arranque local correcto
# Uso (desde la raíz del repo):  .\hub\start-hub.ps1
#
# NO abras index.html con doble clic (file://).
# Esto NO es un Pull Request ni publica el repo (el nodo es PRIVATE).
# Ver hub/SECURITY.md

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path (Join-Path $root "hub\index.html"))) {
  $root = $PSScriptRoot
}
Set-Location $root
Write-Host ""
Write-Host " AI FORGE VAULT (local · no publica secretos)" -ForegroundColor Cyan
Write-Host " Raiz: $root" -ForegroundColor DarkGray
Write-Host " URL:  http://localhost:4180/hub/" -ForegroundColor Green
Write-Host " Repo: PRIVATE en GitHub (no abrir visibility Public)" -ForegroundColor DarkGray
Write-Host " Sin PAT: live-snapshot.json · Con PAT: API privada" -ForegroundColor DarkGray
Write-Host " Ctrl+C para parar." -ForegroundColor DarkGray
Write-Host ""

# refresh snapshot if gh available
if (Get-Command gh -ErrorAction SilentlyContinue) {
  try {
    & (Join-Path $PSScriptRoot "refresh-snapshot.ps1") 2>$null
  } catch { }
}

npx --yes serve . -l 4180
