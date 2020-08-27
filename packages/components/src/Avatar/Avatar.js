import { connect } from '@wp-g2/context';
import { css, get, ns } from '@wp-g2/styles';
import { ui } from '@wp-g2/styles';
import React, { useState } from 'react';

import { Image } from '../Image';
import { Initials } from '../Initials';
import { View } from '../View';
import { AvatarView } from './Avatar.styles';
import * as styles from './Avatar.styles';
import { getBorderRadius, getInitialsTextSize, getSize } from './Avatar.utils';

function Avatar({
	animateOnImageLoad = true,
	border = false,
	color = get('lightGray500'),
	name,
	shape = 'circle',
	size: sizeProp = 'medium',
	src,
	...props
}) {
	const [imageLoaded, setImageLoaded] = useState(!animateOnImageLoad);
	const size = getSize(sizeProp);
	const borderRadius = getBorderRadius(shape, size);
	const textSize = getInitialsTextSize(size);

	const shouldRenderInitials = !!name;

	// Gracefully fades the Avatar image in
	const handleOnImageLoad = () => setImageLoaded(true);

	const sx = {};

	sx.base = css({
		background: color,
		width: size,
		height: size,
	});

	sx.borderRadius = css({
		borderRadius,
	});

	const cx = [sx.base, sx.borderRadius, border && styles.border];
	return (
		<AvatarView {...props} cx={cx}>
			{shouldRenderInitials && (
				<View css={[ui.position.absolute, ui.alignment.center]}>
					<Initials
						{...ns('AvatarInitials')}
						align="center"
						as="div"
						lineHeight={1}
						name={name}
						optimizeReadabilityFor={color}
						size={textSize}
					/>
				</View>
			)}
			{src && (
				<Image
					{...ns('AvatarImage')}
					alt={name}
					aspectRatio={1}
					css={[
						{
							borderRadius,
							// Prevents image clipping from revealing background colour
							transform: 'scale(1.025)',
						},
						ui.opacity(imageLoaded ? 1 : 0),
						ui.animation.default,
					]}
					onLoad={handleOnImageLoad}
					src={src}
				/>
			)}
		</AvatarView>
	);
}

export default connect(Avatar, 'Avatar');
