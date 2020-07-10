import { css, styled } from '@wp-g2/styled';

export const scrollableScrollbarStyles = ({ theme }) => {
	const { config, isDark } = theme;

	return css`
		&::-webkit-scrollbar {
			width: 12px;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar-track {
			background: rgba(0, 0, 0, 0.04);
			border-radius: 8px;
		}

		&::-webkit-scrollbar-thumb {
			background-clip: padding-box;
			background-color: rgba(0, 0, 0, 0.1);
			border: 2px solid rgba(0, 0, 0, 0);
			border-radius: 7px;
		}

		&:hover::-webkit-scrollbar-thumb {
			background-color: rgba(0, 0, 0, 0.4);
		}

		${isDark &&
		css`
			&::-webkit-scrollbar-track {
				background: rgba(255, 255, 255, 0.04);
			}

			&::-webkit-scrollbar-thumb {
				background-color: rgba(255, 255, 255, 0.2);
			}

			&:hover::-webkit-scrollbar-thumb {
				background-color: rgba(255, 255, 255, 0.5);
			}
		`}
	`;
};

export const ScrollableView = styled.div`
	height: 100%;
	overflow-y: auto;

	${scrollableScrollbarStyles};
`;

export const ContentView = styled.div`
	position: relative;
`;
