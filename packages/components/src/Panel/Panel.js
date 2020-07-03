import { connect } from '@g2/provider';
import React from 'react';

import { Collapsible } from '../Collapsible';

function Panel({ animated = true, ...props }) {
	return <Collapsible animated={animated} {...props} />;
}

export default connect(Panel);
