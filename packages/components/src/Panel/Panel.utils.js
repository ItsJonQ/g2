import { createContext, useContext } from 'react';

export const PanelContext = createContext();
export const usePanelContext = () => useContext(PanelContext);
