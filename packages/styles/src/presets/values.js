import { getClampValue } from '../mixins';
import { space } from '../mixins/space';
import { toPx } from '../mixins/units';
import { color } from './colors';

/** @type {{ clamp: typeof getClampValue, color: typeof color, space: typeof space, px: typeof toPx; }} */
export const value = {};

value.clamp = getClampValue;
value.color = color;
value.space = space;
value.px = toPx;
