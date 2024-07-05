import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { SearchProvider } from "./context/searchContext";
import { SettingsProvider } from "./context/settings.context";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <SearchProvider>
        <Header></Header>
        <main className="h-[93%]">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </SearchProvider>
    </SettingsProvider>
  );
}
