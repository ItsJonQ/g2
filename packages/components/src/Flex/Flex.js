import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

export function Flex({
	align = 'center',
	justify = 'space-between',
	children,
	direction = 'column',
	forwardedRef,
	...props
}) {
	return (
		<BaseView
			{...props}
			__sx={{
				alignItems: align,
				display: 'flex',
				flexDirection: direction,
				justifyContent: justify,
			}}
			ref={forwardedRef}
		>
			{children}
		</BaseView>
	);
}

export default connect(Flex);
