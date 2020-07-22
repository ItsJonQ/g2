import { ThemeProvider, useTheme } from '@wp-g2/styled-components';
import { isEmpty } from '@wp-g2/utils';
import deepmerge from 'deepmerge';
import React, { createContext, useContext } from 'react';

export const ComponentsContext = createContext({});
export const useComponentsContext = () => useContext(ComponentsContext);

export function ComponentsProvider({ children, theme = {}, value = {} }) {
	const parentComponentsContext = useComponentsContext();
	const mergedThemeProps = { ...useTheme(), ...theme };

	let mergedValues = value;

	if (!isEmpty(parentComponentsContext)) {
		mergedValues = deepmerge(parentComponentsContext, value);
	}

	return (
		<ComponentsContext.Provider value={mergedValues}>
			<ThemeProvider theme={mergedThemeProps}>{children}</ThemeProvider>
		</ComponentsContext.Provider>
	);
}
