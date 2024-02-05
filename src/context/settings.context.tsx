import { ReactNode, createContext, useState } from "react";

type settingsContextType = {
  hereKey: string | undefined;
  setHereKey: Function;
  openRouteServiceKey: string | undefined;
  setOpenRouteServiceKey: Function;
  rapidKey: string | undefined;
  setRapidKey: Function;
};

export const SettingsContext = createContext<settingsContextType>({
  hereKey: undefined,
  setHereKey: (_key: string) => null,
  openRouteServiceKey: undefined,
  setOpenRouteServiceKey: (_key: string) => null,
  rapidKey: undefined,
  setRapidKey: (_key: string) => null,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [hereKey, setHereKey] = useState<string | undefined>(
    import.meta.env.VITE_HERE_KEY || undefined
  );
  const [openRouteServiceKey, setOpenRouteServiceKey] = useState<
    string | undefined
  >(import.meta.env.VITE_OPEN_ROUTE_KEY || undefined);

  const [rapidKey, setRapidKey] = useState<string | undefined>(
    import.meta.env.VITE_RAPID_API_KEY || undefined
  );

  return (
    <SettingsContext.Provider
      value={{
        hereKey,
        setHereKey,
        openRouteServiceKey,
        setOpenRouteServiceKey,
        rapidKey,
        setRapidKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
