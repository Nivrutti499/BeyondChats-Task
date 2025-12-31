# Script to create a shareable zip file (excluding node_modules)

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$zipPath = Join-Path (Split-Path -Parent $projectPath) "beyondchats-task-shareable.zip"

# Remove old zip if exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Creating shareable zip file (excluding node_modules)..." -ForegroundColor Green
Write-Host "This may take a few minutes..." -ForegroundColor Yellow

# Get all files and folders except node_modules, .git, build folders
$itemsToZip = Get-ChildItem -Path $projectPath -Exclude node_modules, ".git", "build", "dist", ".next", ".cache", "*.log", "package-lock.json" | 
    Where-Object { $_.Name -ne "node_modules" }

# Create temporary folder
$tempFolder = Join-Path $env:TEMP "beyondchats-task-temp"
if (Test-Path $tempFolder) {
    Remove-Item $tempFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $tempFolder | Out-Null

# Copy files excluding node_modules
foreach ($item in $itemsToZip) {
    if ($item.PSIsContainer) {
        Copy-Item -Path $item.FullName -Destination $tempFolder -Recurse -Exclude node_modules
    } else {
        Copy-Item -Path $item.FullName -Destination $tempFolder
    }
}

# Also copy specific folders while excluding node_modules
$folders = @("laravel-backend", "nodejs-script", "react-frontend", "mock-api-server")
foreach ($folder in $folders) {
    $sourceFolder = Join-Path $projectPath $folder
    if (Test-Path $sourceFolder) {
        Get-ChildItem -Path $sourceFolder -Exclude node_modules -Recurse | 
            Copy-Item -Destination { $_.FullName -replace [regex]::Escape($sourceFolder), (Join-Path $tempFolder $folder) } -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Create zip
Compress-Archive -Path "$tempFolder\*" -DestinationPath $zipPath -CompressionLevel Optimal -Force

# Cleanup
Remove-Item $tempFolder -Recurse -Force

$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host ""
Write-Host "✅ Zip file created successfully!" -ForegroundColor Green
Write-Host "Location: $zipPath" -ForegroundColor Cyan
Write-Host "Size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: node_modules are excluded. Recipients need to run 'npm install' in each folder." -ForegroundColor Yellow



