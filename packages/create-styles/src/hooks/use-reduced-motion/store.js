import { registerStore } from '@wordpress/data';

const IS_REDUCED_MOTION_STORE = 'g2/is-reduced-motion';

const DEFAULT_STATE = {
	isReducedMotion: false,
};

/** @typedef {{ type: 'SET_IS_REDUCED_MOTION', isReducedMotion: boolean }} SetIsReducedMotion */

const actions = {
	/**
	 * @param {boolean} isReducedMotion
	 * @return {SetIsReducedMotion}
	 */
	setIsReducedMotion: (/** @type {boolean} */ isReducedMotion) => ({
		type: 'SET_IS_REDUCED_MOTION',
		isReducedMotion,
	}),
};

/**
 * @type {import('@wordpress/data').Store<typeof DEFAULT_STATE>}
 */
(registerStore(IS_REDUCED_MOTION_STORE, {
	/**
	 * @param {typeof DEFAULT_STATE} state
	 * @param {SetIsReducedMotion | import('@wordpress/data').Action} action
	 */
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case 'SET_IS_REDUCED_MOTION':
				return {
					...state,
					isReducedMotion: action.isReducedMotion,
				};
			default:
				return state;
		}
	},

	actions,

	selectors: {
		getIsReducedMotion(state) {
			return state.isReducedMotion;
		},
	},
}));

export default IS_REDUCED_MOTION_STORE;
