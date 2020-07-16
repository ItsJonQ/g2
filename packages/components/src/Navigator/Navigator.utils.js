import { createContext, useContext } from 'react';

export { useHistory, useLocation } from 'react-router-dom';

export const NavigatorContext = createContext({});
export const useNavigatorContext = () => useContext(NavigatorContext);

export const NAVIGATOR_KEY = 'Nvg8R';
