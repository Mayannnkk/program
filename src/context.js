// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser , setCurrentUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  return (
    <>
    <UserContext.Provider value={{ setCurrentUser,currentUser , loading, error }}>
      {children}
    </UserContext.Provider>
    </>
  );
};

export { UserContext, UserProvider };