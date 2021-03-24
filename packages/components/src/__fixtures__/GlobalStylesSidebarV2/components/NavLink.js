import React from 'react';

import { Item, NavigatorLink } from '../../../index';

export const NavLink = (props) => {
	return (
		<Item action css={{ padding: 0 }}>
			<NavigatorLink
				{...props}
				css={{ display: 'block', padding: '8px 12px' }}
			/>
		</Item>
	);
};
