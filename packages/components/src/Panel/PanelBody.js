import { connect } from '@wp-g2/provider';
import React from 'react';

import { CollapsibleContent } from '../Collapsible';
import * as styles from './Panel.styles';
import { usePanelContext } from './Panel.utils';

const { PanelBodyView } = styles;

function PanelBody({ children, ...props }) {
	const { isSeamless } = usePanelContext();

	const cx = [isSeamless && styles.seamless];

	return (
		<CollapsibleContent {...props}>
			<PanelBodyView cx={cx}>{children}</PanelBodyView>
		</CollapsibleContent>
	);
}

export default connect(PanelBody);
