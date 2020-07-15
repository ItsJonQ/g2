import { styled } from '@wp-g2/styled';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { Surface } from '../../index';
import {
	Navigator,
	NavigatorBack,
	NavigatorLink,
	NavigatorScreen,
} from '../index';

export default {
	component: Navigator,
	title: 'Navigator',
};

const Screen = styled(Surface)`
	bottom: 0;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

const Home = () => (
	<Screen>
		<h1>WooCommerce</h1>
		<ul>
			<li>
				<NavigatorLink to="Home">Home</NavigatorLink>
			</li>
			<li>
				<NavigatorLink to="Analytics">Analytics</NavigatorLink>
			</li>
			<li>
				<NavigatorLink to="Orders">Orders</NavigatorLink>
			</li>
			<li>
				<NavigatorLink to="Marketing">Marketing</NavigatorLink>
			</li>
		</ul>
	</Screen>
);

const Analytics = () => (
	<Screen>
		<h1>Analytics</h1>
		<NavigatorBack>Back</NavigatorBack>
		<ul>
			<li>
				<NavigatorLink to="Analytics">Real Time</NavigatorLink>
			</li>
			<li>
				<NavigatorLink>Trends</NavigatorLink>
			</li>
		</ul>
	</Screen>
);

const Orders = () => (
	<Screen>
		<h1>Orders</h1>
		<NavigatorBack>Back</NavigatorBack>
		<ul>
			<li>
				<NavigatorLink>All Orders</NavigatorLink>
			</li>
			<li>
				<NavigatorLink>Payouts</NavigatorLink>
			</li>
			<li>
				<NavigatorLink>Transctions</NavigatorLink>
			</li>
		</ul>
	</Screen>
);

export const _default = () => {
	return (
		<MemoryRouter>
			<Route
				path="/"
				render={() => (
					<Surface
						sx={{
							border: '1px solid #ddd',
							height: 480,
							width: 320,
						}}
					>
						<Navigator initialPath="Home">
							<NavigatorScreen component={Home} path="Home" />
							<NavigatorScreen component={Orders} path="Orders" />
							<NavigatorScreen
								component={Analytics}
								path="Analytics"
							/>
						</Navigator>
					</Surface>
				)}
			></Route>
		</MemoryRouter>
	);
};
