import { motion, useReducedMotion } from '@wp-g2/animations';
import { connect } from '@wp-g2/context';
import { createSystemElement, getIsReducedMotion } from '@wp-g2/styles';
import { is, memoize, warning } from '@wp-g2/utils';
import React from 'react';

const createAnimatedView = function (tagName) {
	const motionComponent = motion[tagName];
	return createSystemElement(motionComponent);
};

const memoizedCreateAnimatedView = memoize(createAnimatedView);

function AnimatedView({ as = 'div', auto = false, ...props }) {
	warning(
		!is.string(as),
		'@wp-g2/components',
		'AnimatedView',
		'as prop must be a string.',
	);

	const isSystemReducedMotion = getIsReducedMotion();
	const shouldReduceMotion = useReducedMotion();
	const isReducedMotion = isSystemReducedMotion || shouldReduceMotion;

	const tagName = is.string(as) ? as : 'div';
	const Component = memoizedCreateAnimatedView(tagName);

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

	return <Component {...finalProps} />;
}

export default connect(AnimatedView);
