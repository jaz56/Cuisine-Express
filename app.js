// DOM elements
const ingredientInput = document.getElementById('ingredient-input');
const addIngredientBtn = document.getElementById('add-ingredient');
const randomRecipeBtn = document.getElementById('random-recipe');
const ingredientsTags = document.getElementById('ingredients-tags');
const recipesContainer = document.getElementById('recipes-container');
const noResults = document.getElementById('no-results');
const recipeModal = document.getElementById('recipe-modal');
const closeModal = document.getElementById('close-modal');
const modalContent = document.getElementById('modal-recipe-content');
const toggleThemeBtn = document.getElementById('toggle-theme');
const autocompleteSuggestions = document.getElementById('autocomplete-suggestions');
const searchInput = document.getElementById('recipe-search-input');
const searchBtn = document.getElementById('search-recipe-btn');
const suggestedRecipesContainer = document.getElementById('suggested-recipes-container');
const recipeSuggestionsContainer = document.getElementById('recipe-name-suggestions');


// User ingredients array
let userIngredients = [];

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    addIngredientBtn.addEventListener('click', addIngredient);
    
    
    ingredientInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addIngredient();
        }
    });
    randomRecipeBtn.addEventListener('click', showRandomRecipe);
    closeModal.addEventListener('click', () => {
        recipeModal.style.display = 'none';
    });
    toggleThemeBtn.addEventListener('click', toggleTheme);
    ingredientInput.addEventListener('input', showAutocompleteSuggestions);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === recipeModal) {
            recipeModal.style.display = 'none';
        }
    });

    // Hide autocomplete when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (e.target !== ingredientInput && e.target !== autocompleteSuggestions) {
            autocompleteSuggestions.style.display = 'none';
        }
    });

    // Initialize recipe display
    updateRecipes();

    // Load saved ingredients from localStorage if available
    loadSavedIngredients();
});
document.addEventListener('DOMContentLoaded', () => {
    // ... vos autres événements existants ...
    
    // Ajouter l'événement d'écoute pour les suggestions de recettes
    searchInput.addEventListener('input', handleRecipeSuggestions);
    
    // Fermer les suggestions quand on clique ailleurs
    document.addEventListener('click', (e) => {
        if (e.target !== searchInput && e.target !== recipeSuggestionsContainer) {
            recipeSuggestionsContainer.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    addIngredientBtn.addEventListener('click', addIngredient);
    ingredientInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addIngredient();
        }
    });
    randomRecipeBtn.addEventListener('click', showRandomRecipe);
    closeModal.addEventListener('click', () => {
        recipeModal.style.display = 'none';
    });
    toggleThemeBtn.addEventListener('click', toggleTheme);
    ingredientInput.addEventListener('input', showAutocompleteSuggestions);
    searchInput.addEventListener('input', handleRecipeSuggestions);
    
    // Fermer le modal lorsqu'on clique à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === recipeModal) {
            recipeModal.style.display = 'none';
        }
    });

    // Masquer l'autocomplétion lorsqu'on clique ailleurs
    document.addEventListener('click', (e) => {
        if (e.target !== ingredientInput && e.target !== autocompleteSuggestions) {
            autocompleteSuggestions.style.display = 'none';
        }
        if (e.target !== searchInput && e.target !== recipeSuggestionsContainer) {
            recipeSuggestionsContainer.style.display = 'none';
        }
    });

    // Charger les ingrédients sauvegardés du localStorage si disponibles
    loadSavedIngredients();
    
    // Afficher toutes les recettes au démarrage
    displayAllRecipes();
});
searchBtn.addEventListener('click', handleRecipeSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleRecipeSearch();
    }
});

searchInput.addEventListener('input', handleRecipeSuggestions);
// Add ingredient to the list
function addIngredient() {
    const ingredient = ingredientInput.value.trim().toLowerCase();
    if (ingredient && !userIngredients.includes(ingredient)) {
        userIngredients.push(ingredient);
        renderIngredientTags();
        updateRecipes();
        ingredientInput.value = '';
        autocompleteSuggestions.style.display = 'none';
        
        // Save to localStorage
        saveIngredients();
    }
}

