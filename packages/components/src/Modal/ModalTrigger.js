import { connect } from '@wp-g2/provider';
import React from 'react';
import { DialogDisclosure } from 'reakit/Dialog';

import { Button } from '../Button';
import { useModalContext } from './Modal.Context';

function ModalTrigger({ as = Button, ...props }) {
	const { dialog } = useModalContext();

	return <DialogDisclosure {...dialog} as={as} {...props} />;
}

export default connect(ModalTrigger);
