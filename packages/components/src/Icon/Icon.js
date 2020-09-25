import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { css } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Icon.styles';

function Icon(componentProps, forwardedRef) {
	const { children, color, icon, size = 20, ...props } = useContextSystem(
		componentProps,
		'Icon',
	);

	if (!icon) return null;
	const sx = {};

	sx.color = css({
		color,
	});

	sx.size = css({
		height: size,
		width: size,
	});

	const IconComponent = React.cloneElement(icon, {
		height: size,
		ref: forwardedRef,
		size,
		width: size,
	});

	const __css = [styles.Wrapper, sx.color, sx.size];

	return (
		<View {...props} cx={__css}>
			{IconComponent}
		</View>
	);
}

export default connectAndForwardRefComponent(Icon, 'Icon');
