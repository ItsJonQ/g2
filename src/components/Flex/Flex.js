import React from 'react';
import View from '../View';
import FlexItem from './Flex.Item';

function Flex({
	align = 'center',
	justify = 'space-between',
	children,
	direction = 'column',
}) {
	return (
		<View
			sx={{
				alignItems: align,
				display: 'flex',
				flexDirection: direction,
				justifyContent: justify,
			}}
		>
			{children}
		</View>
	);
}

Flex.Item = FlexItem;

export default Flex;
