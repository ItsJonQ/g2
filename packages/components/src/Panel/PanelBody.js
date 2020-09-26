import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { CollapsibleContent } from '../Collapsible';
import { usePanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

const { PanelBodyView } = styles;

function PanelBody({ children, ...props }) {
	const { isSeamless } = usePanelContext();

	const __css = cx([isSeamless && styles.seamless]);

	return (
		<CollapsibleContent {...props}>
			<PanelBodyView cx={__css}>{children}</PanelBodyView>
		</CollapsibleContent>
	);
}

export default connect(PanelBody, 'PanelBody');
