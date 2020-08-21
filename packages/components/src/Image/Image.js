import { connect } from '@wp-g2/context';
import React from 'react';

import * as styles from './Image.styles';
const { ImageView } = styles;

function Image({ ...props }) {
	return <ImageView {...props} />;
}

export default connect(Image, 'Image');
