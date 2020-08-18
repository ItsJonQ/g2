import { Separator } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { css, toPx } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React from 'react';

import * as styles from './Divider.styles';

const { DividerView } = styles;

const GRID_BASE = 4;

function Divider({ m, mb, mt, ...props }) {
	const sx = {};
	sx.mt = css`
		margin-top: ${toPx(mt * GRID_BASE)};
	`;
	sx.mb = css`
		margin-bottom: ${toPx(mb * GRID_BASE)};
	`;
	sx.m = css`
		margin-bottom: ${toPx(m * GRID_BASE)};
		margin-top: ${toPx(m * GRID_BASE)};
	`;

	const cx = [
		!is.defined(m) && mb && sx.mb,
		!is.defined(m) && mt && sx.mt,
		is.defined(m) && sx.m,
	];

	return <Separator {...props} as={DividerView} cx={cx} />;
}

export default connect(Divider);
