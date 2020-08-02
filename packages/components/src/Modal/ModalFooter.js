import { connect } from '@wp-g2/provider';
import React from 'react';

import { CardFooter } from '../Card';

function ModalFooter({
	children,
	forwardedRef,
	justify = 'flex-end',
	...props
}) {
	return (
		<CardFooter justify={justify} ref={forwardedRef} {...props}>
			{children}
		</CardFooter>
	);
}

export default connect(ModalFooter);
