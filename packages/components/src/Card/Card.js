import { connect } from '@g2/provider';
import React from 'react';

import { Elevation } from '../Elevation';
import { CardView } from './Card.styles';

function Card({ children, elevation = 2, ...props }) {
	return (
		<CardView {...props}>
			{children}
			<Elevation isInteractive={false} value={elevation ? 1 : 0} />
			<Elevation isInteractive={false} value={elevation} />
		</CardView>
	);
}

export default connect(Card);
