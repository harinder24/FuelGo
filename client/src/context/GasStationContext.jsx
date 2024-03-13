/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

export const GasStationContext = createContext();

export function GasStationProvider({ children }) {
  return (
    <GasStationContext.Provider value={{}}>
      {children}
    </GasStationContext.Provider>
  );
}

export function useGasStation() {
  return useContext(GasStationContext);
}
