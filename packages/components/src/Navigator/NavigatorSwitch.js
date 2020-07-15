import { connect } from '@wp-g2/provider';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { useLocation } from './Navigator.utils';
import NavigatorTransition from './NavigatorTransition';
import { Switch } from './Router';

function NavigatorSwitch({ children }) {
	const location = useLocation();

	return (
		<TransitionGroup>
			<NavigatorTransition key={location.key}>
				<Switch location={location}>{children}</Switch>
			</NavigatorTransition>
		</TransitionGroup>
	);
}

export default connect(NavigatorSwitch);
