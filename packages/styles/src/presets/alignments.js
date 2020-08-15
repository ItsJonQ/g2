import { css } from '../style-system';

const content = {
	bottom: css({
		alignItems: 'flex-end',
		display: 'flex',
		justifyContent: 'center',
	}),
	center: css({
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	}),
	left: css({
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'flex-start',
	}),
	right: css({
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'flex-end',
	}),
	top: css({
		alignItems: 'flex-start',
		display: 'flex',
		justifyContent: 'center',
	}),
};

export const alignment = {
	center: css({ margin: 'auto' }),
	content,
	left: css({ marginRight: 'auto' }),
	right: css({ marginLeft: 'auto' }),
};
