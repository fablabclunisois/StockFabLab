# Stock FabLab Clunisois

Application web (PWA) de suivi du stock : filaments, résines, plaques de découpe laser.
Les étudiants consultent en lecture seule ; seul le gestionnaire (détenteur d'un jeton GitHub) peut modifier et publier.

## 1. Mise en ligne (une seule fois, ~5 min)

1. Créer un dépôt GitHub **public** (ex. `fablab-stock`).
2. Y déposer **tous les fichiers de ce dossier** (Add file → Upload files).
3. Settings → Pages → Source : *Deploy from a branch* → branche `main`, dossier `/ (root)` → Save.
4. Après une minute, l'application est disponible à `https://<ton-compte>.github.io/fablab-stock/`.
5. Générer un QR code de cette adresse et l'afficher dans le FabLab.

## 2. Installation sur Android

Ouvrir le lien dans Chrome → menu ⋮ → **Ajouter à l'écran d'accueil** (ou « Installer l'application »).

## 3. Activer la modification depuis l'appli (une seule fois, par appareil)

Les modifications sont enregistrées dans le dépôt par l'appli elle-même, grâce à un **jeton d'accès personnel**.
Sans ce jeton, personne ne peut rien changer : c'est GitHub qui refuse l'écriture, pas seulement l'appli.

**Créer le jeton**
1. GitHub → ta photo de profil → *Settings* → *Developer settings* → *Personal access tokens* → **Fine-grained tokens** → *Generate new token*.
2. Nom : `FabLab stock` ; Expiration : au choix (jusqu'à 1 an).
3. *Repository access* → **Only select repositories** → choisir `fablab-stock`.
4. *Permissions* → *Repository permissions* → **Contents : Read and write** (rien d'autre).
5. *Generate token*, puis copier le jeton (il commence par `github_pat_…`, il ne s'affiche qu'une fois).

**Se connecter dans l'appli**
1. Pied de page → *Connexion gestionnaire*.
2. Renseigner le dépôt (`ton-compte/fablab-stock`), la branche (`main`) et coller le jeton.
3. Le jeton reste uniquement dans le navigateur de cet appareil.

## 4. Utilisation au quotidien

- Boutons **− / +** : retirent ou ajoutent une unité d'achat (1000 g pour une bobine, 1000 mL pour une résine ; modifiable par article via « Conditionnement d'achat »).
- **Modifier**, **Suppr.** et **+ Ajouter** pour le reste.
- Les changements restent en brouillon sur ton appareil (bandeau jaune) jusqu'à ce que tu cliques sur **Publier**.
- Une fois publié, les étudiants voient la mise à jour après environ 1 minute (le temps que GitHub Pages se mette à jour).
- Chaque publication crée une version dans l'historique du dépôt : on peut toujours revenir en arrière.

## Bon à savoir

- Ne partage ce jeton à personne. En cas de perte ou de vol du téléphone, révoque-le sur GitHub (*Settings → Developer settings → Fine-grained tokens → Delete*) et crée-en un nouveau.
- Les sites GitHub Pages d'un même compte partagent le même espace de stockage navigateur : si tu héberges d'autres sites sous `ton-compte.github.io`, ne te connecte au mode gestionnaire que sur un appareil personnel.
- À l'expiration du jeton, l'appli affiche « Jeton invalide ou expiré » : recrée un jeton et reconnecte-toi.
- Les étudiants qui cliquent sur « Connexion gestionnaire » voient seulement le formulaire de connexion ; sans jeton valide, rien ne se passe.

## Format de `stock.json` (pour information, tu n'as pas à le modifier à la main)

```json
{
  "updated": "2026-10-23T10:00:00.000Z",
  "items": [
    { "id": "f1", "category": "filament", "material": "PLA", "name": "Marque",
      "color": "#222222", "color2": "#ffffff",
      "quantity": 850, "pack": 750, "low": 200, "location": "Étagère A", "note": "…" },
    { "id": "p1", "category": "plaque", "material": "Contreplaqué",
      "color": "#d9b382", "quantity": 8,
      "width": 600, "height": 400, "thickness": 3 }
  ]
}
```

- `category` : `filament` (g), `resine` (mL) ou `plaque` (pièces)
- `colorName` : nom de la couleur affiché (ex. « Rouge », « Orange / Transparent ») ; `color` et `color2` : teintes de la pastille (la 2e pour les doubles couleurs)
- `diameter` : diamètre du filament en mm (1.75 ou 2.85)
- `pack` : optionnel, conditionnement d'achat utilisé par les boutons − / + (défaut : 1000)
- `low` : optionnel, seuil « stock faible » (défauts : 200 g, 250 mL, 2 plaques)

## Données de départ

`stock.json` a été généré à partir des fichiers Excel FDM, SLA et découpe laser. Les teintes des pastilles sont approximatives : tu peux les ajuster dans l'appli (champ « Pastille »).
