import { connect } from '@g2/provider';
import React from 'react';
import { Disclosure } from 'reakit/Disclosure';

import { useCollapsibleContext } from './Collapsible.utils';
import { CollapsibleTriggerView } from './CollapsibleTrigger.styles';

function CollapsibleTrigger({ forwardedRef, ...props }) {
	const { disclosure } = useCollapsibleContext();
	return (
		<Disclosure
			as={CollapsibleTriggerView}
			ref={forwardedRef}
			{...props}
			{...disclosure}
		/>
	);
}

export default connect(CollapsibleTrigger);
