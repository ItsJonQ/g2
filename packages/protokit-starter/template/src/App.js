import { Heading, HStack, Text, VStack } from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import React from 'react';

function App() {
	return (
		<HStack alignment="center" css={[ui.padding(30)]}>
			<VStack>
				<Heading align="center" size={1}>
					<span aria-label="wave" role="img">
						👋
					</span>{' '}
					Hello
				</Heading>
				<Text align="center">
					Welcome to the G2 Components Starter Kit!
				</Text>
			</VStack>
		</HStack>
	);
}

export default App;
