import React from 'react';

import { DebuggerView } from './Debugger.styles';

const IS_DEV_ENV = process && process?.env?.NODE_ENV === 'development';

function Debugger({ __force = false, ...otherProps }) {
	if (!IS_DEV_ENV && !__force) return null;

	return <DebuggerView {...otherProps} />;
}

export default React.memo(Debugger);
