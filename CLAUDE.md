# KnitPattern-Studio

## DFF Studios Status (Pflicht am Ende jeder Sitzung)

Dieses Repo erscheint in **DFF Studios** als Projekt-Steckbrief. Die App liest `.dff/status.json` aus dem Standard-Branch.
Bevor du eine Sitzung beendest oder pushst, aktualisiere `.dff/status.json` und committe sie mit dem übrigen Stand (kein eigener Commit):
- `now`: ein Satz, woran gerade gearbeitet wird (das sieht der Nutzer zuerst).
- `log`: neuen Eintrag **oben** einfügen (`date` = YYYY-MM-DD, `summary` = ein Satz, was erledigt wurde, `by` = "Claude Code"); höchstens 20 Einträge behalten.
- `next`: die nächsten 1–5 Schritte. `blockers`: was ohne den Nutzer nicht weitergeht (leer lassen, wenn nichts).
- `stage` nur ändern, wenn sich der Entwicklungsstand wirklich geändert hat; `version` bei Releases anpassen.
- `updated`: jetzt (ISO-Zeit).

Gültige Werte für `stage`: Idee, Prototyp, In Arbeit, Alpha, Beta, Release-reif, Veröffentlicht, Wartung, Pausiert, Archiv.
Pflichtfelder: `project`, `stage`, `updated`, `now`, `log`. Optional: `version`, `next`, `blockers`,
`tagline` (ein Satz, was das Projekt ist), `color` (#hex, **kein Blau**), `icon` (Pfad zu PNG/JPG im Repo oder `lucide:name`),
`covers` (Pfade zu Bildern im Repo), `music` (Liste: `{ "title", "path" }` für Audiodateien im Repo oder `{ "title", "url", "prompt" }` für Suno-Links).
Offene Aufgaben gehören als GitHub-Issues ins Repo (Labels: bug, feature, release-blocker, design, idee) – DFF Studios zeigt sie an.
