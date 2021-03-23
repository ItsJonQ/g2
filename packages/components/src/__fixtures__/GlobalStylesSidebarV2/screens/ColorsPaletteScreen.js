import React from 'react';

import {
	CardBody,
	ListGroup,
	ListGroupHeader,
	SegmentedControl,
	Text,
	VStack,
} from '../../../index';
import { Screen, ScreenHeader } from '../components';

const Header = () => {
	return (
		<VStack spacing={5}>
			<ScreenHeader back="/colors" title="Palette" />
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
			<SegmentedControl
				options={[
					{ value: 'solids', label: 'Solids' },
					{ value: 'gradients', label: 'Gradients' },
				]}
			/>
		</ListGroup>
	);
};

export const ColorsPaletteScreen = () => {
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
