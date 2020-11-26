import { contextConnect } from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import React, { useMemo } from 'react';

import { Elevation } from '../Elevation';
import { View } from '../View';
import * as styles from './Card.styles';
import { useCard } from './useCard';

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

export default contextConnect(Card, 'Card');
