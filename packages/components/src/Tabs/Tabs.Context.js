import { createContext, useContext } from 'react';

export const TabsContext = createContext({});
export const useTabsContext = () => useContext(TabsContext);
