//storage.js

import * as SQLite from 'expo-sqlite';

//const db = SQLite.openDatabase('mealPlan.db');

const initDB = (dataCon) => {
  const db = dataCon;
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
};

const saveMealPlan = async (mealPlan,dataCon) => {
  const db = dataCon;
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO meal_plans (plan) VALUES (?);',
        [JSON.stringify(mealPlan)],
        (_, result) => {
          console.log('Meal plan saved successfully');
          resolve(result);
        },
        (_, error) => {
          console.log('Error saving meal plan: ', error);
          reject(error);
        }
      );
    });
  });
};


const loadMealPlan = async (dataCon) => {
  const db = dataCon;
  db.transaction(tx => {
    tx.executeSql(
      'SELECT plan FROM meal_plans ORDER BY id DESC LIMIT 1;',
      [],
      (_, { rows }) => {
        if (rows.length > 0) {
          return JSON.parse(rows._array[0].plan);
        } else {
          console.log('No meal plan found');
          return null;
        }
      },
      (_, error) => console.log('Error loading meal plan: ', error)
    );
  }, (error) => {
    console.log('Transaction error during loading: ', error);
    // Optional: Implement retry mechanism here
  }, () => {
    console.log('Load transaction successful');
  });
};

export default { initDB, saveMealPlan, loadMealPlan };
