import "../styles/Normalize.css"
import "../styles/Global.css"

import React from "react"

import { AppProvider, MDXProvider } from "../components"

export default function Layout(props) {
  const { children } = props

  return (
    <AppProvider>
      <MDXProvider>{children}</MDXProvider>
    </AppProvider>
  )
}
