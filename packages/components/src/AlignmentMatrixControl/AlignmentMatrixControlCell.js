import { cx } from '@wp-g2/styles';
import React from 'react';
import { CompositeItem } from 'reakit';

import { Tooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';
import * as styles from './AlignmentMatrixControl.styles';
import { ALIGNMENT_LABEL } from './constants';

const { CellView, PointView } = styles;

function AlignmentMatrixControlCell({ id, isActive = false, value, ...props }) {
	const tooltipText = ALIGNMENT_LABEL[value];

	const pointClasses = cx({
		[styles.activePoint]: isActive,
	});

	return (
		<CompositeItem as={CellView} role="gridcell" {...props} id={id}>
			{/* VoiceOver needs a text content to be rendered within grid cell,
				otherwise it'll announce the content as "blank". So we use a visually
			hidden element instead of aria-label. */}
			<VisuallyHidden>{value}</VisuallyHidden>
			<Tooltip baseId={id} content={tooltipText} focusable={false}>
				<PointView className={pointClasses} role="presentation" />
			</Tooltip>
		</CompositeItem>
	);
}

export default React.memo(AlignmentMatrixControlCell);
