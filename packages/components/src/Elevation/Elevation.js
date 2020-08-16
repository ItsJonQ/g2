import { connect } from '@wp-g2/context';
import { css, get, getBoxShadow } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React from 'react';

import * as styles from './Elevation.styles';

const { ElevationView } = styles;

function Elevation({
	active,
	borderRadius = 'inherit',
	focus,
	hover,
	isInteractive = false,
	offset = 0,
	value = 0,
	...props
}) {
	let hoverValue = is.defined(hover) ? hover : value * 2;
	let activeValue = is.defined(active) ? hover : value / 2;

	if (!isInteractive) {
		hoverValue = is.defined(hover) ? hover : undefined;
		activeValue = is.defined(active) ? active : undefined;
	}

	const transition = `box-shadow ${get('transitionDuration')} ${get(
		'transitionTimingFunction',
	)}`;

	styles.Base = css({
		borderRadius,
		bottom: offset,
		boxShadow: getBoxShadow(value),
		left: offset,
		right: offset,
		top: offset,
		transition,
	});

	styles.hover = css`
		*:hover > & {
			box-shadow: ${getBoxShadow(hoverValue)};
		}
	`;

	styles.active = css`
		*:active > & {
			box-shadow: ${getBoxShadow(activeValue)};
		}
	`;

	styles.focus = css`
		*:focus > & {
			box-shadow: ${getBoxShadow(focus)};
		}
	`;

	const cx = [
		styles.Elevation,
		styles.Base,
		is.defined(hoverValue) && styles.hover,
		is.defined(activeValue) && styles.active,
		is.defined(focus) && styles.focus,
	];

	return <ElevationView {...props} cx={cx} />;
}

export default connect(Elevation);
