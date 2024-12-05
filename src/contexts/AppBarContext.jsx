'use client';

import React, { createContext, useState, useContext } from 'react';

const AppBarContext = createContext();

export const AppBarProvider = ({ children }) => {
    const [appBarContent, setAppBarContent] = useState(null);
    const [searchBar, setSearchBar] = useState(null);

    return (
        <AppBarContext.Provider value={{ appBarContent, setAppBarContent, searchBar, setSearchBar }}>
            {children}
        </AppBarContext.Provider>
    );
};

export const useAppBar = () => useContext(AppBarContext);
