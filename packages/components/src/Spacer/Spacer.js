import { connect } from '@wp-g2/context';
import { css, cx, space } from '@wp-g2/styles';
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
				margin-top: ${space(mt)};
			`,
		is.defined(mb) &&
			css`
				margin-bottom: ${space(mb)};
			`,
		is.defined(ml) &&
			css`
				margin-left: ${space(ml)};
			`,
		is.defined(mr) &&
			css`
				margin-right: ${space(mr)};
			`,
		is.defined(mx) &&
			css`
				margin-left: ${space(mx)};
				margin-right: ${space(mx)};
			`,
		is.defined(my) &&
			css`
				margin-bottom: ${space(my)};
				margin-top: ${space(my)};
			`,
		is.defined(m) &&
			css`
				margin: ${space(m)};
			`,
		is.defined(pt) &&
			css`
				padding-top: ${space(pt)};
			`,
		is.defined(pb) &&
			css`
				padding-bottom: ${space(pb)};
			`,
		is.defined(pl) &&
			css`
				padding-left: ${space(pl)};
			`,
		is.defined(pr) &&
			css`
				padding-right: ${space(pr)};
			`,
		is.defined(px) &&
			css`
				padding-left: ${space(px)};
				padding-right: ${space(px)};
			`,
		is.defined(py) &&
			css`
				padding-bottom: ${space(py)};
				padding-top: ${space(py)};
			`,
		is.defined(p) &&
			css`
				padding: ${space(p)};
			`,
		className,
	);

	return <View className={classes} {...props} />;
}

export default connect(Spacer, 'Spacer');
