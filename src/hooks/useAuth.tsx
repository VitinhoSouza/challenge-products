import { createContext, ReactNode, useContext, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  auth: {
    token: string | null;
    name: string | null;
    image: string | null;
  };
  // eslint-disable-next-line no-unused-vars
  setAuthLS: (newAuth: any) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    name: localStorage.getItem("name"),
    image: localStorage.getItem("image"),
  });

  const setAuthLS = (newAuth: any) => {
    setAuth(newAuth);
    localStorage.setItem("token", newAuth.token);
    localStorage.setItem("name", newAuth.name);
    localStorage.setItem("image", newAuth.image);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuthLS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
