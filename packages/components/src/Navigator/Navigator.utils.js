import { createContext, useContext } from 'react';

export { useHistory, useLocation } from './Router';

export const NavigatorContext = createContext({});
export const useNavigatorContext = () => useContext(NavigatorContext);
