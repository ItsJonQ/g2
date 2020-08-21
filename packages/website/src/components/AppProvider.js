import { useLocalState } from "@wp-g2/utils"
import React, { createContext, useContext, useState } from "react"

const AppContext = createContext({})
export const useAppContext = () => useContext(AppContext)

export function AppProvider({ children }) {
  const [debug, setDebug] = useLocalState(
    "@wp-g2/website/AppProvider/debug",
    true
  )

  const [state, setState] = useState({})
  const value = { ...state, debug, setDebug, setState }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
