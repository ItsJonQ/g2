import { contextConnect, useContextSystem } from '@wp-g2/context';
import { renderChildren } from '@wp-g2/utils';
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
		state,
		visible,
		...otherProps
	} = useContextSystem(props, 'Dropdown');

	const _menu = useMenuState({
		animated: animated ? animationDuration : undefined,
		baseId: baseId || id,
		gutter,
		modal,
		placement,
		visible,
		...otherProps,
	});

	const menu = state || _menu;

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
			{renderChildren(children, mapMenuStateToProps(menu))}
		</DropdownContext.Provider>
	);
}

/**
 * Remap Reakit's menuState for `@wordpress/components` current Dropdown/
 * DropdownMenu API.
 *
 * @see
 * https://github.com/WordPress/gutenberg/tree/master/packages/components/src/dropdown-menu
 */
function mapMenuStateToProps(state) {
	const { hide, toggle, visible } = state;
	return { ...state, isOpen: visible, onToggle: toggle, onClose: hide };
}

export default contextConnect(Dropdown, 'Dropdown');
