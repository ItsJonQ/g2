import { createContext, useContext } from 'react';

export const CollapsibleContext = createContext({});
export const useCollapsibleContext = () => useContext(CollapsibleContext);
