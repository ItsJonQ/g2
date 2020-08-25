import { faker, mockRequest, Schema, useListData } from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import React, { useState } from 'react';

import {
	Alert,
	Alerts,
	Animated,
	AnimatedContainer,
	Button,
	Card,
	CardBody,
	Container,
	FormGroup,
	Grid,
	HStack,
	Spinner,
	Switch,
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
	const limit = 6;
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [fail, setFail] = useState(false);

	const [data, fns] = useListData({
		initialCount: limit,
		schema: itemSchema,
	});

	const handleOnLoadMore = async () => {
		setIsLoading(true);
		setIsError(false);

		try {
			await mockRequest({
				data: () => fns.loadMore({ limit: 3 }),
				status: fail ? 400 : 200,
				timeout: 1000,
			});
		} catch (response) {
			setIsError(true);
		}

		setIsLoading(false);
	};

	return (
		<Container width={800}>
			<VStack>
				<Alerts>
					{isError && (
						<Alert
							isDismissable
							onDismiss={() => setIsError(false)}
							status="critical"
						>
							<Text>Bad data :(</Text>
						</Alert>
					)}
				</Alerts>
				<HStack>
					<HStack alignment="left">
						<Button disabled={isLoading} onClick={handleOnLoadMore}>
							Load More
						</Button>
						{isLoading && <Spinner />}
					</HStack>
					<FormGroup
						isMarginless
						label="Force Fail"
						templateColumns="1fr auto"
					>
						<Switch checked={fail} onChange={setFail} />
					</FormGroup>
				</HStack>
				<Grid columns={[2, 3]}>
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
										{
											cursor: 'pointer',
											userSelect: 'none',
										},
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
		</Container>
	);
};
