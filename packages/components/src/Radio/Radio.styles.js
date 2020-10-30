import { css, styled, ui } from '@wp-g2/styles';

import * as checkboxStyles from '../Checkbox/Checkbox.styles';

export const RadioWrapperView = styled.div`
	${checkboxStyles.CheckboxWrapper};
`;

export const Radio = css`
	${checkboxStyles.Checkbox};
	${ui.borderRadius.circle};

	box-shadow: ${ui.get('radioBoxShadow')};
	height: ${ui.get('radioSize')};
	min-height: ${ui.get('radioSize')};
	min-width: ${ui.get('radioSize')};
	width: ${ui.get('radioSize')};

	&:checked {
		${ui.border.control.focus};

		background: transparent;
	}
`;

export const RadioIconView = styled.div`
	${checkboxStyles.CheckboxIcon};
`;

export const RadioDotView = styled.div`
	${ui.background.admin};
	${ui.borderRadius.circle};
	height: ${ui.get('radioDotSize')};
	width: ${ui.get('radioDotSize')};
`;
