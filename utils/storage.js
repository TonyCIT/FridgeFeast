// src/utils/storage.js

const storage = {
    // Function to save data to local storage
    save: (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
    // Function to retrieve data from local storage
    get: (key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  };
  
  export default storage;
  