import { connect } from '@wp-g2/context';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { useNavigationStackContext } from './NavigationStack.Context';
import { useIsNextEnabled } from './NavigationStack.utils';

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
