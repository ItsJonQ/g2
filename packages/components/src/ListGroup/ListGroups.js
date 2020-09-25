import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { VStack } from '../VStack';
import { ListGroupContext } from './ListGroup.Context';

function ListGroups(componentProps, forwardedRef) {
	const { inset = false, ...props } = useContextSystem(
		componentProps,
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
			<VStack spacing={6} {...props} ref={forwardedRef} />
		</ListGroupContext.Provider>
	);
}

export default connectAndForwardRefComponent(ListGroups, 'ListGroups');
