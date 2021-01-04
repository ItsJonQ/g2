import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { shallowCompare, useSubState } from '@wp-g2/substate';
import { mergeRefs, noop, useResizeAware, useUpdateEffect } from '@wp-g2/utils';
import { useSelect } from 'downshift';
import { useCallback, useEffect } from 'react';

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

function useSelectDropdownStore({ isPreviewable, onChange, value }) {
	const store = useSubState((set, get) => ({
		// State
		isOpen: false,
		value,
		commitValue: value,

		// Actions
		resetValue: () => {
			set({ value: get().commitValue });
		},
		setValue: (next) => {
			if (next) {
				set({ value: next });
			}
		},
		setCommitValue: (next) => set({ commitValue: next }),
		setOpen: (isOpen) => set({ isOpen }),
	}));

	// Propogate (preview) value
	useEffect(() => {
		if (!isPreviewable) return;
		return store.subscribe(
			(value) => onChange({ selectedItem: value }),
			(state) => state.value,
			shallowCompare,
		);
	}, [onChange, store, isPreviewable]);

	// Propogate (selected/commit) value
	useEffect(() => {
		return store.subscribe(
			(value) => onChange({ selectedItem: value }),
			(state) => state.commitValue,
			shallowCompare,
		);
	}, [onChange, store]);

	// Sync incoming value.
	useUpdateEffect(() => {
		if (!store.getState().isOpen) {
			store.getState().setCommitValue(value);
		}
	}, [value, store]);

	return store;
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
		value,
		variant,
		...otherProps
	} = useContextSystem(props, 'SelectDropdown');

	/**
	 * Sets up internal store.
	 *
	 * This is used as a "bridge" between the incoming props and the Downshift
	 * state reducer.
	 */
	const store = useSelectDropdownStore({ isPreviewable, value, onChange });
	const { commitValue } = store(
		(state) => ({ commitValue: state.commitValue }),
		shallowCompare,
	);
	const currentItem = getSelectedItem(items, commitValue);

	const handleOnChange = useCallback(
		(next) => {
			store.getState().setCommitValue(next.selectedItem);
		},
		[store],
	);

	const handleOnHighlightChange = useCallback(
		({ highlightedIndex }) => {
			if (!isPreviewable) return;
			const item = items[highlightedIndex];
			store.getState().setValue(item);
		},
		[isPreviewable, items, store],
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

	const handleOnOpen = useCallback(() => {
		store.getState().setOpen(true);
		onOpen();
	}, [onOpen, store]);

	const handleOnClose = useCallback(() => {
		store.getState().setOpen(false);
		store.getState().resetValue();
		onClose();
	}, [onClose, store]);

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
		id,
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
			key: item.id || item.value || index,
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
		referenceProps,
		items: enhancedItems,
		isOpen,
		hideLabelFromVision,
		...otherProps,
	};
}
