import { BaseView } from '@g2/css';
import { ComponentsProvider } from '@g2/provider';
import React from 'react';

import { Grid, InputControl, Spacer, Text } from '../../index';
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
		<BaseView sx={{ maxWidth: 300 }}>
			<ComponentsProvider
				value={{
					Grid: { spacing: 2 },
					InputControl: { size: 'small' },
				}}
			>
				<Panel sx={{ height: 400, width: 300 }} visible>
					<PanelHeader title="Title" />
					<PanelBody>
						<Spacer>
							<Grid columns={2}>
								<InputControl
									suffix={<InputSuffix>W</InputSuffix>}
									value={300}
								/>
								<InputControl
									suffix={<InputSuffix>H</InputSuffix>}
									value={200}
								/>
							</Grid>
						</Spacer>
						<Spacer>
							<Grid columns={3}>
								<InputControl
									suffix={<InputSuffix>X</InputSuffix>}
								/>
								<InputControl
									suffix={<InputSuffix>Y</InputSuffix>}
								/>
								<InputControl
									suffix={<InputSuffix>Z</InputSuffix>}
								/>
							</Grid>
						</Spacer>
						<Spacer>
							<Grid templateColumns="1fr 30%">
								<InputControl />
								<InputControl
									suffix={<InputSuffix>%</InputSuffix>}
								/>
							</Grid>
						</Spacer>
					</PanelBody>
				</Panel>
			</ComponentsProvider>
		</BaseView>
	);
};
