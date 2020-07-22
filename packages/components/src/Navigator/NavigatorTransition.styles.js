import { css, styled } from '@wp-g2/styled-components';

const transitionStyles = ({ animationDuration, isForward }) => {
	const transform = isForward
		? 'translate3d(100%, 0, 0)'
		: 'translate3d(0, 0, 0)';

	const exitTransform = !isForward
		? 'translate3d(100%, 0, 0)'
		: 'translate3d(0, 0, 0)';
	const exitZIndex = !isForward ? 2 : 0;

	return css`
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
				transform: ${transform};
				z-index: 1;
			}
			&.fade-enter-active {
				opacity: 1;
				transform: translate3d(0, 0, 0);
				transition: transform ${animationDuration}ms,
					opacity ${animationDuration}ms;
				z-index: 1;
			}
			&.fade-enter-done {
				z-index: 1;
			}
			&.fade-exit {
				opacity: 1;
				z-index: ${exitZIndex};
			}
			&.fade-exit-active {
				opacity: 0;
				transform: ${exitTransform};
				transition: transform ${animationDuration}ms,
					opacity ${animationDuration}ms;
				z-index: ${exitZIndex};
			}
		}
	`;
};

export const NavigatorTransitionWrapperView = styled.div`
	${transitionStyles};
`;
