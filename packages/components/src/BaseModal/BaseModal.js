import { Dialog, DialogBackdrop, useDialogState } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { css, cx, reducedMotion, space } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React from 'react';

import { Portal } from '../Portal';
import { View } from '../View';
import { ModalContext, useModalState } from './BaseModal.Context';

function BaseModal({
	backdropTransitionDuration = 250,
	children,
	className,
	dialog: dialogProp,
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
	const _dialog = useDialogState({ animated: true, visible });
	let dialog = _dialog;

	if (dialogProp) {
		dialog = dialogProp;
		dialog.setAnimated(true);
	}

	const { isUnderLayer } = useModalState(dialog);

	const backdropTransition = `opacity ${backdropTransitionDuration}ms
    ${transitionTimingFunction}`;

	const backdropStyles = css`
		background: rgba(0, 0, 0, 0.5);
		bottom: 0;
		left: 0;
		opacity: 0;
		overflow-y: auto;
		padding: ${space(4)};
		perspective: 800px;
		position: fixed;
		right: 0;
		top: 0;
		transition: ${backdropTransition};
		z-index: ${zIndex};

		&[data-enter] {
			opacity: 1;
		}

		${reducedMotion(`
			&[data-leave] {
				display: none;
			}
		`)};
	`;

	const dialogWrapperStyles = css`
		bottom: ${space(4)};
		left: ${space(4)};
		position: absolute;
		right: ${space(4)};
		top: ${space(4)};
	`;

	const contextProps = {
		dialog,
	};

	const dialogProps = {
		...props,
		...dialog,
	};

	if (isUnderLayer) {
		dialogProps['data-underlayer'] = '';
	}

	return (
		<ModalContext.Provider value={contextProps}>
			{is.function(renderTrigger) ? renderTrigger(dialog) : renderTrigger}
			<Portal>
				<DialogBackdrop {...dialog} className={cx(backdropStyles)}>
					<View className={dialogWrapperStyles}>
						<Dialog
							aria-label={label}
							className={className}
							ref={forwardedRef}
							tabIndex={0}
							{...dialog}
							{...dialogProps}
						>
							{children}
						</Dialog>
					</View>
				</DialogBackdrop>
			</Portal>
		</ModalContext.Provider>
	);
}

export default connect(BaseModal, 'BaseModal');
