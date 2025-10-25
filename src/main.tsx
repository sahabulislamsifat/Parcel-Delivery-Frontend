import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import { router } from "./routes/AppRoutes";
import ThemeProvider from "./providers/theme.provider";
import { store } from "./redux/store/store";
import { Toaster } from "./components/sooner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
