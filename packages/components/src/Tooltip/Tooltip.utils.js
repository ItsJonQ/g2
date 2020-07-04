import { createContext, useContext } from 'react';

export const TooltipContext = createContext();
export const useTooltipContext = () => useContext(TooltipContext);