// Render ingredient tags
function renderIngredientTags() {
    ingredientsTags.innerHTML = '';
    userIngredients.forEach(ingredient => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
            ${ingredient}
            <span class="tag-delete" data-ingredient="${ingredient}">×</span>
        `;
        ingredientsTags.appendChild(tag);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.tag-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ingredientToRemove = e.target.getAttribute('data-ingredient');
            userIngredients = userIngredients.filter(ing => ing !== ingredientToRemove);
            renderIngredientTags();
            updateRecipes();
            
            // Save to localStorage
            saveIngredients();
        });
    });
}

// Update recipes based on user ingredients
function updateRecipes() {
    // Supprimer les cartes de recettes existantes
    const existingCards = document.querySelectorAll('.recipe-card');
    existingCards.forEach(card => card.remove());
    
    // Si aucun ingrédient n'est sélectionné, afficher toutes les recettes
    if (userIngredients.length === 0) {
        displayAllRecipes();
        return;
    }
    
    // Filtrer les recettes
    const matchingRecipes = recipeDatabase.filter(recipe => {
        return recipe.ingredients.every(ingredient => 
            userIngredients.some(userIng => ingredient.includes(userIng))
        );
    });
    
    // Trouver les recettes auxquelles il manque un seul ingrédient
    const almostMatchingRecipes = recipeDatabase.filter(recipe => {
        if (matchingRecipes.includes(recipe)) return false;
        
        const missingIngredientsCount = recipe.ingredients.filter(ingredient => 
            !userIngredients.some(userIng => ingredient.includes(userIng))
        ).length;
        
        return missingIngredientsCount === 1;
    });
    
    // Afficher les résultats
    if (matchingRecipes.length === 0 && almostMatchingRecipes.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        
        // Afficher les recettes correspondantes
        matchingRecipes.forEach(recipe => {
            displayRecipeCard(recipe, false);
        });
        
        // Afficher les recettes presque correspondantes
        almostMatchingRecipes.forEach(recipe => {
            const missingIngredient = recipe.ingredients.find(ingredient => 
                !userIngredients.some(userIng => ingredient.includes(userIng))
            );
            displayRecipeCard(recipe, true, missingIngredient);
        });
    }
}

//research bannier
function handleRecipeSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        updateRecipes(); // fallback to ingredient-based search
        return;
    }

    // Remove existing recipe cards
    const existingCards = document.querySelectorAll('.recipe-card');
    existingCards.forEach(card => card.remove());

    const matchingRecipes = recipeDatabase.filter(recipe =>
        recipe.name.toLowerCase().includes(query)
    );

    if (matchingRecipes.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        matchingRecipes.forEach(recipe => displayRecipeCard(recipe));
    }
}


// Display a recipe card
function displayRecipeCard(recipe, isMissing = false, missingIngredient = null) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    if (isMissing) {
        card.classList.add('missing-ingredient');
    }
    
    card.innerHTML = `
        <div class="recipe-image-container">
           <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        </div>
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.name}</h3>
            <div class="recipe-tags">
                <span class="recipe-tag">${recipe.time}</span>
                <span class="recipe-tag">${recipe.difficulty}</span>
                ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
            </div>
            ${isMissing ? `<p><em>Il vous manque: ${missingIngredient}</em></p>` : ''}
            <button class="view-btn" data-recipe-id="${recipe.id}">Voir la recette</button>
        </div>
    `;
    
    recipesContainer.appendChild(card);
    
    // Add event listener to view button
    card.querySelector('.view-btn').addEventListener('click', () => {
        showRecipeDetails(recipe);
    });
}

// Show recipe details in modal
function showRecipeDetails(recipe) {
    modalContent.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="modal-recipe-img">
        <h2>${recipe.name}</h2>
        <div class="recipe-tags">
            <span class="recipe-tag">${recipe.time}</span>
            <span class="recipe-tag">${recipe.difficulty}</span>
            ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
        </div>
        <div class="modal-recipe-details">
            <div class="modal-ingredients">
                <h3>Ingrédients</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => `
                        <li>${ingredient}</li>
                    `).join('')}
                </ul>
            </div>
            <div class="modal-instructions">
                <h3>Instructions</h3>
                <div class="instructions-list">
                    ${recipe.instructions.map((step, index) => `
                        <div class="instruction-step">
                            <span class="instruction-step-number">${index + 1}</span>
                            <div class="instruction-text">
                              ${step}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    recipeModal.style.display = 'block';
}

