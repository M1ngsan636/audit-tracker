// src/providers.tsx
'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Add your authentication logic here

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};