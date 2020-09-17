import { styled, ui } from '@wp-g2/styles';

export const ColorPickerView = styled.div`
	.sketch-picker {
		background: transparent !important;
		border: none !important;
		border-radius: 0px !important;
		box-shadow: none !important;
		box-sizing: border-box !important;
		color: ${ui.get('colorText')} !important;
		font-family: inherit;
		padding: 0 !important;
		user-select: none;

		* {
			box-sizing: border-box !important;
			color: ${ui.get('colorText')} !important;
			user-select: none;
		}

		> div:first-child {
			padding-bottom: 50% !important;
		}

		input {
			background: ${ui.get('controlBackgroundColor')} !important;
			border: 1px solid ${ui.get('controlBorderColor')} !important;
			border-radius: 3px !important;
			box-shadow: none !important;
			color: ${ui.get('colorText')} !important;
			font-size: ${ui.get('fontSize')} !important;
			line-height: 18px;
			padding: 5px 8px !important;
			user-select: initial;
			width: 100% !important;

			&:focus {
				border-color: ${ui.get('colorAdmin')} !important;
				outline: none !important;
			}
		}
	}
`;
