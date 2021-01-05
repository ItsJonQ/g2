import { __ } from '@wordpress/i18n';
import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { createUnitValue, is, noop } from '@wp-g2/utils';
import React from 'react';

import * as styles from './font-size-control-styles';
import {
	getInputValue,
	getSelectOptions,
	getSelectValueFromFontSize,
	hasUnit,
	isCustomSelectedItem,
} from './font-size-control-utils';

export function useFontSizeControl(props) {
	const {
		className,
		customLabel = __('Custom'),
		disableCustomFontSizes,
		disabled = false,
		fontSizes = [],
		isPreviewable,
		label = __('Font size'),
		max = 100,
		maxWidth,
		min = 1,
		minWidth,
		onChange = noop,
		onClose,
		onOpen,
		placeholder,
		renderItem,
		size,
		value,
		withSlider = false,
		...otherProps
	} = useContextSystem(props, 'FontSizeControl');

	const hasUnits = hasUnit(value || fontSizes[0]?.size);

	const options = getSelectOptions({
		options: fontSizes,
		disableCustomFontSizes,
		value,
	});

	const handleOnReset = React.useCallback(() => {
		onChange(undefined);
	}, [onChange]);

	const handleOnChange = React.useCallback(
		({ selectedItem }) => {
			if (isCustomSelectedItem(selectedItem)) return;

			if (hasUnits) {
				onChange(selectedItem.size);
			} else {
				if (is.defined(selectedItem.size)) {
					onChange(Number(selectedItem.size));
				} else {
					handleOnReset();
				}
			}
		},
		[handleOnReset, hasUnits, onChange],
	);

	const handleOnInputChange = React.useCallback(
		(next) => {
			if (!next && next !== 0) {
				handleOnReset();
				return;
			}
			if (hasUnits) {
				onChange(createUnitValue(next, 'px'));
			} else {
				onChange(Number(next));
			}
		},
		[handleOnReset, hasUnits, onChange],
	);

	const inputValue = getInputValue(fontSizes, value);

	const selectedFontSizeSlug = getSelectValueFromFontSize(fontSizes, value);
	const currentValue = options.find(
		(option) => option.key === selectedFontSizeSlug,
	);

	const isDefaultValue = !is.defined(value);

	const classes = cx(styles.FontSizeControl, className);

	const withSelect = fontSizes.length > 0;
	const withNumberInput = !withSlider && !disableCustomFontSizes;

	const selectDropdownProps = {
		isPreviewable,
		maxWidth,
		minWidth,
		onClose,
		onOpen,
		placeholder,
		renderItem,
	};

	return {
		...otherProps,
		className: classes,
		customLabel,
		disabled,
		inputValue,
		isDefaultValue,
		label,
		max,
		min,
		onChange: handleOnChange,
		onInputChange: handleOnInputChange,
		onReset: handleOnReset,
		options,
		selectDropdownProps,
		size,
		value: currentValue,
		withNumberInput,
		withSelect,
		withSlider,
	};
}
