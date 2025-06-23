#!/bin/sh
if [ -z "$HUSKY" ]; then
  echo "Git hooks not running."
  exit 0
fi

npm run -s --if-present husky install 2>/dev/null || true
