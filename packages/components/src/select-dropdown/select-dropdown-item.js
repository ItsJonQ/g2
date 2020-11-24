import { contextConnect, useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { renderChildren } from '@wp-g2/utils';
import React from 'react';

import { MenuItem } from '../Menu';

function SelectDropdownItem(props, forwardedRef) {
	const {
		className,
		index,
		isHighlighted,
		isSelected,
		label,
		name,
		renderItem,
		...otherProps
	} = useContextSystem(props, 'SelectDropdownItem');

	const itemLabel = label || name;

	const itemProps = {
		index,
		isHighlighted,
		isSelected,
		label,
		name,
		...otherProps,
	};

	const content = renderChildren(renderItem || itemLabel, itemProps);

	return (
		<MenuItem
			{...ui.$('SelectDropdownItem')}
			{...otherProps}
			className={className}
			isSelected={isSelected}
			ref={forwardedRef}
		>
			{content}
		</MenuItem>
	);
}

export default contextConnect(SelectDropdownItem, 'SelectDropdownItem');
