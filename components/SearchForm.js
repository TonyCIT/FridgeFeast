// src/components/SearchForm.js

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchForm = ({ onSubmit, onSurprise, onFetchMealPlan, onViewMealPlan }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    onSubmit(query);
    setQuery('');
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.buttonRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Enter ingredients..."
          style={styles.input}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSurprise} style={styles.button}>
          <Text style={styles.buttonText}>Surprise Me!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={onFetchMealPlan} style={styles.button}>
          <Text style={styles.buttonText}>Fetch Weekly Meal Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onViewMealPlan} style={styles.button}>
          <Text style={styles.buttonText}>View Weekly Meal Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// return (
//   <View style={styles.container}>
//     <TextInput
//       value={query}
//       onChangeText={setQuery}
//       placeholder="Enter ingredients..."
//       style={styles.input}
//     />
//     <View style={styles.buttonContainer}>
//       <TouchableOpacity onPress={handleSubmit} style={styles.button}>
//         <Text style={styles.buttonText}>Search</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={onSurprise} style={styles.button}>
//         <Text style={styles.buttonText}>Surprise Me!</Text>
//       </TouchableOpacity>
//     </View>
//     <View style={styles.buttonContainer}>
//       <TouchableOpacity onPress={onFetchMealPlan} style={styles.button}>
//         <Text style={styles.buttonText}>Fetch Weekly Meal Plan</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('MealPlanScreen')} style={styles.button}>
//         <Text style={styles.buttonText}>View Weekly Meal Plan</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );
// };

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'culomn',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#A9A9A9', // A grey color
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20, // Rounded edges
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start', // Align to the start of flex container
    marginHorizontal: 5,
    marginBottom: 10, // Space between buttons
  },
  buttonText: {
    color: '#FFFFFF', // White color for the text
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchForm;
