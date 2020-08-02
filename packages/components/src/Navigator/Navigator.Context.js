import { createContext, useContext } from 'react';

export const NavigatorContext = createContext({});
export const useNavigatorContext = () => useContext(NavigatorContext);
