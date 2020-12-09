import { contextConnect } from '@wp-g2/context';
import { identity } from 'lodash';
import React from 'react';

import { View } from '../View';

/**
 * @template {import('reakit-utils/types').As} T
 * @template {import('@wp-g2/create-styles').ViewOwnProps<{}, T>} P
 * @param {import('./types').Options<T, P>} options
 * @return {import('@wp-g2/create-styles').PolymorphicComponent<T, import('@wp-g2/create-styles').PropsFromViewOwnProps<P>>}
 */
export const createComponent = ({
	as,
	name = 'Component',
	useHook = identity,
	memo = true,
}) => {
	/**
	 * @param {P} props
	 * @param {import('react').Ref<T>} forwardedRef
	 */
	function Component(props, forwardedRef) {
		const otherProps = useHook(props);

		return <View as={as || 'div'} {...otherProps} ref={forwardedRef} />;
	}

	Component.displayName = name;

	return contextConnect(Component, name, { memo });
};
