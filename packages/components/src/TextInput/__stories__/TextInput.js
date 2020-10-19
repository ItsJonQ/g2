import { shallowCompare, useSubState } from '@wp-g2/substate';
import { is, mergeRefs, noop } from '@wp-g2/utils';
import React from 'react';

import { View } from '../../View';
import {
	mergeEventHandlers,
	normalizeArrowKey,
	useControlledValue,
} from './utils';

const useTextInputState = ({
	dragAxis,
	format,
	shiftStep = 10,
	step = 1,
	type = 'text',
	validate,
	value: incomingValue = '',
} = {}) => {
	const isTypeNumeric = format === 'number' || type === 'number';

	const store = useSubState((set) => ({
		// State
		dragAxis,
		commitValue: '',
		inputRef: null,
		isTypeNumeric,
		previousValue: incomingValue,
		shiftStep,
		step,
		value: incomingValue,

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

	return { value, store };
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

				store.getState().commit();
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
	const handleOnBlur = React.useCallback(store.getState().commit, [store]);
	const handleOnFocus = React.useCallback(store.getState().setInputRef, [
		store,
	]);

	return {
		onBlur: handleOnBlur,
		onFocus: handleOnFocus,
	};
};

const useChangeHandlers = ({ store }) => {
	const handleOnChange = React.useCallback(
		(event) => store.getState().change(event.target.value),
		[store],
	);

	return {
		onChange: handleOnChange,
	};
};

const useEventHandlers = ({ store, ...props }) => {
	const changeHandlers = useChangeHandlers({ store });
	const focusHandlers = useFocusHandlers({ store });
	const keyboardHandlers = useKeyboardHandlers({ store });

	const { onChange: onChangeProp, ...otherProps } = props;

	const mergedHandlers = {
		...changeHandlers,
		...focusHandlers,
		...keyboardHandlers,
	};

	return mergeEventHandlers(mergedHandlers, otherProps);
};

export const useTextInput = (props = {}) => {
	const { onChange = noop, ref, ...otherProps } = props;
	const { store, ...inputState } = useTextInputState(otherProps);

	const inputRef = useInputRef({ store });
	const eventHandlers = useEventHandlers({ store, ...otherProps });

	React.useEffect(() => {
		return store.subscribe(
			(value) => onChange(value),
			(state) => state.commitValue,
			shallowCompare,
		);
	}, [onChange, store]);

	return {
		store,
		...otherProps,
		...inputState,
		...eventHandlers,
		ref: mergeRefs([inputRef, ref]),
	};
};

export const TextInput = React.memo((props) => {
	const { store, ...textInput } = useTextInput(props);

	return <View as="input" {...textInput} />;
});
