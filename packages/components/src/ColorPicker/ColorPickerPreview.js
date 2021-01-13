import { __ } from '@wordpress/i18n';
import { shallowCompare } from '@wp-g2/substate';
import { useClipboard } from '@wp-g2/utils';
import React from 'react';

import { ColorCircle } from '../ColorCircle';
import { Tooltip } from '../Tooltip';
import { VStack } from '../VStack';
import { useColorPickerContext } from './ColorPicker.Context';
import * as styles from './ColorPicker.styles';

export const ColorPickerPreview = React.memo(() => {
	const { store } = useColorPickerContext();
	const color = store.getColorValue();
	const showPreview = store.showPreview;

	const { hasCopied, onCopy } = useClipboard(color);

	if (!showPreview) return null;

	const tooltipContent = hasCopied ? __('Copied') : __('Copy');

	return (
		<VStack alignment="center">
			<Tooltip content={tooltipContent}>
				<ColorCircle
					className={styles.ColorPreview}
					color={color}
					onClick={onCopy}
				/>
			</Tooltip>
		</VStack>
	);
});
