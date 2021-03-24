import { FiChevronLeft } from '@wp-g2/icons';
import React from 'react';

import {
	Button,
	Heading,
	HStack,
	Icon,
	NavigatorLink,
	Spacer,
	Text,
	View,
	VStack,
} from '../../../index';

export const ScreenHeader = ({ back, description, title }) => {
	return (
		<VStack spacing={5}>
			<HStack spacing={2}>
				<View>
					<NavigatorLink isBack to={back}>
						<Button
							icon={
								<Icon
									icon={<FiChevronLeft />}
									variant="muted"
								/>
							}
							isControl
							isSubtle
							size="small"
						/>
					</NavigatorLink>
				</View>
				<Spacer>
					<Heading size={5}>{title}</Heading>
				</Spacer>
			</HStack>
			{description && <Text variant="muted">{description}</Text>}
		</VStack>
	);
};
