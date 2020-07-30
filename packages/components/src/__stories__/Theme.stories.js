import { Controls, useControls } from '@itsjonq/controls';
import { ThemeProvider } from '@wp-g2/styles';
import React from 'react';

import { Controls as ControlsExample } from './Controls.stories';

export default {
	title: 'Examples',
};

const Example = () => {
	const { color, number, text } = useControls();

	const theme = {
		colorAdmin: color('colorAdmin', 'blue'),
		colorText: color('colorText', 'black'),
		controlBorderColor: color('controlBorderColor', '#f2f2f2'),
		controlBorderRadius: `${number('controlBorderRadius', 4)}px`,
		controlHeight: `${number('controlHeight', 30)}px`,
		controlSurfaceColor: color('controlSurfaceColor', 'white'),
		fontFamily: text('fontFamily', 'Inter'),
		fontSize: `${number('fontSize', 13)}px`,
		surfaceColor: color('surfaceColor', 'white'),
	};

	return (
		<ThemeProvider theme={theme}>
			<Controls left={8} right={null} title="Theme Customizer" top={60} />
			<ControlsExample />
		</ThemeProvider>
	);
};

export const Theme = () => {
	return <Example />;
};
