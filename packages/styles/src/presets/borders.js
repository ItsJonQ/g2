import { get } from '../core';
import { css } from '../style-system';

const control = {
	default: css({ border: `1px solid ${get('controlBorderColor')}` }),
	focus: css({
		border: `1px solid ${get('colorAdmin')}`,
		boxShadow: get('controlBoxShadowFocus'),
	}),
	subtle: css({
		border: `1px solid ${get('controlBorderSubtleColor')}`,
	}),
};

export const border = {
	all: css({ border: `1px solid ${get('surfaceBorderColor')}` }),
	bottom: css({ borderBottom: `1px solid ${get('surfaceBorderColor')}` }),
	control,
	left: css({ borderLeft: `1px solid ${get('surfaceBorderColor')}` }),
	right: css({ borderRight: `1px solid ${get('surfaceBorderColor')}` }),
	top: css({ borderTop: `1px solid ${get('surfaceBorderColor')}` }),
};

/**
 *
 * @param {import('create-emotion').ObjectInterpolation<any>['borderRadius']} value
 */
export function borderRadius(value) {
	return css({ borderRadius: value });
}

borderRadius.none = borderRadius(0);
borderRadius.round = borderRadius(get('controlBorderRadius'));
borderRadius.circle = borderRadius(99999);
