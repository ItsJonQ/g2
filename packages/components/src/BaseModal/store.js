import { registerStore } from '@wordpress/data';

const MODAL_STORE = 'g2/modal';

/**
 * @type {{ isStacked: boolean, modals: import('react').RefObject<unknown>[]}}
 */
const DEFAULT_STATE = {
	isStacked: false,
	modals: [],
};

/** @typedef {{ type: 'MOUNT', ref: import('react').RefObject<unknown>}} MountAction */
/** @typedef {{ type: 'UNMOUNT', ref: import('react').RefObject<unknown>}} UnmountAction */

/**
 * @type {import('@wordpress/data').Store<typeof DEFAULT_STATE>}
 */
(registerStore(MODAL_STORE, {
	/**
	 * @param {typeof DEFAULT_STATE} state
	 * @param {MountAction | UnmountAction} action
	 */
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case 'MOUNT': {
				const modals = [...state.modals, action.ref];
				const isStacked = modals.length > 1;

				return { ...state, isStacked, modals };
			}
			case 'UNMOUNT': {
				const modals = state.modals.filter((m) => m !== action.ref);
				const isStacked = modals.length > 1;

				return { ...state, isStacked, modals };
			}
			default: {
				return state;
			}
		}
	},

	actions: {
		/**
		 * @param {import('react').RefObject<unknown>} ref
		 * @return {MountAction}
		 */
		mount: (ref) => ({
			type: 'MOUNT',
			ref,
		}),
		/**
		 * @param {import('react').RefObject<unknown>} ref
		 * @return {UnmountAction}
		 */
		unmount: (ref) => ({
			type: 'UNMOUNT',
			ref,
		}),
	},

	selectors: {
		/**
		 * @param {typeof DEFAULT_STATE} state
		 * @param {import('react').RefObject<unknown>} ref
		 */
		getIsUnderLayer(state, ref) {
			const { isStacked, modals } = state;
			const latestRef = modals[modals.length - 1];

			if (!isStacked) return false;

			return latestRef !== ref;
		},
	},
}));

export default MODAL_STORE;
