import { get, styled } from '@wp-g2/styles';

export const ColorPickerView = styled.div`
	.sketch-picker {
		background: transparent !important;
		border: none !important;
		border-radius: 0px !important;
		box-shadow: none !important;
		box-sizing: border-box !important;
		color: ${get('colorText')} !important;
		font-family: inherit;
		padding: 0 !important;
		user-select: none;

		* {
			box-sizing: border-box !important;
			color: ${get('colorText')} !important;
			user-select: none;
		}

		input {
			background: ${get('controlBackgroundColor')} !important;
			border: 1px solid ${get('controlBorderColor')} !important;
			border-radius: 3px !important;
			box-shadow: none !important;
			color: ${get('colorText')} !important;
			font-size: ${get('fontSize')} !important;
			line-height: 18px;
			padding: 5px 8px !important;
			user-select: initial;
			width: 100% !important;

			&:focus {
				border-color: ${get('colorAdmin')} !important;
				outline: none !important;
			}
		}
	}
`;
