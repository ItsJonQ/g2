import { connect } from '@wp-g2/context';
import { css, get, getBoxShadow } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React from 'react';

import { ElevationView } from './Elevation.styles';

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

	const sx = {};

	sx.Base = css({
		borderRadius,
		bottom: offset,
		boxShadow: getBoxShadow(value),
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

	const cx = [
		sx.Elevation,
		sx.Base,
		is.defined(hoverValue) && sx.hover,
		is.defined(activeValue) && sx.active,
		is.defined(focus) && sx.focus,
	];

	return <ElevationView {...props} cx={cx} />;
}

export default connect(Elevation, 'Elevation');
