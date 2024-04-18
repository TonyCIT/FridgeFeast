// src/api/RecipesAPI.js

const API_KEY = "53697ebc2b834e438e8abbb660d1e58d"; // Spoonacular API Key

// Function to fetch recipes based on provided ingredients
const fetchRecipes = async (ingredients) => {
  // Constructing the API URL with provided ingredients and API key
  const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=1&apiKey=${API_KEY}`;
  try {
      // Sending a request to the Spoonacular API
      const response = await fetch(apiUrl);
      // Parsing the response data as JSON
      const data = await response.json();
      // Logging the fetched data for debugging purposes
      console.log(data);
      // Returning the fetched data
      return data;
  } catch (error) {
      // Handling errors that occur during fetching
      console.error('Error fetching recipes:', error);
      // Throwing the error for further handling
      throw error;
  }
};

// Function to fetch a random recipe
const fetchRandomRecipes = async () => {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`);
    const data = await response.json();
    if (data && data.recipes && Array.isArray(data.recipes)) {
      return data.recipes;
    } else {
      console.error('Random recipes response is not an array:', data);
      return []; // Return an empty array to avoid further errors
    }
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return []; // Return an empty array to avoid further errors
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

// Function to fetch details of a recipe by its ID
const fetchRecipeDetails = async (id) => {
  // Constructing the URL to fetch recipe details using the provided ID and API key
  const detailUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
  try {
    // Sending a request to the Spoonacular API
    const response = await fetch(detailUrl);
    // Parsing the response data as JSON
    const details = await response.json();
    // Returning the fetched recipe details
    return details;
  } catch (error) {
    // Handling errors that occur during fetching
    console.error('Error fetching recipe details:', error);
    // Returning null in case of error
    throw error; 
  }
};

// Function to fetch a weekly meal plan
const fetchWeeklyMealPlan = async () => {
  // Constructing the URL to fetch a weekly meal plan with the provided time frame and API key
  const apiUrl = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&apiKey=${API_KEY}`;
  try {
    // Sending a request to the Spoonacular API
    const response = await fetch(apiUrl);
    // Parsing the response data as JSON
    const json = await response.json();
    console.log('API Response:', json);  // Log the full API response
    // Returning the fetched weekly meal plan
    return json;
  } catch (error) {
    // Handling errors that occur during fetching
    console.error('Error fetching weekly meal plan:', error);
    // Returning null in case of error
    return null;
  }
};



export default { fetchRecipes, fetchRandomRecipes, fetchRecipeDetails, fetchWeeklyMealPlan };
