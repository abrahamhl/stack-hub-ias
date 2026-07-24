param(
    [Parameter(Mandatory = $false)]
    [string]$OutputDirectory
)

$skillRoot = Split-Path -Parent $PSScriptRoot
$skillsRoot = Split-Path -Parent $skillRoot
if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $skillsRoot "_packages"
}

$resolvedSkillRoot = (Resolve-Path -LiteralPath $skillRoot).Path
$resolvedSkillsRoot = (Resolve-Path -LiteralPath $skillsRoot).Path
if (-not $resolvedSkillRoot.StartsWith($resolvedSkillsRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Skill root is outside the expected .skills directory."
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
$temporaryZip = Join-Path $OutputDirectory "frontend-hyper-boost.zip"
$packagePath = Join-Path $OutputDirectory "frontend-hyper-boost.skill"

if (Test-Path -LiteralPath $temporaryZip) {
    Remove-Item -LiteralPath $temporaryZip -Force
}
if (Test-Path -LiteralPath $packagePath) {
    Remove-Item -LiteralPath $packagePath -Force
}

Push-Location $skillsRoot
try {
    Compress-Archive -Path "frontend-hyper-boost" -DestinationPath $temporaryZip -CompressionLevel Optimal
} finally {
    Pop-Location
}

Move-Item -LiteralPath $temporaryZip -Destination $packagePath
$hash = (Get-FileHash -LiteralPath $packagePath -Algorithm SHA256).Hash

[ordered]@{
    package = (Resolve-Path -LiteralPath $packagePath).Path
    format = "ZIP container with .skill extension"
    sha256 = $hash
} | ConvertTo-Json
