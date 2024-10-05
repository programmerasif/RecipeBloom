"use client";
import { ReactNode } from "react";
import { Toaster } from 'sonner'
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Provider } from "react-redux";
import { store } from "@/redux/store";


const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster/>
      <EdgeStoreProvider> {children}</EdgeStoreProvider>
    </Provider>
  );
};

export default AppProvider;
