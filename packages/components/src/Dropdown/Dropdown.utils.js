import { createContext, useContext } from 'react';

export const DropdownContext = createContext();
export const useDropdownContext = () => useContext(DropdownContext);
