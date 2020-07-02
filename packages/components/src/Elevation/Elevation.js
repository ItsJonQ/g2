import { connect } from '@g2/provider';
import React from 'react';

import { ElevationView } from './Elevation.styles';

function Elevation({
	active,
	borderRadius = 'inherit',
	className,
	focus,
	forwardedRef,
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
			ref={forwardedRef}
			value={value}
		/>
	);
}

export default connect(Elevation);
