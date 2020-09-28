export { default as shallowCompare } from 'zustand/shallow';
export { default as createBaseStore } from 'zustand/vanilla';

import {
	Destroy,
	EqualityChecker,
	GetState,
	SetState,
	State,
	StateCreator,
	StateSelector,
	Subscribe,
	StoreApi,
} from 'zustand/vanilla';

interface UseStore<T extends State> {
	(): T;
	<U>(selector: StateSelector<T, U>, equalityFn?: EqualityChecker<U>): U;
	setState: SetState<T>;
	getState: GetState<T>;
	subscribe: Subscribe<T>;
	destroy: Destroy;
}

/**
 * Create a store instance with state and actions.
 *
 * ### Creating a store
 *
 * Your store is a hook! You can put anything in it: primitives, objects, functions. The `set` function *merges* state.
 *
 * @example
 * ```jsx
 * import { createStore } from `@wp-g2/substate`
 *
 * const useStore = createStore(set => ({
 *   bears: 0,
 *   increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
 *   removeAllBears: () => set({ bears: 0 })
 * }))
 * ```
 *
 * ### Binding store to components
 *
 * Use the hook anywhere, no providers needed. Select your state and the component will re-render on changes.
 *
 * @example
 * ```jsx
 * function BearCounter() {
 *   const bears = useStore(state => state.bears)
 *   return <h1>{bears} around here ...</h1>
 * }
 *
 * function Controls() {
 *   const increasePopulation = useStore(state => state.increasePopulation)
 *   return <button onClick={increasePopulation}>one up</button>
 * }
 * ```
 *
 * ### Memoizing selectors
 *
 * It is generally recommended to memoize selectors with useCallback. This will prevent unnecessary computations each render. It also allows React to optimize performance in concurrent mode.
 *
 * ```jsx
 * const fruit = useStore(useCallback(state => state.fruits[id], [id]))
 * ```
 *
 * If a selector doesn't depend on scope, you can define it outside the render function to obtain a fixed reference without useCallback.
 *
 * ```jsx
 * const selector = state => state.berries
 *
 * function Component() {
 *   const berries = useStore(selector)
 * ```
 * @see https://github.com/pmndrs/zustand
 */
export function createStore<TState extends State>(
	createState: StateCreator<TState> | StoreApi<TState>,
): UseStore<TState>;
