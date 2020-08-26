import { connect } from '@wp-g2/context';
import { ns } from '@wp-g2/styles';
import React from 'react';

import { AnimatedContainer } from '../Animated';
import { View } from '../View';

function Alerts({ forwardedRef, ...props }) {
	return (
		<View ref={forwardedRef} {...ns('Alerts')}>
			<AnimatedContainer {...props} />
		</View>
	);
}

export default connect(Alerts, 'Alerts');
