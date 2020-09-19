import { connect } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import React from 'react';

import { Elevation } from '../Elevation';
import { Surface } from '../Surface';
import { View } from '../View';
import * as styles from './Card.styles';

function Card({
	children,
	className,
	elevation = 2,
	forwardedRef,
	isBorderless = false,
	isRounded = true,
	...props
}) {
	const classes = cx([
		styles.Card,
		isBorderless && styles.borderless,
		isRounded && styles.rounded,
		className,
	]);
	const elevationBorderRadius = isRounded ? ui.get('cardBorderRadius') : 0;

	return (
		<Surface {...props} className={classes} ref={forwardedRef}>
			<View {...ui.$('CardContent')}>{children}</View>
			<Elevation
				css={{ borderRadius: elevationBorderRadius }}
				isInteractive={false}
				value={elevation ? 1 : 0}
				{...ui.$('CardElevation')}
			/>
			<Elevation
				css={{ borderRadius: elevationBorderRadius }}
				isInteractive={false}
				value={elevation}
				{...ui.$('CardElevation')}
			/>
		</Surface>
	);
}

export default connect(Card, 'Card');
