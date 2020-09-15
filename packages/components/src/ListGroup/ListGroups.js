import { connect } from '@wp-g2/context';
import React from 'react';

import { VStack } from '../VStack';
import { ListGroupContext } from './ListGroup.Context';

function ListGroups({ inset = false, ...props }) {
	return (
		<ListGroupContext.Provider value={{ inset }}>
			<VStack spacing={6} {...props} />
		</ListGroupContext.Provider>
	);
}

export default connect(ListGroups, 'ListGroups');
