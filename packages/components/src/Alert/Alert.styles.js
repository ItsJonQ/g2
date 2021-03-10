import { css, styled, ui } from '@wp-g2/styles';

export const AlertView = styled.div`
	background: ${ui.get('controlBackgroundColor')};
	border-radius: ${ui.get('controlBorderRadius')};
	box-shadow: 0 0 0 1px ${ui.get('surfaceBorderColor')} inset;
	padding: ${ui.space(3)} ${ui.space(4)};
	position: relative;
`;

export const CloseButtonWrapper = styled.div`
	${ui.margin.end(ui.space(-1))}
	margin-top: ${ui.space(-1)};
`;

export const contentWithDismiss = css`
	padding-top: ${ui.space(1.25)};
`;

export const success = css`
	${ui.background.green};
`;

export const warning = css`
	${ui.background.yellow};
`;

export const critical = css`
	${ui.background.red};
`;

export const info = css`
	${ui.background.blue};
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

	return ui.get(color);
}
