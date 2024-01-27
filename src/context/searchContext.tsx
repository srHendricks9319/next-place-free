import { ReactNode, createContext, useState } from "react";
import { SearchAddress } from "../models/address.model";

type searchContextType = {
  addresses?: SearchAddress[];
  setAddresses: Function;
};

export const SearchContext = createContext<searchContextType>({
  addresses: undefined,
  setAddresses: (address: SearchAddress) => null,
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<SearchAddress[] | undefined>(
    undefined
  );

  return (
    <SearchContext.Provider
      value={{
        addresses,
        setAddresses,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
