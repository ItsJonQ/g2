import { get } from '../core';
import { css } from '../style-system';

const animationProps = {
	transitionDuration: get('transitionDuration'),
	transitionProperty: 'all',
	transitionTimingFunction: 'ease-in-out',
};

export const animation = (transition) => {
	return css({ transition: transition });
};

animation.bounce = css({
	...animationProps,
	transitionTimingFunction: 'cubic-bezier(0.680,  0.580, 0.265, 2.500)',
});
animation.duration = (value) =>
	css({
		...animationProps,
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
