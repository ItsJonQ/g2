import { useLocalState } from "@wp-g2/utils"
import React, { createContext, useContext } from "react"

const AppContext = createContext({})
export const useAppContext = () => useContext(AppContext)

export function AppProvider({ children }) {
  const [state, setState] = useLocalState("@wp-g2/website/AppProvider", {
    debug: false,
    inspect: false,
  })

  const { debug, inspect } = state

  const setDebug = next => setState(prev => ({ ...prev, debug: next }))

  const toggleInspect = () => {
    setState(prev => ({ ...prev, inspect: !inspect }))
  }

  const value = { debug, inspect, setDebug, setState, state, toggleInspect }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
