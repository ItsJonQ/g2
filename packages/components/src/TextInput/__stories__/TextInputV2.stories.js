import { shallowCompare, useSubState } from '@wp-g2/substate';
import {
	add,
	createUnitValue,
	is,
	isValidCSSValueForProp,
	isValidNumericUnitValue,
	mergeRefs,
	noop,
	parseUnitValue,
	roundClampString,
	subtract,
} from '@wp-g2/utils';
import React from 'react';

import { Container, Grid, Text, View } from '../../index';

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

const useControlledValue = ({ store, value: incomingValue }) => {
	React.useEffect(() => {
		store.getState().change(incomingValue);
	}, [incomingValue, store]);

	const value = store((state) => state.value);

	return {
		value,
	};
};

const mergeEvent = (handler, extraHandler) => {
	if (!is.function(handler) || !is.function(extraHandler)) return handler;

	return (event) => {
		handler(event);
		extraHandler(event);
	};
};

const mergeEventHandlers = (handlers = {}, extraHandlers = {}) => {
	const mergedHandlers = { ...handlers };

	for (const [key, handler] of Object.entries(mergedHandlers)) {
		if (is.function(extraHandlers[key])) {
			mergedHandlers[key] = mergeEvent(handler, extraHandlers[key]);
		}
	}

	return mergedHandlers;
};

