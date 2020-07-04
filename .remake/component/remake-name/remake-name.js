import { connect } from '@g2/provider';
import React from 'react';

import { <%= name %>View } from './<%= name %>.styles';

function <%= name %>({ ...props }) {
	return <<%= name %>View {...props} />;
}

export default connect(<%= name %>);
