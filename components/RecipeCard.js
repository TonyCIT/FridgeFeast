// src/components/RecipeCard.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeCard = ({ recipe, onPress }) => {
  // Function to format number with commas for better readability
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Check if onPress is a function before trying to call it
  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress(recipe.id);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.recipeCard}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.likes}>{formatNumber(recipe.likes)} likes</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    margin: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  likes: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  // Add more styles as needed
});

export default RecipeCard;
