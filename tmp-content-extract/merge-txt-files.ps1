# Merge all .txt files in this folder into a single output file.
# Usage: .\merge-txt-files.ps1 [-OutputFile merged.txt]

param(
    [string]$OutputFile = "merged.txt"
)

$folder = $PSScriptRoot
$outputPath = Join-Path $folder $OutputFile
$scriptName = Split-Path -Leaf $MyInvocation.MyCommand.Path

$txtFiles = Get-ChildItem -Path $folder -Filter "*.txt" -File |
    Where-Object { $_.Name -ne $OutputFile -and $_.Name -ne $scriptName } |
    Sort-Object Name

if (-not $txtFiles) {
    Write-Warning "No .txt files found in $folder"
    exit 1
}

$separator = "`r`n" + ("=" * 80) + "`r`n"
$parts = foreach ($file in $txtFiles) {
    $header = "FILE: $($file.Name)`r`n" + ("-" * 80) + "`r`n"
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
  if ($null -eq $content) { $content = "" }
    $header + $content.TrimEnd()
}

$merged = ($parts -join $separator) + "`r`n"
[System.IO.File]::WriteAllText($outputPath, $merged, [System.Text.UTF8Encoding]::new($false))

Write-Host "Merged $($txtFiles.Count) file(s) into: $outputPath"
