import React from 'react';

import {
	CardBody,
	ListGroup,
	ListGroupHeader,
	MenuItem,
	NavigatorLink,
	Text,
	VStack,
} from '../../../index';
import { Screen, ScreenHeader } from '../components';

const Header = () => {
	return (
		<VStack spacing={5}>
			<ScreenHeader back="GlobalStyles" title="Color" />
			<Text variant="muted">
				Manages the available colors to use across the site and its
				blocks.
			</Text>
		</VStack>
	);
};

const Palette = () => {
	return (
		<ListGroup>
			<ListGroupHeader>Palette</ListGroupHeader>
			<NavigatorLink to="Color/Palette">
				<MenuItem>Hello</MenuItem>
			</NavigatorLink>
		</ListGroup>
	);
};

export const ColorsScreen = () => {
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
