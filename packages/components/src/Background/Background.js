import { connect } from '@wp-g2/context';
import React from 'react';

import { Surface } from '../Surface';

function Background(props) {
	return <Surface variant="secondary" {...props} />;
}

export default connect(Background, 'Background');
