import { createContext, useContext } from 'react';

export const PopoverContext = createContext({});
export const usePopoverContext = () => useContext(PopoverContext);
