import { connect } from '@g2/provider';
import { noop } from '@g2/utils';
import React from 'react';

import { Button } from '../Button';
import {
	useIsPreviousEnabled,
	useNavigationStackContext,
} from './NavigationStack.utils';

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

export default connect(NavigationStackScreenPrevious);
