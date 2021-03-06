---
title: Image
type: images
description: 'Image a core component that renders images in the library.'
slug: /components/image/
keywords: ['image', 'aspect', 'ratio', 'responsive', 'media']
---

# Image

`Image` is a core component that renders images in the library.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Usage](#usage)
-   [Props](#props)
-   [See Also](#see-also)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- Automatically Generated. DO NOT EDIT THIS FILE. -->
<!-- Instead, edit packages/website/src/docs/components/core/image.mdx -->

<!-- props -->

<!-- Automatically Generated -->

## Usage

`Image` can be used just like a regular HTML `img`. However, unlike the HTML `img`, the `Image` core component is responsive **by default**.

```jsx live
import { Image } from '@wp-g2/components';

function Example() {
	return (
		<Image
			src="https://picsum.photos/seed/picsum/800/800"
			alt="Snowy Mountains"
			width={300}
			height={300}
		/>
	);
}
```

## Props

##### aspectRatio

**Type**: `number`

The `Image` width:height aspect ratio can be customized, rendering the content in an `AspectRatio`. If an `aspectRatio` is used, `Image` will default to a `fit` of `cover`.

```jsx live
import { Image } from '@wp-g2/components';

function Example() {
	return (
		<Image
			src="https://picsum.photos/seed/picsum/800/800"
			alt="Snowy Mountains"
			aspectRatio={21 / 9}
		/>
	);
}
```

##### fit

**Type**: `CSS['objectFit']`

Resizes the image to fit a container, using CSS [`object-fit`](https:*developer.mozilla.org/en-US/docs/Web/CSS/object-fit).

-   `contain`: Resizes image to fit the container box, while maintaining it's aspect ratio.
-   `cover`: Resizes image to fill the container box, while maintaining it's aspect ratio.
-   `fill`: Resizes image to fill the container box.
-   `none`: Image will not be resized.
-   `scale-down`: Image will be sized as if none or contain were specified.

##### height

**Type**: `CSS['height']`

The image height.

##### width

**Type**: `CSS['width']`

The image width.

<!-- /Automatically Generated -->
<!-- /props -->

## See Also

-   [Text](../text/)
-   [AspectRatio](../aspectratio/)
