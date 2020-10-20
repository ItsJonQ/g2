import { ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import {
	createUnitValue,
	is,
	isValidCSSValueForProp,
	isValidNumericUnitValue,
	parseUnitValue,
} from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import * as styles from './UnitInput.styles';
import {
	findUnitMatch,
	UNITS,
	useAutoWidth,
	useSelectionPassThrough,
} from './UnitInput.utils';

function UnitInputSelect({ store, unitStore }) {
	const [inputRef, inputValue] = store(
		(state) => [state.inputRef, state.value],
		shallowCompare,
	);
	const [cssProp, value] = unitStore(
		(state) => [state.cssProp, state.typeAhead],
		shallowCompare,
	);

	const [isFocused, setIsFocused] = React.useState(false);
	const width = useAutoWidth({ ref: inputRef });

	const selectRef = React.useRef();
	const wrapperRef = React.useRef();
	useSelectionPassThrough({ selectRef, wrapperRef });

	let [parsedValue, parsedUnit] = parseUnitValue(value);
	let unit;

	if (is.numeric(parsedValue)) {
		unit = findUnitMatch({ value: parsedUnit });
	}

	if (!unit) return null;

	if (/\.$/g.test(value)) {
		parsedValue = value;
	}

	if (!isValidNumericUnitValue(value)) {
		return null;
	}

	// Disallow values if they are invalid for a specified CSS property.
	if (
		!isValidCSSValueForProp(
			cssProp,
			createUnitValue(parsedValue, parsedUnit),
		) &&
		!isValidCSSValueForProp(cssProp, createUnitValue(parsedValue, unit))
	) {
		return null;
	}

	const isTypeAhead = parsedUnit !== unit;
	const isPlaceholder = createUnitValue(parsedValue, unit) !== inputValue;

	const handleOnBlur = () => setIsFocused(false);
	const handleOnFocus = () => setIsFocused(true);
	const handleOnClick = (event) => event.stopPropagation();

	const handleOnMouseDown = (event) => {
		event.stopPropagation();
		if (isPlaceholder) {
			event.preventDefault();
			event.target.focus();
		}
	};

	const handleOnChangeSelect = (event) => {
		const unit = event.target.value;
		const [parsedValue] = parseUnitValue(value);
		const next = createUnitValue(parsedValue, unit);

		unitStore.getState().change(next);
		store.getState().change(next);
		store.getState().commit(next);

		if (inputRef) {
			inputRef.current.focus();
		}
	};

	const handleOnRemoveUnit = (event) => {
		const [parsedValue] = parseUnitValue(value);

		unitStore.getState().clear();
		store.getState().change(parsedValue);

		if (inputRef) {
			inputRef.current.focus();
		}
	};

	const handleOnKeyDown = (event) => {
		const { ctrlKey, keyCode, metaKey } = event;
		// Delete
		if (keyCode === 8) {
			event.preventDefault();
			handleOnRemoveUnit(event);
		}
		// Select all
		if ((keyCode === 65 && metaKey) || ctrlKey) {
			event.preventDefault();

			inputRef.current.focus();
			inputRef.current.setSelectionRange(
				0,
				inputRef.current.value.length,
			);
		}
		// Left/Right arrow
		if (keyCode === 37 || keyCode === 39) {
			event.preventDefault();
			inputRef.current.focus();
		}
	};

	return (
		<View
			className={styles.UnitInputSelect}
			css={ui.opacity(isPlaceholder ? 0.5 : 1)}
			onClick={() => {
				inputRef.current.focus();
			}}
			ref={wrapperRef}
			style={{
				width: width || '100%',
			}}
		>
			<View as="span" className={styles.UnitInputSelectValue}>
				{parsedValue}
			</View>
			<View
				as="span"
				className={styles.UnitInputSelectUnit}
				css={[
					isFocused && {
						background: ui.color.admin,
						color: ui.color.white,
						textDecoration: 'none',
					},
					ui.opacity(!isFocused && isTypeAhead ? 0.5 : 1),
				]}
			>
				{unit}
				<View
					as="select"
					autoFocus={false}
					className={styles.UnitInputSelectElement}
					onBlur={handleOnBlur}
					onChange={handleOnChangeSelect}
					onClick={handleOnClick}
					onFocus={handleOnFocus}
					onKeyDown={handleOnKeyDown}
					onMouseDown={handleOnMouseDown}
					onTouchStart={handleOnMouseDown}
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

export default React.memo(UnitInputSelect);
