import { connect } from '@wp-g2/context';
import { css, cx, getBreakpoint, ui } from '@wp-g2/styles';
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
	children,
	className,
	forwardedRef,
	/* Deprecate in favour of `trigger`*/
	size = 'md',
	transitionDuration = 200,
	transitionTimingFunction = 'ease-in-out',
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
		top: ${ui.space(4)};
		transform: translate3d(-50%, ${ui.space(5)}, 0);
		transform-origin: top center;
		transition: ${modalTransition};
		width: 100%;

		@media (min-height: 40em) {
			top: ${ui.space(4)};
		}

		${getBreakpoint('md')`
			max-width: ${ui.value.px(maxWidth)};
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
		size,
		transitionDuration,
		transitionTimingFunction,
	};

	return (
		<BaseModal className={classes} ref={forwardedRef} {...modalProps}>
			<Card elevation={4}>{children}</Card>
		</BaseModal>
	);
}

export default connect(Modal, 'Modal');
