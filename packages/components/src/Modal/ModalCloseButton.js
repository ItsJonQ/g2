import { connect } from '@wp-g2/context';
import React from 'react';

import { Button } from '../Button';
import { useModalContext } from './Modal.Context';
import { ModalCloseButtonView } from './Modal.styles';

function ModalCloseButton({
	closeLabel = 'Close',
	forwardedRef,
	showCloseLabel,
	...props
}) {
	const { dialog } = useModalContext();

	if (!showCloseLabel) return null;

	return (
		<ModalCloseButtonView {...props}>
			<Button
				isNarrow
				onClick={dialog.hide}
				ref={forwardedRef}
				variant="link"
			>
				{closeLabel}
			</Button>
		</ModalCloseButtonView>
	);
}

export default connect(ModalCloseButton);
