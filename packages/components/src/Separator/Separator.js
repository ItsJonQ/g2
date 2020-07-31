import { connect } from '@wp-g2/provider';
import React from 'react';

import { Divider } from '../Divider';

function Separator({ mb = 3, mt = 3, ...props }) {
	return <Divider {...props} mb={mb} mt={mt} />;
}

export default connect(Separator);
