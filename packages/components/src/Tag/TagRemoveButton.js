import { FiX } from '@wp-g2/icons';
import { ns } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import * as styles from './Tag.styles';

const { RemoveButtonView } = styles;

function TagRemoveButton({ onClick = noop, removeButtonText }) {
	if (!removeButtonText) return null;

	return (
		<RemoveButtonView {...ns('TagRemoveButtonWrapper')}>
			<Button
				aria-label={removeButtonText}
				currentColor
				icon={<FiX />}
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
