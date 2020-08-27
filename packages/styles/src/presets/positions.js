import { css } from '../style-system';

export const position = {
	absolute: css({ position: 'absolute' }),
	fixed: css({ position: 'fixed' }),
	bottom: css({ bottom: 0, position: 'absolute' }),
	bottomLeft: css({ bottom: 0, left: 0, position: 'absolute' }),
	bottomRight: css({ bottom: 0, position: 'absolute', right: 0 }),
	full: css({ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }),
	left: css({ left: 0, position: 'absolute' }),
	relative: css({ position: 'relative' }),
	right: css({ position: 'absolute', right: 0 }),
	sticky: css({ position: 'sticky', top: 0 }),
	top: css({ position: 'absolute', top: 0 }),
	topLeft: css({ left: 0, position: 'absolute', top: 0 }),
	topRight: css({ position: 'absolute', right: 0, top: 0 }),
};
