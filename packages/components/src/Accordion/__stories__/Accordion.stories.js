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

export const _default = () => {
	return (
		<ListGroups>
			<ListGroup>
				<ListGroupHeader>Accordion</ListGroupHeader>
				<Accordion>
					<Panel>
						<PanelHeader>Panel 1</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel>
						<PanelHeader>Panel 2</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel>
						<PanelHeader>Panel 3</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
				</Accordion>
			</ListGroup>
			<ListGroup>
				<ListGroupHeader>Accordion (Allow Multiple)</ListGroupHeader>
				<Accordion allowMultiple>
					<Panel>
						<PanelHeader>Panel 1</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel>
						<PanelHeader>Panel 2</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel>
						<PanelHeader>Panel 3</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
				</Accordion>
			</ListGroup>
			<ListGroup>
				<ListGroupHeader>Panels</ListGroupHeader>
				<VStack spacing={0}>
					<Panel>
						<PanelHeader>Panel 1</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel>
						<PanelHeader>Panel 2</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
					<Panel>
						<PanelHeader>Panel 3</PanelHeader>
						<PanelBody>Content</PanelBody>
					</Panel>
				</VStack>
			</ListGroup>
		</ListGroups>
	);
};
