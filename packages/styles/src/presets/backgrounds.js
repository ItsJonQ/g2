import { get } from '../core';
import { getBackgroundColor } from '../mixins/backgrounds';
import { css } from '../style-system';

/**
 * @param {import('create-emotion').ObjectInterpolation<any>['background']} color
 */
export function background(color) {
	return css({ background: color });
}

background.black = background(get('black'));
background.white = background(get('white'));
background.admin = background(get('colorAdmin'));

background.blue = getBackgroundColor('blue');
background.darkGray = getBackgroundColor('darkGray');
background.green = getBackgroundColor('green');
background.lightGray = getBackgroundColor('lightGray');
background.orange = getBackgroundColor('orange');
background.purple = getBackgroundColor('purple');
background.red = getBackgroundColor('red');
background.yellow = getBackgroundColor('yellow');

background.control = background(get('controlBackgroundColor'));
background.surface = background(get('surfaceBackgroundColor'));
background.secondary = background(get('surfaceBackgroundSubtleColor'));
