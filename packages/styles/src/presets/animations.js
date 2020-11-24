import { get } from '../core';
import { css } from '../style-system';

const animationProps = {
	transitionDuration: get('transitionDuration'),
	transitionProperty: 'all',
	transitionTimingFunction: 'ease-in-out',
};

/**
 * @param {import('create-emotion').ObjectInterpolation<any>['transition']} transition
 * @return {string}
 */
export const animation = (transition) => {
	return css({ transition: transition });
};

animation.default = css({
	...animationProps,
	transitionTimingFunction: 'ease',
});

animation.bounce = css({
	...animationProps,
	transitionTimingFunction: 'cubic-bezier(.8, .5, .2, 1.4)',
});
animation.delay = (value) =>
	css({
		transitionDelay: `${value}s`,
	});
animation.duration = (value) =>
	css({
		transitionDuration: `${value}s`,
	});
animation.ease = css({
	...animationProps,
	transitionTimingFunction: 'ease',
});
animation.easeIn = css({
	...animationProps,
	transitionTimingFunction: 'ease-in',
});
animation.easeInOut = css({
	...animationProps,
	transitionTimingFunction: 'ease-in-out',
});
animation.easeOut = css({
	...animationProps,
	transitionTimingFunction: 'ease-out',
});
animation.easing = (value) =>
	css({
		...animationProps,
		transitionTimingFunction: value,
	});
animation.linear = css({
	...animationProps,
	transitionTimingFunction: 'linear',
});
