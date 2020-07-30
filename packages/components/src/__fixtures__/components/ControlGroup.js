import React from 'react';

import { Grid, Spacer } from '../../index';

export const ControlGroup = (props) => (
	<Spacer>
		<Grid templateColumns={'minmax(0,1fr) 2fr'} {...props} />
	</Spacer>
);
