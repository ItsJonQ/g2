import { createContext, useContext } from 'react';

export const AccordionContext = createContext({});

export const useAccordionContext = () => useContext(AccordionContext);
