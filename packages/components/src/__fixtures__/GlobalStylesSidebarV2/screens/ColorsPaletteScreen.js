import React from 'react';

import {
	CardBody,
	ColorCircle,
	HStack,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	SegmentedControl,
	VStack,
} from '../../../index';
import { Screen, ScreenHeader } from '../components';
import { useAppState } from '../state';

const Palette = ({ colors = [], title }) => {
	return (
		<ListGroup>
			<ListGroupHeader>{title}</ListGroupHeader>
			<HStack alignment="left" wrap>
				{colors.map((color) => (
					<ColorCircle color={color.color} key={color.id} />
				))}
			</HStack>
		</ListGroup>
	);
};

const Palettes = () => {
	const [palettes] = useAppState('color.palettes');
	return (
		<ListGroups>
			<ListGroup>
				<SegmentedControl
					options={[
						{ value: 'solids', label: 'Solids' },
						{ value: 'gradients', label: 'Gradients' },
					]}
				/>
			</ListGroup>
			{palettes.map((palette) => (
				<Palette key={palette.id} {...palette} />
			))}
		</ListGroups>
	);
};

export const ColorsPaletteScreen = () => {
	return (
		<Screen>
			<CardBody>
				<VStack spacing={8}>
					<ScreenHeader
						back="/colors"
						description={`Manages the available colors to use across the site and its
				blocks.`}
						title="Palette"
					/>
					<Palettes />
				</VStack>
			</CardBody>
		</Screen>
	);
};
