import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";
const container = document.getElementById("root");

const root = createRoot(container);

root.render(
    <StrictMode>
        <ProSidebarProvider>
            <Provider store={store}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </Provider>
        </ProSidebarProvider>
    </StrictMode>
);
