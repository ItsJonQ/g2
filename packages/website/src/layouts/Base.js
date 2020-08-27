import "../styles/Normalize.css"
import "../styles/Global.css"

import { Hint } from "@wp-g2/hint"
import React from "react"

import { AppProvider, MDXProvider } from "../components"

export default function Layout(props) {
  const { children } = props

  return (
    <AppProvider>
      <MDXProvider>
        <Hint />
        {children}
      </MDXProvider>
    </AppProvider>
  )
}
