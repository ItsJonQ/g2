import React from 'react';

import {
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Panel,
	PanelBody,
	PanelHeader,
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
						<PanelHeader>Panel 1</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel id="two">
						<PanelHeader>Panel 2</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel id="three">
						<PanelHeader>Panel 3</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
				</Accordion>
			</ListGroup>
			<ListGroup>
				<ListGroupHeader>Accordion (Another set)</ListGroupHeader>
				<Accordion current={current} onChange={setCurrent}>
					<Panel id="one">
						<PanelHeader>Panel 1</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel id="two">
						<PanelHeader>Panel 2</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel id="three">
						<PanelHeader>Panel 3</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
				</Accordion>
			</ListGroup>
		</ListGroups>
	);
};

export const _default = () => {
	return <Example />;
};
