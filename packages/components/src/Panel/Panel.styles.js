import { css, styled, ui } from '@wp-g2/styles';

export const Panel = css`
	& + & {
		border-top: 1px solid ${ui.get('colorDivider')};
	}
`;

export const PanelHeader = css`
	cursor: pointer;
	outline: none;
	padding: ${ui.get('panelHeaderPadding')};
	position: relative;

	&:focus {
		${ui.zIndex('ControlFocus')};
		box-shadow: 0 0 0 1px ${ui.color.admin} inset;
	}
`;

export const borderless = css`
	& + & {
		border-top: none;
	}
`;

export const seamless = css`
	padding-left: 0;
	padding-right: 0;
`;

export const PanelBodyView = styled.div`
	padding: ${ui.get('panelBodyPadding')};
`;
