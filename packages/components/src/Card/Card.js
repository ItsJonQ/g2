import { connect, ns } from '@wp-g2/context';
import { cx, get } from '@wp-g2/styles';
import React from 'react';

import { Elevation } from '../Elevation';
import { Surface } from '../Surface';
import { View } from '../View';
import * as styles from './Card.styles';

function Card({ children, className, elevation = 2, forwardedRef, ...props }) {
	const classes = cx([styles.Card, className]);

	return (
		<Surface {...props} className={classes} ref={forwardedRef}>
			<View {...ns('CardContent')}>{children}</View>
			<Elevation
				css={{ borderRadius: get('cardBorderRadius') }}
				isInteractive={false}
				value={elevation ? 1 : 0}
				{...ns('CardElevation')}
			/>
			<Elevation
				css={{ borderRadius: get('cardBorderRadius') }}
				isInteractive={false}
				value={elevation}
				{...ns('CardElevation')}
			/>
		</Surface>
	);
}

export default connect(Card, 'Card');
