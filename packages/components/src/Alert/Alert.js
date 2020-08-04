import { AnimatePresence } from '@wp-g2/animations';
import { connect } from '@wp-g2/provider';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { AnimatedView } from '../AnimatedView';
import { Flex, FlexBlock } from '../Flex';
import * as styles from './Alert.styles';
import AlertCloseButton from './AlertCloseButton';
import AlertTitle from './AlertTitle';
const { AlertView, ContentWrapperView } = styles;

function Alert({
	children,
	isDismissable = false,
	onDismiss = noop,
	status = 'default',
	title,
	...props
}) {
	const cx = [styles[status]];

	return (
		<AnimatedView auto>
			<AlertView {...props} cx={cx}>
				<Flex align="flex-start">
					<FlexBlock>
						<AlertTitle title={title} />
						<ContentWrapperView>{children}</ContentWrapperView>
					</FlexBlock>
					<AlertCloseButton
						isDismissable={isDismissable}
						onDismiss={onDismiss}
						status={status}
					/>
				</Flex>
			</AlertView>
		</AnimatedView>
	);
}

export default connect(Alert);
