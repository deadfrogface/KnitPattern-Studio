# KnitPattern Studio

Windows-Desktop-Tool zur automatischen Generierung von Strickanleitungen. Läuft vollständig offline.

## Standard-Branch: main

Dieses Repo nutzt den Branch **main** (nicht master). Falls auf GitHub noch „master“ als Standard angezeigt wird: **Repository → Settings → General → Default branch** auf „main“ stellen, speichern, danach kann der alte Branch „master“ gelöscht werden.

## Wo ist die Setup.exe / der Windows-Installer?

- **Über GitHub:** Nach jedem Push auf `main` baut eine [GitHub-Actions-Workflow](.github/workflows/build-windows.yml) die App. Die **Setup.exe** findest du unter **Actions** → letzter Lauf → **Artifacts** → „KnitPattern-Studio-Windows-Installer“ herunterladen.
- **Lokal:** Mit installiertem Node.js: `npm install` und `npm run build` – die Setup.exe liegt danach im Ordner `dist/`. Der Ordner `dist/` wird nicht ins Repo eingecheckt (nur die gebaute App, keine Binaries im Git).

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
