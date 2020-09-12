import { connect } from '@wp-g2/context';
import React from 'react';

import { CardFooter } from '../Card';

function ModalFooter({
	children,
	forwardedRef,
	justify = 'flex-start',
	...props
}) {
	return (
		<CardFooter
			direction="row-reverse"
			justify={justify}
			ref={forwardedRef}
			{...props}
		>
			{children}
		</CardFooter>
	);
}

export default connect(ModalFooter, 'ModalFooter');
