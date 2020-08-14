import { get } from '../core';
import { getBackgroundColor } from '../mixins/backgrounds';
import { css } from '../style-system';

export function background(color) {
	return css({ background: color });
}

background.black = background(get('black'));
background.white = background(get('white'));
background.admin = background(get('admin'));

background.purple = getBackgroundColor('purple');
background.green = getBackgroundColor('green');
background.red = getBackgroundColor('red');
background.yellow = getBackgroundColor('yellow');
background.orange = getBackgroundColor('orange');
background.darkGray = getBackgroundColor('darkGray');
background.lightGray = getBackgroundColor('lightGray');
