import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Surface.styles';

function Surface(props, forwardedRef) {
	const {
		backgroundSize = 16,
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
		children,
		variant = 'primary',
		...otherProps
	} = useContextSystem(props, 'Surface');

	const sx = {};

	sx.borders = styles.getBorders({
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
	});

	const __css = [
		styles.Surface,
		sx.borders,
		styles[variant],
		css({
			backgroundSize: `${ui.value.px(backgroundSize)} ${ui.value.px(
				backgroundSize,
			)}`,
		}),
	];

	return (
		<View {...otherProps} cx={__css} ref={forwardedRef}>
			{children}
		</View>
	);
}

export default contextConnect(Surface, 'Surface');
