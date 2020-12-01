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

/**
 * @type {{
	sync: "SYNC_VALUE",
	change: "CHANGE_VALUE",
	increment: "INCREMENT_VALUE",
	decrement: "DECREMENT_VALUE",
	commit: "COMMIT_START",
	commitRevert: "COMMIT_REVERT",
	commitComplete: "COMMIT_COMPLETE",
	validateStart: "VALIDATE_START",
	validateSuccess: "VALIDATE_SUCCESS",
	validateFailed: "VALIDATE_FAILED",
}}
 */
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

/** @typedef {{ value: string | undefined }} Payload */

/** @typedef {{ type: 'SYNC_VALUE', payload: Payload }} SyncAction */
/** @typedef {{ type: 'CHANGE_VALUE', payload: Payload }} ChangeAction */
/** @typedef {{ type: 'INCREMENT_VALUE', payload: Payload }} IncrementAction */
/** @typedef {{ type: 'DECREMENT_VALUE', payload: Payload }} DecrementAction */
/** @typedef {{ type: 'COMMIT_START' }} CommitStartAction */
/** @typedef {{ type: 'COMMIT_REVERT' }} CommitRevertAction */
/** @typedef {{ type: 'COMMIT_COMPLETE' }} CommitCompleteAction */
/** @typedef {{ type: 'VALIDATE_START', payload: Payload }} ValidateStartAction */
/** @typedef {{ type: 'VALIDATE_SUCCESS', payload: Payload }} ValidateSuccessAction */
/** @typedef {{ type: 'VALIDATE_FAILED', payload: Payload }} ValidateFailedAction */

/**
 * @typedef {
	| SyncAction
	| ChangeAction
	| IncrementAction
	| DecrementAction
	| CommitStartAction
	| CommitRevertAction
	| CommitCompleteAction
	| ValidateStartAction
	| ValidateSuccessAction
	| ValidateFailedAction
} Action
 */

/** @typedef {{ value?: string, previousValue?: string, commitValue?: string }} State */

/**
 * @param {State} state
 * @param {Action} action
 * @return {State}
 */
const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.sync:
			return {
				previousValue: action.payload.value,
				value: action.payload.value,
			};

		case actionTypes.change:
			return {
				value: action.payload.value,
			};

		case actionTypes.increment:
			return {
				value: action.payload.value,
			};

		case actionTypes.decrement:
			return {
				value: action.payload.value,
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
			return {};
	}
};

/**
 * @typedef TextInputStore
 * @property {typeof actionTypes} actionTypes
 * @property {string} commitValue
 * @property {'x' | 'y' | undefined} dragAxis
 * @property {import('react').Ref<HTMLInputElement | undefined>} inputRef
 * @property {boolean} isCommitOnBlurOrEnter
 * @property {boolean} isFocused
 * @property {boolean} isInputTypeNumeric
 * @property {boolean} isShiftStepEnabled
 * @property {boolean} isTypeNumeric
 * @property {string | undefined} previousValue
 * @property {number} shiftStep
 * @property {number} step
 * @property {string | undefined} value
 *
 * @property {(action: Action) => void} dispatch
 * @property {(next: string) => void} changeSync
 * @property {(next: string) => void} change
 * @property {() => void} commit
 * @property {() => void} commitRevert
 * @property {() => void} commitComplete
 * @property {(next: string) => void} increment
 * @property {(next: string) => void} decrement
 *
 * @property {() => boolean} getIsReverted
 */

/** @typedef {import('zustand').UseStore<TextInputStore>} TextInputState */

/**
 * @typedef Options
 * @property {(...args: any[]) => void} [__debugger]
 * @property {'x' | 'y'} [dragAxis='y']
 * @property {string} [format='text']
 * @property {string} [initialValue]
 * @property {boolean} [isCommitOnBlurOrEnter=true]
 * @property {boolean} [isFocused=false]
 * @property {boolean} [isShiftStepEnabled=true]
 * @property {number} [step=1]
 * @property {number} [shiftStep=10]
 * @property {string} [type='text']
 * @property {(value: string | undefined, current: TextInputStore) => boolean} [validate]
 * @property {string} [value]
 */

