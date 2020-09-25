import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { css, useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Container.styles';

function Container(props, forwardedRef) {
	const {
		alignment = 'center',
		width = 1280,
		...otherProps
	} = useContextSystem(props, 'Container');

	const maxWidth = useResponsiveValue(width);
	const __css = [css({ maxWidth, width: '100%' }), styles[alignment]];

	return <View {...otherProps} cx={__css} ref={forwardedRef} />;
}

export default connectAndForwardRefComponent(Container, 'Container');
