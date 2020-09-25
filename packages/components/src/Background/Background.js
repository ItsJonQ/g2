import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Surface } from '../Surface';

function Background(props, forwardedRef) {
	const otherProps = useContextSystem(props, 'Background');

	return <Surface variant="secondary" {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Background, 'Background');
