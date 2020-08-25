import { connect } from '@wp-g2/context';
import { css, useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { ContainerView } from './Container.styles';

function Container({ width = 1280, ...props }) {
	const maxWidth = useResponsiveValue(width);
	const cx = [css({ maxWidth })];

	return <ContainerView {...props} cx={cx} />;
}

export default connect(Container, 'Container');
