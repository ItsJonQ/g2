import { css } from '../style-system';

export const position = {
	bottom: css({ bottom: 0, position: 'absolute' }),
	full: css({ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }),
	left: css({ left: 0, position: 'absolute' }),
	relative: css({ position: 'relative' }),
	right: css({ position: 'absolute', right: 0 }),
	top: css({ position: 'absolute', top: 0 }),
};
