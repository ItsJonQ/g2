import { connect } from '@wp-g2/provider';
import { BaseView, css, get } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React from 'react';

import * as styles from './Elevation.styles';

function Elevation({
	active,
	borderRadius = 'inherit',
	focus,
	hover,
	isInteractive = true,
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

	styles.base = css({
		borderRadius,
		bottom: offset,
		boxShadow: styles.getBoxShadow(value),
		left: offset,
		right: offset,
		top: offset,
		transition,
	});

	styles.hover = css`
		*:hover > & {
			box-shadow: ${styles.getBoxShadow(hoverValue)};
		}
	`;

	styles.active = css`
		*:active > & {
			box-shadow: ${styles.getBoxShadow(activeValue)};
		}
	`;

	styles.focus = css`
		*:focus > & {
			box-shadow: ${styles.getBoxShadow(focus)};
		}
	`;

	const cx = [
		styles.Elevation,
		styles.base,
		is.defined(hoverValue) && styles.hover,
		is.defined(activeValue) && styles.active,
		is.defined(focus) && styles.focus,
	];

	return <BaseView {...props} cx={cx} />;
}

export default connect(Elevation);
