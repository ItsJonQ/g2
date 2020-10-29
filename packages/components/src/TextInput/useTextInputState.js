import { shallowCompare, useSubState } from '@wp-g2/substate';
import {
	is,
	mergeEventHandlers,
	mergeRefs,
	noop,
	normalizeArrowKey,
} from '@wp-g2/utils';
import React from 'react';

import {
	useNumberActions,
	useNumberKeyboardHandlers,
} from './useTextInputNumberState';
import {
	useControlledValue,
	useShiftStepState,
} from './useTextInputState.utils';

const actionTypes = {
	sync: 'SYNC_VALUE',
	change: 'CHANGE_VALUE',
	increment: 'INCREMENT_VALUE',
	decrement: 'DECREMENT_VALUE',
	commit: 'COMMIT_START',
	commitRevert: 'COMMIT_REVERT',
	commitComplete: 'COMMIT_COMPLETE',
	validateStart: 'VALIDATE_START',
	validateSuccess: 'VALIDATE_SUCCESS',
	validateFailed: 'VALIDATE_FAILED',
};

const reducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case actionTypes.sync:
			return {
				previousValue: payload.value,
				value: payload.value,
			};

		case actionTypes.change:
			return {
				value: payload.value,
			};

		case actionTypes.increment:
			return {
				value: payload.value,
			};

		case actionTypes.decrement:
			return {
				value: payload.value,
			};

		case actionTypes.commitRevert:
			return {
				value: state.previousValue,
			};

		case actionTypes.commitComplete:
			return {
				previousValue: state.value,
				commitValue: state.value,
			};

		default:
			return;
	}
};

const useTextInputStore = ({
	__debugger,
	dragAxis = 'y',
	format = 'text',
	initialValue: initialValueProp,
	isCommitOnBlurOrEnter = true,
	isShiftStepEnabled = true,
	shiftStep = 10,
	step = 1,
	type = 'text',
	validate,
	value: incomingValue,
} = {}) => {
	const inputRef = React.useRef();
	const isTypeNumeric = format === 'number' || type === 'number';
	const initialValue = is.defined(incomingValue)
		? incomingValue
		: initialValueProp;

	const store = useSubState((set) => ({
		// State
		actionTypes,
		commitValue: '',
		dragAxis,
		inputRef,
		isCommitOnBlurOrEnter,
		isFocused: false,
		isShiftStepEnabled,
		isTypeNumeric,
		previousValue: initialValue,
		shiftStep,
		step,
		value: initialValue,

		// Actions
		dispatch: (args) =>
			set((state) => {
				const next = reducer(state, args);
				if (is.function(__debugger)) {
					__debugger(args, next, state);
				}
				return next;
			}),

		changeSync: (next) => {
			const current = store.getState();
			current.dispatch({
				type: actionTypes.sync,
				payload: { value: next },
			});
		},
		change: (next) => {
			const current = store.getState();
			if (next === current.value) return;

			current.dispatch({
				type: actionTypes.change,
				payload: { value: next },
			});
		},
		commit: () => {
			let isValid = true;
			const hasValidation = is.function(validate);
			const current = store.getState();

			current.dispatch({
				type: actionTypes.commit,
			});

			if (hasValidation) {
				current.dispatch({
					type: actionTypes.validateStart,
					payload: { value: current.value },
				});
				isValid = validate(current.value, current) !== false;
			}

			if (isValid) {
				if (hasValidation) {
					current.dispatch({
						type: actionTypes.validateSuccess,
						payload: { value: current.value },
					});
				}
				current.commitComplete();
			} else {
				if (hasValidation) {
					current.dispatch({
						type: actionTypes.validateFailed,
						payload: { value: current.value },
					});
				}
				current.commitRevert();
			}
		},
		commitRevert: () => {
			const current = store.getState();
			current.dispatch({ type: actionTypes.commitRevert });
		},
		commitComplete: () => {
			const current = store.getState();
			current.dispatch({ type: actionTypes.commitComplete });
		},
		increment: (next) => {
			if (!isTypeNumeric) return;

			const current = store.getState();
			if (next === current.value) return;

			current.dispatch({
				type: actionTypes.increment,
				payload: { value: next },
			});
			current.commit();
		},
		decrement: (next) => {
			if (!isTypeNumeric) return;

			const current = store.getState();
			if (next === current.value) return;

			current.dispatch({
				type: actionTypes.decrement,
				payload: { value: next },
			});
			current.commit();
		},
		// Selectors
		getIsReverted: () => {
			const { previousValue, value } = store.getState();
			return previousValue === value;
		},
	}));

	const { value } = useControlledValue({ store, value: incomingValue });

	return { inputRef, value, store };
};

