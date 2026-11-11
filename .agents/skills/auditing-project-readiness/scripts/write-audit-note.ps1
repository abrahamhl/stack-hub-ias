param(
    [Parameter(Mandatory = $true)][string]$Title,
    [Parameter(Mandatory = $true)][string]$Body,
    [string]$Actor = "claude-code",
    [string]$RootId = "ai-forge",
    [string]$Bridge = "C:\dev\02_PROJECTS\SKILLS-FRONTEND\stack-hub-IAs\mcp\abraham-os-bridge"
)

# Records an audit note through the abraham-os MCP bridge (write_audit_note tool).
# The bridge only writes inside .ai-forge/audit of an audit-write root.

$env:ABRAHAM_MCP_POLICY = Join-Path $Bridge "config\policy.local.json"

$messages = @(
    (@{ jsonrpc = "2.0"; id = 1; method = "initialize"; params = @{
        protocolVersion = "2024-11-05"; capabilities = @{};
        clientInfo = @{ name = "audit-script"; version = "1.0" } } } | ConvertTo-Json -Compress -Depth 6),
    (@{ jsonrpc = "2.0"; method = "notifications/initialized" } | ConvertTo-Json -Compress),
    (@{ jsonrpc = "2.0"; id = 2; method = "tools/call"; params = @{
        name = "write_audit_note"
        arguments = @{ rootId = $RootId; title = $Title; body = $Body; actor = $Actor } } } | ConvertTo-Json -Compress -Depth 6)
)

$response = $messages -join "`n" | node (Join-Path $Bridge "dist\index.js")
$result = ($response -split "`n" | Where-Object { $_ -match '"id":2' } | Select-Object -First 1)
if (-not $result) { throw "No response from bridge for write_audit_note" }
$parsed = $result | ConvertFrom-Json
if ($parsed.result.isError) { throw "Bridge denied the note: $($parsed.result.content[0].text)" }
$parsed.result.content[0].text
