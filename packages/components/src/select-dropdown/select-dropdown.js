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
		menuProps,
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
			<SelectDropdownLabel {...labelProps} />
			<Portal>
				<View {...popoverProps}>
					<DropdownMenuCard {...dropdownMenuProps}>
						<div {...menuProps}>
							{isOpen && (
								<>
									{items.map((item) => (
										<SelectDropdownItem {...item} />
									))}
								</>
							)}
						</div>
					</DropdownMenuCard>
				</View>
			</Portal>
		</View>
	);
}

export default contextConnect(SelectDropdown, 'SelectDropdown');
