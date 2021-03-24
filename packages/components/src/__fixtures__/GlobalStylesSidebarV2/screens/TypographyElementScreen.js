import _ from 'lodash';
import React from 'react';

import { CardBody, useNavigatorParams, VStack } from '../../../index';
import { Screen, ScreenHeader } from '../components';

const Header = () => {
	const { id } = useNavigatorParams();
	const title = _.startCase(id);

	return (
		<ScreenHeader
			back="/typography"
			description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
				congue finibus ante vel maximus.`}
			title={title}
		/>
	);
};

export const TypographyElementScreen = () => {
	return (
		<Screen>
			<CardBody>
				<VStack spacing={8}>
					<Header />
				</VStack>
			</CardBody>
		</Screen>
	);
};
