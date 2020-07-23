import { css, get } from '@wp-g2/styles';

export const Card = css`
	border-radius: 8px;
	box-shadow: 0 0 0 1px ${get('surfaceBorder')};
	outline: none;
`;

export const Header = css`
	border-bottom: 1px solid;
`;

export const Footer = css`
	border-top: 1px solid;
`;

export const Body = css`
	padding: 12px;
`;

export const InnerBody = css`
	margin-left: -12px;
	margin-right: -12px;
`;

export const headerFooter = css`
	border-color: ${get('colorDivider')};
	min-height: 48px;
	padding: 4px 12px;
`;

export const borderRadius = css`
	&:first-of-type {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	&:last-of-type {
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}
`;
