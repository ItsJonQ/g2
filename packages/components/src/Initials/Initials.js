import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Text } from '../Text';
import { getInitials } from './Initials.utils';

function Initials(props, forwardedRef) {
	const { name, ...otherProps } = useContextSystem(props, 'Initials');
	const initials = getInitials(name);

	return (
		<Text weight={500} {...otherProps} ref={forwardedRef}>
			{initials}
		</Text>
	);
}

export default contextConnect(Initials, 'Initials');
