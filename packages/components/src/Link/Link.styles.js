import { css, ui } from '@wp-g2/styles';

export const BaseLink = css`
	text-decoration: none;
`;

export const Link = css`
	color: ${ui.get('linkColor')};

	&:hover {
		color: ${ui.get('linkColorHover')};
	}
`;
