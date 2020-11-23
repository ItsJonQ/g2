import { close } from '@wordpress/icons';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Button } from '../button';

function CloseButton(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'CloseButton');

	return (
		<Button
			icon={close}
			iconSize={12}
			isSubtle
			variant="tertiary"
			{...otherProps}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(CloseButton, 'CloseButton');
