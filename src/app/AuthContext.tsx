import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<null | string>(null);

    // Fungsi untuk mengatur token
    function setAuth(token: string | null) {
        setToken(token);
    }

    return (
        <AuthContext.Provider value={{ token, setAuth } as any}>
            {children}
        </AuthContext.Provider>
    );
}
