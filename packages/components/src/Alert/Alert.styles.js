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

export const ContentWrapperView = styled.div`
	padding-top: ${space(1.25)};
`;

export const success = css`
	${getBackgroundColor('green', { isSubtle: true })};
`;

export const warning = css`
	${getBackgroundColor('yellow', { isSubtle: true })};
`;

export const critical = css`
	${getBackgroundColor('red', { isSubtle: true })};
`;

export const info = css`
	${getBackgroundColor('blue', { isSubtle: true })};
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
