import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { CardHeader } from '../Card';
import * as styles from './Modal.styles';
import ModalCloseButton from './ModalCloseButton';
import ModalTitle from './ModalTitle';

function ModalHeader({
	children,
	className,
	closeLabel = 'Close',
	forwardedRef,
	showCloseLabel = true,
	title,
	...props
}) {
	const classes = cx([styles.ModalHeader, className]);

	return (
		<CardHeader ref={forwardedRef} {...props} className={classes}>
			{children}
			<ModalTitle>{title}</ModalTitle>
			<ModalCloseButton
				closeLabel={closeLabel}
				showCloseLabel={showCloseLabel}
			/>
		</CardHeader>
	);
}

export default connect(ModalHeader, 'ModalHeader');
