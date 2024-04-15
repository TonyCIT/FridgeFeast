// src/pages/MealPlanScreen.js
import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import RecipesAPI from '../api/RecipesAPI';
import storage from '../utils/storage';

const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState(null);

  const fetchAndSaveMealPlan = async () => {
    const fetchedMealPlan = await RecipesAPI.fetchWeeklyMealPlan();
    if (fetchedMealPlan) {
      storage.save('weeklyMealPlan', fetchedMealPlan);
      setMealPlan(fetchedMealPlan); // Optionally set to state for immediate display
      console.log('Meal plan saved and displayed');
    }
  };

  const loadMealPlan = () => {
    const savedMealPlan = storage.get('weeklyMealPlan');
    if (savedMealPlan) {
      setMealPlan(savedMealPlan);
      console.log('Meal plan loaded and displayed');
    } else {
      console.log('No saved meal plan found');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Fetch & Save Weekly Meal Plan" onPress={fetchAndSaveMealPlan} />
      <Button title="Load Saved Meal Plan" onPress={loadMealPlan} />
      {mealPlan && (
        <View style={styles.mealPlanContainer}>
          <Text style={styles.heading}>Weekly Meal Plan</Text>
          {/* Iterate through the meal plan details */}
          {mealPlan.week && Object.keys(mealPlan.week).map(day => (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.subHeading}>{day}</Text>
              {mealPlan.week[day].map((meal, index) => (
                <Text key={index} style={styles.mealText}>
                  Meal: {meal.title}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  mealPlanContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayContainer: {
    marginVertical: 10,
  },
  mealText: {
    fontSize: 16,
  },
});

export default MealPlanScreen;
