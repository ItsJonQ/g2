import { shallowCompare, useSubState } from '@wp-g2/substate';
import {
	add,
	createUnitValue,
	is,
	isValidCSSValueForProp,
	isValidNumericUnitValue,
	mergeEventHandlers,
	mergeValidationFunctions,
	normalizeArrowKey,
	parseUnitValue,
	roundClampString,
	subtract,
} from '@wp-g2/utils';
import React from 'react';

import { useTextInput } from '../TextInput/useTextInput';
import {
	useDragHandlers,
	useShiftStepState,
} from '../TextInput/useTextInputState.utils';

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
			const { getIsReverted } = store.getState();
			const { typeAhead } = unitStore.getState();

			if (typeAhead && !getIsReverted()) {
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

			// Increment for zero
			if (is.numericZero(value) && cssProp) {
				const maybeFinal = createUnitValue(clampedValue, 'px');
				if (isValidCSSValueForProp(cssProp, maybeFinal)) {
					final = maybeFinal;
				}
			}

			if (final !== storeValue) {
				change(final);
				commit();
			}
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

			// Increment for zero
			if (
				is.numericZero(value) &&
				!is.numericZero(clampedValue) &&
				cssProp
			) {
				const maybeFinal = createUnitValue(clampedValue, 'px');
				if (isValidCSSValueForProp(cssProp, maybeFinal)) {
					final = maybeFinal;
				}
			}

			if (final !== storeValue) {
				change(final);
				commit();
			}
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
						if (!parsedUnit) {
							unitStore.getState().clear();
						}
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
	const lastValueRef = React.useRef();
	const didInitialParse = React.useRef(false);
	const __value = store((state) => state.value);

	const handleOnInitialParse = React.useCallback(
		(value) => {
			if (didInitialParse.current) return;
			didInitialParse.current = true;

			const cssProp = unitStore.getState().cssProp;

			if (value === lastValueRef.current) return;
			lastValueRef.current = value;

			const [parsedValue, parsedUnit] = parseUnitValue(value);

			// Disallow values if they are invalid for a specified CSS property.
			if (!isValidCSSValueForProp(cssProp, value)) {
				unitStore.getState().clear();
				return;
			}

			if (is.numeric(parsedValue) && parsedUnit) {
				const unit = findUnitMatch({ value: parsedUnit });
				if (unit) {
					unitStore
						.getState()
						.change(createUnitValue(parsedValue, unit));
				} else {
					unitStore.getState().clear();
				}
			} else {
				unitStore.getState().clear();
			}
		},
		[unitStore],
	);

	const handleOnValueChange = React.useCallback(
		(value) => {
			const [parsedValue, parsedUnit] = parseUnitValue(value);

			if (store.getState().getIsReverted()) {
				if (
					isValidNumericUnitValue(value) &&
					value !== unitStore.getState().typeAhead &&
					!parsedUnit
				) {
					unitStore.getState().clear();
					return;
				}
			}

			if (!isValidNumericUnitValue(parsedValue)) {
				unitStore.getState().clear();
				return;
			}

			let unit = findUnitMatch({ value: parsedUnit });
			if (!parsedUnit && !unit) {
				unit = 'px';
			}

			if (!unit) {
				unitStore.getState().clear();
				return;
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

	React.useEffect(() => handleOnInitialParse(__value), [
		__value,
		handleOnInitialParse,
	]);
};

const useUnitEventHandlers = ({ decrement, increment, store, unitStore }) => {
	useUnitChangeHandlers({ store, unitStore });

	const focusHandlers = useUnitFocusHandlers({ store, unitStore });
	const keyboardHandlers = useUnitKeyboardHandlers({
		store,
		decrement,
		increment,
		unitStore,
	});

	return { ...focusHandlers, ...keyboardHandlers };
};

export const useUnitInput = (props) => {
	const { cssProp, max, min = 0, validate: validateProp } = props;

	const unitStore = useUnitStore({ cssProp });

	const validate = (commitValue) => {
		if (cssProp) {
			return isValidCSSValueForProp(cssProp, commitValue);
		}
		return !!unitStore.getState().typeAhead;
	};

	const mergedValidations = mergeValidationFunctions(validate, validateProp);

	const { __store: store, ...textInput } = useTextInput({
		format: 'number',
		type: 'text',
		validate: mergedValidations,
		...props,
	});

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

	const dragHandlers = useDragHandlers({ store, decrement, increment });

	textInput.inputProps = {
		...textInput.inputProps,
		...mergeEventHandlers(eventHandlers, textInput.inputProps),
		type: 'text',
	};
	const typeAhead = unitStore((state) => state.typeAhead);

	return {
		__store: store,
		__unitStore: unitStore,
		...textInput,
		...dragHandlers,
		typeAhead,
		decrement,
		increment,
	};
};
