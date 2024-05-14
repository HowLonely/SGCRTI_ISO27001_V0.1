import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import '@mantine/charts/styles.css';


// Design System
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { Notifications } from "@mantine/notifications";


import { Provider } from "react-redux";
import Store from "./Store"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Notifications limit={2} position="top-right" />
        <Provider store={Store}>
          <App />
        </Provider>
      </MantineProvider>
  </React.StrictMode>
);
