// Defaults
const __SYSTEM_CONFIG_DEFAULT__ = {
	buttonBorderRadius: '0.25rem',
};

export const createSystem = (initialValue = __SYSTEM_CONFIG_DEFAULT__) => {
	const state = new Map();

	// Method to set value from system config store
	const set = (key, value) => {
		state.set(key, value);
	};

	// Method to get value from system config store
	const get = (key) => state.get(key);

	// Hydrate system config store with defaults
	for (const [key, value] of Object.entries(initialValue)) {
		if (key) {
			set(key, value);
		}
	}

	return {
		get,
		set,
	};
};

export default createSystem;
