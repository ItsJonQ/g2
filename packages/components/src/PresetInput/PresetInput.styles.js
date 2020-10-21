import { css, ui } from '@wp-g2/styles';

export const PresetInputTypeAhead = css`
	left: -2px;
	opacity: 0.4;
	pointer-events: none;
	position: absolute;
	top: 4px;
	user-select: none;
`;

export const PresetInputSelect = css`
	align-items: center;
	box-shadow: 1px 0 0 ${ui.get('surfaceBorderColor')} inset;
	display: flex;
	height: 20px;
	justify-content: center;
	margin: 0 -9px 0 -5px;
	position: relative;
	width: 26px;
`;

export const PresetInputSelectButton = css`
	min-width: auto !important;
	padding-left: 4px;
	padding-right: 4px;
	pointer-events: none;
	position: relative;
	z-index: 0;
`;

export const PresetInputSelectElement = css`
	cursor: pointer;
	height: 100%;
	opacity: 0;
	position: absolute;
	width: 100%;
	z-index: 0;
`;
