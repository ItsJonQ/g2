import { connect } from '@wp-g2/context';
import { css, useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Container.styles';

function Container({ alignment = 'center', width = 1280, ...props }) {
	const maxWidth = useResponsiveValue(width);
	const cx = [css({ maxWidth }), styles[alignment]];

	return <View {...props} cx={cx} />;
}

export default connect(Container, 'Container');
