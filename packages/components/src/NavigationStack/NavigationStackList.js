import { connect } from '@wp-g2/provider';
import React from 'react';
import { Tab, TabList } from 'reakit/Tab';
import { VisuallyHidden } from 'reakit/VisuallyHidden';

import { useNavigationStackContext } from './NavigationStack.utils';

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
export default connect(NavigationStackList);
