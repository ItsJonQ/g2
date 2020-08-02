import { createContext, useContext } from 'react';

export const FlexContext = createContext({});
export const useFlexContext = () => useContext(FlexContext);
