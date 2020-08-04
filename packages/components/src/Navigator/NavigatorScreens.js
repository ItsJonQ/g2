import { connect } from '@wp-g2/context';
import React from 'react';

import { NavigatorView } from './Navigator.styles';
import NavigatorSwitch from './NavigatorSwitch';

function NavigatorScreens({ children, ...props }) {
	return (
		<NavigatorView {...props}>
			<NavigatorSwitch>{children}</NavigatorSwitch>
		</NavigatorView>
	);
}

export default connect(NavigatorScreens);
