# G2 ✌️

[![npm version](https://badge.fury.io/js/%40wp-g2%2Fcomponents.svg)](https://badge.fury.io/js/%40wp-g2%2Fcomponents)
[![CI Workflow](https://github.com/itsjonq/g2/workflows/ci/badge.svg)](https://github.com/ItsJonQ/g2/actions?query=workflow%3Aci)

> An experimental component system.

**📚 Check out the Storybook**

https://g2-components.xyz/?path=/story/

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
-   [Thinking in Systems](#thinking-in-systems)
-   [Start Prototyping](#start-prototyping)
    -   [CodeSandbox](#codesandbox)
    -   [Create React App](#create-react-app)
    -   [Gatsby](#gatsby)
    -   [Next.js](#nextjs)
    -   [Video Tutorial](#video-tutorial)
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

Considerations for a11y should be inherent to the core system. This ensures that a11y works consistently throughout the entire project. Adding a11y on top often leads to inconsistencies, fragmentation,and regressions. This should be avoided. Implementation should feel mostly "invisible" at the component (code) layer.

### Seamless integration into existing systems

Developers should be able to **reliably** use any/all parts of the system within existing projects (like Gutenberg, WordPress WP-Admin, or anything else) with minimal integration/build-system effort. The project's component should function and render perfectly out-of-the-box.

Ultimately, the goal of this project is to derive useful UI features and/or architecture patterns and workflows to improve the experience of WordPress [Gutenberg](https://github.com/WordPress/gutenberg).

## Thinking in Systems

The primary strategy to achieving the goals outlined above is to craft the (many) moving parts using a series of systems.

To help visualize the various systems and mechanics at flow, I've illustrated a flow chart for an example `<Alert />` component.

Like this one:

<img width="505" alt="Screen Shot 2020-08-06 at 7 45 21 PM" src="https://user-images.githubusercontent.com/2322354/89593516-60542580-d81d-11ea-9807-7d404d8de931.png">

Here it is!

![IMG_0457](https://user-images.githubusercontent.com/2322354/89593533-6813ca00-d81d-11ea-8c3e-28bfbc377e9b.png)

There are 4 main systems which are represented by a colour:

-   Systems (Yellow)
-   Context (Blue)
-   A11Y (Pink)
-   Animations (Green)

The arrows that link the topics/keywords are colour coded to match their respective system.

[Click here](https://github.com/ItsJonQ/g2/issues/3) for more details about the core systems in this project.

## Start Prototyping

Start experiencing the new (experimental) G2 Components project with this starter kit!

### CodeSandbox

To get started with the CodeSandbox template, click on the link below:

[https://codesandbox.io/s/g2-prototype-sandbox-8ose4?file=/src/App.js](https://codesandbox.io/s/g2-prototype-sandbox-8ose4?file=/src/App.js)

### Create React App

To get started with a Create React App experience, run the following code in your Terminal:

```
npx create-react-app my-app --template @wp-g2/cra-template-protokit
```

### Gatsby

To get started with a Gatsby experience, run the following code in your Terminal:

```
npx gatsby new my-site https://github.com/itsjonq/gatsby-starter-g2
```

For more details, check out the [Gatsby G2 starter](https://github.com/ItsJonQ/gatsby-starter-g2).

### Next.js

To get started with a Next.js experience, run the following code in your Terminal:

```
npx create-next-app my-site --use-npm --example "https://github.com/itsjonq/next-starter-g2/"
```

### Video Tutorial

https://www.loom.com/share/7b0527a36f284568a9f1e7c1ab10fa42

We can start prototyping with G2 Components in 2 ways:

1. CodeSandbox (Recommended)
2. Create React App
3. Gatsby
4. Next.js

For more details, check out the [Next.js G2 starter](https://github.com/ItsJonQ/next-g2-starter).

## Open for Feedback

This project provides a space for in-depth research and experimentation. It is totally open for thoughts and feedback!
