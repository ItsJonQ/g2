import { PolymorphicComponent } from './_shared';
import { CardBodyProps } from './Card';
import { IconProps } from './Icon';
import { ReactNode } from 'react';

interface OwnProps {
	/**
	 * Children to render into the BlankSlate.
	 */
	children: ReactNode;
	/**
	 * Optional className to style the underlying Card.
	 *
	 * @default undefined
	 */
	className?: string;
	/**
	 * A description to render for the BlankSlate.
	 *
	 * @default undefined
	 */
	description?: ReactNode;
	/**
	 * An SVG component for `Icon`.
	 *
	 * @example
	 * ```jsx
	 * <Icon icon={<OlafIcon />} />
	 * ```
	 *
	 * @default undefined
	 */
	icon?: IconProps['icon'];
	/**
	 * The title of the BlankSlate.
	 */
	title: string;
}

export type BlankSlateProps = OwnProps & CardBodyProps;

export declare const BlankSlate: PolymorphicComponent<BlankSlateProps>;
