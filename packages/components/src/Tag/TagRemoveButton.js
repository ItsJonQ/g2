import { ns } from '@wp-g2/context';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { CloseButton } from '../CloseButton';
import * as styles from './Tag.styles';

const { RemoveButtonView } = styles;

function TagRemoveButton({ onClick = noop, removeButtonText }) {
	if (!removeButtonText) return null;

	return (
		<RemoveButtonView {...ns('TagRemoveButtonWrapper')}>
			<CloseButton
				aria-label={removeButtonText}
				currentColor
				iconSize={12}
				onClick={onClick}
				size="xSmall"
				title={removeButtonText}
				variant="tertiary"
				{...ns('TagRemoveButton')}
			/>
		</RemoveButtonView>
	);
}

export default TagRemoveButton;
