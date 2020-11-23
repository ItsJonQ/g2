import { createContext, useContext } from 'react';

export const ButtonGroupContext = createContext({});
export const useButtonGroupContext = () => useContext(ButtonGroupContext);
