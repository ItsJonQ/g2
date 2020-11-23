import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';
import { DialogDisclosure } from 'reakit';

import { Button } from '../button';
import { useModalContext } from './Modal.Context';

function ModalTrigger(props, forwardedRef) {
	const { as = Button, ...otherProps } = useContextSystem(
		props,
		forwardedRef,
	);

	const { dialog } = useModalContext();

	return (
		<DialogDisclosure
			ref={forwardedRef}
			{...dialog}
			as={as}
			{...otherProps}
		/>
	);
}

export default contextConnect(ModalTrigger, 'ModalTrigger');
