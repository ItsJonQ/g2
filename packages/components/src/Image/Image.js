import { connect } from '@wp-g2/context';
import { css } from '@wp-g2/styles';
import React from 'react';

import { AspectRatio } from '../AspectRatio';
import { ImageView } from './Image.styles';
import { getImageObjectFit } from './Image.utils';

function Image({ aspectRatio, fit, height, width, ...props }) {
	const objectFit = getImageObjectFit(fit);
	let cx = [css({ objectFit, width, height })];

	const imageProps = {
		...props,
		height,
		width,
	};

	if (objectFit) {
		cx = [css({ objectFit, width: '100%', height: '100%' })];
	}

	if (aspectRatio) {
		if (!fit) {
			cx = [
				...cx,
				css({ objectFit: 'cover', height: '100%', width: '100%' }),
			];
		}

		return (
			<AspectRatio ratio={aspectRatio} width={width}>
				<ImageView {...imageProps} cx={cx} />
			</AspectRatio>
		);
	}

	return <ImageView {...imageProps} cx={cx} />;
}

export default connect(Image, 'Image');
