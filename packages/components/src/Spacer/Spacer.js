import { connect } from '@wp-g2/context';
import { css, cx, toPx } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';

function Spacer({
	className,
	m,
	mb = 2,
	ml,
	mr,
	mt,
	mx,
	my,
	p,
	pb,
	pl,
	pr,
	pt,
	px,
	py,
	...props
}) {
	const classes = cx(
		is.defined(mt) &&
			css`
				margin-top: ${value(mt)};
			`,
		is.defined(mb) &&
			css`
				margin-bottom: ${value(mb)};
			`,
		is.defined(ml) &&
			css`
				margin-left: ${value(ml)};
			`,
		is.defined(mr) &&
			css`
				margin-right: ${value(mr)};
			`,
		is.defined(mx) &&
			css`
				margin-left: ${value(mx)};
				margin-right: ${value(mx)};
			`,
		is.defined(my) &&
			css`
				margin-bottom: ${value(my)};
				margin-top: ${value(my)};
			`,
		is.defined(m) &&
			css`
				margin: ${value(m)};
			`,
		is.defined(pt) &&
			css`
				padding-top: ${value(pt)};
			`,
		is.defined(pb) &&
			css`
				padding-bottom: ${value(pb)};
			`,
		is.defined(pl) &&
			css`
				padding-left: ${value(pl)};
			`,
		is.defined(pr) &&
			css`
				padding-right: ${value(pr)};
			`,
		is.defined(px) &&
			css`
				padding-left: ${value(px)};
				padding-right: ${value(px)};
			`,
		is.defined(py) &&
			css`
				padding-bottom: ${value(py)};
				padding-top: ${value(py)};
			`,
		is.defined(p) &&
			css`
				padding: ${value(p)};
			`,
		className,
	);

	return <View className={classes} {...props} />;
}

function value(val) {
	const gridBase = 4;
	return toPx(val * gridBase);
}

export default connect(Spacer);
