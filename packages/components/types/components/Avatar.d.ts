import * as React from 'react';
import { ConnectedProps, CSS } from './_shared';

export declare type AvatarShape = 'circle' | 'square';

export declare type AvatarSize =
	| 'xLarge'
	| 'large'
	| 'medium'
	| 'small'
	| 'xSmall';

export declare type AvatarProps = {
	/**
	 * Fades the image in when it is loaded.
	 * @default true
	 */
	animateOnImageLoad?: boolean;
	/**
	 * Renders a border around the `Avatar`.
	 * @default false
	 */
	border?: boolean;
	/**
	 * Renders a custom background color.
	 */
	color?: CSS['color'];
	/**
	 * The name to render as `Initials`.
	 * @default false
	 */
	name?: string;
	/**
	 * The shape of the `Avatar`.
	 *
	 * @default 'circle'
	 */
	shape?: AvatarShape;
	/**
	 * The dimensions of the `Avatar`.
	 *
	 * @default 'medium'
	 */
	size?: AvatarSize & CSS['width'];
	/**
	 * The source of the `Image`.
	 */
	src?: string;
};

/**
 * `Avatar` renders either an `Image` or the `Initials` of a user.
 */
export declare const Avatar: React.FC<AvatarProps & ConnectedProps>;
