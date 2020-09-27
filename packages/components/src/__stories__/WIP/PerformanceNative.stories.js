import { Schema } from '@wp-g2/protokit';
import { css, styled, ui } from '@wp-g2/styles';
import React, { useState } from 'react';

export default {
	title: 'Examples/WIP/PerformanceNative',
};

const dimensionSchema = new Schema(() => ({
	title: '',
	x: 0,
	y: 1,
	z: 0,
}));

const SomeContext = React.createContext({});
const useSomeContext = () => React.useContext(SomeContext);

const OtherContext = React.createContext({});
const useOtherContext = () => React.useContext(OtherContext);

const SliderTextInput = React.memo(({ onChange, prop, value }) => {
	const { slider } = useSomeContext();
	const handleOnChange = React.useCallback(
		(next) => {
			onChange({ [prop]: next.target.value });
		},
		[onChange, prop],
	);

	return (
		<div>
			{slider && (
				<input onChange={handleOnChange} type="range" value={value} />
			)}
			<input onChange={handleOnChange} type="number" value={value} />
		</div>
	);
});

const TestFormGroup = React.memo(({ children, label }) => {
	const contextValue = React.useMemo(() => ({ slider: true }), []);
	return (
		<SomeContext.Provider value={contextValue}>
			<div>
				<div>
					<div>
						<label>
							{label}
							{children}
						</label>
					</div>
				</div>
			</div>
		</SomeContext.Provider>
	);
});

const DimensionCard = React.memo(({ id, onChange, title, x, y, z }) => {
	const updateTitle = React.useCallback(
		(next) => {
			onChange({ id, title: next.target.value });
		},
		[onChange, id],
	);

	const updateValue = React.useCallback(
		(next) => {
			onChange({ id, ...next });
		},
		[onChange, id],
	);

	return (
		<li>
			<h5>Dimensions</h5>
			<TestFormGroup label="Title">
				<input onChange={updateTitle} value={title} />
			</TestFormGroup>
			<TestFormGroup label="x">
				<SliderTextInput onChange={updateValue} prop="x" value={x} />
			</TestFormGroup>
			<TestFormGroup label="y">
				<SliderTextInput onChange={updateValue} prop="y" value={y} />
			</TestFormGroup>
			<TestFormGroup label="z">
				<SliderTextInput onChange={updateValue} prop="z" value={z} />
			</TestFormGroup>
		</li>
	);
});

const Example = () => {
	const [dimensions, setDimensions] = useState([...dimensionSchema.make(1)]);

	const addDimension = () => {
		setDimensions((prev) => [...prev, dimensionSchema.makeOne()]);
	};

	const updateDimension = React.useCallback((next) => {
		setDimensions((prev) =>
			prev.map((d) => {
				if (d.id !== next.id) return d;
				return {
					...d,
					...next,
				};
			}),
		);
	}, []);

	return (
		<>
			<button onClick={addDimension}>Add New</button>
			<OtherContext.Provider value={{ ok: true }}>
				<ul>
					{dimensions.map((item) => {
						return (
							<DimensionCard
								{...item}
								onChange={updateDimension}
							/>
						);
					})}
				</ul>
			</OtherContext.Provider>
		</>
	);
};

export const _default = () => {
	return <Example />;
};
