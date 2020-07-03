import { styled } from '@g2/css';

import { Collapsible } from '../Collapsible';

export const PanelView = styled(Collapsible)`
	& + & {
		border-top: 1px solid #eee;
	}
`;
