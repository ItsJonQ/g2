import { get } from '../core';
import { css } from '../style-system';
import { getRtl } from './spacing';

const control = {
	default: () => css({ border: `1px solid ${get('controlBorderColor')}` }),
	focus: () =>
		css({
			border: `1px solid ${get('colorAdmin')}`,
			boxShadow: get('controlBoxShadowFocus'),
		}),
	subtle: () =>
		css({
			border: `1px solid ${get('controlBorderSubtleColor')}`,
		}),
};

export const border = {
	all: () => css({ border: `1px solid ${get('surfaceBorderColor')}` }),
	bottom: () =>
		css({ borderBottom: `1px solid ${get('surfaceBorderColor')}` }),
	control,
	start: (value = `1px solid ${get('surfaceBorderColor')}`) =>
		getRtl() ? css({ borderRight: value }) : css({ borderLeft: value }),
	end: (value = `1px solid ${get('surfaceBorderColor')}`) =>
		getRtl() ? css({ borderLeft: value }) : css({ borderRight: value }),
	top: () => css({ borderTop: `1px solid ${get('surfaceBorderColor')}` }),
};

/**
 *
 * @param {import('create-emotion').ObjectInterpolation<any>['borderRadius']} value
 */
export function borderRadius(value) {
	return css({ borderRadius: value });
}

borderRadius.none = () => borderRadius(0);
borderRadius.round = () => borderRadius(get('controlBorderRadius'));
borderRadius.circle = () => borderRadius(99999);
borderRadius.topStart = (/** @type {import('react').ReactText} */ value) =>
	getRtl()
		? css({ borderTopRightRadius: value })
		: css({ borderTopLeftRadius: value });
borderRadius.topEnd = (/** @type {import('react').ReactText} */ value) =>
	getRtl()
		? css({ borderTopLeftRadius: value })
		: css({ borderTopRightRadius: value });
borderRadius.bottomStart = (/** @type {import('react').ReactText} */ value) =>
	getRtl()
		? css({ borderBottomRightRadius: value })
		: css({ borderBottomLeftRadius: value });
borderRadius.bottomEnd = (/** @type {import('react').ReactText} */ value) =>
	getRtl()
		? css({ borderBottomLeftRadius: value })
		: css({ borderBottomRightRadius: value });
borderRadius.start = (/** @type {import('react').ReactText} */ value) =>
	getRtl()
		? css({ borderBottomRightRadius: value, borderTopRightRadius: value })
		: css({ borderBottomLeftRadius: value, borderTopLeftRadius: value });
borderRadius.end = (/** @type {import('react').ReactText} */ value) =>
	getRtl()
		? css({ borderBottomLeftRadius: value, borderTopLeftRadius: value })
		: css({ borderBottomRightRadius: value, borderTopRightRadius: value });
