import React from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '../../Card';
import { Placeholder } from '../../Placeholder';
import { Spacer } from '../../Spacer';
import { Text } from '../../Text';
import {
	NavigationStack,
	NavigationStackNext,
	NavigationStackPrevious,
	NavigationStackScreen,
	NavigationStackScreens,
} from '../index';

export default {
	component: NavigationStack,
	title: 'Components/NavigationStack',
};

export const _default = () => {
	return (
		<NavigationStack initialHeight={50}>
			<Card css={{ m: 'auto', width: 300 }}>
				<CardHeader>
					<Text weight={600}>Content</Text>
				</CardHeader>
				<CardBody>
					<NavigationStackScreens>
						<NavigationStackScreen>
							<Spacer>
								<Placeholder height={200}>
									<Text>1</Text>
								</Placeholder>
							</Spacer>
							<Placeholder />
						</NavigationStackScreen>
						<NavigationStackScreen>
							<Spacer>
								<Placeholder height={100}>
									<Text>2</Text>
								</Placeholder>
							</Spacer>
							<Spacer>
								<Placeholder height={16} />
							</Spacer>
							<Spacer>
								<Placeholder height={16} width="75%" />
							</Spacer>
						</NavigationStackScreen>
						<NavigationStackScreen>
							<Spacer>
								<Placeholder height={240}>
									<Text>3</Text>
								</Placeholder>
							</Spacer>
							<Spacer>
								<Placeholder height={32} />
							</Spacer>
							<Spacer>
								<Placeholder height={16} />
							</Spacer>
							<Spacer>
								<Placeholder height={16} width="50%" />
							</Spacer>
						</NavigationStackScreen>
					</NavigationStackScreens>
				</CardBody>
				<CardFooter justify="flex-end">
					<NavigationStackPrevious>Previous</NavigationStackPrevious>
					<NavigationStackNext>Next</NavigationStackNext>
				</CardFooter>
			</Card>
		</NavigationStack>
	);
};
