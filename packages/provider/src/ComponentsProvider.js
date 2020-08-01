import { ThemeProvider } from '@wp-g2/styles';
import { deepMerge, isEmpty } from '@wp-g2/utils';
import React, { createContext, useContext } from 'react';

export const ComponentsContext = createContext({});
export const useComponentsContext = () => useContext(ComponentsContext);

export function ComponentsProvider({ children, theme = {}, value = {} }) {
	const parentComponentsContext = useComponentsContext();

	let mergedValues = value;

	if (!isEmpty(parentComponentsContext)) {
		mergedValues = deepMerge(parentComponentsContext, value);
	}

	return (
		<ComponentsContext.Provider value={mergedValues}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ComponentsContext.Provider>
	);
}
