import { PolymorphicComponent } from './_shared';

export declare type DividerProps = {
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
 */
export declare const Divider: PolymorphicComponent<DividerProps, 'hr'>;
