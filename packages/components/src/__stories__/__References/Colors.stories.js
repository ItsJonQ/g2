import { get, SUPPORTED_COLORS as COLORS, ThemeProvider } from '@wp-g2/styles';
import React from 'react';

import {
	Card,
	CardBody,
	Flex,
	FlexItem,
	Grid,
	Heading,
	Spacer,
	Surface,
	View,
} from '../../index';

export default {
	title: 'References/Colors',
};

const grades = [100, 300, 500, 700, 900];
const alphas = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const ColorSet = ({ color }) => {
	return (
		<Card>
			{grades.map((grade) => {
				return (
					<CardBody
						key={grade}
						style={{
							background: get(`${color}${grade}`),
							color: get(`${color}${grade}Text`),
						}}
					>
						<Flex>
							<FlexItem>
								{color}
								{grade}
							</FlexItem>
						</Flex>
					</CardBody>
				);
			})}
		</Card>
	);
};

const ColorRGBSet = ({ color }) => {
	return (
		<Card>
			{alphas.map((alpha) => {
				return (
					<CardBody
						key={alpha}
						style={{
							background: get(`${color}Rgba${alpha}`),
							color: get(`${color}${alpha}Text`),
						}}
					>
						<Flex>
							<FlexItem>{`${color}Rgba${alpha}`}</FlexItem>
						</Flex>
					</CardBody>
				);
			})}
		</Card>
	);
};

const ColorCollection = ({ title }) => {
	return (
		<Spacer
			css={{
				position: 'relative',
			}}
			mb={8}
			p={5}
		>
			<View
				css={{
					margin: 'auto',
					maxWidth: 1200,
					position: 'relative',
					zIndex: 1,
				}}
			>
				<Spacer>
					<Heading size={2}>{title}</Heading>
				</Spacer>
				<Spacer mb={8}>
					<Grid columns={[1, 2, 4]}>
						{COLORS.map((color) => (
							<ColorSet color={color} key={color} />
						))}
					</Grid>
				</Spacer>
				<Spacer>
					<Heading size={4}>RGBA</Heading>
				</Spacer>
				<Spacer>
					<Grid columns={[1, 2, 4]}>
						{COLORS.map((color) => (
							<ColorRGBSet color={color} key={color} />
						))}
					</Grid>
				</Spacer>
			</View>
			<Surface
				css={{
					bottom: 0,
					left: 0,
					position: 'absolute',
					right: 0,
					top: 0,
					zIndex: 0,
				}}
			/>
		</Spacer>
	);
};

export const _default = () => {
	return (
		<>
			<ColorCollection title="Colors" />
			<ThemeProvider isDark isGlobal={false}>
				<ColorCollection title="Colors + Dark" />
			</ThemeProvider>
		</>
	);
};
