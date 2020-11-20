import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { useControlGroup } from './useControlGroup';

function ControlGroup(props, forwardedRef) {
	const {
		children,
		direction = 'row',
		templateColumns,
		...otherProps
	} = useControlGroup(props);

	const isGrid = !!templateColumns;

	if (isGrid) {
		return (
			<Grid
				gap={0}
				templateColumns={templateColumns}
				{...otherProps}
				ref={forwardedRef}
			>
				{children}
			</Grid>
		);
	}

	return (
		<Flex
			direction={direction}
			gap={`-1px`}
			{...otherProps}
			ref={forwardedRef}
		>
			{children}
		</Flex>
	);
}

export default contextConnect(ControlGroup, 'ControlGroup');
