import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { clearCookie } from "../Api/auth";



// import { clearCookie } from '../Api/Auth';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // const logOut = async () => {
  //   setLoading(true)
  //   await clearCookie()
  //   return signOut(auth)
  // }
  const currentUser = (accessToken) => {
   try {
    const decoded = jwtDecode(accessToken);   
      setUser(decoded)
      // Save the token to localStorage
      localStorage.setItem('token', accessToken);
      setLoading(false)
   } catch (error) {
    console.error('Token decoding error:', error.message);
   }
  }
  
  const logOut = async() => {
    setLoading(true)
    // Clear user information when logging out
    setUser(null);
    await clearCookie()
    localStorage.removeItem('token');
  };

  // onAuthStateChange
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      currentUser(storedToken);
      setLoading(false)
    }
  }, []);

  const authInfo = {
    user,
    loading,
    currentUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
