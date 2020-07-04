import { connect } from '@g2/provider';
import React from 'react';
import { useMenuState } from 'reakit/Menu';

import { DropdownContext } from './Dropdown.utils';

function Dropdown({
	animated = true,
	animationDuration = 160,
	animationTimingFunction = 'ease',
	children,
	gutter = 4,
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
	const contextValue = {
		animationDuration,
		animationTimingFunction,
		menu,
	};

	return (
		<DropdownContext.Provider value={contextValue}>
			{children}
		</DropdownContext.Provider>
	);
}

export default connect(Dropdown);
