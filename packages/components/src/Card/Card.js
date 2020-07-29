import { connect } from '@wp-g2/provider';
import React from 'react';

import { Elevation } from '../Elevation';
import { Surface } from '../Surface';
import * as styles from './Card.styles';

function Card({ children, className, elevation = 2, ...props }) {
	const cx = [styles.Card, styles.borderRadius, className];

	return (
		<Surface {...props} className={cx}>
			{children}
			<Elevation
				css={{ borderRadius: 8 }}
				isInteractive={false}
				value={elevation ? 1 : 0}
			/>
			<Elevation
				css={{ borderRadius: 8 }}
				isInteractive={false}
				value={elevation}
			/>
		</Surface>
	);
}

export default connect(Card);
