import * as React from 'react';
import { ConnectedProps } from './_shared';

export declare type PortalProps = {
	/**
	 * Components to portal render at the document.body scope.
	 */
	children?: any;
};

/**
 * `Portal` is an abstract wrapper component that uses React Portals underneath.
 * It can be used to put anything in a portal and supports nested portals.
 *
 * @see https://reakit.io/docs/portal/
 */
export declare const Portal: React.FC<PortalProps>;
