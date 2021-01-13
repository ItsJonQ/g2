import { ui } from '@wp-g2/styles';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React, { useCallback } from 'react';

import {
	getColor,
	isEqualColor,
	useColorPickerStore,
	useInitialState,
} from './use-color-picker-store';

export function useColorPickerState(props) {
	const {
		color: colorProp,
		changeFormat,
		onChange = noop,
		disableAlpha = true,
		inputType = 'hex',
		showPreview = true,
	} = props;
	const initialColor = getColor(colorProp, disableAlpha);

	const initialState = useInitialState({
		color: initialColor,
		changeFormat,
		colorForElement: initialColor,
		inputType,
		disableAlpha,
		showPreview,
	});
	const store = useColorPickerStore(initialState);

	// Work-around for controlling internal/external state for react-colorful
	const didIncomingChange = React.useRef(false);
	const currentColor = React.useRef(initialColor);

	const { color: internalColor } = store;

	const handleOnCommit = useCallback(
		(next) => {
			const { changeFormat } = store;
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
			currentColor.current = getColor(next, disableAlpha);

			store.commit(nextColor);
		},
		[disableAlpha, handleOnCommit, store],
	);

	useUpdateEffect(() => {
		handleOnCommit(store.color);
	}, [handleOnCommit, store.color]);

	useUpdateEffect(() => {
		if (isEqualColor(colorProp, currentColor.current)) return;

		const next = getColor(colorProp, disableAlpha);

		didIncomingChange.current = true;

		store.commit(next);
		store.setColorForElement(getColor(colorProp));

		currentColor.current = getColor(colorProp);
	}, [colorProp, disableAlpha]);

	useUpdateEffect(() => {
		if (isEqualColor(internalColor, currentColor.current)) return;

		const next = getColor(internalColor, disableAlpha);

		store.setColorForElement(next);

		currentColor.current = next;
	}, [internalColor]);

	return {
		store,
		onChange: handleOnChange,
	};
}
