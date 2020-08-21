import * as Components from "@wp-g2/components"
import * as Context from "@wp-g2/context"
import { css, ui } from "@wp-g2/styles"
import { useClipboard } from "@wp-g2/utils"
import Highlight, { defaultProps } from "prism-react-renderer"
import nightOwl from "prism-react-renderer/themes/nightOwl"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"

import { useAppContext } from "../AppProvider"

const {
  Button,
  Card,
  CardBody,
  CardHeader,
  ComponentDebugger,
  HStack,
  Spacer,
  Text,
  VStack,
  View,
} = Components

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
    onClick && onClick()
  }

  return (
    <View
      className="LiveEditorCopyButtonWrapper"
      css={[ui.position.topRight, ui.offset(-8, 8), { zIndex: 5 }]}
    >
      <Button onClick={handleOnClick} size="small" variant="primary" {...props}>
        {hasCopied ? "Copied!" : "Copy"}
      </Button>
    </View>
  )
}

function transformCode(code) {
  if (!code) {
    return ""
  }

  const match = code.replace(
    /import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'\s]*([@\w/_-]+)["'\s].*/gm,
    ""
  )

  return `() => {${match}; return <Example />}`
}

export function LiveCodeEditor({ children, file = "example.js" }) {
  const { debug, setDebug } = useAppContext()
  const __enableDebugger = false

  const code = children.props.children.trim()

  return (
    <Spacer className="LiveEditorWrapper" mb={8} mt={5}>
      <LiveProvider
        code={code}
        scope={liveCodeScope}
        theme={nightOwl}
        transformCode={transformCode}
      >
        <VStack className="LiveEditorContainer">
          <Card>
            <CardHeader css={[ui.padding.y(1.5), { minHeight: 20 }]}>
              <Text variant="muted">{file}</Text>
              {__enableDebugger && (
                <HStack>
                  {debug && <Text variant="muted">Mouseover below.</Text>}
                  <Button
                    onClick={() => setDebug(!debug)}
                    size="xSmall"
                    variant="tertiary"
                  >
                    {debug ? "Hide Debugger" : "Show Debugger"}
                  </Button>
                </HStack>
              )}
            </CardHeader>
            <CardBody css={{ padding: 20 }}>
              <ComponentDebugger disabled={!debug || !__enableDebugger}>
                <LivePreview aria-label="Live code preview" />
              </ComponentDebugger>
            </CardBody>
          </Card>
          <Card css={[ui.position.relative]}>
            <CopyToClipboard value={code} />
            <LiveEditor
              aria-label="Live code editor"
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

export function SyntaxHighlighter(props) {
  const { copy } = props
  const code = props.children.props.children.trim()
  const className = props.children.props.className || ""
  const matches = className.match(/language-(?<lang>.*)/)
  const language = matches?.groups?.lang || ""

  return (
    <div className="SyntaxHighlighter">
      {copy && <CopyToClipboard value={code} />}
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
    </div>
  )
}
