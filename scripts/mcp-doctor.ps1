param(
    [string]$BridgeRoot = (Join-Path $PSScriptRoot "..\mcp\abraham-os-bridge")
)

$ErrorActionPreference = "Stop"
$bridge = [System.IO.Path]::GetFullPath($BridgeRoot)
$server = Join-Path $bridge "dist\index.js"
$policy = Join-Path $bridge "config\policy.local.json"
$package = Join-Path $bridge "package.json"

$checks = @(
    [pscustomobject]@{ Check = "node"; Ok = [bool](Get-Command node -ErrorAction SilentlyContinue); Path = "PATH" },
    [pscustomobject]@{ Check = "package"; Ok = Test-Path -LiteralPath $package -PathType Leaf; Path = $package },
    [pscustomobject]@{ Check = "server-build"; Ok = Test-Path -LiteralPath $server -PathType Leaf; Path = $server },
    [pscustomobject]@{ Check = "local-policy"; Ok = Test-Path -LiteralPath $policy -PathType Leaf; Path = $policy }
)

$checks | Format-Table -AutoSize
if ($checks.Ok -contains $false) {
    throw "MCP doctor: faltan requisitos. No conectes clientes todavía."
}

Push-Location $bridge
try {
    npm test
    if ($LASTEXITCODE -ne 0) {
        throw "Los tests del bridge fallaron."
    }
}
finally {
    Pop-Location
}

Write-Host "MCP doctor: OK. Ninguna configuración de cliente fue modificada."

