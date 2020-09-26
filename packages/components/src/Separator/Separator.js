import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Divider } from '../Divider';

function Separator(props, forwardedRef) {
	const { mb = 3, mt = 3, ...otherProps } = useContextSystem(
		props,
		'Separator',
	);

	return <Divider {...otherProps} mb={mb} mt={mt} ref={forwardedRef} />;
}

export default contextConnect(Separator, 'Separator');
