default:
    @just --list

dev:
    #!/usr/bin/env bash
    source ~/.nvm/nvm.sh
    nvm use || { exit 1; }
    set -euxo pipefail
    exec npm run dev
