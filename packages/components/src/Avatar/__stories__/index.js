import { faker } from '@wp-g2/protokit';
import React from 'react';

import { HStack, View, VStack, ZStack } from '../../index';
import { AVATAR_SIZES } from '../Avatar.utils';
import { Avatar } from '../index';

export default {
	component: Avatar,
	title: 'Components/Avatar',
};

// function StatusDot({ color = 'green' }) {
// 	const styles = {
// 		border: '2px solid white',
// 		zIndex: 1,
// 	};

// 	return (
// 		<View
// 			css={[
// 				{ background: color },
// 				ui.offset({ x: 4, y: -4 }),
// 				ui.borderRadius.circle,
// 				ui.frame({ height: 10, width: 10 }),
// 				ui.position.topRight,
// 				styles,
// 			]}
// 		/>
// 	);
// }

function AvatarGroup({ children }) {
	return (
		<ZStack isLayered={false} isReversed offset={8}>
			{children}
		</ZStack>
	);
}

export const _default = () => {
	const avatars = Object.keys(AVATAR_SIZES);

	return (
		<VStack spacing={8}>
			<HStack alignment="left">
				{avatars.map((size, index) => {
					const randomName = `${faker.name.firstName()} ${faker.name.lastName()}`;
					const avatarImage = faker.image.avatar();

					return (
						<View key={index}>
							<Avatar
								color={faker.random.arrayElement([
									'var(--wp-g2-green-500)',
									'var(--wp-g2-red-500)',
									'var(--wp-g2-orange-500)',
									undefined,
								])}
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
								color={faker.random.arrayElement([
									'green',
									'red',
									'orange',
									undefined,
								])}
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
