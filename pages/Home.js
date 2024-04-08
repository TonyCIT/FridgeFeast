// src/pages/Home.js

import React from 'react';
import SearchForm from '../components/SearchForm';
import SurpriseMeButton from '../components/SurpriseMeButton';

const Home = () => {
  const handleSearch = (query) => {
    // Handle search logic here
    console.log('Searching for:', query);
  };

  const handleSurpriseMe = () => {
    // Handle "Surprise Me!" logic here
    console.log('Surprise me!');
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <SearchForm onSubmit={handleSearch} />
      <SurpriseMeButton onClick={handleSurpriseMe} />
    </div>
  );
};

export default Home;
