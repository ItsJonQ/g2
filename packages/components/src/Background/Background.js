import { connect } from '@wp-g2/provider';
import { ns } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Background.styles';
const { BackgroundView, ContentView, TintView } = styles;

function Background({ children, ...props }) {
	return (
		<BackgroundView {...props}>
			<ContentView {...ns('BackgroundContent')}>{children}</ContentView>
			<TintView {...ns('BackgroundTint')} aria-hidden />
		</BackgroundView>
	);
}

export default connect(Background);
