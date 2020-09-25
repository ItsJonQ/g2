import { contextConnect, useContextSystem } from '@wp-g2/context';
import { useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { VStack } from '../VStack';
import { ListGroupContext } from './ListGroup.Context';

function ListGroups(props, forwardedRef) {
	const { inset = false, ...otherProps } = useContextSystem(
		props,
		'ListGroups',
	);

	const insetValue = useResponsiveValue(inset);
	const value = React.useMemo(
		() => ({
			inset: insetValue,
		}),
		[insetValue],
	);

	return (
		<ListGroupContext.Provider value={value}>
			<VStack spacing={6} {...otherProps} ref={forwardedRef} />
		</ListGroupContext.Provider>
	);
}

export default contextConnect(ListGroups, 'ListGroups');
