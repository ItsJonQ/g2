import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React, { useMemo } from 'react';

import { View } from '../View';
import * as styles from './Icon.styles';

function Icon(props, forwardedRef) {
	const {
		children,
		className,
		fill, // https://github.com/ItsJonQ/g2/pull/133#discussion_r525538497
		height,
		icon,
		inline,
		size = 20,
		variant,
		width,
		...otherProps
	} = useContextSystem(props, 'Icon');

	const classes = useMemo(() => {
		const sx = {};

		sx.fill = css({
			fill,
		});

		sx.size = css({
			height: height || size,
			width: width || size,
		});

		return cx(
			styles.Wrapper,
			sx.fill,
			sx.size,
			inline && styles.inline,
			styles[variant],
			className,
		);
	}, [className, fill, height, inline, size, variant, width]);

	if (!icon) return null;

	const IconComponent = React.cloneElement(icon, {
		height: size,
		ref: forwardedRef,
		size,
		width: size,
	});

	return (
		<View {...otherProps} className={classes}>
			{IconComponent}
		</View>
	);
}

export default contextConnect(Icon, 'Icon');
