import { ComponentsProvider } from '@wp-g2/context';
import { FiChevronRight, FiChrome, FiCompass } from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import React from 'react';

import {
	Button,
	ColorControl,
	Container,
	Divider,
	FormGroup,
	Grid,
	Heading,
	HStack,
	Icon,
	Spacer,
	Subheading,
	Surface,
	Switch,
	Text,
	TextInput,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/ListGroups',
};

const GridItem = ({ children }) => {
	return (
		<Surface border css={[ui.frame.height('100%'), ui.padding(4)]}>
			<Container width={300}>{children}</Container>
		</Surface>
	);
};

const ExampleCluster = ({ horizontal = true }) => {
	return (
		<GridItem>
			<ComponentsProvider value={{ FormGroup: { horizontal } }}>
				<VStack spacing={8}>
					<View>
						<Spacer>
							<Subheading>Site</Subheading>
						</Spacer>
						<VStack>
							<FormGroup label="Title">
								<TextInput placeholder="Some Title" />
							</FormGroup>
							<FormGroup label="Description">
								<TextInput
									minRows={3}
									multiline
									placeholder="Description..."
								/>
							</FormGroup>
							<FormGroup label="Socials">
								<Grid columns={2}>
									<TextInput placeholder="Twitter" />
									<TextInput placeholder="Instagram" />
								</Grid>
							</FormGroup>
							<FormGroup label="Base Colors">
								<Grid columns={2}>
									<ColorControl color="black">
										Text
									</ColorControl>
									<ColorControl color="#ddd">
										Background
									</ColorControl>
								</Grid>
							</FormGroup>
							<FormGroup label="Mobile Zoom">
								<Switch />
							</FormGroup>
						</VStack>
					</View>
					<View>
						<Spacer>
							<Subheading>Colors</Subheading>
						</Spacer>
						{!horizontal ? (
							<VStack>
								<ColorControl color="black">Text</ColorControl>
								<ColorControl color="#ddd">
									Background
								</ColorControl>
								<ColorControl color="#0f5">
									Primary
								</ColorControl>
								<ColorControl color="#0ff">Accent</ColorControl>
							</VStack>
						) : (
							<Grid>
								<ColorControl color="black">Text</ColorControl>
								<ColorControl color="#ddd">
									Background
								</ColorControl>
								<ColorControl color="#0f5">
									Primary
								</ColorControl>
								<ColorControl color="#0ff">Accent</ColorControl>
							</Grid>
						)}
					</View>
				</VStack>
			</ComponentsProvider>
		</GridItem>
	);
};

const ListItem = ({ children, ...props }) => {
	return (
		<Button
			css={[
				ui.margin.x(`-5px`),
				ui.padding.x(1),
				{ width: `calc(100% + 10px)` },
			]}
			isBlock
			suffix={
				<Text isBlock variant="muted">
					<Icon
						color="currentColor"
						icon={<FiChevronRight />}
						size={20}
					/>
				</Text>
			}
			textAlign="left"
			variant="tertiary"
			{...props}
		>
			{children}
		</Button>
	);
};

const ExampleCluster2 = () => {
	return (
		<GridItem>
			<VStack spacing={8}>
				<View>
					<Spacer>
						<Subheading>Title</Subheading>
					</Spacer>
					<VStack>
						<ListItem>
							<Text>Action</Text>
						</ListItem>
						<ListItem>
							<Text>Action</Text>
						</ListItem>
					</VStack>
				</View>
				<View>
					<Spacer>
						<Subheading>Title</Subheading>
					</Spacer>
					<VStack spacing={1}>
						<ListItem>
							<Text>Action</Text>
						</ListItem>
						<Divider />
						<ListItem>
							<Text>Action</Text>
						</ListItem>
						<Divider />
						<FormGroup label="Action">
							<Switch />
						</FormGroup>
					</VStack>
				</View>
				<View>
					<Spacer>
						<Subheading>Title</Subheading>
					</Spacer>
					<VStack spacing={1}>
						<ListItem prefix={<Icon icon={<FiChrome />} />}>
							<Text>Action</Text>
						</ListItem>
						<Divider />
						<ListItem prefix={<Icon icon={<FiCompass />} />}>
							<Text>Action</Text>
						</ListItem>
						<Divider />
						<ListItem prefix={<View css={{ width: 20 }} />}>
							<Text>Action</Text>
						</ListItem>
					</VStack>
				</View>

				<View>
					<Spacer>
						<HStack>
							<Subheading>Title</Subheading>
							<Button size="small" variant="tertiary">
								Edit
							</Button>
						</HStack>
					</Spacer>
					<VStack spacing={1}>
						<ListItem prefix={<Icon icon={<FiChrome />} />}>
							<Text>Action</Text>
						</ListItem>
						<Divider />
						<ListItem prefix={<Icon icon={<FiCompass />} />}>
							<Text>Action</Text>
						</ListItem>
						<Divider />
					</VStack>
				</View>
			</VStack>
		</GridItem>
	);
};

export const _default = () => {
	return (
		<>
			<Spacer mb={5}>
				<Heading size={1}>Testing: Control Clusters</Heading>
			</Spacer>
			<Grid align="flex-start" columns={[1, 2, 4]} gap={5}>
				<ExampleCluster />
				<ExampleCluster horizontal={false} />
				<ExampleCluster2 />
			</Grid>
		</>
	);
};
