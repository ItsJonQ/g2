import React from 'react';

import { CardBody } from '../../../index';
import { Screen, SettingLink, StylePreview } from '../components';

export const GlobalStylesScreen = () => {
	return (
		<Screen>
			<StylePreview />
			<CardBody>
				<SettingLink title="Colors" to="/colors" />
				<SettingLink title="Typography" to="/typography" />
			</CardBody>
		</Screen>
	);
};
