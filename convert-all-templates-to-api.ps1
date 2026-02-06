# Convert All Templates to Use Backend API
# This script copies API integration files from toy upfront 2 to all other templates

Write-Host "`n🚀 CONVERTING ALL TEMPLATES TO PRODUCTION-READY" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

$baseTemplate = "templates\orbit_front_others\toy upfront 2"

# Define all templates to convert
$templates = @(
    @{Path="templates\orbit_front_others\fashion_upfront_2"; Name="Fashion (Main)"; Port=3005; hasLib=$true; hasSrc=$false},
    @{Path="templates\orbit_front_others\fashion_upfront"; Name="Fashion (Variant 2)"; Port=3014; hasLib=$true; hasSrc=$false},
    @{Path="templates\orbit_upfront"; Name="Electronics"; Port=3006; hasLib=$false; hasSrc=$true},
    @{Path="templates\orbit_front_others\FOOTWEAR UPFRONT"; Name="Footwear"; Port=3008; hasLib=$false; hasSrc=$true},
    @{Path="templates\orbit-cosmetics-upfront\perfume-upfront"; Name="Perfume (Theme 1)"; Port=3009; hasLib=$true; hasSrc=$false},
    @{Path="templates\orbit-cosmetics-upfront\perfume-upfront-theme2"; Name="Perfume (Theme 2)"; Port=3015; hasLib=$true; hasSrc=$false},
    @{Path="templates\orbit-cosmetics-upfront\perfume-upfront-theme3"; Name="Perfume (Theme 3)"; Port=3016; hasLib=$true; hasSrc=$false},
    @{Path="templates\orbit-cosmetics-upfront\beauty-personal-care-upfront"; Name="Beauty and Personal Care"; Port=3010; hasLib=$true; hasSrc=$false},
    @{Path="templates\orbit-cosmetics-upfront\furniture-upfront"; Name="Furniture and Home"; Port=3011; hasLib=$true; hasSrc=$false},
    @{Path="templates\orbit_front_others\toy upfront 3"; Name="Toys (Variant 2)"; Port=3012; hasLib=$true; hasSrc=$false},
    @{Path="templates\orbit_front_others\toys upfront"; Name="Toys (Variant 3)"; Port=3013; hasLib=$true; hasSrc=$false}
)

$successCount = 0
$errorCount = 0

foreach ($template in $templates) {
    Write-Host "📦 Converting: $($template.Name)" -ForegroundColor Yellow
    Write-Host "   Path: $($template.Path)" -ForegroundColor Gray
    
    $fullPath = Join-Path $PSScriptRoot $template.Path
    
    if (!(Test-Path $fullPath)) {
        Write-Host "   ❌ Template not found!" -ForegroundColor Red
        $errorCount++
        continue
    }
    
    try {
        # Determine lib path based on template structure
        if ($template.hasSrc) {
            $libPath = Join-Path $fullPath "src\lib"
            $contextPath = Join-Path $fullPath "src\contexts"
        } else {
            $libPath = Join-Path $fullPath "lib"
            $contextPath = Join-Path $fullPath "context"
        }
        
        # Create directories if they don't exist
        if (!(Test-Path $libPath)) {
            New-Item -Path $libPath -ItemType Directory -Force | Out-Null
        }
        
        if (!(Test-Path $contextPath)) {
            New-Item -Path $contextPath -ItemType Directory -Force | Out-Null
        }
        
        # Copy API files
        Write-Host "   → Copying storefront-api.ts..." -ForegroundColor Gray
        Copy-Item -Path "$baseTemplate\lib\storefront-api.ts" -Destination $libPath -Force
        
        Write-Host "   → Copying products-api.ts..." -ForegroundColor Gray
        Copy-Item -Path "$baseTemplate\lib\products-api.ts" -Destination $libPath -Force
        
        Write-Host "   → Copying StoreContext.tsx..." -ForegroundColor Gray
        if ($template.hasSrc) {
            Copy-Item -Path "$baseTemplate\context\StoreContext.tsx" -Destination $contextPath -Force
        } else {
            Copy-Item -Path "$baseTemplate\context\StoreContext.tsx" -Destination $contextPath -Force
        }
        
        # Create .env.local
        Write-Host "   → Creating .env.local..." -ForegroundColor Gray
        $envContent = "NEXT_PUBLIC_API_URL=http://localhost:5000`nNEXT_PUBLIC_STORE_SUBDOMAIN=new-business"
        Set-Content -Path (Join-Path $fullPath ".env.local") -Value $envContent -Force
        
        Write-Host "   ✅ Converted successfully!" -ForegroundColor Green
        Write-Host ""
        $successCount++
        
    } catch {
        Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        $errorCount++
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "✅ CONVERSION COMPLETE!" -ForegroundColor Green
Write-Host ""
Write-Host "   Successful: $successCount templates" -ForegroundColor Green
if ($errorCount -gt 0) {
    Write-Host "   Failed: $errorCount templates" -ForegroundColor Red
}
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Update each template layout.tsx to add StoreProvider" -ForegroundColor White
Write-Host "2. Update product components to use API instead of dummy data" -ForegroundColor White
Write-Host "3. Update Header and Footer to use store context" -ForegroundColor White
Write-Host "4. Test each template" -ForegroundColor White
Write-Host ""
Write-Host "See TEMPLATE_API_INTEGRATION_GUIDE.md for detailed instructions!" -ForegroundColor Yellow
Write-Host ""
