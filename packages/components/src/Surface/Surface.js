import { connect } from '@g2/provider';
import React from 'react';

import { SurfaceView } from './Surface.styles';

function Surface({ forwardedRef, ...props }) {
	return <SurfaceView {...props} ref={forwardedRef} />;
}

export default connect(Surface);
