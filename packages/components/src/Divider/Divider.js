import { connect } from '@wp-g2/provider';
import { css, toPx } from '@wp-g2/styles';
import React from 'react';
import { Separator } from 'reakit/Separator';

import * as styles from './Divider.styles';

const { DividerView } = styles;

const GRID_BASE = 4;

function Divider({ m, mb = 3, mt = 3, ...props }) {
	styles.mt = css`
		margin-top: ${toPx(mt * GRID_BASE)};
	`;
	styles.mb = css`
		margin-bottom: ${toPx(mb * GRID_BASE)};
	`;
	styles.m = css`
		margin-bottom: ${toPx(m * GRID_BASE)};
		margin-top: ${toPx(m * GRID_BASE)};
	`;
	const cx = [mb && styles.mb, mt && styles.mt, m && styles.m];

	return <Separator {...props} as={DividerView} cx={cx} />;
}

export default connect(Divider);
