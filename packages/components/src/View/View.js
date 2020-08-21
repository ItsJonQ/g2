import { connect } from '@wp-g2/context';
import { BaseView } from '@wp-g2/styles';
import { is, warning } from '@wp-g2/utils';
import React from 'react';

import { Text } from '../Text';

function View({ children, forwardedRef, ...props }) {
	warning(
		is.string(children),
		'@wp-g2/components',
		'View',
		`children prop should not be a string.`,
		`To render text, use the <Text /> component.`,
		`This instance of <View /> will be using <Text /> instead.`,
	);

	if (is.string(children)) {
		return (
			<Text {...props} ref={forwardedRef}>
				{children}
			</Text>
		);
	}

	return (
		<BaseView {...props} ref={forwardedRef}>
			{children}
		</BaseView>
	);
}
export default connect(View, 'View');
