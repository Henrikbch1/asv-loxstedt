Schritte zum Veröffentlichen der Frontend-Build auf GitHub Pages

1. Lokale Änderungen committen (falls noch nicht geschehen):

```bash
git add frontend/vite.config.ts .github/workflows/deploy-frontend.yml FRONTEND_DEPLOY.md
git commit -m "Prepare GH Pages deployment: set Vite base and add workflow"
```

2. Änderungen auf `main` pushen (der Workflow läuft automatisch):

```bash
git push origin main
```

3. Auf GitHub: Actions → build-and-deploy prüfen. Wenn erfolgreich, die Seite ist erreichbar unter:
`https://<github-username>.github.io/asv-loxstedt/`

Hinweis:
- Falls die Seite unter einem anderen Pfad liegen soll, passe `base` in `frontend/vite.config.ts` an.
- Wenn Actions fehlschlagen, öffne die Logs in GitHub Actions und poste sie hier, ich helfe beim Debug.
