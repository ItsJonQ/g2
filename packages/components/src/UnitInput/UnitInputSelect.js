import { ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import {
	createUnitValue,
	is,
	isFirefox,
	isValidCSSValueForProp,
	isValidNumericUnitValue,
	noop,
	parseUnitValue,
} from '@wp-g2/utils';
import React from 'react';

import * as textInputStyles from '../TextInput/TextInput.styles';
import { View } from '../View';

const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax'];

function findUnitMatch({ units = UNITS, value = '' }) {
	const match = units.find((unit) => unit.indexOf(value.toLowerCase()) === 0);
	return match;
}

function UnitInputSelect({ onChange = noop, store, unitStore }) {
	const [inputRef, inputValue] = store(
		(state) => [state.inputRef, state.value],
		shallowCompare,
	);
	const [cssProp, value] = unitStore(
		(state) => [state.cssProp, state.typeAhead],
		shallowCompare,
	);

	const [isFocused, setIsFocused] = React.useState(false);
	const [width, setWidth] = React.useState();
	const selectRef = React.useRef();
	const wrapperRef = React.useRef();

	let [parsedValue, parsedUnit] = parseUnitValue(value);
	let unit;

	React.useEffect(() => {
		const handleOnResize = () => {
			if (inputRef) {
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
			if (!isFirefox()) {
				if (wrapperRef.current) {
					wrapperRef.current.style.pointerEvents = 'none';
				}
			}
		};
		const handleOnSelectionEnd = () => {
			if (wrapperRef.current) {
				wrapperRef.current.style.pointerEvents = null;
			}
		};

		document.addEventListener('mousedown', handleOnSelectionStart);
		document.addEventListener('touchstart', handleOnSelectionStart);
		document.addEventListener('mouseup', handleOnSelectionEnd);

		return () => {
			document.removeEventListener('mousedown', handleOnSelectionStart);
			document.removeEventListener('touchstart', handleOnSelectionStart);
			document.removeEventListener('mouseup', handleOnSelectionEnd);
		};
	}, []);

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
		store.getState().commit(parsedValue);

		if (inputRef) {
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
				ui.opacity(isPlaceholder ? 0.5 : 1),
			]}
			onClick={() => {
				inputRef.current.focus();
			}}
			ref={wrapperRef}
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
						textDecorationStyle: 'solid',
						textDecorationColor: ui.color.admin,
						position: 'relative',
					},
					isFocused && {
						background: ui.color.admin,
						color: ui.color.white,
						textDecoration: 'none',
					},
					ui.opacity(!isFocused && isTypeAhead ? 0.5 : 1),
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
						// Select all
						if ((e.keyCode === 65 && e.metaKey) || e.ctrlKey) {
							e.preventDefault();
							inputRef.current.focus();
							inputRef.current.setSelectionRange(
								0,
								inputRef.current.value.length,
							);
						}
						// Left/Right arrow
						if (e.keyCode === 37 || e.keyCode === 39) {
							e.preventDefault();
							inputRef.current.focus();
						}
					}}
					onMouseDown={(e) => e.stopPropagation()}
					onTouchStart={(e) => e.stopPropagation()}
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

export default UnitInputSelect;
