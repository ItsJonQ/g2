import {
  Badge,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useModalContext,
} from "@wp-g2/components"
import { FiSearch } from "@wp-g2/icons"
import { ui } from "@wp-g2/styles"
import React, { useEffect } from "react"

import { DocsSearch, useQueryParam } from "./DocsSearch"

export function SiteSearch() {
  const [query] = useQueryParam()
  const visible = !!query

  return (
    <Modal
      renderTrigger={
        <Tooltip>
          <TooltipTrigger>
            <ModalTrigger
              aria-label="Search"
              as={Button}
              icon={<FiSearch />}
              isRounded
            />
          </TooltipTrigger>
          <TooltipContent>Search</TooltipContent>
        </Tooltip>
      }
      visible={visible}
    >
      <HStack css={[ui.position.top, ui.offset.y(-30)]}>
        <Badge isBold truncate={false}>
          Jump Search
        </Badge>
        <Badge isBold truncate={false}>
          Press ⌘ / CTRL + J
        </Badge>
      </HStack>
      <ModalBody css={{ maxHeight: "70vh" }}>
        <SearchBody />
      </ModalBody>
    </Modal>
  )
}

function SearchBody() {
  const { dialog } = useModalContext()
  useSearchModalKeyboardShortcut()

  return <DocsSearch visible={dialog.visible} />
}

function useSearchModalKeyboardShortcut() {
  const { dialog } = useModalContext()

  useEffect(() => {
    const handleOnKeyDown = event => {
      const { ctrlKey, keyCode, metaKey } = event

      // cmd/ctrl + J or K
      if ((keyCode === 74 || keyCode === 75) && (ctrlKey || metaKey)) {
        dialog.toggle()
      }
    }

    document.addEventListener("keydown", handleOnKeyDown)

    return () => {
      document.removeEventListener("keydown", handleOnKeyDown)
    }
  }, [dialog])
}
