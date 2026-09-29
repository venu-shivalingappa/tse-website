#!/usr/bin/env bash
# Re-encode the hero background video for the web (handoff §24: avoid heavy hero payloads).
# Usage: npm run media:hero -- /path/to/source.mov
set -euo pipefail
IN="${1:?Pass the source video path}"
FF="$(node -p "require('ffmpeg-static')")"
OUT="public/media"
"$FF" -y -loglevel error -i "$IN" -an -map 0:v:0 -vf "scale=1920:-2" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 "$OUT/hero-1080.webm"
"$FF" -y -loglevel error -i "$IN" -an -map 0:v:0 -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-1080.mp4"
"$FF" -y -loglevel error -i "$IN" -an -map 0:v:0 -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-720.mp4"
"$FF" -y -loglevel error -i "$IN" -frames:v 1 -vf "scale=1920:-2" -q:v 4 "$OUT/hero-poster.jpg"
ls -la "$OUT"
