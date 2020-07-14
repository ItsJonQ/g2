import { connect } from '@wp-g2/provider';
import React from 'react';
import { Route } from 'react-router-dom';

function NavigatorScreen({ exact = true, ...props }) {
	return <Route exact={exact} {...props} />;
}

export default connect(NavigatorScreen);
