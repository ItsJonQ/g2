import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { Button } from '../Button';
import { DropdownMenuCard } from '../Dropdown';
import { View } from '../View';
import SelectDropdownItem from './select-dropdown-item';
import SelectDropdownLabel from './select-dropdown-label';
import { useSelectDropdown } from './use-select-dropdown';

function SelectDropdown(props, forwardedRef) {
	const {
		dropdownMenuProps,
		hideLabelFromVision,
		isOpen,
		items,
		label,
		labelProps,
		placeholder,
		popoverProps,
		popoverRef,
		referenceProps,
		referenceRef,
		...otherProps
	} = useSelectDropdown(props);

	return (
		<View {...otherProps} ref={forwardedRef}>
			<Button hasCaret {...referenceProps} />
			<View {...popoverProps}>
				<SelectDropdownLabel {...labelProps} />
				{isOpen && (
					<DropdownMenuCard {...dropdownMenuProps}>
						{items.map((item) => (
							// eslint-disable-next-line react/jsx-key
							<SelectDropdownItem {...item} />
						))}
					</DropdownMenuCard>
				)}
			</View>
		</View>
	);
}

export default contextConnect(SelectDropdown, 'SelectDropdown');
