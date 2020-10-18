import { shallowCompare, useSubState } from '@wp-g2/substate';
import { add, noop, roundClampString, subtract } from '@wp-g2/utils';
import React from 'react';

export default {
	title: 'Components/TextInputV2',
};

function normalizeArrowKey(event) {
	const { key, keyCode } = event;
	/* istanbul ignore next (ie) */
	if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
		return `Arrow${key}`;
	}
	return key;
}

const useTextInputState = ({
	type = 'text',
	value: incomingValue = '',
} = {}) => {
	const store = useSubState((set) => ({
		// State
		type,
		value: incomingValue,
		previousValue: '',
		commitValue: '',

		// Actions
		change: (next) =>
			set((prev) => ({ previousValue: prev.value, value: next })),
		commit: () =>
			set((prev) => ({
				previousValue: prev.value,
				commitValue: prev.value,
			})),
	}));

	React.useEffect(() => {
		store.getState().change(incomingValue);
	}, [incomingValue, store]);

	const value = store((state) => state.value);

	return {
		store,
		value,
	};
};

const useKeyboardHandlers = ({ store }) => {
	const keyboardHandlers = React.useMemo(
		() => ({
			Enter(event) {
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

	return {
		onBlur: handleOnBlur,
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

const mergeEventHandlers = (handlers = {}, extraHandlers = {}) => {
	const mergedHandlers = { ...handlers };

	for (const [key, handler] of Object.entries(mergedHandlers)) {
		if (extraHandlers[key]) {
			mergedHandlers[key] = (event) => {
				handler(event);
				extraHandlers[key](event);
			};
		}
	}

	return mergedHandlers;
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

const useTextInput = (props = { onChange: noop }) => {
	const { onChange, ...otherProps } = props;
	const { store, ...inputState } = useTextInputState(otherProps);

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
		...inputState,
		...eventHandlers,
	};
};

const useNumberActions = ({ max, min, step, store }) => {
	const increment = React.useCallback(
		(jumpStep = 1) => {
			const { change, commit, value } = store.getState();
			let next = add(value, jumpStep);
			next = roundClampString(next, min, max, jumpStep);

			change(next);
			commit();
		},
		[max, min, store],
	);

	const decrement = React.useCallback(
		(jumpStep = 1) => {
			const { change, commit, value } = store.getState();
			let next = subtract(value, jumpStep);
			next = roundClampString(next, min, max, jumpStep);

			change(next);
			commit();
		},
		[max, min, store],
	);

	return {
		increment,
		decrement,
	};
};

const useNumberKeyboardHandlers = ({ max, min, step, store }) => {
	const { decrement, increment } = useNumberActions({
		store,
		max,
		min,
		step,
	});

	const keyboardHandlers = React.useMemo(
		() => ({
			ArrowUp(event) {
				event.preventDefault();
				increment(event.shiftKey ? 10 : 1);
			},
			ArrowDown(event) {
				event.preventDefault();
				decrement(event.shiftKey ? 10 : 1);
			},
		}),
		[decrement, increment],
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

const useTextInputNumber = (props) => {
	const { max, min, step } = props;
	const { store, ...textInput } = useTextInput(props);

	const keyboardHandlers = useNumberKeyboardHandlers({
		store,
		min,
		max,
		step,
	});

	const mergedEventHandlers = mergeEventHandlers(keyboardHandlers, textInput);

	return {
		store,
		...textInput,
		...mergedEventHandlers,
		min,
		max,
		step,
	};
};

const TextInput = React.memo(({ onChange, value }) => {
	const { store, ...textInput } = useTextInput({ onChange, value });

	return <input {...textInput} />;
});

const NumberInput = React.memo(({ onChange, value }) => {
	const { store, ...textInput } = useTextInputNumber({ onChange, value });

	return <input type="number" {...textInput} />;
});

const Example = () => {
	const [value, setValue] = React.useState('123');

	return (
		<>
			<NumberInput onChange={setValue} value={value} />
			<br />
			State: {value}
			<br />
			<button
				onClick={() =>
					setValue((prev) => {
						return prev.toString().split('').reverse().join('');
					})
				}
			>
				Force Controlled Update
			</button>
		</>
	);
};

export const _default = () => {
	return <Example />;
};
