import {
	connectComponentWithNamespace,
	useContextSystem,
} from '@wp-g2/context';
import React from 'react';

import { Surface } from '../Surface';

function Background(componentProps, forwardedRef) {
	const props = useContextSystem(componentProps, 'Background');
	return <Surface variant="secondary" {...props} ref={forwardedRef} />;
}

const ForwardedComponent = React.forwardRef(Background);

export default connectComponentWithNamespace(ForwardedComponent, 'Background');
