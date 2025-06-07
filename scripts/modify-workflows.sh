#!/bin/bash
set -e

for file in workflows/*.json; do
tmpfile=$(mktemp)
jq '.name |= "[AUTO] " + .' "$file" > "$tmpfile" && mv "$tmpfile" "$file"
echo "Modified: $file"
done
