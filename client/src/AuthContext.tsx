import React, { createContext, useContext, useState } from "react";

interface AuthProps {
  isLoggedIn: string;
  setIsLoggedIn: (isLoggedIn: string) => void;
}

const AuthContext = createContext<AuthProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedInState] = useState<string>(
    localStorage.getItem("isLoggedIn") || ""
  );

  const setIsLoggedIn = (value: string) => {
    localStorage.setItem("isLoggedIn", value);
    setIsLoggedInState(value);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Components should be inside the AuthProvider");
  }
  return context;
};
