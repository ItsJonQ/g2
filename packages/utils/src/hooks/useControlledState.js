import { useState } from 'react';

import { isValueDefined } from '../values';

const defaultOptions = {
	initial: undefined,
};

export function useControlledState(currentState, options = defaultOptions) {
	const { initial } = { ...defaultOptions, ...options };
	const [internalState, setInternalState] = useState(initial);
	const hasCurrentState = isValueDefined(currentState);

	const setState = (nextState) => {
		if (!hasCurrentState) {
			setInternalState(nextState);
		}
	};

	const state = hasCurrentState ? currentState : internalState;

	return [state, setState];
}

export default useControlledState;
