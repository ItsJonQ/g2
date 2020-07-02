import { ThemeProvider, useTheme } from '@g2/css';
import React, { createContext, useContext } from 'react';

export const ComponentsContext = createContext({});
export const useComponentsContext = () => useContext(ComponentsContext);

export function ComponentsProvider({ children, theme = {}, value = {} }) {
	const mergedThemeProps = { ...useTheme(), ...theme };

	return (
		<ComponentsContext.Provider value={value}>
			<ThemeProvider theme={mergedThemeProps}>{children}</ThemeProvider>
		</ComponentsContext.Provider>
	);
}
