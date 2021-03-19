import { FiChevronLeft, FiDroplet, FiGrid, FiPlus, FiType } from '@wp-g2/icons';
import React from 'react';

import {
	CardBody,
	Heading,
	HStack,
	Icon,
	NavigatorLink,
	Spacer,
	View,
} from '../../../index';

export const ScreenHeader = ({ back, title }) => {
	return (
		<HStack spacing={4}>
			<View>
				<NavigatorLink isBack to={back}>
					<Icon icon={<FiChevronLeft />} variant="muted" />
				</NavigatorLink>
			</View>
			<Spacer>
				<Heading size={5}>{title}</Heading>
			</Spacer>
		</HStack>
	);
};
