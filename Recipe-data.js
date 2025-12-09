
// Common ingredients for autocomplete
const commonIngredients = [ 
    "ail", "aubergine", "avocat", "bacon", "beurre", "bœuf", "carotte", "champignon", 
    "chocolat", "ciboulette", "citron", "courgette", "crème fraîche", "crevette", 
    "épinard", "farine", "fromage", "huile d'olive", "jambon", "lait", "moutarde", 
    "œuf", "oignon", "parmesan", "pâtes", "poivre", "poivron", "pomme", "pomme de terre", 
    "poulet", "riz", "saumon", "sel", "sucre", "thon", "tomate", "vinaigre", "yaourt",
    "harissa", "tomate concentrée", "coriandre en poudre", "persil", "feta", 
    "concombre", "feuille de brick", "feuilles de malsouka", "semoule", "agneau", 
    "pois chiches", "navet", "épices à couscous", "câpres", "pain rassis", "citron", 
    "cumin", "romarin", "thym", "bouillon", "oignon rouge", "viande hachée", 
    "épices", "foie de bœuf", "piment", "levure boulangère", "eau tiède"
];

const allRecipeNames = [
    "Omelette nature",
    "Spaghetti Aglio e Olio",
    "Pâtes au parmesan",
    "Gratin de pâtes",
    "Œufs brouillés",
    "Tomates farcies au thon",
    "Riz au thon et tomates",
    "Velouté de carottes",
    "Poulet rôti aux herbes",
    "Salade de concombre et tomate",
    "ojja tunisienne  ",
    "Couscous tunisien",
    "Tajine malsouka",
    "Brik à l'œuf",
    "Lablabi",
    "Kamounia",
    "Makrouna bel salsa",
    "Fricassé tunisien"
];

