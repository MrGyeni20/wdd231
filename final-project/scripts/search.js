document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-search-form');
    const resultsContainer = document.getElementById('search-results');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const query = document.getElementById('search-input')?.value.trim();
        if (!query) {
            resultsContainer.innerHTML = '<p class="error">Please enter a search term.</p>';
            return;
        }

        resultsContainer.innerHTML = '<p class="loading">Loading...</p>';

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
            const data = await response.json();
            resultsContainer.innerHTML = '';

            if (!data.meals) {
                resultsContainer.innerHTML = '<p class="error">No recipes found. Try another search.</p>';
                return;
            }

            data.meals.forEach(meal => {
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <a href="detail-recipe.html?id=${meal.idMeal}" class="recipe-link">View Details</a>
                `;
                resultsContainer.appendChild(card);
            });
        } catch (err) {
            console.error('API Error:', err);
            resultsContainer.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
        }
    });
});
