import { styled } from '@wp-g2/styled';

import { Collapsible } from '../Collapsible';

export const PanelView = styled(Collapsible)`
	& + & {
		border-top: 1px solid #eee;
	}
`;
