import { connect } from '@wp-g2/context';
import React from 'react';

import { AvatarView } from './Avatar.styles';
import * as styles from './Avatar.styles';

function Avatar({ ...props }) {
	return <AvatarView {...props} />;
}

export default connect(Avatar, 'Avatar');
