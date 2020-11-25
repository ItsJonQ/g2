import { createContext, useContext } from 'react';

/** @type {import('react').Context<import('./types').ControlGroupContext>} */
export const ControlGroupContext = createContext({});
export const useControlGroupContext = () => useContext(ControlGroupContext);
