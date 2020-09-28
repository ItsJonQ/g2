import { contextConnect, useContextSystem } from '@wp-g2/context';
import { FiX } from '@wp-g2/icons';
import React from 'react';

import { Button } from '../Button';

function CloseButton(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'CloseButton');

	return (
		<Button
			icon={<FiX />}
			iconSize={12}
			variant="tertiary"
			{...otherProps}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(CloseButton, 'CloseButton');
