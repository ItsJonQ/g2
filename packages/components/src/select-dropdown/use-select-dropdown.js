import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { mergeRefs, noop, useResizeAware, useUpdateEffect } from '@wp-g2/utils';
import { useSelect } from 'downshift';
import { useState } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import { useFormGroupContextId } from '../FormGroup';
import { usePositioner } from '../positioner';
import * as styles from './select-dropdown-styles';
import {
	getSelectedItem,
	itemToString,
	stateReducer,
} from './select-dropdown-utils';

const CONTROL_BORDER_WIDTH = -1;
const OFFSET = [CONTROL_BORDER_WIDTH, 4];

function useSelectDropdownPositioner({
	unstable_offset = OFFSET,
	isOpen = false,
	...otherProps
}) {
	const [resizer, sizes] = useResizeAware();
	const { popoverRef, popper, referenceRef } = usePositioner({
		...otherProps,
		unstable_offset: OFFSET,
	});

	// Ensure that the popover will be correctly positioned with an additional
	// update.
	// https://github.com/reakit/reakit/blob/master/packages/reakit/src/Popover/PopoverState.ts
	useEffect(() => {
		if (!isOpen) return undefined;
		const id = window.requestAnimationFrame(() => {
			popper.current.forceUpdate();
		});
		return () => {
			window.cancelAnimationFrame(id);
		};
	}, [isOpen, popper]);

	return {
		resizer,
		sizes,
		popoverRef,
		popper,
		referenceRef,
	};
}

export function useSelectDropdown(props) {
	const {
		className,
		error,
		hideLabelFromVision,
		id: idProp,
		isPreviewable = false,
		isInline,
		isSubtle,
		isOpen: isOpenProp,
		label,
		maxWidth: maxWidthProp = 280,
		minWidth = 200,
		onOpen = noop,
		onClose = noop,
		onChange = noop,
		options: items = [],
		placeholder,
		prefix,
		renderItem,
		size,
		suffix,
		textAlign,
		value: initialValue,
		variant,
		...otherProps
	} = useContextSystem(props, 'SelectDropdown');

	const [actualValue, setActualValue] = useState(initialValue);

	const currentItem = getSelectedItem(items, actualValue);

	/** @type {import('react').MutableRefObject<HTMLSelectElement>} */
	const selectRef = useRef();

	const handleOnChange = useCallback(
		(next) => {
			onChange(next);
		},
		[onChange],
	);

	const handleOnHighlightChange = useCallback(
		({ highlightedIndex }) => {
			if (!isPreviewable) return;
			const item = items[highlightedIndex];
			if (item) onChange({ selectedItem: item });
		},
		[isPreviewable, items, onChange],
	);

	/**
	 * Sets up Downshift, the library used for the SelectDropdown component.
	 */
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
		onHighlightedIndexChange: handleOnHighlightChange,
		onSelectedItemChange: handleOnChange,
		selectedItem: currentItem,
		stateReducer,
	});

	useEffect(() => {
		if (isPreviewable && isOpen) return;
		setActualValue(initialValue);
	}, [initialValue, isOpen, isPreviewable]);

	/**
	 * Sets up DOM render effects.
	 */
	const {
		popoverRef,
		referenceRef,
		resizer,
		sizes,
	} = useSelectDropdownPositioner({
		...otherProps,
		unstable_offset: OFFSET,
		isOpen,
	});

	const id = useFormGroupContextId(idProp);

	const focusSelectButton = useCallback(() => {
		if (selectRef.current) {
			selectRef.current.focus();
		}
	}, []);

	const handleOnOpen = useCallback(() => {
		onOpen();
	}, [onOpen]);

	const handleOnClose = useCallback(() => {
		focusSelectButton();
		onClose();
	}, [focusSelectButton, onClose]);

	const menuProps = getMenuProps({
		className: styles.MenuWrapper,
		'aria-hidden': !isOpen,
	});

	// We need this here, because the null active descendant is not
	// fully ARIA compliant.
	if (
		menuProps['aria-activedescendant'] &&
		menuProps['aria-activedescendant'].slice(0, 'downshift-null'.length) ===
			'downshift-null'
	) {
		delete menuProps['aria-activedescendant'];
	}

	const popoverProps = {
		...ui.$('SelectDropdownPopover'),
		'aria-hidden': !isOpen,
		className: styles.MenuWrapper,
		ref: popoverRef,
		style: {
			maxWidth: isInline ? maxWidthProp : sizes.width,
			width: isInline ? null : '100%',
		},
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
		id,
		isSubtle,
		prefix,
		suffix,
		ref: mergeRefs([_referenceProps.ref, referenceRef, selectRef]),
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
			key: item.id || item.value || index,
			style: item.style,
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
		className: cx(
			!isOpen && styles.hidden,
			styles.DropdownMenu,
			css({ minWidth }),
		),
	};

	/**
	 * Syncs isOpen state (Downshift) with the internal store.
	 */
	useUpdateEffect(() => {
		if (isOpen) {
			handleOnOpen();
		} else {
			handleOnClose();
		}
	}, [isOpen]);

	return {
		className: classes,
		dropdownMenuProps,
		labelProps,
		popoverProps,
		resizer,
		menuProps,
		referenceProps,
		items: enhancedItems,
		isOpen,
		hideLabelFromVision,
		...otherProps,
	};
}
