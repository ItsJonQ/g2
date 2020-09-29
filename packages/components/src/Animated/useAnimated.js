import { useSystemReducedMotion } from '@wp-g2/animations';
import { useContextSystem } from '@wp-g2/context';
import { useReducedMotion } from '@wp-g2/styles';

export function useAnimated(props) {
	const { as = 'div', auto = false, ...otherProps } = useContextSystem(
		props,
		'Animated',
	);
	const [isProviderReducedMotion] = useReducedMotion();
	const isSystemReducedMotion = useSystemReducedMotion();

	const isReducedMotion = isSystemReducedMotion || isProviderReducedMotion;

	let baseProps = {
		initial: false,
	};

	if (auto) {
		baseProps = {
			animate: {
				opacity: 1,
				scale: 1,
				transition: props.transition || {
					duration: 0.2,
					ease: 'easeInOut',
				},
			},
			exit: {
				opacity: 0,
				scale: 0.9,
				transition: {
					duration: 0.2,
					ease: 'easeInOut',
				},
			},
			initial: { opacity: 0, scale: 0.9 },
		};
	}

	let finalProps = {
		...baseProps,
		...otherProps,
	};

	if (isReducedMotion) {
		finalProps = {
			...finalProps,
			layout: undefined,
			transition: { duration: 0 },
		};
	}

	return {
		...finalProps,
		as,
	};
}
