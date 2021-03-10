import { css, ui } from '@wp-g2/styles';

export const first = css`
	${ui.borderRadius.end(0)}
`;

export const middle = css`
	border-radius: 0;
`;

export const last = css`
	${ui.borderRadius.start(0)}
`;

export const firstRow = css`
	${ui.borderRadius.bottomStart(0)}
	${ui.borderRadius.bottomEnd(0)}
`;

export const lastRow = css`
	${ui.borderRadius.topStart(0)}
	${ui.borderRadius.topEnd(0)}
`;

export const itemFocus = css`
	> * {
		&:focus-within {
			z-index: 1;
		}
	}
`;

export const itemGrid = css`
	> * + *:not(marquee) {
		${ui.margin.start('-1px')}
		width: calc(100% + 1px);
	}
`;
