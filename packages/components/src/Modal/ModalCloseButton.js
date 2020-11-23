import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Button } from '../button';
import { useModalContext } from './Modal.Context';
import { ModalCloseButtonView } from './Modal.styles';

function ModalCloseButton(props, forwardedRef) {
	const {
		closeLabel = __('Close'),
		showCloseLabel,
		...otherProps
	} = useContextSystem(props, 'ModalCloseButton');

	const { dialog } = useModalContext();

	if (!showCloseLabel) return null;

	return (
		<ModalCloseButtonView {...otherProps}>
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

export default contextConnect(ModalCloseButton, 'ModalCloseButton');
