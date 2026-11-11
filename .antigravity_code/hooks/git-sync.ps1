# Antigravity Hyper-Boost Auto-Sync Hook (.antigravity_code/hooks/git-sync.ps1)
param(
  [string]$CommitMessage = "feat(antigravity): auto-sync hub state & skills"
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path (Join-Path $scriptDir "..\..")
Set-Location $root

Write-Host "[Antigravity Sync] Refrescando snapshot del Hub..." -ForegroundColor Cyan
try {
  if (Test-Path "hub/refresh-snapshot.ps1") {
    & powershell -ExecutionPolicy Bypass -File "hub/refresh-snapshot.ps1"
  }
} catch {
  Write-Host "[Antigravity Sync] Warning en refresh-snapshot: $_" -ForegroundColor Yellow
}

Write-Host "[Antigravity Sync] Verificando cambios git..." -ForegroundColor Cyan
$status = git status --porcelain
if ($status) {
  Write-Host "[Antigravity Sync] Cambios detectados. Staging & Committing..." -ForegroundColor Green
  git add .
  git commit -m $CommitMessage
  $currentBranch = (git branch --show-current).Trim()
  Write-Host "[Antigravity Sync] Pushing a origin/$currentBranch..." -ForegroundColor Green
  git push origin $currentBranch
  Write-Host "[Antigravity Sync] Sincronización exitosa con GitHub!" -ForegroundColor Green
} else {
  Write-Host "[Antigravity Sync] No hay cambios pendientes para sincronizar." -ForegroundColor Gray
}
