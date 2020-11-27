import { contextConnect } from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import React, { useMemo } from 'react';

import { Elevation } from '../Elevation';
import { View } from '../View';
import * as styles from './Card.styles';
import { useCard } from './useCard';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').CardProps, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function Card(props, forwardedRef) {
	const { children, elevation, isRounded = true, ...otherProps } = useCard(
		props,
	);
	const elevationBorderRadius = isRounded ? ui.get('cardBorderRadius') : 0;

	const elevationClassName = useMemo(
		() => css({ borderRadius: elevationBorderRadius }),
		[elevationBorderRadius],
	);

	return (
		<View {...otherProps} ref={forwardedRef}>
			<View {...ui.$('CardContent')} css={styles.Content}>
				{children}
			</View>
			<Elevation
				className={elevationClassName}
				isInteractive={false}
				value={elevation ? 1 : 0}
				{...ui.$('CardElevation')}
			/>
			<Elevation
				className={elevationClassName}
				isInteractive={false}
				value={elevation}
				{...ui.$('CardElevation')}
			/>
		</View>
	);
}

/**
 * `Card` is a layout component, providing a flexible and extensible content container.
 *
 * @remarks
 * `Card` provides convenient sub-components such as `CardBody`, `CardHeader`, and `CardFooter`.
 *
 * @example
 * ```jsx
 * import {
 *   Card,
 *   CardHeader,
 *   CardBody,
 *   CardFooter,
 *   Text,
 * } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Card>
 *       <CardHeader>
 *         <Heading size={4}>Card Title</Heading>
 *       </CardHeader>
 *       <CardBody>
 *         <Text>Card Content</Text>
 *       </CardBody>
 *       <CardFooter>
 *         <Text>Card Footer</Text>
 *       </CardFooter>
 *     </Card>
 *   );
 * }
 * ```
 */
const ConnectedCard = contextConnect(Card, 'Card');

export default ConnectedCard;
