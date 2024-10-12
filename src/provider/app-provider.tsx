"use client";
import { ReactNode } from "react";
import { Toaster } from 'sonner'
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from 'redux-persist/integration/react';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>            
      <Toaster/>
      <EdgeStoreProvider> {children}</EdgeStoreProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
