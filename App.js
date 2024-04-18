// src/App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import MealPlanScreen from './pages/MealPlanScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          contentStyle: { paddingTop: 2, paddingBottom: 2 }
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetail} 
          options={{ title: 'Recipe Detail' }}
        />
        <Stack.Screen 
          name="MealPlanScreen" 
          component={MealPlanScreen} 
          options={{ title: 'Meal Plan' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
