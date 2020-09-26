import { deepEqual, deepMerge, isEmpty } from '@wp-g2/utils';
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

export const ComponentsContext = createContext({});
export const useComponentsContext = () => useContext(ComponentsContext);

/**
 * A Provider component that can modify props for connected components within
 * the Context system.
 *
 * @example
 * ```jsx
 * <ContextSystemProvider value={{ Button: { size: 'small' }}}>
 *   <Button>...</Button>
 * </ContextSystemProvider>
 * ```
 *
 * @param {any} children Children to render.
 * @param {boolean} shallow Determines if the Provider should merge a parent Provider's context value.
 * @param {object} value Props to render into connected components.
 * @returns {React.Component} A Provider wrapped component.
 */
export const ContextSystemProvider = React.memo(
	({ children, shallow = false, value }) => {
		const contextValue = useComponentsContextValue({ shallow, value });

		return (
			<ComponentsContext.Provider value={contextValue}>
				{children}
			</ComponentsContext.Provider>
		);
	},
);

function useComponentsContextValue({ shallow, value }) {
	const previousValue = useComponentsContext();

	const [contextValue, setContextValue] = useState(
		getContextValue({ previousValue, value, shallow }),
	);
	const valueRef = useRef(value);

	useEffect(() => {
		if (deepEqual(value, valueRef.current)) return;

		setContextValue(getContextValue({ previousValue, value, shallow }));

		valueRef.current = value;
	}, [shallow, value, previousValue]);

	return contextValue;
}

function getContextValue({ previousValue, shallow = false, value = {} }) {
	let mergedValues = value;

	/**
	 * Inheriting and resolving props from a potential parent ContextSystemProvider.
	 * This model works similarly to CSS's cascading model.
	 */
	if (!isEmpty(previousValue)) {
		if (shallow) {
			mergedValues = { ...previousValue, ...value };
		} else {
			mergedValues = deepMerge(previousValue, value);
		}
	}

	return mergedValues;
}