// Recipe database
const recipeDatabase = [
    {
        id: 1,
        name: "Omelette nature",
        image: "omelette.jpg",
        time: "10 min",
        difficulty: "Facile",
        tags: ["Rapide", "Petit-déjeuner"],
        ingredients: ["œuf", "sel", "poivre", "beurre"],
        instructions: [
            "Battre les œufs dans un bol avec du sel et du poivre.",
            "Faire fondre le beurre dans une poêle à feu moyen.",
            "Verser les œufs battus et cuire pendant 2-3 minutes.",
            "Plier l'omelette en deux et servir immédiatement."
        ]
    },
    {
        id: 2,
        name: "Spaghetti Aglio e Olio",
        image: "Spaghetti.jpg",
        time: "15 min",
        difficulty: "Facile",
        tags: ["Italien", "Rapide"],
        ingredients: ["pâtes", "ail", "huile d'olive", "sel", "persil", "parmesan"],
        instructions: [
            "Cuire les pâtes selon les instructions sur l'emballage.",
            "Faire revenir l'ail émincé dans l'huile d'olive à feu doux.",
            "Égoutter les pâtes et les ajouter à la poêle avec l'ail.",
            "Mélanger et servir avec du persil haché et du parmesan râpé."
        ]
    },
    {
        id: 3,
        name: "Pâtes au parmesan",
        image: "Pâtes.jpg",
        time: "10 min",
        difficulty: "Très facile",
        tags: ["Rapide", "Italien"],
        ingredients: ["pâtes", "beurre", "parmesan", "sel", "poivre"],
        instructions: [
            "Cuire les pâtes dans de l'eau salée selon les instructions sur l'emballage.",
            "Égoutter les pâtes et les remettre dans la casserole.",
            "Ajouter le beurre et mélanger jusqu'à ce qu'il soit fondu.",
            "Incorporer le parmesan râpé, saler et poivrer selon votre goût.",
            "Servir immédiatement avec un peu plus de parmesan sur le dessus."
        ]
    },
    {
        id: 4,
        name: "Gratin de pâtes",
        image: "Gratin.jpg",
        time: "30 min",
        difficulty: "Moyen",
        tags: ["Familial", "Four"],
        ingredients: ["pâtes", "lait", "œuf", "fromage", "sel", "poivre", "beurre"],
        instructions: [
            "Préchauffer le four à 180°C.",
            "Cuire les pâtes al dente dans de l'eau salée.",
            "Battre les œufs avec le lait, le sel et le poivre.",
            "Égoutter les pâtes et les mélanger avec le mélange d'œufs et lait.",
            "Beurrer un plat à gratin et y verser les pâtes.",
            "Saupoudrer de fromage râpé et enfourner pour 20 minutes jusqu'à ce que le dessus soit doré."
        ]
    },
    {
        id: 5,
        name: "Œufs brouillés",
        image: "Œufs.jpg",
        time: "5 min",
        difficulty: "Facile",
        tags: ["Petit-déjeuner", "Rapide"],
        ingredients: ["œuf", "beurre", "sel", "poivre", "lait"],
        instructions: [
            "Battre les œufs dans un bol avec une cuillère à soupe de lait, du sel et du poivre.",
            "Faire fondre le beurre dans une poêle à feu moyen-doux.",
            "Verser les œufs battus et remuer constamment avec une spatule.",
            "Cuire jusqu'à ce que les œufs soient crémeux mais pris, environ 2-3 minutes.",
            "Servir immédiatement."
        ]
    },
    {
        id: 6,
        name: "Tomates farcies au thon",
        image: "Tomates.jpg",
        time: "15 min",
        difficulty: "Facile",
        tags: ["Entrée", "Léger"],
        ingredients: ["tomate", "thon", "mayonnaise", "sel", "poivre", "ciboulette"],
        instructions: [
            "Laver les tomates et couper le dessus.",
            "Évider les tomates à l'aide d'une cuillère.",
            "Dans un bol, mélanger le thon égoutté avec de la mayonnaise, du sel, du poivre et de la ciboulette ciselée.",
            "Farcir les tomates avec ce mélange.",
            "Réfrigérer avant de servir."
        ]
    },
    {
        id: 7,
        name: "Riz au thon et tomates",
        image: "Riz.jpg",
        time: "20 min",
        difficulty: "Facile",
        tags: ["Complet", "Rapide"],
        ingredients: ["riz", "thon", "tomate", "oignon", "huile d'olive", "sel", "poivre"],
        instructions: [
            "Cuire le riz selon les instructions sur l'emballage.",
            "Pendant ce temps, faire revenir l'oignon émincé dans l'huile d'olive.",
            "Ajouter les tomates coupées en dés et cuire 5 minutes.",
            "Incorporer le thon égoutté et émietter-le.",
            "Mélanger avec le riz cuit, saler et poivrer.",
            "Servir chaud."
        ]
    },
    {
        id: 8,
        name: "Velouté de carottes",
        image: "veloute-potimarron-Maud-J.jpg",
        time: "25 min",
        difficulty: "Facile",
        tags: ["Soupe", "Végétarien"],
        ingredients: ["carotte", "pomme de terre", "oignon", "bouillon", "crème fraîche", "sel", "poivre"],
        instructions: [
            "Éplucher et couper les carottes, les pommes de terre et l'oignon.",
            "Faire revenir l'oignon dans un peu d'huile.",
            "Ajouter les carottes et les pommes de terre, puis le bouillon.",
            "Laisser cuire 20 minutes jusqu'à ce que les légumes soient tendres.",
            "Mixer le tout et ajouter la crème fraîche.",
            "Assaisonner avec du sel et du poivre avant de servir."
        ]
    },
    {
        id: 9,
        name: "Poulet rôti aux herbes",
        image: "Poulet.jpg",
        time: "60 min",
        difficulty: "Moyen",
        tags: ["Dîner", "Four"],
        ingredients: ["poulet", "beurre", "ail", "thym", "romarin", "sel", "poivre", "huile d'olive"],
        instructions: [
            "Préchauffer le four à 200°C.",
            "Mélanger le beurre mou avec l'ail écrasé, le thym et le romarin hachés.",
            "Sécher le poulet avec du papier absorbant et le frotter avec de l'huile d'olive.",
            "Saler et poivrer l'intérieur et l'extérieur du poulet.",
            "Glisser le mélange de beurre aux herbes sous la peau du poulet.",
            "Rôtir au four pendant 50-60 minutes ou jusqu'à ce que le jus soit clair lorsqu'on perce la cuisse.",
            "Laisser reposer 10 minutes avant de découper."
        ]
    },
    {
        id: 10,
        name: "Salade de concombre et tomate",
        image: "Salade.jpg",
        time: "10 min",
        difficulty: "Très facile",
        tags: ["Salade", "Entrée", "Végétarien"],
        ingredients: ["concombre", "tomate", "oignon rouge", "feta", "huile d'olive", "vinaigre", "sel", "poivre"],
        instructions: [
            "Laver et couper le concombre et les tomates en dés.",
            "Émincer finement l'oignon rouge.",
            "Émietter la feta.",
            "Mélanger tous les ingrédients dans un saladier.",
            "Assaisonner avec de l'huile d'olive, du vinaigre, du sel et du poivre.",
            "Servir frais."
        ]
    },
    {
        id: 11,
        name: "ojja tunisienne  ",
        image: "ojja.jpg",
        time: "25 min",
        difficulty:"Très facile",
        tags: ["tunisienne","traditionnel", "facile","piquante"],
        ingredients:["poivron","oignon","tomate","poivre","sel","harrissa","ail","oeuf","huile d'olive","tomate concentrée","coriandre en poudre"],
        instructions:[
            "Faites chauffer une grande quantité d'huile d'olive (de façon à ce que le fond de la casserole soit recouvert.",
            "Découpez l'oignon en lamelles et hachez l'ail.",
            "Faites revenir le tout sur feu moyen avec la coriandre, le sel, le poivre, la harissa et le concentré de tomates.",
            "Une fois qu'une odeur chaude et enrobante se dégage,  ajouterez les poivrons et tomates coupées assez grossièrement (pas trop tout de même) et de l'eau (il faut que le tout soit couvert à moitié).",
            "Laissez mijoter une vingtaine de minutes à feu doux puis, augmentant le feu, cassez les oeufs dans la casserole, mais attention! Ne mélangez pas! Laissez cuire encore 10 min environ. Servez bien chaud."
        ]
        
    },
    {
        id: 12,
        name: "Couscous tunisien",
        image: "couscous-minute-au-poulet.jpeg",
        time: "60 min",
        difficulty: "Moyen",
        tags: ["Tunisien", "Traditionnel", "Complet"],
        ingredients: ["semoule", "agneau", "poulet", "carotte", "courgette", "pois chiches", "navet", "harissa", "huile d'olive", "tomate concentrée", "oignon", "sel", "poivre", "épices à couscous"],
        instructions: [
            "Faire revenir l’oignon et la viande dans l’huile d’olive avec les épices.",
            "Ajouter la tomate concentrée, la harissa et un peu d’eau.",
            "Ajouter les légumes et couvrir d’eau.",
            "Laisser cuire 30 minutes, puis ajouter les pois chiches.",
            "Préparer la semoule de couscous à la vapeur.",
            "Servir la semoule arrosée de sauce et accompagnée de viande et légumes."
        ]
    },
    {
        id: 13,
        name: "Tajine malsouka",
        image: "tajine_malsouka.jpg",
        time: "45 min",
        difficulty: "Facile",
        tags: ["Tunisien", "Entrée", "Four"],
        ingredients: ["feuilles de malsouka", "poulet", "œuf", "fromage", "pomme de terre", "persil", "sel", "poivre", "huile d'olive"],
        instructions: [
            "Cuire le poulet et l’effilocher.",
            "Faire cuire les pommes de terre en dés.",
            "Mélanger le tout avec œufs battus, fromage, persil, sel et poivre.",
            "Tapisser un moule de feuilles de malsouka huilées.",
            "Verser le mélange et recouvrir de feuilles.",
            "Cuire au four 30 minutes à 180°C jusqu’à dorure."
        ]
    },
    {
        id: 14,
        name: "Brik à l'œuf",
        image: "brik.jpg",
        time: "15 min",
        difficulty: "Facile",
        tags: ["Tunisien", "Entrée", "Rapide", "Friture"],
        ingredients: ["feuille de brick", "œuf", "thon", "persil", "câpres", "sel", "poivre", "huile de friture"],
        instructions: [
            "Déposer du thon, du persil et un œuf au centre d’une feuille de brick.",
            "Ajouter des câpres, sel et poivre.",
            "Plier en triangle ou demi-lune.",
            "Faire frire dans l’huile chaude jusqu’à ce que ce soit doré.",
            "Servir chaud avec citron."
        ]
    },
    {
        id: 15,
        name: "Lablabi",
        image: "lablb.jpg",
        time: "20 min",
        difficulty: "Très facile",
        tags: ["Tunisien", "Petit-déjeuner", "Rapide"],
        ingredients: ["pois chiches cuits", "eau", "harissa", "ail", "cumin", "sel", "pain rassis", "œuf", "huile d'olive", "citron"],
        instructions: [
            "Faire chauffer les pois chiches avec de l’eau, l’ail, le sel et le cumin.",
            "Dans un bol, mettre du pain rassis coupé en morceaux.",
            "Verser les pois chiches avec un peu de bouillon.",
            "Ajouter de la harissa, un œuf cru (optionnel), un filet d’huile d’olive et du jus de citron.",
            "Mélanger et servir chaud."
        ]
    },
    {
        id: 16,
        name: "Kamounia",
        image: "kamounia.jpg",
        time: "40 min",
        difficulty: "Facile",
        tags: ["Tunisien", "Traditionnel", "Épicé"],
        ingredients: ["foie de bœuf", "ail", "cumin", "huile d'olive", "piment", "sel", "poivre", "eau", "tomate concentrée"],
        instructions: [
            "Couper le foie en petits morceaux.",
            "Faire revenir l’ail et le piment dans l’huile d’olive.",
            "Ajouter le foie, le sel, le poivre et le cumin.",
            "Ajouter un peu de tomate concentrée diluée dans l’eau.",
            "Laisser mijoter 30 minutes jusqu’à réduction de la sauce.",
            "Servir chaud avec du pain."
        ]
    },
    {
        id: 17,
        name: "Makrouna bel salsa",
        image: "makrouna.jpg",
        time: "30 min",
        difficulty: "Facile",
        tags: ["Tunisien", "Pâtes", "Épicé", "Familial"],
        ingredients: ["pâtes", "viande hachée ou morceaux de viande", "oignon", "ail", "huile d'olive", "tomate concentrée", "harissa", "sel", "poivre", "épices", "eau"],
        instructions: [
            "Faire revenir l’oignon haché et l’ail dans l’huile d’olive.",
            "Ajouter la viande, le sel, le poivre et les épices, puis faire dorer.",
            "Incorporer la harissa et la tomate concentrée, bien mélanger.",
            "Ajouter de l’eau et laisser mijoter 20 à 25 min.",
            "Cuire les pâtes séparément, puis les mélanger à la sauce.",
            "Servir chaud, éventuellement avec un œuf dur ou du fromage râpé."
        ]
    },
    
    {
        id: 18,
        name: "Fricassé tunisien",
        image: "fricasse.jpg",
        time: "90 min",
        difficulty: "Moyen",
        tags: ["Tunisien", "Street food", "Friture"],
        ingredients: ["farine", "levure boulangère", "eau tiède", "sucre", "sel", "huile de friture", "thon", "pomme de terre", "œuf dur", "olives", "harissa"],
        instructions: [
            "Préparer une pâte avec la farine, la levure, l’eau, le sucre et le sel. Laisser lever 1h.",
            "Former des petits pains ovales et les faire frire jusqu’à dorure.",
            "Ouvrir les pains et les garnir de pomme de terre cuite, œuf dur, thon, olives et harissa.",
            "Servir tiède."
        ]
    }
    
    
        
];
