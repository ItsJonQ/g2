import { ui } from '@wp-g2/styles';
import { useCallback, useReducer } from 'react';

export function getColor(color) {
	return ui.color(color).toRgbString();
}

export function isEqualColor(first, second) {
	return ui.color(first).toRgbString() === ui.color(second).toRgbString();
}

/**
 * @typedef State
 * @property {string} colorForElementPreviousValue
 * @property {string} colorForElement
 * @property {string} color
 * @property {unknown} changeFormat
 * @property {string} inputType
 * @property {boolean} disableAlpha
 * @property {boolean} showPreview
 */

/**
 * @param {Omit<State, 'colorForElementPreviousValue'>} initialState
 * @return {State}
 */
export function useInitialState({
	changeFormat,
	color,
	colorForElement,
	disableAlpha,
	inputType,
	showPreview,
}) {
	console.log('useInitialState');
	return {
		colorForElementPreviousValue: '',
		colorForElement,
		color,
		changeFormat,
		inputType,
		disableAlpha,
		showPreview,
	};
}

/**
 * @param {State} state
 * @return {import('tinycolor2').ColorFormats.RGB}
 */
const rgb = (state) => ui.color(state.color).toRgb();

/**
 * @param {State} state
 * @return {import('tinycolor2').ColorFormats.HSL}
 */
const hsl = (state) => ui.color(state.color).toHsl();

/**
 * @param {State} state
 * @return {string}
 */
const hex = (state) => ui.color(state.color).toHex();

/**
 * @param {State} state
 * @return {string}
 */
const getColorValue = (state) => {
	const { color, inputType } = state;
	let colorValue = color;

	switch (inputType) {
		case 'hex':
			colorValue = ui.color(color).toHexString();
			break;
		case 'rgb':
			colorValue = ui.color(color).toRgbString();
			break;
		case 'hsl':
			colorValue = ui.color(color).toHslString();
			break;
		default:
			break;
	}

	return colorValue;
};

/** @typedef {{ type: 'INCREMENT' }} IncrementAction */
/** @typedef {{ type: 'DECREMENT' }} DecrementAction */
/** @typedef {{ type: 'COMMIT', next: import('tinycolor2').ColorInput }} CommitAction */
/** @typedef {{ type: 'CHANGE_RGB', next: import('tinycolor2').ColorFormats.RGB }} ChangeRGBAction */
/** @typedef {{ type: 'CHANGE_HSL', next: import('tinycolor2').ColorFormats.HSL }} ChangeHSLAction */
/** @typedef {{ type: 'CHANGE_HEX', next: string }} ChangeHexAction */
/** @typedef {{ type: 'SET_COLOR_FOR_ELEMENT', next: string }} SetColorForElementAction */
/** @typedef {{ type: 'SET_INPUT_TYPE', next: string }} SetInputTypeAction */

/** @typedef {
	| IncrementAction
	| DecrementAction
	| CommitAction
	| ChangeRGBAction
	| ChangeHSLAction
	| ChangeHexAction
	| SetColorForElementAction
	| SetInputTypeAction
} Action
 */

/**
 * @param {State} state
 * @param {string} nextColor
 * @return {State}
 */
const commit = (state, nextColor) => {
	if (isEqualColor(state.colorForElementPreviousValue, nextColor)) return;

	const hasAlpha = ui.color(nextColor).getAlpha() !== 1;

	const nextState = {
		...state,
		colorForElementPreviousValue: state.colorForElement,
		colorForElement: getColor(nextColor, state.disableAlpha),
		color: nextColor,
	};

	if (state.disableAlpha && hasAlpha) {
		nextState.disableAlpha = false;
	}

	return nextState;
};

/**
 * @param {State} state
 * @param {import('tinycolor2').ColorFormats.RGB} nextRgb
 * @return {State}
 */
const changeRgb = (state, nextRgb) => {
	let next = { ...rgb(state), ...nextRgb };
	next = getColor(next, state.disableAlpha);
	return commit(state, next);
};

