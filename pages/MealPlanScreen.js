// MealPlanScreen.js

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import RecipesAPI from '../api/RecipesAPI';
import storage from '../utils/storage';
import * as SQLite from 'expo-sqlite';

const useDatabase = () => {
    const db = SQLite.openDatabase('mealPlan1.db');
    // Initialization and usage in the component
    useEffect(() => {
        //const setupDB = async () => {
        //storage.initDB(db);  // Ensure DB is set up before fetching/displaying data
        //};
        //setupDB();
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS meal_plans (id INTEGER PRIMARY KEY NOT NULL, plan TEXT NOT NULL);',
                [],
                () => console.log('Table created successfully'),
                (_, error) => console.log('Error creating table: ', error)
            );
        }, (error) => {
            console.log('Transaction error during table creation: ', error);
        }, () => {
            console.log('Table creation transaction successful');
        });
    }, []);

    return { db };
}

const fetchAndDisplayMealPlan = () => {
    const mealPlan = null;
    useEffect(() => {
        callAPI = async () => {

        }
    });
    return { mealPlan };
};

const MealPlanScreen = ({ navigation }) => {
    const [mealPlan, setMealPlan] = useState(null);
    const { db } = useDatabase();

    const fetchPlan = async () => {
        try {
            const fetchedMealPlan = await RecipesAPI.fetchWeeklyMealPlan();
            if (fetchedMealPlan && fetchedMealPlan.week) {
                console.log('Meal plan fetched and displayed', fetchedMealPlan.week);
                setMealPlan(fetchedMealPlan.week);
            } else {
                console.log('Failed to fetch meal plan or meal plan data is incorrect');
            }
        } catch (error) {
            console.error('Failed to fetch meal plan:', error);
        }
    }

    // Ensure save function waits for previous transactions
    const saveMealPlan = async (newMealPlan) => {
        if (newMealPlan) {
            await storage.saveMealPlan(newMealPlan, db).catch(error => {
                console.log('Error saving meal plan:', error);
            });
        } else {
            console.log('No meal plan to save');
        }
    };

    // Load with consideration for transaction completeness
    const loadMealPlan = async () => {
        try {
          const loadedPlan = await storage.loadMealPlan(db);
          if (loadedPlan !== null) {
            setMealPlan(loadedPlan);
            console.log('Meal plan loaded successfully');
          } else {
            console.log('No meal plan found in storage');
          }
        } catch (error) {
          console.log('Error loading meal plan:', error);
        }
      };

    if (!mealPlan || Object.keys(mealPlan).length === 0) {
        return <View>
            <View style={styles.buttonContainer}>
                <Button title="Fetch Weekly Meal Plan" color="#A9A9A9" onPress={fetchPlan} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Save Meal Plan" color="#686868" onPress={() => saveMealPlan(mealPlan)} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Load Meal Plan" color="black" onPress={loadMealPlan} />
            </View>
        </View>
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Fetch Weekly Meal Plan" color="black" onPress={fetchPlan} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Save Meal Plan" color="black" onPress={() => saveMealPlan(mealPlan)} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Load Meal Plan" color="black" onPress={loadMealPlan} />
            </View>
            {Object.keys(mealPlan).map(day => (
                <View key={day} style={styles.dayContainer}>
                    <Text style={styles.heading}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                    {mealPlan[day].meals.map((meal, idx) => (
                        <View key={idx} style={styles.mealPlanContainer}>
                            <Text style={styles.subHeading}>{meal.title}</Text>
                            <Text>Calories: {mealPlan[day].nutrients.calories.toFixed(2)} cal</Text>
                        </View>
                    ))}
                </View>
            ))}
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
    buttonContainer: {
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        width: '80%',  // Set width to 80% of the container width
        alignSelf: 'center'  // Center the button within the container
    },
    buttonText: {
        color: 'white',
        padding: 10,
        textAlign: 'center'
    }
});

export default MealPlanScreen;
