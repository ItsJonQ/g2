// import React from 'react';
// import { css, cx } from 'emotion';
// import {BaseModal} from '../BaseModal';
// import { connect } from '@wp-g2/provider';
// import { useTheme } from '../../css';
// import Card from '../Card';
// import ModalHeader from './Modal.Header';
// import ModalFooter from './Modal.Footer';
// import ModalTrigger from './Modal.Trigger';

// export { useModalContext } from './Modal.Context';

// const MODAL_SIZES = {
// 	lg: 720,
// 	md: 500,
// 	sm: 400,
// };

// function Modal({
// 	children,
// 	className,
// 	forwardedRef,
// 	label = 'Modal',
// 	transitionTimingFunction = 'ease-in-out',
// 	transitionDuration = 200,
// 	backdropTransitionDuration = 250,
// 	size = 'md',
// 	visible = false,
// 	renderTrigger = null,
// 	zIndex = 999,
// 	...props
// }) {
// 	const { breakpoint, space } = useTheme();
// 	const maxWidth = MODAL_SIZES[size] || MODAL_SIZES.md;

// 	const modalTransition = `
// 	opacity ${transitionDuration}ms ${transitionTimingFunction},
// 			transform ${transitionDuration}ms ${transitionTimingFunction}
// 	`;

// 	const baseStyles = css`
// 		left: 50%;
// 		width: 100%;
// 		opacity: 0;
// 		outline: none;
// 		perspective: 800px;
// 		position: relative;
// 		transform-origin: top center;
// 		transform: translate3d(-50%, ${space(5)}, 0);
// 		transition: ${modalTransition};
// 		max-width: 100%;
// 		top: ${space(4)};

// 		@media (min-height: 40em) {
// 			top: ${space(4)};
// 		}

// 		${breakpoint('md')`
// 			max-width: ${maxWidth}px;
// 			position: absolute;
// 			top: 16%;
// 		`}

// 		&[data-enter] {
// 			opacity: 1;
// 			transform: translate3d(-50%, 0, 0);

// 			&[data-underlayer] {
// 				transform: translate3d(-50%, -10px, 0) scale(0.95);
// 				transform-origin: top center;
// 			}
// 		}
// 	`;

// 	const classes = cx(baseStyles, className);

// 	const modalProps = {
// 		...props,
// 		transitionTimingFunction,
// 		transitionDuration,
// 		backdropTransitionDuration,
// 		renderTrigger,
// 		size,
// 		visible,
// 		zIndex,
// 	};

// 	return (
// 		<BaseModal
// 			as={Card}
// 			elevation={4}
// 			className={classes}
// 			ref={forwardedRef}
// 			{...modalProps}
// 		>
// 			{children}
// 		</BaseModal>
// 	);
// }

// const ConnectedComponent = connect(Modal);
// ConnectedComponent.Body = Card.Body;
// ConnectedComponent.Header = ModalHeader;
// ConnectedComponent.Footer = ModalFooter;
// ConnectedComponent.Trigger = ModalTrigger;

// export default ConnectedComponent;
