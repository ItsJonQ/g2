import { connect } from '@wp-g2/context';
import React from 'react';

import { Animated } from '../Animated';
import { Route } from './Router';

function NavigatorScreen({
	animationEnterDelay = 0,
	animationExitDelay = 0,
	children,
	component,
	path,
	render,
	...props
}) {
	return (
		<Route
			{...props}
			path={path}
			render={(routeProps) => {
				const { history } = routeProps;
				const isBack =
					history?.action === 'POP' ||
					history?.location?.state?.isBack;

				const content = children
					? typeof children === 'function'
						? children(routeProps)
						: children
					: component
					? React.createElement(component, routeProps)
					: render
					? render(routeProps)
					: null;

				const animate = {
					opacity: 1,
					transition: {
						delay: animationEnterDelay,
						duration: 0.16,
						ease: 'easeInOut',
					},
					x: 0,
				};
				const initial = {
					opacity: 0,
					x: isBack ? -50 : 50,
				};
				const exit = {
					delay: animationExitDelay,
					opacity: 0,
					x: isBack ? 50 : -50,
					transition: { duration: 0.16, ease: 'easeInOut' },
				};

				const animatedProps = {
					animate,
					exit,
					initial,
				};

				return (
					<Animated {...animatedProps} key={path}>
						{content}
					</Animated>
				);
			}}
		/>
	);
}

export default connect(NavigatorScreen, 'NavigatorScreen');
