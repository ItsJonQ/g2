import { ComponentsProvider, connect } from '@wp-g2/context';
import { ns } from '@wp-g2/context';
import { FiChevronRight, FiChrome, FiCompass } from '@wp-g2/icons';
import { get, styled, ui } from '@wp-g2/styles';
import { useLocalState } from '@wp-g2/utils';
import React from 'react';

import {
	Button,
	ColorControl,
	Container,
	FormGroup,
	Grid,
	Heading,
	HStack,
	Icon,
	ListGroup,
	ListGroupFooter,
	ListGroupHeader,
	ListGroups,
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

const selector = (target) => {
	const key = Object.keys(ns());
	const n = ns(target);

	return `[${key}="${n[key]}"]`;
};

const SpacingVisualizerView = styled.div`
	${selector('GridItem')} {
		${selector('Container')} {
			position: relative;

			&::before {
				width: 12px;
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				background: blue;
				opacity: 0.05;
				z-index: 1;
			}
		}
	}

	${selector('VStack')},
	${selector('ListGroup')} {
		> * {
			position: relative;
			&::before {
				background: pink;
				bottom: calc(${get('HStackSpacing')} * -1);
				content: '';
				height: ${get('HStackSpacing')};
				left: 0;
				opacity: 0.15;
				pointer-events: none;
				position: absolute;
				right: 0;
				z-index: 1;
			}

			&:last-child {
				&::before {
					display: none;
				}
			}
		}
	}
	${selector('HStack')} {
		> * {
			position: relative;
			&::before {
				background: pink;
				right: calc(${get('HStackSpacing')} * -1);
				content: '';
				height: ${get('HStackSpacing')};
				top: 0;
				bottom: 0;
				opacity: 0.15;
				pointer-events: none;
				position: absolute;
				z-index: 1;
			}

			&:last-child {
				&::before {
					display: none;
				}
			}
		}
	}
`;

const SpacingVisualizer = ({ children, visualize }) => {
	if (!visualize) return children;
	return <SpacingVisualizerView>{children}</SpacingVisualizerView>;
};

const BaseGridItem = ({ children, ...props }) => {
	return (
		<Surface
			border
			css={[ui.frame.height('100%'), ui.padding(4)]}
			{...props}
		>
			<Container width={300}>{children}</Container>
		</Surface>
	);
};

const GridItem = connect(BaseGridItem, 'GridItem');

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
			css={[ui.padding.x(1)]}
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
			<ListGroups>
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
				<ListGroup>
					<ListGroupHeader>
						Title
						<Button>Thing</Button>
					</ListGroupHeader>
					<Grid>
						<FormGroup label="Action">
							<Switch />
						</FormGroup>
						<FormGroup label="Action">
							<Switch />
						</FormGroup>
						<FormGroup label="Action">
							<Switch />
						</FormGroup>
						<FormGroup label="Action">
							<Switch />
						</FormGroup>
						<FormGroup label="Action">
							<Switch />
						</FormGroup>
					</Grid>
				</ListGroup>

				<ListGroup>
					<ListGroupHeader>Title</ListGroupHeader>
					<ListItem prefix={<Icon icon={<FiChrome />} />}>
						<Text>Action</Text>
					</ListItem>
					<ListItem prefix={<Icon icon={<FiCompass />} />}>
						<Text>Action</Text>
					</ListItem>
					<ListItem prefix={<View css={{ width: 20 }} />}>
						<Text>Action</Text>
					</ListItem>
				</ListGroup>

				<ListGroup separator={false}>
					<ListGroupHeader>Title</ListGroupHeader>
					<ListItem prefix={<Icon icon={<FiChrome />} />}>
						<Text>Action</Text>
					</ListItem>
					<ListItem prefix={<Icon icon={<FiCompass />} />}>
						<Text>Action</Text>
					</ListItem>
					<ListGroupFooter>Some footer caption</ListGroupFooter>
				</ListGroup>
			</ListGroups>
		</GridItem>
	);
};

const AllTheThings = () => {
	const [visualize, setVisualize] = useLocalState(
		'WIP/ListGroups/SpacingVisualizer',
		false,
	);
	return (
		<>
			<Spacer mb={5}>
				<HStack>
					<Heading size={1}>Testing: Control Clusters</Heading>
					<FormGroup isInline label="Show Visualizer">
						<Switch checked={visualize} onChange={setVisualize} />
					</FormGroup>
				</HStack>
			</Spacer>
			<SpacingVisualizer visualize={visualize}>
				<Grid align="flex-start" columns={[1, 2, 4]} gap={5}>
					<ExampleCluster />
					<ExampleCluster horizontal={false} />
					<ExampleCluster2 />
				</Grid>
			</SpacingVisualizer>
		</>
	);
};

export const _default = () => {
	return <AllTheThings />;
};
