import { get } from '../core';
import { css } from '../style-system';

export const border = {
	all: css({ border: `1px solid ${get('surfaceBorderColor')}` }),
	bottom: css({ borderBottom: `1px solid ${get('surfaceBorderColor')}` }),
	left: css({ borderLeft: `1px solid ${get('surfaceBorderColor')}` }),
	right: css({ borderRight: `1px solid ${get('surfaceBorderColor')}` }),
	top: css({ borderTop: `1px solid ${get('surfaceBorderColor')}` }),
};

export function borderRadius(value) {
	return css({ borderRadius: value });
}

borderRadius.none = borderRadius(0);
borderRadius.round = borderRadius(get('controlBorderRadius'));
borderRadius.circle = borderRadius(99999);
