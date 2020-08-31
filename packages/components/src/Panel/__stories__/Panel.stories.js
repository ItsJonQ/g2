import React from 'react';

import { Grid, Spacer, Text, TextInput } from '../../index';
import { Panel, PanelBody, PanelHeader } from '../index';

export default {
	component: Panel,
	title: 'Components/Panel',
};

const InputSuffix = (props) => (
	<Text
		css={{ userSelect: 'none' }}
		isBlock
		lineHeight={1}
		size={11}
		variant="muted"
		{...props}
	/>
);

export const _default = () => {
	return (
		<Panel css={{ width: 300 }} visible>
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
