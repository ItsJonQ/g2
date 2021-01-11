import { createStore } from '@wp-g2/substate';
import {
	deepEqual,
	deepMerge,
	is,
	useIsomorphicLayoutEffect,
} from '@wp-g2/utils';
import React, { createContext, useContext, useRef } from 'react';

export const ComponentsContext = createContext({});
export const useComponentsContext = () => useContext(ComponentsContext);

/**
 * @template T
 * @typedef {import('@wp-g2/substate').UseStore<T>} State
 */

/**
 * Creates an instance of a Context System store.
 */
/**
 * @template T
 * @param {T} initialState
 */
export const createContextSystemStore = (initialState) => {
	/** @type {import('@wp-g2/substate').UseStore<{ context: T, setContext: (next: T) => void }>} */
	const contextSystemStore = createStore((set) => ({
		context: initialState,
		setContext: (next) => {
			set((prev) => {
				return {
					context: deepMerge(prev.context, next),
				};
			});
		},
	}));

	return contextSystemStore;
};

/** @type {any} */
const rootContext = {};

const rootContextSystemStore = createContextSystemStore(rootContext);
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
 * @template {Record<string, any>} T
 * @param {object} options
 * @param {import('react').ReactNode} options.children Children to render.
 * @param {T} options.value Props to render into connected components.
 * @returns {JSX.Element} A Provider wrapped component.
 */
const _ContextSystemProvider = ({ children, value }) => {
	/** @type {import('@wp-g2/substate').UseStore<{ context: T; setContext: (next: T) => void; }>} */
	const store = useContextSystemBridge({ value });
	const contextValue = React.useMemo(() => ({ store }), [store]);

	return (
		<ContextStoreContext.Provider value={contextValue}>
			{children}
		</ContextStoreContext.Provider>
	);
};

export const ContextSystemProvider = React.memo(_ContextSystemProvider);

function useContextSystemBridge({ value }) {
	const { store: parentStore } = useContextStoreContext();
	if (is.nil(value)) {
		// @ts-ignore
		value = {};
	}
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
