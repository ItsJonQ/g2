import React from 'react';

import { Flex } from '../Flex';
import { Spinner } from '../Spinner';
import * as styles from './BaseButton.styles';

export function LoadingOverlay({ isLoading = false }) {
	if (!isLoading) return null;

	return (
		<Flex
			aria-hidden="true"
			className={styles.LoadingOverlay}
			justify="center"
		>
			<Spinner color={'currentColor'} />
		</Flex>
	);
}

export default LoadingOverlay;
