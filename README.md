# AURA ROLL — KAISX STUDIO

A mobile-ready Three.js 3D vertical-slice prototype packaged with Capacitor.

## Gameplay
- Explore the Spawn Plaza with WASD / arrow keys.
- Drag the world to orbit the camera.
- Discover cosmetic auras and collect them locally on the device.
- Aura discoveries use free in-game random rewards only; there are no purchases, cash bets, or cash-out.

## Local build
Use Node.js 22, then run:
- npm install
- npm run build
- npx cap add android
- npx cap sync android

## Android APK
GitHub Actions builds a debug APK on pushes to main. Open the Actions tab and download the artifact named AURA-ROLL-Android-APK after the workflow succeeds.

## Prototype limitations
This is Phase 0 only. It does not include online multiplayer, accounts, cloud saves, secure server-side randomness, or the full production content catalogue.