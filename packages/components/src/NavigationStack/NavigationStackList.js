import React from 'react';
import { Tab, TabList } from 'reakit';

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
