// src/pages/RecipeDetail.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import RecipesAPI from '../api/RecipesAPI';
import storage from '../utils/storage';

const RecipeDetail = ({ route }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecipeDetails = async () => {
      setIsLoading(true);
      try {
        const details = await RecipesAPI.fetchRecipeDetails(recipeId);
        setRecipeDetails(details);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    getRecipeDetails();
  }, [recipeId]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView style={styles.container}>
      {recipeDetails ? (
        <>
          <Text style={styles.heading}>{recipeDetails.title}</Text>
          <Text style={styles.subHeading}>Summary:</Text>
          <Text>{recipeDetails.summary.replace(/<[^>]+>/g, '')}</Text>
          <Text style={styles.subHeading}>Servings:</Text>
          <Text>{recipeDetails.servings}</Text>
          <Text style={styles.subHeading}>Preparation time:</Text>
          <Text>{recipeDetails.readyInMinutes} minutes</Text>
          <Text style={styles.subHeading}>Instructions:</Text>
          <Text>{recipeDetails.instructions.replace(/<[^>]+>/g, '')}</Text>
        </>
      ) : (
        <Text>No details available.</Text>
      )}
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff', // Assuming you want a white background
    paddingTop: 2, // Add top padding
    paddingBottom: 2, // Add bottom padding
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 2,
  },
});

export default RecipeDetail;
