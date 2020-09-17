import { css, styled, ui } from '@wp-g2/styles';

export const TabListView = styled.div`
	border-bottom: 1px solid ${ui.get('colorDivider')};
	display: flex;
	outline: none;
	position: relative;
`;

export const TabView = styled.button`
	align-items: center;
	appearance: none;
	background: transparent;
	border: none;
	color: ${ui.get('colorText')};
	cursor: pointer;
	flex: 1;
	justify-content: center;
	min-height: ${ui.get('controlHeightXLarge')};
	outline: none;
	padding: 4px;
	transition: color ${ui.get('transitionDuration')} linear;

	&[aria-selected='true'] {
		color: ${ui.get('colorAdmin')};
	}
`;

export const small = css`
	min-height: ${ui.get('controlHeightLarge')};
`;

export const xSmall = css`
	min-height: ${ui.get('controlHeight')};
`;

export const TabPanelView = styled.div`
	outline: none;
`;

export const TabIndicatorView = styled.div`
	background: ${ui.get('colorAdmin')};
	bottom: -1px;
	height: 2px;
	left: 0;
	position: absolute;
	transition: all ${ui.get('transitionDuration')} ease;
	z-index: 1;
`;
