import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { TextInput } from '../TextInput';

function UnitInput(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'UnitInput');

	return (
		<TextInput
			{...otherProps}
			format="number"
			ref={forwardedRef}
			type="text"
		/>
	);
}

export default contextConnect(UnitInput, 'UnitInput');
