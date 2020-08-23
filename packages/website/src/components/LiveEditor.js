import * as Components from "@wp-g2/components"
import * as Context from "@wp-g2/context"
import { css, ui } from "@wp-g2/styles"
import { useUniqueId } from "@wp-g2/utils"
import nightOwl from "prism-react-renderer/themes/nightOwl"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"

import { useAppContext } from "./AppProvider"
import { CopyToClipboardButton } from "./CopyToClipboardButton"

const {
  Button,
  Card,
  CardBody,
  CardHeader,
  ComponentInspector,
  HStack,
  Spacer,
  Text,
  VStack,
  View,
  VisuallyHidden,
} = Components

const liveCodeScope = {
  ...Context,
  ...Components,
  css,
  ui,
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
  const __enableDebugger = true

  const code = children.props.children.trim()
  const id = useUniqueId(LiveCodeEditor, "live-code-editor")

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
            <CardHeader size="small">
              <Text variant="muted">{file}</Text>
              {__enableDebugger && (
                <HStack>
                  {debug && <Text variant="muted">Mouseover below.</Text>}
                  <Button
                    onClick={() => setDebug(!debug)}
                    size="xSmall"
                    variant="tertiary"
                  >
                    {debug ? "Hide Inspector" : "Show Inspector"}
                  </Button>
                </HStack>
              )}
            </CardHeader>
            <CardBody css={{ padding: 20 }}>
              <ComponentInspector disabled={!debug || !__enableDebugger}>
                <LivePreview aria-label="Live code preview" />
              </ComponentInspector>
            </CardBody>
          </Card>
          <Card css={[ui.position.relative]}>
            <CopyToClipboardButton value={code} />
            <VisuallyHidden>
              <View as="label" htmlFor={id}>
                Live Code Editor
              </View>
            </VisuallyHidden>
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
              textareaId={id}
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
