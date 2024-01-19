import { ReactNode, createContext, useState } from "react";
import { Address } from "../models/address.model";

type searchContextType = {
  address: Address | undefined;
  setAddress: Function;
  distance: number | undefined;
  setDistance: Function;
};

export const SearchContext = createContext<searchContextType>({
  address: undefined,
  setAddress: (address: Address) => null,
  distance: undefined,
  setDistance: (distance: number) => null,
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [distance, setDistance] = useState<number | undefined>(undefined);

  return (
    <SearchContext.Provider
      value={{
        address,
        setAddress,
        distance,
        setDistance,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
