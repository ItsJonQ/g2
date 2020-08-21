import { MDXProvider as BaseMDXProvider } from "@mdx-js/react"
import React from "react"

import { LiveCodeEditor, SyntaxHighlighter } from "../components"

const components = {
  pre: props => {
    if (props.children.props["live"]) {
      return <LiveCodeEditor {...props} file={props.children.props["file"]} />
    } else {
      return (
        <SyntaxHighlighter {...props} copy={!props.children.props["nocopy"]} />
      )
    }
  },
  wrapper: ({ children }) => <>{children}</>,
}

export function MDXProvider({ children }) {
  return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>
}
