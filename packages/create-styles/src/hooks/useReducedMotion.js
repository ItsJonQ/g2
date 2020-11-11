import { createStore } from '@wp-g2/utils';

/**
 * The internal store for non-device reduced-motion preferences. Creating
 * this state in this manner allows for the state value to be shared and used
 * amongst various components without the need of a Context provider.
 *
 * Ideally, you would interface with this store using the useReducedMotion hook.
 */
export const useReducedMotionState = createStore((setState) => ({
	isReducedMotion: false,
	setIsReducedMotion: (/** @type {boolean} */ next) => {
		setState(() => ({ isReducedMotion: next }));
	},
}));

/**
 * A hook that can subscribe to and set preferences for reducedMotion within
 * the entire Style system.
 *
 * @returns {[boolean, (reducedMotion: boolean) => void]} The state and setState for reduced motion.
 */
export function useReducedMotion() {
	const state = useReducedMotionState((state) => state.isReducedMotion);
	const setState = useReducedMotionState((state) => state.setIsReducedMotion);

	// @ts-ignore
	return [state, setState];
}
