import { connect } from '@wp-g2/provider';
import { getBackgroundColor } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Alert.styles';
const { AlertView } = styles;

function Alert({ ...props }) {
	return (
		<>
			<AlertView {...props} cx={[getBackgroundColor('red')]}>
				Hello
			</AlertView>
			<AlertView {...props} cx={[getBackgroundColor('yellow')]}>
				Hello
			</AlertView>
			<AlertView {...props} cx={[getBackgroundColor('green')]}>
				Hello
			</AlertView>
			<AlertView {...props} cx={[getBackgroundColor('blue')]}>
				Hello
			</AlertView>
		</>
	);
}

export default connect(Alert);
