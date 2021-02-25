import { css, ui } from '@wp-g2/styles';

export const FontSizeControl = css`
	appearance: none;
	border: none;
	margin: 0;
	padding: 0;
`;

export const SelectDropdownWrapper = css`
	width: calc(100% * 0.5 - (${ui.space(2)} * 2));
`;

export const NumberInputWrapper = css`
	width: calc(100% * 0.25 - (${ui.space(2)} * 2));
`;

export const ResetButtonWrapper = css`
	align-self: flex-end;
	min-width: calc(100% * 0.25);
`;

export const SliderWrapper = css`
	width: calc(100% * 0.75);
`;
