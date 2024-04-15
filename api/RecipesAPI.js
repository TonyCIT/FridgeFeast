// src/api/RecipesAPI.js

const API_KEY = "53697ebc2b834e438e8abbb660d1e58d"; // Spoonacular API Key

const fetchRecipes = async (ingredients) => {
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data); // You might want to handle this data (e.g., setting state) instead of just logging it
      return data; // Returning the fetched data
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  
};

const fetchRandomRecipes = async () => {
  const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.recipes; // Assuming the API response has a 'recipes' array
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return []; // Return an empty array in case of error
  }
};

// const fetchRandomRecipes = async () => {
//   const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`;
//   try {
//     const response = await fetch(apiUrl);
//     const json = await response.json();
//     if (json.code && json.code === 402) {
//       console.error('API quota limit reached:', json.message);
//       alert('Your daily points limit has been reached. Please try again tomorrow.');
//       return [];
//     }
//     if (json.recipes && Array.isArray(json.recipes)) {
//       return json.recipes;
//     } else {
//       console.error('Unexpected format for random recipes:', json);
//       return [];
//     }
//   } catch (error) {
//     console.error('Error fetching random recipes:', error);
//     return [];
//   }
// };

// const fetchRecipes = async (query) => {
//   const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${API_KEY}`;
//   try {
//     const response = await fetch(apiUrl);
//     const json = await response.json();
//     if (json.code && json.code === 402) {
//       console.error('API quota limit reached:', json.message);
//       alert('Your daily points limit has been reached. Please try again tomorrow.');
//       return [];
//     }
//     return json;
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     return [];
//   }
// };

const fetchRecipeDetails = async (id) => {
  const detailUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
  try {
    const response = await fetch(detailUrl);
    const details = await response.json();
    return details;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error; // You may want to handle this error state in your component
  }
};

const fetchWeeklyMealPlan = async () => {
  const apiUrl = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&apiKey=${API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching weekly meal plan:', error);
    return null;
  }
};


export default { fetchRecipes, fetchRandomRecipes, fetchRecipeDetails, fetchWeeklyMealPlan };
