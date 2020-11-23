import { css } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { CloseButton } from '../CloseButton';
import * as styles from './alert-styles';
const { CloseButtonWrapper } = styles;

function AlertCloseButton({
	isDismissable,
	onDismiss = noop,
	status,
	...props
}) {
	if (!isDismissable) return null;

	return (
		<CloseButtonWrapper
			{...props}
			cx={css({ color: styles.getTextColor(status) })}
		>
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
