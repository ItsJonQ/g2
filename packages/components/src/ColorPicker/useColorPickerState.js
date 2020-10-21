import { ui } from '@wp-g2/styles';
import { shallowCompare, useSubState } from '@wp-g2/substate';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React, { useCallback } from 'react';

export function useColorPickerState(props) {
	const {
		color: colorProp,
		changeFormat,
		onChange = noop,
		disableAlpha = true,
		inputType = 'hex',
		showPreview = true,
	} = props;
	const initialColor = getInitialColor(colorProp, disableAlpha);

	const store = useSubState((set) => ({
		// State
		colorForElementPreviousValue: '',
		colorForElement: initialColor,
		color: getColor(colorProp, disableAlpha),
		changeFormat,
		inputType,
		disableAlpha,
		showPreview,

		// Selectors
		hsl: () => ui.color(store.getState().color).toHsl(),
		hex: () => ui.color(store.getState().color).toHex(),
		rgb: () => ui.color(store.getState().color).toRgb(),
		getColorValue: () => {
			const { color, inputType } = store.getState();
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
		},

		// Actions
		increment: () => {
			const { b, g, r } = store.getState().rgb();
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
			store.getState().change.rgb(next);
		},
		decrement: () => {
			const { b, g, r } = store.getState().rgb();
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
			store.getState().change.rgb(next);
		},

		commit: (next) => {
			set((prev) => {
				if (isEqualColor(prev.colorForElementPreviousValue, next))
					return;

				const hasAlpha = ui.color(next).getAlpha() !== 1;

				const nextState = {
					colorForElementPreviousValue: prev.colorForElement,
					colorForElement: getInitialColor(next, prev.disableAlpha),
					color: next,
				};

				if (prev.disableAlpha && hasAlpha) {
					nextState.disableAlpha = false;
				}

				return nextState;
			});
		},

		change: {
			rgb: (nextValues) => {
				set((prev) => {
					let next = { ...prev.rgb(), ...nextValues };
					next = getColor(next, prev.disableAlpha);
					prev.commit(next);
				});
			},
			hsl: (nextValues) => {
				set((prev) => {
					let next = { ...prev.hsl(), ...nextValues };
					next = getColor(next, prev.disableAlpha);
					prev.commit(next);
				});
			},
			hex: (nextValues) => {
				set((prev) => {
					let next = nextValues;
					next = getColor(next, prev.disableAlpha);
					prev.commit(next);
				});
			},
		},
	}));

	// Work-around for controlling internal/external state for react-colorful
	const didIncomingChange = React.useRef(false);
	const currentColor = React.useRef(initialColor);

	const { color: internalColor } = store();

	const handleOnCommit = useCallback(
		(next) => {
			const { changeFormat } = store.getState();
			let changeValue = next;
			let data = ui.color(next).toRgb();

			switch (changeFormat) {
				case 'hex':
					changeValue = ui.color(next).toHexString();
					break;
				case 'rgb':
					changeValue = ui.color(next).toRgbString();
					break;
				case 'hsl':
					changeValue = ui.color(next).toHslString();
					data = ui.color(next).toHsl();
					break;
				default:
					break;
			}

			onChange(changeValue, data);
		},
		[store, onChange],
	);

	const handleOnChange = useCallback(
		(next) => {
			const nextColor = getColor(next, disableAlpha);

			if (didIncomingChange.current) {
				didIncomingChange.current = false;
				return;
			}
			handleOnCommit(nextColor);
			currentColor.current = getInitialColor(next, disableAlpha);

			store.getState().commit(nextColor);
		},
		[disableAlpha, handleOnCommit, store],
	);

	React.useEffect(() => {
		return store.subscribe(
			handleOnCommit,
			(state) => state.color,
			shallowCompare,
		);
	}, [handleOnCommit, store]);

	useUpdateEffect(() => {
		if (isEqualColor(colorProp, currentColor.current)) return;

		const next = getInitialColor(colorProp, disableAlpha);

		didIncomingChange.current = true;

		store.getState().commit(next);
		store.setState({ colorForElement: getInitialColor(colorProp) });

		currentColor.current = getInitialColor(colorProp);
	}, [colorProp, disableAlpha]);

	useUpdateEffect(() => {
		if (isEqualColor(internalColor, currentColor.current)) return;

		const next = getInitialColor(internalColor, disableAlpha);

		store.setState({ colorForElement: next });

		currentColor.current = next;
	}, [internalColor]);

	return {
		store,
		onChange: handleOnChange,
	};
}

function getColor(color, disableAlpha) {
	return disableAlpha
		? ui.color(color).toHexString()
		: ui.color(color).toRgbString();
}

function getInitialColor(color) {
	return ui.color(color).toRgbString();
}

function isEqualColor(first, second) {
	return ui.color(first).toRgbString() === ui.color(second).toRgbString();
}
