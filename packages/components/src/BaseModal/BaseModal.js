import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, getZIndex, reducedMotion, space } from '@wp-g2/styles';
import React from 'react';
import { Dialog, DialogBackdrop, useDialogState } from 'reakit';

import { Portal } from '../Portal';
import { View } from '../View';
import { ModalContext, useModalState } from './BaseModal.Context';

function BaseModal(props, forwardedRef) {
	const {
		backdropTransitionDuration = 250,
		children,
		className,
		label = __('Modal'),
		/* Deprecate in favour of `trigger`*/
		renderTrigger = null,
		state,
		transitionTimingFunction = 'ease-in-out',
		trigger = null,
		visible = false,
		zIndex,
		...otherProps
	} = useContextSystem(props, 'BaseModal');

	const _dialog = useDialogState({ animated: true, visible });
	const dialog = state || _dialog;

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
		z-index: ${zIndex || getZIndex('Modal')};

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
		...otherProps,
		...dialog,
	};

	if (isUnderLayer) {
		dialogProps['data-underlayer'] = '';
	}

	const triggerProp = trigger || renderTrigger;

	return (
		<ModalContext.Provider value={contextProps}>
			{typeof triggerProp === 'function'
				? triggerProp(dialog)
				: triggerProp
				? triggerProp
				: null}
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
							{(dialog.visible || dialog.animating) && children}
						</Dialog>
					</View>
				</DialogBackdrop>
			</Portal>
		</ModalContext.Provider>
	);
}

export default contextConnect(BaseModal, 'BaseModal');
