import {
	Button,
	Checkbox,
	Container,
	FormGroup,
	Grid,
	HStack,
	Spacer,
	Subheading,
	Switch,
	Text,
	View,
	VStack,
} from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { ContextSystemProvider, useContextSystem } from '../index';

export default {
	component: ContextSystemProvider,
	title: 'Context/ContextSystemProvider/Layers',
};

const Test = () => {
	const { version } = useContextSystem({}, 'WPComponentsButton');

	return <Subheading>{version}</Subheading>;
};

const Layer = ({
	children,
	isActive = false,
	isEnabled = false,
	label = 'Layer 1',
}) => {
	let nextValue = isActive
		? {
				WPComponentsButton: { version: 'next' },
		  }
		: {
				WPComponentsButton: { version: 'current' },
		  };

	if (!isEnabled) {
		nextValue = {};
	}

	if (!isEnabled && isActive) {
		nextValue = {
			WPComponentsButton: { version: 'current' },
		};
	}

	return (
		<ContextSystemProvider value={nextValue}>
			<View css={[{ border: '1px solid #ddd' }]}>
				<VStack>
					<Text>{label}</Text>
					<Test />
					<View>{children}</View>
				</VStack>
			</View>
		</ContextSystemProvider>
	);
};

function App() {
	const [versions, setVersions] = React.useState({
		layer1: false,
		layer2: false,
		layer3: false,
		layer4: false,
		layer5: false,
	});

	const [enabled, setEnabled] = React.useState({
		layer1: false,
		layer2: false,
		layer3: false,
		layer4: false,
		layer5: false,
	});

	const handleOnChange = (key) => (value) =>
		setVersions((prev) => ({ ...prev, [key]: value }));

	const handleOnChangeEnabled = (key) => (value) => {
		setEnabled((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className="App">
			<Container>
				<Spacer mb={8}>
					<Grid columns={5} css={{ width: '70%' }} gap={8}>
						<FormGroup label="Sidebar Section">
							<Checkbox
								checked={enabled.layer5}
								label="Enable"
								onChange={handleOnChangeEnabled('layer5')}
							/>
							{enabled.layer5 && (
								<FormGroup
									horizontal
									label="Activate"
									templateColumns="1fr 60px"
								>
									<Switch
										checked={versions.layer5}
										disabled={!enabled.layer5}
										onChange={handleOnChange('layer5')}
									/>
								</FormGroup>
							)}
						</FormGroup>
						<FormGroup label="Sidebar">
							<Checkbox
								checked={enabled.layer4}
								label="Enable"
								onChange={handleOnChangeEnabled('layer4')}
							/>
							{enabled.layer4 && (
								<FormGroup
									horizontal
									label="Activate"
									templateColumns="1fr 60px"
								>
									<Switch
										checked={versions.layer4}
										disabled={!enabled.layer4}
										onChange={handleOnChange('layer4')}
									/>
								</FormGroup>
							)}
						</FormGroup>
						<FormGroup label="Content">
							<Checkbox
								checked={enabled.layer3}
								label="Enable"
								onChange={handleOnChangeEnabled('layer3')}
							/>
							{enabled.layer3 && (
								<FormGroup
									horizontal
									label="Activate"
									templateColumns="1fr 60px"
								>
									<Switch
										checked={versions.layer3}
										disabled={!enabled.layer3}
										onChange={handleOnChange('layer3')}
									/>
								</FormGroup>
							)}
						</FormGroup>
						<FormGroup label="Nav menu">
							<Checkbox
								checked={enabled.layer2}
								label="Enable"
								onChange={handleOnChangeEnabled('layer2')}
							/>
							{enabled.layer2 && (
								<FormGroup
									horizontal
									label="Activate"
									templateColumns="1fr 60px"
								>
									<Switch
										checked={versions.layer2}
										disabled={!enabled.layer2}
										onChange={handleOnChange('layer2')}
									/>
								</FormGroup>
							)}
						</FormGroup>
						<FormGroup label="App">
							<Checkbox
								checked={enabled.layer1}
								label="Enable"
								onChange={handleOnChangeEnabled('layer1')}
							/>
							{enabled.layer1 && (
								<FormGroup
									horizontal
									label="Activate"
									templateColumns="1fr 60px"
								>
									<Switch
										checked={versions.layer1}
										disabled={!enabled.layer1}
										onChange={handleOnChange('layer1')}
									/>
								</FormGroup>
							)}
						</FormGroup>
					</Grid>
				</Spacer>
				<Layer
					isActive={versions.layer1}
					isEnabled={enabled.layer1}
					label="App"
				>
					<HStack>
						<Button>Button</Button>
						<Button>Button</Button>
						<Button>Button</Button>
					</HStack>
					<Grid templateColumns="1fr 3fr 1fr">
						<Layer
							isActive={versions.layer2}
							isEnabled={enabled.layer2}
							label="Nav Menu"
						>
							<VStack>
								<Button>Button</Button>
								<Button>Button</Button>
								<Button>Button</Button>
							</VStack>
						</Layer>
						<Layer
							isActive={versions.layer3}
							isEnabled={enabled.layer3}
							label="Content Area"
						>
							<HStack>
								<Button>Button</Button>
								<Button>Button</Button>
								<Button>Button</Button>
							</HStack>
						</Layer>
						<Layer
							isActive={versions.layer4}
							isEnabled={enabled.layer4}
							label="Sidebar"
						>
							<VStack>
								<Button>Button</Button>
								<Button>Button</Button>
								<Button>Button</Button>
							</VStack>
							<Layer
								isActive={versions.layer5}
								isEnabled={enabled.layer5}
								label="Sidebar Section"
							>
								<VStack>
									<Button>Button</Button>
									<Button>Button</Button>
									<Button>Button</Button>
								</VStack>
							</Layer>
						</Layer>
					</Grid>
				</Layer>
			</Container>
		</div>
	);
}

export const _default = () => <App />;
