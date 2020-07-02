import emotionStyled from '@emotion/styled';
import React from 'react';

import { Spacer } from '../../Spacer';
import { Stack, StackItem } from '../../Stack';
import { Text } from '../../Text';
import { Button } from '../index';

export default {
	title: 'Button',
	component: Button,
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

const E = emotionStyled.div``;
export const _default = () => {
	return (
		<>
			<Buttons isLargeeee variant="primary" />
			<Buttons variant="secondary" />
			<Buttons variant="tertiary" />
			<Buttons isOutline variant="primary" />
			<Buttons isOutline variant="secondary" />
		</>
	);
};
