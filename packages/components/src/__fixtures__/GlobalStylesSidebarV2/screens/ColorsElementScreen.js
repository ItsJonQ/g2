import _ from 'lodash';
import React from 'react';

import {
	CardBody,
	ListGroup,
	ListGroupHeader,
	MenuItem,
	NavigatorLink,
	Text,
	useNavigatorParams,
	VStack,
} from '../../../index';
import { Screen, ScreenHeader } from '../components';

const Header = () => {
	const { id } = useNavigatorParams();
	const title = _.startCase(id);
	return (
		<VStack spacing={5}>
			<ScreenHeader back="/colors" title={title} />
			<Text variant="muted">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
				congue finibus ante vel maximus.
			</Text>
		</VStack>
	);
};

const Palette = () => {
	return (
		<ListGroup>
			<ListGroupHeader>Palette</ListGroupHeader>
		</ListGroup>
	);
};

export const ColorsElementScreen = () => {
	return (
		<Screen>
			<CardBody>
				<VStack spacing={8}>
					<Header />
					<Palette />
				</VStack>
			</CardBody>
		</Screen>
	);
};
