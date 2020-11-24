import { is } from '@wp-g2/utils';

import { css } from '../style-system';

/**
 * @param {{ height: import('create-emotion').ObjectInterpolation<any>['height'], width: import('create-emotion').ObjectInterpolation<any>['width'] }} options
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
	/** @type {import('create-emotion').ObjectInterpolation<any>['width']} */ width,
) => css({ maxWidth: '100%', width });
frame.height = (
	/** @type {import('create-emotion').ObjectInterpolation<any>['height']} */ height,
) => css({ height, maxHeight: '100%' });
