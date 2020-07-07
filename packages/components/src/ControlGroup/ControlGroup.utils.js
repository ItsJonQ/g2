import { createContext, useContext } from 'react';

export const ControlGroupContext = createContext({});
export const useControlGroupContext = () => useContext(ControlGroupContext);
