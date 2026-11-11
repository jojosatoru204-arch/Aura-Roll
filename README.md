# AURA ROLL — KAISX STUDIO

A 3D Three.js vertical-slice prototype packaged for Android with Capacitor.

## Build locally
- Node.js 22
- npm install
- npm run build
- npx cap add android
- npx cap sync android

## Gameplay
- Move with WASD / arrow keys.
- Drag the world to orbit the camera; pinch/scroll to zoom.
- Discover cosmetic auras using the in-game free discovery button.
- Collection is saved locally on the device.

This prototype uses only non-purchasable in-game discovery. It has no real-money bets, purchases, cash-out, multiplayer backend, or server-authoritative random system.

## Android build
GitHub Actions builds a debug APK and uploads it as an artifact on each push to main.