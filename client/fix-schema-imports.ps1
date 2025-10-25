Get-ChildItem -Path "src" -Recurse -Filter "*.tsx" | ForEach-Object {
    (Get-Content $_.FullName) | ForEach-Object {
        $_ -replace '(from "\.\.\/shared\/schema")', 'from "@shared/schema"'
    } | Set-Content $_.FullName
}