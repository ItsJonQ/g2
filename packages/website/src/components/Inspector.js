import { ComponentInspector } from "@wp-g2/components"
import React from "react"

import { useAppContext } from "./AppProvider"

export function Inspector({ children }) {
  const { inspect } = useAppContext()

  return <ComponentInspector visible={inspect}>{children}</ComponentInspector>
}