const useTextInputState = ({
	type = 'text',
	validate,
	value: incomingValue = '',
} = {}) => {
	const store = useSubState((set) => ({
		// State
		type,
		value: incomingValue,
		previousValue: incomingValue,
		commitValue: '',
		inputRef: null,

		// Actions
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

const useTextInput = (props = {}) => {
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
		...inputState,
		...eventHandlers,
		ref: mergeRefs([inputRef, ref]),
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
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				increment(event.shiftKey ? 10 : 1);
			},
			ArrowDown(event) {
				if (event.isDefaultPrevented()) return;
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

const useUnitFocusHandlers = ({ store, typeAheadStore }) => {
	const handleOnBlur = React.useCallback(() => {
		const { typeAhead } = typeAheadStore.getState();
		if (typeAhead) {
			store.getState().change(typeAhead);
			store.getState().commit();
		}
	}, [store, typeAheadStore]);

	return {
		onBlur: handleOnBlur,
	};
};

const useUnitActions = ({ cssProp, max, min, step, store }) => {
	const raf = React.useRef();
	const increment = React.useCallback(
		(jumpStep = 1) => {
			const {
				change,
				commit,
				inputRef,
				value: storeValue,
			} = store.getState();

			const [value, unit] = parseUnitValue(storeValue);

			if (!is.numeric(value)) return;

			const nextValue = add(jumpStep, step);
			const clampedValue = roundClampString(
				add(nextValue, value),
				min,
				max,
				step,
			);

			if (inputRef?.setSelectionRange) {
				raf.current = requestAnimationFrame(() => {
					inputRef.setSelectionRange(0, String(clampedValue).length);
				});
			}

			let final = unit
				? createUnitValue(clampedValue, unit)
				: clampedValue;

			// Disallow values if they are invalid for a specified CSS property.
			if (!isValidCSSValueForProp(cssProp, final)) {
				final = clampedValue;
			}

			change(final);
			commit();
		},
		[cssProp, max, min, step, store],
	);

	const decrement = React.useCallback(
		(jumpStep = 1) => {
			const {
				change,
				commit,
				inputRef,
				value: storeValue,
			} = store.getState();

			const [value, unit] = parseUnitValue(storeValue);

			if (!is.numeric(value)) return;

			const nextValue = add(jumpStep, step);
			const clampedValue = roundClampString(
				subtract(value, nextValue),
				min,
				max,
				step,
			);

			if (inputRef?.setSelectionRange) {
				raf.current = requestAnimationFrame(() => {
					inputRef.setSelectionRange(0, String(clampedValue).length);
				});
			}

			let final = unit
				? createUnitValue(clampedValue, unit)
				: clampedValue;

			// Disallow values if they are invalid for a specified CSS property.
			if (!isValidCSSValueForProp(cssProp, final)) {
				final = clampedValue;
			}

			change(final);
			commit();
		},
		[cssProp, max, min, step, store],
	);

	React.useEffect(() => {
		return () => {
			if (raf.current) {
				cancelAnimationFrame(raf.current);
			}
		};
	}, []);

	return {
		increment,
		decrement,
	};
};

const useUnitKeyboardHandlers = ({
	cssProp,
	max,
	min,
	step,
	store,
	typeAheadStore,
}) => {
	const { decrement, increment } = useUnitActions({
		cssProp,
		store,
		max,
		min,
		step,
	});

	const keyboardHandlers = React.useMemo(
		() => ({
			ArrowUp(event) {
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				increment(event.shiftKey ? 10 : 1);
			},
			ArrowDown(event) {
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				decrement(event.shiftKey ? 10 : 1);
			},
			Enter(event) {
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				const { commit, commitRevert, value } = store.getState();
				const [, parsedUnit] = parseUnitValue(value);

				if (!hasUnitMatchExact({ value: parsedUnit })) {
					typeAheadStore.getState().clear();
					commitRevert();
					return;
				}

				commit();
			},
		}),
		[decrement, increment, store, typeAheadStore],
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

const useUnitChangeHandlers = ({ store, typeAheadStore }) => {
	const handleOnValueChange = React.useCallback(
		(value) => {
			if (store.getState().getIsReverted()) return;

			const [parsedValue, parsedUnit] = parseUnitValue(value);
			if (!isValidNumericUnitValue(value)) {
				typeAheadStore.getState().clear();
				return;
			}

			let unit = findUnitMatch({ value: parsedUnit });
			if (!parsedUnit && !unit) {
				unit = 'px';
			}

			typeAheadStore
				.getState()
				.change(createUnitValue(parsedValue, unit));
		},
		[store, typeAheadStore],
	);

	const handleOnValueCommit = React.useCallback(
		(value) => {
			const [parsedValue, parsedUnit] = parseUnitValue(value);

			if (!isValidNumericUnitValue(value) || !parsedUnit) {
				typeAheadStore.getState().clear();
				return;
			}

			let unit = findUnitMatch({ value: parsedUnit });
			if (!parsedUnit && !unit) {
				unit = 'px';
			}

			const next = createUnitValue(parsedValue, unit);

			typeAheadStore.getState().change(next);

			store.getState().change(next);
			store.getState().commit();
		},
		[store, typeAheadStore],
	);

	React.useEffect(() => {
		return store.subscribe(
			handleOnValueChange,
			(state) => state.value,
			shallowCompare,
		);
	}, [handleOnValueChange, store]);

	React.useEffect(() => {
		return store.subscribe(
			handleOnValueCommit,
			(state) => state.commitValue,
			shallowCompare,
		);
	}, [handleOnValueCommit, store]);
};

const useTextInputUnit = (props) => {
	const typeAheadStore = useSubState((set) => ({
		typeAhead: '',
		clear: () => set({ typeAhead: '' }),
		change: (next) => set({ typeAhead: next }),
	}));

	const validate = () => !!typeAheadStore.getState().typeAhead;

	const { store, ...textInput } = useTextInputNumber({ ...props, validate });

	useUnitChangeHandlers({ store, typeAheadStore });

	const focusHandlers = useUnitFocusHandlers({ store, typeAheadStore });
	const keyboardHandlers = useUnitKeyboardHandlers({ store, typeAheadStore });
	const eventHandlers = { ...focusHandlers, ...keyboardHandlers };
	const mergedEventHandlers = mergeEventHandlers(eventHandlers, textInput);

	const typeAhead = typeAheadStore((state) => state.typeAhead);

	return { ...textInput, ...mergedEventHandlers, typeAhead };
};

const TextInput = React.memo((props) => {
	const { store, ...textInput } = useTextInput(props);

	return <View as="input" {...textInput} />;
});

const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax'];

function findUnitMatch({ units = UNITS, value = '' }) {
	const match = units.find((unit) => unit.indexOf(value.toLowerCase()) === 0);
	return match;
}

function findUnitMatchExact({ units = UNITS, value = '' }) {
	const match = units.find(
		(unit) => unit.toLowerCase() === value.toLowerCase(),
	);
	return match;
}

function hasUnitMatchExact({ units = UNITS, value = '' }) {
	const unit = findUnitMatch({ value });
	const exactUnit = findUnitMatchExact({ value });

	return value && unit === exactUnit;
}

const NumberInput = React.memo((props) => {
	const { store, ...textInput } = useTextInputNumber(props);

	return <View as="input" type="number" {...textInput} />;
});

const UnitInput = React.memo((props) => {
	const { store, typeAhead, ...textInput } = useTextInputUnit({
		...props,
		validate: noop,
	});

	return (
		<View
			css={`
				position: relative;
			`}
		>
			<View
				as="input"
				css={`
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0.2;
					pointer-events: none;
					z-index: 1;
				`}
				onChange={noop}
				tabIndex={-1}
				type="text"
				value={typeAhead}
			/>
			<View as="input" type="text" {...textInput} />
		</View>
	);
});

const Example = () => {
	const [value, setValue] = React.useState('123');

	return (
		<Container width={480}>
			<Grid>
				<Text>Text</Text>
				<TextInput
					onBlur={() => console.log('blur')}
					onChange={setValue}
					value={value}
				/>
			</Grid>
			<Grid>
				<Text>Number</Text>
				<NumberInput
					onBlur={() => console.log('blur')}
					onChange={setValue}
					value={value}
				/>
			</Grid>
			<Grid>
				<Text>Unit</Text>
				<UnitInput
					onBlur={() => console.log('blur')}
					onChange={setValue}
					value={value}
				/>
			</Grid>
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
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};
