import { motion, useSystemReducedMotion } from '@wp-g2/animations';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { createCoreElement, useReducedMotion } from '@wp-g2/styles';
import { is, memoize } from '@wp-g2/utils';
import React from 'react';

const createAnimated = function (tagName) {
	const motionComponent = motion[tagName];
	return createCoreElement(motionComponent);
};

const memoizedCreateAnimated = memoize(createAnimated);

function Animated(props, forwardedRef) {
	const {
		as = 'div',
		auto = false,
		children,
		...otherProps
	} = useContextSystem(props, 'Animated');
	const [isProviderReducedMotion] = useReducedMotion();
	const isSystemReducedMotion = useSystemReducedMotion();

	const isReducedMotion = isSystemReducedMotion || isProviderReducedMotion;

	const tagName = is.string(as) ? as : 'div';
	const Component = memoizedCreateAnimated(tagName);

	let baseProps = {
		initial: false,
	};

	if (auto) {
		baseProps = {
			animate: {
				opacity: 1,
				scale: 1,
				transition: props.transition || {
					duration: 0.2,
					ease: 'easeInOut',
				},
			},
			exit: {
				opacity: 0,
				scale: 0.9,
				transition: {
					duration: 0.2,
					ease: 'easeInOut',
				},
			},
			initial: { opacity: 0, scale: 0.9 },
		};
	}

	let finalProps = {
		...baseProps,
		...otherProps,
		ref: forwardedRef,
	};

	if (isReducedMotion) {
		finalProps = {
			...finalProps,
			layout: undefined,
			transition: { duration: 0 },
		};
	}

	return <Component {...finalProps}>{children}</Component>;
}

export default contextConnect(Animated, 'Animated');