/**
 *
 * @param {Options} options
 */
const useTextInputStore = ({
	__debugger,
	altStep,
	dragAxis = 'y',
	format = 'text',
	initialValue: initialValueProp,
	isCommitOnBlurOrEnter = true,
	isFocused: isFocusedInitial = false,
	isShiftStepEnabled = true,
	shiftStep = 10,
	step = 1,
	type = 'text',
	validate,
	value: incomingValue,
} = {}) => {
	const inputRef = React.useRef();
	const isInputTypeNumeric = type === 'number';
	const isTypeNumeric = format === 'number' || isInputTypeNumeric;
	const initialValue = is.defined(incomingValue)
		? incomingValue
		: initialValueProp;

	/** @type {TextInputState} */
	const store = useSubState((set) => ({
		// State
		actionTypes,
		altStep,
		commitValue: '',
		dragAxis,
		inputRef,
		isCommitOnBlurOrEnter,
		isFocused: isFocusedInitial,
		isShiftStepEnabled,
		isInputTypeNumeric,
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
				// @ts-ignore We checked `validate` above for `hasValidation`
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

/**
 * @param {object} options
 * @param {TextInputState} options.store
 */
const useKeyboardHandlers = ({ store }) => {
	const keyboardHandlers = React.useMemo(
		() => ({
			Enter(/** @type {import('react').KeyboardEvent} */ event) {
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
		(/** @type {import('react').KeyboardEvent}} */ event) => {
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

	const handleOnFocus = React.useCallback(() => {
		store.setState({ isFocused: true });
	}, [store]);

	return {
		onBlur: handleOnBlur,
		onFocus: handleOnFocus,
	};
};

/**
 * @param {object} options
 * @param {(value: string) => void} [options.onChange]
 * @param {(value: string) => void} [options.onValueChange]
 * @param {TextInputState} options.store
 */
const useChangeHandlers = ({
	onChange = noop,
	onValueChange = noop,
	store,
}) => {
	const handleOnChange = React.useCallback(
		(event) => {
			const next = event.target.value;
			store.getState().change(next);

			console.log(event.nativeEvent, { ...event });

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

const useScrollHandlers = ({ decrement, increment }) => {
	const handleOnWheel = React.useCallback(
		(event) => {
			if (event.shiftKey || event.altKey) {
				const isScrollUp = event?.nativeEvent?.wheelDelta > 0;
				if (isScrollUp) {
					increment();
				} else {
					decrement();
				}
			}
		},
		[decrement, increment],
	);

	return {
		onWheel: handleOnWheel,
	};
};

/**
 * @param {object} options
 * @param {() => void} [options.decrement]
 * @param {() => void} [options.increment]
 * @param {(value: string) => void} [options.onChange]
 * @param {(value: string) => void} [options.onValueChange]
 * @param {TextInputState} options.store
 */
const useEventHandlers = ({
	decrement = noop,
	increment = noop,
	onChange = noop,
	onValueChange = noop,
	store,
	...otherProps
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

	const scrollHandlers = useScrollHandlers({ store, decrement, increment });

	const mergedHandlers = {
		...changeHandlers,
		...focusHandlers,
		...mergedKeyboardEventHandlers,
		...scrollHandlers,
	};

	// @ts-ignore otherProps could be anything
	return mergeEventHandlers(mergedHandlers, otherProps);
};

export const useTextInputState = (props = {}) => {
	const {
		isFocused = false,
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
		isFocused,
		isShiftStepEnabled,
		shiftStep,
		...otherProps,
	});

	const { shiftStepStore } = useShiftStepState({
		altStep: store.getState().altStep,
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
