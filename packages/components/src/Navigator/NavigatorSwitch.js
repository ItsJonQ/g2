import { connect } from '@wp-g2/context';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { useLocation } from './Navigator.utils';
import NavigatorTransition from './NavigatorTransition';

function NavigatorSwitch({ children }) {
	const location = useLocation();

	return (
		<TransitionGroup>
			<NavigatorTransition key={location.key}>
				<div>{children}</div>
			</NavigatorTransition>
		</TransitionGroup>
	);
}

export default connect(NavigatorSwitch);
