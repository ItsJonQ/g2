import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';

export function createComponent({
	as = 'div',
	namespace = 'Component',
	useHook = () => ({}),
}) {
	function Component(props, forwardedRef) {
		const otherProps = useHook(props);

		return <View as={as} {...otherProps} ref={forwardedRef} />;
	}
	Component.displayName = namespace;

	return contextConnect(Component, namespace);
}
