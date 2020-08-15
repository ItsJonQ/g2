import { createContext, useContext } from 'react';

export const CheckboxGroupContext = createContext({ checkbox: {} });
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
