import { connect } from '@wp-g2/provider';
import React from 'react';

import { Route } from './Router';

function NavigatorScreen({ exact = false, ...props }) {
	return <Route exact={exact} {...props} />;
}

export default connect(NavigatorScreen);
