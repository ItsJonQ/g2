import { connect } from '@wp-g2/provider';
import { css, cx, toPx } from '@wp-g2/styles';
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
		mt &&
			css`
				margin-top: ${value(mt)};
			`,
		mb &&
			css`
				margin-bottom: ${value(mb)};
			`,
		ml &&
			css`
				margin-left: ${value(ml)};
			`,
		mr &&
			css`
				margin-right: ${value(mr)};
			`,
		mx &&
			css`
				margin-left: ${value(mx)};
				margin-right: ${value(mx)};
			`,
		my &&
			css`
				margin-bottom: ${value(my)};
				margin-top: ${value(my)};
			`,
		m &&
			css`
				margin: ${value(m)};
			`,
		pt &&
			css`
				padding-top: ${value(pt)};
			`,
		pb &&
			css`
				padding-bottom: ${value(pb)};
			`,
		pl &&
			css`
				padding-left: ${value(pl)};
			`,
		pr &&
			css`
				padding-right: ${value(pr)};
			`,
		px &&
			css`
				padding-left: ${value(px)};
				padding-right: ${value(px)};
			`,
		py &&
			css`
				padding-bottom: ${value(py)};
				padding-top: ${value(py)};
			`,
		p &&
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
