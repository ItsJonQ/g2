import * as React from 'react';
import { ConnectedProps } from './_shared';

export declare type SpacerProps = {
	/**
	 * Adjusts all margins.
	 */
	m?: number;
	/**
	 * Adjusts top and bottom margins.
	 */
	my?: number;
	/**
	 * Adjusts left and right margins.
	 */
	mx?: number;
	/**
	 * Adjusts top margins.
	 */
	mt?: number;
	/**
	 * Adjusts bottom margins.
	 * @default 2
	 */
	mb?: number;
	/**
	 * Adjusts left margins.
	 */
	ml?: number;
	/**
	 * Adjusts right margins.
	 */
	mr?: number;
	/**
	 * Adjusts all padding.
	 */
	p?: number;
	/**
	 * Adjusts top and bottom padding.
	 */
	py?: number;
	/**
	 * Adjusts left and right padding.
	 */
	px?: number;
	/**
	 * Adjusts top padding.
	 */
	pt?: number;
	/**
	 * Adjusts bottom padding.
	 */
	pb?: number;
	/**
	 * Adjusts left padding.
	 */
	pl?: number;
	/**
	 * Adjusts right padding.
	 */
	pr?: number;
};

/**
 * `Spacer` is a primitive layout component that providers inner (`padding`) or outer (`margin`) space in-between components. It can also be used to adaptively provide space within an `HStack` or `VStack`.
 */
export declare const Spacer: React.FC<SpacerProps & ConnectedProps>;
