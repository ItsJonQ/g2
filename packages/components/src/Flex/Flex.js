import React from 'react';
import { BaseView } from '../BaseView';

export function Flex({
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

export default Flex;
