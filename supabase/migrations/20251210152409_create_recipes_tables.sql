/*
  # Création des tables pour l'application Cuisine Express

  1. Nouvelles Tables
    - `recipes`
      - `id` (bigint, primary key, auto-increment)
      - `name` (text, NOT NULL) - Nom de la recette
      - `image` (text, NOT NULL) - Nom du fichier image
      - `time` (text, NOT NULL) - Temps de préparation
      - `difficulty` (text, NOT NULL) - Niveau de difficulté
      - `tags` (text[], NOT NULL) - Tags de la recette
      - `ingredients` (text[], NOT NULL) - Liste des ingrédients
      - `instructions` (text[], NOT NULL) - Instructions de préparation
      - `created_at` (timestamptz, DEFAULT now())
    
    - `common_ingredients`
      - `id` (bigint, primary key, auto-increment)
      - `name` (text, UNIQUE, NOT NULL) - Nom de l'ingrédient
      - `created_at` (timestamptz, DEFAULT now())

  2. Sécurité
    - Activer RLS sur les deux tables
    - Autoriser la lecture publique pour toutes les recettes et ingrédients
    - Pas de modification publique (les données sont gérées par l'admin)
*/

-- Créer la table des recettes
CREATE TABLE IF NOT EXISTS recipes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  time TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  instructions TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Créer la table des ingrédients communs
CREATE TABLE IF NOT EXISTS common_ingredients (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Activer RLS
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE common_ingredients ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Tout le monde peut lire les recettes"
  ON recipes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Tout le monde peut lire les ingrédients communs"
  ON common_ingredients
  FOR SELECT
  TO anon, authenticated
  USING (true);
