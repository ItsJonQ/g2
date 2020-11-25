import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React, { useMemo } from 'react';

import { View } from '../View';
import * as styles from './Icon.styles';

/**
 * @typedef Props
 * @property {import('react').CSSProperties['fill']} [fill='currentColor']
 * @property {number} [height]
 * @property {import('react').ReactElement} icon
 * @property {boolean} [inline]
 * @property {number | string} [size=20]
 * @property {keyof styles} [variant]
 * @property {number} [width]
 */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function Icon(props, forwardedRef) {
	const {
		children,
		className,
		fill = 'currentColor', // https://github.com/ItsJonQ/g2/pull/133#discussion_r525538497
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

		// https://github.com/ItsJonQ/g2/issues/136
		sx.fill = css({
			color: fill,
			fill: 'currentColor',
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
			variant && styles[variant],
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
