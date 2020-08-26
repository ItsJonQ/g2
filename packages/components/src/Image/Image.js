import { connect } from '@wp-g2/context';
import { css } from '@wp-g2/styles';
import React from 'react';

import { AspectRatio } from '../AspectRatio';
import { ImageView } from './Image.styles';

function Image({ aspectRatio, fit, height, width, ...props }) {
	const sx = {};
	const aspectFit = aspectRatio && !fit ? 'cover' : fit;
	const preferredFit = aspectRatio ? aspectFit : fit;

	sx.base = css({
		width,
		height,
	});

	sx.fit = css({
		objectFit: preferredFit,
	});

	sx.fitSize = css({ height: '100%', width: '100%' });

	const cx = [sx.base, sx.fit, fit && sx.fitSize];

	const imageProps = {
		...props,
		cx,
		height,
		width,
	};

	if (aspectRatio) {
		return (
			<AspectRatio ratio={aspectRatio} width={width}>
				<ImageView {...imageProps} />
			</AspectRatio>
		);
	}

	return <ImageView {...imageProps} />;
}

export default connect(Image, 'Image');
