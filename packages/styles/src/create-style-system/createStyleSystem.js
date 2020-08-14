import baseGet from 'dash-get';

import { THEME } from '../theme';

/**
 * TODO: DEPRECATE THIS. NO LONGER NEEDED AS DYNAMIC STYLES
 * ARE HELD AS CSS VARIABLES.
 */

// Defaults
const __SYSTEM_CONFIG_DEFAULT__ = { ...THEME };

export const createStyleSystem = (initialValue = __SYSTEM_CONFIG_DEFAULT__) => {
	const state = {
		lastGet: null,
	};
	const config = {};

	// Method to set value from system config store
	const set = (key, value) => {
		config[key] = value;
	};

	// Method to get value from system config store
	const get = (key) => {
		const value = baseGet(config, key);
		state.lastGet = { key, value };

		return value;
	};

	// Hydrate system config store with defaults
	for (const [key, value] of Object.entries(initialValue)) {
		if (key) {
			set(key, value);
		}
	}

	const getConfig = () => ({ ...config });

	const debug = () =>
		console.log({
			config,
			state,
		});

	const log = () => console.log(config);

	return {
		debug,
		get,
		getConfig,
		log,
		set,
	};
};

export default createStyleSystem;
