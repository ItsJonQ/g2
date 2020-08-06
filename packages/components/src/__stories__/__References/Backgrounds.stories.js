import {
	css,
	cx,
	getBackgroundColor,
	getBackgroundColorText,
	SUPPORTED_COLORS as COLORS,
	ThemeProvider,
} from '@wp-g2/styles';
import React from 'react';

import {
	Card,
	CardBody,
	Grid,
	Heading,
	Spacer,
	Surface,
	View,
} from '../../index';

export default {
	title: 'References',
};

const ColorSet = ({ color }) => {
	const classes = cx([
		css`
			${getBackgroundColor(color)}
		`,
		css`
			${getBackgroundColorText(color)}
		`,
	]);

	return (
		<Card>
			<CardBody className={classes}>{color}</CardBody>
		</Card>
	);
};

const ColorSetBold = ({ color }) => {
	const classes = cx([
		css`
			${getBackgroundColor(color, { isBold: true })}
		`,
		css`
			${getBackgroundColorText(color, { isBold: true })}
		`,
	]);

	return (
		<Card>
			<CardBody className={classes}>{color}</CardBody>
		</Card>
	);
};

const ColorCollection = ({ title }) => {
	return (
		<Spacer css={{ position: 'relative' }} mb={8} p={5}>
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
					<Heading size={4}>Bold</Heading>
				</Spacer>
				<Spacer mb={8}>
					<Grid columns={[1, 2, 4]}>
						{COLORS.map((color) => (
							<ColorSetBold color={color} key={color} />
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

export const Backgrounds = () => {
	return (
		<>
			<ColorCollection title="Backgrounds" />
			<ThemeProvider isDark isGlobal={false}>
				<ColorCollection title="Backgrounds + Dark" />
			</ThemeProvider>
		</>
	);
};
