import { get, styled } from '@wp-g2/styles';

export const TabListView = styled.div`
	border-bottom: 1px solid ${get('colorDivider')};
	display: flex;
	outline: none;
	position: relative;
`;

export const TabView = styled.button`
	align-items: center;
	appearance: none;
	background: transparent;
	border: none;
	color: ${get('colorText')};
	cursor: pointer;
	flex: 1;
	justify-content: center;
	min-height: ${get('controlHeightXLarge')};
	outline: none;
	padding: 4px;
	transition: color 160ms linear;

	&[aria-selected='true'] {
		color: ${get('colorAdmin')};
	}
`;

export const TabPanelView = styled.div`
	outline: none;
`;

export const TabIndicatorView = styled.div`
	background: ${get('colorAdmin')};
	bottom: -1px;
	height: 2px;
	left: 0;
	position: absolute;
	transition: all 140ms ease;
	z-index: 1;
`;
