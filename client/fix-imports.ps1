Get-ChildItem -Path "src/components/ui" -Filter "*.tsx" | ForEach-Object {
    (Get-Content $_.FullName) | ForEach-Object {
        $_ -replace '../lib/utils', '../../lib/utils' `
           -replace '../components/ui/', '../'
    } | Set-Content $_.FullName
}

Get-ChildItem -Path "src/components" -Filter "*.tsx" | ForEach-Object {
    if (-not ($_.FullName -match 'ui')) {
        (Get-Content $_.FullName) | ForEach-Object {
            $_ -replace '../ui/', './ui/' `
               -replace '../../shared/schema', '../shared/schema'
        } | Set-Content $_.FullName
    }
}

Get-ChildItem -Path "src/pages" -Filter "*.tsx" | ForEach-Object {
    (Get-Content $_.FullName) | ForEach-Object {
        $_ -replace '../ui/', '../components/ui/' `
           -replace '../components/', '../components/' `
           -replace '../lib/', '../lib/' `
           -replace '../hooks/', '../hooks/' `
           -replace '../../shared/schema', '../shared/schema'
    } | Set-Content $_.FullName
}