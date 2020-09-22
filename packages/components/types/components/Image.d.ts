import { PolymorphicComponent, CSS } from './_shared';

export declare type ImageProps = {
	/**
	 * The `Image` width:height aspect ratio can be customized, rendering the content in an `AspectRatio`. If an `aspectRatio` is used, `Image` will default to a `fit` of `cover`.
	 *
	 * @example
	 * ```jsx
	 * import { Image } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return (
	 *     <Image
	 *       src="https://picsum.photos/seed/picsum/800/800"
	 *       alt="Snowy Mountains"
	 *       aspectRatio={21 / 9}
	 *     />
	 *   )
	 * }
	 * ```
	 */
	aspectRatio?: number;
	/**
	 * Resizes the image to fit a container, using CSS [`object-fit`](https:*developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
	 *
	 * * `contain`: Resizes image to fit the container box, while maintaining it's aspect ratio.
	 * * `cover`: Resizes image to fill the container box, while maintaining it's aspect ratio.
	 * * `fill`: Resizes image to fill the container box.
	 * * `none`: Image will not be resized.
	 * * `scale-down`: Image will be sized as if none or contain were specified.
	 *
	 * @example
	 * ```jsx
	 * import { Image } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return (
	 *     <View css={{ height: 200 }}>
	 *       <Image
	 *         src="https://picsum.photos/seed/picsum/800/800"
	 *         alt="Snowy Mountains"
	 *         fit="fill"
	 *       />
	 *     </View>
	 *   )
	 * }
	 * ```
	 */
	fit?: CSS['objectFit'];
	/**
	 * The image height.
	 */
	height?: CSS['height'];
	/**
	 * The image width.
	 */
	width?: CSS['width'];
};

/**
 * `Image` is a core component that renders images in the library.
 *
 * @remarks
 * `Image` can be used just like a regular HTML `img`. However, unlike the HTML `img`, the `Image` core component is responsive **by default**.
 *
 * @example
 * ```jsx
 * import { Image } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Image
 *       src="https://picsum.photos/seed/picsum/800/800"
 *       alt="Snowy Mountains"
 *       width={300}
 *       height={300}
 *     />
 *   )
 * }
 * ```
 */
export declare const Image: PolymorphicComponent<ImageProps, 'img'>;
