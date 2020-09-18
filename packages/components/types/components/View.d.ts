import * as React from 'react';
import { ConnectedProps, AsProp } from './_shared';

export declare type ViewProps = {
	/**
	 * @default 'div'
	 */
	as?: AsProp;
};

/**
 * `View` is a core component that renders everything in the library. It is the principle component in the entire library.
 */
export declare const View: React.FC<ViewProps & ConnectedProps>;
