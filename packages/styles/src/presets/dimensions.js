import { is } from '@wp-g2/utils';

import { css } from '../style-system';

/** @typedef {import('create-emotion').ObjectInterpolation} */

/**
 * @param {{ height: import('create-emotion').ObjectInterpolation['height'], width: import('create-emotion').ObjectInterpolation['width'] }} options
 */
export const frame = ({ height, width }) => {
	const styles = [];
	if (is.defined(width)) {
		styles.push([css({ maxWidth: '100%', width })]);
	}
	if (is.defined(height)) {
		styles.push([css({ height, maxHeight: '100%' })]);
	}

	return css(styles);
};

frame.width = (
	/** @type {import('create-emotion').ObjectInterpolation['width']} */ width,
) => css({ maxWidth: '100%', width });
frame.height = (
	/** @type {import('create-emotion').ObjectInterpolation['height']} */ height,
) => css({ height, maxHeight: '100%' });
