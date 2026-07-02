This folder should contain your app icons:

- apple-touch-icon.png  (180x180) — referenced in src/index.html
- icon-192.png           (192x192) — optional, for PWA manifest
- icon-512.png           (512x512) — optional, for PWA manifest
- og-image.png           (1200x630) — place in public/assets/ for Open Graph/Twitter previews

Quick way to generate these from public/favicon.svg:
  npx sharp-cli -i public/favicon.svg -o public/assets/icons/apple-touch-icon.png resize 180 180
  npx sharp-cli -i public/favicon.svg -o public/assets/icons/icon-192.png resize 192 192
  npx sharp-cli -i public/favicon.svg -o public/assets/icons/icon-512.png resize 512 512

Or use any online SVG-to-PNG converter / design tool (Figma, Photoshop, Canva)
with public/favicon.svg as the source, then drop the exported PNGs here.
