import { css, cx } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { CloseButton } from '../CloseButton';
import * as styles from './Alert.styles';
const { CloseButtonWrapper } = styles;

function AlertCloseButton({
	className,
	isDismissable,
	onDismiss = noop,
	status,
	...props
}) {
	if (!isDismissable) return null;

	const classes = cx(css({ color: styles.getTextColor(status) }), className);

	return (
		<CloseButtonWrapper {...props} className={classes}>
			<CloseButton
				currentColor
				iconSize={16}
				onClick={onDismiss}
				title="Dismiss"
			/>
		</CloseButtonWrapper>
	);
}

export default React.memo(AlertCloseButton);
