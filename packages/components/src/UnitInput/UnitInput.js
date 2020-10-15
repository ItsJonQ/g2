import { contextConnect, useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { add, noop, roundClampString, subtract } from '@wp-g2/utils';
import React, { useEffect, useRef } from 'react';

import { TextInput } from '../TextInput';
import * as textInputStyles from '../TextInput/TextInput.styles';
import { View } from '../View';
import { baseParseUnit, createUnitValue, parseUnit } from './UnitInput.utils';

const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax'];

function findUnitMatch({ units = UNITS, value = '' }) {
	const match = units.find((unit) => unit.indexOf(value.toLowerCase()) === 0);
	return match;
}

const isNumber = (value) => !isNaN(Number(value)) && value !== null;

function PresetPlaceholder({ onChange, value }) {
	const [isSelecting, setIsSelecting] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const selectRef = React.useRef();

	let unit;

	const [parsedValue, parsedUnit] = baseParseUnit(value);

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

	if (isNumber(parsedValue)) {
		unit = findUnitMatch({ value: parsedUnit });
	}

	const handleOnChangeSelect = (event) => {
		const unit = event.target.value;
		const [parsedValue] = baseParseUnit(value);
		onChange(createUnitValue(parsedValue, unit));
	};

	if (!unit) return null;

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
				width: auto;
			`,
				{ pointerEvents: isSelecting ? 'none' : 'initial' },
			]}
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
						background: ui.get('controlBackgroundDimColor'),
						cursor: 'pointer',
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
					onMouseDown={(e) => e.stopPropagation()}
					ref={selectRef}
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
		onBeforeCommit,
		min = 0,
		onChange = noop,
		onValueChange = noop,
		innerContent,
		value,
		...otherProps
	} = useContextSystem(props, 'UnitInput');
	const raf = useRef();

	React.useEffect(() => {
		const [parsedValue, parsedUnit] = baseParseUnit(value);

		if (isNumber(parsedValue)) {
			const unit = findUnitMatch({ value: parsedUnit });
			if (unit) {
				setPlaceholder(createUnitValue(parsedValue, unit));
			} else {
				setPlaceholder('');
			}
		} else {
			setPlaceholder('');
		}
	}, [value]);

	const handleOnChange = (next) => {
		onChange(next);
		setPlaceholder(next);
	};

	const handleOnValueChange = (next) => {
		setPlaceholder(next);
		onValueChange(next);
	};

	const handleOnBeforeCommit = (next) => {
		const [parsedValue, parsedUnit] = baseParseUnit(next);
		let commitValue = next;

		if (isNumber(parsedValue)) {
			const unit = findUnitMatch({ value: parsedUnit });
			commitValue = createUnitValue(parsedValue, unit);
		}

		if (onBeforeCommit) {
			return onBeforeCommit(commitValue);
		}

		return commitValue;
	};

	const handleOnIncrement = React.useCallback((prev) => {
		const [value, unit] = parseUnit(prev.value);

		const step = prev.isShiftKey ? prev.step * prev.shiftStep : prev.step;

		const nextValue = add(prev.boost, step);
		const clampedValue = roundClampString(
			add(nextValue, value),
			prev.min,
			prev.max,
			prev.step,
		);

		if (prev.inputRef.setSelectionRange) {
			raf.current = requestAnimationFrame(() => {
				prev.inputRef.setSelectionRange(0, String(clampedValue).length);
			});
		}

		const final = unit ? createUnitValue(clampedValue, unit) : clampedValue;

		return { value: final };
	}, []);

	const handleOnDecrement = React.useCallback((prev) => {
		const [value, unit] = parseUnit(prev.value);

		const step = prev.isShiftKey ? prev.step * prev.shiftStep : prev.step;

		const nextValue = add(prev.boost, step);
		const clampedValue = roundClampString(
			subtract(value, nextValue),
			prev.min,
			prev.max,
			prev.step,
		);

		if (prev.inputRef.setSelectionRange) {
			raf.current = requestAnimationFrame(() => {
				prev.inputRef.setSelectionRange(0, String(clampedValue).length);
			});
		}

		const final = unit ? createUnitValue(clampedValue, unit) : clampedValue;

		return { value: final };
	}, []);

	useEffect(() => {
		return () => {
			if (raf.current) {
				cancelAnimationFrame(raf.current);
			}
		};
	}, []);

	const enhancedInnerContent = (
		<>
			<PresetPlaceholder onChange={handleOnChange} value={placeholder} />
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
				ref={forwardedRef}
				type="text"
				value={value}
			/>
		</>
	);
}

export default contextConnect(UnitInput, 'UnitInput');
