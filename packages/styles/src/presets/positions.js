import { css } from '../style-system';
import { getRtl } from './spacing';

export const position = {
	absolute: () => css({ position: 'absolute' }),
	fixed: () => css({ position: 'fixed' }),
	bottom: () => css({ bottom: 0, position: 'absolute' }),
	bottomStart: () => {
		const start = getRtl() ? 'right' : 'left';
		return css({ bottom: 0, [start]: 0, position: 'absolute' });
	},
	bottomEnd: () => {
		const end = getRtl() ? 'left' : 'right';
		return css({ bottom: 0, position: 'absolute', [end]: 0 });
	},
	full: () =>
		css({ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }),
	start: () => {
		const start = getRtl() ? 'right' : 'left';
		return css({ [start]: 0, position: 'absolute' });
	},
	relative: () => css({ position: 'relative' }),
	end: () => {
		const end = getRtl() ? 'left' : 'right';
		return css({ position: 'absolute', [end]: 0 });
	},
	sticky: () => css({ position: 'sticky', top: 0 }),
	top: () => css({ position: 'absolute', top: 0 }),
	topStart: () => {
		const start = getRtl() ? 'right' : 'left';
		return css({ [start]: 0, position: 'absolute', top: 0 });
	},
	topEnd: () => {
		const end = getRtl() ? 'left' : 'right';
		return css({ position: 'absolute', [end]: 0, top: 0 });
	},
};