// Show random recipe based on available ingredients
function showRandomRecipe() {
    if (userIngredients.length === 0) {
        alert("Veuillez ajouter des ingrédients d'abord!");
        return;
    }
    
    // Filter recipes that match user ingredients
    const matchingRecipes = recipeDatabase.filter(recipe => {
        return recipe.ingredients.every(ingredient => 
            userIngredients.some(userIng => ingredient.includes(userIng))
        );
    });
    
    // If no exact matches, try recipes missing only one ingredient
    let recipesToChooseFrom = matchingRecipes.length > 0 ? matchingRecipes : recipeDatabase.filter(recipe => {
        const missingIngredientsCount = recipe.ingredients.filter(ingredient => 
            !userIngredients.some(userIng => ingredient.includes(userIng))
        ).length;
        
        return missingIngredientsCount === 1;
    });
    
    if (recipesToChooseFrom.length === 0) {
        alert("Aucune recette ne correspond à vos ingrédients. Essayez d'en ajouter plus!");
        return;
    }
    
    // Select a random recipe
    const randomIndex = Math.floor(Math.random() * recipesToChooseFrom.length);
    const randomRecipe = recipesToChooseFrom[randomIndex];
    
    // Show recipe details
    showRecipeDetails(randomRecipe);
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    toggleThemeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Show autocomplete suggestions
function showAutocompleteSuggestions() {
    const input = ingredientInput.value.toLowerCase();
    
    if (input.length < 2) {
        autocompleteSuggestions.style.display = 'none';
        return;
    }
    
    const matches = commonIngredients.filter(ingredient => 
        ingredient.toLowerCase().includes(input) && !userIngredients.includes(ingredient)
    );
    
    if (matches.length === 0) {
        autocompleteSuggestions.style.display = 'none';
        return;
    }
    
    autocompleteSuggestions.innerHTML = '';
    matches.slice(0, 5).forEach(match => {
        const suggestion = document.createElement('div');
        suggestion.className = 'autocomplete-suggestion';
        suggestion.textContent = match;
        suggestion.addEventListener('click', () => {
            ingredientInput.value = match;
            autocompleteSuggestions.style.display = 'none';
            addIngredient();
        });
        autocompleteSuggestions.appendChild(suggestion);
    });
    
    autocompleteSuggestions.style.display = 'block';
}
function handleRecipeSuggestions() {
    const query = searchInput.value.trim().toLowerCase();
    recipeSuggestionsContainer.innerHTML = '';
    
    if (query.length === 0) {
        recipeSuggestionsContainer.style.display = 'none';
        return;
    }
    
    const filteredRecipes = recipeDatabase.filter(recipe =>
        recipe.name.toLowerCase().includes(query)
    );
    
    // Afficher jusqu'à 5 suggestions dans la liste déroulante
    filteredRecipes.slice(0, 5).forEach(recipe => {
        const div = document.createElement('div');
        div.textContent = recipe.name;
        div.classList.add('suggestion-item');
        
        div.addEventListener('click', () => {
            searchInput.value = recipe.name;
            recipeSuggestionsContainer.style.display = 'none';
            handleRecipeSearch(); // Déclencher la recherche directement
        });
        
        recipeSuggestionsContainer.appendChild(div);
    });
    
    // Afficher les suggestions seulement s'il y en a
    recipeSuggestionsContainer.style.display = filteredRecipes.length > 0 ? 'block' : 'none';
}
function displayAllRecipes() {
    // Vider le conteneur de recettes
    recipesContainer.innerHTML = '';
    
    // Masquer le message "Aucune recette trouvée"
    noResults.style.display = 'none';
    
    // Afficher toutes les recettes de la base de données
    recipeDatabase.forEach(recipe => {
        displayRecipeCard(recipe);
    });
}
