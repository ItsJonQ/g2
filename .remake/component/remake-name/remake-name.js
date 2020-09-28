import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { <%= name %>View } from './<%= name %>.styles';
import * as styles from './<%= name %>.styles';

function <%= name %> (props, forwardedRef) {
	const {...otherProps} = useContextSystem(props, '<%= name %>')
	
	return <<%= name %>View {...otherProps } />;
}

export default contextConnect(<%= name %>, '<%= name %>');
