# G2 ✌️

> An experimental component system.

The project is a from-scratch reimagining of `@wordpress/components` to accommodate the ever-growing and ever-expressive needs of the Editor and the platform. The ultimate goal is to provide a first class workflow to empower developers and designers (both core and 3rd party) to create cohesive, robust, and delightful user interfaces.

These components (and their sub-systems) have been uniquely developed to meet the need of integrating seamless into Gutenberg and WordPress. The UI's native-like aesthetic also allows them to be easily customized used outside of the Editor - potentially for 3rd party WordPress plugins and beyond!

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Getting Started](#getting-started)
-   [Goals](#goals)
    -   [Design + Developer Experience (DX)](#design--developer-experience-dx)
    -   [Native support and considerations for a11y](#native-support-and-considerations-for-a11y)
    -   [Seamless integration into existing systems](#seamless-integration-into-existing-systems)
-   [Open for Feedback](#open-for-feedback)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

Install all the dependencies by running:

```
yarn
```

Then, fire up the local dev environment (Storybook) by running:

```
yarn start
```

## Goals

There are several core values that drive everything in this project:

-   Design + Developer Experience
-   Native support and considerations for a11y
-   Seamless integration into existing systems

### Design + Developer Experience (DX)

Everything by way of workflows should recognize and prioritize design and developer experience - considering the folks working directly on the project, as well as folks using and modifying parts of the project. Having superior DX enables newer contributors and users to work with the project and it's systems.

### Native support and considerations for a11y

Considerations for a11y should be inherent to the core system. This ensures that a11y works consistently throughout the entire project. Implementation should feel mostly "invisible" at the component (code) layer.

### Seamless integration into existing systems

Developers should be able to **reliably** use any/all parts of the system within existing projects (like Gutenberg, WordPress WP-Admin, or anything else) with minimal integration/build-system effort. The project's component should function and render perfectly out-of-the-box.

Ultimately, the goal of this project is to derive useful UI features and/or architecture patterns and workflows to improve the experience of WordPress [Gutenberg](https://github.com/WordPress/gutenberg).

## Open for Feedback

This project provides a space for in-depth research and experimentation. It is totally open for thoughts and feedback!
