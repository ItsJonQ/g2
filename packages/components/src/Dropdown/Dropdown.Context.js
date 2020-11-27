import { createContext, useContext } from 'react';

/** @type {import('react').Context<{ menu?: import('reakit').MenuStateReturn }>} */
export const DropdownContext = createContext({});
export const useDropdownContext = () => useContext(DropdownContext);
