import { useMenuState } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { DropdownContext } from './Dropdown.Context';

function Dropdown(props, forwardedRef) {
	const {
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
		...otherProps
	} = useContextSystem(props, 'Dropdown');

	const menu = useMenuState({
		animated: animated ? animationDuration : undefined,
		baseId: baseId || id,
		gutter,
		modal,
		placement,
		visible,
		...otherProps,
	});

	const uniqueId = `dropdown-${menu.baseId}`;
	const contextProps = {
		animationDuration,
		animationTimingFunction,
		label: label || uniqueId,
		menu,
	};

	return (
		<DropdownContext.Provider ref={forwardedRef} value={contextProps}>
			{children}
		</DropdownContext.Provider>
	);
}

export default contextConnect(Dropdown, 'Dropdown');
