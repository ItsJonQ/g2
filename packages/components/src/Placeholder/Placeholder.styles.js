import { css, styled } from '@wp-g2/styled-components';

const baseStyles = ({ theme }) => {
	const { config, isDark } = theme;

	return css`
		align-items: center;
		background: rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;

		${isDark &&
		css`
			background: rgba(255, 255, 255, 0.1);
		`}
	`;
};
export const PlaceholderView = styled.div`
	${baseStyles};
`;
