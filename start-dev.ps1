$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = "C:\Program Files\nodejs\node.exe"
$npmCli = "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js"
$cache = Join-Path $projectRoot ".npm-cache"
$vite = Join-Path $projectRoot "node_modules\vite\bin\vite.js"

if (-not (Test-Path $node)) {
  throw "Node was not found at $node"
}

if (-not (Test-Path $vite)) {
  & $node $npmCli install --ignore-scripts --no-audit --fund=false --cache $cache
}

& $node $vite --host 127.0.0.1 --port 5173
