import { Tab, TabList } from '@wp-g2/a11y';
import React from 'react';

import { VisuallyHidden } from '../VisuallyHidden';
import { useNavigationStackContext } from './NavigationStack.Context';

function NavigationStackList() {
	const { tab } = useNavigationStackContext();
	const { panels } = tab;

	return (
		<VisuallyHidden>
			<TabList
				{...tab}
				aria-hidden="true"
				aria-label="Navigation TabList"
			>
				{panels.map((panel) => (
					<Tab {...tab} key={panel.id} />
				))}
			</TabList>
		</VisuallyHidden>
	);
}
export default React.memo(NavigationStackList);
