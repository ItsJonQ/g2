import { connect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { Animated } from '../Animated';
import { Flex, FlexBlock } from '../Flex';
import { View } from '../View';
import * as styles from './Alert.styles';
import AlertCloseButton from './AlertCloseButton';
import AlertTitle from './AlertTitle';
const { AlertView } = styles;

function Alert({
	children,
	isDismissable: isDismissableProp = false,
	onDismiss,
	status = 'default',
	title,
	...props
}) {
	const cx = [styles[status]];
	const isDismissable = isDismissableProp || !!onDismiss;

	return (
		<Animated auto>
			<AlertView {...props} cx={cx}>
				<Flex align="flex-start">
					<FlexBlock>
						<AlertTitle title={title} />
						<View
							{...ui.$('AlertContent')}
							cx={[isDismissable && styles.contentWithDismiss]}
						>
							{children}
						</View>
					</FlexBlock>
					<AlertCloseButton
						isDismissable={isDismissable}
						onDismiss={onDismiss}
						status={status}
					/>
				</Flex>
			</AlertView>
		</Animated>
	);
}

export default connect(Alert, 'Alert');
