import { ReactNode, createContext, useState } from "react";

type settingsContextType = {
  hereKey: string | undefined;
  setHereKey: Function;
  openRouteServiceKey: string | undefined;
  setOpenRouteServiceKey: Function;
};

export const SettingsContext = createContext<settingsContextType>({
  hereKey: undefined,
  setHereKey: (_key: string) => null,
  openRouteServiceKey: undefined,
  setOpenRouteServiceKey: (_key: string) => null,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [hereKey, setHereKey] = useState<string | undefined>(
    import.meta.env.VITE_HERE_KEY || undefined
  );
  const [openRouteServiceKey, setOpenRouteServiceKey] = useState<
    string | undefined
  >(import.meta.env.VITE_OPEN_ROUTE_KEY || undefined);

  return (
    <SettingsContext.Provider
      value={{
        hereKey,
        setHereKey,
        openRouteServiceKey,
        setOpenRouteServiceKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
