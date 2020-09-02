import { connect } from '@wp-g2/context';
import React from 'react';

import { AnimatedContainer } from '../Animated';
import { Route, Switch } from './Router';

function NavigatorSwitch({ children }) {
	return (
		<Route
			render={({ location }) => (
				<AnimatedContainer exitBeforeEnter initial={false}>
					<Switch key={location.pathname} location={location}>
						{children}
					</Switch>
				</AnimatedContainer>
			)}
		/>
	);
}

export default connect(NavigatorSwitch, 'NavigatorSwitch');
