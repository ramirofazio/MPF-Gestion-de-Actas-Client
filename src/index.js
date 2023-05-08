import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//* Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";
//* Redux
import { Provider } from "react-redux";
import { Store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={1750}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        limit={4}
      />
    </Provider>
  </React.StrictMode>
);
