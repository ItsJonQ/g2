import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

function <%= name %>({ ...props }) {
	return <BaseView {...props} />;
}

export default connect(<%= name %>);
