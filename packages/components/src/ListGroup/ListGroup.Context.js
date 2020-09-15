import { createContext, useContext } from 'react';

export const ListGroupContext = createContext({});
export const useListGroupContext = () => useContext(ListGroupContext);
