import { ComponentsProvider } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styled';
import React from 'react';

import {
	Grid,
	Panel,
	PanelBody,
	PanelHeader,
	Scrollable,
	Spacer,
	Text,
	TextInput,
} from '../index';

export default {
	title: 'Example/Sidebar',
};

const InputSuffix = (props) => (
	<Text
		isBlock
		lineHeight={1}
		size={11}
		sx={{ userSelect: 'none' }}
		variant="muted"
		{...props}
	/>
);

const PanelExample = () => {
	return (
		<Panel visible>
			<PanelHeader title="Title" />
			<PanelBody>
				<Spacer>
					<Grid columns={2}>
						<TextInput
							suffix={<InputSuffix>W</InputSuffix>}
							value={300}
						/>
						<TextInput
							suffix={<InputSuffix>H</InputSuffix>}
							value={200}
						/>
					</Grid>
				</Spacer>
				<Spacer>
					<Grid columns={3}>
						<TextInput suffix={<InputSuffix>X</InputSuffix>} />
						<TextInput suffix={<InputSuffix>Y</InputSuffix>} />
						<TextInput suffix={<InputSuffix>Z</InputSuffix>} />
					</Grid>
				</Spacer>
				<Spacer>
					<Grid templateColumns="2fr 1fr">
						<TextInput />
						<TextInput suffix={<InputSuffix>%</InputSuffix>} />
					</Grid>
				</Spacer>
			</PanelBody>
		</Panel>
	);
};

export const _default = () => {
	return (
		<BaseView
			sx={{
				borderLeft: '1px solid #eee',
				bottom: 0,
				height: '100vh',
				maxWidth: 300,
				position: 'fixed',
				right: 0,
				top: 0,
			}}
		>
			<Scrollable>
				<ComponentsProvider
					value={{
						Grid: { spacing: 2 },
						TextInput: { size: 'small' },
					}}
				>
					<PanelExample />
					<PanelExample />
					<PanelExample />
					<PanelExample />
					<PanelExample />
				</ComponentsProvider>
			</Scrollable>
		</BaseView>
	);
};
