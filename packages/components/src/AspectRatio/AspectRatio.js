import { connect } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { AspectRatioResizer, AspectRatioView } from './AspectRatio.styles';
import * as styles from './AspectRatio.styles';

function AspectRatio({ children, ratio = 1, width, ...props }) {
	const validChildren = getValidChildren(children);
	const [child] = validChildren;

	const clonedChild =
		child &&
		React.cloneElement(child, {
			className: cx([styles.content, child.className]),
		});

	return (
		<AspectRatioView {...props} cx={[css({ maxWidth: width })]}>
			{clonedChild}
			<AspectRatioResizer
				aria-hidden
				cx={[
					css({
						paddingBottom: `${(1 / ratio) * 100}%`,
					}),
				]}
			/>
		</AspectRatioView>
	);
}

export default connect(AspectRatio, 'AspectRatio');
