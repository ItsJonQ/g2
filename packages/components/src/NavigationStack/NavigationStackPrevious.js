import { connect } from '@wp-g2/context';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { useNavigationStackContext } from './NavigationStack.Context';
import { useIsPreviousEnabled } from './NavigationStack.utils';

function NavigationStackScreenPrevious({ onClick = noop, ...props }) {
	const { tab } = useNavigationStackContext();
	const enabled = useIsPreviousEnabled();

	return (
		<Button
			disabled={!enabled}
			{...props}
			onClick={(...args) => {
				tab.previous();
				onClick(...args);
			}}
		/>
	);
}

export default connect(
	NavigationStackScreenPrevious,
	'NavigationStackScreenPrevious',
);
