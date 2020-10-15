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

function PresetPlaceholder({ onChange, value }) {
	const [isSelecting, setIsSelecting] = React.useState(false);

	let unit;

	const [parsedValue, parsedUnit] = baseParseUnit(value);

	React.useEffect(() => {
		const handleOnSelectionEnd = () => setIsSelecting(false);
		document.addEventListener('mouseup', handleOnSelectionEnd);
		return () => {
			document.removeEventListener('mouseup', handleOnSelectionEnd);
		};
	}, []);

	if (Number(parsedValue) && parsedValue !== null) {
		unit = findUnitMatch({ value: parsedUnit });
	}

	const handleOnMouseDown = React.useCallback((event) => {
		setIsSelecting(true);
	}, []);

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
				`
				margin: 0 !important;
				position: absolute;
				top: 0;
				left: 8px;
			`,
				textInputStyles.Input,
				{ pointerEvents: isSelecting ? 'none' : 'initial' },
			]}
			onMouseDown={handleOnMouseDown}
		>
			<View
				as="span"
				css={[textInputStyles.inputFontSize, ui.opacity(0)]}
			>
				{parsedValue}
			</View>
			<View
				as="span"
				css={[
					{
						background: ui.get('controlBackgroundDimColor'),
						cursor: 'pointer',
						position: 'relative',
					},
					ui.opacity(isTypeAhead ? 0.5 : 1),
					ui.borderRadius.round,
					textInputStyles.inputFontSize,
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
					onChange={handleOnChangeSelect}
					onClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
					tabIndex={-1}
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
		onChange = noop,
		onValueChange = noop,
		innerContent,
		value,
		...otherProps
	} = useContextSystem(props, 'UnitInput');
	const raf = useRef();

	React.useEffect(() => {
		const [parsedValue, parsedUnit] = baseParseUnit(value);

		if (Number(parsedValue) && parsedValue !== null) {
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

		if (Number(parsedValue) && parsedValue !== null) {
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
