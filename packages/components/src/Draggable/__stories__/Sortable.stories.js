import { useListState } from '@wp-g2/protokit';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { createRef } from 'react';
import SortableCore from 'sortablejs';

import {
	Card,
	CardBody,
	Heading,
	Subheading,
	Text,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Components/Draggable',
};

class Sortable extends React.Component {
	nodeRef = createRef();
	sortable = null;

	componentDidMount() {
		this.sortable = SortableCore.create(this.nodeRef.current, {
			animation: 150,
			forceFallback: true,
			ghostClass: 'ghost',
		});
	}

	componentWillUnmount() {
		this.sortable.destroy();
	}

	render() {
		return <View ref={this.nodeRef}>{this.props.children}</View>;
	}
}

const Draggable = (props) => {
	return (
		<View
			data-sortable-item="true"
			{...props}
			css={[{ marginBottom: 8 }, `&.ghost {opacity: 0}`]}
		/>
	);
};

const itemSchema = new Schema(() => ({
	id: faker.random.uuid(),
	name: faker.name.firstName(),
}));

const Example = () => {
	const [items] = useListState(itemSchema.make(10));
	return (
		<VStack spacing={5}>
			<VStack spacing={0}>
				<Heading>SortableJS</Heading>
				<Subheading>Probaby a no go.</Subheading>
			</VStack>
			<Sortable>
				{items.map((item) => (
					<Draggable key={item.id}>
						<Card>
							<CardBody>
								<Text>{item.name}</Text>
							</CardBody>
						</Card>
					</Draggable>
				))}
			</Sortable>
		</VStack>
	);
};

export const SortableExample = () => {
	return <Example />;
};
