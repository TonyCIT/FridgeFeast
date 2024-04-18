// src/pages/Home.js

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import SearchForm from '../components/SearchForm';
import RecipeCard from '../components/RecipeCard';
import RecipesAPI from '../api/RecipesAPI';

const Home = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query) => {
    try {
      const fetchedRecipes = await RecipesAPI.fetchRecipes(query);
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleRecipePress = (recipeId) => {

    navigation.navigate('RecipeDetail', { recipeId: recipeId });
    
  };
  
  const handleSurpriseMe = async () => {
    try {
      const randomRecipes = await RecipesAPI.fetchRandomRecipes();
      if (randomRecipes.length > 0) {
        const randomRecipeId = randomRecipes[0].id;
        navigation.navigate('RecipeDetail', { recipeId: randomRecipeId });
      }
    } catch (error) {
      console.error('Error fetching random recipes:', error);
    }
  };
  
  const handleWeekMeal = () => {
    navigation.navigate('MealPlanScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipe Finder</Text>
      <SearchForm onSubmit={handleSearch} onSurprise={handleSurpriseMe} onWeekMeal={handleWeekMeal} navigation={navigation} />
      <ScrollView style={styles.recipeList}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id.toString()}
            recipe={recipe}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
            // onPress={() => handleRecipePress(recipe.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: 25, // Add top padding
    paddingBottom: 2, // Add bottom padding
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeList: {
    width: '100%',
  },
  // Add other styles as needed
});

export default Home;
