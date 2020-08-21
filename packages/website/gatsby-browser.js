import "./src/styles/Normalize.css"
import "./src/styles/Global.css"

import { MDXProvider } from "@mdx-js/react"
import React from "react"

import { LiveCodeEditor, SyntaxHighlighter } from "./src/components"

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

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>
}

// export const shouldUpdateScroll = () => {
//   window.scrollTo(0, 0)
//   return false
// }
