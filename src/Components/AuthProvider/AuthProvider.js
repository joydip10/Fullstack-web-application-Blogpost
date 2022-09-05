import React, { createContext } from 'react';
import useFirebase from '../../Hooks/useFirebase';
export const context=createContext('');

const AuthProvider = ({children}) => {
    const values= useFirebase();
    return (
        <context.Provider value={values}>
            {children}
        </context.Provider>
    );
};

export default AuthProvider;