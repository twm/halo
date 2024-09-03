default:
    @just --list

dev:
    #!/usr/bin/env bash
    source ~/.nvm/nvm.sh
    nvm use || { exit 1; }
    set -euxo pipefail
    exec npm run dev

pr-playwright-report:
    #!/usr/bin/env bash
    set -euxo pipefail
    commit=$(git rev-parse HEAD)
    run_id=$(gh run list --commit "$commit" --limit 1 --json databaseId --jq '.[] | .databaseId')
    if [[ -z $run_id ]]; then
        printf "Commit %s not found upstream\n" "$commit"
        branch=$(git branch --show-current)
        run_id=$(gh run list --branch "$branch" --limit 1 --json databaseId --jq '.[] | .databaseId')
    fi
    if [[ -z $run_id ]]; then
        printf "Run for branch %s not found upstream\n" "$branch"
        exit 1
    fi
    printf "Downloading playwright-report for run %s...\n" "$run_id"
    target=$(mktemp -d)
    gh run download "$run_id" --name playwright-report --dir "$target"
    x-www-browser "$target/index.html"
