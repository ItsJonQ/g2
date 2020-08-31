import { ThemeProvider } from '@wp-g2/styles';
import { deepMerge, isEmpty } from '@wp-g2/utils';
import React, { createContext, useContext } from 'react';

export const ComponentsContext = createContext({});
export const useComponentsContext = () => useContext(ComponentsContext);

/**
 * A Provider component that can modify props for connected components within
 * the Context system.
 *
 * @example
 * ```jsx
 * <ComponentsProvider value={{ Button: { size: 'small' }}}>
 *   <Button>...</Button>
 * </ComponentsProvider>
 * ```
 *
 * @param {any} children Children to render.
 * @param {object} theme A theme to pass into the ThemeProvider from the Style system.
 * @param {object} value Props to render into connected components.
 * @returns {React.Component} A Provider wrapped component.
 */
export function ComponentsProvider({ children, theme = {}, value = {} }) {
	const parentComponentsContext = useComponentsContext();

	let mergedValues = value;

	/**
	 * Inheriting and resolving props from a potential parent ComponentsProvider.
	 * This model works similarly to CSS's cascading model.
	 */
	if (!isEmpty(parentComponentsContext)) {
		mergedValues = deepMerge(parentComponentsContext, value);
	}

	return (
		<ComponentsContext.Provider value={mergedValues}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ComponentsContext.Provider>
	);
}
