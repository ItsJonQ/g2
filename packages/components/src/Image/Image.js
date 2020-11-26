import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { AspectRatio } from '../AspectRatio';
import { ImageView } from './Image.styles';

function Image(props, forwardedRef) {
	const {
		aspectRatio,
		className,
		fit,
		height,
		width,
		...otherProps
	} = useContextSystem(props, 'Image');
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

	const classes = cx(sx.base, sx.fit, fit && sx.fitSize, className);

	const imageProps = {
		...otherProps,
		className: classes,
		height,
		width,
		ref: forwardedRef,
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

export default contextConnect(Image, 'Image');
