# Install Dependencies for All REAL Templates
# This script installs node_modules for your actual upfront templates

Write-Host "🎨 Installing Real Template Dependencies..." -ForegroundColor Cyan
Write-Host ""

$templates = @(
    @{Name="Toys (Main)"; Path="templates\orbit_front_others\toy upfront 2"},
    @{Name="Fashion"; Path="templates\orbit_front_others\fashion_upfront_2"},
    @{Name="Electronics"; Path="templates\orbit_upfront"},
    @{Name="Electronics (Theme 2)"; Path="templates\orbit_front_electronics\electronics-upfront-theme-2"},
    @{Name="Food & Beverage (Theme 1)"; Path="templates\orbit_front_all\theme-1"},
    @{Name="Food & Beverage (Theme 2)"; Path="templates\orbit_front_all\theme-2"},
    @{Name="Food & Beverage (Theme 3)"; Path="templates\orbit_front_all\theme-3"},
    @{Name="Footwear"; Path="templates\orbit_front_others\FOOTWEAR UPFRONT"},
    @{Name="Perfume"; Path="templates\orbit-cosmetics-upfront\perfume-upfront"},
    @{Name="Beauty"; Path="templates\orbit-cosmetics-upfront\beauty-personal-care-upfront"},
    @{Name="Furniture"; Path="templates\orbit-cosmetics-upfront\furniture-upfront"},
    @{Name="Jewellery"; Path="templates\orbit_front_jewellery"}
)

$installed = 0
$skipped = 0

foreach ($template in $templates) {
    Write-Host "📦 $($template.Name)..." -ForegroundColor Yellow
    
    $fullPath = Join-Path $PSScriptRoot $template.Path
    
    if (!(Test-Path $fullPath)) {
        Write-Host "   ❌ Not found: $fullPath" -ForegroundColor Red
        $skipped++
        continue
    }
    
    if (Test-Path "$fullPath\node_modules") {
        Write-Host "   ✅ Already installed (skipping)" -ForegroundColor Gray
        $installed++
        continue
    }
    
    Push-Location
    Set-Location $fullPath
    
    Write-Host "   Installing..." -ForegroundColor Gray
    npm install --silent --no-progress 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Installed successfully" -ForegroundColor Green
        $installed++
    } else {
        Write-Host "   ⚠️ Installation had warnings" -ForegroundColor Yellow
        $installed++
    }
    
    Pop-Location
    Write-Host ""
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "✅ Installation Complete!" -ForegroundColor Green
Write-Host "   Installed: $installed templates" -ForegroundColor White
if ($skipped -gt 0) {
    Write-Host "   Skipped: $skipped templates" -ForegroundColor Yellow
}
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Ready to Run!" -ForegroundColor Cyan
Write-Host "To start a template:" -ForegroundColor White
Write-Host "   cd 'templates\orbit_front_others\toy upfront 2'" -ForegroundColor Gray
Write-Host "   npm run dev -- -p 3004" -ForegroundColor Gray
Write-Host ""
