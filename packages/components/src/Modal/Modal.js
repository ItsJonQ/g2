import { connect } from '@wp-g2/provider';
import { breakpoint, css, cx, space, toPx } from '@wp-g2/styles';
import React from 'react';

import { BaseModal } from '../BaseModal';
import { Card } from '../Card';

export { useModalContext } from './Modal.Context';

const MODAL_SIZES = {
	lg: 720,
	md: 500,
	sm: 400,
};

function Modal({
	backdropTransitionDuration = 250,
	children,
	className,
	forwardedRef,
	label = 'Modal',
	renderTrigger = null,
	size = 'md',
	transitionDuration = 200,
	transitionTimingFunction = 'ease-in-out',
	visible = false,
	zIndex = 999,
	...props
}) {
	const maxWidth = MODAL_SIZES[size] || MODAL_SIZES.md;

	const modalTransition = `
	opacity ${transitionDuration}ms ${transitionTimingFunction},
			transform ${transitionDuration}ms ${transitionTimingFunction}
	`;

	const baseStyles = css`
		left: 50%;
		max-width: 100%;
		opacity: 0;
		outline: none;
		perspective: 800px;
		position: relative;
		top: ${space(4)};
		transform: translate3d(-50%, ${space(5)}, 0);
		transform-origin: top center;
		transition: ${modalTransition};
		width: 100%;

		@media (min-height: 40em) {
			top: ${space(4)};
		}

		${breakpoint('md')`
			max-width: ${toPx(maxWidth)};
			position: absolute;
			top: 16%;
		`}

		&[data-enter] {
			opacity: 1;
			transform: translate3d(-50%, 0, 0);

			&[data-underlayer] {
				transform: translate3d(-50%, -10px, 0) scale(0.95);
				transform-origin: top center;
			}
		}
	`;

	const classes = cx(baseStyles, className);

	const modalProps = {
		...props,
		backdropTransitionDuration,
		renderTrigger,
		size,
		transitionDuration,
		transitionTimingFunction,
		visible,
		zIndex,
	};

	return (
		<BaseModal
			as={Card}
			className={classes}
			elevation={4}
			ref={forwardedRef}
			{...modalProps}
		>
			{children}
		</BaseModal>
	);
}

export default connect(Modal);
