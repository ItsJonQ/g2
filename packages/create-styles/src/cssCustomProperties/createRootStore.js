import { getPropValue } from './getPropValue';
import { hasVariable } from './utils';

class RootStore {
	state = {};

	constructor(initialState = {}) {
		this.setState(initialState);
	}

	get = (key) => this.state[key];

	getState = () => ({ ...this.state });

	setState = (next = {}) => {
		this.state = { ...this.state, ...next };
		this.resolveVariablesInStateValue();
	};

	resolveVariablesInStateValue = (pass = 0) => {
		const next = {};
		const values = Object.values(this.state).filter(hasVariable);

		for (const v of values) {
			const [prop, value] = getPropValue(`resolve: ${v}`, this);
			if (value) {
				next[prop] = value;
			}
		}

		this.state = { ...this.state, ...next };

		if (pass === 2) {
			this.resolveVariablesInStateValue(pass + 1);
		}
	};
}

export function createRootStore(initialState = {}) {
	const store = new RootStore(initialState);

	return store;
}
