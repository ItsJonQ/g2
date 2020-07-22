import { connect } from '@wp-g2/provider';
import { useTheme } from '@wp-g2/styled-components';
import React from 'react';

import { BarsView, BarsWrapperView, ContainerView } from './Spinner.styles';
import { BASE_SIZE, WRAPPER_SIZE } from './Spinner.utils';

function Spinner({ color, className, size = BASE_SIZE, ...props }) {
	const { config, isDark } = useTheme();

	const ratio = size / BASE_SIZE;
	const scale = (ratio * BASE_SIZE) / WRAPPER_SIZE;
	const transform = `scale(${scale})`;

	const baseColor = isDark ? config.colorTextDark : config.colorText;
	const spinnerColor = color || baseColor;
	const styles = { transform };

	return (
		<ContainerView size={size} {...props}>
			<BarsWrapperView style={styles}>
				<BarsView spinnerColor={spinnerColor}>
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

export default connect(Spinner);
