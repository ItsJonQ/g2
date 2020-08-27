import { get, space, styled, ui } from '@wp-g2/styles';

export const DebuggerView = styled.div`
	${ui.zIndex('Debugger', 99)};
	background: rgba(0, 0, 0, 0.8);
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 3px;
	color: ${get('white')};
	display: inline-flex;
	font-family: ${get('fontFamilyMono')};
	font-size: ${get('fontSizeXSmall')};
	padding: 2px 4px;
	pointer-events: none;
	vertical-align: middle;
	white-space: nowrap;

	& + & {
		margin-left: ${space(0.5)};
	}
`;
