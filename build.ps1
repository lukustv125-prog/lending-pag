Set-StrictMode -Version Latest

Write-Host "Building: local fonts + minified assets..." -ForegroundColor Cyan

node "tools\fetch-fonts.mjs"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

node "tools\minify.mjs"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Done." -ForegroundColor Green

