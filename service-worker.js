{
  "appId": "com.rythmrajstudio.app",
  "productName": "Rythm Raj Studio",
  "directories": {
    "output": "dist"
  },
  "files": [
    "**/*",
    "!**/*.map",
    "!node_modules/**/.*",
    "!dist/**",
    "!*.log"
  ],
  "win": {
    "target": [
      "nsis"
    ]
  },
  "mac": {
    "target": [
      "dmg",
      "zip"
    ]
  },
  "linux": {
    "target": [
      "AppImage",
      "deb"
    ]
  }
}
