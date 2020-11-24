import { SeparatorProps } from 'reakit';
import { PolymorphicComponent } from './_shared';

export declare type DividerProps = SeparatorProps & {
	/**
	 * Adjusts all margins.
	 */
	m?: number;
	/**
	 * Adjusts top margins.
	 */
	mt?: number;
	/**
	 * Adjusts bottom margins.
	 */
	mb?: number;
};

/**
 * `Divider` is a layout component that separates groups of related content.
 *
 * @example
 * ```js
 * <ListGroup>
 * 	<FormGroup>...</FormGroup>
 *  <Divider />
 * 	<FormGroup>...</FormGroup>
 * </ListGroup>
 * ```
 */
export declare const Divider: PolymorphicComponent<'hr', DividerProps>;
