import { css, ui } from '@wp-g2/styles';

export const Card = css`
	border-radius: ${ui.get('cardBorderRadius')};
	box-shadow: 0 0 0 1px ${ui.get('surfaceBorderColor')};
	outline: none;
`;

export const Header = css`
	border-bottom: 1px solid;
`;

export const Body = css`
	padding: 12px;
`;

export const InnerBody = css`
	margin-left: -12px;
	margin-right: -12px;
`;

export const headerFooter = css`
	border-color: ${ui.get('colorDivider')};
	min-height: 44px;
	padding: 4px 12px;
`;

export const borderRadius = css`
	&:first-of-type {
		border-top-left-radius: ${ui.get('cardBorderRadius')};
		border-top-right-radius: ${ui.get('cardBorderRadius')};
	}

	&:last-of-type {
		border-bottom-left-radius: ${ui.get('cardBorderRadius')};
		border-bottom-right-radius: ${ui.get('cardBorderRadius')};
	}
`;

export const borderless = css`
	box-shadow: none;
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
