import { css, styled, ui } from '@wp-g2/styles';

export const Panel = css`
	& + & {
		border-top: 1px solid ${ui.get('colorDivider')};
	}
`;

export const PanelHeader = css`
	outline: none;
	padding: ${ui.get('panelHeaderPadding')};
	position: relative;

	&:focus {
		${ui.zIndex('ControlFocus')};
		box-shadow: 0 0 0 1px ${ui.color.admin} inset;
	}
`;

export const collapsibleHeader = css`
	cursor: pointer;
`;

export const nonCollapsibleHeader = css`
	padding-bottom: 0;
	padding-top: ${ui.space(3)};
`;

export const borderless = css`
	& + & {
		border-top: none;
	}
`;

export const seamless = css`
	${ui.padding.x(0)}
`;

export const PanelBodyView = styled.div`
	padding: ${ui.get('panelBodyPadding')};
`;

export const nonCollapsibleBody = css`
	padding-bottom: ${ui.space(5)};
`;
