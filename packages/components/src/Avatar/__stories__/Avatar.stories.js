// import { Avatar } from '../index';
import { faker } from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import React from 'react';

import {
	HStack,
	Text,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	View,
	VStack,
	ZStack,
} from '../../index';

export default {
	// component: Avatar,
	title: 'Components/Avatar',
};

const borderRadii = {
	circle: 999999,
	square: 8,
};

/* eslint-disable */
const sizes = {
	xLarge: 48,
	large: 36,
	medium: 30,
	small: 24,
	xSmall: 16,
};
/* eslint-enable */

function getInitials(name = 'Hello There') {
	const names = name
		.split(' ')
		.map((name) => name.charAt(0))
		.join('');

	return names;
}

function getSize(size) {
	const supported = sizes[size];

	return supported || size;
}

function getBorderRadius(borderRadius, size = sizes.medium) {
	const supported = borderRadii[borderRadius];

	if (borderRadius === 'square' && size < 25) {
		return 4;
	}

	return supported || borderRadius;
}

function StatusDot({ color = 'green' }) {
	const styles = {
		border: '2px solid white',
		zIndex: 1,
	};

	return (
		<View
			css={[
				{ background: color },
				ui.offset({ x: 4, y: -4 }),
				ui.borderRadius.circle,
				ui.frame({ height: 10, width: 10 }),
				ui.position.topRight,
				styles,
			]}
		/>
	);
}

function Image({ css: cssProp, src, ...props }) {
	const styles = {
		height: 'auto',
		maxWidth: '100%',
	};

	return <View as="img" css={[styles, cssProp]} src={src} {...props} />;
}

function AvatarGroup({ children }) {
	return (
		<ZStack isLayered={false} isReversed offset={8}>
			{children}
		</ZStack>
	);
}

function Avatar({
	name,
	size: sizeProp = 48,
	src,
	status,
	tooltipText,
	variant = 'circle',
}) {
	const size = getSize(sizeProp);
	const borderRadius = getBorderRadius(variant, size);

	const styles = {
		alignItems: 'center',
		borderRadius,
		display: 'flex',
		height: size,
		justifyContent: 'center',
		width: size,
	};

	let textSize = size < 28 ? 11 : undefined;

	if (size < 21) {
		textSize = 8;
	}

	const initials = getInitials(name);
	const shouldRenderInitials = !src && initials;

	return (
		<Tooltip>
			<TooltipTrigger>
				<View
					css={[ui.background.darkGray, ui.position.relative, styles]}
					title={name}
				>
					{status && <StatusDot color={status} />}
					{src && <Image css={[{ borderRadius }]} src={src} />}
					{shouldRenderInitials && (
						<Text as="div" size={textSize} weight={500}>
							{initials}
						</Text>
					)}
				</View>
			</TooltipTrigger>
			<TooltipContent>{tooltipText || name}</TooltipContent>
		</Tooltip>
	);
}

export const _default = () => {
	const avatars = Object.keys(sizes);
	const avatarSizes = Object.values(sizes);

	return (
		<VStack spacing={8}>
			<HStack alignment="left">
				{avatars.map((size, index) => {
					const randomName = `${faker.name.firstName()} ${faker.name.lastName()}`;
					const avatarImage = faker.image.avatar();

					return (
						<View key={index}>
							<Avatar
								key={size}
								name={randomName}
								size={size}
								src={faker.random.arrayElement([
									avatarImage,
									undefined,
								])}
								status={faker.random.arrayElement([
									'green',
									'red',
									'orange',
									undefined,
								])}
							/>
							<Text>{avatarSizes[index]}</Text>
							<Text>{randomName}</Text>
						</View>
					);
				})}
			</HStack>
			<HStack alignment="left">
				{avatars.map((size, index) => {
					const randomName = `${faker.name.firstName()}`;
					const avatarImage = faker.image.avatar();

					return (
						<View key={index}>
							<Avatar
								key={size}
								name={randomName}
								size={size}
								src={faker.random.arrayElement([
									avatarImage,
									undefined,
								])}
								status={faker.random.arrayElement([
									'green',
									'red',
									'orange',
									undefined,
								])}
								variant="square"
							/>
							<Text>{avatarSizes[index]}</Text>
							<Text>{randomName}</Text>
						</View>
					);
				})}
			</HStack>
			<AvatarGroup>
				{avatars.map((size, index) => {
					const randomName = `${faker.name.firstName()}`;
					const avatarImage = faker.image.avatar();

					return (
						<View key={index}>
							<Avatar
								key={size}
								name={randomName}
								src={avatarImage}
								variant="circle"
							/>
						</View>
					);
				})}
			</AvatarGroup>
		</VStack>
	);
};
