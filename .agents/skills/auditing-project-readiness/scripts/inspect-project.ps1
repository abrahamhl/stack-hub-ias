param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectPath
)

$resolved = (Resolve-Path -LiteralPath $ProjectPath).Path
$status = $null
$remotes = $null
$branch = $null

if (Test-Path -LiteralPath (Join-Path $resolved ".git")) {
    $status = (& git -C $resolved status --short --branch 2>&1) -join "`n"
    $remotes = (& git -C $resolved remote -v 2>&1) -join "`n"
    $branch = (& git -C $resolved branch --show-current 2>&1) -join ""
}

$manifests = @(
    "package.json",
    "pyproject.toml",
    "Cargo.toml",
    "go.mod",
    ".openai/hosting.json",
    "netlify.toml",
    "vercel.json",
    "Dockerfile"
) | Where-Object { Test-Path -LiteralPath (Join-Path $resolved $_) }

[pscustomobject]@{
    path = $resolved
    git = [pscustomobject]@{
        branch = $branch
        status = $status
        remotes = $remotes
    }
    manifests = $manifests
    has_agents = Test-Path -LiteralPath (Join-Path $resolved "AGENTS.md")
    inspected_at = (Get-Date).ToString("o")
} | ConvertTo-Json -Depth 5
