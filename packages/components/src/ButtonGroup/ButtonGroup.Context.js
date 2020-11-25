import { createContext, useContext } from 'react';

/** @type {import('./types').ButtonGroupContext} */
const defaultContext = {};

export const ButtonGroupContext = createContext(defaultContext);
export const useButtonGroupContext = () => useContext(ButtonGroupContext);
