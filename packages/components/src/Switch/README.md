---
title: Switch
type: forms
description: '`Switch` is a form component that toggles a checked (on/off) state.'
slug: /components/switch/
keywords: ['switch', 'form control', 'input', 'toggle', 'check', 'checbox']
---

# Switch

`Switch` is a form component that toggles a checked (on/off) state.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Usage](#usage)
-   [Props](#props)
-   [See Also](#see-also)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- Automatically Generated. DO NOT EDIT THIS FILE. -->
<!-- Instead, edit packages/website/src/docs/components/forms/switch.mdx -->

<!-- props -->

<!-- Automatically Generated -->

## Usage

```jsx live
import React from `react`;
import { Switch } from '@wp-g2/components';

function Example() {
	 const [on, setOn] = React.useState(true);

  return <Switch checked={on} onChange={setOn} />
}
```

## Props

##### checked

**Type**: `boolean`

The checked (on/off) state of `Switch`.

##### defaultValue

**Type**: `boolean`

The default (initial) state to use if `value` is undefined.

##### disabled

**Type**: `boolean`

Determines if element is disabled.

##### label

**Type**: `string`

Label for the form element.

##### onChange

**Type**: `Function`

Callback function when the `value` is changed.

##### size

**Type**: `"large"`,`"medium"`,`"small"`

Determines the size of `Switch`.

##### type

**Type**: `"checkbox"`,`"radio"`

Renders as a checkbox input or a radio input.

##### value

**Type**: `any`

Value for the form element.

<!-- /Automatically Generated -->
<!-- /props -->

## See Also

-   [TextInput](../textinput/)
