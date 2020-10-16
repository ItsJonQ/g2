import { contextConnect, useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import {
	add,
	is,
	mergeRefs,
	noop,
	roundClampString,
	subtract,
} from '@wp-g2/utils';
import React, { useEffect, useRef } from 'react';

import { TextInput } from '../TextInput';
import * as textInputStyles from '../TextInput/TextInput.styles';
import { View } from '../View';
import {
	baseParseUnit,
	createUnitValue,
	isValidCSSValueForProp,
	parseUnit,
} from './UnitInput.utils';

const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax'];

function findUnitMatch({ units = UNITS, value = '' }) {
	const match = units.find((unit) => unit.indexOf(value.toLowerCase()) === 0);
	return match;
}

function PresetPlaceholder({ cssProp, inputRef, onChange, value }) {
	const [isSelecting, setIsSelecting] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const [width, setWidth] = React.useState();
	const selectRef = React.useRef();

	let [parsedValue, parsedUnit] = baseParseUnit(value);
	let unit;

	React.useEffect(() => {
		const handleOnResize = () => {
			if (inputRef.current) {
				setWidth(inputRef.current.clientWidth);
			}
		};

		handleOnResize();

		window.addEventListener('resize', handleOnResize);
		return () => {
			window.removeEventListener('resize', handleOnResize);
		};
	}, [inputRef]);

	React.useEffect(() => {
		const handleOnSelectionStart = (event) => {
			if (event.target === selectRef.current) return;
			setIsSelecting(true);
		};
		const handleOnSelectionEnd = () => setIsSelecting(false);

		document.addEventListener('mouseup', handleOnSelectionEnd);
		document.addEventListener('mousedown', handleOnSelectionStart);

		return () => {
			document.removeEventListener('mouseup', handleOnSelectionEnd);
			document.removeEventListener('mousedown', handleOnSelectionStart);
		};
	}, []);

	const handleOnChangeSelect = (event) => {
		const unit = event.target.value;
		const [parsedValue] = baseParseUnit(value);
		onChange(createUnitValue(parsedValue, unit));

		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const handleOnRemoveUnit = (event) => {
		const [parsedValue] = baseParseUnit(value);
		onChange(parsedValue);

		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	if (is.numeric(parsedValue)) {
		unit = findUnitMatch({ value: parsedUnit });
	}

	if (!unit) return null;

	if (/\.$/g.test(value)) {
		parsedValue = value;
	}

	// Disallow values that contains spaces
	if (/ /g.test(value)) {
		return null;
	}

	// Disallow values that do not start with alphanumeric characters.
	if (/^\W/g.test(value)) {
		// Allow for negative numbers, e.g. -1
		if (!/^-\w/g.test(value)) {
			return null;
		}
	}

	// Disallow values where a dot follows a character, e.g. 1.p
	if (/\.[a-zA-Z]/g.test(value)) {
		return null;
	}

	// Disallow values if they are invalid for a specified CSS property.
	if (
		!isValidCSSValueForProp(
			cssProp,
			createUnitValue(parsedValue, parsedUnit),
		)
	) {
		return null;
	}

	const isTypeAhead = parsedUnit !== unit;

	return (
		<View
			css={[
				textInputStyles.Input,
				`
				margin: 0 !important;
				position: absolute;
				top: 0;
				left: 8px;
				overflow: hidden;
			`,
				{ pointerEvents: isSelecting ? 'none' : 'initial' },
			]}
			style={{
				width: width || '100%',
			}}
		>
			<View
				as="span"
				css={[
					textInputStyles.inputFontSize,
					ui.opacity(0),
					{ pointerEvents: 'none' },
				]}
			>
				{parsedValue}
			</View>
			<View
				as="span"
				css={[
					textInputStyles.inputFontSize,
					{
						color: ui.color.admin,
						cursor: 'pointer',
						textDecorationLine: 'underline',
						textDecorationStyle: 'dotted',
						position: 'relative',
					},
					isFocused && {
						background: ui.color.admin,
						color: ui.color.white,
					},
					ui.opacity(isTypeAhead ? 0.5 : 1),
					ui.borderRadius.round,
				]}
			>
				{unit}
				<View
					as="select"
					autoFocus={false}
					css={`
						appearance: none;
						border: none;
						position: absolute;
						top: 0;
						left: 0;
						opacity: 0;
						width: 100%;
						height: 100%;
						cursor: pointer;
					`}
					onBlur={() => setIsFocused(false)}
					onChange={handleOnChangeSelect}
					onClick={(e) => e.stopPropagation()}
					onFocus={() => setIsFocused(true)}
					onKeyDown={(e) => {
						// Delete
						if (e.keyCode === 8) {
							e.preventDefault();
							handleOnRemoveUnit(e);
						}
					}}
					onMouseDown={(e) => e.stopPropagation()}
					ref={selectRef}
					title="Change unit"
					value={parsedUnit}
				>
					{UNITS.map((unit) => (
						<option key={unit} value={unit}>
							{unit}
						</option>
					))}
				</View>
			</View>
		</View>
	);
}

function UnitInput(props, forwardedRef) {
	const [placeholder, setPlaceholder] = React.useState('');
	const {
		cssProp,
		onBeforeCommit,
		min = 0,
		onChange = noop,
		onValueChange = noop,
		innerContent,
		value,
		...otherProps
	} = useContextSystem(props, 'UnitInput');

	const raf = useRef();
	const inputRef = useRef();
	const lastValueRef = useRef();
	const lastChangeValueRef = useRef();

	React.useEffect(() => {
		if (value === lastValueRef.current) return;
		lastValueRef.current = value;

		const [parsedValue, parsedUnit] = baseParseUnit(value);

		// Disallow values if they are invalid for a specified CSS property.
		if (!isValidCSSValueForProp(cssProp, value)) {
			setPlaceholder('');
			return;
		}

		if (is.numeric(parsedValue) && parsedUnit) {
			const unit = findUnitMatch({ value: parsedUnit });
			if (unit) {
				setPlaceholder(createUnitValue(parsedValue, unit));
			} else {
				setPlaceholder('');
			}
		} else {
			setPlaceholder('');
		}
	}, [cssProp, value]);

	const handleOnChange = (next) => {
		if (lastChangeValueRef.current === next) return;

		onChange(next);
		setPlaceholder(next);
		lastChangeValueRef.current = next;
	};

	const handleOnValueChange = (next) => {
		setPlaceholder(next);
		onValueChange(next);
	};

	const handleOnBeforeCommit = (next) => {
		const [parsedValue, parsedUnit] = baseParseUnit(next);
		let commitValue = next;

		if (is.numeric(parsedValue)) {
			const unit = findUnitMatch({ value: parsedUnit });
			commitValue = createUnitValue(parsedValue, unit);
		}

		// Disallow values if they are invalid for a specified CSS property.
		if (!isValidCSSValueForProp(cssProp, commitValue)) {
			commitValue = next;
		}

		if (onBeforeCommit) {
			return onBeforeCommit(commitValue);
		}

		return commitValue;
	};

	const handleOnIncrement = React.useCallback(
		(prev) => {
			const [value, unit] = parseUnit(prev.value);

			if (!is.numeric(value)) return;

			const step = prev.isShiftKey
				? prev.step * prev.shiftStep
				: prev.step;

			const nextValue = add(prev.boost, step);
			const clampedValue = roundClampString(
				add(nextValue, value),
				prev.min,
				prev.max,
				prev.step,
			);

			if (prev.inputRef.setSelectionRange) {
				raf.current = requestAnimationFrame(() => {
					prev.inputRef.setSelectionRange(
						0,
						String(clampedValue).length,
					);
				});
			}

			let final = unit
				? createUnitValue(clampedValue, unit)
				: clampedValue;

			// Disallow values if they are invalid for a specified CSS property.
			if (!isValidCSSValueForProp(cssProp, final)) {
				final = clampedValue;
			}

			return { value: final };
		},
		[cssProp],
	);

	const handleOnDecrement = React.useCallback(
		(prev) => {
			const [value, unit] = parseUnit(prev.value);

			if (!is.numeric(value)) return;

			const step = prev.isShiftKey
				? prev.step * prev.shiftStep
				: prev.step;

			const nextValue = add(prev.boost, step);
			const clampedValue = roundClampString(
				subtract(value, nextValue),
				prev.min,
				prev.max,
				prev.step,
			);

			if (prev.inputRef.setSelectionRange) {
				raf.current = requestAnimationFrame(() => {
					prev.inputRef.setSelectionRange(
						0,
						String(clampedValue).length,
					);
				});
			}

			let final = unit
				? createUnitValue(clampedValue, unit)
				: clampedValue;

			// Disallow values if they are invalid for a specified CSS property.
			if (!isValidCSSValueForProp(cssProp, final)) {
				final = clampedValue;
			}

			return { value: final };
		},
		[cssProp],
	);

	useEffect(() => {
		return () => {
			if (raf.current) {
				cancelAnimationFrame(raf.current);
			}
		};
	}, []);

	const enhancedInnerContent = (
		<>
			<PresetPlaceholder
				cssProp={cssProp}
				inputRef={inputRef}
				onChange={handleOnChange}
				value={placeholder}
			/>
			{innerContent}
		</>
	);

	return (
		<>
			<TextInput
				{...otherProps}
				format="number"
				innerContent={enhancedInnerContent}
				min={min}
				onBeforeCommit={handleOnBeforeCommit}
				onChange={handleOnChange}
				onDecrement={handleOnDecrement}
				onIncrement={handleOnIncrement}
				onValueChange={handleOnValueChange}
				onValueReset={handleOnChange}
				ref={mergeRefs([forwardedRef, inputRef])}
				type="text"
				value={value}
			/>
		</>
	);
}

export default contextConnect(UnitInput, 'UnitInput');
