import { check } from '@wordpress/icons';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useUpdateEffect } from '@wp-g2/utils';
import { useSelect } from 'downshift';
import React from 'react';
import { usePopoverState } from 'reakit';

import { Button } from '../Button';
import { Card } from '../Card';
import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';

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

function SelectDropdown(props, forwardedRef) {
	const {
		className,
		elevation = 3,
		hideLabelFromVision,
		label,
		onChange: onSelectedItemChange,
		placeholder,
		options: items = [],
		visible = true,
		unstable_fixed = true,
		value: _selectedItem,
		...otherProps
	} = useContextSystem(props, 'SelectDropdown');

	const popover = usePopoverState({
		placement: 'bottom-start',
		animated: 80,
		unstable_fixed,
		visible,
	});

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
		onSelectedItemChange,
		selectedItem: _selectedItem,
		stateReducer,
	});

	const menuProps = getMenuProps({
		className: 'components-custom-select-control__menu',
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

	useUpdateEffect(() => {
		if (!isOpen) {
			// popover.hide();
		}
	}, [isOpen]);

	return (
		<div
			className={cx('components-custom-select-control', className)}
			ref={forwardedRef}
		>
			<Popover
				{...menuProps}
				state={popover}
				trigger={
					<Button
						hasCaret
						{...getToggleButtonProps({
							// This is needed because some speech recognition software don't support `aria-labelledby`.
							'aria-label': label,
							'aria-labelledby': undefined,
							className:
								'components-custom-select-control__button',
						})}
					>
						{itemToString(selectedItem) || placeholder}
					</Button>
				}
				unstable_removeFromDOMOnHide={false}
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
				{items.map((item, index) => (
					// eslint-disable-next-line react/jsx-key
					<View
						{...getItemProps({
							item,
							index,
							key: item.key,
							className: cx(
								item.className,
								'components-custom-select-control__item',
								{
									'is-highlighted':
										index === highlightedIndex,
								},
							),
							style: item.style,
						})}
					>
						{item.name}
						{item === selectedItem && (
							<Icon
								className="components-custom-select-control__item-icon"
								icon={check}
							/>
						)}
					</View>
				))}
			</Popover>
		</div>
	);
}

export default contextConnect(SelectDropdown, 'SelectDropdown');
