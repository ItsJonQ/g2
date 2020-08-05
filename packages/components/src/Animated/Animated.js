import { motion, useReducedMotion } from '@wp-g2/animations';
import { connect } from '@wp-g2/context';
import { createSystemElement, css, getIsReducedMotion } from '@wp-g2/styles';
import { is, memoize, warning } from '@wp-g2/utils';
import React from 'react';

import { Debugger } from '../Debugger';

const createAnimated = function (tagName) {
	const motionComponent = motion[tagName];
	return createSystemElement(motionComponent);
};

const memoizedCreateAnimated = memoize(createAnimated);

function Animated({ as = 'div', auto = false, children, ...props }) {
	warning(
		!is.string(as),
		'@wp-g2/components',
		'Animated',
		'as prop must be a string.',
	);

	const isSystemReducedMotion = getIsReducedMotion();
	const shouldReduceMotion = useReducedMotion();
	const isReducedMotion = isSystemReducedMotion || shouldReduceMotion;

	const tagName = is.string(as) ? as : 'div';
	const Component = memoizedCreateAnimated(tagName);

	let baseProps = {
		initial: false,
	};

	if (auto) {
		baseProps = {
			animate: { height: 'auto', opacity: 1 },
			exit: {
				height: 0,
				opacity: 0,
			},
			initial: { height: 0, opacity: 0 },
			style: { overflow: 'hidden', willChange: 'height' },
		};
	}

	let finalProps = {
		...baseProps,
		...props,
	};

	if (isReducedMotion) {
		finalProps = {
			...finalProps,
			layout: undefined,
			transition: { duration: 0 },
		};
	}

	return (
		<Component {...finalProps}>
			<Debugger>
				<div>Reduce Motion: {isReducedMotion ? 'ON' : 'OFF'}</div>
			</Debugger>
			<Debugger>
				<div>Transition: {finalProps.transition?.duration}</div>
			</Debugger>
			{children}
		</Component>
	);
}

export default connect(Animated);
