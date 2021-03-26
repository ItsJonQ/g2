import React from 'react';

import { MenuItem, NavigatorLink, Text } from '../../../index';

export const SettingLink = ({ prefix, title, to }) => {
	return (
		<NavigatorLink to={to}>
			<MenuItem prefix={prefix} showArrow>
				<Text weight={600}>{title}</Text>
			</MenuItem>
		</NavigatorLink>
	);
};
