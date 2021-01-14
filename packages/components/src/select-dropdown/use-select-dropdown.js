import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import {
	mergeRefs,
	noop,
	simpleEqual,
	useResizeAware,
	useUpdateEffect,
} from '@wp-g2/utils';
import { useSelect } from 'downshift';
import { useReducer } from 'react';
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

/**
 * @typedef State
 * @property {boolean} isOpen
 * @property {unknown} value
 * @property {unknown} commitValue
 */

/** @typedef {{ type: 'SET_VALUE', next: unknown }} SetValueAction */
/** @typedef {{ type: 'RESET_VALUE' }} ResetValueAction */
/** @typedef {{ type: 'SET_COMMIT_VALUE', next: unknown }} SetCommitValueAction */
/** @typedef {{ type: 'SET_OPEN', next: boolean }} SetOpenAction */
/** @typedef {
	| SetValueAction
	| ResetValueAction
	| SetCommitValueAction
	| SetOpenAction
} Action
 */

/**
 *
 * @param {State} state
 * @param {Action} action
 */
const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_VALUE': {
			return {
				...state,
				value: action.next,
			};
		}
		case 'RESET_VALUE': {
			return {
				...state,
				value: state.commitValue,
			};
		}
		case 'SET_COMMIT_VALUE': {
			return {
				...state,
				commitValue: action.next,
			};
		}
		case 'SET_OPEN': {
			return {
				...state,
				isOpen: action.next,
			};
		}
		default:
			return state;
	}
};

/**
 * @param {unknown} value
 * @return {State}
 */
function useInitialState(value) {
	return {
		isOpen: false,
		value,
		commitValue: value,
	};
}

function useSelectDropdownStore({ isPreviewable, onChange, value }) {
	const initialState = useInitialState(value);
	const [state, dispatch] = useReducer(reducer, initialState);

	const resetValue = useCallback(() => dispatch({ type: 'RESET_VALUE' }), [
		dispatch,
	]);
	const setValue = useCallback(
		(/** @type {unknown} */ next) => dispatch({ type: 'SET_VALUE', next }),
		[dispatch],
	);
	const setCommitValue = useCallback(
		(/** @type {unknown} */ next) =>
			dispatch({ type: 'SET_COMMIT_VALUE', next }),
		[dispatch],
	);
	const setOpen = useCallback(
		(/** @type {boolean} */ next) => dispatch({ type: 'SET_OPEN', next }),
		[dispatch],
	);

	const store = {
		...state,
		resetValue,
		setValue,
		setCommitValue,
		setOpen,
	};

	// Propogate (preview) value
	useUpdateEffect(() => {
		if (!isPreviewable) return;
		onChange({ selectedItem: state.value });
	}, [onChange, state.value, isPreviewable]);

	// Propogate (selected/commit) value
	useUpdateEffect(() => {
		onChange({ selectedItem: state.commitValue });
	}, [onChange, state.commitValue]);

	// Sync incoming value.
	useEffect(() => {
		if (!store.isOpen && !simpleEqual(store.commitValue, value)) {
			store.setCommitValue(value);
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
	const { commitValue, setCommitValue, setValue } = store;
	const currentItem = getSelectedItem(items, commitValue);

	/** @type {import('react').MutableRefObject<HTMLSelectElement>} */
	const selectRef = useRef();

	const handleOnChange = useCallback(
		(next) => {
			setCommitValue(next.selectedItem);
		},
		[setCommitValue],
	);

	const handleOnHighlightChange = useCallback(
		({ highlightedIndex }) => {
			if (!isPreviewable) return;
			const item = items[highlightedIndex];
			setValue(item);
		},
		[isPreviewable, items, setValue],
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

	const focusSelectButton = useCallback(() => {
		if (selectRef.current) {
			selectRef.current.focus();
		}
	}, []);

	const handleOnOpen = useCallback(() => {
		store.setOpen(true);

		onOpen();
	}, [onOpen, store]);

	const handleOnClose = useCallback(() => {
		store.setOpen(false);
		store.resetValue();

		focusSelectButton();
		onClose();
	}, [focusSelectButton, onClose, store]);

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
			// @ts-ignore Unsupported property @todo(itsjonq) is this a real option?
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
