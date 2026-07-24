param(
    [Parameter(Mandatory = $false)]
    [string]$Path = "."
)

$resolvedPath = (Resolve-Path -LiteralPath $Path).Path
$patterns = @("*.tsx", "*.ts", "*.jsx", "*.js", "*.css", "*.scss", "*.html")
$files = foreach ($pattern in $patterns) {
    Get-ChildItem -LiteralPath $resolvedPath -Recurse -File -Filter $pattern -ErrorAction SilentlyContinue |
        Where-Object {
            $_.FullName -notmatch "\\(node_modules|\.next|dist|out|coverage|\.git)\\"
        }
}

$uniqueFiles = $files | Sort-Object -Property FullName -Unique
$combined = ($uniqueFiles | ForEach-Object {
    Get-Content -LiteralPath $_.FullName -Raw -ErrorAction SilentlyContinue
}) -join "`n"

$checks = @(
    [ordered]@{
        id = "reduced-motion"
        passed = $combined -match "prefers-reduced-motion|useReducedMotion"
        severity = "high"
        message = "Provide a reduced-motion path for nonessential animation."
    },
    [ordered]@{
        id = "focus-visible"
        passed = $combined -match "focus-visible|:focus\b"
        severity = "high"
        message = "Provide visible keyboard focus."
    },
    [ordered]@{
        id = "responsive-layout"
        passed = $combined -match "@media|container-type|clamp\("
        severity = "high"
        message = "Add explicit responsive behavior."
    },
    [ordered]@{
        id = "quality-control"
        passed = $combined -match "quality|low-power|calm|boost|ultra|pause"
        severity = "medium"
        message = "Expose quality or pause controls for persistent rich motion."
    },
    [ordered]@{
        id = "semantic-canvas-fallback"
        passed = ($combined -notmatch "<canvas") -or ($combined -match "aria-label|fallback|noscript|figcaption")
        severity = "high"
        message = "Canvas and 3D scenes need a semantic fallback or description."
    },
    [ordered]@{
        id = "hover-equivalence"
        passed = ($combined -notmatch ":hover|onMouseEnter") -or
            ($combined -match "focus-within|focus-visible|onFocus|onClick|onPointerDown")
        severity = "high"
        message = "Hover behavior needs focus and touch activation equivalents."
    }
)

$result = [ordered]@{
    path = $resolvedPath
    scannedFiles = @($uniqueFiles).Count
    passed = @($checks | Where-Object passed).Count
    failed = @($checks | Where-Object { -not $_.passed }).Count
    checks = $checks
    note = "Static signals only; complete manual keyboard, touch, responsive and visual verification."
}

$result | ConvertTo-Json -Depth 5
if ($result.failed -gt 0) {
    exit 1
}
