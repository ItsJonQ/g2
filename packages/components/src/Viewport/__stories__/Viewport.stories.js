import React from 'react';

import { ViewportDesktop, ViewportMobile, ViewportTabletOnly } from '../index';

export default {
	title: 'Components/Viewport',
};

export const _default = () => {
	return (
		<>
			<ViewportMobile>Mobile</ViewportMobile>
			<ViewportTabletOnly>Tablet</ViewportTabletOnly>
			<ViewportDesktop>Desktop</ViewportDesktop>
		</>
	);
};
