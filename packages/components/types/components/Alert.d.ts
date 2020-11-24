import * as React from 'react';
import { PolymorphicComponent } from './_shared';

export declare type AlertStatus =
	| 'default'
	| 'critical'
	| 'success'
	| 'info'
	| 'warning';

export declare type AlertProps = {
	/**
	 * Determines if the `Alert` is dismissable. If it is, a `CloseButton` will render.
	 *
	 * @default false
	 */
	isDismissable?: boolean;
	/**
	 * Callback when the `Alert` is dismissed.
	 */
	onDismiss?: () => void;
	/**
	 * The status of the `Alert`. Used to convey feedback to the user.
	 *
	 * @default 'default'
	 */
	status?: AlertStatus;
	/**
	 * Title message for the `Alert`.
	 */
	title?: string;
};

/**
 * `Alert` provides contextual feedback messages for typical user actions with the handful of available and flexible alert messages.
 *
 * @example
 * ```jsx
 * <Alert status="info">
 * 	<Text>Heads up!</Text>
 * </Alert>
 * ```
 */
export declare const Alert: PolymorphicComponent<'div', AlertProps>;

/**
 * `Alerts` is a container that manages the mounting/unmount animations for child `Alert` components.
 *
 * @example
 * ```jsx
 * <Alerts>
 * 	<Alert status="info">
 * 		<Text>Heads up!</Text>
 * 	</Alert>
 * 	<Alert status="success">
 * 		<Text>Amazing!</Text>
 * 	</Alert>
 * </Alerts>
 * ```
 */
export declare const Alerts: React.FC;
