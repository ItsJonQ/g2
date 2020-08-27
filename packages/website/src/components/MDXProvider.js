import { MDXProvider as BaseMDXProvider } from "@mdx-js/react"
import { Scrollable } from "@wp-g2/components"
import React from "react"

import {
  DefinitionPopover,
  LiveCodeEditor,
  SyntaxHighlighter,
} from "../components"

const components = {
  inlineCode: props => {
    return <DefinitionPopover {...props} />
  },
  pre: props => {
    if (props.children.props["live"]) {
      return <LiveCodeEditor {...props} file={props.children.props["file"]} />
    } else {
      return (
        <SyntaxHighlighter {...props} copy={!props.children.props["nocopy"]} />
      )
    }
  },
  table: props => {
    return (
      <Scrollable data-table={true}>
        <table {...props} />
      </Scrollable>
    )
  },
  wrapper: ({ children }) => <>{children}</>,
}

export function MDXProvider({ children }) {
  return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>
}
