import React from 'react';
import BaseView from '../BaseView';
import FlexBlock from './Flex.Block';
import FlexItem from './Flex.Item';

function Flex({
	align = 'center',
	justify = 'space-between',
	children,
	direction = 'column',
	...props
}) {
	return (
		<BaseView
			{...props}
			sx={{
				alignItems: align,
				display: 'flex',
				flexDirection: direction,
				justifyContent: justify,
			}}
		>
			{children}
		</BaseView>
	);
}

Flex.Block = FlexBlock;
Flex.Item = FlexItem;

export default Flex;
