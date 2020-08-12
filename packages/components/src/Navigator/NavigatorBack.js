import { connect } from '@wp-g2/context';
import React from 'react';

import { Button } from '../Button';
import { useHistory } from './Router';

function NavigatorBack({ ...props }) {
	const history = useHistory();

	return <Button {...props} onClick={history.goBack} />;
}

export default connect(NavigatorBack);
