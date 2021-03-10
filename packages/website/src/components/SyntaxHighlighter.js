import { View } from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import Highlight, { defaultProps } from "prism-react-renderer"
import nightOwl from "prism-react-renderer/themes/nightOwl"
import React from "react"

import { CopyToClipboardButton } from "./CopyToClipboardButton"

export function SyntaxHighlighter({
  children,
  code: codeProp,
  copy,
  lang: langProp,
}) {
  const code = codeProp || children?.props?.children.trim()
  const className = children?.props?.className || ""
  const matches = className?.match(/language-(?<lang>.*)/)
  const language = langProp || matches?.groups?.lang || ""

  return (
    <View className="SyntaxHighlighter" css={[ui.position.relative()]}>
      {copy && <CopyToClipboardButton value={code} />}
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={nightOwl}
      >
        {({ className, getLineProps, getTokenProps, style, tokens }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ key: i, line })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ key, token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </View>
  )
}