export function useInputRef({ store }) {
	const inputRef = React.useRef();

	React.useEffect(() => {
		if (inputRef.current) {
			store.setState({ inputRef: inputRef.current });
		}
	}, [store]);

	return inputRef;
}

const useKeyboardHandlers = ({ store }) => {
	const keyboardHandlers = React.useMemo(
		() => ({
			Enter(event) {
				if (event.isDefaultPrevented()) return;

				const { isCommitOnBlurOrEnter } = store.getState();

				if (isCommitOnBlurOrEnter) {
					store.getState().commit();
				}
			},
		}),
		[store],
	);

	const handleOnKeyDown = React.useCallback(
		(event) => {
			const key = normalizeArrowKey(event);
			if (key && keyboardHandlers[key]) {
				keyboardHandlers[key](event);
			}
		},
		[keyboardHandlers],
	);

	return {
		onKeyDown: handleOnKeyDown,
	};
};

const useFocusHandlers = ({ store }) => {
	const handleOnBlur = React.useCallback(() => {
		const { getIsReverted, isCommitOnBlurOrEnter } = store.getState();
		store.setState({ isFocused: false });

		if (isCommitOnBlurOrEnter && !getIsReverted()) {
			store.getState().commit();
		}
	}, [store]);

	const handleOnFocus = React.useCallback(
		(event) => {
			store.setState({ isFocused: true });
		},
		[store],
	);

	return {
		onBlur: handleOnBlur,
		onFocus: handleOnFocus,
	};
};

const useChangeHandlers = ({
	onChange = noop,
	onValueChange = noop,
	store,
}) => {
	const handleOnChange = React.useCallback(
		(event) => {
			const next = event.target.value;
			store.getState().change(next);

			const { isCommitOnBlurOrEnter } = store.getState();

			if (!isCommitOnBlurOrEnter) {
				store.getState().commit();
			}
		},
		[store],
	);

	React.useEffect(() => {
		return store.subscribe(
			(value) => {
				onValueChange(value);
			},
			(state) => state.value,
			shallowCompare,
		);
	}, [onValueChange, store]);

	React.useEffect(() => {
		return store.subscribe(
			(value) => {
				onChange(value);
			},
			(state) => state.commitValue,
			shallowCompare,
		);
	}, [onChange, store]);

	return {
		onChange: handleOnChange,
	};
};

const useEventHandlers = ({
	decrement = noop,
	increment = noop,
	onChange = noop,
	onValueChange = noop,
	store,
	...props
}) => {
	const changeHandlers = useChangeHandlers({
		onChange,
		onValueChange,
		store,
	});
	const focusHandlers = useFocusHandlers({ store });
	const keyboardHandlers = useKeyboardHandlers({ store });

	const numberKeyboardEventHandlers = useNumberKeyboardHandlers({
		store,
		decrement,
		increment,
	});

	const mergedKeyboardEventHandlers = mergeEventHandlers(
		keyboardHandlers,
		numberKeyboardEventHandlers,
	);

	const { onChange: onChangeProp, ...otherProps } = props;

	const mergedHandlers = {
		...changeHandlers,
		...focusHandlers,
		...mergedKeyboardEventHandlers,
	};

	return mergeEventHandlers(mergedHandlers, otherProps);
};

export const useTextInputState = (props = {}) => {
	const {
		onChange = noop,
		onValueChange = noop,
		min,
		max,
		ref,
		isShiftStepEnabled,
		initialValue,
		shiftStep,
		...otherProps
	} = props;

	const { inputRef, store, ...inputState } = useTextInputStore({
		initialValue,
		isShiftStepEnabled,
		shiftStep,
		...otherProps,
	});

	const { shiftStepStore } = useShiftStepState({
		step: store.getState().step,
		shiftStep: store.getState().shiftStep,
	});

	const { decrement, increment } = useNumberActions({
		max,
		min,
		shiftStepStore,
		store,
	});

	const eventHandlers = useEventHandlers({
		decrement,
		increment,
		onChange,
		onValueChange,
		store,
		...otherProps,
	});

	return {
		store,
		...inputState,
		...eventHandlers,
		decrement,
		increment,
		max,
		min,
		ref: mergeRefs([inputRef, ref]),
	};
};
