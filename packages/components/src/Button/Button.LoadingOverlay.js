import { styled } from '@wp-g2/css';
import React from 'react';

import { Flex } from '../Flex';
import { Spinner } from '../Spinner';

const LoadingOverlayView = styled(Flex)`
	bottom: 0;
	left: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
`;

export function LoadingOverlay({ isLoading = false }) {
	if (!isLoading) return null;

	return (
		<LoadingOverlayView aria-hidden="true" justify="center">
			<Spinner color={'currentColor'} />
		</LoadingOverlayView>
	);
}

export default LoadingOverlay;
