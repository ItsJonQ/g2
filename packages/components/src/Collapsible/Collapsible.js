import { connect } from '@wp-g2/provider';
import React from 'react';
import { useDisclosureState } from 'reakit/Disclosure';

import { View } from '../View';
import { CollapsibleContext } from './Collapsible.utils';

function Collapsible({ children, visible, ...props }) {
	const disclosure = useDisclosureState({
		visible,
	});

	const contextValue = {
		disclosure,
	};

	return (
		<CollapsibleContext.Provider value={contextValue}>
			<View {...props}>{children}</View>
		</CollapsibleContext.Provider>
	);
}

export default connect(Collapsible);
