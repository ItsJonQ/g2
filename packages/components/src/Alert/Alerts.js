import { contextConnect, useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';

function Alerts(props, forwardedRef) {
	const otherProps = useContextSystem(props, 'Alerts');

	return <View ref={forwardedRef} {...ui.$('Alerts')} {...otherProps} />;
}

export default contextConnect(Alerts, 'Alerts');
