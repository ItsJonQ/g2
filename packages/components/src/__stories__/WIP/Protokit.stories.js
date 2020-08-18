import { faker, Schema, useListData } from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import React from 'react';

import {
	Animated,
	AnimatedContainer,
	Button,
	Card,
	CardBody,
	Grid,
	Text,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/Protokit',
};

const itemSchema = new Schema(() => ({
	description: faker.lorem.paragraph(),
	title: faker.name.firstName(),
}));

export const ListData = () => {
	const limit = 3;

	const [data, fns] = useListData({
		initialCount: limit,
		schema: itemSchema,
	});

	return (
		<VStack>
			<Button onClick={() => fns.loadMore({ limit })}>Load More</Button>
			<Grid columns={[2, 4]}>
				<AnimatedContainer>
					{data.map((item, index) => (
						<Animated
							auto
							key={item.id}
							transition={{
								// This should feel easier...
								delay: 0.05 * (index - data.length + limit),
							}}
						>
							<Card
								css={[
									ui.frame.height(100),
									{ cursor: 'pointer', userSelect: 'none' },
									ui.hover([
										ui.scale(1.1),
										ui.offset.y(-10),
										ui.shadow({ radius: 20 }),
									]),
									ui.active(ui.scale(0.9)),
									ui.animation.default,
								]}
								onClick={() => fns.remove({ id: item.id })}
							>
								<CardBody>
									<VStack>
										<Text weight="bold">
											{index}. {item.title}
										</Text>
										<Text
											numberOfLines={2}
											size="caption"
											truncate
											variant="muted"
										>
											{item.description}
										</Text>
									</VStack>
								</CardBody>
							</Card>
						</Animated>
					))}
				</AnimatedContainer>
			</Grid>
		</VStack>
	);
};
