import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { CardFooter } from '../card';

function ModalFooter(props, forwardedRef) {
	const {
		children,
		justify = 'flex-start',
		...otherProps
	} = useContextSystem(props, 'ModalFooter');

	return (
		<CardFooter
			direction="row-reverse"
			justify={justify}
			{...otherProps}
			ref={forwardedRef}
		>
			{children}
		</CardFooter>
	);
}

export default contextConnect(ModalFooter, 'ModalFooter');
