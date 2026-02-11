# KnitPattern Studio

Windows-Desktop-Tool zur automatischen Generierung von Strickanleitungen. Läuft vollständig offline.

## Voraussetzungen

- **Node.js** (LTS, z. B. 20.x oder 22.x) von [nodejs.org](https://nodejs.org/)

## Entwicklung starten

```bash
npm install
npm start
```

## Windows-Setup (Setup.exe) bauen

```bash
npm install
npm run build
```

Die **Setup.exe** (NSIS-Installer) liegt danach im Ordner `dist/`.

## Nutzung

1. Maschenanzahl und Reihenanzahl eingeben.
2. Mustertyp wählen: **Glatt rechts** oder **Rippenmuster**.
3. Auf **Anleitung generieren** klicken.
4. Text im Ausgabebereich vollständig kopierbar (Strg+A, Strg+C).

## Technik

- Electron + HTML/CSS/JS
- Keine Internetverbindung, keine externen Dienste
- Build: electron-builder, NSIS-Installer für Windows
