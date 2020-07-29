import React from 'react';

import { Grid, Spacer, Text, TextField } from '../../index';
import { Panel, PanelBody, PanelHeader } from '../index';

export default {
	component: Panel,
	title: 'Panel',
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

export const _default = () => {
	return (
		<Panel sx={{ width: 300 }} visible>
			<PanelHeader title="Title" />
			<PanelBody>
				<Spacer>
					<Grid columns={2}>
						<TextField
							suffix={<InputSuffix>W</InputSuffix>}
							value={300}
						/>
						<TextField
							suffix={<InputSuffix>H</InputSuffix>}
							value={200}
						/>
					</Grid>
				</Spacer>
				<Spacer>
					<Grid columns={3}>
						<TextField suffix={<InputSuffix>X</InputSuffix>} />
						<TextField suffix={<InputSuffix>Y</InputSuffix>} />
						<TextField suffix={<InputSuffix>Z</InputSuffix>} />
					</Grid>
				</Spacer>
				<Spacer>
					<Grid templateColumns="2fr 1fr">
						<TextField />
						<TextField suffix={<InputSuffix>%</InputSuffix>} />
					</Grid>
				</Spacer>
			</PanelBody>
		</Panel>
	);
};
