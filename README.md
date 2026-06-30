# Site Semandata — Instructions de déploiement GitHub Pages

## Structure du site

```
site_web/
├── index.html          → Page d'accueil
├── plateforme.html     → DEMS® — La plateforme
├── solutions.html      → Solutions sectorielles (Finance, Industrie, Santé, Auto)
├── temoignages.html    → Études de cas & POV
├── entreprise.html     → L'entreprise, l'équipe, l'IP
├── mission.html        → Vision, Mission, Manifeste
├── gotomarket.html     → Partenaires & Distribution
├── assets/
│   └── style.css       → Design system complet (inspiré Alan.fr)
└── README.md           → Ce fichier
```

---

## Déploiement GitHub Pages en 5 étapes

### Étape 1 — Créer un repository GitHub

1. Ouvrez [github.com](https://github.com) (créez un compte si nécessaire)
2. Cliquez sur **"New repository"** (bouton vert en haut à droite)
3. Nommez-le : `semandata-site` (ou tout autre nom)
4. Cochez **"Public"** (requis pour GitHub Pages gratuit)
5. Cliquez **"Create repository"**

### Étape 2 — Uploader les fichiers

Option A — Via l'interface web (le plus simple) :
1. Dans votre nouveau repository, cliquez **"uploading an existing file"**
2. Glissez-déposez **tout le contenu du dossier `site_web/`** (tous les fichiers + le dossier `assets/`)
3. Ajoutez un message de commit : `Initial site Semandata`
4. Cliquez **"Commit changes"**

Option B — Via Git (si vous avez Git installé) :
```bash
cd "C:\Users\jeanf\OneDrive - jfgomez.biz\Projets Pro\GDE_production\site_web"
git init
git add .
git commit -m "Initial site Semandata"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/semandata-site.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages

1. Dans votre repository, cliquez sur **"Settings"** (onglet en haut)
2. Dans le menu gauche, cliquez **"Pages"**
3. Sous "Source", sélectionnez **"Deploy from a branch"**
4. Branche : **"main"**, Dossier : **"/ (root)"**
5. Cliquez **"Save"**

### Étape 4 — Récupérer votre lien

Après 1-2 minutes, GitHub Pages génère votre URL :
```
https://VOTRE-USERNAME.github.io/semandata-site/
```

Ce lien est partageable avec toute l'équipe, accessible depuis n'importe quel navigateur, sans installation.

### Étape 5 — Partager avec l'équipe

Envoyez simplement ce lien par email ou chat. Le site est public et accessible immédiatement.

---

## Personnalisation rapide

### Changer l'email de contact
Remplacez toutes les occurrences de `contact@semandata.com` par votre vrai email dans les 7 fichiers HTML.

### Ajouter un logo réel
Remplacez le logo-mark CSS (`.logo-mark`) par une vraie image :
```html
<img src="assets/logo.png" alt="Semandata" style="height:36px;">
```

### Modifier les couleurs
Dans `assets/style.css`, changez les variables CSS :
```css
--c-blue700: #0a70ff;  /* Couleur principale */
--c-heading: #282830;  /* Couleur des titres */
```

---

## Notes techniques

- Site **100% statique** — HTML + CSS uniquement, aucune dépendance serveur
- Police chargée depuis Google Fonts (Inter) — nécessite une connexion internet
- Compatible tous navigateurs modernes (Chrome, Firefox, Safari, Edge)
- **Responsive** — mobile, tablette, desktop
- Aucun tracker, aucun cookie, aucun JS externe

---

*Semandata — Powered by Data Excellence Science® — Genève, 2026*
