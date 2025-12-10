# Cuisine Express - Application Angular

Application Angular pour trouver des recettes basées sur les ingrédients disponibles.

## Fonctionnalités

- Recherche de recettes par ingrédients
- Filtrage intelligent des recettes
- Affichage des recettes avec un ingrédient manquant
- Recherche par nom de recette
- Mode sombre/clair
- Autocomplétion des ingrédients
- Stockage local des ingrédients sélectionnés
- Base de données Supabase pour les recettes

## Structure du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── header/               # Composant d'en-tête avec recherche
│   │   ├── ingredient-search/    # Recherche et sélection d'ingrédients
│   │   ├── recipe-list/          # Liste des recettes filtrées
│   │   └── recipe-modal/         # Modal de détails de recette
│   ├── models/
│   │   └── recipe.model.ts       # Modèles TypeScript
│   ├── services/
│   │   ├── recipe.service.ts     # Service de gestion des recettes
│   │   └── supabase.service.ts   # Service Supabase
│   └── app.component.ts          # Composant principal
├── environments/
│   └── environment.ts            # Configuration environnement
└── styles.css                    # Styles globaux
```

## Installation

1. Installer les dépendances:
```bash
npm install
```

2. Configurer les variables d'environnement:
Créez un fichier `.env` à la racine du projet avec vos identifiants Supabase:
```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

3. Lancer le serveur de développement:
```bash
npm run dev
```

4. Construire pour la production:
```bash
npm run build
```

## Base de Données Supabase

L'application utilise Supabase avec deux tables:

### Table `recipes`
- `id`: Identifiant unique
- `name`: Nom de la recette
- `image`: Chemin de l'image
- `time`: Temps de préparation
- `difficulty`: Niveau de difficulté
- `tags`: Tags de catégorie
- `ingredients`: Liste des ingrédients
- `instructions`: Étapes de préparation

### Table `common_ingredients`
- `id`: Identifiant unique
- `name`: Nom de l'ingrédient (unique)

Les tables sont configurées avec Row Level Security (RLS) pour un accès public en lecture.

## Technologies Utilisées

- **Angular 18**: Framework principal
- **TypeScript**: Langage de programmation
- **RxJS**: Programmation réactive
- **Supabase**: Base de données et backend
- **Angular CLI**: Outils de développement

## Scripts Disponibles

- `npm run dev`: Lance le serveur de développement
- `npm run build`: Construit l'application pour la production
- `npm run preview`: Lance un aperçu de la version de production

## Fonctionnalités Techniques

### Services
- **RecipeService**: Gère la logique métier des recettes, filtrage et recherche
- **SupabaseService**: Gère la connexion à Supabase

### Composants Standalone
Tous les composants utilisent l'architecture standalone d'Angular pour une meilleure modularité.

### Gestion d'État
L'état de l'application est géré via RxJS BehaviorSubjects pour une réactivité optimale.

### Persistance Locale
Les ingrédients sélectionnés sont sauvegardés dans le localStorage pour une meilleure expérience utilisateur.
