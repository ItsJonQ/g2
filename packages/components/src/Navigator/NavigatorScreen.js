import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Animated } from '../Animated';
import { Route } from './Router';

function NavigatorScreen(props, forwardedRef) {
	const {
		animationEnterDelay = 0,
		animationEnterDuration = 0.14,
		animationExitDelay = 0,
		animationExitDuration = 0.14,
		children,
		component,
		path,
		render,
		...otherProps
	} = useContextSystem(props, 'NavigatorScreen');
	return (
		<Route
			{...otherProps}
			path={path}
			ref={forwardedRef}
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
						duration: animationEnterDuration,
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
					transition: {
						duration: animationExitDuration,
						ease: 'easeInOut',
					},
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

export default contextConnect(NavigatorScreen, 'NavigatorScreen');
