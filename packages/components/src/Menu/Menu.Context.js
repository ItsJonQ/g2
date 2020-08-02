import { createContext, useContext } from 'react';

export const MenuContext = createContext({});
export const useMenuContext = () => useContext(MenuContext);
