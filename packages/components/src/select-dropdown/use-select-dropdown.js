import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { mergeRefs, useResizeAware } from '@wp-g2/utils';
import { useSelect } from 'downshift';
import React from 'react';

import { usePositioner } from '../positioner';
import * as styles from './select-dropdown-styles';
import { itemToString, stateReducer } from './select-dropdown-utils';

const CONTROL_BORDER_WIDTH = -1;
const OFFSET = [CONTROL_BORDER_WIDTH, 4];

export function useSelectDropdown(props) {
	const {
		className,
		error,
		hideLabelFromVision,
		isInline,
		isSubtle,
		isOpen: isOpenProp,
		label,
		maxWidth: maxWidthProp = 280,
		minWidth = 200,
		onChange,
		options: items = [],
		placeholder,
		prefix,
		renderItem,
		size,
		suffix,
		textAlign,
		value,
		variant,
		...otherProps
	} = useContextSystem(props, 'SelectDropdown');

	const [resizer, sizes] = useResizeAware();
	const { popoverRef, popper, referenceRef } = usePositioner({
		...otherProps,
		unstable_offset: OFFSET,
	});

	const handleOnChange = React.useCallback(onChange, [onChange]);

	const {
		getItemProps,
		getLabelProps,
		getMenuProps,
		getToggleButtonProps,
		highlightedIndex,
		isOpen,
		selectedItem,
	} = useSelect({
		initialSelectedItem: items[0],
		items,
		isOpen: isOpenProp,
		itemToString,
		onSelectedItemChange: handleOnChange,
		selectedItem: value,
		stateReducer,
	});

	const _popoverProps = getMenuProps({
		...ui.$('SelectDropdownPopover'),
		className: styles.MenuWrapper,
		'aria-hidden': !isOpen,
		style: {
			maxWidth: isInline ? maxWidthProp : sizes.width,
			width: isInline ? null : '100%',
		},
	});
	// We need this here, because the null active descendant is not
	// fully ARIA compliant.
	if (
		_popoverProps['aria-activedescendant'] &&
		_popoverProps['aria-activedescendant'].slice(
			0,
			'downshift-null'.length,
		) === 'downshift-null'
	) {
		delete _popoverProps['aria-activedescendant'];
	}

	const popoverProps = {
		..._popoverProps,
		ref: mergeRefs([_popoverProps.ref, popoverRef]),
	};

	const _referenceProps = getToggleButtonProps({
		// This is needed because some speech recognition software don't support `aria-labelledby`.
		'aria-label': label,
		'aria-labelledby': undefined,
	});

	const referenceProps = {
		...ui.$('SelectDropdownReference'),
		..._referenceProps,
		children: itemToString(selectedItem) || placeholder,
		error,
		isSubtle,
		prefix,
		suffix,
		ref: mergeRefs([_referenceProps.ref, referenceRef]),
		size,
		textAlign,
		variant,
	};

	const labelProps = { ...getLabelProps(), as: 'label', children: label };

	const enhancedItems = items.map((item, index) => ({
		...item,
		index,
		renderItem,
		...getItemProps({
			item,
			index,
			key: item.key,
			style: item.style,
			isHighlighted: index === highlightedIndex,
			isSelected: item === selectedItem,
		}),
	}));

	const classes = cx(
		styles.SelectDropdown,
		isInline && styles.inline,
		className,
	);

	const dropdownMenuProps = {
		...ui.$('SelectDropdownMenu'),
		className: cx(styles.DropdownMenu, css({ minWidth })),
	};

	// Ensure that the popover will be correctly positioned with an additional
	// update.
	// https://github.com/reakit/reakit/blob/master/packages/reakit/src/Popover/PopoverState.ts
	React.useEffect(() => {
		if (!isOpen) return undefined;
		const id = window.requestAnimationFrame(() => {
			popper.current.forceUpdate();
		});
		return () => {
			window.cancelAnimationFrame(id);
		};
	}, [isOpen, popper]);

	return {
		className: classes,
		dropdownMenuProps,
		labelProps,
		popoverProps,
		resizer,
		referenceProps,
		items: enhancedItems,
		isOpen,
		hideLabelFromVision,
		...otherProps,
	};
}
