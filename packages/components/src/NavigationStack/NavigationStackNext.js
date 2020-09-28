import { contextConnect, useContextSystem } from '@wp-g2/context';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { useNavigationStackContext } from './NavigationStack.Context';
import { useIsNextEnabled } from './NavigationStack.utils';

function NavigationStackScreenNext(props, forwardedRef) {
	const { onClick = noop, ...otherProps } = useContextSystem(
		props,
		'NavigationStackScreenNext',
	);
	const { tab } = useNavigationStackContext();
	const enabled = useIsNextEnabled();

	return (
		<Button
			disabled={!enabled}
			{...otherProps}
			onClick={(...args) => {
				tab.next();
				onClick(...args);
			}}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(
	NavigationStackScreenNext,
	'NavigationStackScreenNext',
);
