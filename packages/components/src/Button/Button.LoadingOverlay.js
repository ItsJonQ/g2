import { styled } from '@g2/css';
import React from 'react';

import { Flex } from '../Flex';
import { Spinner } from '../Spinner';

const LoadingOverlayView = styled(Flex)`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
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
