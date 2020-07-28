import { ComponentsProvider } from '@wp-g2/provider';
import { get } from '@wp-g2/styles';
import React from 'react';
import {
	FiAlignCenter,
	FiAlignLeft,
	FiAlignRight,
	FiMaximize,
	FiSquare,
} from 'react-icons/fi';

import {
	BaseView,
	ControlLabel,
	Grid,
	Heading,
	Icon,
	SegmentedControl,
	Spacer,
	Text,
	TextInput,
} from '../index';

export default {
	title: 'Example/Controls',
};

const SuffixLabel = (props) => (
	<Text isBlock size={10} variant="muted" {...props} />
);

const ControlGroup = (props) => <Grid templateColumns={'33% 66%'} {...props} />;

export const _default = () => {
	return (
		<ComponentsProvider
			value={{
				ControlLabel: { size: 'small' },
				Grid: { gap: 8 },
				Icon: { size: 16 },
				TextInput: { size: 'small' },
			}}
		>
			<BaseView
				css={`
					width: 280px;
					position: absolute;
					height: 100%;
					top: 0;
					right: 0;
					border-left: 1px solid ${get('surfaceBorderColor')};
					padding: 16px;
				`}
			>
				<Spacer mb={3}>
					<Heading size={5}>Layout</Heading>
				</Spacer>

				<ControlGroup>
					<ControlLabel>Dimensions</ControlLabel>
					<Spacer>
						<Grid columns={2}>
							<TextInput suffix={<SuffixLabel>W</SuffixLabel>} />
							<TextInput suffix={<SuffixLabel>H</SuffixLabel>} />
						</Grid>
					</Spacer>
				</ControlGroup>

				<ControlGroup>
					<ControlLabel>Align</ControlLabel>
					<Spacer>
						<SegmentedControl
							isBlock
							options={[
								{
									label: <Icon icon={<FiAlignLeft />} />,
									value: 'left',
								},
								{
									label: <Icon icon={<FiAlignCenter />} />,
									value: 'center',
								},
								{
									label: <Icon icon={<FiAlignRight />} />,
									value: 'right',
								},
							]}
						/>
					</Spacer>
				</ControlGroup>

				<ControlGroup>
					<ControlLabel>Position</ControlLabel>
					<Spacer>
						<Grid columns={2}>
							<TextInput suffix={<SuffixLabel>X</SuffixLabel>} />
							<TextInput suffix={<SuffixLabel>Y</SuffixLabel>} />
						</Grid>
					</Spacer>
				</ControlGroup>

				<ControlGroup>
					<ControlLabel>Padding</ControlLabel>
					<Spacer>
						<Grid columns={2}>
							<TextInput suffix={<SuffixLabel>PX</SuffixLabel>} />
							<SegmentedControl
								isBlock
								options={[
									{
										label: <Icon icon={<FiSquare />} />,
										value: 'all',
									},
									{
										label: <Icon icon={<FiMaximize />} />,
										value: 'sides',
									},
								]}
							/>
						</Grid>
					</Spacer>
				</ControlGroup>
			</BaseView>
		</ComponentsProvider>
	);
};
