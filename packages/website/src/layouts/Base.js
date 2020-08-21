import "../styles/Normalize.css"
import "../styles/Global.css"

import { MDXProvider } from "@mdx-js/react"
import React from "react"

import { LiveCodeEditor, SyntaxHighlighter } from "../components"

const components = {
  pre: props => {
    if (props.children.props["live"]) {
      return <LiveCodeEditor {...props} />
    } else {
      return (
        <SyntaxHighlighter {...props} copy={!props.children.props["nocopy"]} />
      )
    }
  },
  wrapper: ({ children }) => <>{children}</>,
}

export default function Layout(props) {
  const { children } = props
  return <MDXProvider components={components}>{children}</MDXProvider>
}
