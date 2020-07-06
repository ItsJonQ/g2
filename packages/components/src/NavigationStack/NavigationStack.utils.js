import { createContext, useContext } from 'react';

export const NavigationStackContext = createContext();
export const useNavigationStackContext = () =>
	useContext(NavigationStackContext);
