import { css } from '../style-system';

/**
 * @param {{ height: import('create-emotion').ObjectInterpolation<any>['height'], width: import('create-emotion').ObjectInterpolation<any>['width'] }} options
 * @return {string}
 */
export const frame = ({ height, width }) => {
	return css([
		[css({ maxWidth: '100%', width })],
		[css({ height, maxHeight: '100%' })],
	]);
};

frame.width = (
	/** @type {import('create-emotion').ObjectInterpolation<any>['width']} */ width,
) => css({ maxWidth: '100%', width });
frame.height = (
	/** @type {import('create-emotion').ObjectInterpolation<any>['height']} */ height,
) => css({ height, maxHeight: '100%' });
