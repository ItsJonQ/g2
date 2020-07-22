import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styled-components';
import React from 'react';

import { CollapsibleContent } from '../Collapsible';
import { usePanelContext } from './Panel.utils';

function PanelBody({ children, ...props }) {
	const { isSeamless } = usePanelContext();
	const sx = isSeamless
		? {
				pb: 3,
				pt: 2,
		  }
		: { pb: 3, pt: 2, px: 3 };

	return (
		<CollapsibleContent {...props}>
			<BaseView sx={sx}>{children}</BaseView>
		</CollapsibleContent>
	);
}

export default connect(PanelBody);
