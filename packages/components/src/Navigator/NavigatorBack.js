import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Button } from '../Button';
import { useHistory } from './Router';

function NavigatorBack(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'NavigatorBack');
	const history = useHistory();

	return (
		<Button {...otherProps} onClick={history.goBack} ref={forwardedRef} />
	);
}

export default contextConnect(NavigatorBack, 'NavigatorBack');
