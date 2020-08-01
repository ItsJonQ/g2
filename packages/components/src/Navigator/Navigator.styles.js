import { css, get, styled } from '@wp-g2/styles';

export const NavigatorView = styled.div`
	height: 100%;
	overflow: hidden;
	position: relative;
`;

export const forward = css`
	> div {
		&.fade-enter {
			transform: translate3d(100%, 0, 0);
		}
	}
`;

export const backward = css`
	> div {
		&.fade-enter {
			transform: translate3d(0, 0, 0);
		}
	}
`;

export const forwardExit = css`
	> div {
		&.fade-exit-active {
			transform: translate3d(0, 0, 0);
		}
	}
`;

export const backwardExit = css`
	> div {
		&.fade-exit-active {
			transform: translate3d(100%, 0, 0);
		}
	}
`;

export const forwardZIndex = css`
	> div {
		&.fade-exit {
			z-index: 0;
		}

		&.fade-exit-active {
			z-index: 0;
		}
	}
`;

export const backwardZIndex = css`
	> div {
		&.fade-exit {
			z-index: 2;
		}

		&.fade-exit-active {
			z-index: 2;
		}
	}
`;

export const NavigatorTransitionWrapperView = styled.div`
	> div {
		bottom: 0;
		left: 0;
		opacity: 1;
		position: absolute;
		right: 0;
		top: 0;
		transform: translate3d(0, 0, 0);
		will-change: transform;
		z-index: 0;

		&.fade-enter {
			opacity: 0;
			z-index: 1;
		}
		&.fade-enter-active {
			opacity: 1;
			transform: translate3d(0, 0, 0);
			transition: transform ${get('transitionDuration')},
				opacity ${get('transitionDuration')};
			z-index: 1;
		}
		&.fade-enter-done {
			z-index: 1;
		}
		&.fade-exit {
			opacity: 1;
		}
		&.fade-exit-active {
			opacity: 0;
			transition: transform ${get('transitionDuration')},
				opacity ${get('transitionDuration')};
		}
	}
`;
