import { useMenuState } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import React from 'react';

import { DropdownContext } from './Dropdown.Context';

function Dropdown({
	animated = true,
	animationDuration = 160,
	animationTimingFunction = 'ease',
	baseId,
	children,
	gutter = 4,
	id,
	label,
	modal = true,
	placement,
	visible,
	...props
}) {
	const menu = useMenuState({
		animated: animated ? animationDuration : undefined,
		baseId: baseId || id,
		gutter,
		modal,
		placement,
		visible,
		...props,
	});
	const uniqueId = `dropdown-${menu.baseId}`;
	const contextProps = {
		animationDuration,
		animationTimingFunction,
		label: label || uniqueId,
		menu,
	};

	return (
		<DropdownContext.Provider value={contextProps}>
			{children}
		</DropdownContext.Provider>
	);
}

export default connect(Dropdown, 'Dropdown');
