import { connect } from '@wp-g2/context';
import React from 'react';

import * as styles from './<%= name %>.styles';
const { <%= name %>View } = styles;

function <%= name %>({ ...props }) {
	return <<%= name %>View {...props} />;
}

export default connect(<%= name %>);
