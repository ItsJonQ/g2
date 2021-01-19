import { deepEqual, deepMerge, useIsomorphicLayoutEffect } from '@wp-g2/utils';
import { isNil } from 'lodash';
import React, { createContext, useContext, useRef, useState } from 'react';

export const ComponentsContext = createContext({});
export const useComponentsContext = () => useContext(ComponentsContext);

/**
 * Consolidates incoming ContextSystem values with a (potential) parent ContextSystem value.
 *
 * @param {object} props
 * @param {object} props.value
 * @return {object}
 */
function useContextSystemBridge({ value }) {
	if (isNil(value)) {
		// @ts-ignore
		value = {};
	}
	const parentContext = useComponentsContext();
	const parentContextRef = useRef(parentContext);
	const valueRef = useRef(deepMerge(parentContext, value));

	const [config, setConfig] = useState(valueRef.current);

	useIsomorphicLayoutEffect(() => {
		let hasChange = false;

		if (!deepEqual(value, valueRef.current)) {
			valueRef.current = value;
			hasChange = true;
		}

		if (!deepEqual(parentContext, parentContextRef.current)) {
			valueRef.current = deepMerge(parentContext, valueRef.current);
			parentContextRef.current = parentContext;
			hasChange = true;
		}

		if (hasChange) {
			setConfig((prev) => ({ ...prev, ...valueRef.current }));
		}
	}, [value, parentContext]);

	return config;
}

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
 * @template {Record<string, any>} T
 * @param {object} options
 * @param {import('react').ReactNode} options.children Children to render.
 * @param {T} options.value Props to render into connected components.
 * @returns {JSX.Element} A Provider wrapped component.
 */
const BaseContextSystemProvider = ({ children, value }) => {
	const contextValue = useContextSystemBridge({ value });

	return (
		<ComponentsContext.Provider value={contextValue}>
			{children}
		</ComponentsContext.Provider>
	);
};

export const ContextSystemProvider = React.memo(BaseContextSystemProvider);
