import { css, styled, ui } from '@wp-g2/styles';

export const Panel = css`
	& + & {
		border-top: 1px solid ${ui.get('colorDivider')};
	}
`;

export const PanelHeader = css`
	cursor: pointer;
	outline: none;
	padding: ${ui.space(3)};
	position: relative;

	&:focus {
		${ui.zIndex('ControlFocus')};
		box-shadow: 0 0 0 1px ${ui.get('colorAdmin')} inset;
	}
`;

export const seamless = css`
	padding-left: 0;
	padding-right: 0;
`;

export const PanelBodyView = styled.div`
	padding: 8px 12px 12px;
`;
