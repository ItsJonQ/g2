import React from 'react';

import { Grid, Spacer } from '../../index';

export const ControlGroup = (props) => (
	<Spacer>
		<Grid templateColumns={'1fr 2fr'} {...props} />
	</Spacer>
);
