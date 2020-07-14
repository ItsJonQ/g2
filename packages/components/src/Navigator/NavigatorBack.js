import { connect } from '@wp-g2/provider';
import React from 'react';

import { Button } from '../Button';
import { useHistory } from './Navigator.utils';

function NavigatorBack({ ...props }) {
	const history = useHistory();

	return <Button {...props} onClick={history.goBack} />;
}

export default connect(NavigatorBack);
