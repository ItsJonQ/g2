import { css, styled } from '@wp-g2/styled-components';

import { Collapsible } from '../Collapsible';

const baseStyles = ({ theme }) => {
	const { isDark } = theme;

	return css`
		& + & {
			border-top: 1px solid rgba(0, 0, 0, 0.08);

			${isDark &&
			css`
				border-color: rgba(255, 255, 255, 0.08);
			`}
		}
	`;
};

export const PanelView = styled(Collapsible)`
	${baseStyles};
`;
