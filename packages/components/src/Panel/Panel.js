import { connect } from '@g2/provider';
import React from 'react';

import { PanelView } from './Panel.styles';

function Panel({ animated = true, ...props }) {
	return <PanelView animated={animated} {...props} />;
}

export default connect(Panel);
