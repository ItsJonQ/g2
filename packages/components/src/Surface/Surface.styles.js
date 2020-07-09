import { css, styled, useTheme } from '@wp-g2/css';

const surfaceStyles = ({ theme }) => {
	const { config } = theme;
	const { isDark } = config;

	return css`
		background-color: ${config.cardBackgroundColor};
		color: ${config.colorText};
		position: relative;

		${isDark &&
		css`
			background-color: ${config.cardBackgroundColorDark};
			color: ${config.colorTextDark};
		`}
	`;
};

export function useSurfaceStyles() {
	const theme = useTheme();

	return surfaceStyles({ theme });
}

export const SurfaceView = styled.div`
	${surfaceStyles};
`;
