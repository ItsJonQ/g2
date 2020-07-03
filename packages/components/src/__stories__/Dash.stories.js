import { BaseView } from '@g2/css';
import { ComponentsProvider, connect } from '@g2/provider';
import React from 'react';

import {
	Button,
	Flex,
	FlexItem,
	Grid,
	Panel,
	PanelBody,
	PanelHeader,
	Placeholder,
	Scrollable,
	Text,
} from '../index';

export default {
	title: 'Example/Dash',
};

const Sidebar = connect(BaseView, 'Sidebar');

export const _default = () => {
	return (
		<Grid align="flex-start" templateColumns={[null, null, '1fr 300px']}>
			<Flex align={[null, 'center']} direction={['column', 'row']} p={3}>
				<FlexItem pb={[1, null]}>
					<Text as="h1" size={3} weight={600}>
						Title
					</Text>
				</FlexItem>
				<FlexItem>
					<ComponentsProvider value={{ Button: { size: 'small' } }}>
						<Flex justify="flex-start">
							<Button>Save draft</Button>
							<Button>Preview</Button>
							<Button variant="primary">Publish</Button>
						</Flex>
					</ComponentsProvider>
				</FlexItem>
			</Flex>
			<Sidebar
				sx={{
					borderLeft: '1px solid #eee',
					height: [null, null, '100vh'],
				}}
			>
				<Scrollable>
					<Panel visible>
						<PanelHeader title="Panel" />
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel>
						<PanelHeader title="Another Panel" />
						<PanelBody>
							<Placeholder height={900} />
						</PanelBody>
					</Panel>
				</Scrollable>
			</Sidebar>
		</Grid>
	);
};
