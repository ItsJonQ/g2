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
	useNumberEventHandlers,
} from './useTextInputNumberState';
import {
	useControlledValue,
	useShiftStepState,
} from './useTextInputState.utils';

const useTextInputStore = ({
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
	const isTypeNumeric = format === 'number' || type === 'number';
	const initialValue = is.defined(incomingValue)
		? incomingValue
		: initialValueProp;

	const store = useSubState((set) => ({
		// State
		commitValue: '',
		dragAxis,
		inputRef: null,
		isCommitOnBlurOrEnter,
		isFocused: false,
		isShiftStepEnabled,
		isTypeNumeric,
		previousValue: initialValue,
		shiftStep,
		step,
		value: initialValue,

		// Actions
		changeSync: (next) => set(() => ({ previousValue: next, value: next })),
		change: (next) => set(() => ({ value: next })),
		commit: () => {
			let isValid = true;
			const current = store.getState();

			if (is.function(validate)) {
				isValid = validate(current.value, current) !== false;
			}

			if (isValid) {
				current.commitComplete();
			} else {
				current.commitRevert();
			}
		},
		commitRevert: () => {
			set((prev) => ({
				value: prev.previousValue,
			}));
		},
		commitComplete: () =>
			set((prev) => ({
				previousValue: prev.value,
				commitValue: prev.value,
			})),
		setInputRef: (event) => {
			if (store.getState().inputRef) return;
			set({ inputRef: event?.target });
		},

		// Selectors
		getIsReverted: () => {
			const { previousValue, value } = store.getState();
			return previousValue === value;
		},
	}));

	const { value } = useControlledValue({ store, value: incomingValue });
	const inputRef = store((state) => state.inputRef, shallowCompare);

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
				event.preventDefault();

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
		const { isCommitOnBlurOrEnter } = store.getState();
		store.setState({ isFocused: false });

		if (isCommitOnBlurOrEnter) {
			store.getState().commit();
		}
	}, [store]);

	const handleOnFocus = React.useCallback(
		(event) => {
			store.setState({ isFocused: true });
			store.getState().setInputRef(event);
		},
		[store],
	);

	return {
		onBlur: handleOnBlur,
		onFocus: handleOnFocus,
	};
};

const useChangeHandlers = ({ onChange = noop, store }) => {
	const handleOnChange = React.useCallback(
		(event) => {
			const next = event.target.value;
			store.getState().change(next);

			const { isCommitOnBlurOrEnter } = store.getState();

			if (!isCommitOnBlurOrEnter) {
				onChange(next);
			}
		},
		[onChange, store],
	);

	React.useEffect(() => {
		return store.subscribe(
			(value) => onChange(value),
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
	store,
	...props
}) => {
	const changeHandlers = useChangeHandlers({ onChange, store });
	const focusHandlers = useFocusHandlers({ store });
	const keyboardHandlers = useKeyboardHandlers({ store });

	const numberEventHandlers = useNumberEventHandlers({
		store,
		decrement,
		increment,
	});

	const { onChange: onChangeProp, ...otherProps } = props;

	const mergedHandlers = {
		...changeHandlers,
		...focusHandlers,
		...keyboardHandlers,
		...numberEventHandlers,
	};

	return mergeEventHandlers(mergedHandlers, otherProps);
};

export const useTextInputState = (props = {}) => {
	const {
		onChange = noop,
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

	const __internalInputRef = useInputRef({ store });

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
		store,
		...otherProps,
	});

	return {
		store,
		...otherProps,
		...inputState,
		...eventHandlers,
		decrement,
		increment,
		max,
		min,
		ref: mergeRefs([__internalInputRef, ref]),
	};
};
