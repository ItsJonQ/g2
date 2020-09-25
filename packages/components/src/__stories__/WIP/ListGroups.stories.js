import { connect, ContextSystemProvider, ns } from '@wp-g2/context';
import { FiChrome, FiCompass } from '@wp-g2/icons';
import { styled, ThemeProvider, ui } from '@wp-g2/styles';
import { useLocalState } from '@wp-g2/utils';
import React, { useState } from 'react';

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
	MenuItem,
	NavigatorLink,
	SegmentedControl,
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
				pointer-events: none;
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
				bottom: calc(${ui.get('HStackSpacing')} * -1);
				content: '';
				height: ${ui.get('HStackSpacing')};
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
				right: calc(${ui.get('HStackSpacing')} * -1);
				content: '';
				height: ${ui.get('HStackSpacing')};
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
			variant="tertiary"
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
			<ContextSystemProvider value={{ FormGroup: { horizontal } }}>
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
			</ContextSystemProvider>
		</GridItem>
	);
};

const ExampleCluster2 = (props) => {
	return (
		<ListGroups {...props}>
			<ListGroup>
				<ListGroupHeader>
					Title
					<Button size="xSmall" variant="tertiary">
						Edit
					</Button>
				</ListGroupHeader>
				<Grid columns={[1, 2]}>
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

			<ListGroup separator={false}>
				<ListGroupHeader>Title</ListGroupHeader>
				<NavigatorLink href="#" isBack>
					<MenuItem prefix={<Icon icon={<FiChrome />} />}>
						<VStack spacing={0}>
							<Text>Action</Text>
							<Text size="caption">Help text.</Text>
						</VStack>
					</MenuItem>
				</NavigatorLink>
				<NavigatorLink href="#">
					<MenuItem prefix={<Icon icon={<FiCompass />} />}>
						Action
					</MenuItem>
				</NavigatorLink>
				<FormGroup label="Title">
					<TextInput placeholder="Some Title" />
				</FormGroup>
				<NavigatorLink href="#">
					<MenuItem
						as="button"
						prefix={<Icon icon={<FiCompass />} />}
						suffix={
							<Text isBlock size="caption">
								Detail
							</Text>
						}
					>
						Action
					</MenuItem>
				</NavigatorLink>
				<NavigatorLink href="#">
					<MenuItem
						as="button"
						suffix={
							<Text isBlock size="caption">
								Detail
							</Text>
						}
					>
						Action
					</MenuItem>
				</NavigatorLink>
				<MenuItem
					as="button"
					suffix={
						<Text isBlock size="caption">
							Detail
						</Text>
					}
				>
					Action
				</MenuItem>
				<ListGroupFooter>Some footer caption</ListGroupFooter>
			</ListGroup>
		</ListGroups>
	);
};

const AllTheThings = () => {
	const [visualize, setVisualize] = useLocalState(
		'WIP/ListGroups/SpacingVisualizer',
		false,
	);
	const [gridBase, setGridBase] = useState(4);

	return (
		<ThemeProvider theme={{ gridBase: ui.value.px(gridBase) }}>
			<Spacer mb={5}>
				<HStack>
					<Heading size={1}>ListGroup Examples</Heading>
					<FormGroup isInline label="Grid Base">
						<SegmentedControl
							onChange={setGridBase}
							options={[
								{ value: 2, label: '2px' },
								{ value: 4, label: '4px' },
								{ value: 6, label: '6px' },
								{ value: 8, label: '8px' },
								{ value: 10, label: '10px' },
								{ value: 12, label: '12px' },
							]}
							value={gridBase}
						/>
					</FormGroup>
					<FormGroup isInline label="Show Visualizer">
						<Switch checked={visualize} onChange={setVisualize} />
					</FormGroup>
				</HStack>
			</Spacer>
			<SpacingVisualizer visualize={visualize}>
				<Grid align="flex-start" columns={[1, 2, 4]} gap={5}>
					<ExampleCluster />
					<ExampleCluster horizontal={false} />
					<GridItem>
						<ExampleCluster2 />
					</GridItem>
					<GridItem css={[ui.background.secondary]}>
						<ExampleCluster2 inset />
					</GridItem>
				</Grid>
			</SpacingVisualizer>
		</ThemeProvider>
	);
};

export const _default = () => {
	return <AllTheThings />;
};
