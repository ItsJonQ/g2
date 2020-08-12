import React from 'react';

import { HStack } from '../../HStack';
import {
	Button,
	Heading,
	Lozenge,
	Placeholder,
	Spacer,
	Text,
	View,
} from '../../index';
import { VStack } from '../index';

export default {
	component: VStack,
	title: 'Components/VStack',
};

export const _default = () => {
	return (
		<View css={{ margin: 'auto', maxWidth: 960 }}>
			<VStack>
				<HStack justify="space-between">
					<View>
						<Heading size={3}>
							Components: HStack, VStack, ZStack{' '}
							<View
								as="span"
								css={{ fontSize: 'inherit', opacity: 0.5 }}
							>
								#22
							</View>
						</Heading>
					</View>
					<View>
						<HStack>
							<Button>Edit</Button>
							<Button variant="primary">New Issue</Button>
						</HStack>
					</View>
				</HStack>
				<HStack justify="flex-start">
					<Lozenge color="green">Open</Lozenge>
					<Text weight="bold">ItsJonQ</Text>
					<Text>opened this issue 2 days ago · 1 comment</Text>
				</HStack>
			</VStack>
		</View>
	);
};
