import { connect } from '@wp-g2/provider';
import React from 'react';
import { useMenuState } from 'reakit/Menu';

import { DropdownContext } from './Dropdown.Context';

function Dropdown({
	animated = true,
	animationDuration = 160,
	animationTimingFunction = 'ease',
	children,
	gutter = 4,
	label,
	modal = true,
	placement,
	visible,
	...props
}) {
	const menu = useMenuState({
		animated: animated ? animationDuration : undefined,
		gutter,
		modal,
		placement,
		visible,
		...props,
	});
	const uniqueId = `dropdown-${menu.baseId}`;
	const contextValue = {
		animationDuration,
		animationTimingFunction,
		label: label || uniqueId,
		menu,
	};

	return (
		<DropdownContext.Provider value={contextValue}>
			{children}
		</DropdownContext.Provider>
	);
}

export default connect(Dropdown);
