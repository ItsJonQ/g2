import { FiScissors } from '@wp-g2/icons';
import React from 'react';

import { Icon, Link } from '../../index';
import { Text } from '../index';

export default {
	component: Text,
	title: 'Components/Text',
};

export const _default = () => {
	return <Text>Hello</Text>;
};

export const truncate = () => {
	return (
		<Text numberOfLines={2} truncate>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
			facilisis dictum tortor, eu tincidunt justo scelerisque tincidunt.
			Duis semper dui id augue malesuada, ut feugiat nisi aliquam.
			Vestibulum venenatis diam sem, finibus dictum massa semper in. Nulla
			facilisi. Nunc vulputate faucibus diam, in lobortis arcu ornare vel.
			In dignissim nunc sed facilisis finibus. Etiam imperdiet mattis
			arcu, sed rutrum sapien blandit gravida. Aenean sollicitudin neque
			eget enim blandit, sit amet rutrum leo vehicula. Nunc malesuada
			ultricies eros ut faucibus. Aliquam erat volutpat. Nulla nec feugiat
			risus. Vivamus iaculis dui aliquet ante ultricies feugiat.
			Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
			posuere cubilia curae; Vivamus nec pretium velit, sit amet
			consectetur ante. Praesent porttitor ex eget fermentum mattis.
		</Text>
	);
};

export const highlight = () => {
	return (
		<Text highlightWords={['con']}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
			facilisis dictum tortor, eu tincidunt justo scelerisque tincidunt.
			Duis semper dui id augue malesuada, ut feugiat nisi aliquam.
			Vestibulum venenatis diam sem, finibus dictum massa semper in. Nulla
			facilisi. Nunc vulputate faucibus diam, in lobortis arcu ornare vel.
			In dignissim nunc sed facilisis finibus. Etiam imperdiet mattis
			arcu, sed rutrum sapien blandit gravida. Aenean sollicitudin neque
			eget enim blandit, sit amet rutrum leo vehicula. Nunc malesuada
			ultricies eros ut faucibus. Aliquam erat volutpat. Nulla nec feugiat
			risus. Vivamus iaculis dui aliquet ante ultricies feugiat.
			Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
			posuere cubilia curae; Vivamus nec pretium velit, sit amet
			consectetur ante. Praesent porttitor ex eget fermentum mattis.
		</Text>
	);
};

export const textLinkIcon = () => {
	return (
		<Text>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
			<Link>Link</Link>
			<Icon icon={<FiScissors />} inline />.{' '}
			{/* There is no WordPress/icons alternative for this */}
			<Link>
				Link <Icon icon={<FiScissors />} inline />{' '}
				{/* There is no WordPress/icons alternative for this */}
			</Link>
		</Text>
	);
};
