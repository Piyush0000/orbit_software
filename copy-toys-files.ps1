# Copy toys template files to Hub
$source = "d:\orbit\templates\orbit_front_others\toy upfront 2"
$dest = "d:\orbit\templates\orbit_storefront_hub"

Write-Host "Copying components/home..."
Copy-Item -Path "$source\components\home" -Destination "$dest\components\" -Recurse -Force

Write-Host "Copying components/layout..."
Copy-Item -Path "$source\components\layout" -Destination "$dest\components\" -Recurse -Force

Write-Host "Copying context..."
Copy-Item -Path "$source\context" -Destination "$dest\" -Recurse -Force

Write-Host "Copying lib files..."
Copy-Item -Path "$source\lib\*" -Destination "$dest\lib\" -Force

Write-Host "Copying globals.css..."
Copy-Item -Path "$source\app\globals.css" -Destination "$dest\app\toys-theme.css" -Force

Write-Host "Done!"
