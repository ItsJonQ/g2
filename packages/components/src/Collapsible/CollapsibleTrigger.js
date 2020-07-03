import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';
import { Disclosure } from 'reakit/Disclosure';

import { useCollapsibleContext } from './Collapsible.utils';

function CollapsibleTrigger({ forwardedRef, ...props }) {
	const { disclosure } = useCollapsibleContext();
	return (
		<Disclosure
			as={BaseView}
			ref={forwardedRef}
			{...props}
			{...disclosure}
		/>
	);
}

export default connect(CollapsibleTrigger);
