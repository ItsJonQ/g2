import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

import { CollapsibleContent } from '../Collapsible';

function PanelBody({ children, ...props }) {
	return (
		<CollapsibleContent {...props}>
			<BaseView sx={{ pb: 3, pt: 2, px: 3 }}>{children}</BaseView>
		</CollapsibleContent>
	);
}

export default connect(PanelBody);
