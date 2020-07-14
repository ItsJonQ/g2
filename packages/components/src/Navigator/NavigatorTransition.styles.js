import { css, styled } from '@wp-g2/styled';

const transitionStyles = ({ animationDuration, isForward }) => {
	const transform = isForward ? 'translate(100%, 0)' : 'translate(-100%, 0)';

	return css`
		> div {
			bottom: 0;
			left: 0;
			opacity: 1;
			position: absolute;
			right: 0;
			top: 0;
			transform: translate(0, 0);

			&.fade-enter {
				opacity: 0;
				transform: ${transform};
				z-index: 1;
			}
			&.fade-enter-active {
				opacity: 1;
				transform: translate(0, 0);
				transition: all ${animationDuration}ms;
				z-index: 1;
			}
			&.fade-exit {
				opacity: 1;
			}
			&.fade-exit-active {
				transition: all ${animationDuration}ms;
			}
		}
	`;
};

export const NavigatorTransitionWrapperView = styled.div`
	${transitionStyles};
`;
