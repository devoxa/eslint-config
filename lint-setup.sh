#!/bin/bash
set -e

cat <<EOF > ./tests/ignoredFile.ts
async function main () {
  foo()
}

async function foo () {
  // void
}
EOF
