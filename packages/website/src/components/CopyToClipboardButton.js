import { Button, View } from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import { useClipboard } from "@wp-g2/utils"
import React from "react"

export function CopyToClipboardButton({ onClick, value, ...props }) {
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
