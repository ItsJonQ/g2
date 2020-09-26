import { useDisclosureState } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import { CollapsibleContext } from './Collapsible.Context';

function Collapsible(props, forwardedRef) {
	const {
		baseId,
		children,
		visible,
		onVisibleChange = noop,
		...otherProps
	} = useContextSystem(props, 'Collapsible');

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
			<View {...otherProps} ref={forwardedRef}>
				{children}
			</View>
		</CollapsibleContext.Provider>
	);
}

export default contextConnect(Collapsible, 'Collapsible');
