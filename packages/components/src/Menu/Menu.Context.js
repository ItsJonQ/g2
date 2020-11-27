import { createContext, useContext } from 'react';

/** @type {import('react').Context<{ menu?: import('reakit').MenuStateReturn }>} */
export const MenuContext = createContext({});
export const useMenuContext = () => useContext(MenuContext);
