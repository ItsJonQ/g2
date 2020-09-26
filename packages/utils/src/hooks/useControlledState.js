import { is } from '@itsjonq/is';
import { useCallback, useState } from 'react';

const defaultOptions = {
	initial: undefined,
};

/**
 * A enhanced hook for managing and coordinating internal state and
 * state from props. This hook is useful for creating controlled components,
 * such as a custom <Input />.
 *
 * @param {any} initialValue An initial state value.
 *
 * @example
 * const [value, setValue] = useControlledState(valueFromProps);
 */
export function useControlledState(currentState, options) {
	const { initial } = { ...defaultOptions, ...options };
	const [internalState, setInternalState] = useState(initial);
	const hasCurrentState = is.defined(currentState);

	const setState = useCallback(
		(nextState) => {
			if (!hasCurrentState) {
				setInternalState(nextState);
			}
		},
		[hasCurrentState],
	);

	const state = hasCurrentState ? currentState : internalState;

	return [state, setState];
}
