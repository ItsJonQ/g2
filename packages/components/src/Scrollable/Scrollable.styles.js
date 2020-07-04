import { styled } from '@g2/css';

export const ScrollableView = styled.div`
	height: 100%;
	overflow-y: auto;

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
`;

export const ContentView = styled.div`
	position: relative;
`;
