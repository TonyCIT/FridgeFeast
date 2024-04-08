// src/components/RecipeCard.js

import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      {/* Display recipe details */}
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
    </div>
  );
};

export default RecipeCard;
