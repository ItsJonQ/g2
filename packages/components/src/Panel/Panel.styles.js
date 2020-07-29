import { css, styled } from '@wp-g2/styled-components';
import { get } from '@wp-g2/styles';

import { Collapsible } from '../Collapsible';

const baseStyles = () => {
	return css`
		& + & {
			border-top: 1px solid ${get('colorDivider')};
		}
	`;
};

export const PanelView = styled(Collapsible)`
	${baseStyles};
`;
