import { css, get } from '@wp-g2/styles';

export const scrollableScrollbar = css`
	&::-webkit-scrollbar {
		height: 12px;
		width: 12px;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-track {
		background: ${get('colorScrollbarTrack')};
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-clip: padding-box;
		background-color: ${get('colorScrollbarThumb')};
		border: 2px solid rgba(0, 0, 0, 0);
		border-radius: 7px;
	}

	&:hover::-webkit-scrollbar-thumb {
		background-color: ${get('colorScrollbarThumbHover')};
	}
`;

export const Scrollable = css`
	height: 100%;
	overflow-y: auto;
`;

export const Content = css`
	position: relative;
`;

export const smoothScroll = css`
	scroll-behavior: smooth;
`;
