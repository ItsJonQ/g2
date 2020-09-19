import * as React from 'react';
import { ConnectedProps, SizeRangeReduced } from './_shared';
import { TextProps } from './Text';

export declare type ControlLabelSize = SizeRangeReduced;

export declare type ControlLabelProps = TextProps & {
	/**
	 * The HTML `for` attribute, associating the label within a form element's `id`.
	 */
	htmlFor?: string;
	/**
	 * The size of `ControlLabel`.
	 *
	 * @default 'medium'
	 */
	size?: ControlLabelSize;
};

/**
 * `ControlLabel` is a form component that associates a label with a form element (e.g. `Switch` or `TextInput`).
 * It is used internally within `FormGroup` for labelling.
 */
export declare const ControlLabel: React.FC<ControlLabelProps & ConnectedProps>;
