import { Button, HStack, View } from '@wp-g2/components';
import React from 'react';

export default {
	title: 'Examples/WIP/Hint',
};

export const _default = () => {
	return (
		<>
			<View>
				<View>
					<Button>One</Button>
					<Button>Two</Button>
				</View>
				<View>
					<Button>One</Button>
					<Button>Two</Button>
				</View>
				<View>
					<Button>One</Button>
					<Button>Two</Button>
				</View>
				<HStack alignment="left">
					<Button>One</Button>
					<Button>Two</Button>
				</HStack>
				<View>Invalid Text</View>
			</View>
		</>
	);
};
