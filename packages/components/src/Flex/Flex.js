import React from 'react';
import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';

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

export default connect(Flex);
