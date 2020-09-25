import {
	connectComponentWithNamespace,
	useContextSystem,
} from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import React from 'react';

import { SurfaceView } from './Surface.styles';
import * as styles from './Surface.styles';

function Surface(componentProps, forwardedRef) {
	const {
		backgroundSize = 16,
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
		children,
		variant = 'primary',
		...props
	} = useContextSystem(componentProps, 'Surface');

	const sx = {};

	sx.borders = styles.getBorders({
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
	});

	const __css = [
		sx.borders,
		styles[variant],
		css({
			backgroundSize: `${ui.value.px(backgroundSize)} ${ui.value.px(
				backgroundSize,
			)}`,
		}),
	];

	return (
		<SurfaceView {...props} cx={__css} ref={forwardedRef}>
			{children}
		</SurfaceView>
	);
}

const ForwardedComponent = React.forwardRef(Surface);

export default connectComponentWithNamespace(ForwardedComponent, 'Surface');
