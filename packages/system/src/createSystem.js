// Defaults
const __SYSTEM_CONFIG_DEFAULT__ = {
	buttonBorderRadius: '0.25rem',
	buttonPadding: '0.375em 0.75em',
	colorBrand: 'dodgerblue',
	colorBrandText: 'white',
};

export const createSystem = (initialValue = __SYSTEM_CONFIG_DEFAULT__) => {
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
		const value = config[key];
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

export default createSystem;
