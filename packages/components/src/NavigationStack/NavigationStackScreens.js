import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styled-components';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import {
	useCurrentPanelIndex,
	useNavigationStackContext,
} from './NavigationStack.utils';

function NavigationStackScreens({ children, forwardedRef, ...props }) {
	const currentIndex = useCurrentPanelIndex();
	const {
		__isRendered,
		autoHeight,
		containerRef,
		initialHeight,
		tab,
	} = useNavigationStackContext();
	const { panels } = tab;
	const panelsCount = panels.length;

	let transform = null;
	let width = null;

	if (panelsCount) {
		const offset = 100 / panelsCount;
		const x = `calc(${offset * currentIndex * -1}%)`;
		transform = `translate3d(${x}, 0, 0)`;
		width = `calc(100% * ${panelsCount})`;
	}

	return (
		<BaseView
			{...props}
			ref={mergeRefs([containerRef, forwardedRef])}
			style={{ height: autoHeight ? initialHeight : '100%' }}
			sx={{
				overflow: 'hidden',
				position: 'relative',
				transition:
					__isRendered && autoHeight
						? 'height 300ms ease-in-out'
						: null,
			}}
		>
			<BaseView
				style={{
					transform,
					width,
				}}
				sx={{
					display: 'flex',
					transition: __isRendered
						? 'transform 300ms ease-in-out'
						: null,
				}}
			>
				{children}
			</BaseView>
		</BaseView>
	);
}

export default connect(NavigationStackScreens);
