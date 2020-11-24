import { createPopper } from '@popperjs/core';
import { isShallowEqualObjects } from '@wordpress/is-shallow-equal';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import {
	mergeRefs,
	useIsomorphicLayoutEffect,
	useSealedState,
} from '@wp-g2/utils';
import { useSelect } from 'downshift';
import React from 'react';

import { Button } from '../Button';
import { DropdownMenuCard } from '../Dropdown';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import SelectDropdownItem from './select-dropdown-item';
import * as styles from './select-dropdown-styles';

const itemToString = (item) => item && item.name;
// This is needed so that in Windows, where
// the menu does not necessarily open on
// key up/down, you can still switch between
// options with the menu closed.
const stateReducer = (
	{ selectedItem },
	{ changes, props: { items }, type },
) => {
	switch (type) {
		case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown:
			// If we already have a selected item, try to select the next one,
			// without circular navigation. Otherwise, select the first item.
			return {
				selectedItem:
					items[
						selectedItem
							? Math.min(
									items.indexOf(selectedItem) + 1,
									items.length - 1,
							  )
							: 0
					],
			};
		case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp:
			// If we already have a selected item, try to select the previous one,
			// without circular navigation. Otherwise, select the last item.
			return {
				selectedItem:
					items[
						selectedItem
							? Math.max(items.indexOf(selectedItem) - 1, 0)
							: items.length - 1
					],
			};
		default:
			return changes;
	}
};

function applyStyles(styles) {
	return (prevStyles) => {
		if (styles && !isShallowEqualObjects(prevStyles, styles)) {
			return styles;
		}
		return prevStyles;
	};
}

function SelectDropdown(props, forwardedRef) {
	const {
		className,
		hideLabelFromVision,
		label,
		onChange,
		renderItem,
		maxWidth = 320,
		minWidth = 200,
		placeholder,
		options: items = [],
		offset: offsetProp,
		visible,
		value,
		...otherProps
	} = useContextSystem(props, 'SelectDropdown');

	const {
		gutter = 12,
		modal = false,
		placement: sealedPlacement = 'bottom-start',
		unstable_fixed: fixed = false,
		unstable_flip: flip = true,
		unstable_offset: sealedOffset,
		unstable_preventOverflow: preventOverflow = true,
		...sealed
	} = useSealedState({ offset: offsetProp, visible });

	const popper = React.useRef(null);
	const referenceRef = React.useRef(null);
	const popoverRef = React.useRef(null);
	const popperCreated = React.useRef(false);
	const [originalPlacement, place] = React.useState(sealedPlacement);
	const [offset] = React.useState(sealedOffset || [0, gutter]);

	useIsomorphicLayoutEffect(() => {
		if (referenceRef.current && popoverRef.current) {
			popper.current = createPopper(
				referenceRef.current,
				popoverRef.current,
				{
					// https://popper.js.org/docs/v2/constructors/#options
					placement: originalPlacement,
					strategy: fixed ? 'fixed' : 'absolute',
					modifiers: [
						{
							// https://popper.js.org/docs/v2/modifiers/offset/
							name: 'offset',
							options: {
								offset: [0, 4],
							},
						},
					],
				},
			);
			popperCreated.current = true;
		}
		return () => {
			if (popper.current) {
				popper.current.destroy();
				popper.current = null;
			}
		};
	}, [
		originalPlacement,
		fixed,
		sealed.visible,
		flip,
		offset,
		preventOverflow,
	]);

	const handleOnChange = React.useCallback(
		(selectedProps) => {
			onChange(selectedProps);
		},
		[onChange],
	);

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
		itemToString,
		onSelectedItemChange: handleOnChange,
		selectedItem: value,
		stateReducer,
	});

	const popoverProps = getMenuProps({
		className: styles.MenuWrapper,
		'aria-hidden': !isOpen,
	});
	// We need this here, because the null active descendant is not
	// fully ARIA compliant.
	if (
		popoverProps['aria-activedescendant'] &&
		popoverProps['aria-activedescendant'].slice(
			0,
			'downshift-null'.length,
		) === 'downshift-null'
	) {
		delete popoverProps['aria-activedescendant'];
	}

	// Ensure that the popover will be correctly positioned with an additional
	// update.
	React.useEffect(() => {
		// const id = window.requestAnimationFrame(() => {
		// 	popper.current?.forceUpdate && popper.current.forceUpdate();
		// });
		// return () => {
		// 	window.cancelAnimationFrame(id);
		// };
	}, []);

	const dropdownMenuCardClasses = cx(css({ minWidth, maxWidth }));

	const referenceProps = getToggleButtonProps({
		// This is needed because some speech recognition software don't support `aria-labelledby`.
		'aria-label': label,
		'aria-labelledby': undefined,
		className: 'components-custom-select-control__button',
	});

	return (
		<View
			className={cx(
				'components-custom-select-control',
				styles.SelectDropdown,
				className,
			)}
			ref={forwardedRef}
		>
			<Button
				hasCaret
				{...referenceProps}
				ref={mergeRefs([referenceRef, referenceProps.ref])}
			>
				{itemToString(selectedItem) || placeholder}
			</Button>
			<div
				{...popoverProps}
				ref={mergeRefs([popoverRef, popoverProps.ref])}
			>
				{hideLabelFromVision ? (
					<VisuallyHidden as="label" {...getLabelProps()}>
						{label}
					</VisuallyHidden>
				) : (
					/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
					<label
						{...getLabelProps({
							className:
								'components-custom-select-control__label',
						})}
					>
						{label}
					</label>
				)}
				{isOpen && (
					<DropdownMenuCard className={dropdownMenuCardClasses}>
						{items.map((item, index) => (
							// eslint-disable-next-line react/jsx-key
							<SelectDropdownItem
								{...item}
								index={index}
								renderItem={renderItem}
								{...getItemProps({
									item,
									index,
									key: item.key,
									style: item.style,
									isHighlighted: index === highlightedIndex,
									isSelected: item === selectedItem,
								})}
							/>
						))}
					</DropdownMenuCard>
				)}
			</div>
		</View>
	);
}

export default contextConnect(SelectDropdown, 'SelectDropdown');
