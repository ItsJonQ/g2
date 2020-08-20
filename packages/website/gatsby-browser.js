import "./src/styles/Normalize.css"
import "./src/styles/G2.css"
import "./src/styles/Global.css"
import "./src/styles/LiveEditor.css"

import { MDXProvider } from "@mdx-js/react"
import * as Components from "@wp-g2/components"
import * as Context from "@wp-g2/context"
import { css, ui } from "@wp-g2/styles"
import { useClipboard } from "@wp-g2/utils"
import Highlight, { defaultProps } from "prism-react-renderer"
import nightOwl from "prism-react-renderer/themes/nightOwl"
import React, { useState } from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"

const { Button, Card, CardBody, Spacer, VStack, View } = Components

const liveCodeScope = {
  ...Context,
  ...Components,
  css,
  ui,
}

function CopyToClipboard({ onClick, value, ...props }) {
  const { hasCopied, onCopy } = useClipboard(value)

  const handleOnClick = () => {
    onCopy()
    onClick()
  }

  return (
    <Button onClick={handleOnClick} size="small" variant="primary" {...props}>
      {hasCopied ? "Copied!" : "Copy"}
    </Button>
  )
}

const LiveCode = props => {
  const [showOverlay, setShowOverlay] = useState(false)
  const code = props.children.props.children.trim()

  return (
    <Spacer className="LiveEditorWrapper" mb={8} mt={5}>
      <LiveProvider code={code} scope={liveCodeScope} theme={nightOwl}>
        <VStack className="LiveEditorContainer">
          <Card>
            <CardBody css={{ padding: 20 }}>
              <LivePreview />
            </CardBody>
          </Card>
          <Card css={[ui.position.relative]}>
            <View
              className="LiveEditorCopyFlash"
              css={[
                ui.position.full,
                ui.background.blue,
                { pointerEvents: showOverlay ? "default" : "none", zIndex: 2 },
                ui.opacity(showOverlay ? 1 : 0),
                ui.animation.default,
              ]}
            />
            <View
              className="LiveEditorCopyButtonWrapper"
              css={[ui.position.topRight, ui.offset(-4, 4), { zIndex: 5 }]}
            >
              <CopyToClipboard
                onClick={() => setShowOverlay(false)}
                onMouseDown={() => setShowOverlay(true)}
                onMouseUp={() => setShowOverlay(false)}
                value={code}
              />
            </View>
            <LiveEditor
              className="LiveEditorEditor"
              style={{
                borderRadius: 6,
                display: "block",
                fontSize: "0.85rem",
                lineHeight: 1.5,
                outline: "none",
                overflow: "hidden",
              }}
            />
          </Card>
          <View
            className="LiveEditorErrorWrapper"
            css={`
              pre {
                border-radius: 4px;
                font-size: 11px;
                padding: 12px;
                margin: 0;
              }
            `}
          >
            <LiveError className="LiveEditorError" />
          </View>
        </VStack>
      </LiveProvider>
    </Spacer>
  )
}

const SyntaxHighlighter = props => {
  const className = props.children.props.className || ""
  const matches = className.match(/language-(?<lang>.*)/)
  const language = matches?.groups?.lang || ""

  return (
    <div className="SyntaxHighlighter">
      <Highlight
        {...defaultProps}
        code={props.children.props.children.trim()}
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
    </div>
  )
}

const components = {
  pre: props => {
    if (props.children.props["live"]) {
      return <LiveCode {...props} />
    } else {
      return <SyntaxHighlighter {...props} />
    }
  },
  wrapper: ({ children }) => <>{children}</>,
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>
}

export const shouldUpdateScroll = () => {
  window.scrollTo(0, 0)
  return false
}
