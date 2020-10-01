import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';

export function createComponent({
	as = 'div',
	name = 'Component',
	useHook = () => ({}),
	memo = true,
}) {
	function Component(props, forwardedRef) {
		const otherProps = useHook(props);

		return <View as={as} {...otherProps} ref={forwardedRef} />;
	}

	Component.displayName = name;

	return contextConnect(Component, name, { memo });
}
