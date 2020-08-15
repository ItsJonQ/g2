import { connect } from '@wp-g2/context';
import React from 'react';

import { <%= name %>View } from './<%= name %>.styles';
import * as styles from './<%= name %>.styles';

function <%= name %>({ ...props }) {
	return <<%= name %>View {...props} />;
}

export default connect(<%= name %>);
