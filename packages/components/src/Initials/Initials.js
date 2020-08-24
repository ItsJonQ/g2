import { connect } from '@wp-g2/context';
import React from 'react';

import { Text } from '../Text';
import { getInitials } from './Initials.utils';

function Initials({ name, ...props }) {
	const initials = getInitials(name);

	return (
		<Text weight={500} {...props}>
			{initials}
		</Text>
	);
}

export default connect(Initials, 'Initials');
