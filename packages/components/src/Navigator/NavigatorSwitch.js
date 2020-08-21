import { connect } from '@wp-g2/context';
import React from 'react';

import { AnimatedContainer } from '../Animated';
import { Switch } from './Router';

function NavigatorSwitch({ children }) {
	return (
		<Switch>
			<AnimatedContainer>{children}</AnimatedContainer>
		</Switch>
	);
}

export default connect(NavigatorSwitch, 'NavigatorSwitch');
