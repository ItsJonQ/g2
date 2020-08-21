import { DialogDisclosure } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import React from 'react';

import { Button } from '../Button';
import { useModalContext } from './Modal.Context';

function ModalTrigger({ as = Button, forwardedRef, ...props }) {
	const { dialog } = useModalContext();

	return (
		<DialogDisclosure ref={forwardedRef} {...dialog} as={as} {...props} />
	);
}

export default connect(ModalTrigger, 'ModalTrigger');
