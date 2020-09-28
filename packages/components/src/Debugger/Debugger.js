import { IS_DEV_ENV } from '@wp-g2/utils';
import React from 'react';

import { DebuggerView } from './Debugger.styles';

function Debugger({ __force = false, ...otherProps }) {
	if (!IS_DEV_ENV && !__force) return null;

	return <DebuggerView {...otherProps} />;
}

export default React.memo(Debugger);
