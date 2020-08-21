import { useDisclosureState } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { CollapsibleContext } from './Collapsible.Context';

function Collapsible({ children, visible, ...props }) {
	const disclosure = useDisclosureState({
		visible,
	});

	const contextProps = {
		disclosure,
	};

	return (
		<CollapsibleContext.Provider value={contextProps}>
			<View {...props}>{children}</View>
		</CollapsibleContext.Provider>
	);
}

export default connect(Collapsible, 'Collapsible');
