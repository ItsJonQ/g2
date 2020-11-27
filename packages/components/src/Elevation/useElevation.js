import { useContextSystem } from '@wp-g2/context';
import { css, cx, getBoxShadow, ui } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import { useMemo } from 'react';

import * as styles from './Elevation.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'div'>} props
 */
export function useElevation(props) {
	const {
		active,
		borderRadius = 'inherit',
		className,
		focus,
		hover,
		isInteractive = false,
		offset = 0,
		value = 0,
		...otherProps
	} = useContextSystem(props, 'Elevation');

	const classes = useMemo(() => {
		let hoverValue = is.defined(hover) ? hover : value * 2;
		let activeValue = is.defined(active) ? hover : value / 2;

		if (!isInteractive) {
			hoverValue = is.defined(hover) ? hover : undefined;
			activeValue = is.defined(active) ? active : undefined;
		}

		const transition = `box-shadow ${ui.get('transitionDuration')} ${ui.get(
			'transitionTimingFunction',
		)}`;

		const sx = {};

		sx.Base = css({
			borderRadius,
			bottom: offset,
			boxShadow: getBoxShadow(value),
			opacity: ui.get('elevationIntensity'),
			left: offset,
			right: offset,
			top: offset,
			transition,
		});

		sx.hover = css`
			*:hover > & {
				box-shadow: ${getBoxShadow(hoverValue)};
			}
		`;

		sx.active = css`
			*:active > & {
				box-shadow: ${getBoxShadow(activeValue)};
			}
		`;

		sx.focus = css`
			*:focus > & {
				box-shadow: ${getBoxShadow(focus)};
			}
		`;

		return cx(
			styles.Elevation,
			sx.Elevation,
			sx.Base,
			is.defined(hoverValue) && sx.hover,
			is.defined(activeValue) && sx.active,
			is.defined(focus) && sx.focus,
			className,
		);
	}, [
		active,
		borderRadius,
		className,
		focus,
		hover,
		isInteractive,
		offset,
		value,
	]);

	return { ...otherProps, className: classes };
}
