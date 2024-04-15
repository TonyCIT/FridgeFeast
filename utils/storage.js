// src/utils/storage.js

import storage from './storage';
import RecipesAPI from '../api/RecipesAPI';

const saveMealPlan = async () => {
  try {
    const mealPlan = await RecipesAPI.fetchWeeklyMealPlan();
    if (mealPlan) {
      storage.save('weeklyMealPlan', mealPlan);
      console.log('Meal plan saved!');
    } else {
      console.log('No meal plan to save');
    }
  } catch (error) {
    console.error('Error saving meal plan:', error);
  }
};

const loadMealPlan = () => {
  const mealPlan = storage.get('weeklyMealPlan');
  if (mealPlan) {
    console.log('Loaded meal plan:', mealPlan);
    return mealPlan;
  } else {
    console.log('No meal plan found');
    return null;
  }
};
