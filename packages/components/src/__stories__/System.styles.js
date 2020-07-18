import { css, system } from '@wp-g2/system';

const { get } = system;

/**
 * Writing and exporting style snippets in this fashion provides a similar
 * workflow to CSS Modules.
 */

export const Button = css`
	background: ${get('colorBrand')};
	border-radius: ${get('buttonBorderRadius')};
	color: ${get('colorBrandText')};
	display: inline-flex;
	font-weight: 400;
	justify-content: center;
	padding: ${get('buttonPadding')};
	user-select: none;
`;

export const Large = css`
	font-size: 22px;
`;

export const Content = css`
	padding: 20px;
`;
