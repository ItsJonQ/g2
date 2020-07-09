import { connect } from '@wp-g2/provider';
import React from 'react';

import { useCollapsibleContext } from './Collapsible.utils';
import { CollapsibleTriggerView } from './CollapsibleTrigger.styles';

function CollapsibleTrigger({ forwardedRef, ...props }) {
	const { disclosure } = useCollapsibleContext();
	return (
		<CollapsibleTriggerView ref={forwardedRef} {...props} {...disclosure} />
	);
}

export default connect(CollapsibleTrigger);
