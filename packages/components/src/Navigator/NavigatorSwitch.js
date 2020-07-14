import { connect } from '@wp-g2/provider';
import React from 'react';
import { Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import { useLocation } from './Navigator.utils';
import NavigatorForwarder from './NavigatorForwarder';
import NavigatorTransition from './NavigatorTransition';

function NavigatorSwitch({ children }) {
	const location = useLocation();

	return (
		<TransitionGroup>
			<NavigatorTransition key={location.key}>
				<Switch location={location}>
					{children}
					<NavigatorForwarder />
				</Switch>
			</NavigatorTransition>
		</TransitionGroup>
	);
}

export default connect(NavigatorSwitch);
