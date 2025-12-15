#!/usr/bin/env bash

URL="$1"
OUT="ci/smoke_report_$(date +%s).txt"

if [ -z "$URL" ]; then
  echo "Usage: $0 http://host:port" | tee $OUT
  exit 2
fi

# Try 10 times
for i in {1..10}; do
  STATUS=$(curl -s -o /tmp/body.html -w "%{http_code}" "$URL")
  if [ "$STATUS" == "200" ]; then break; fi
  sleep 1
done

if [ "$STATUS" != "200" ]; then
  echo "SMOKE FAILED - HTTP $STATUS" | tee $OUT
  exit 1
fi

if grep -q "power" /tmp/body.html; then
  echo "SMOKE PASSED" | tee $OUT
  exit 0
else
  echo "SMOKE WARNING" | tee $OUT
  exit 1
fi
