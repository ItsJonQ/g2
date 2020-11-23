import React from 'react';

import { AnimatedContainer } from '../animated';
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

export default React.memo(NavigatorSwitch);
