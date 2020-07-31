import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Elevation } from '../Elevation';
import { Surface } from '../Surface';
import * as styles from './Card.styles';

function Card({ children, className, elevation = 2, ...props }) {
	const classes = cx([styles.Card, className]);

	return (
		<Surface {...props} className={classes}>
			{children}
			<Elevation
				css={{ borderRadius: 8 }}
				isInteractive={false}
				offset={-1}
				value={elevation ? 1 : 0}
			/>
			<Elevation
				css={{ borderRadius: 8 }}
				isInteractive={false}
				offset={-1}
				value={elevation}
			/>
		</Surface>
	);
}

export default connect(Card);
