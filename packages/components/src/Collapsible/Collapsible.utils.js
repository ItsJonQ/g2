import { useReducedMotion } from '@wp-g2/styles';
import React from 'react';
import { useSpring } from 'react-spring/web.cjs';

export function useCollapsibleHeightAnimation({
	duration = 120,
	isVisible = false,
}) {
	const contentRef = React.useRef();
	const previouslyVisible = React.useRef(isVisible);
	const [reducedMotion] = useReducedMotion();

	const [animatedHeight, set] = useSpring(() => ({
		height: isVisible ? 'auto' : 0,
		opacity: isVisible ? 1 : 0,
		config: { duration },
	}));

	React.useEffect(() => {
		if (isVisible === previouslyVisible.current) return;
		previouslyVisible.current = isVisible;

		if (isVisible) {
			contentRef.current.style.display = 'block';
			contentRef.current.style.height = 'auto';
			const height = contentRef.current.getBoundingClientRect().height;
			contentRef.current.style.height = 0;

			set({
				height,
				immediate: reducedMotion,
				opacity: 1,
			});
		} else {
			const height = contentRef.current.getBoundingClientRect().height;
			contentRef.current.style.height = height;

			set({
				height: 0,
				immediate: reducedMotion,
				opacity: 0,
			});
		}

		set({
			onRest: () => {
				if (isVisible) {
					contentRef.current.style.height = 'auto';
					contentRef.current.style.opacity = 1;
				} else {
					contentRef.current.style.display = 'none';
					contentRef.current.style.opacity = 0;
				}
			},
		});
	}, [isVisible, reducedMotion, set]);

	return [contentRef, animatedHeight];
}
