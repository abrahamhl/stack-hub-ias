param(
    [string]$BridgeRoot = "C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs\mcp\abraham-os-bridge"
)

$server = Join-Path $BridgeRoot "dist\index.js"
$policy = Join-Path $BridgeRoot "config\policy.local.json"

if (-not (Test-Path -LiteralPath $server)) {
    throw "Build the bridge first: npm run build"
}

[pscustomobject]@{
    mcpServers = [pscustomobject]@{
        "abraham-os" = [pscustomobject]@{
            command = "node"
            args = @($server)
            env = [pscustomobject]@{
                ABRAHAM_MCP_POLICY = $policy
            }
        }
    }
} | ConvertTo-Json -Depth 6
