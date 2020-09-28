import React from 'react';

import { Flex, Spacer, Text } from '../../index';
import { Button } from '../index';

export default {
	component: Button,
	title: 'Components/Button',
};

const Buttons = (props) => {
	return (
		<Spacer>
			<Flex direction="row" justify="left" spacing={4}>
				<Text size={12} variant="muted">
					Large
				</Text>
				<Button size="large" {...props}>
					Button
				</Button>
				<Text size={12} variant="muted">
					Medium
				</Text>
				<Button size="medium" {...props}>
					Button
				</Button>
				<Text size={12} variant="muted">
					Small
				</Text>
				<Button size="small" {...props}>
					Button
				</Button>
			</Flex>
		</Spacer>
	);
};

export const _default = () => {
	return (
		<>
			<Buttons variant="primary" />
			<Buttons variant="secondary" />
			<Buttons variant="tertiary" />
			<Buttons isDestructive variant="primary" />
			<Buttons isDestructive variant="secondary" />
			<Buttons isDestructive variant="tertiary" />
			<Buttons isSubtle variant="secondary" />
			<Buttons isControl />
			<Buttons isControl isSubtle />
			<Buttons
				elevation={2}
				prefix={<Text>Prefix</Text>}
				suffix={<Text>Suffix</Text>}
				variant="secondary"
			/>
			<Buttons
				elevation={2}
				isLoading
				prefix={<Text>Prefix</Text>}
				suffix={<Text>Suffix</Text>}
				variant="secondary"
			/>
		</>
	);
};
