import { shallowCompare, useSubState } from '@wp-g2/substate';
import {
	add,
	createUnitValue,
	is,
	isValidCSSValueForProp,
	isValidNumericUnitValue,
	noop,
	omit,
	parseUnitValue,
	roundClampString,
	subtract,
} from '@wp-g2/utils';
import React from 'react';

import { View } from '../../View';
import { useTextInputNumber } from './NumberInput';
import { TextInputArrows } from './TextInputArrows';
import {
	mergeEventHandlers,
	mergeValidationFunctions,
	normalizeArrowKey,
	useDragHandlers,
	useShiftStepState,
} from './utils';

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
	const unit = findUnitMatch({ units, value });
	const exactUnit = findUnitMatchExact({ units, value });

	return value && unit === exactUnit;
}

const useUnitStore = ({ cssProp } = {}) => {
	const store = useSubState((set) => ({
		cssProp,
		typeAhead: '',
		clear: () => set({ typeAhead: '' }),
		change: (next) => set({ typeAhead: next }),
	}));

	return store;
};

const useUnitFocusHandlers = ({ store, unitStore }) => {
	const handleOnBlur = React.useCallback(
		(event) => {
			if (event.isPropagationStopped()) return;

			const { typeAhead } = unitStore.getState();
			if (typeAhead) {
				store.getState().change(typeAhead);
				store.getState().commit();
			}
		},
		[store, unitStore],
	);

	return {
		onBlur: handleOnBlur,
	};
};

const useUnitActions = ({ max, min, shiftStepStore, store, unitStore }) => {
	const raf = React.useRef();

	const increment = React.useCallback(
		(jumpStep = 0) => {
			const { cssProp } = unitStore.getState();
			const {
				change,
				commit,
				inputRef,
				value: storeValue,
			} = store.getState();

			const [value, unit] = parseUnitValue(storeValue);

			if (!is.numeric(value)) return;

			const shiftStep = shiftStepStore.getState().getShiftValue();
			const nextValue = add(jumpStep, shiftStep);

			const clampedValue = roundClampString(
				add(nextValue, value),
				min,
				max,
				shiftStep,
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
		[max, min, shiftStepStore, store, unitStore],
	);

	const decrement = React.useCallback(
		(jumpStep = 0) => {
			const { cssProp } = unitStore.getState();
			const {
				change,
				commit,
				inputRef,
				value: storeValue,
			} = store.getState();

			const [value, unit] = parseUnitValue(storeValue);

			if (!is.numeric(value)) return;

			const shiftStep = shiftStepStore.getState().getShiftValue();
			const nextValue = add(jumpStep, shiftStep);
			const clampedValue = roundClampString(
				subtract(value, nextValue),
				min,
				max,
				shiftStep,
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
		[max, min, shiftStepStore, store, unitStore],
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
	decrement,
	increment,
	store,
	unitStore,
}) => {
	const keyboardHandlers = React.useMemo(
		() => ({
			ArrowUp(event) {
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				increment();
			},
			ArrowDown(event) {
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				decrement();
			},
			Enter(event) {
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				const { cssProp } = unitStore.getState();
				const { commit, commitRevert, value } = store.getState();
				const [, parsedUnit] = parseUnitValue(value);

				if (cssProp) {
					if (!isValidCSSValueForProp(cssProp, value)) {
						unitStore.getState().clear();
						commitRevert();
					} else {
						unitStore.getState().clear();
						commit();
					}
				}

				if (parsedUnit && !hasUnitMatchExact({ value: parsedUnit })) {
					unitStore.getState().clear();
					commitRevert();
					return;
				}

				commit();
			},
		}),
		[decrement, increment, store, unitStore],
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

const useUnitChangeHandlers = ({ store, unitStore }) => {
	const handleOnValueChange = React.useCallback(
		(value) => {
			if (store.getState().getIsReverted()) {
				unitStore.getState().clear();
				return;
			}

			const [parsedValue, parsedUnit] = parseUnitValue(value);

			if (!isValidNumericUnitValue(value)) {
				unitStore.getState().clear();
				return;
			}

			let unit = findUnitMatch({ value: parsedUnit });
			if (!parsedUnit && !unit) {
				unit = 'px';
			}

			unitStore.getState().change(createUnitValue(parsedValue, unit));
		},
		[store, unitStore],
	);

	const handleOnValueCommit = React.useCallback(
		(value) => {
			const [parsedValue, parsedUnit] = parseUnitValue(value);
			const { cssProp } = unitStore.getState();

			if (cssProp) {
				if (!isValidCSSValueForProp(cssProp, value)) {
					unitStore.getState().clear();
				}
				return;
			}

			if (!isValidNumericUnitValue(value) || !parsedUnit) {
				unitStore.getState().clear();
				return;
			}

			let unit = findUnitMatch({ value: parsedUnit });
			if (!parsedUnit && !unit) {
				unit = 'px';
			}

			const next = createUnitValue(parsedValue, unit);

			unitStore.getState().change(next);

			store.getState().change(next);
			store.getState().commit();
		},
		[store, unitStore],
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

const useUnitEventHandlers = ({ decrement, increment, store, unitStore }) => {
	useUnitChangeHandlers({ store, unitStore });

	const dragHandlers = useDragHandlers({ store, decrement, increment });

	const focusHandlers = useUnitFocusHandlers({ store, unitStore });
	const keyboardHandlers = useUnitKeyboardHandlers({
		store,
		decrement,
		increment,
		unitStore,
	});

	return { ...dragHandlers, ...focusHandlers, ...keyboardHandlers };
};

export const useTextInputUnit = (props) => {
	const { cssProp, max, min, validate: validateProp } = props;

	const unitStore = useUnitStore({ cssProp });

	const validate = (commitValue) => {
		console.log(commitValue);
		if (cssProp) {
			return isValidCSSValueForProp(cssProp, commitValue);
		}
		return !!unitStore.getState().typeAhead;
	};

	const mergedValidations = mergeValidationFunctions(validate, validateProp);

	const { store, ...numberTextInput } = useTextInputNumber({
		format: 'number',
		type: 'text',
		validate: mergedValidations,
		...props,
	});

	/**
	 * Replacing the drag gestures from NumberInput with ones from UnitInput.
	 */
	const textInput = omit(numberTextInput, ['onMouseDown', 'onTouchStart']);

	const { shiftStepStore } = useShiftStepState({
		step: store.getState().step,
		shiftStep: store.getState().shiftStep,
	});

	const { decrement, increment } = useUnitActions({
		store,
		unitStore,
		max,
		min,
		shiftStepStore,
	});

	const eventHandlers = useUnitEventHandlers({
		store,
		decrement,
		increment,
		unitStore,
	});

	const mergedEventHandlers = mergeEventHandlers(eventHandlers, textInput);

	const typeAhead = unitStore((state) => state.typeAhead);

	return {
		store,
		...textInput,
		...mergedEventHandlers,
		typeAhead,
		decrement,
		increment,
	};
};

export const UnitInput = React.memo((props) => {
	const {
		decrement,
		increment,
		store,
		typeAhead,
		...textInput
	} = useTextInputUnit({
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
			<TextInputArrows decrement={decrement} increment={increment} />
		</View>
	);
});
