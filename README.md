# KnitPattern Studio

**KnitPattern Studio** ist ein Windows-Desktop-Programm zum automatischen Erstellen textbasierter Strickanleitungen. Du gibst Maschen- und Reihenanzahl sowie den Mustertyp ein, klickst auf „Anleitung generieren“ – und erhältst eine klare, zeilenweise Anleitung zum Kopieren und Mitnehmen. Die App läuft vollständig **offline**, ohne Internet und ohne externe Dienste.

---

## Was das Programm kann

- **Eingabe:** Maschenanzahl, Reihenanzahl, Mustertyp (Glatt rechts oder Rippenmuster)
- **Ausgabe:** Strukturierte Textanleitung mit Überschrift, Parametern und Reihenbeschreibung (z. B. „Reihe 1: rechts über alle 20 Maschen.“)
- **Mustertypen:**
  - **Glatt rechts:** Ungerade Reihen rechts, gerade Reihen links
  - **Rippenmuster:** Rapport „1 re, 1 li“ über die gesamte Breite, Reihen „wie sie erscheinen“
- **UI:** Einfaches Formular, Button „Anleitung generieren“, scrollbarer Ausgabebereich – der komplette Text ist kopierbar (Strg+A, Strg+C).

---

## Installer (Setup.exe) bauen und herunterladen

Der Windows-Installer wird mit **GitHub Actions** gebaut. Du brauchst lokal kein Node.js, um die Setup.exe zu bekommen.

1. Öffne ** [Actions](https://github.com/deadfrogface/KnitPattern-Studio/actions)** in diesem Repository.
2. Links **„Build Windows Installer“** auswählen.
3. Rechts auf **„Run workflow“** klicken (Branch: `main`) → **„Run workflow“** bestätigen.
4. Wenn der Lauf grün ist: auf den Lauf klicken, unten bei **Artifacts** **„KnitPattern-Studio-Windows-Installer“** herunterladen.
5. Im Zip liegt die **Setup.exe** – ausführen und unter Windows installieren.

Der Workflow startet auch automatisch bei jedem Push auf `main`; du kannst die Setup.exe dann genauso aus dem jeweiligen Lauf als Artifact herunterladen.

---

## Nutzung (nach der Installation)

1. **KnitPattern Studio** starten.
2. **Maschenanzahl** und **Reihenanzahl** eintragen (z. B. 20 Maschen, 10 Reihen).
3. **Mustertyp** wählen: „Glatt rechts“ oder „Rippenmuster“.
4. Auf **„Anleitung generieren“** klicken.
5. Die Anleitung erscheint im unteren Bereich – bei Bedarf alles markieren (Strg+A) und kopieren (Strg+C).

---

## Technik (für Entwickler)

- **Plattform:** Windows-Desktop (Electron)
- **Frontend:** HTML, CSS, JavaScript (ein Fenster, kein Node im Renderer)
- **Build:** electron-builder, NSIS-Installer (Setup.exe), optional Desktop-Verknüpfung
- **Offline:** Keine Netzwerkaufrufe, keine externen APIs

Lokal entwickeln oder selbst bauen (mit installiertem [Node.js](https://nodejs.org/)):

```bash
npm install
npm start          # App starten
npm run build      # Setup.exe in dist/ erzeugen
```

---

## Lizenz

MIT
