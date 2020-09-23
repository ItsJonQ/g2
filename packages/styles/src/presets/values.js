import { getClampValue } from '../mixins';
import { space } from '../mixins/space';
import { toPx } from '../mixins/units';

export const value = {};

value.clamp = getClampValue;
value.space = space;
value.px = toPx;
