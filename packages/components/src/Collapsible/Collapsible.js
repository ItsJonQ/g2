import { useDisclosureState } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import { CollapsibleContext } from './Collapsible.Context';

function Collapsible({
	baseId,
	children,
	visible,
	onVisibleChange = noop,
	...props
}) {
	const disclosure = useDisclosureState({
		baseId,
		visible,
	});

	const contextProps = {
		disclosure,
	};

	useUpdateEffect(() => {
		onVisibleChange(disclosure.visible);
	}, [disclosure.visible]);

	return (
		<CollapsibleContext.Provider value={contextProps}>
			<View {...props}>{children}</View>
		</CollapsibleContext.Provider>
	);
}

export default connect(Collapsible, 'Collapsible');
