import { connect } from '@wp-g2/context';
import React from 'react';

import { ImageView } from './Image.styles';
import * as styles from './Image.styles';

function Image({ ...props }) {
	return <ImageView {...props} />;
}

export default connect(Image, 'Image');
