import { createStore } from '@wp-g2/substate';
import { deepEqual, deepMerge, useIsomorphicLayoutEffect } from '@wp-g2/utils';
import React, { createContext, useContext, useRef } from 'react';

export const ComponentsContext = createContext({});
export const useComponentsContext = () => useContext(ComponentsContext);

/**
 * Creates an instance of a Context System store.
 */
export const createContextSystemStore = (initialState = {}) => {
	const contextSystemStore = createStore((set) => ({
		context: initialState,
		setContext: (next = {}) => {
			set((prev) => {
				return {
					context: deepMerge(prev.context, next),
				};
			});
		},
	}));

	return contextSystemStore;
};

const rootContextSystemStore = createContextSystemStore();
export const useContextSystemStore = (store = rootContextSystemStore) =>
	store();

export const ContextStoreContext = createContext({
	store: rootContextSystemStore,
});
export const useContextStoreContext = () => useContext(ContextStoreContext);

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
 * @param {object} value Props to render into connected components.
 * @returns {React.Component} A Provider wrapped component.
 */
export const ContextSystemProvider = React.memo(({ children, value }) => {
	const store = useContextSystemBridge({ value });
	const contextValue = React.useMemo(() => ({ store }), [store]);

	return (
		<ContextStoreContext.Provider value={contextValue}>
			{children}
		</ContextStoreContext.Provider>
	);
});

function useContextSystemBridge({ value }) {
	const { store: parentStore } = useContextStoreContext();
	const store = React.useRef(createContextSystemStore(value)).current;

	const { context: parentContext } = parentStore();
	const { setContext } = store();

	const valueRef = useRef({});
	const parentContextRef = useRef({});

	useIsomorphicLayoutEffect(() => {
		if (!deepEqual(value, valueRef.current)) {
			setContext(value);
			valueRef.current = value;
		}

		if (!deepEqual(parentContext, parentContextRef.current)) {
			setContext(deepMerge(parentContext, valueRef.current));
			parentContextRef.current = parentContext;
		}
	}, [value, setContext, parentContext]);

	return store;
}
