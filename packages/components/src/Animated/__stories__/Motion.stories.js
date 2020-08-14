import { ui } from '@wp-g2/styles';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';

import { Button, HStack, Spacer, View } from '../../index';
export default {
	title: 'Components/Motion',
};

/**
 * NOTE: THIS IS AN ATTEMPT TO CREATE A LIGHTWEIGHT ANIMATION SYSTEM.
 */

function getShallowDiffs(previous, next) {
	const diffs = Object.keys(previous).filter(
		(key) => previous[key] !== next[key],
	);

	const previousProps = diffs.reduce((previousProps, key) => {
		previousProps[key] = previous[key];
		return previousProps;
	}, {});

	const nextProps = diffs.reduce((nextProps, key) => {
		nextProps[key] = next[key];
		return nextProps;
	}, {});

	return { diffs, next: nextProps, previous: previousProps };
}

class Motion extends React.Component {
	static defaultProps = {
		duration: 0.3,
	};

	computedStyles = {};
	boundingBox = {};
	stylesToRender = {};
	snapshop = {};

	constructor(...args) {
		super(...args);
		this.nodeRef = React.createRef();
	}

	getNode = () => this.nodeRef.current;

	getComputedStyle = () => {
		if (this.getNode()) {
			return { ...window.getComputedStyle(this.getNode()) };
		}
		return {};
	};

	getBoundingBox = () => {
		if (this.getNode()) {
			return { ...this.getNode().getBoundingClientRect() };
		}
		return {};
	};

	componentDidMount() {
		this.computedStyles = this.getComputedStyle();
		this.boundingBox = this.getBoundingBox();

		if (this.props.initial) {
			this.renderStyles(this.props.initial);
			if (this.props.animate) {
				this.renderNextStyles(this.props.animate);
			}

			return;
		}

		if (this.props.animate) {
			this.renderStyles(this.props.animate);
		}
	}

	renderStyles = (styles) => {
		if (this.getNode()) {
			for (const [key, value] of Object.entries(styles)) {
				let finalValue = value;
				if (key === 'height' && value === 'auto') {
					finalValue = this.computedStyles.height;
				}
				this.getNode().style[key] = finalValue;
			}
		}
	};

	renderNextStyles = (styles) => {
		requestAnimationFrame(() => {
			this.getNode().style.transition = `all ${this.props.duration}s ease`;
			this.renderStyles(styles);
		});
	};

	getSnapshotBeforeUpdate() {
		return {
			boundingBox: this.getBoundingBox(),
			computedStyles: { ...this.getComputedStyle() },
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const currentComputedStyles = this.getComputedStyle();
		const { diffs, next, previous } = getShallowDiffs(
			snapshot.computedStyles,
			currentComputedStyles,
		);

		if (diffs.length) {
			const nextStyles = {};
			const prevStyles = {};

			for (const key of diffs) {
				const value = next[key];
				if (CSS.supports(key, value)) {
					prevStyles[key] = previous[key];
					nextStyles[key] = value;
				}
			}

			this.getNode().style.transition = null;
			this.renderStyles(prevStyles);

			this.stylesToRender = nextStyles;
			this.renderNextStyles(nextStyles);
		}

		if (this.props.animate) {
			const d = getShallowDiffs(prevProps.animate, this.props.animate);
			if (d.diffs.length) {
				this.renderNextStyles(this.props.animate);
			}
		}
	}

	handleOnTransitionEnd = (event) => {
		const styles = this.stylesToRender;

		if (this.getNode()) {
			for (const [key] of Object.entries(styles)) {
				this.getNode().style[key] = null;
			}

			if (this.props.animate) {
				for (const [key, value] of Object.entries(this.props.animate)) {
					if (key === 'height' && value === 'auto') {
						this.getNode().style[key] = null;
					}
				}
			}
		}

		this.getNode().style.transition = null;

		this.stylesToRender = {};
	};

	render() {
		return (
			<View
				{...this.props}
				onTransitionEnd={this.handleOnTransitionEnd}
				ref={this.nodeRef}
			/>
		);
	}
}

const itemSchema = new Schema(() => ({
	id: faker.random.uuid(),
	name: faker.name.firstName(),
}));

const Example = () => {
	const [items, setItems] = useState(itemSchema.make(5));
	const [active, setActive] = useState(false);

	const remove = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const add = () => {
		setItems([itemSchema.makeOne(), ...items]);
	};

	return (
		<View
			css={{
				margin: '20px auto',
				width: 300,
			}}
		>
			<Spacer>
				<HStack alignment="edge">
					<Button onClick={add}>Add</Button>
					<Button onClick={() => setActive(!active)}>Toggle</Button>
				</HStack>
			</Spacer>
			{items.map((item) => (
				<Motion
					animate={{
						height: 'auto',
					}}
					initial={{
						height: 0,
						overflow: 'hidden',
					}}
					key={item.id}
					onClick={() => remove(item.id)}
				>
					<Motion
						animate={{ padding: active ? '30px' : '10px' }}
						css={[
							ui.font.default,
							ui.background.green,
							ui.hover(ui.background.red),
						]}
					>
						{item.name}
					</Motion>
				</Motion>
			))}
		</View>
	);
};

export const _default = () => (
	<>
		<Example />
	</>
);
