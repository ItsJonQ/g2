import { createContext, useContext } from 'react';

export const RadioGroupContext = createContext({ radio: {} });
export const useRadioGroupContext = () => useContext(RadioGroupContext);
