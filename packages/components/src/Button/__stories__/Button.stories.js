import React from 'react';

import { Spacer } from '../../Spacer';
import { Stack, StackItem } from '../../Stack';
import { Text } from '../../Text';
import { Button } from '../index';

export default {
	component: Button,
	title: 'Button',
};

const Buttons = (props) => {
	return (
		<Spacer>
			<Stack direction="row" justify="left" spacing={4}>
				<StackItem>
					<Spacer>
						<Text size={0} variant="muted">
							Large
						</Text>
					</Spacer>
					<Button size="large" {...props}>
						Button
					</Button>
				</StackItem>
				<StackItem>
					<Spacer>
						<Text size={0} variant="muted">
							Medium
						</Text>
					</Spacer>
					<Button size="medium" {...props}>
						Button
					</Button>
				</StackItem>
				<StackItem>
					<Spacer>
						<Text size={0} variant="muted">
							Small
						</Text>
					</Spacer>
					<Button size="small" {...props}>
						Button
					</Button>
				</StackItem>
			</Stack>
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
		</>
	);
};
