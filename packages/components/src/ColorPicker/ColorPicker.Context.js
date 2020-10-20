import { createContext, useContext } from 'react';

export const ColorPickerContext = createContext({});
export const useColorPickerContext = () => useContext(ColorPickerContext);
