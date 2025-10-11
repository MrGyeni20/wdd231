document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('recipe-detail');
    const recipeId = new URLSearchParams(window.location.search).get('id');

    if (!recipeId) {
        container.innerHTML = '<p class="error">No recipe ID provided.</p>';
        return;
    }

    container.innerHTML = '<p class="loading">Loading recipe...</p>';

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await response.json();

        if (!data.meals || !data.meals[0]) {
            container.innerHTML = '<p class="error">Recipe not found.</p>';
            return;
        }

        const meal = data.meals[0];

        document.getElementById('recipe-title').textContent = meal.strMeal;
        document.getElementById('recipe-image').src = meal.strMealThumb;
        document.getElementById('recipe-image').alt = meal.strMeal;
        document.getElementById('recipe-category').textContent = meal.strCategory || 'N/A';
        document.getElementById('recipe-cuisine').textContent = meal.strArea || 'N/A';
        document.getElementById('recipe-tags').textContent = meal.strTags || 'None';

        const ingredientsList = document.getElementById('recipe-ingredients-list');
        ingredientsList.innerHTML = '';

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                const li = document.createElement('li');
                li.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(li);
            }
        }

        document.getElementById('recipe-instructions').textContent = meal.strInstructions || 'No instructions available.';
        const sourceLink = document.getElementById('recipe-source-link');
        sourceLink.href = meal.strSource || '#';
        sourceLink.textContent = meal.strSource ? 'Original Recipe' : 'No source available';
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        container.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
    }

});