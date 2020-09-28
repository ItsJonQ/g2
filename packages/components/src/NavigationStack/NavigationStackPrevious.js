import { contextConnect, useContextSystem } from '@wp-g2/context';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { useNavigationStackContext } from './NavigationStack.Context';
import { useIsPreviousEnabled } from './NavigationStack.utils';

function NavigationStackScreenPrevious(props, forwardedRef) {
	const { onClick = noop, ...otherProps } = useContextSystem(
		props,
		'NavigationStackScreenPrevious',
	);
	const { tab } = useNavigationStackContext();
	const enabled = useIsPreviousEnabled();

	return (
		<Button
			disabled={!enabled}
			{...otherProps}
			onClick={(...args) => {
				tab.previous();
				onClick(...args);
			}}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(
	NavigationStackScreenPrevious,
	'NavigationStackScreenPrevious',
);
