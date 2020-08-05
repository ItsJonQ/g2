import { get, space, styled } from '@wp-g2/styles';

export const DebuggerView = styled.div`
	background: rgba(0, 0, 0, 0.8);
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 2px;
	color: ${get('white')};
	display: inline-flex;
	font-family: ${get('fontFamilyMono')};
	font-size: ${get('fontSizeXSmall')};
	padding: 2px;
	pointer-events: none;
	vertical-align: middle;
	z-index: 99;

	& + & {
		margin-left: ${space(0.5)};
	}
`;
