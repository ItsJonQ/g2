import { Separator } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React from 'react';

import * as styles from './Divider.styles';

const { DividerView } = styles;

function Divider({ m, mb, mt, ...props }) {
	const sx = {};
	sx.mt = css`
		margin-top: ${ui.space(mt)};
	`;
	sx.mb = css`
		margin-bottom: ${ui.space(mb)};
	`;
	sx.m = css`
		margin-bottom: ${ui.space(mb)};
		margin-top: ${ui.space(mt)};
	`;

	const __css = [
		!is.defined(m) && mb && sx.mb,
		!is.defined(m) && mt && sx.mt,
		is.defined(m) && sx.m,
	];

	return <Separator {...props} as={DividerView} cx={__css} />;
}

export default connect(Divider, 'Divider');
