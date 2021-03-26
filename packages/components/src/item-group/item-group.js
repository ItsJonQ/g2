import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
// eslint-disable-next-line no-duplicate-imports
import { ItemGroupContext, useItemGroupContext } from './context';
/**
 * Internal dependencies
 */
import { useItemGroup } from './use-item-group';

function ItemGroup(props, ref) {
	const { bordered, separated, size: sizeProp, ...otherProps } = useItemGroup(
		props,
	);

	const { size: contextSize } = useItemGroupContext();

	const spacedAround = !bordered && !separated;
	const size = sizeProp || contextSize;

	const contextValue = {
		spacedAround,
		size,
	};

	return (
		<ItemGroupContext.Provider value={contextValue}>
			<View {...otherProps} ref={ref} />
		</ItemGroupContext.Provider>
	);
}

export default contextConnect(ItemGroup, 'ItemGroup');
