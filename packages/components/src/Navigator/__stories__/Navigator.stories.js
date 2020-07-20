import { styled } from '@wp-g2/styled';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { animated, useSpring } from 'react-spring';

import {
	BaseView,
	Flex,
	FlexBlock,
	FlexItem,
	Heading,
	Icon,
	Surface,
	Text,
} from '../../index';
import {
	Navigator,
	NavigatorBack,
	NavigatorLink,
	NavigatorScreen,
	NavigatorScreens,
	useNavigator,
	useQuery,
	withNavigator,
} from '../index';

export default {
	component: Navigator,
	title: 'Navigator',
};

const Screen = styled(Surface)`
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

const Home = () => (
	<Screen>
		<ul>
			<li>
				<NavigatorLink params={{ id: 'Acme' }} to="Organization">
					Acme
				</NavigatorLink>
			</li>
			<li>
				<NavigatorLink params={{ id: 'Hello' }} to="Organization">
					Hello
				</NavigatorLink>
			</li>
		</ul>
	</Screen>
);

const Organization = () => {
	const { location } = useNavigator();
	const { id } = location;

	return (
		<Screen>
			<ul>
				<li>
					<NavigatorLink params={{ id }} to="Manage">
						Manage
					</NavigatorLink>
				</li>
				<li>
					<NavigatorLink>Usage</NavigatorLink>
				</li>
				<li>
					<NavigatorLink>Members</NavigatorLink>
				</li>
			</ul>
		</Screen>
	);
};

const Manage = () => {
	return (
		<Screen>
			<Heading size={4}>Manage</Heading>
			<ul>
				<li>
					<NavigatorLink>Dashboard</NavigatorLink>
				</li>
				<li>
					<NavigatorLink>Data</NavigatorLink>
				</li>
				<li>
					<NavigatorLink>Settings</NavigatorLink>
				</li>
			</ul>
		</Screen>
	);
};

const Header = () => {
	const { location } = useNavigator();
	const { id } = location;
	const query = useQuery();
	const isHome = query.is('Home');
	const animatedProps = useSpring({
		opacity: isHome ? 0 : 1,
		xy: isHome ? [0, 0] : [70, 12],
	});

	return (
		<BaseView css={{ mb: 3, position: 'relative' }}>
			<animated.div
				style={{
					left: 8,
					opacity: animatedProps.opacity,
					position: 'absolute',
					top: 8,
				}}
			>
				<NavigatorBack size="small">
					<Icon icon={<FiArrowLeft />} />
				</NavigatorBack>
			</animated.div>

			{id && (
				<animated.div
					style={{
						left: 78,
						opacity: animatedProps.opacity,
						position: 'absolute',
						transform: animatedProps.opacity
							.interpolate({
								output: [0, 8],
								range: [0, 1],
							})
							.interpolate((y) => `translateY(${y}px)`),
					}}
				>
					<Text size={11} variant="muted">
						Organization
					</Text>
				</animated.div>
			)}

			<animated.div
				style={{
					maxWidth: '80%',
					padding: 8,
					transform: animatedProps.xy.interpolate(
						(x, y) => `translate(${x}px, ${y}px)`,
					),
				}}
			>
				<Heading size={2}>{id || 'Organizations'}</Heading>
			</animated.div>
		</BaseView>
	);
};

const NavigatorHeader = withNavigator(Header);

export const _default = () => {
	return (
		<Surface
			css={{
				border: '1px solid #ddd',
				height: 480,
				m: 'auto',
				width: 320,
			}}
		>
			<Navigator initialPath="Home">
				<Flex css={{ height: '100%' }} direction="column">
					<FlexItem css={{ width: '100%' }}>
						<NavigatorHeader />
					</FlexItem>
					<FlexBlock css={{ width: '100%' }}>
						<NavigatorScreens>
							<NavigatorScreen component={Home} path="Home" />
							<NavigatorScreen
								component={Organization}
								path="Organization"
							/>
							<NavigatorScreen component={Manage} path="Manage" />
						</NavigatorScreens>
					</FlexBlock>
					<FlexItem css={{ width: '100%' }}>
						<Flex>
							<NavigatorLink to="Home">Home</NavigatorLink>
						</Flex>
					</FlexItem>
				</Flex>
			</Navigator>
		</Surface>
	);
};
