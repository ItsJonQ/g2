import { connect } from '@wp-g2/context';
import { useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { VStack } from '../VStack';
import { ListGroupContext } from './ListGroup.Context';

function ListGroups({ inset = false, ...props }) {
	const insetValue = useResponsiveValue(inset);
	const value = React.useMemo(
		() => ({
			inset: insetValue,
		}),
		[insetValue],
	);

	return (
		<ListGroupContext.Provider value={value}>
			<VStack spacing={6} {...props} />
		</ListGroupContext.Provider>
	);
}

export default connect(ListGroups, 'ListGroups');
