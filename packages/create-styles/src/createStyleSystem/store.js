// eslint-disable-next-line
let __variableStore = {};

export const store = {
	get: (k) => __variableStore[k],
	set: (k, v) => {
		if (!__variableStore[k]) {
			__variableStore[k] = v;
		}
		return __variableStore[k];
	},
	setState: (next) => {
		__variableStore = next;
	},
	getState: () => __variableStore,
};
