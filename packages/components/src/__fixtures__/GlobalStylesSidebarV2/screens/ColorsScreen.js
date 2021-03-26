import _ from 'lodash';
import React from 'react';

import {
	CardBody,
	ColorCircle,
	HStack,
	ItemGroup,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Spacer,
	Text,
	View,
	VStack,
	ZStack,
} from '../../../index';
import { NavLink, Screen, ScreenHeader } from '../components';
import { useAppState } from '../state';

const Palette = () => {
	const { get } = useAppState();
	const theme = get('color.palettes[0].colors');
	const colors = _.take(theme, 3);

	return (
		<ListGroup>
			<ListGroupHeader>Palette</ListGroupHeader>
			<ItemGroup bordered separated>
				<NavLink to="/colors/palette">
					<HStack>
						<Spacer>
							<ZStack isLayered={false} offset={4}>
								{colors.map((color) => (
									<ColorCircle
										color={color.color}
										key={color.id}
										size="small"
									/>
								))}
							</ZStack>
						</Spacer>
						<View>
							<Text variant="muted">23 colors</Text>
						</View>
					</HStack>
				</NavLink>
			</ItemGroup>
		</ListGroup>
	);
};

const Elements = () => {
	const { get } = useAppState();
	const elements = get('color.elements');

	return (
		<ListGroup>
			<ListGroupHeader>Elements</ListGroupHeader>
			<ItemGroup bordered separated>
				{elements.map((element) => (
					<NavLink
						key={element.title}
						to={`/colors/elements/${element.slug}`}
					>
						<HStack spacing={3}>
							<View>
								<ColorCircle
									color={element.color}
									size="small"
								/>
							</View>
							<Spacer>
								<Text isBlock lineHeight={1}>
									{element.title}
								</Text>
							</Spacer>
						</HStack>
					</NavLink>
				))}
			</ItemGroup>
		</ListGroup>
	);
};

export const ColorsScreen = () => {
	return (
		<Screen>
			<CardBody>
				<VStack spacing={8}>
					<ScreenHeader
						back="/"
						description={
							'Manages the available colors to use across the site and its blocks.'
						}
						title="Color"
					/>
					<ListGroups>
						<Palette />
						<Elements />
					</ListGroups>
				</VStack>
			</CardBody>
		</Screen>
	);
};
