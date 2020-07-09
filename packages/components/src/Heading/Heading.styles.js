import { css, styled } from '@wp-g2/styled';

import { Text } from '../Text';

const baseStyles = ({ size, theme }) => {
	const { get, sx } = theme;

	return css`
		font-weight: 600;

		${sx({
			fontSize: get(`headingFontSizes.${size}`),
		})}
	`;
};

export const HeadingView = styled(Text)`
	${baseStyles};
`;
