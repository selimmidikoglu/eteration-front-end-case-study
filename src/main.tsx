import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import ProductDetailedPage from "./pages/ProductDetailedPage.tsx";
import Dummy from "./components/Dummy.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" element={<App />} />
          <Route path="/product/:product_id" element={<ProductDetailedPage />} />
          <Route path="/checkedout" element={<Dummy />} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>
);
