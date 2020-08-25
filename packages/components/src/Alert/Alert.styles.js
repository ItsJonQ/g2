import { css, get, getBackgroundColor, space, styled } from '@wp-g2/styles';

export const AlertView = styled.div`
	background: ${get('controlBackgroundColor')};
	border-radius: ${get('controlBorderRadius')};
	box-shadow: 0 0 0 1px ${get('surfaceBorderColor')} inset;
	padding: ${space(3)} ${space(4)};
	position: relative;
`;

export const CloseButtonWrapper = styled.div`
	margin-right: ${space(-1)};
	margin-top: ${space(-1)};
`;

export const contentWithDismiss = css`
	padding-top: ${space(1.25)};
`;

export const success = css`
	${getBackgroundColor('green')};
`;

export const warning = css`
	${getBackgroundColor('yellow')};
`;

export const critical = css`
	${getBackgroundColor('red')};
`;

export const info = css`
	${getBackgroundColor('blue')};
`;

export function getTextColor(status) {
	let color = 'colorText';

	switch (status) {
		case 'success':
			color = 'colorBackgroundGreenText';
			break;
		case 'warning':
			color = 'colorBackgroundYellowText';
			break;
		case 'critical':
			color = 'colorBackgroundRedText';
			break;
		case 'info':
			color = 'colorBackgroundBlueText';
			break;
		default:
			color = 'colorText';
			break;
	}

	return color ? get(color) : '';
}
