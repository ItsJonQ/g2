import { connect } from '@g2/provider';
import React from 'react';

import { ElevationView } from './Elevation.styles';

function Elevation({
	active,
	borderRadius = 'inherit',
	focus,
	hover,
	isInteractive = true,
	offset = 0,
	value = 0,
	...props
}) {
	return (
		<ElevationView
			{...props}
			active={active}
			borderRadius={borderRadius}
			focus={focus}
			hover={hover}
			isInteractive={isInteractive}
			offset={offset}
			value={value}
		/>
	);
}

export default connect(Elevation);
