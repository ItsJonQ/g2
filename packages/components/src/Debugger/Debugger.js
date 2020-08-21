import { connect } from '@wp-g2/context';
import { IS_DEV_ENV } from '@wp-g2/utils';
import React from 'react';

import { DebuggerView } from './Debugger.styles';

function Debugger({ __force = false, ...props }) {
	if (!IS_DEV_ENV && !__force) return null;

	return <DebuggerView {...props} />;
}

export default connect(Debugger);
