import { styled, ui } from '@wp-g2/styles';

export const DebuggerView = styled.div`
	${ui.zIndex('Debugger', 99)};
	background: rgba(0, 0, 0, 0.8);
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 3px;
	color: ${ui.color.white};
	display: inline-flex;
	font-family: ${ui.get('fontFamilyMono')};
	font-size: ${ui.get('fontSizeXSmall')};
	padding: 2px 4px;
	pointer-events: none;
	vertical-align: middle;
	white-space: nowrap;

	& + & {
		${ui.margin.start(ui.space(0.5))}
	}
`;
