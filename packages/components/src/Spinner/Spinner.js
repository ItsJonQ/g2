import { connect } from '@wp-g2/context';
import { get } from '@wp-g2/styles';
import React from 'react';

import { BarsView, BarsWrapperView, ContainerView } from './Spinner.styles';
import { BASE_SIZE, WRAPPER_SIZE } from './Spinner.utils';

function Spinner({
	color = get('colorText'),
	className,
	size = BASE_SIZE,
	...props
}) {
	const ratio = size / BASE_SIZE;
	const scale = (ratio * BASE_SIZE) / WRAPPER_SIZE;
	const transform = `scale(${scale})`;

	const styles = { transform };

	return (
		<ContainerView
			{...props}
			aria-busy={true}
			style={{ height: size, width: size }}
		>
			<BarsWrapperView aria-hidden={true} style={styles}>
				<BarsView style={{ color }}>
					<div className="InnerBar1" />
					<div className="InnerBar2" />
					<div className="InnerBar3" />
					<div className="InnerBar4" />
					<div className="InnerBar5" />
					<div className="InnerBar6" />
					<div className="InnerBar7" />
					<div className="InnerBar8" />
					<div className="InnerBar9" />
					<div className="InnerBar10" />
					<div className="InnerBar11" />
					<div className="InnerBar12" />
				</BarsView>
			</BarsWrapperView>
		</ContainerView>
	);
}

export default connect(Spinner, 'Spinner');
