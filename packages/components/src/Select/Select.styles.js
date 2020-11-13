import { css, styled, ui } from '@wp-g2/styles';

import { FlexItem } from '../Flex';

export const ARROW_WRAPPER_WIDTH = 24;

export const base = css`
	padding: 0;
`;

export const select = css`
	padding-left: 8px;
	padding-right: 30px;
`;

export const ArrowWrapperView = styled(FlexItem)`
	align-items: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	padding: 0 5px;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
`;

export const placeholder = css`
	color: ${ui.get('colorTextMuted')};
`;

export const arrowPadding = css`
	padding-right: ${ui.value.px(ARROW_WRAPPER_WIDTH)};
`;

export const Suffix = css`
	pointer-events: none;
	position: absolute;
	right: 0;
`;