/**
 * @param {State} state
 * @param {import('tinycolor2').ColorFormats.HSL} nextHsl
 * @return {State}
 */
const changeHsl = (state, nextHsl) => {
	let next = { ...hsl(state), ...nextHsl };
	next = getColor(next, state.disableAlpha);
	return commit(state, next);
};

/**
 * @param {State} state
 * @param {string} nextHex
 * @return {State}
 */
const changeHex = (state, nextHex) => {
	const next = getColor(nextHex, state.disableAlpha);
	return commit(state, next);
};

/**
 * @param {State} state
 * @param {Action} action
 */
function reducer(state, action) {
	switch (action.type) {
		case 'INCREMENT': {
			const { b, g, r } = rgb(state);
			const next = { r, g, b };

			switch (true) {
				case b < 255:
					next.b = b + 1;
					break;
				case g < 255:
					next.g = g + 1;
					break;
				case r < 255:
					next.r = r + 1;
					break;
				default:
					break;
			}
			return changeRgb(state, next);
		}
		case 'DECREMENT': {
			const { b, g, r } = rgb(state);
			const next = { r, g, b };

			switch (true) {
				case b > 0:
					next.b = b - 1;
					break;
				case g > 0:
					next.g = g - 1;
					break;
				case r > 0:
					next.r = r - 1;
					break;
				default:
					break;
			}
			return changeRgb(state, next);
		}
		case 'COMMIT': {
			return commit(state, action.next);
		}
		case 'CHANGE_RGB': {
			return changeRgb(state, action.next);
		}
		case 'CHANGE_HSL': {
			return changeHsl(state, action.next);
		}
		case 'CHANGE_HEX': {
			return changeHex(state, action.next);
		}
		case 'SET_COLOR_FOR_ELEMENT': {
			return {
				...state,
				colorForElement: action.next,
			};
		}
		case 'SET_INPUT_TYPE': {
			return {
				...state,
				inputType: action.next,
			};
		}
		default:
			return state;
	}
}

/**
 * @typedef Store
 * @property {() => import('tinycolor2').ColorFormats.HSL} hsl
 * @property {() => import('tinycolor2').ColorFormats.RGB} rgb
 * @property {() => string} hex
 * @property {() => string} getColorValue
 */

export function useColorPickerStore(initialState) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const increment = useCallback(() => dispatch({ type: 'INCREMENT' }), [
		dispatch,
	]);
	const decrement = useCallback(() => dispatch({ type: 'DECREMENT' }), [
		dispatch,
	]);
	const commitAction = useCallback(
		(/** @type {import('tinycolor2').ColorInput} */ next) =>
			dispatch({ type: 'COMMIT', next }),
		[dispatch],
	);
	const setInputType = useCallback(
		(/** @type {string} */ next) =>
			dispatch({ type: 'SET_INPUT_TYPE', next }),
		[dispatch],
	);
	const setColorForElement = useCallback(
		(next) => dispatch({ type: 'SET_COLOR_FOR_ELEMENT', next }),
		[dispatch],
	);
	const change = {
		rgb: useCallback(
			(/** @type {import('tinycolor2').ColorFormats.RGB} */ next) =>
				dispatch({ type: 'CHANGE_RGB', next }),
			[dispatch],
		),
		hsl: useCallback(
			(/** @type {import('tinycolor2').ColorFormats.HSL} */ next) =>
				dispatch({ type: 'CHANGE_HSL', next }),
			[dispatch],
		),
		hex: useCallback(
			(/** @type {string} */ next) =>
				dispatch({ type: 'CHANGE_HEX', next }),
			[dispatch],
		),
	};

	return {
		...state,
		hsl: () => hsl(state),
		hex: () => hex(state),
		rgb: () => rgb(state),
		getColorValue: () => getColorValue(state),
		increment,
		decrement,
		commit: commitAction,
		setColorForElement,
		setInputType,
		change,
	};
}
