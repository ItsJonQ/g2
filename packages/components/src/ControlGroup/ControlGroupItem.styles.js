import { css, styled } from '@wp-g2/styled-components';

import { FlexItem } from '../Flex';

const controlGroupStyles = ({ isFirst, isOnly }) => {
	if (isFirst || isOnly) return '';
	return css`
		margin-left: -1px;
	`;
};
export const ControlGroupItemView = styled(FlexItem)`
	${controlGroupStyles};
`;
