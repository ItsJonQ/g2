import { CompositeItem } from '@wp-g2/a11y';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Tooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';
import { CellView, Point } from './Cell.styles';
import * as styles from './Cell.styles';
import { ALIGNMENT_LABEL } from './constants';

export default function Cell({ isActive = false, value, ...props }) {
	const tooltipText = ALIGNMENT_LABEL[value];

	const pointClasses = cx({
		[styles.activePointStyles]: isActive,
	});

	return (
		<CompositeItem as={CellView} role="gridcell" {...props}>
			{/* VoiceOver needs a text content to be rendered within grid cell,
				otherwise it'll announce the content as "blank". So we use a visually
			hidden element instead of aria-label. */}
			<VisuallyHidden>{value}</VisuallyHidden>
			<Tooltip content={tooltipText}>
				<Point className={pointClasses} role="presentation" />
			</Tooltip>
		</CompositeItem>
	);
}
