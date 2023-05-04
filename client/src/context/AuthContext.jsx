import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(null);

    let loginUser = async (event) => {
        let response = await fetch("https://scisco.onrender.com/users/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: null,
                password: null,
            }),
        });
    };

    let contextData;

    return (
        <AuthContext.Provider value={{ name: "Bhavik" }}>
            {children}
        </AuthContext.Provider>
    );
};
