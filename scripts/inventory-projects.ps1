param(
    [string]$ProjectsRoot = "C:\dev\02_PROJECTS",
    [string]$OutputPath = "C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs\.ai-forge\audit\project-inventory.json"
)

$root = (Resolve-Path -LiteralPath $ProjectsRoot).Path
$outputDirectory = Split-Path -Parent $OutputPath
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null

$items = foreach ($directory in Get-ChildItem -LiteralPath $root -Force -Directory) {
    if ($directory.Name -in @(".git", ".agents", ".codex")) {
        continue
    }

    $gitDirectory = Join-Path $directory.FullName ".git"
    $isGit = Test-Path -LiteralPath $gitDirectory
    $branch = $null
    $remote = $null
    $dirtyCount = $null

    if ($isGit) {
        $branch = (& git -C $directory.FullName branch --show-current 2>$null) -join ""
        $remoteLines = (& git -C $directory.FullName remote -v 2>$null)
        $remote = if ($remoteLines) { ($remoteLines | Select-Object -First 1) -join "" } else { $null }
        $dirtyLines = @(& git -C $directory.FullName status --short 2>$null)
        $dirtyCount = $dirtyLines.Count
    }

    $manifestNames = @(
        "package.json",
        "pyproject.toml",
        "requirements.txt",
        "Cargo.toml",
        "go.mod",
        "Dockerfile",
        "netlify.toml",
        "vercel.json",
        ".openai\hosting.json"
    )
    $manifests = $manifestNames | Where-Object {
        Test-Path -LiteralPath (Join-Path $directory.FullName $_)
    }

    $privacy = if ($directory.Name -match "private|privado|thisvid|nsfw") {
        "private_review"
    } else {
        "unclassified"
    }

    [pscustomobject]@{
        id = ($directory.Name.ToLowerInvariant() -replace "[^a-z0-9]+", "-").Trim("-")
        name = $directory.Name
        path = $directory.FullName
        last_modified = $directory.LastWriteTime.ToString("o")
        git = [pscustomobject]@{
            enabled = $isGit
            branch = $branch
            remote = $remote
            dirty_files = $dirtyCount
        }
        manifests = $manifests
        privacy = $privacy
        verification_status = "inspected"
    }
}

$result = [pscustomobject]@{
    schema_version = 1
    generated_at = (Get-Date).ToString("o")
    projects_root = $root
    count = @($items).Count
    projects = @($items | Sort-Object last_modified -Descending)
}

$result | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $OutputPath -Encoding utf8
$result | ConvertTo-Json -Depth 6
