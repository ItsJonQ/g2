import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { Elevation } from '../Elevation';
import { View } from '../View';
import * as styles from './Card.styles';
import { useCard } from './useCard';

function Card(props, forwardedRef) {
	const { children, elevation, isRounded, ...otherProps } = useCard(props);
	const elevationBorderRadius = isRounded ? ui.get('cardBorderRadius') : 0;

	return (
		<View {...otherProps} ref={forwardedRef}>
			<View {...ui.$('CardContent')} css={styles.Content}>
				{children}
			</View>
			<Elevation
				css={{ borderRadius: elevationBorderRadius }}
				isInteractive={false}
				value={elevation ? 1 : 0}
				{...ui.$('CardElevation')}
			/>
			<Elevation
				css={{ borderRadius: elevationBorderRadius }}
				isInteractive={false}
				value={elevation}
				{...ui.$('CardElevation')}
			/>
		</View>
	);
}

export default contextConnect(Card, 'Card');
