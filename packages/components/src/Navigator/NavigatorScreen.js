import { connect } from '@wp-g2/context';
import React from 'react';

import useQuery from './useQuery';

function NavigatorScreen({ children, component, path, render, ...props }) {
	const match = useQuery().is(path);

	if (match) {
		return children
			? typeof children === 'function'
				? children(props)
				: children
			: component
			? React.createElement(component, props)
			: render
			? render(props)
			: null;
	}

	return null;
}

export default connect(NavigatorScreen);
