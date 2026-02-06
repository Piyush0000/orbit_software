# Copy API files to all templates
$base = "templates\orbit_front_others\toy upfront 2"

$templates = @(
    "templates\orbit_front_others\fashion_upfront_2",
    "templates\orbit_front_others\fashion_upfront",
    "templates\orbit_upfront",
    "templates\orbit_front_others\FOOTWEAR UPFRONT",
    "templates\orbit-cosmetics-upfront\perfume-upfront",
    "templates\orbit-cosmetics-upfront\perfume-upfront-theme2",
    "templates\orbit-cosmetics-upfront\perfume-upfront-theme3",
    "templates\orbit-cosmetics-upfront\beauty-personal-care-upfront",
    "templates\orbit-cosmetics-upfront\furniture-upfront",
    "templates\orbit_front_others\toy upfront 3",
    "templates\orbit_front_others\toys upfront"
)

Write-Host "Converting templates to use API..." -ForegroundColor Cyan

foreach ($template in $templates) {
    Write-Host "Processing: $template" -ForegroundColor Yellow
    
    # Determine structure
    $hasSrc = Test-Path (Join-Path $template "src")
    
    if ($hasSrc) {
        $libPath = Join-Path $template "src\lib"
        $contextPath = Join-Path $template "src\contexts"
    } else {
        $libPath = Join-Path $template "lib"
        $contextPath = Join-Path $template "context"
    }
    
    # Create directories
    New-Item -Path $libPath -ItemType Directory -Force -ErrorAction SilentlyContinue | Out-Null
    New-Item -Path $contextPath -ItemType Directory -Force -ErrorAction SilentlyContinue | Out-Null
    
    # Copy files
    Copy-Item "$base\lib\storefront-api.ts" $libPath -Force
    Copy-Item "$base\lib\products-api.ts" $libPath -Force
    Copy-Item "$base\context\StoreContext.tsx" $contextPath -Force
    
    # Create .env.local
    @"
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STORE_SUBDOMAIN=new-business
"@ | Set-Content (Join-Path $template ".env.local") -Force
    
    Write-Host "  Done!" -ForegroundColor Green
}

Write-Host "`nAll templates updated!" -ForegroundColor Green
