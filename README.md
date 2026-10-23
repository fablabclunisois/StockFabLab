# Stock FabLab Clunisois

Application web (PWA) de consultation du stock : filaments, résines, plaques de découpe laser.
Les étudiants consultent en lecture seule ; le gestionnaire met à jour `stock.json`.

## Mise en ligne (une seule fois, ~5 min)

1. Créer un dépôt GitHub (ex. `fablab-stock`), public.
2. Y déposer **tous les fichiers de ce dossier** (Add file → Upload files).
3. Settings → Pages → Source : *Deploy from a branch* → branche `main`, dossier `/ (root)` → Save.
4. Après une minute, l'application est disponible à `https://<ton-compte>.github.io/fablab-stock/`.
5. Générer un QR code de cette adresse et l'afficher dans le FabLab.

## Installation sur Android

Ouvrir le lien dans Chrome → menu ⋮ → **Ajouter à l'écran d'accueil** (ou « Installer l'application »).
L'application fonctionne ensuite hors ligne avec la dernière version du stock chargée.

## Mettre à jour le stock

**Option A : depuis l'appli (confortable sur téléphone)**
1. Ouvrir l'appli → pied de page → *Mode gestionnaire*.
2. Ajouter / modifier / ajuster les quantités (boutons − et +). Les changements sont enregistrés
   en brouillon local sur ton appareil (bandeau jaune).
3. *Exporter stock.json* puis remplacer le fichier dans le dépôt GitHub
   (Add file → Upload files, même nom, *Commit*). Les étudiants voient la mise à jour en quelques minutes.

**Option B : éditer `stock.json` directement** dans GitHub (icône crayon), ou sur ton PC.

Le mode gestionnaire n'est pas protégé par mot de passe, car il n'en a pas besoin : un étudiant qui l'ouvre
ne modifie que son propre brouillon local. Seul un commit sur le dépôt change ce que voient les autres.

## Format de `stock.json`

```json
{
  "updated": "2026-10-23T10:00:00.000Z",
  "items": [
    { "id": "f1", "category": "filament", "material": "PLA", "name": "Marque",
      "color": "#222222", "color2": "#ffffff",
      "quantity": 850, "low": 200, "location": "Étagère A", "note": "…" },
    { "id": "p1", "category": "plaque", "material": "Contreplaqué",
      "color": "#d9b382", "quantity": 8,
      "width": 600, "height": 400, "thickness": 3 }
  ]
}
```

- `category` : `filament` (g), `resine` (mL) ou `plaque` (pièces)
- `color2` : optionnel, pour les filaments/plaques double couleur
- `low` : optionnel, seuil « stock faible » (défauts : 200 g, 250 mL, 2 plaques)
- `id` : identifiant unique de chaque ligne (n'importe quelle chaîne)

## Passer d'Excel à `stock.json`

Envoie-moi tes fichiers Excel actuels et je te fournis un script de conversion vers ce format.

## Évolutions possibles

- Les étudiants déclarent leurs prélèvements (nécessite un petit backend : Google Sheets, Supabase…)
- Photos des bobines, QR code par article, alertes de réapprovisionnement
