import { contextConnect, useContextSystem } from '@wp-g2/context';
import { useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { VStack } from '../VStack';
import { ListGroupContext } from './ListGroup.Context';

function ListGroups(props, forwardedRef) {
	const { inset = false, spacing = 6, ...otherProps } = useContextSystem(
		props,
		'ListGroups',
	);

	const insetValue = useResponsiveValue(inset);

	const contextValue = React.useMemo(
		() => ({
			inset: insetValue,
		}),
		[insetValue],
	);

	return (
		<ListGroupContext.Provider value={contextValue}>
			<VStack spacing={spacing} {...otherProps} ref={forwardedRef} />
		</ListGroupContext.Provider>
	);
}

export default contextConnect(ListGroups, 'ListGroups');
