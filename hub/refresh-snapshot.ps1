# Refresca hub/live-snapshot.json desde el repo privado (requiere: gh auth login)
$ErrorActionPreference = "Stop"
$hub = $PSScriptRoot
$root = Split-Path -Parent $hub
Set-Location $root

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Host "gh no instalado — snapshot no actualizado" -ForegroundColor Yellow
  exit 0
}

$since = (Get-Date).AddDays(-90).ToString("yyyy-MM-ddT00:00:00Z")
# Prefer work branch if present (hub development), else default
$branch = "feat/hub-v2"
try {
  gh api "repos/kinkydisorder/stack-hub-ias/branches/$branch" | Out-Null
} catch {
  $branch = "hyper-boost"
}
$commits = gh api "repos/kinkydisorder/stack-hub-ias/commits?per_page=100&sha=$branch&since=$since" | ConvertFrom-Json
$branches = gh api "repos/kinkydisorder/stack-hub-ias/branches?per_page=50" | ConvertFrom-Json
$issues = @()
try {
  $issues = gh api "repos/kinkydisorder/stack-hub-ias/issues?state=open&per_page=30" | ConvertFrom-Json
  $issues = @($issues | Where-Object { -not $_.pull_request })
} catch { $issues = @() }

$snap = [ordered]@{
  schema_version = 1
  source = "gh-cli snapshot"
  repo = "kinkydisorder/stack-hub-ias"
  private = $true
  generated_at = (Get-Date).ToUniversalTime().ToString("o")
  verification_status = "verified"
  note = "Snapshot local para el hub sin PAT en el navegador."
  commits = @($commits | ForEach-Object {
    [ordered]@{
      sha = $_.sha
      html_url = $_.html_url
      message = $_.commit.message
      author = if ($_.commit.author.name) { $_.commit.author.name } else { $_.author.login }
      date = $_.commit.author.date
      login = $_.author.login
    }
  })
  branches = @($branches | ForEach-Object { @{ name = $_.name } })
  issues = @($issues | ForEach-Object {
    [ordered]@{
      number = $_.number
      title = $_.title
      html_url = $_.html_url
      updated_at = $_.updated_at
      labels = @($_.labels | ForEach-Object { $_.name })
    }
  })
}

$out = Join-Path $hub "live-snapshot.json"
($snap | ConvertTo-Json -Depth 8) + "`n" | Set-Content -Path $out -Encoding utf8
Write-Host "OK snapshot → $out ($($snap.commits.Count) commits)" -ForegroundColor Green
