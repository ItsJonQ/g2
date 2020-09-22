import { PolymorphicComponent, CSS, SizeRangeDefault } from './_shared';

export declare type AvatarShape = 'circle' | 'square';

export declare type AvatarSize = SizeRangeDefault;

export declare type AvatarProps = {
	/**
	 * Fades the image in when it is loaded.
	 *
	 * @default true
	 */
	animateOnImageLoad?: boolean;
	/**
	 * Renders a border around the `Avatar`.
	 *
	 * @default false
	 */
	border?: boolean;
	/**
	 * `Avatar` can be rendered with any background color. The background color is only visible if there is no `Image` (`src`).
	 *
	 * @example
	 * ```jsx
	 * import { Avatar } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return <Avatar color="blue" name="Elsa Oldenburg" size="medium" />;
	 * }
	 * ```
	 */
	color?: CSS['color'];
	/**
	 * The name to render as `Initials`.
	 *
	 * @example
	 * ```jsx
	 * import { Avatar } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return <Avatar name="Elsa Oldenburg" size="medium" />;
	 * }
	 * ```
	 */
	name?: string;
	/**
	 * `Avatar` renders with a `circle` shape by default (`30px` x `30px`). There are handful of preset sizes (below). A custom shape (`border-radius`) can be provided by passing in a `number` value.
	 *
	 * * `circle`: Renders a circular shape.
	 * * `square`: Renders a rounded rectangle shape.
	 *
	 * @default 'circle'
	 *
	 * @example
	 * ```jsx
	 * import { Avatar } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return (
	 *     <Avatar
	 *       color="blue"
	 *       src="https://picsum.photos/id/1041/300/300"
	 *       name="Elsa Oldenburg"
	 *       size="xLarge"
	 *     />
	 *   );
	 * }
	 * ```
	 */
	shape?: AvatarShape;
	/**
	 * The dimensions of the `Avatar`.
	 * `Avatar` renders with a `medium` size by default (`30px` x `30px`). There are handful of preset sizes (below). A custom sizes can be provided by passing in a `number` value.
	 *
	 * * `xLarge`: Renders an `Avatar` that is `48px` x `48px`
	 * * `large`: Renders an `Avatar` that is `36px` x `36px`
	 * * `medium`: Renders an `Avatar` that is `30px` x `30px`
	 * * `small`: Renders an `Avatar` that is `24px` x `24px`
	 * * `xSmall`: Renders an `Avatar` that is `16px` x `16px`
	 *
	 * @default 'medium'
	 *
	 * @example
	 * ```jsx
	 * import { Avatar } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return (
	 *     <Avatar
	 *       color="blue"
	 *       src="https://picsum.photos/id/1041/300/300"
	 *       name="Elsa Oldenburg"
	 *       size="xLarge"
	 *     />
	 *   );
	 * }
	 * ```
	 */
	size?: AvatarSize | CSS['width'];
	/**
	 * The source of the `Image`.
	 */
	src?: string;
};

/**
 * `Avatar` renders either an `Image` or the `Initials` of a user.
 *
 * @example
 * ```jsx
 * import { Avatar } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Avatar
 *       name="Elsa Oldenburg"
 *       src="https://picsum.photos/id/1041/300/300"
 *       size="medium"
 *     />
 *   );
 * }
 * ```
 */
export declare const Avatar: PolymorphicComponent<AvatarProps>;
