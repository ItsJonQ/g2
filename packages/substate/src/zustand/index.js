import { useEffect, useLayoutEffect, useReducer, useRef } from 'react';

import createImpl from './vanilla';
export * from './vanilla';

// For server-side rendering: https://github.com/react-spring/zustand/pull/34
const useIsoLayoutEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * @template {import('./types').State} TState
 * @param {import('./types').StateCreator<TState> | import('./types').StoreApi<TState>} createState
 *
 * @returns {import('./types').UseStore<TState>}
 */
export default function create(createState) {
	/**
	 * @type {import('./types').StoreApi<TState>}
	 */
	const api =
		typeof createState === 'function'
			? createImpl(createState)
			: createState;

	/**
	 * @template StateSlice
	 * @type {any}
	 * @param {import('./types').StateSelector<TState, StateSlice>} [selector]
	 * @param {import('./types').EqualityChecker<StateSlice>} [equalityFn]
	 */
	const useStore = (
		selector = /** @type {any} */ (api.getState),
		equalityFn = Object.is,
	) => {
		const [, forceUpdate] = useReducer((c) => c + 1, 0);

		const state = api.getState();
		const stateRef = useRef(state);
		const selectorRef = useRef(selector);
		const equalityFnRef = useRef(equalityFn);
		const erroredRef = useRef(false);

		/**
		 * @type {import('react').MutableRefObject<StateSlice | undefined>}
		 */
		const currentSliceRef = useRef();
		if (currentSliceRef.current === undefined) {
			currentSliceRef.current = selector(state);
		}

		/**
		 * @type {StateSlice | undefined}
		 */
		let newStateSlice;
		let hasNewStateSlice = false;

		// The selector or equalityFn need to be called during the render phase if
		// they change. We also want legitimate errors to be visible so we re-run
		// them if they errored in the subscriber.
		if (
			stateRef.current !== state ||
			selectorRef.current !== selector ||
			equalityFnRef.current !== equalityFn ||
			erroredRef.current
		) {
			// Using local variables to avoid mutations in the render phase.
			newStateSlice = selector(state);
			hasNewStateSlice = !equalityFn(
				/** @type {StateSlice} */ (currentSliceRef.current),
				/** @type {StateSlice} */ (newStateSlice),
			);
		}

		// Syncing changes in useEffect.
		useIsoLayoutEffect(() => {
			if (hasNewStateSlice) {
				currentSliceRef.current = /** @type {StateSlice} */ (newStateSlice);
			}
			stateRef.current = state;
			selectorRef.current = selector;
			equalityFnRef.current = equalityFn;
			erroredRef.current = false;
		});

		const stateBeforeSubscriptionRef = useRef(state);
		useIsoLayoutEffect(() => {
			const listener = () => {
				try {
					const nextState = api.getState();
					const nextStateSlice = selectorRef.current(nextState);
					if (
						!equalityFnRef.current(
							/** @type {StateSlice} */ (currentSliceRef.current),
							nextStateSlice,
						)
					) {
						stateRef.current = nextState;
						currentSliceRef.current = nextStateSlice;
						forceUpdate();
					}
				} catch (error) {
					erroredRef.current = true;
					forceUpdate();
				}
			};
			const unsubscribe = api.subscribe(listener);
			if (api.getState() !== stateBeforeSubscriptionRef.current) {
				listener(); // state has changed before subscription
			}
			return unsubscribe;
		}, []);

		return hasNewStateSlice
			? /** @type {StateSlice} */ (newStateSlice)
			: currentSliceRef.current;
	};

	Object.assign(useStore, api);

	// For backward compatibility (No TS types for this)
	useStore[Symbol.iterator] = function* () {
		console.warn(
			'[useStore, api] = create() is deprecated and will be removed in v4',
		);
		yield useStore;
		yield api;
	};

	return useStore;
}
