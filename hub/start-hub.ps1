# AI Forge Vault — arranque local correcto
# Uso: clic derecho → Ejecutar con PowerShell, o:
#   cd C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs\hub
#   .\start-hub.ps1
#
# NO abras index.html con doble clic (file://). El navegador bloquea fetch
# de JSON y GitHub privado sin token → todo sale en error.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path (Join-Path $root "hub\index.html"))) {
  $root = $PSScriptRoot
}
Set-Location $root
Write-Host ""
Write-Host " AI FORGE VAULT" -ForegroundColor Cyan
Write-Host " Sirviendo desde: $root" -ForegroundColor DarkGray
Write-Host " URL: http://localhost:4180/hub/" -ForegroundColor Green
Write-Host ""
Write-Host " GitHub privado: kinkydisorder/stack-hub-ias" -ForegroundColor DarkGray
Write-Host " Sin PAT: usa hub/live-snapshot.json (local)." -ForegroundColor DarkGray
Write-Host " Con PAT (Config en la web): datos en vivo del privado." -ForegroundColor DarkGray
Write-Host " Ctrl+C para parar." -ForegroundColor DarkGray
Write-Host ""

# refresh snapshot if gh available
if (Get-Command gh -ErrorAction SilentlyContinue) {
  try {
    & (Join-Path $PSScriptRoot "refresh-snapshot.ps1") 2>$null
  } catch { }
}

npx --yes serve . -l 4180
