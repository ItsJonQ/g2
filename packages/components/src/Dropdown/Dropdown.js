import { contextConnect, useContextSystem } from '@wp-g2/context';
import React, { useMemo } from 'react';
import { useMenuState } from 'reakit';

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

	const contextProps = useMemo(() => {
		const uniqueId = `dropdown-${menu.baseId}`;

		return {
			animationDuration,
			animationTimingFunction,
			label: label || uniqueId,
			menu,
		};
	}, [animationDuration, animationTimingFunction, label, menu]);

	return (
		<DropdownContext.Provider ref={forwardedRef} value={contextProps}>
			{children}
		</DropdownContext.Provider>
	);
}

export default contextConnect(Dropdown, 'Dropdown');
