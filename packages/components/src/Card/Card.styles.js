import { css, get } from '@wp-g2/styles';

export const Card = css`
	border-radius: ${get('cardBorderRadius')};
	box-shadow: 0 0 0 1px ${get('surfaceBorderColor')};
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
	min-height: 44px;
	padding: 4px 12px;
`;

export const borderRadius = css`
	&:first-of-type {
		border-top-left-radius: ${get('cardBorderRadius')};
		border-top-right-radius: ${get('cardBorderRadius')};
	}

	&:last-of-type {
		border-bottom-left-radius: ${get('cardBorderRadius')};
		border-bottom-right-radius: ${get('cardBorderRadius')};
	}
`;

export const popoverBody = css`
	max-height: 80vh;
`;

export const small = css`
	min-height: 30px;
`;

export const xSmall = css`
	min-height: 24px;
`;
