import React from 'react';

import {
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Panel,
	PanelBody,
	PanelHeader,
	Text,
	VStack,
} from '../../index';
import { Accordion } from '../index';

export default {
	component: Accordion,
	title: 'Components/Accordion',
};

const Example = () => {
	const [current, setCurrent] = React.useState();

	return (
		<ListGroups>
			<ListGroup>
				<ListGroupHeader>Accordion</ListGroupHeader>
				<Accordion current={current} onChange={setCurrent}>
					<Panel id="one">
						<PanelHeader>
							<Text>Panel 1</Text>
						</PanelHeader>
						<PanelBody>
							<Text>Content</Text>
						</PanelBody>
					</Panel>
					<Panel id="two">
						<PanelHeader>
							<Text>Panel 2</Text>
						</PanelHeader>
						<PanelBody>
							<Text>Content</Text>
						</PanelBody>
					</Panel>
					<Panel id="three">
						<PanelHeader>
							<Text>Panel 3</Text>
						</PanelHeader>
						<PanelBody>
							<Text>Content</Text>
						</PanelBody>
					</Panel>
				</Accordion>
			</ListGroup>
			<ListGroup>
				<ListGroupHeader>Accordion (Another set)</ListGroupHeader>
				<Accordion current={current} onChange={setCurrent}>
					<Panel id="one">
						<PanelHeader>
							<Text>Panel 1</Text>
						</PanelHeader>
						<PanelBody>
							<Text>Content</Text>
						</PanelBody>
					</Panel>
					<Panel id="two">
						<PanelHeader>
							<Text>Panel 2</Text>
						</PanelHeader>
						<PanelBody>
							<Text>Content</Text>
						</PanelBody>
					</Panel>
					<Panel id="three">
						<PanelHeader>
							<Text>Panel 3</Text>
						</PanelHeader>
						<PanelBody>
							<Text>Content</Text>
						</PanelBody>
					</Panel>
				</Accordion>
			</ListGroup>
		</ListGroups>
	);
};

export const _default = () => {
	return <Example />;
};
