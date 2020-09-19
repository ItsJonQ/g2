import { PolymorphicComponent } from './_shared';
import { DividerProps } from './Divider';

export declare type SeparatorProps = DividerProps & {
	/**
	 * @default 3
	 */
	mt?: number;
	/**
	 * @default 3
	 */
	mb?: number;
};

/**
 * `Separator` is a layout component that separates groups of related content with spacing.
 */
export declare const Separator: PolymorphicComponent<SeparatorProps, 'hr'>;
