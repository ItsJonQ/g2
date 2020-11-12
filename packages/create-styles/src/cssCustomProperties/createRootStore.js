import { getPropValue } from './getPropValue';
import { hasVariable } from './utils';

/**
 * Stores CSS config variables that are expected to be added to :root.
 * This is used for CSS variable fallback handling for IE 11.
 */
class RootStore {
	state = {};

	constructor(initialState = {}) {
		this.setState(initialState);
	}

	/**
	 * Retrieve a value from the state.
	 * @param {string} key The key to retrieve.
	 * @returns {string} The value.
	 */
	get = (key) => this.state[key];

	/**
	 * Retrieves the current state.
	 * @returns {object} The state.
	 */
	getState = () => this.state;

	/**
	 * Sets the state.
	 * @param {object} next The next state to merge into the current state.
	 * @returns {object} The state.
	 */
	setState = (next = {}) => {
		this._updateState(next);
		this._resolveVariablesInStateValue();

		return this.state;
	};

	/**
	 * Updates the state.
	 * @param {object} next The next state to merge into the current state.
	 */
	_updateState = (next = {}) => {
		this.state = Object.freeze({ ...this.state, ...next });
	};

	/**
	 * Resolves potential CSS variables that may exist within the state's values.
	 */
	_resolveVariablesInStateValue = () => {
		const next = {};
		/**
		 * Filter out entries so that we only target values with CSS variables.
		 */
		const entries = Object.entries(this.state).filter(([k, v]) =>
			hasVariable(v),
		);

		for (const [k, v] of entries) {
			const [, value] = getPropValue(`resolve: ${v}`, this);
			/**
			 * Set the value for the next state, if available.
			 */
			if (value) {
				next[k] = value;
			}
		}

		this._updateState(next);

		/**
		 * Run this function again if there are any unresolved values.
		 */
		if (entries.length) {
			this._resolveVariablesInStateValue();
		}
	};
}

/**
 * Creates a RootStore instance.
 * This store contains a collection of CSS variables that is expected to
 * be added to the :root {} node.
 *
 * @param {object} initialState The initial config.
 * @returns {object} The RootStore instance.
 */
export function createRootStore(initialState = {}) {
	const store = new RootStore(initialState);

	return store;
}
