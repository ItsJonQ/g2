import { connect } from '@wp-g2/provider';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { useHistory } from './Navigator.utils';

function NavigatorForwarder({ ...props }) {
	const { entries } = useHistory();
	const lastEntry = entries[entries.length - 2];

	if (lastEntry) {
		return <Redirect push to={lastEntry.pathname} />;
	}

	return null;
}

export default connect(NavigatorForwarder);
