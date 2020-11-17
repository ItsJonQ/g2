import { contextConnect, useContextSystem } from '@wp-g2/context';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React from 'react';
import { useDisclosureState } from 'reakit';

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
		if (!visible) {
			disclosure.hide();
		} else {
			disclosure.show();
		}
	}, [visible]);

	useUpdateEffect(() => {
		onVisibleChange(disclosure.visible, disclosure);
	}, [disclosure.visible]);

	return (
		<CollapsibleContext.Provider value={contextProps}>
			<View
				{...otherProps}
				data-expanded={disclosure.visible}
				ref={forwardedRef}
			>
				{children}
			</View>
		</CollapsibleContext.Provider>
	);
}

export default contextConnect(Collapsible, 'Collapsible');
