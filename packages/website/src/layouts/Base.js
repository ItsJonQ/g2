import "../styles/Normalize.css"
import "../styles/Global.css"

import { MDXProvider } from "@mdx-js/react"
import React from "react"

import { AppProvider, LiveCodeEditor, SyntaxHighlighter } from "../components"

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

export default function Layout(props) {
  const { children } = props
  return (
    <AppProvider>
      <MDXProvider components={components}>{children}</MDXProvider>
    </AppProvider>
  )
}
