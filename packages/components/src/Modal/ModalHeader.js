import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { CardHeader } from '../card';
import * as styles from './Modal.styles';
import ModalCloseButton from './ModalCloseButton';
import ModalTitle from './ModalTitle';

function ModalHeader(props, forwardedRef) {
	const {
		children,
		className,
		closeLabel = __('Close'),
		showCloseLabel = true,
		title,
		...otherProps
	} = useContextSystem(props, 'ModalHeader');

	const classes = cx(styles.ModalHeader, className);

	return (
		<CardHeader {...otherProps} className={classes} ref={forwardedRef}>
			{children}
			<ModalTitle>{title}</ModalTitle>
			<ModalCloseButton
				closeLabel={closeLabel}
				showCloseLabel={showCloseLabel}
			/>
		</CardHeader>
	);
}

export default contextConnect(ModalHeader, 'ModalHeader');
