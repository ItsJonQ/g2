import { connect } from '@g2/provider';
import { noop } from '@g2/utils';
import React from 'react';

import { Button } from '../Button';
import {
	useIsNextEnabled,
	useNavigationStackContext,
} from './NavigationStack.utils';

function NavigationStackScreenNext({ onClick = noop, ...props }) {
	const { tab } = useNavigationStackContext();
	const enabled = useIsNextEnabled();

	return (
		<Button
			disabled={!enabled}
			{...props}
			onClick={(...args) => {
				tab.next();
				onClick(...args);
			}}
		/>
	);
}

export default connect(NavigationStackScreenNext);
