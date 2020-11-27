import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { DropdownMenuCard } from '../Dropdown';
import { Portal } from '../Portal';
import { Select } from '../Select';
import { Truncate } from '../Truncate';
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
		resizer,
		...otherProps
	} = useSelectDropdown(props);

	return (
		<View {...otherProps} ref={forwardedRef}>
			{resizer}
			<Select as="button" {...referenceProps}>
				<Truncate>{referenceProps.children}</Truncate>
			</Select>
			<Portal>
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
			</Portal>
		</View>
	);
}

export default contextConnect(SelectDropdown, 'SelectDropdown');
