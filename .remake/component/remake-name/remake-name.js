import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { <%= name %>View } from './<%= name %>.styles';
import * as styles from './<%= name %>.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function <%= name %> (props, forwardedRef) {
	const {...otherProps} = useContextSystem(props, '<%= name %>')
	
	return <<%= name %>View {...otherProps } />;
}

/**
 * `<%= name %>`
 * 
 * @type {import('@wp-g2/create-styles').PolymorphicComponent<'div', import('./types').Props>}
 */
const Connected<%= name %> = contextConnect(<%= name %>, '<%= name %>');

export default Connected<%= name %>;
