import { createContext, useState } from "react";

export const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState(null);

  const value = { currencies, setCurrencies }

  return <appContext.Provider value={value}>{ children }</appContext.Provider>
};
