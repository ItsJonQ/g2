import { Heading, Text, VStack } from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import React from 'react';

function App() {
	return (
		<VStack
			alignment="center"
			css={[ui.padding(4), ui.frame.height('80vh')]}
		>
			<VStack css={[ui.frame.width(640), ui.alignment.center]}>
				<Heading size={1}>
					<span aria-label="wave" role="img">
						👋
					</span>{' '}
					Hello
				</Heading>
				<Text>Welcome to the G2 Components Starter Kit!</Text>
				<Text size="caption" variant="muted">
					Start editing to see some magic happen!
				</Text>
			</VStack>
		</VStack>
	);
}

export default App;
