import { get, SUPPORTED_COLORS as COLORS, ui } from '@wp-g2/styles';
import { getOptimalTextColor, useClipboard } from '@wp-g2/utils';
import React from 'react';

import {
	Card,
	CardBody,
	Container,
	Grid,
	Heading,
	HStack,
	Spacer,
	Text,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Design/Colors',
};

const GRADES = [100, 300, 500, 700, 900];
const ALPHAS = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const ColorItem = ({ color, grade, rgba }) => {
	const [hex, setHex] = React.useState();
	const ref = React.useRef();
	const { hasCopied, onCopy } = useClipboard(hex);

	React.useEffect(() => {
		const computedBg = window.getComputedStyle(ref.current).background;
		const colorObj = ui.color(computedBg);
		setHex(rgba ? colorObj.toRgbString() : colorObj.toHexString());
	}, [rgba]);

	const textColor = rgba ? 'black' : getOptimalTextColor(hex);

	return (
		<CardBody
			key={grade}
			onClick={onCopy}
			ref={ref}
			style={{
				background: get(`${color}${grade}`),
				color: textColor,
				cursor: 'pointer',
			}}
		>
			<HStack>
				<View>
					{color}
					{grade}
				</View>
				<View css={{ textAlign: 'right' }}>
					{hasCopied ? 'Copied' : hex}
				</View>
			</HStack>
		</CardBody>
	);
};

const ColorSet = ({ color, grades = GRADES, rgba }) => {
	return (
		<Card>
			{grades.map((grade) => {
				return (
					<ColorItem
						color={color}
						grade={grade}
						key={grade}
						rgba={rgba}
					/>
				);
			})}
		</Card>
	);
};

export const Colors = () => {
	return (
		<Container css={{ margin: '5vh auto 20vh' }}>
			<VStack spacing={8}>
				<VStack>
					<Heading size={2}>Admin</Heading>
					<Grid columns={[1, 2, 4]}>
						<View>
							<ColorSet color={'colorAdmin'} grades={['']} />
						</View>
						<ColorSet
							color={'colorAdminRgba'}
							grades={ALPHAS}
							rgba
						/>
					</Grid>
				</VStack>
				<VStack>
					<Heading size={2}>Colors</Heading>
					<Grid columns={[1, 2, 4]}>
						{COLORS.map((color) => (
							<ColorSet color={color} key={color} />
						))}
					</Grid>
				</VStack>
			</VStack>
		</Container>
	);
};

const TypographyItem = ({
	base = 13,
	fontFamily = 'System',
	fontSize,
	multiplier = 1,
	title = 'Body',
}) => {
	const size = parseFloat(base * multiplier)
		.toFixed(2)
		.replace('.00', '');

	const roundedSize = Math.round(base * multiplier);

	return (
		<VStack spacing={1}>
			<Text size="caption">
				<strong>{title}</strong>
			</Text>
			<VStack>
				<View>
					<Text size={fontSize}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</Text>
				</View>
				<HStack alignment="left" spacing={8}>
					<Text css={{ width: 80 }} size="caption">
						<strong>Size:</strong> {roundedSize}px
					</Text>

					<Text css={{ width: 160 }} size="caption">
						<strong>Multiplier:</strong> Base ({base}px) *{' '}
						{multiplier}
					</Text>
					<Text css={{ width: 100 }} size="caption">
						<strong>Exact Size:</strong> {size}px
					</Text>
					<Text size="caption">
						<strong>Line Height:</strong> 1.2
					</Text>
					<Text size="caption">
						<strong>Font:</strong> {fontFamily}
					</Text>
				</HStack>
			</VStack>
		</VStack>
	);
};

const HeadingItem = ({
	fontFamily = 'System',
	title = 'Body',
	weight = 400,
}) => {
	return (
		<VStack spacing={1}>
			<Text size="caption">
				<strong>{title}</strong>
			</Text>
			<VStack>
				<View>
					<Text weight={weight}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</Text>
				</View>
				<HStack alignment="left" spacing={8}>
					<Text css={{ width: 80 }} size="caption">
						<strong>Weight:</strong> {weight}
					</Text>
					<Text size="caption">
						<strong>Line Height:</strong> 1.2
					</Text>
					<Text size="caption">
						<strong>Font:</strong> {fontFamily}
					</Text>
				</HStack>
			</VStack>
		</VStack>
	);
};

export const Typography = () => {
	return (
		<Container css={{ margin: '5vh auto 40vh' }}>
			<Spacer mb={8}>
				<Heading size={2}>Typography</Heading>
			</Spacer>

			<Spacer mb={4}>
				<Heading size={4}>Sizes</Heading>
			</Spacer>

			<Spacer mb={20}>
				<VStack spacing={10}>
					<TypographyItem
						fontSize={ui.get('fontSizeH1')}
						multiplier={2.44}
						title="H1"
					/>
					<TypographyItem
						fontSize={ui.get('fontSizeH2')}
						multiplier={1.95}
						title="H2"
					/>
					<TypographyItem
						fontSize={ui.get('fontSizeH3')}
						multiplier={1.56}
						title="H3"
					/>
					<TypographyItem
						fontSize={ui.get('fontSizeH4')}
						multiplier={1.25}
						title="H4"
					/>
					<TypographyItem
						fontSize={ui.get('fontSizeH5')}
						multiplier={1}
						title="H5"
					/>
					<TypographyItem
						fontSize={ui.get('fontSizeH6')}
						multiplier={0.8}
						title="H6"
					/>
					<TypographyItem />
					<TypographyItem
						fontSize={ui.get('fontSizeSmall')}
						multiplier={0.92}
						title="Small"
					/>
				</VStack>
			</Spacer>

			<Spacer mb={4}>
				<Heading size={4}>Weights</Heading>
			</Spacer>

			<VStack spacing={10}>
				<HeadingItem title="Heading" weight={600} />
				<HeadingItem />
			</VStack>
		</Container>
	);
};
